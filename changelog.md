## 🧮 Version History
- 1.8.0
  - breaking change: Removed JamIcons icon set. It is not maintained anymore.
  - breaking change: Updated tablr with new namespace (filled and outline).
  - breaking change: All icons are not exported from the main entry point when using resolver. For example, `import { BsIcon } from '@kalimahapps/vue-icons/bs'` will be `import { BsIcon } from '@kalimahapps/vue-icons'`. This is a minimal breaking change as it will only affect the type definitions.
  - chore: Update all icons
  - chore: Update all icon packages

- 1.4.1
  - chore: update all icon packages

- 1.4.0
  - breaking change: fix CoolIcons prefix. It had the same prefix as coreicons `co` but not it is corrected to be `cl`.
  - breaking change: Replace official material design repo with a generated one for SVG only.
  - fix: add missing 'ad' entry in package.json
  - chore: Update all icons

- 1.3.0
  - Add global import. No need to add a set name like `@kalimahapps/vue-icons/bs`. All icons now can be imported using `@kalimahapps/vue-icons`
  - Add typescript types
  - Add new icon sets
    - FontAudio
    - Akar
    - Charm Icons
    - CoolIcons
    - GitLab SVGs
    - Humble Icons
    - Lucide
    - Quill
    - Radix
    - System UIcons
  - Refactor code

- 1.2.0
  - Updated icon packages
  - Updated dev dependencies
  - Added tests
  - Added missing 'cd' to package.json

- 1.1.5
  - Add missing export "he" to package.json

- 1.1.3
  - Updated icon packages
  - Updated dev dependencies

- 1.0.6
  - Fixed bugs
  - Add 2 icon sets (bytesize, codicons)

- 1.0.5
  - Fixed bugs
  - Added a new icon set (majesticons)

- 1.0.3
  - Added three icon sets
  - Updated icon packages
  - Fixed minor bugs

- 1.0.1
  - Added icons resolver

- 1.0.0
  - Added 23 icon sets
  - Export format is changed to SVG to decrease package size
  - Updated demo UI and search

- 0.0.7
  - Update icons set

- 0.0.2
  - Initial Release
