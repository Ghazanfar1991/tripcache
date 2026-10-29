# iPhone Duo fold video (home page `#iphone-duo`)

`public/duo/duo-fold-{1200,720}.{mp4,webm}` and `public/duo/*-open.webp` are rendered frame by frame from the
[iphone-duo fold study](https://github.com/chuspeeism/iphone-duo) (Apple's iPhone Duo model + the reference
blur-and-darken shader), with TripCache's own inner-display captures (2853 × 2007, open flat, from the
"iPhone Duo" simulator) loaded through its Custom mode.

1. Clone the study, run its `scripts/prepare-assets.py` (see its README), then patch its local `main.js`:
   read `?dpr=` and `?ppu=` from the URL for `setPixelRatio` and the `pixelsPerUnit` cap, and expose
   `window.__duo = { setAngle, stop, camera, controls, ready }` before `renderer.setAnimationLoop`.
   Serve it: `python3 -m http.server 8766 --bind 127.0.0.1`.
2. Write the hinge timeline (30 fps: open 1.4 s, close 2.6 s, closed 1.2 s, open 2.6 s, open 0.6 s; cosine eased):

       node -e "const f=30,a=[],h=(s,v)=>{for(let i=0;i<Math.round(s*f);i++)a.push(v)},m=(s,x,y)=>{const n=Math.round(s*f);for(let i=1;i<=n;i++)a.push(x+(y-x)*(1-Math.cos(Math.PI*i/n))/2)};h(1.4,180);m(2.6,180,0);h(1.2,0);m(2.6,0,180);h(0.6,180);require('fs').writeFileSync('angles.json',JSON.stringify(a))"

3. Render each screen (one at a time; the model takes a while to load):
   `node record.mjs trips.png frames-trips angles.json` (likewise trip, flight, documents).
4. Join (0.4 s crossfades while open, so chapters start every 8 s, as `CHAPTER_S` in `components/home/duo.tsx`
   expects) and encode. In zsh write `${V}`, not `$V[a]`:

       V="crop=1960:1720:620:80,scale=1440:-2:flags=lanczos,format=yuv420p,setsar=1,settb=1/30,fps=30"
       ffmpeg -framerate 30 -i frames-trips/f%04d.png -framerate 30 -i frames-trip/f%04d.png \
         -framerate 30 -i frames-flight/f%04d.png -framerate 30 -i frames-documents/f%04d.png \
         -framerate 30 -i frames-trips/f%04d.png -filter_complex \
         "[0]${V}[a];[1]${V}[b];[2]${V}[c];[3]${V}[d];[4]${V},trim=end_frame=12,setpts=PTS-STARTPTS[e];[a][b]xfade=duration=0.4:offset=8[ab];[ab][c]xfade=duration=0.4:offset=16[abc];[abc][d]xfade=duration=0.4:offset=24[abcd];[abcd][e]xfade=duration=0.4:offset=32[out]" \
         -map "[out]" -c:v ffv1 master.mkv
       # per width w in 1200 720:
       ffmpeg -i master.mkv -vf scale=$w:-2 -c:v libx264 -preset veryslow -crf 27 -pix_fmt yuv420p -movflags +faststart -an duo-fold-$w.mp4
       ffmpeg -i master.mkv -vf scale=$w:-2 -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -an duo-fold-$w.webm

   Posters: frame 0 of each screen, same crop, 1440 wide, WebP q80 → `<screen>-open.webp`.

Mask personal details in the captures first (the flight screen's "Booked for" name).
