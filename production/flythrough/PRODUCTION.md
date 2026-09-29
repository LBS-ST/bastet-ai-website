# Fly-through: production note (Stage 2)

Generated 2026-09-29 with Higgsfield MCP. Video model: **Seedance 2.0** (`seedance_2_0`), 720p, `mode: std`, 16:9, no audio. Stills: `gpt_image_2_5`.

## Route → master timing (44.83 s, 897 frames at 20 fps)

| Beat | Master seconds | What the camera does |
|---|---|---|
| arrive | 0 – 5 | Held opening frame, glide across the wet yard, through the open loading-bay door |
| darkness | 5 – 14.9 | Dark aisle between racking, bank past a wall corner, S-curve behind pallets |
| sensor | 14.9 – 19 | Rack sensor pulses cyan; a cyan scan line sweeps the floor and reveals glowing rodent trails |
| detect | 19 – 26.5 | Rise past a ceiling dome camera; a cyan detection box snaps round a rat (≈ 23–26 s) |
| report | 26.5 – 33 | Control room: floor-plan map dots light up, amber alert; turn towards the rear door |
| exit | 33 – 38.5 | Out of the rear door into the rear yard (not the front), yaw 180° to face the building |
| reveal | 38.5 – 44.8 | Fly backwards and climb to the aerial; cyan sensor-coverage grid over roof and yards |

Beat scroll distances, holds and chapter mapping live in `src/content/flythrough.ts`.

## Assets (this folder; `*.mp4` and `inspect/` are git-ignored)

| File | What | Higgsfield job |
|---|---|---|
| `stills/start-2.png` | **Chosen start still** (frame 0): door dead-centre, survives the phone crop | `7a99acd2-cc49-4dfd-aa5d-82e57c16b9fb` |
| `stills/start-1.png` | Alternative: raised dock, pallets, container | `f2d58d8d-6894-47ec-ad3c-c9d61ee9528a` |
| `stills/start-3.png` | Alternative: service lane, entrance off-centre | `edec9b6f-ee5d-4870-8dd5-b233ed0aae0c` |
| `stills/reveal-1.png` | **Chosen reveal reference**: rear of the building, service door, coverage grid | `e00489a7-ecfc-4721-ad3f-cd9f00b6bb60` |
| `stills/reveal-2.png` | Rejected: shows the front, not the rear | `d6361d4e-d820-4e19-b88b-16e2ae5902f6` |
| `clips/clip-a.mp4` | Clip A: image-to-video from start-2 (15.04 s) | `17283c66-b3c9-4387-9af4-8b47eee44378` |
| `clips/clip-b.mp4` | Clip B: continuation (15.04 s) | `30651cdd-6302-45a1-83ee-e9633d0aa60e` |
| `clips/clip-c.mp4` | Clip C: continuation ending on reveal-1 (15.04 s) | `fcc3c787-c755-4746-855b-ec543da3976f` |
| `flythrough-master.mp4` | Stitched master, 1920×1080, 24 fps, yuv420p, 44.83 s | — |

Scripts: `inspect.sh <clip>` (1 fps contact sheet, first/last frame, `scene>0.3` cut count) and `export.sh` (normalise, crossfade, export both frame sequences).

## How the chain was built

Seedance 2.0 has no video-extension mode. Seedance 2.5 does, but A + two extensions would have cost ≈ 278 credits, over the 250 budget. So each continuation used:

- `start_image` = the previous clip's exact last frame (uploaded PNG, media `9014b569…` and `3476477e…`),
- `video_references` = the previous clip's job (keeps height, speed, lens and light),
- Clip C also `end_image` = reveal-1, so the final aerial lands on the planned composition.

Joins use a **0.125 s crossfade** (`xfade=fade`) at 14.915 s and 29.830 s. Cut detection (`scene>0.3`): **0** on every clip and on the master.

## Prompts (abridged; the camera is always "one single continuous first-person camera move, no cuts; the camera itself is flying; nothing flying or hovering is ever visible in frame")

- **Clip A**: glide across the wet yard, through the open door, dark aisle with banking and an S-curve behind crates, then a wall sensor and a cyan floor sweep.
- **Clip B**: rack sensor pulses and a scan line reveals glowing rodent trails; rise past a dome camera and look down as a cyan detection box snaps round a rat; through a glass door into a control room where map dots light up and one pulses amber.
- **Clip C**: turn from the monitors to a rear service door; out into the rear yard; yaw 180°; fly backwards and climb to the aerial as a cyan coverage grid fades in; end on the given end frame.
- All: "every object is stationary unless described… No people. No text, no logos, no brand badges, no signage lettering." Higgsfield suggested its "IN THE DARK" preset; declined, generated literally.

## Repairs

None needed on the footage. Clip A's sensor sweep came out too faint (a green speck), so the sensor moment was moved into the start of Clip B, which continues from A's last frame. That cost no extra credits.

## Credits

| Item | Credits |
|---|---|
| 3 start stills + 2 reveal stills (`gpt_image_2_5`) | 1.75 |
| Clips A / B / C (Seedance 2.0, 15 s, 720p std, no audio) | 67.5 × 3 = 202.5 |
| **Total** | **204.25** (balance 599 → 394.75; budget 250) |

## Web export

- Landscape: `fps=20, scale=1440:-2 (lanczos), libwebp -quality 78` → 897 frames, 1440×810, 33 MB. Poster = frame 0.
- Portrait (phones): `fps=20, crop=608:1080, scale=406:720`, i.e. the centre 9:16 at the source's native 720 px height (no upscale) → 897 frames, 11 MB. Phones request only this set.
- Manifest version `2026-09-29a`. Checked the centre crop at frames 0, 120, 330, 400, 440, 490, 560, 620, 690, 740, 800 and 896: the door, sweep, dome camera, detection box, alert, yaw and aerial all stay in frame, so every beat's `focusX` stays 0.5.

## For Alex to look at

1. **Source is 720p**: the 1440-wide frames and the 1080p master are upscales. A 1080p re-render would cost about 3× the credits.
2. **Exit-sign pictograms** (green running figure, no lettering) appear on a few walls. The monitors show illegible pseudo-UI, no readable text.
3. **Rodent realism**: one brown rat inside the cyan detection box at ≈ 23–26 s. It reads clearly but is AI-generated, not a real capture.
4. **Chapter mapping** (How It Works steps on the sensor, detect and report beats; the home CTA on the reveal) reuses existing copy. Please confirm.
