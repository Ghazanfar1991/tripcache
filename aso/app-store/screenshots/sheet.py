import subprocess,sys,tempfile
from pathlib import Path
R=Path(__file__).resolve().parent
loc=sys.argv[1]; imgs=sorted((R/'out'/loc).glob('*.jpg'))
html=R/'build'/f'sheet-{loc}.html'
html.write_text('<html><body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(5,258px);gap:8px;padding:8px">'+''.join(f'<img src="../out/{loc}/{i.name}" style="width:258px">' for i in imgs)+'</body></html>')
out=R/'build'/f'sheet-{loc}.png'
subprocess.run(["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome","--headless=new","--hide-scrollbars","--window-size=1338,1140","--allow-file-access-from-files",f"--screenshot={out}",html.as_uri()],check=True,capture_output=True)
print(out)
