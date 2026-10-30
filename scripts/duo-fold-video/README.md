# iPhone Duo video (home page `#iphone-duo`)

`public/duo/duo-tent-{1200,720}.{mp4,webm}`, `public/duo/tent.webp` and `public/duo/*-open.webp` are rendered frame by
frame from the [iphone-duo fold study](https://github.com/chuspeeism/iphone-duo) (Apple's iPhone Duo model + the
reference blur-and-darken shader), with TripCache's own captures from the "iPhone Duo" simulator:

- the inner display, open flat (2853 × 2007), loaded through the study's Custom mode;
- the cover display in the tent posture (the flight progress view, landscape), given to the cover screen only.

1. Clone the study, run its `scripts/prepare-assets.py` (see its README), apply `study-main.patch` to its `main.js`
   (`?dpr=` / `?ppu=`, and `window.__duo` with `setAngle`, the phone group, a cover-only canvas via
   `loadCover` / `setCoverMix`, and `setSurface`, which maps the cover by its own surface so it stays sharp in the
   tent). Copy the tent capture into the study's `cover/` folder. Serve it:
   `python3 -m http.server 8766 --bind 127.0.0.1`.
2. Write the timeline (open 1.2 s, fold 2.4 s, closed 0.6 s, turn landscape 1.8 s while the cover fades to the tent
   screen, open into the tent 2.0 s, hold 3.6 s, then back; 564 frames at 30 fps):
   `node timeline.mjs tent-all.json` (add a step, e.g. `30`, for a quick check set).
3. Render: `node pose.mjs trips.png frames-tent tent-all.json <study>/cover/tent.png`.
4. Encode (crop to the framing of the stills):

       V="crop=1960:1720:620:80,scale=1440:-2:flags=lanczos,format=yuv420p,setsar=1"
       ffmpeg -framerate 30 -i frames-tent/f%04d.png -vf "${V}" -c:v ffv1 master.mkv
       # per width w in 1200 720:
       ffmpeg -i master.mkv -vf scale=$w:-2 -c:v libx264 -preset veryslow -crf 27 -pix_fmt yuv420p -movflags +faststart -an duo-tent-$w.mp4
       ffmpeg -i master.mkv -vf scale=$w:-2 -c:v libvpx-vp9 -crf 41 -b:v 0 -row-mt 1 -an duo-tent-$w.webm

   `tent.webp`: a frame from the tent hold, same crop, 1440 wide, WebP q80.
   Screen stills (`<screen>-open.webp`): `node record.mjs <screen>.png <dir> stills` at 180°, same crop.

Mask personal details in the captures first (the flight screen's "Booked for" name).
