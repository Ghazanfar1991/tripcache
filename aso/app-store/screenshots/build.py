"""Build App Store iPhone screenshots (1290x2796, the 6.7"/6.9" slot) from real app captures.

Every frame is a real TripCache screen (assets/screens, captured from the iOS simulator with the
latest UI and framed by videos/tripcache-promo/scripts/frame_phone.py) plus a caption set in the
brand fonts. Callouts are enlarged crops of those same screens, and the Live Activity card is
rebuilt from videos/tripcache-promo/live-activity-spec.md (taken from WidgetLiveActivity.swift).
Only the scenery behind the phone is generated (assets/backgrounds); every word on screen is real UI or our own caption.

Usage: python3 aso/app-store/screenshots/build.py [en-US|en-AU ...]
Output: aso/app-store/screenshots/out/<locale>/NN-<name>.jpg
"""
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
W, H = 1290, 2796
FRAMED_W, FRAMED_H = 1322, 2720
PHONE_W = 1040
PHONE_TOP = 1060  # phone bleeds off the bottom; the destination shows between headline and phone
K = PHONE_W / FRAMED_W  # framed-screen px -> canvas px

# (crop box in framed-screen px, callout width on canvas, canvas top)
CALLOUTS = {
    "reminder": ("set-reminders", (116, 1779, 1206, 2186), 1140, 2050),
    "inbox": ("smart-inbox", (106, 827, 1215, 1290), 1120, 1120),
    "visa": ("export-visa", (140, 1120, 1180, 1312), 1150, None),
}

# Background per frame: blue-hour destination photos generated with ChatGPT (gpt-image via Codex),
# matched to the trip on each screen and to the app's own trip-cover art direction.
BACKGROUNDS = {
    "itinerary": "01-sydney", "free-cancellation": "02-newyork", "email-import": "03-singapore",
    "flight-tracker": "04-flight", "timeline": "05-melbourne-tram", "documents": "06-documents",
    "budget": "07-southbank", "map": "08-coast", "visa-export": "09-london", "history": "10-bangkok",
}

FRAMES = [
    # name, screen, pro, headline (US), headline (AU/UK), sub, extra
    ("itinerary", "home", False,
     "Your travel itinerary, <em>organized</em>", "Your travel itinerary, <em>organised</em>",
     "Flights, hotels, cars and plans for every trip you've booked.", None),
    ("free-cancellation", "hotel-detail-cancellation", False,
     "Never miss a <em>free cancellation</em>", None,
     "Get reminded 7 days, 2 days, 1 day or on the day. Free.", "reminder"),
    ("email-import", "draft-review", True,
     "Forward booking emails. <em>Get a trip.</em>", None,
     "TripCache drafts each confirmation for you to check.", "inbox"),
    ("flight-tracker", "flight-detail-qf43", True,
     "Live <em>flight tracker</em> on your Lock Screen", None,
     "Delays, gate changes and arrival times at a glance.", "live"),
    ("timeline", "trip-detail-mel", False,
     "<em>Every booking</em> in one trip timeline", None,
     "Flights, stays, cars, trains, tours and restaurants.", None),
    ("documents", "docs-pin", False,
     "Travel documents, <em>locked</em>", None,
     "Passports, visas and tickets kept with the trip.", None),
    ("budget", "expenses-mel", False,
     "Travel <em>budget</em> & expense tracker", None,
     "150+ currencies, budgets by category, the real trip cost.", None),
    ("map", "trip-map-mel", False,
     "See your whole trip <em>on a map</em>", None,
     "Every flight, stay and stop on one map.", None),
    ("visa-export", "export-visa", False,
     "Export travel history <em>for visas</em>", None,
     "Visa summaries, travel history and expense reports as PDF or CSV.", "visa"),
    ("history", "history", False,
     "Every past trip, <em>in one place</em>", None,
     "Filter business and personal travel by date.", None),
]

CSS = """
@import url('../assets/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:%(W)dpx;height:%(H)dpx;overflow:hidden}
body{position:relative;font-family:Inter,system-ui,sans-serif;color:#fff;background:#160a3d}
.bg{position:absolute;inset:0;background-size:cover;background-position:center top}
/* readability: deep indigo at the top for the headline, darker edges, brand-violet tint */
.shade{position:absolute;inset:0;background:
  linear-gradient(180deg, rgba(14,6,42,.85) 0%%, rgba(20,8,60,.55) 14%%, rgba(28,10,80,.12) 24%%, rgba(28,10,80,0) 32%%),
  linear-gradient(0deg, rgba(10,4,30,.55) 0%%, rgba(10,4,30,0) 22%%),
  radial-gradient(120%% 80%% at 50%% 60%%, transparent 55%%, rgba(10,4,30,.45) 100%%)}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%%3E%%3Cfilter id='n'%%3E%%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%%3E%%3C/filter%%3E%%3Crect width='300' height='300' filter='url(%%23n)'/%%3E%%3C/svg%%3E")}
.glow{position:absolute;left:50%%;top:1700px;width:1300px;height:1500px;transform:translateX(-50%%);
  background:radial-gradient(closest-side, rgba(139,92,246,.45), transparent);filter:blur(30px)}
.copy{position:absolute;left:0;right:0;top:150px;text-align:center;padding:0 90px}
.pill{display:inline-block;font:800 30px/1 Inter;letter-spacing:.14em;color:#2a1170;background:#fec84b;
  padding:14px 26px 13px;border-radius:999px;margin-bottom:34px}
h1{font-family:Fraunces,serif;font-weight:600;font-size:122px;line-height:1.0;letter-spacing:-.025em;
  font-variation-settings:"SOFT" 50;text-wrap:balance}
h1 em{font-style:normal;color:#fec84b}
h1,p{text-shadow:0 4px 30px rgba(10,4,30,.55)}
p{margin:34px auto 0;max-width:1000px;font:500 46px/1.32 Inter;color:rgba(255,255,255,.84);text-wrap:balance}
.phone{position:absolute;left:%(PX)dpx;top:%(PT)dpx;width:%(PW)dpx;filter:drop-shadow(0 50px 70px rgba(12,2,40,.55))}
.callout{position:absolute;border-radius:46px;background-repeat:no-repeat;overflow:hidden;
  box-shadow:0 40px 90px rgba(12,2,40,.55),0 0 0 3px rgba(255,255,255,.65)}
/* Lock-screen Live Activity, rebuilt from live-activity-spec.md at x3 */
.la{position:absolute;left:90px;width:1110px;top:2210px;border-radius:84px;padding:30px 54px 36px;isolation:isolate;
  background:linear-gradient(135deg, #080809, #0e0e0f);
  box-shadow:0 0 0 2px rgba(255,255,255,.09),0 40px 90px rgba(0,0,0,.6);
  font-family:-apple-system,"SF Pro Text",Inter,sans-serif;font-variant-numeric:tabular-nums}
.la .hd{display:flex;align-items:center;gap:21px;color:#8f8f94;font-size:30px;font-weight:500}
.la .mk{width:84px;height:54px;border-radius:15px;background:rgba(255,255,255,.96);display:flex;align-items:center;
  justify-content:center;color:#e0001b;font:800 28px/1 -apple-system,Inter}
.la .sp{flex:1}
.la .ap{display:flex;justify-content:space-between;margin-top:12px}
.la .ap div{display:flex;flex-direction:column}
.la .ap .r{align-items:flex-end}
.la .code{font-size:66px;font-weight:700;color:#fff;line-height:1.05}
.la .tm{font-size:51px;font-weight:600;color:#00ff9e;line-height:1.1}
.la .st{display:flex;justify-content:space-between;color:#00ff9e;font-size:30px;font-weight:500;margin-top:6px}
.la svg{display:block;margin:6px 0 0}
.la .cd{text-align:center;margin-top:4px}
.la .cd b{display:block;font-size:54px;font-weight:700;color:#00ff9e}
.la .cd span{font-size:27px;font-weight:500;letter-spacing:2.4px;color:#8f8f94}
.lal{position:absolute;left:0;right:0;top:1762px;text-align:center;font:700 28px/1 Inter;letter-spacing:.16em;
  color:rgba(255,255,255,.9)}
"""

LIVE = """
<div class="la">
  <div class="hd"><div class="mk">QF</div><span>QF 43</span><div class="sp"></div><span>Sydney → Melbourne</span></div>
  <div class="ap"><div><span class="code">SYD</span><span class="tm">13:14</span></div>
    <div class="r"><span class="code">MEL</span><span class="tm">14:39</span></div></div>
  <div class="st"><span>T3 • In Flight</span><span>On time</span></div>
  <svg width="1002" height="78" viewBox="0 0 1002 78">
    <defs><filter id="g1" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="12"/></filter>
      <filter id="g2" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="24"/></filter></defs>
    <line x1="8" y1="39" x2="994" y2="39" stroke="rgba(43,43,46,.9)" stroke-width="7.5" stroke-linecap="round"/>
    <line x1="8" y1="39" x2="390" y2="39" stroke="rgba(0,255,158,.22)" stroke-width="34" stroke-linecap="round" filter="url(#g2)"/>
    <line x1="8" y1="39" x2="390" y2="39" stroke="rgba(0,255,158,.46)" stroke-width="16" stroke-linecap="round" filter="url(#g1)"/>
    <line x1="8" y1="39" x2="390" y2="39" stroke="#00ff9e" stroke-width="7.5" stroke-linecap="round"/>
    <text x="390" y="54" text-anchor="middle" font-size="45" fill="rgba(255,255,255,.82)">✈︎</text>
  </svg>
  <div class="cd"><b>52 min</b><span>UNTIL GATE ARRIVAL</span></div>
</div>
"""


def callout_html(key):
    screen, (x0, y0, x1, y1), width, top = CALLOUTS[key]
    s = width / (x1 - x0)
    h = round((y1 - y0) * s)
    if top is None:  # pop out of the same spot on the phone
        top = round(PHONE_TOP + (y0 + y1) / 2 * K - h / 2)
    left = (W - width) // 2
    return (f'<div class="callout" style="left:{left}px;top:{top}px;width:{width}px;height:{h}px;'
            f"background-image:url('../assets/screens/{screen}.png');"
            f'background-size:{round(FRAMED_W * s)}px {round(FRAMED_H * s)}px;'
            f'background-position:-{round(x0 * s)}px -{round(y0 * s)}px"></div>')


def page(frame, locale):
    name, screen, pro, h_us, h_au, sub, extra = frame
    head = h_au if (locale in ("en-AU", "en-GB") and h_au) else h_us
    css = CSS % {"W": W, "H": H, "PX": (W - PHONE_W) // 2, "PT": PHONE_TOP, "PW": PHONE_W}
    extra_html = LIVE if extra == "live" else (callout_html(extra) if extra else "")
    pill = '<div class="pill">PRO</div><br>' if pro else ""
    copy_top = "110px" if pro else "150px"
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>{css}.copy{{top:{copy_top}}}</style></head>
<body><div class="bg" style="background-image:url('../assets/backgrounds/{BACKGROUNDS[name]}.webp')"></div><div class="shade"></div><div class="grain"></div><div class="glow"></div>
<div class="copy">{pill}<h1>{head}</h1><p>{sub}</p></div>
<img class="phone" src="../assets/screens/{screen}.png" alt="">
{extra_html}
</body></html>"""


def render(locale):
    out = ROOT / "out" / locale
    out.mkdir(parents=True, exist_ok=True)
    build = ROOT / "build"
    build.mkdir(exist_ok=True)
    for i, frame in enumerate(FRAMES, 1):
        html = build / f"{locale}-{i:02d}.html"
        html.write_text(page(frame, locale))
        png = Path(tempfile.gettempdir()) / f"tc-{locale}-{i:02d}.png"
        subprocess.run([CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1",
                        f"--window-size={W},{H}", "--virtual-time-budget=4000", "--allow-file-access-from-files",
                        f"--screenshot={png}", html.as_uri()], check=True, capture_output=True)
        dst = out / f"{i:02d}-{frame[0]}.jpg"
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "92", str(png), "--out", str(dst)],
                       check=True, capture_output=True)
        print(dst.relative_to(ROOT))


if __name__ == "__main__":
    for loc in (sys.argv[1:] or ["en-US", "en-AU"]):
        render(loc)
