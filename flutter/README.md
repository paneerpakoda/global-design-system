# GlobalDS for Flutter

GlobalDS provides the governed ICICI Bank foundations, Material 3 theme, and audited RIB Flutter components through one package import.

## Install

Pin the package to a released Git tag:

```yaml
dependencies:
  global_ds:
    git:
      url: https://github.com/paneerpakoda/global-design-system.git
      ref: v0.5.0
      path: flutter
```

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
