"""Real-UI App Store videos from simulator recordings (raw/video/*.mov).

1. App Preview, 6.9" iPhone: 886x1920, 30 fps, H.264 High L4.0 ~11 Mbps, AAC 256 kbps stereo 48 kHz, 15-30 s.
   One caption per beat (the screenshot phrases) over that beat's destination backdrop, the real screen as a rounded card,
   beats crossfaded, the promo's music bed underneath (audio is required).
2. Product page header video: 3840x1646, 30 fps, muted seamless loop. Same layout as the static header (creative.py):
   real footage plays inside Apple's iPhone 17 Pro Max bezel; the last beat returns to the opening frame.

ffmpeg here has no drawtext, so every caption is an HTML-rendered PNG layer.
Usage: python3 aso/app-store/creative/videos.py [preview|header]
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SHOTS = ROOT.parent / "screenshots" / "assets"
MUSIC = ROOT.parents[2] / "videos" / "tripcache-promo" / "assets" / "bgm" / "future-bright-cut.mp3"
WORK = ROOT / "build"
XF = 0.35

# clip, [(in, out), ...], caption (*em*), backdrop  — captions match the screenshot set
PREVIEW = [
    ("a-home", [(0.0, 4.6)], "Your travel itinerary, *organized*", "01-sydney"),
    ("b-trip", [(1.8, 5.2)], "*Every booking* in one trip timeline", "02-newyork"),
    ("c-cancel", [(2.2, 5.2), (10.2, 13.5)], "Never miss a *free cancellation*", "02-newyork"),
    ("d-import", [(2.5, 4.5), (13.6, 17.1)], "Forward booking emails. *Get a trip.*", "03-singapore"),
    ("e-flight", [(2.8, 7.0)], "Live *flight tracker*", "04-flight"),
    ("f-budget", [(2.8, 7.3)], "Travel *budget* & expense tracker", "07-southbank"),
]
HEADER = [("a-home", [(0.0, 4.6)]), ("b-trip", [(1.8, 5.2)]), ("c-cancel", [(2.2, 5.2)]), ("e-flight", [(2.8, 6.6)]),
          ("a-home", [(0.0, 1.0)])]   # back to the opening frame so the loop doesn't jump


def u(p):
    return Path(p).resolve().as_uri()


def chrome(html, png, w, h, transparent=False):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    f"--window-size={w},{h}", "--virtual-time-budget=4000", "--allow-file-access-from-files",
                    *(["--default-background-color=00000000"] if transparent else []), f"--screenshot={png}", u(html)],
                   check=True, capture_output=True)


def ff(*args):
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *map(str, args)], check=True)


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(f)]))


def trims(ranges, w, h):
    t = ";".join(f"[0:v]trim={a}:{b},setpts=PTS-STARTPTS,fps=30,scale={w}:{h}:flags=lanczos[t{k}]" for k, (a, b) in enumerate(ranges))
    cat = (";" + "".join(f"[t{k}]" for k in range(len(ranges))) + f"concat=n={len(ranges)}:v=1[v]") if len(ranges) > 1 else ";[t0]null[v]"
    return t + cat


def xfade_chain(segs):
    filt, last, t = "", "[0:v]", 0.0
    for i in range(1, len(segs)):
        t += segs[i - 1][1] - XF
        filt += f"{last}[{i}:v]xfade=transition=fade:duration={XF}:offset={t:.3f}[x{i}];"
        last = f"[x{i}]"
    return filt, last, sum(d for _, d in segs) - XF * (len(segs) - 1)


def preview():
    W, H, SW, SH, SY, R = 886, 1920, 660, 1435, 430, 64
    SX = (W - SW) // 2
    out = WORK / "preview"
    out.mkdir(parents=True, exist_ok=True)
    (out / "mask.html").write_text(f'<html><body style="margin:0;background:#000"><div style="width:{SW}px;height:{SH}px;border-radius:{R}px;background:#fff"></div></body></html>')
    chrome(out / "mask.html", out / "mask.png", SW, SH)
    segs = []
    for i, (clip, ranges, head, bg) in enumerate(PREVIEW):
        h = head.replace("*", "<em>", 1).replace("*", "</em>", 1)
        (out / f"bg-{i}.html").write_text(f"""<!doctype html><html><head><meta charset="utf-8"><style>
@import url('{u(SHOTS / "fonts.css")}');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden;background:#160a3d}}
.bg{{position:absolute;inset:0;background:url('{u(SHOTS / "backgrounds" / (bg + ".webp"))}') center top/cover}}
.shade{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,6,42,.85) 0%,rgba(20,8,60,.5) 16%,rgba(28,10,80,.1) 28%,transparent 36%),
  linear-gradient(0deg,rgba(10,4,30,.55),transparent 25%)}}
h1{{position:absolute;left:50px;right:50px;top:110px;text-align:center;font-family:Fraunces,serif;font-weight:600;font-size:84px;
  line-height:1.02;letter-spacing:-.025em;color:#fff;text-wrap:balance;text-shadow:0 4px 30px rgba(10,4,30,.6)}}
h1 em{{font-style:normal;color:#fec84b}}
.card{{position:absolute;left:{SX}px;top:{SY}px;width:{SW}px;height:{SH}px;border-radius:{R}px;background:#fff;
  box-shadow:0 40px 80px rgba(8,2,30,.55),0 0 0 6px rgba(255,255,255,.35)}}
</style></head><body><div class="bg"></div><div class="shade"></div><h1>{h}</h1><div class="card"></div></body></html>""")
        chrome(out / f"bg-{i}.html", out / f"bg-{i}.png", W, H)
        length = sum(b - a for a, b in ranges)
        seg = out / f"seg-{i}.mp4"
        ff("-i", ROOT / "raw" / "cfr" / f"{clip}.mp4", "-loop", "1", "-t", f"{length:.3f}", "-i", out / f"bg-{i}.png",
           "-loop", "1", "-t", f"{length:.3f}", "-i", out / "mask.png",
           "-filter_complex", f"{trims(ranges, SW, SH)};[2:v]format=gray,scale={SW}:{SH}[m];[v][m]alphamerge[vm];[1:v][vm]overlay={SX}:{SY}:shortest=1,format=yuv420p[o]",
           "-map", "[o]", "-t", f"{length:.3f}", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "14", seg)
        segs.append((seg, dur(seg)))
    filt, last, total = xfade_chain(segs)
    assert 15 <= total <= 30, total
    dst = ROOT / "out" / "tripcache-app-preview-886x1920.mp4"
    ff(*[x for s, _ in segs for x in ("-i", s)], "-ss", "5.99", "-t", f"{total:.3f}", "-i", MUSIC,
       "-filter_complex", f"{filt}{last}format=yuv420p[v];[{len(segs)}:a]volume=0.8,afade=t=in:d=0.5,afade=t=out:st={total - 1.2:.3f}:d=1.2,aformat=sample_rates=48000:channel_layouts=stereo[a]",
       "-map", "[v]", "-map", "[a]", "-r", "30", "-c:v", "libx264", "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
       "-b:v", "11M", "-maxrate", "12M", "-bufsize", "24M", "-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-ac", "2",
       "-movflags", "+faststart", dst)
    print(dst.relative_to(ROOT), f"{total:.2f}s")


def header():
    W, H, PW, CX, TOP = 3840, 1646, 560, 1920, 500
    s = PW / 1320
    SW, SH, R = PW, round(2868 * s / 2) * 2, round(155 * s)
    SX = round(CX - PW / 2)
    fw, fh, fy = 1470 * s, 3000 * s, TOP - 66 * s
    frame_x = CX - fw / 2
    out = WORK / "header"
    out.mkdir(parents=True, exist_ok=True)
    sys.path.insert(0, str(ROOT))
    import creative
    bezel = u(ROOT / "assets" / "iphone-17-pro-max-silver.png")
    base_body = creative.HEADER_COPY + (f'<img src="{bezel}" style="position:absolute;left:{frame_x:.1f}px;top:{fy:.1f}px;width:{fw:.1f}px;'
                                        f'height:{fh:.1f}px;filter:drop-shadow(0 150px 210px rgba(8,2,30,.55))">')
    (out / "base.html").write_text(creative.page(W, H, base_body, -760, creative.HEADER_SHADE))
    (out / "frame.html").write_text(f'<html><body style="margin:0;background:transparent"><img src="{bezel}" style="position:absolute;'
                                    f'left:{frame_x:.1f}px;top:{fy:.1f}px;width:{fw:.1f}px;height:{fh:.1f}px"></body></html>')
    (out / "mask.html").write_text(f'<html><body style="margin:0;background:#000"><div style="width:{SW}px;height:{SH}px;border-radius:{R}px;background:#fff"></div></body></html>')
    chrome(out / "base.html", out / "base.png", W, H)
    chrome(out / "frame.html", out / "frame.png", W, H, transparent=True)
    chrome(out / "mask.html", out / "mask.png", SW, SH)
    segs = []
    for i, (clip, ranges) in enumerate(HEADER):
        seg = out / f"beat-{i}.mp4"
        ff("-i", ROOT / "raw" / "cfr" / f"{clip}.mp4", "-filter_complex", trims(ranges, SW, SH), "-map", "[v]",
           "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", seg)
        segs.append((seg, sum(b - a for a, b in ranges)))
    filt, last, total = xfade_chain(segs)
    screen = out / "screen.mp4"
    ff(*[x for s_, _ in segs for x in ("-i", s_)], "-filter_complex", f"{filt}{last}null[v]", "-map", "[v]",
       "-c:v", "libx264", "-crf", "12", "-pix_fmt", "yuv420p", screen)
    dst = ROOT / "out" / "tripcache-header-21x9.mp4"
    L = f"{total:.3f}"
    ff("-loop", "1", "-t", L, "-i", out / "base.png", "-i", screen, "-loop", "1", "-t", L, "-i", out / "mask.png",
       "-loop", "1", "-t", L, "-i", out / "frame.png",
       "-filter_complex", f"[2:v]format=gray[m];[1:v][m]alphamerge[scr];[0:v][scr]overlay={SX}:{TOP}[a];[a][3:v]overlay=0:0,format=yuv420p[v]",
       "-map", "[v]", "-t", L, "-r", "30", "-an", "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "16",
       "-preset", "slow", "-movflags", "+faststart", dst)
    print(dst.relative_to(ROOT), f"{total:.2f}s")


if __name__ == "__main__":
    which = sys.argv[1:] or ["preview", "header"]
    if "preview" in which:
        preview()
    if "header" in which:
        header()
