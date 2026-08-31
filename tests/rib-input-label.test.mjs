import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf8') : '';

test('documents the full RIB Input field property model', () => {
  const source = read('js/components.js');
  assert.match(source, /node-id=941-3119/);
  for (const type of ['Label inline', 'Label out', 'Text area input']) assert.match(source, new RegExp(type));
  for (const state of ['Default', 'Hover', 'Typing', 'Disabled', 'Filled']) assert.match(source, new RegExp(state));
  assert.match(source, /Text Size/);
  assert.match(source, /Error/);
});

test('renders semantic, escaped Input field controls', () => {
  const source = read('js/components.js');
  assert.match(source, /function renderRibInputField/);
  assert.match(source, /<input class="rib-input-field__control"/);
  assert.match(source, /<textarea class="rib-input-field__control"/);
  assert.match(source, /aria-invalid="\$\{error \? 'true' : 'false'\}"/);
  assert.match(source, /esc\(label\)/);
  assert.match(source, /esc\(value\)/);
  assert.match(source, /assets\/rib\/input-field\/help\.svg/);
  assert.match(source, /assets\/rib\/input-field\/error\.svg/);
});

test('matches Input field geometry, type, and state foundations', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-input-field\{[^}]*width:245px[^}]*gap:8px/);
  assert.match(css, /\.rib-input-field__shell\{[^}]*height:48px[^}]*padding:12px 16px 12px 8px[^}]*border:1px solid var\(--surface-cool-grey-110\)[^}]*border-radius:var\(--r-md\)/);
  assert.match(css, /\.rib-input-field\.is-typing \.rib-input-field__shell\{[^}]*border-color:var\(--primary-orange-100\)/);
  assert.match(css, /\.rib-input-field\.has-error \.rib-input-field__shell\{[^}]*border-color:var\(--error-100\)/);
  assert.match(css, /\.rib-input-field--textarea \.rib-input-field__shell\{[^}]*height:84px/);
  assert.match(css, /\.rib-input-field__control\{[^}]*font-size:13px[^}]*line-height:20px[^}]*font-weight:500/);
});

test('documents every RIB Label size and colour', () => {
  const source = read('js/components.js');
  assert.match(source, /title: 'Label'/);
  assert.equal((source.match(/title: 'Label'/g) || []).length, 1);
  assert.match(source, /node-id=4049-5384/);
  for (const size of ['Icon-Large', 'Large', 'Medium', 'Small', 'Badge']) assert.match(source, new RegExp(size));
  for (const colour of ['Translucent', 'Inactive', 'Default-Grey', 'Green', 'Maroon', 'Blue', 'Red', 'Orange']) assert.match(source, new RegExp(colour));
  assert.match(source, /function renderRibLabel/);
  assert.match(source, /esc\(text\)/);
  assert.ok(fs.existsSync(path.join(root, 'assets/rib/label/tax-solutions.svg')));
});

test('matches Label geometry and foundation colour mapping', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-label--large,.rib-label--icon-large\{[^}]*min-height:24px[^}]*padding:4px 8px[^}]*border-radius:var\(--r-sm\)/);
  assert.match(css, /\.rib-label--medium\{[^}]*min-height:20px[^}]*padding:2px 8px[^}]*border-radius:var\(--r-xs\)/);
  assert.match(css, /\.rib-label--small\{[^}]*min-height:16px[^}]*padding:0 4px/);
  assert.match(css, /\.rib-label--badge\{[^}]*min-height:16px[^}]*padding:0 8px[^}]*border-radius:var\(--r-xs\) var\(--r-xs\) 0 0/);
  assert.match(css, /\.rib-label--orange\{[^}]*background:var\(--pastel-amber-100\)[^}]*color:var\(--primary-orange-100\)/);
  assert.match(css, /\.rib-label--green\{[^}]*background:var\(--pastel-green-100\)[^}]*color:var\(--success-100\)/);
});

test('provides Flutter Input field and Label components backed by foundations', () => {
  const input = read('flutter/lib/src/components/rib_input_field.dart');
  const label = read('flutter/lib/src/components/rib_label.dart');
  assert.match(input, /class RibInputField extends StatelessWidget/);
  assert.match(input, /enum RibInputFieldType/);
  assert.match(input, /DsColors\.surfaceCoolGrey110/);
  assert.match(input, /DsColors\.error100/);
  assert.match(label, /class RibLabel extends StatelessWidget/);
  assert.match(label, /enum RibLabelSize/);
  assert.match(label, /enum RibLabelColour/);
  assert.match(label, /DsColors\.primaryOrange100/);
});

test('publishes Input fields and Label in catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /sandbox: 'textfield'/);
  assert.match(components, /sandbox: 'label'/);
  assert.match(sandbox, /textfield:\s*\{/);
  assert.match(sandbox, /label:\s*\{/);
  assert.match(sandbox, /RibInputField\(/);
  assert.match(sandbox, /RibLabel\(/);
});
