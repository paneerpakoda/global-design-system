# GlobalDS portal integration

The portal lists eight new Flutter controls individually: select, date field,
radio group, toggle, segmented control, OTP, stepper and upload. Input, button,
checkbox, calendar, accordion and info pages describe their improvements.
Each page embeds the compiled Flutter catalog at `flutter-preview/`, deep-linked
to the selected control. No JavaScript replica implements these live previews.

`js/flutter-components.js` contains the portal descriptions, constructor excerpts
and usage examples. Product state and service callbacks remain consumer-owned.
Earlier HTML design specimens are retained under explicitly labelled references
for the six existing components. The eight new pages show the implemented
controls only. Full Dart source links point to `codex/flutter-core-components`.

The Pages workflow builds the Flutter example and includes its artifact under
`flutter-preview/`. For a local preview from the repository root:

```sh
cd flutter/example
flutter build web --release --no-web-resources-cdn --base-href /flutter-preview/
cd ../..
mkdir -p flutter-preview
cp -R flutter/example/build/web/. flutter-preview/
python3 -m http.server 8790 --bind 127.0.0.1
```

Open `http://127.0.0.1:8790/#/c/select`. The compiled output is ignored by Git.
Stable component IDs in the portal correspond to `componentIds` in the Flutter
example. `embed=true` displays the specimen alone; the full-preview link keeps
the developer catalog and component description.
