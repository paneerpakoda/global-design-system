import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('ships GlobalDS as a versioned, Git-consumable Flutter package', () => {
  const pubspec = read('flutter/pubspec.yaml');
  const fontDirectory = path.join(projectRoot, 'flutter/lib/fonts');

  assert.match(pubspec, /^name: global_ds$/m);
  assert.match(pubspec, /^version: 0\.5\.0$/m);
  assert.match(pubspec, /^publish_to: none$/m);
  assert.match(pubspec, /sdk: ['"]>=3\.6\.0 <4\.0\.0['"]/);
  assert.match(pubspec, /flutter: ['"]>=3\.27\.0['"]/);
  assert.match(pubspec, /Mulish-Regular\.ttf/);
  assert.match(pubspec, /Mulish-SemiBold\.ttf[\s\S]*?weight: 600/);
  assert.match(pubspec, /Mulish-Bold\.ttf[\s\S]*?weight: 700/);

  for (const font of ['Mulish-Regular.ttf', 'Mulish-SemiBold.ttf', 'Mulish-Bold.ttf']) {
    assert.ok(fs.statSync(path.join(fontDirectory, font)).size > 0, `${font} must be bundled`);
  }
  assert.match(read('flutter/lib/fonts/OFL.txt'), /SIL OPEN FONT LICENSE Version 1\.1/);
});

test('exposes foundations and every published Flutter component from one barrel', () => {
  const barrel = read('flutter/lib/global_ds.dart');
  const expectedExports = [
    'src/foundations/ds_tokens.dart',
    'src/foundations/ds_theme.dart',
    'src/components/rib_accordion.dart',
    'src/components/rib_activity_timeline.dart',
    'src/components/rib_avatar.dart',
    'src/components/rib_breadcrumb.dart',
    'src/components/rib_button.dart',
    'src/components/rib_calendar.dart',
    'src/components/rib_card.dart',
    'src/components/rib_checkbox.dart',
    'src/components/rib_chip.dart',
    'src/components/rib_dropdown.dart',
    'src/components/rib_empty_state.dart',
    'src/components/rib_info.dart',
    'src/components/rib_input_field.dart',
    'src/components/rib_label.dart',
    'src/components/rib_list.dart',
    'src/components/rib_loading_indicator.dart',
  ];

  for (const exportedPath of expectedExports) {
    assert.match(barrel, new RegExp(`export '${exportedPath.replaceAll('.', '\\.')}'`));
    assert.ok(fs.existsSync(path.join(projectRoot, 'flutter/lib', exportedPath)));
  }
});

test('generates package-aware Mulish typography from the governed token source', () => {
  const tokens = read('flutter/lib/src/foundations/ds_tokens.dart');

  assert.match(tokens, /static const String fontFamilyName = 'Mulish';/);
  assert.match(tokens, /static const String fontPackage = 'global_ds';/);
  assert.match(tokens, /static const String fontFamily = 'packages\/global_ds\/Mulish';/);
  assert.match(tokens, /fontFamily: fontFamilyName,/);
  assert.match(tokens, /package: fontPackage,/);
});

test('marks Flutter supported while retaining native reference targets as deferred', () => {
  const context = vm.createContext({ console });
  for (const relativePath of ['js/rib-atoms.js', 'js/iconography.js', 'js/tokens.js', 'js/exports.js']) {
    vm.runInContext(read(relativePath), context, { filename: relativePath });
  }

  const exportsApi = vm.runInContext('GlobalDSExports', context);
  assert.deepEqual(
    Array.from(exportsApi.targets, target => [target.id, target.status]),
    [
      ['kotlin-react', 'deferred'],
      ['flutter', 'supported'],
      ['swiftui', 'deferred'],
    ],
  );
  assert.deepEqual(Array.from(exportsApi.commonFiles), ['ds_tokens.json']);
});

test('documents package installation instead of browser downloads', () => {
  const index = read('index.html');
  const app = read('js/app.js');

  assert.doesNotMatch(index, /js\/exports\.js/);
  assert.match(app, /label: 'Flutter'/);
  assert.match(app, /title:'Flutter package'/);
  assert.match(app, /github\.com\/paneerpakoda\/global-design-system\.git/);
  assert.match(app, /ref: v0\.5\.0/);
  assert.match(app, /path: flutter/);
  assert.match(app, /package:global_ds\/global_ds\.dart/);
  assert.match(app, /Kotlin\/React and SwiftUI/);
  assert.match(app, /deferred/i);
  assert.doesNotMatch(app, /data-dl=/);
  assert.doesNotMatch(app, /GlobalDSExports\.generate/);
  assert.doesNotMatch(app, /Platform exports/);
});
