# Flutter core-component foundation audit

This audit covers the eight new controls and six improved components in
`flutter-components.md`. They are implemented inside this GlobalDS library.
Product layouts remain deferred patterns.

| Foundation | Source used by the components |
| --- | --- |
| Typography | `DsText` styles and bundled GlobalDS Mulish Regular/SemiBold/Bold; floating input labels use `inputLRegular`, step labels use existing `s1Bold`/`p1Semi`. |
| Colours and gradients | Generated `DsColors`, including Primary Orange 100 `#E3530F`; `js/tokens.js` remains authoritative. Transparent framework surfaces carry no extra brand colour. |
| Spacing and corners | `DsSpacing` / `DsRadius`; replaced remaining literal select corners/gaps and expressed toggle padding using the spacing scale. |
| Effects | Existing `DsEffects` shadows and focus-ring values; framework menu elevation remains a rendering parameter. |
| Icons | `DsIcon` renders 18 original audited SVGs, copied byte-for-byte from repository `assets/icons`. Source paths and SHA-256 hashes are recorded in `icon-provenance.json`. |

The scoped controls no longer use Material icon glyphs. Checkbox and radio
marks use the GlobalDS checked/unchecked and on/off assets. Select, calendar,
stepper, helper text and info tones use the corresponding GlobalDS assets.
The upload action uses the existing document glyph: there is no audited upload
arrow in this asset set. Accordion defaults use shield/document assets.
Consumers can continue supplying their own supported leading/trailing content.

Control geometry (field heights, hit targets, calendar width and hairline border
insets) is a component specification, rather than a spacing primitive. Existing
animation durations remain component behavior; GlobalDS has no motion-token
scale to substitute. No new foundational scale was invented for these values.

`flutter_svg ^2.3.0` renders the original assets, requiring Dart 3.9+ and Flutter
3.35+. The package has been validated with Flutter 3.44.1. SVG source geometry
is unchanged; component semantic colours are applied at render time.

## Verification

```sh
node scripts/generate-exports.mjs
python3 flutter/tool/check_foundations.py
cd flutter
flutter analyze
flutter test
```

The generator must leave the tracked token/theme output unchanged. The icon
check verifies both the canonical assets and their package copies against the
manifest. Flutter tests cover rendering every SVG, icon semantics, core control
interactions and component layout at phone/desktop widths.

Validated for this branch: 160 repository contract tests, 25 package tests,
one standalone catalog test and 87 M2I consumer tests pass. Package, example
and consumer analysis are clean. The catalog release web build succeeds;
the existing CupertinoIcons font-discovery warning remains. No native host
build was performed.
