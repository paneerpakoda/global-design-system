# GlobalDS portal integration

The portal has 22 component families. Thirteen pages embed the real Flutter
implementation with variant/state selectors and an interactive gallery of all
implemented variants. Date fields are part of Input, and select fields and their
menus are one Dropdown family. Old datefield/select links redirect to those pages.

`js/flutter-components.js` contains current constructors, usage and source links.
Input includes the related `RibDateField` API. Earlier HTML reference specimens
remain available, while the live gallery is the implemented Flutter contract.
Hover, focus and press are real interactions; loading is an optional button state.
Product state and service callbacks remain consumer-owned.

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

Open `http://127.0.0.1:8790/#/c/dropdown`. The compiled output is ignored by Git.
The Flutter catalog keeps legacy IDs as compatible aliases. `embed=true` displays the specimen alone; the full-preview link keeps
the developer catalog and component description.
