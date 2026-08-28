# GlobalDS OS

The living design-system hub for **ICICI Bank GlobalDS OS**. It begins with the converged iMobile Android, iMobile iOS and RIB foundations, keeps the wider ICICI platform estate visible, and generates platform-native token and theme exports from one source.

## Run it

No build step or package installation is required.

- Double-click `Launch ICICI Global DS.command`, or
- Run `python3 -m http.server 8790` in this directory and open `http://localhost:8790`.

Internet access is used only for the Google Fonts and Tabler Icons webfonts loaded by the documentation UI.

## What's inside

| Area | What it does |
|---|---|
| **Overview** | System summary, metrics and principles |
| **Foundations** | Colours, typography, 4pt spacing, radius, elevation and iconography |
| **Components** | Component variants, states, props and implementation guidance |
| **Pattern lab** | Login, OTP verification, transfer review and accounts-home flows |
| **Playground** | Live component property/state controls with Flutter call generation |
| **Platform exports** | Kotlin/React, Flutter and SwiftUI tokens and theme files, plus shared JSON |

## Export contract

| Target | Generated files | Integration shape |
|---|---|---|
| Kotlin/React | `global_ds_tokens.kt`, `global_ds_theme.kt` | Kotlin/JS-safe primitives, typography values, semantic theme and CSS-variable map |
| Flutter | `ds_tokens.dart`, `ds_theme.dart` | Flutter `Color`/`TextStyle` primitives and Material 3 `ThemeData` |
| SwiftUI | `GlobalDSTokens.swift`, `GlobalDSTheme.swift` | SwiftUI `Color`/`Font` primitives and an `EnvironmentValues` theme |
| Shared | `ds_tokens.json` | Platform-neutral pipeline and design-tool interchange |

The Kotlin export deliberately keeps its token file independent of a specific React styling library. The Developers page shows how to consume it with the JetBrains Kotlin React and Emotion wrappers. Flutter component snippets in the existing component catalogue and playground remain Flutter-specific; this change adds cross-platform foundation exports rather than claiming cross-platform component implementations.

## Architecture

```text
icici-global-ds/
├── index.html
├── css/
│   ├── app.css
│   └── motion.css
├── js/
│   ├── tokens.js       # Single canonical token object
│   ├── exports.js      # Deterministic three-platform export contract
│   ├── components.js
│   ├── patterns.js
│   ├── sandbox.js
│   ├── motion.js
│   └── app.js          # Navigation, pages and download UI
├── kotlin-react/       # Checked-in generated snapshots
├── flutter/            # Checked-in generated snapshots
├── swiftui/            # Checked-in generated snapshots
├── scripts/
│   └── generate-exports.mjs
└── tests/
    ├── exports.test.mjs
    └── app-integration.test.mjs
```

The rule that keeps the system honest: every UI foundation and platform export resolves from `js/tokens.js`. Generated Kotlin, Dart and Swift files are projections and must not be edited independently.

## Generate and verify exports

Use the bundled or system Node.js runtime:

```bash
node scripts/generate-exports.mjs
node --test tests/*.test.mjs
```

The tests verify target identity, filenames, deterministic generation, complete colour and typography coverage, native theme APIs, JSON continuity, backwards-compatible routing, and byte-for-byte agreement between live generation and checked-in snapshots.

## Adding a component

1. Add the component entry to `js/components.js`.
2. Add matching `ds-*` styles to `css/app.css`.
3. Optionally add a playground definition in `js/sandbox.js` and use it in `js/patterns.js`.

## Roadmap

- [ ] Dark theme tokens for every platform
- [ ] Geography theming for Canada and later international markets
- [ ] Semantic component tokens beyond the current light-theme bridge
- [ ] Native component implementation examples for Kotlin/React and SwiftUI
- [ ] More banking patterns, including bill pay, payee management and onboarding/KYC
- [ ] Hindi and French string-length stress testing
