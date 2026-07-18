<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Visuele identiteit

De visuele identiteit staat in [`DESIGN.md`](DESIGN.md) (DESIGN.md-formaat: YAML-tokens
+ toelichting). Lees dat bestand vóór je iets aan de vormgeving verandert, en houd de
tokens daar in sync met `app/globals.css` — dat is de plek waar ze in code leven.

```bash
npx designmd lint DESIGN.md                        # structuur valideren
npx designmd export DESIGN.md --format css-tailwind # tokens exporteren
```
