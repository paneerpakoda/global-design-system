# ICICI Global DS

The living design-system hub for **ICICI Global Design System** (ICICI Bank, international retail net banking). One app that holds the foundations, components, patterns, a live sandbox, and the Flutter handoff for every geography revamp (pilot: RIB Canada).

## Run it

No build step. Either:

- Open `index.html` directly in a browser, or
- Serve the folder: `npx serve .` (or any static server)

Internet is needed for the Inter font and Tabler icon webfont (CDN).

## What's inside

| Area | What it does |
|---|---|
| **Overview** | System hero, metrics, principles |
| **Foundations** | Colors (click-to-copy), typography scale, 4pt spacing, radius & elevation, iconography |
| **Components** | 9 components with variants, states, props API and a Flutter snippet each |
| **Pattern lab** | Login, OTP verification, transfer review, accounts home — in a phone frame with switchable states (error, loading, success…) |
| **Playground** | Toggle any component's props/states live; the matching Flutter call is generated underneath, ready to copy |
| **Developers** | `ds_tokens.dart`, `ds_theme.dart` and `ds_tokens.json` — generated live from the token source, downloadable |

## Architecture

```
icici-global-ds/
├── index.html          # shell: sidebar + router outlet
├── css/app.css         # docs chrome + ds-* component styles
├── js/
│   ├── tokens.js       # ★ SINGLE SOURCE OF TRUTH for all design tokens
│   ├── components.js   # component registry (docs, props, Flutter snippets)
│   ├── patterns.js     # pattern lab screens & states
│   ├── sandbox.js      # playground defs + live Dart codegen
│   └── app.js          # nav, router, pages, dart/json generators
└── flutter/
    ├── ds_tokens.dart  # snapshot of the generated tokens file
    └── ds_theme.dart   # snapshot of the generated ThemeData
```

**The rule that keeps this honest:** every visual in the app renders from `js/tokens.js`, and the Dart/JSON files are generated from the same object. Change a token once; the docs, the sandbox and the Flutter export all move together. The files in `flutter/` are convenience snapshots — regenerate from the Developers page after token changes.

## Adding a component

1. Add an entry to `js/components.js` (docs page appears automatically in the sidebar).
2. Add matching `ds-*` styles in `css/app.css`.
3. Optional: add a playground def in `js/sandbox.js` and use it in a pattern in `js/patterns.js`.

## Roadmap

- [ ] Dark theme tokens + `DsTheme.dark`
- [ ] Geography theming layer (Canada/UK/Germany content & currency config)
- [ ] More patterns: bill pay, payee management, onboarding/KYC
- [ ] Figma link-outs per component (Resources rail)
- [ ] Hindi/French string-length stress toggle in the sandbox
