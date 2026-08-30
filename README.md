# GlobalDS Portal

The visual documentation and developer hub for the **ICICI Bank Global Design System**. GlobalDS Portal makes shared foundations, components, banking patterns and platform guidance accessible to designers, product teams, content teams and engineers.

Version 0.5 uses the complete audited RIB Atoms file as its canonical foundation, supports desktop, tablet and mobile grids, and generates platform-native token and theme exports from one governed contract. It also preserves the complete 283-icon RIB Figma library as a searchable, source-audited iconography contract. RIB remains an audited source system and current adopter; the portal represents the shared design system rather than a single product.

The RIB foundation contract contains 139 audited assets: 87 paint styles, 36 text styles, 8 effect styles, 3 responsive grid styles and 5 variables. The iconography contract adds 283 exact Figma components across general, product-specific, special and side-navigation categories. The exact inventories live in `js/rib-atoms.js` and `js/iconography.js`; governed aliases and component-facing decisions live in `js/tokens.js`.

## Run it

No build step or package installation is required.

- Double-click `Launch ICICI Global DS.command`, or
- Run `python3 -m http.server 8790` in this directory and open `http://localhost:8790`.

Internet access is used only for the Google Fonts and Tabler Icons webfonts loaded by the documentation shell. Product iconography is served from committed local Figma exports.

## View it online

The portal is published from `main` with GitHub Pages:

`https://paneerpakoda.github.io/global-design-system/`

Pull requests run the same contract and snapshot checks. A successful push to `main` then packages the static portal and deploys it to the protected `github-pages` environment.

## What's inside

| Area | What it does |
|---|---|
| **Overview** | System summary, metrics and principles |
| **Foundations** | Complete RIB colours/gradients/variables, typography, responsive grids, 4pt spacing, radius, effects and iconography |
| **Components** | Alphabetical component catalogue, static variant references, per-component mini playgrounds and implementation guidance |
| **Pattern lab** | Login, OTP verification, transfer review and accounts-home flows |
| **Platform exports** | Kotlin/React, Flutter and SwiftUI tokens and theme files, plus shared JSON |

## Export contract

| Target | Generated files | Integration shape |
|---|---|---|
| Kotlin/React | `global_ds_tokens.kt`, `global_ds_theme.kt` | Kotlin/JS-safe colours, variables, typography, grids, effects, semantic theme and CSS-variable map |
| Flutter | `ds_tokens.dart`, `ds_theme.dart` | Flutter colours, variables, `TextStyle`, grids, effects and Material 3 `ThemeData` |
| SwiftUI | `GlobalDSTokens.swift`, `GlobalDSTheme.swift` | SwiftUI colours, variables, typography, grids, effects and an `EnvironmentValues` theme |
| Shared | `ds_tokens.json` | Platform-neutral pipeline and design-tool interchange |

The Kotlin export deliberately keeps its token file independent of a specific React styling library. The Developers page shows how to consume it with the JetBrains Kotlin React and Emotion wrappers. Flutter component snippets in the component catalogue and mini playgrounds remain Flutter-specific; this change adds cross-platform foundation exports rather than claiming cross-platform component implementations.

## Architecture

```text
icici-global-ds/
├── index.html
├── css/
│   ├── app.css
│   ├── iconography.css # Icon library page styles
│   └── motion.css
├── js/
│   ├── rib-atoms.js    # Lossless audited RIB Figma contract
│   ├── iconography.js  # 283-node icon manifest with exact local assets
│   ├── iconography-page.js # Searchable icon library page
│   ├── tokens.js       # Governed component-facing token object
│   ├── exports.js      # Deterministic three-platform export contract
│   ├── components.js
│   ├── patterns.js
│   ├── sandbox.js      # Per-component mini playground definitions and controls
│   ├── motion.js
│   └── app.js          # Navigation, pages and download UI
├── kotlin-react/       # Checked-in generated snapshots
├── flutter/            # Checked-in generated snapshots
├── swiftui/            # Checked-in generated snapshots
├── assets/icons/       # Exact Figma SVG and whole-node image exports
├── scripts/
│   └── generate-exports.mjs
└── tests/
    ├── exports.test.mjs
    └── app-integration.test.mjs
```

The rule that keeps the system honest: exact RIB assets are recorded in `js/rib-atoms.js`, every governed UI foundation resolves through `js/tokens.js`, and all generated Kotlin, Dart and Swift files are projections that must not be edited independently.

## Generate and verify exports

Use the bundled or system Node.js runtime:

```bash
node scripts/generate-exports.mjs
node --test tests/*.test.mjs
```

The tests verify all 139 RIB assets, exact representative Figma values, the duplicate Brown 120 source conflict, responsive grids, native variables/effects/type metadata, deterministic generation, JSON continuity, backwards-compatible routing, and byte-for-byte agreement between live generation and checked-in snapshots.

## Adding a component

1. Add the component entry to `js/components.js`.
2. Add matching `ds-*` styles to `css/app.css`.
3. Add its mini playground definition in `js/sandbox.js` and reference that definition from the component's `sandbox` field.

## Roadmap

- [ ] Dark theme tokens for every platform
- [ ] Geography theming for Canada and later international markets
- [ ] Semantic component tokens beyond the current light-theme bridge
- [ ] Native component implementation examples for Kotlin/React and SwiftUI
- [ ] More banking patterns, including bill pay, payee management and onboarding/KYC
- [ ] Hindi and French string-length stress testing
