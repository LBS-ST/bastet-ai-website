---
id: BAI-2
title: 'Stage 2: scroll-scrubbed fly-through hero'
status: Done
assignee: []
created_date: '2026-09-29 00:11'
updated_date: '2026-09-29 00:11'
labels: []
dependencies: []
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Generate the homepage fly-through (Higgsfield Seedance 2.0) and wire it as a scroll-scrubbed frame sequence per reference/flythrough-desktop.md + flythrough-mobile.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 One continuous take, 0 scene cuts
- [x] #2 Frames + manifest + beat timings committed; mp4 git-ignored
- [x] #3 Reduced-motion / ?static fallback
- [x] #4 build:all green
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
4ca1911: 44.83 s master, 897 frames (landscape + portrait), 204.25 credits. Verified with build:all and browser checks (beats, header switch, phone portrait-only fetch, ?static).
<!-- SECTION:FINAL_SUMMARY:END -->
