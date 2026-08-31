# GlobalDS Portal

The visual documentation and developer hub for the **ICICI Bank Global Design System**. GlobalDS Portal makes shared foundations, components, banking patterns and platform guidance accessible to designers, product teams, content teams and engineers.

Version 0.5 uses the complete audited RIB Atoms file as its canonical foundation, supports desktop, tablet and mobile grids, and publishes those foundations with the audited components as an installable Flutter package. It also preserves the complete 283-icon RIB Figma library as a searchable, source-audited iconography contract. RIB remains an audited source system and current adopter; the portal represents the shared design system rather than a single product.

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
| **Flutter** | Versioned package installation, theme setup, component usage and release guidance |

## Flutter package

Install the nested package from a released Git tag:

```yaml
dependencies:
  global_ds:
    git:
      url: https://github.com/paneerpakoda/global-design-system.git
      ref: v0.5.0
      path: flutter
```

Applications consume the complete supported surface through one import:

```dart
import 'package:global_ds/global_ds.dart';
```

The package includes the generated foundations, `DsTheme.light`, all published `Rib*` Flutter components, and licensed Mulish 400/600/700 font assets. Kotlin/React and SwiftUI snapshots remain in the repository as deferred references; they are not supported integrations. JSON is generated only for internal contract validation.

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
│   ├── exports.js      # Internal deterministic generation contract
│   ├── components.js
│   ├── patterns.js
│   ├── sandbox.js      # Per-component mini playground definitions and controls
│   ├── motion.js
│   └── app.js          # Navigation and documentation pages
├── kotlin-react/       # Deferred generated reference snapshots
├── flutter/            # Installable GlobalDS Flutter package
│   ├── lib/global_ds.dart
│   ├── lib/src/foundations/ # Generated tokens and Material theme
│   ├── lib/src/components/  # Published RIB components
│   └── lib/fonts/           # Bundled Mulish faces and OFL license
├── swiftui/            # Deferred generated reference snapshots
├── assets/icons/       # Exact Figma SVG and whole-node image exports
├── scripts/
│   └── generate-exports.mjs
└── tests/
    ├── exports.test.mjs
    └── app-integration.test.mjs
```

The rule that keeps the system honest: exact RIB assets are recorded in `js/rib-atoms.js`, every governed UI foundation resolves through `js/tokens.js`, and generated foundation files are projections that must not be edited independently.

Component implementations follow the same rule. Published web components consume the foundation custom properties in `css/app.css`; Flutter components import the package foundations and use `DsColors`, `DsText`, `DsSpacing`, `DsRadius`, and `DsEffects` instead of recreating foundation values. `tests/component-foundations-contract.test.mjs` enforces that boundary so new components cannot introduce raw foundation colours, typography, spacing, radii, or effects.

## Generate and verify

Use the bundled or system Node.js runtime:

```bash
node scripts/generate-exports.mjs
node --test tests/*.test.mjs
cd flutter
flutter pub get
flutter analyze
flutter test
```

The tests verify all 139 RIB assets, exact representative Figma values, the duplicate Brown 120 source conflict, responsive grids, native variables/effects/type metadata, deterministic generation, package exports, bundled font weights, backwards-compatible routing, and byte-for-byte agreement between live generation and checked-in snapshots.

## Adding a component

1. Add the component entry to `js/components.js`.
2. Add matching `ds-*` styles to `css/app.css`.
3. Add its mini playground definition in `js/sandbox.js` and reference that definition from the component's `sandbox` field.
4. Add the implementation under `flutter/lib/src/components/`, export it from `flutter/lib/global_ds.dart`, and consume the package foundations instead of copying raw values.

## Roadmap

- [ ] Dark theme tokens for every platform
- [ ] Geography theming for Canada and later international markets
- [ ] Semantic component tokens beyond the current light-theme bridge
- [ ] Reassess Kotlin/React and SwiftUI delivery when an active consumer and package strategy exist
- [ ] More banking patterns, including bill pay, payee management and onboarding/KYC
- [ ] Hindi and French string-length stress testing
