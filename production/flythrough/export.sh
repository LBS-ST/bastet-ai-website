#!/bin/sh
# Stitch clips A/B/C into one master and export the web frame sequences.
# Usage: ./export.sh [clipA] [clipB] [clipC]   (run from production/flythrough)
set -e
FF="${FF:-$HOME/.claude/skills/lbs-video-localize/bin/ffmpeg}"
A="${1:-clips/clip-a.mp4}"; B="${2:-clips/clip-b.mp4}"; C="${3:-clips/clip-c.mp4}"
X=0.125   # crossfade at each hand-off (continuations re-render the hand-off frame)
dur() { "$FF" -i "$1" 2>&1 | sed -n 's/.*Duration: \([0-9]*\):\([0-9]*\):\([0-9.]*\).*/\1 \2 \3/p' | awk '{print $1*3600+$2*60+$3}'; }
DA=$(dur "$A"); DB=$(dur "$B")
O1=$(echo "$DA - $X" | bc -l); O2=$(echo "$DA + $DB - 2*$X" | bc -l)
N='scale=1920:1080:flags=lanczos,fps=24,format=yuv420p,setsar=1'
"$FF" -v error -y -i "$A" -i "$B" -i "$C" -filter_complex \
  "[0:v]${N}[a];[1:v]${N}[b];[2:v]${N}[c];[a][b]xfade=transition=fade:duration=${X}:offset=${O1}[ab];[ab][c]xfade=transition=fade:duration=${X}:offset=${O2}[v]" \
  -map "[v]" -an -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p flythrough-master.mp4
echo "master: $(dur flythrough-master.mp4) s (joins at $O1 s and $O2 s)"

OUT=../../public/flythrough
rm -rf "$OUT/frames" "$OUT/portrait"; mkdir -p "$OUT/frames" "$OUT/portrait"
# Landscape: 1440 wide, 20 fps
"$FF" -v error -y -i flythrough-master.mp4 -an -vf "fps=20,scale=1440:-2:flags=lanczos" -c:v libwebp -quality 78 -start_number 0 "$OUT/frames/frame-%04d.webp"
# Portrait (phones): centre 9:16 crop at the source's native 720 px height (no upscale)
"$FF" -v error -y -i flythrough-master.mp4 -an -vf "fps=20,crop=608:1080,scale=406:720:flags=lanczos" -c:v libwebp -quality 76 -start_number 0 "$OUT/portrait/frame-%04d.webp"
cp "$OUT/frames/frame-0000.webp" "$OUT/poster.webp"
cp "$OUT/portrait/frame-0000.webp" "$OUT/poster-portrait.webp"
echo "frames: $(ls "$OUT/frames" | wc -l) landscape, $(ls "$OUT/portrait" | wc -l) portrait"
du -sh "$OUT/frames" "$OUT/portrait"
