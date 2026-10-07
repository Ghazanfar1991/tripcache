import subprocess
from pathlib import Path
R = Path(__file__).resolve().parent
imgs = sorted((R / 'out').glob('0*.jpg'))
html = R / 'build' / 'sheet.html'
html.write_text('<html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(4,300px);gap:8px;padding:8px">'
                + ''.join(f'<img src="../out/{i.name}" style="width:300px">' for i in imgs) + '</body></html>')
out = R / 'build' / 'sheet.png'
subprocess.run(["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "--headless=new", "--hide-scrollbars",
                "--window-size=1240,1090", "--allow-file-access-from-files", f"--screenshot={out}", html.as_uri()],
               check=True, capture_output=True)
print(out)
