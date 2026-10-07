"""App Store creative assets (iOS 27+): product page header (21:9, 3840x1646) and search results (3:2, 3840x2560).

Specs: developer.apple.com/help/app-store-connect/reference/app-information/creative-assets-specifications
Guidance (developer.apple.com/app-store/asset-best-practices): header = one clear idea, focal content centred;
search = state the obvious and show the real UI. No prices, URLs, other platforms, awards or unverifiable claims; no alpha.

Same art direction as the screenshot set (../screenshots/): blue-hour Sydney backdrop generated in ChatGPT, Fraunces
headline with a gold accent, real app screens (raw iOS simulator captures) in Apple's iPhone 17 Pro Max bezel.

Usage: python3 aso/app-store/creative/creative.py  ->  out/tripcache-header-21x9.{png,jpg}, out/tripcache-search-3x2.jpg
"""
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
RAW = ROOT.parent.parent / "google-play" / "screenshots" / "assets" / "screens-raw"   # 1206x2622 iOS captures
FONTS = ROOT.parent / "screenshots" / "assets" / "fonts.css"


def u(p):
    return Path(p).resolve().as_uri()


def phone(screen, cx, top, w, z=1):
    """Apple's 1470x3000 bezel holds a 1320x2868 screen at (75, 66)."""
    s = w / 1320
    fw, fh, h = 1470 * s, 3000 * s, 2868 * s
    fx, fy = cx - fw / 2, top - 66 * s
    return (f'<div style="position:absolute;left:{fx + 75 * s:.1f}px;top:{top}px;width:{w}px;height:{h:.1f}px;'
            f'border-radius:{155 * s:.1f}px;overflow:hidden;background:#fff;z-index:{z}">'
            f'<img src="{u(screen)}" style="width:100%;height:100%;display:block"></div>'
            f'<img src="{u(ROOT / "assets/iphone-17-pro-max-silver.png")}" style="position:absolute;left:{fx:.1f}px;top:{fy:.1f}px;'
            f'width:{fw:.1f}px;height:{fh:.1f}px;z-index:{z};filter:drop-shadow(0 {50 * s * 3:.0f}px {70 * s * 3:.0f}px rgba(8,2,30,.55))">')


def page(W, H, body, bg_top, shade):
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
@import url('{u(FONTS)}');
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden;background:#160a3d}}
.bg{{position:absolute;left:0;top:{bg_top}px;width:{W}px;height:{W / 1.5:.0f}px;background:url('{u(ROOT / "assets/bg-sydney-wide.webp")}') center/cover}}
.shade{{position:absolute;inset:0;background:{shade}}}
.copy{{position:absolute;left:0;right:0;text-align:center;color:#fff;z-index:5;padding:0 200px}}
h1{{font-family:Fraunces,serif;font-weight:600;letter-spacing:-.025em;line-height:1;font-variation-settings:"SOFT" 50;
  text-shadow:0 8px 60px rgba(10,4,30,.6)}}
h1 em{{font-style:normal;color:#fec84b}}
p{{font-family:Inter,sans-serif;font-weight:500;color:rgba(255,255,255,.92);text-shadow:0 6px 40px rgba(10,4,30,.6)}}
</style></head><body><div class="bg"></div><div class="shade"></div>{body}</body></html>"""


HEADER_SHADE = ("linear-gradient(180deg, rgba(14,6,42,.82) 0%, rgba(20,8,60,.45) 30%, rgba(20,8,60,.15) 55%, rgba(10,4,30,.55) 100%),"
                "radial-gradient(60% 90% at 50% 75%, rgba(139,92,246,.35), transparent 70%)")
SEARCH_SHADE = ("linear-gradient(180deg, rgba(14,6,42,.85) 0%, rgba(20,8,60,.5) 24%, rgba(20,8,60,.1) 45%, rgba(10,4,30,.6) 100%),"
                "radial-gradient(60% 60% at 50% 70%, rgba(139,92,246,.35), transparent 70%)")

HEADER_COPY = ('<div class="copy" style="top:120px"><h1 style="font-size:150px">Every booking, <em>one itinerary.</em></h1>'
               '<p style="font-size:56px;margin-top:28px">Flights, hotels, deadlines and documents for the trips you’ve booked.</p></div>')

ASSETS = [
    {
        # One clear idea for a first-time visitor, centred: everything you booked lands in one trip.
        "id": "header-21x9", "W": 3840, "H": 1646, "bg_top": -760, "shade": HEADER_SHADE,
        "body": HEADER_COPY + phone(RAW / "home.png", 1920, 500, 560, 2),
    },
    {
        # State the obvious with the top keyword phrase, and show three real screens.
        "id": "search-3x2", "W": 3840, "H": 2560, "bg_top": 0, "shade": SEARCH_SHADE,
        "body": ('<div class="copy" style="top:130px"><h1 style="font-size:176px"><em>Itinerary planner</em> &amp; trip organizer</h1>'
                 '<p style="font-size:68px;margin-top:36px">Every booking, cancellation deadline and travel document in one trip.</p></div>'
                 + phone(RAW / "hotel-detail-cancellation.png", 1040, 760, 760, 1)
                 + phone(RAW / "flight-detail-qf43.png", 2800, 760, 760, 1)
                 + phone(RAW / "home.png", 1920, 620, 860, 3)),
    },
]


def shot(html_text, name, W, H):
    html = ROOT / "out" / f"{name}.html"
    html.write_text(html_text)
    png = Path(tempfile.gettempdir()) / f"tc-creative-{name}.png"
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                    f"--window-size={W},{H}", "--virtual-time-budget=5000", "--allow-file-access-from-files",
                    f"--screenshot={png}", html.as_uri()], check=True, capture_output=True)
    return png


if __name__ == "__main__":
    (ROOT / "out").mkdir(exist_ok=True)
    for a in ASSETS:
        png = shot(page(a["W"], a["H"], a["body"], a["bg_top"], a["shade"]), a["id"], a["W"], a["H"])
        jpg = ROOT / "out" / f"tripcache-{a['id']}.jpg"   # JPEG: no alpha, and ASC rejected a large PNG for Marnie
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "92", str(png), "--out", str(jpg)],
                       check=True, capture_output=True)
        print(jpg.relative_to(ROOT))
