# Design

<!-- impeccable:design-schema 1 -->

## World

Operate-first rental desk. Light paper, navy chrome, gold used only on the Book control (matching the roundel). Sharp corners, hairline rules, no kickers, no icon-card grids, no testimonials.

## Type

- Display / UI: Bricolage Grotesque Variable
- Body / legal: Figtree Variable
- Scale: 0.7rem labels, 0.82–0.9rem body, ~1.05rem card titles, 1.7–2.35rem section titles

## Colour

- `--navy` `#0b1528` header, footer, primary buttons, desks band
- `--ink` `#161616` text
- `--muted` `#3e4654` secondary
- `--paper` `#f3f3f1` page
- `--white` cards and fields
- `--gold` `#c4a35a` Book now only
- `--line` `#d8d8d4` hairlines

## Layout

- Sticky navy header with transparent roundel
- Full-width photo hero (navy overlay, no kicker, no gradient text)
- Booking bar overlapping the bottom of the hero; sticky under the header on desktop ≥880px; stacked below a shorter hero on mobile
- Fleet as the page: 1 / 2 / 3 column hairline grid
- Requirements as a definition strip + details
- Desks as a two-column city list
- Car detail: bottom sheet on mobile, right drawer on desktop
- Booking dialog: full-bleed sheet on mobile, centered 560px on desktop

## Motion

- Button press `scale(0.98)` 120ms
- Drawer `cubic-bezier(0.32, 0.72, 0, 1)` ~320ms
- Card image zoom 1.03 on hover
- `prefers-reduced-motion` disables all of the above
