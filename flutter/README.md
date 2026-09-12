# GlobalDS for Flutter

GlobalDS provides the governed ICICI Bank foundations, Material 3 theme, and audited RIB Flutter components through one package import.

## Current Flutter development package

The M2I-driven core form controls and improvements to existing components live
here. Composed forms, record editors, dialogs, address blocks and branded layouts
remain in the consuming app; they can become design-system patterns later.
See [the component change list](docs/flutter-components.md) and run the
[Flutter component catalog](example/lib/main.dart).

Version `0.6.0-dev.1` is a development version; it is not a pub.dev release. The package requires Dart 3.9+
and Flutter 3.35+; validation uses Flutter 3.44.1. The example requires Dart 3.9+.
The old `v0.5.0` tag excludes these additions.
Developers can consume this branch directly:

```yaml
dependencies:
  global_ds:
    git:
      url: https://github.com/paneerpakoda/global-design-system.git
      ref: codex/flutter-core-components
      path: flutter
```

For local development, use `path: ../GlobalDS/flutter`. The existing `v0.5.0`
tag does not contain these additions. See the development branch's component
catalog before selecting a release for implementation.

## Use

```dart
import 'package:global_ds/global_ds.dart';

MaterialApp(
  theme: DsTheme.light,
  home: RibButton(
    label: 'Continue',
    onPressed: submitTransfer,
  ),
);
```

Mulish Regular, SemiBold, and Bold are bundled with the package. Consumers do not need `google_fonts` or separate font setup.

## Development

`lib/src/foundations/ds_tokens.dart` and `ds_theme.dart` are generated from the repository-level `js/tokens.js`. Do not edit those files directly.

```bash
node ../scripts/generate-exports.mjs
flutter pub get
flutter analyze
flutter test
```

## Form controls (local development)

The working package includes the M2I-driven form extensions below. They are not
part of the existing `v0.5.0` release tag. Use a local path until a new version is
reviewed and released:

```yaml
global_ds:
  path: ../GlobalDS/flutter
```

| Component | Responsibility |
| --- | --- |
| `RibInputField` | Native `TextFormField`; validator, focus, keyboard, formatters, read-only state, trailing action and responsive width |
| `RibSelectField<T>` | Controlled select, direct typing in the trigger, anchored filtered options, keyboard focus, cancellation and Form validation |
| `RibDateField` | Controlled date input, optional icon and bounded anchored calendar |
| `RibCalendar` | Complete six-week months, dynamic month/year choices, selection and date bounds |
| `RibRadioGroup<T>` | Exclusive options with optional Form validation |
| `RibToggle` / `RibSegmentedControl<T>` | Controlled boolean / discrete choices |
| `RibOtpField` | Numeric input, whole-code paste, length limit, autofill hint and optional inline resend action |
| `RibStepper` | Desktop progress and compact progress below 600px; `showLabels: true` keeps all labeled stages visible for short dialog flows, with current/completed/upcoming semantics |
| `RibUpload` | File selection/status presentation; no platform I/O |
| `RibAccordion` | Optional actions and `maintainState` for collapsed form sections |

Existing defaults remain, including the input's 245px width. Use
`width: double.infinity` for a form field and `maintainState: true` for sections
whose values and validation must survive collapse. Checkbox labels wrap.

```dart
Form(
  key: formKey,
  child: RibInputField(
    label: 'Company name',
    type: RibInputFieldType.labelOut,
    width: double.infinity,
    controller: companyController,
    validator: (value) => value == null || value.trim().isEmpty
        ? 'Enter company name' : null,
  ),
);

RibSelectField<String>(
  label: 'Country',
  value: country,
  searchable: true,
  items: const [RibDropdownItem(value: 'US', label: 'United States')],
  onChanged: (value) => setState(() => country = value),
);

RibDateField(
  label: 'Date of incorporation',
  value: incorporationDate,
  firstDate: DateTime(1900),
  lastDate: DateTime.now(),
  onChanged: (value) => setState(() => incorporationDate = value),
);
```

OTP expiry/resend, file limits, file access, address lookup, ownership rules and
network services belong in the consuming app. For M2I, upload files must be
**smaller than 3,000,000 bytes**; the portal's generic 5MB example is not a default.
The implemented OTP is one field; boxed OTP illustrations are design references.
The select uses an anchored menu that follows the field, fits the viewport and
closes on selection, Escape or outside click. Arrow keys navigate options; search
accepts text and Arrow Down moves to its results. `embedded: true` removes the
trigger border for input prefixes while retaining a readable menu width. Filled
values use Grey 140 semibold; disabled values use Grey 90.

The primary button now paints its highlight gradient over the orange fill on a
separate layer. A pixel test guards against its previously transparent default
state. Tests also cover form validation, searchable selection, calendar bounds,
six-week months and long checkbox labels. Generated foundations remain governed
by `js/tokens.js`.

Landing-page compositions can opt into `RibSelectField(compact: true, leading: …)`
for a single-line trigger, `RibRadioGroup(inline: true)` for wrapping horizontal
options, and `RibCheckbox(showLabel: false)` for rich consent content beside an
accessible checkbox. Labels remain required for semantics. `RibInputField` accepts
`hintMaxLines` for hint content; inline labels retain their complete accessible name.

Primary Orange 100 is `#E3530F`, as confirmed by the user on 2026-09-05.
The canonical token and generated Flutter foundations use this value; historical
RIB source-audit data retains its original colour for provenance.

Select hover follows `InputDecorationTheme.hoverColor` / `ThemeData.hoverColor`
to match input fields. Embedded triggers paint no additional hover overlay and
keep their label 4px from the 16px chevron instead of stretching that gap.

Search is integrated in the trigger. Outside labels use a persistent 14px semibold style.
`RibOtpField(resend: …)` places a consumer-owned widget inside the input on the
right. The app owns its enabled state, inline cooldown and expiry below the CTA.
`RibDateField(icon: …)` accepts a product asset; its action uses the input's hover
surface without an additional icon-button overlay.

### September 2026 field refinements

`RibSelectField(type: RibInputFieldType.labelOut)` places a persistent label above
one 48px trigger. The default inline variant uses one placeholder line. With
`searchable: true`, the trigger itself is the text input: opening shows all
options, typing filters, Arrow Down moves into results, and Escape restores the
committed selection. There is no second search box.

`RibInputField` uses 16px horizontal text padding and a 16px gap after a supplied
prefix. Inline labels float on focus or after entry and remain readable at 14px;
entered values use the semibold input style. The consumer sizes a calling-code
segment (64px for short codes, 80px for longer codes).

`RibDateField` opens an anchored calendar under the input, with the same surface
for the field and its icon. `RibToggle` follows the portal's 44×24 track, 20px
thumb and 2px inset, using the governed orange/neutral states.

OTP compositions put cooldown copy or an extra-small DS resend button inside
`RibOtpField`, and request expiry below the main CTA. Modal layout remains owned
by the consumer; the M2I implementation follows Figma 387:779.


### Input interaction corrections

Ordinary `RibInputField` controls explicitly disable desktop select-all-on-focus.
When a leading control is supplied, the label stays outside the combined input.
Its prefix surface sits inside the border and grows with text scaling. Prefix
padding accounts for Material 3's implicit 4px gap so the visible divider-to-text
space is 16px. Validation text similarly adds 4px to Material 3's native 4px
subtext gap, giving the same 8px gap as helper text. `RibDateField` positions the
calendar with its right edge beneath the field's trailing icon.

`RibButton.borderRadius` optionally overrides the size-specific corner radius.
M2I uses 12px for its compact OTP action to match its other form buttons;
other consumers retain the existing Figma defaults.

`RibButton` exposes its own semantic action and label so text buttons inside
lists remain individually discoverable. Searchable select hints are visual-only
when the field already supplies its accessible label, avoiding duplicate names.

Committing a searchable select choice collapses its text selection and ends
editing. Explicitly reopening the menu still prepares the text for searching.
`RibOtpField` owns a 16px inset around its trailing timer/action. Its opt-in
`autofocus` property focuses the input on creation; the M2I OTP dialogs enable it
for both phone and email verification.


### Inline empty and filled fields

`RibInputField.placeholder` supplies an instructional empty-state label separately
from its stable accessible name. Filled labels float at 12px; the field remains
48px high. Both controlled and local controllers update that state. Setting
`floatingLabelBehavior: FloatingLabelBehavior.never` supports a composite phone
placeholder without moving a label over its calling-code segment. The default
composite behavior remains outside-label for existing consumers.

`RibDateField` accepts `type` and `placeholder`. Non-compact inline selects float
their labels when selected, while compact and embedded controls retain their
existing presentation. Input/select surfaces use Cool Grey 90.


The labeled `RibStepper` follows GlobalDS node 120:656: 24px circles and connector,
8px gaps, 12px labels and neutral completed/inactive states. Only the active stage
is orange. `completedIcon` allows the exact exported glyph. Country-card radio
questions use `showLabel: false` with `inline: true` when the visible question is
already the card header; the accessible group label remains available.

### Radio hover surface

Radio choices use the shared small corner radius and cool-grey hover colour. Consumers can still choose inline or stacked layout; M2I uses stacked Yes/No groups consistently for conditional questions.

## M2I refinements now shared

`RibButton(loading: true)` renders an inline progress indicator while blocking
activation. Reduced motion uses a static indicator. Checkbox and radio labels
use the M2I-reviewed 14px typography and accessible targets; radio interactions
retain stable semantics across controlled value changes. `RibInfo.textStyle`
allows the shared responsive callout to use the journey's body style.

Use `python3 tool/sync_consumer.py /path/to/app --check` to verify a bundled
consumer against this canonical package. See `docs/flutter-components.md`.

See [the foundation audit](docs/foundation-audit.md) for token and icon provenance.
