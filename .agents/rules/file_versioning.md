# File Versioning Rule

When creating or updating any of the following file types in this workspace:
- HTML files (.html) -- intros, pages, components
- Image files (.png, .jpg, .webp)
- Video files (.mp4, .webm)
- Generated assets (cutouts, thumbnails, etc.)

**NEVER overwrite or replace the existing file.**

Instead, save the new version with an incremented version suffix:

## Naming Format

<original_name>_v<number>.<ext>

### Examples

| Existing File        | New Version                          |
|----------------------|--------------------------------------|
| intro_cypher.html    | intro_cypher_v2.html                 |
| intro.html           | intro_v2.html, intro_v3.html         |
| cypher_cutout.png    | cypher_cutout_v2.png                 |
| index.html           | index_v2.html                        |
| thumb.webp           | thumb_v2.webp                        |

## Rules

1. Before creating a new version, check what version numbers already exist in the folder.
2. Pick the next available number (e.g., if _v2 exists, save as _v3).
3. If no version suffix exists on the original, the new file starts at _v2.
4. After saving the new file, inform the user of the new filename.
5. The original file is NEVER touched or deleted unless the user explicitly says so.
6. **Scenes Isolation Rule:** When working on isolated individual scenes, save them inside the `scenes/` directory using the format `scenes/scene_v<number>.html` (e.g., `scenes/scene_v1.html`, `scenes/scene_v2.html`).
