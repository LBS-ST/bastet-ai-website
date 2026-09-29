#!/bin/sh
# Usage: ./inspect.sh clips/clip-a.mp4   → inspect/<name>-sheet.jpg, <name>-last.png, cut report
set -e
FF="${FF:-$HOME/.claude/skills/lbs-video-localize/bin/ffmpeg}"
IN="$1"; N=$(basename "$IN" .mp4); mkdir -p inspect
# contact sheet at 1 fps, 4 columns
"$FF" -v error -y -i "$IN" -vf "fps=1,scale=480:-2,tile=4x4:padding=4:color=white" -frames:v 1 "inspect/$N-sheet.jpg"
# exact last frame (for chaining) and first frame
"$FF" -v error -y -sseof -0.1 -i "$IN" -update 1 -frames:v 1 "inspect/$N-last.png"
"$FF" -v error -y -i "$IN" -frames:v 1 "inspect/$N-first.png"
# hidden-cut detection
CUTS=$("$FF" -v error -i "$IN" -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -c pts_time || true)
DUR=$("$FF" -i "$IN" 2>&1 | sed -n 's/.*Duration: \([0-9:.]*\).*/\1/p')
echo "$N: duration $DUR, scene cuts (>0.3): $CUTS"
"$FF" -v error -i "$IN" -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -o 'pts_time:[0-9.]*' || true
