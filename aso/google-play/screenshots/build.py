"""Build Google Play phone screenshots (1080x1920, 9:16) and the feature graphic (1024x500).

Same story and art direction as the App Store set (../../app-store/screenshots/), adapted for Android:
- real TripCache screens with the latest UI (raw simulator captures, assets/screens-raw/),
- the iOS status bar is covered by an Android-style one (time left, signal/Wi-Fi/battery right),
- frameless: the real screen as a rounded card, because Google's large-format promotion surfaces
  ask for no device imagery and taglines under 20% of the image (aso/google-play/research/),
- no Live Activity / Dynamic Island card (iOS-only); frame 4 shows the flight detail screen.

Usage: python3 aso/google-play/screenshots/build.py
Output: aso/google-play/screenshots/out/NN-<name>.jpg and out/feature-graphic.png
"""
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IOS = ROOT.parent.parent / "app-store" / "screenshots" / "assets"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
W, H = 1080, 1920
RAW_W, RAW_H = 1206, 2622
SB = 176            # iOS status bar height in the raw captures (px at 1206 wide)
PHONE_W = 920       # width of the screen card on the canvas
RIM, BEZEL = 0, 0   # frameless
SCREEN_W = PHONE_W
KS = SCREEN_W / RAW_W  # raw px -> canvas px
STAGE_GAP = 40

# (screen, crop box in raw px, callout width, top relative to the screen top or None = pop out in place)
CALLOUTS = {
    "reminder": ("set-reminders", (58, 1730, 1148, 2137), 940, 760),
    "inbox": ("smart-inbox", (48, 778, 1157, 1241), 930, 20),
    "visa": ("export-visa", (82, 1071, 1122, 1263), 950, None),
}

BACKGROUNDS = {
    "itinerary": "01-sydney", "free-cancellation": "02-newyork", "email-import": "03-singapore",
    "flight-tracker": "04-flight", "timeline": "05-melbourne-tram", "documents": "06-documents",
    "budget": "07-southbank", "map": "08-coast", "visa-export": "09-london", "history": "10-bangkok",
}

# name, screen, pro, headline, sub, callout, status-bar icon colour
FRAMES = [
    ("itinerary", "home", False, "Your travel itinerary, <em>organized</em>",
     "Flights, hotels, cars and plans for every trip you've booked.", None, "dark"),
    ("free-cancellation", "hotel-detail-cancellation", False, "Never miss a <em>free cancellation</em>",
     "Get reminded 7 days, 2 days, 1 day or on the day. Free.", "reminder", "dark"),
    ("email-import", "draft-review", True, "Forward booking emails. <em>Get a trip.</em>",
     "TripCache drafts each confirmation for you to check.", "inbox", "dark"),
    ("flight-tracker", "flight-detail-qf43", True, "Live <em>flight tracker</em> & alerts",
     "Delays, gate changes and arrivals, plus a home-screen widget.", None, "dark"),
    ("timeline", "trip-detail-mel", False, "<em>Every booking</em> in one trip timeline",
     "Flights, stays, cars, trains, tours and restaurants.", None, "light"),
    ("documents", "docs-pin", False, "Travel documents, <em>locked</em>",
     "Passports, visas and tickets kept with the trip.", None, "dark"),
    ("budget", "expenses-mel", False, "Travel <em>budget</em> & expense tracker",
     "150+ currencies, budgets by category, the real trip cost.", None, "dark"),
    ("visa-export", "export-visa", False, "Export travel history <em>for visas</em>",
     "Visa summaries, travel history and expense reports as PDF or CSV.", "visa", "dark"),
]

SIGNAL = '<svg width="34" height="34" viewBox="0 0 24 24"><path d="M2 22h20V2z" fill="currentColor"/></svg>'
WIFI = ('<svg width="36" height="36" viewBox="0 0 24 24"><path d="M12 21 1 8.5A16.5 16.5 0 0 1 12 4.5 16.5 16.5 0 0 1 23 8.5z" '
        'fill="currentColor"/></svg>')
BATT = ('<svg width="22" height="38" viewBox="0 0 12 22"><rect x="3.5" y="0" width="5" height="2" rx="1" fill="currentColor"/>'
        '<rect x="0" y="2" width="12" height="20" rx="2.5" fill="currentColor"/></svg>')

CSS = """
@import url('../../../app-store/screenshots/assets/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:%(W)dpx;height:%(H)dpx;overflow:hidden}
body{position:relative;font-family:Inter,system-ui,sans-serif;color:#fff;background:#160a3d}
.bg{position:absolute;inset:0;background-size:cover;background-position:center top}
.shade{position:absolute;inset:0;background:
  linear-gradient(180deg, rgba(14,6,42,.85) 0%%, rgba(20,8,60,.55) 16%%, rgba(28,10,80,.12) 28%%, rgba(28,10,80,0) 36%%),
  linear-gradient(0deg, rgba(10,4,30,.55) 0%%, rgba(10,4,30,0) 22%%),
  radial-gradient(120%% 80%% at 50%% 60%%, transparent 55%%, rgba(10,4,30,.45) 100%%)}
.glow{position:absolute;left:50%%;top:900px;width:1100px;height:1100px;transform:translateX(-50%%);
  background:radial-gradient(closest-side, rgba(139,92,246,.45), transparent);filter:blur(30px)}
.wrap{position:absolute;left:0;right:0;display:flex;flex-direction:column;align-items:center}
.copy{text-align:center;padding:0 64px}
.pill{display:inline-block;font:800 20px/1 Inter;letter-spacing:.14em;color:#2a1170;background:#fec84b;
  padding:9px 18px 8px;border-radius:999px;margin-bottom:16px}
h1{font-family:Fraunces,serif;font-weight:600;font-size:78px;line-height:1.0;letter-spacing:-.025em;
  font-variation-settings:"SOFT" 50;text-wrap:balance}
h1 em{font-style:normal;color:#fec84b}
p{margin:16px auto 0;max-width:960px;font:500 36px/1.25 Inter;color:rgba(255,255,255,.92);text-wrap:balance}
h1,p{text-shadow:0 4px 30px rgba(10,4,30,.55)}
.stage{position:relative;width:%(PW)dpx;margin-top:%(GAP)dpx}
.device{position:relative;width:%(PW)dpx;filter:drop-shadow(0 40px 70px rgba(12,2,40,.6))}
.bezel{width:100%%}
.screen{position:relative;width:%(SW)dpx;height:%(SH)dpx;border-radius:56px;overflow:hidden;background:#fff;box-shadow:0 0 0 3px rgba(255,255,255,.35)}
.screen img.ui{display:block;width:100%%}
.sbfill{position:absolute;left:0;top:0;width:100%%;height:%(SBH)dpx;overflow:hidden}
.sbfill div{position:absolute;inset:0;background-size:%(SW)dpx auto;background-position:0 -%(SBH)dpx;
  transform:scaleY(-1);filter:blur(14px);margin:-24px}
.sb{position:absolute;left:0;right:0;top:0;height:%(SBH)dpx;display:flex;align-items:center;justify-content:space-between;
  padding:0 46px 0 52px;font:600 33px/1 Roboto,Inter,sans-serif}
.sb.dark{color:#1b1b1f}.sb.light{color:#fff}
.sb .ic{display:flex;align-items:center;gap:10px}
.hole{position:absolute;left:50%%;top:%(HOLE)dpx;width:36px;height:36px;margin-left:-18px;border-radius:50%%;
  background:radial-gradient(circle at 40%% 38%%,#2b3550 0,#0b0d14 45%%,#000 70%%);box-shadow:0 0 0 3px #0a0a0c}
.callout{position:absolute;border-radius:40px;background-repeat:no-repeat;overflow:hidden;
  box-shadow:0 36px 80px rgba(12,2,40,.55),0 0 0 3px rgba(255,255,255,.65)}
"""


def callout_html(key):
    screen, (x0, y0, x1, y1), width, top = CALLOUTS[key]
    s = width / (x1 - x0)
    h = round((y1 - y0) * s)
    off = RIM + BEZEL
    if top is None:
        top = round((y0 + y1) / 2 * KS - h / 2)
    left = (PHONE_W - width) // 2
    return (f'<div class="callout" style="left:{left}px;top:{top + off}px;width:{width}px;height:{h}px;'
            f"background-image:url('../assets/screens-raw/{screen}.png');"
            f'background-size:{round(RAW_W * s)}px {round(RAW_H * s)}px;'
            f'background-position:-{round(x0 * s)}px -{round(y0 * s)}px"></div>')


def page(frame):
    name, screen, pro, head, sub, extra, sbcol = frame
    sw = SCREEN_W
    sh = round(RAW_H * KS)
    sbh = round(SB * KS)
    css = CSS % {"W": W, "H": H, "PW": PHONE_W, "PH": sh + 2 * (RIM + BEZEL), "RIM": RIM, "BEZEL": BEZEL,
                 "SW": sw, "SH": sh, "SBH": sbh, "HOLE": RIM + BEZEL + round(sbh / 2) - 18, "GAP": STAGE_GAP}
    img = f"../assets/screens-raw/{screen}.png"
    pill = '<div class="pill">PRO</div><br>' if pro else ""
    top = "44px" if pro else "64px"
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{css}.wrap{{top:{top}}}</style></head>
<body><div class="bg" style="background-image:url('../../../app-store/screenshots/assets/backgrounds/{BACKGROUNDS[name]}.webp')"></div>
<div class="shade"></div><div class="glow"></div>
<div class="wrap"><div class="copy">{pill}<h1>{head}</h1><p>{sub}</p></div>
<div class="stage"><div class="device"><div class="bezel"><div class="screen">
<img class="ui" src="{img}" alt="">
<div class="sbfill"><div style="background-image:url('{img}')"></div></div>
<div class="sb {sbcol}"><span>9:41</span><span class="ic">{SIGNAL}{WIFI}{BATT}</span></div>
</div></div></div>{callout_html(extra) if extra else ""}</div></div>
<script>
// Sample the app background just under the iOS status bar: flat colour -> solid Android status bar,
// busy photo/map -> keep the mirrored blur. Icon colour follows luminance.
(function(){{const im=new Image();im.src="{img}";im.onload=function(){{const c=document.createElement('canvas');
c.width={RAW_W};c.height=24;const x=c.getContext('2d');x.drawImage(im,0,{SB + 4},{RAW_W},24,0,0,{RAW_W},24);
const d=x.getImageData(0,0,{RAW_W},24).data;let r=0,g=0,b=0,n=0,r2=0;
for(let i=0;i<d.length;i+=16){{r+=d[i];g+=d[i+1];b+=d[i+2];r2+=d[i]*d[i];n++;}}
r/=n;g/=n;b/=n;const v=r2/n-r*r;const L=0.2126*r+0.7152*g+0.0722*b;
const fill=document.querySelector('.sbfill');const sb=document.querySelector('.sb');
if(v<180){{fill.innerHTML='';fill.style.background=`rgb(${{r|0}},${{g|0}},${{b|0}})`;}}
sb.classList.remove('dark','light');sb.classList.add(L>150?'dark':'light');document.body.dataset.ready=1;}};}})();
</script>
</body></html>"""


FEATURE = """<!doctype html><html><head><meta charset="utf-8"><style>
@import url('../../../app-store/screenshots/assets/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1024px;height:500px;overflow:hidden}
body{position:relative;font-family:Inter,sans-serif;color:#fff;background:#160a3d url('../assets/feature-bg.webp') center/cover}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(16,6,48,.9) 0%,rgba(16,6,48,.7) 34%,rgba(16,6,48,0) 58%)}
.c{position:absolute;left:60px;top:50%;transform:translateY(-50%);width:430px}
.brand{display:flex;align-items:center;gap:18px;margin-bottom:26px}
.brand img{width:76px;height:76px;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.brand span{font:700 40px/1 Inter;letter-spacing:-.01em}
h1{font-family:Fraunces,serif;font-weight:600;font-size:56px;line-height:1.02;letter-spacing:-.02em;font-variation-settings:"SOFT" 50}
h1 em{font-style:normal;color:#fec84b}
p{margin-top:16px;font:500 23px/1.35 Inter;color:rgba(255,255,255,.9)}
</style></head><body><div class="shade"></div>
<div class="c"><div class="brand"><img src="../assets/icon-512.png" alt=""><span>TripCache</span></div>
<h1>Every booking,<br>one <em>itinerary</em></h1>
<p>Flights, hotels, deadlines and documents in one place.</p></div></body></html>"""


def shot(html_text, name, size, fmt):
    build = ROOT / "build"
    build.mkdir(exist_ok=True)
    html = build / f"{name}.html"
    html.write_text(html_text)
    png = Path(tempfile.gettempdir()) / f"tc-play-{name}.png"
    subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1",
                    f"--window-size={size[0]},{size[1]}", "--virtual-time-budget=4000",
                    "--allow-file-access-from-files", f"--screenshot={png}", html.as_uri()],
                   check=True, capture_output=True)
    out = ROOT / "out"
    out.mkdir(exist_ok=True)
    dst = out / f"{name}.{fmt}"
    if fmt == "jpg":
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "92", str(png), "--out", str(dst)],
                       check=True, capture_output=True)
    else:
        dst.write_bytes(png.read_bytes())
    print(dst.relative_to(ROOT))


if __name__ == "__main__":
    for i, frame in enumerate(FRAMES, 1):
        shot(page(frame), f"{i:02d}-{frame[0]}", (W, H), "jpg")
    if (ROOT / "assets" / "feature-bg.webp").exists():
        shot(FEATURE, "feature-graphic", (1024, 500), "png")
