# Flutter component changes for M2I

Scope: core controls only. These additions extend the existing GlobalDS Flutter
library; they do not replace its other components. Version 0.6.0-dev.1 is a development version. Import `package:global_ds/global_ds.dart`.

## New components

| Component | Reusable capability |
| --- | --- |
| `RibSelectField<T>` | Controlled selection, search inside the trigger, anchored options, keyboard navigation, Form validation, inline/outside labels and embedded prefix mode. |
| `RibDateField` | Controlled date input, placeholder, optional icon and bounded anchored calendar. |
| `RibRadioGroup<T>` | Exclusive choices, Form validation, stacked or wrapping inline layout, accessible group label and hover surface. |
| `RibToggle` | Controlled boolean input with governed sizes and selected/disabled states. |
| `RibSegmentedControl<T>` | Controlled selection between discrete options. |
| `RibOtpField` | Numeric entry, paste, length limit, autofill hint, autofocus and a slot for an app-owned resend action/timer. |
| `RibStepper` | Responsive progress indicator, labeled mode and current/completed/upcoming semantics. |
| `RibUpload` | File-selection action and idle/uploading/uploaded/error presentation; the app performs file I/O. |

## Existing components improved

| Component | Changes supporting usability |
| --- | --- |
| `RibInputField` | Native Form validation, controller/focus/keyboard/formatter support, read-only state, full-width option, prefixes and trailing actions, stable accessible names, empty/filled labels and consistent spacing. Focus preserves text selection. |
| `RibButton` | Correct opaque primary fill beneath its highlight; loading blocks activation, respects reduced motion, and preserves an accessible action. Optional corner-radius override. |
| `RibCheckbox` | Wrapping long labels, reviewed label typography, accessible target and optional visual-label hiding while retaining its semantic label. |
| `RibCalendar` | Complete six-week months, month/year navigation, date selection and bounds. |
| `RibAccordion` | Optional header actions and opt-in `maintainState` so collapsed fields retain their state. |
| `RibInfo` | Optional text-style override for consistent callout typography. |

## Developer package

```text
global_ds/
  lib/global_ds.dart           public component exports
  lib/src/components/         reusable Flutter controls
  lib/src/foundations/         governed tokens, theme and SVG icon API
  assets/icons/               original GlobalDS SVG assets
  lib/fonts/                  bundled Mulish fonts
  example/                    runnable Flutter component catalog
  test/                       component and interaction regression tests
  docs/flutter-components.md  this change list
  tool/sync_consumer.py        verify or refresh a bundled consumer
```

Use a local path dependency on `GlobalDS/flutter` during development. M2I uses a
self-contained copy in `packages/global_ds`; `SOURCE_MANIFEST.json` records its
canonical file hashes. Run the sync tool with `--check` to detect drift.

Consumers own values, controllers, validation rules and service callbacks.
OTP expiry, address lookup, upload limits and networking stay in M2I. Address
blocks, record editors, document/review layouts, dialogs, navigation, landing
sections, selection lists and toast helpers also stay in M2I. They are deferred
as potential patterns and are not exported from GlobalDS by this change.

The catalog groups the APIs into 13 Flutter component families. Date fields sit
within Input; select fields and menus sit within Dropdown. Each family exposes
all implemented variants with interactive state selectors. Run `flutter run -d chrome` from `example/`.
Testing this Flutter web build in a browser executes compiled Dart; the emitted
JavaScript does not imply a separately authored JavaScript UI. Native-platform
validation is still a separate step.

## Complete variant families

| Family | Variants | States and options |
| --- | --- | --- |
| Accordion | Standard, plain, no container, coloured, heading/subheading | Collapsed/expanded; 48px minimum header target; retained content |
| Button | Primary, outline, text, pastel, white, destructive outline/filled | Three supported sizes; leading/trailing icons; default, hover, focus, pressed, disabled, optional loading; text button stays small |
| Checkbox | Small, large, checkbox only | Checked/unchecked and disabled; padded rounded 44px targets |
| Input | Inline/outside labels, leading icon, trailing text/icon, password, helper/error, phone, amount, text area, inline/outside date | Empty, filled, error, disabled, read-only; password visibility toggle; date bounds/calendar |
| Dropdown | Outside/inline labels, searchable, compact, calling code, subheading options | Empty, filled, disabled, open; down/up caret; keyboard selection |
| Info | Body only, heading/body, outline, icon-free, centred content | Information, success, warning, error; icon centres against the text block |
| OTP | Single field, four boxes, six boxes, grouped six, masked boxes | Empty, timer/resend slot, error, verifying, verified, disabled; one native editor supports full-code paste and autofill |
| Segmented control | Two or three connected options | Selected, hover, focus, disabled; use for a short related choice |
| Stepper | Horizontal, vertical, compact, short labelled flow | Upcoming, current, completed, error; optional descriptions; completed-stage navigation |
| Upload | Upload area, compact selector | Empty, uploading/progress, uploaded, error/retry, disabled; file details and removal |

`RibOtpVariant`, `RibOtpStatus`, `RibStepperVariant` and `RibUploadVariant`
make those choices explicit in Dart. Existing constructor defaults and exports
remain compatible. New icons for close and password visibility are byte-identical
GlobalDS SVG exports, included in the 21-asset provenance audit.
