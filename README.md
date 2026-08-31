# GlobalDS Portal

GlobalDS Portal is the visual documentation and developer hub for the ICICI Bank
Global Design System. It publishes shared foundations, reusable components,
banking patterns, and a supported Flutter package from one governed source.

[View the portal](https://paneerpakoda.github.io/global-design-system/)

## Repository contents

| Area | Purpose |
|---|---|
| Portal | Static documentation for foundations, components, patterns, and Flutter usage |
| Foundations | Audited colours, typography, grids, spacing, radius, effects, and iconography |
| Components | Web references, interactive examples, and matching Flutter implementations |
| Patterns | Login, OTP, transfer review, and accounts-home examples |
| Flutter | Installable package exposing the supported `Rib*` components and design tokens |

The foundation contract contains 139 audited RIB assets: 87 paint styles, 36
text styles, 8 effect styles, 3 responsive grid styles, and 5 variables. The
iconography contract contains 283 local assets. Source records live in
`js/rib-atoms.js` and `js/iconography.js`; component-facing tokens live in
`js/tokens.js`.

## Run locally

No build step or package installation is required.

```bash
python3 -m http.server 8790
```

Open `http://localhost:8790`.

The portal loads Google Fonts and the Tabler Icons webfont from the internet.
Product iconography is served from committed local assets.

## Use the Flutter package

Install from a released Git tag:

```yaml
dependencies:
  global_ds:
    git:
      url: https://github.com/paneerpakoda/global-design-system.git
      ref: v0.5.0
      path: flutter
```

Import the package through its public entry point:

```dart
import 'package:global_ds/global_ds.dart';
```

The package includes generated foundations, `DsTheme.light`, published `Rib*`
components, and licensed Mulish 400, 600, and 700 font assets.

## Structure

```text
.
├── index.html                 # Portal entry point
├── css/                       # Portal and component styles
├── js/                        # Tokens, documentation data, and interactions
├── assets/                    # Local component and icon assets
├── flutter/                   # Supported Flutter package and example
├── scripts/generate-exports.mjs
└── tests/                     # Contract and integration tests
```

`js/tokens.js` is the governed source for generated Flutter foundations.
`flutter/lib/src/foundations/` is generated and should not be edited directly.
Web and Flutter components consume those foundations instead of duplicating raw
colour, typography, spacing, radius, or effect values.

## Generate and verify

```bash
node scripts/generate-exports.mjs
node --test tests/*.test.mjs
cd flutter
flutter pub get
flutter analyze
flutter test
```

The test suite verifies the audited foundation and icon contracts, deterministic
generation, checked-in Flutter output, package exports, component behavior, and
portal integration.

## Add a component

1. Add its documentation entry to `js/components.js`.
2. Add the web styles to `css/app.css` using existing foundation variables.
3. Add its interactive example to `js/sandbox.js`.
4. Implement and export the Flutter component from `flutter/lib/`.
5. Add contract tests for the web and Flutter surfaces.
