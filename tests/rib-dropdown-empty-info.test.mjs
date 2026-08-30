import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf8') : '';

test('documents the audited Dropdown area variants from Figma', () => {
  const source = read('js/components.js');
  assert.match(source, /node-id=3869-5784/);
  for (const state of ['Expanded', 'Expanded Hover', 'Pressed', 'Selected Dropdown', 'Selected dropdown hover']) {
    assert.match(source, new RegExp(state));
  }
  assert.match(source, /function renderRibDropdown/);
  assert.match(source, /role="listbox"/);
  assert.match(source, /role="option"/);
  assert.match(source, /esc\(item\.label\)/);
});

test('matches Dropdown geometry and audited foundation colours', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-dropdown-menu\{[^}]*width:258px[^}]*border:1px solid var\(--surface-cool-grey-110\)[^}]*border-radius:12px[^}]*box-shadow:var\(--effect-shadow-200\)/);
  assert.match(css, /\.rib-dropdown-option\{[^}]*padding:12px 16px[^}]*font-size:12px[^}]*line-height:16px/);
  assert.match(css, /\.rib-dropdown-option\.is-hover\{[^}]*background:var\(--neutral-grey-60\)/);
  assert.match(css, /\.rib-dropdown-option\.is-selected\{[^}]*color:var\(--primary-orange-100\)/);
  assert.match(css, /\.rib-dropdown-option\.is-pressed\{[^}]*background:var\(--pastel-amber-90\)/);
});

test('implements the exact Empty state contract and assets', () => {
  const source = read('js/components.js');
  assert.match(source, /node-id=56-237/);
  assert.match(source, /With heading/);
  assert.match(source, /Without heading/);
  assert.match(source, /function renderRibEmptyState/);
  assert.match(source, /<section class="rib-empty-state/);
  assert.match(source, /esc\(title\)/);
  assert.match(source, /esc\(subline\)/);
  assert.ok(fs.existsSync(path.join(root, 'assets/rib/empty-state/empty.svg')));
  assert.ok(fs.existsSync(path.join(root, 'assets/rib/empty-state/add.svg')));
});

test('matches Empty state default, hover, and heading geometry', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-empty-state\{[^}]*width:468px[^}]*padding:16px[^}]*gap:8px[^}]*border-radius:12px[^}]*background:var\(--surface-cool-grey-90\)/);
  assert.match(css, /\.rib-empty-state\.is-hover\{[^}]*border-color:var\(--primary-orange-80\)[^}]*background:var\(--pastel-amber-90\)/);
  assert.match(css, /\.rib-empty-state\.has-heading\{[^}]*background:transparent[^}]*border-color:transparent/);
});

test('implements all Info tone, alignment, and stroke variants', () => {
  const source = read('js/components.js');
  assert.match(source, /node-id=348-9040/);
  for (const tone of ['Default', 'Success', 'Error', 'Warning']) assert.match(source, new RegExp(tone));
  assert.match(source, /function renderRibInfo/);
  assert.match(source, /role="status"/);
  assert.match(source, /esc\(message\)/);
  for (const icon of ['default', 'success', 'error', 'warning']) {
    assert.ok(fs.existsSync(path.join(root, `assets/rib/info/${icon}.svg`)));
  }
});

test('maps Info tones to audited semantic foundations', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-info\{[^}]*width:516px[^}]*padding:12px 16px[^}]*gap:8px[^}]*border-radius:12px/);
  assert.match(css, /\.rib-info--default\{[^}]*background:var\(--pastel-amber-100\)/);
  assert.match(css, /\.rib-info--success\{[^}]*background:var\(--pastel-green-90\)/);
  assert.match(css, /\.rib-info--error\{[^}]*background:var\(--pastel-peach-90\)[^}]*color:var\(--error-100\)/);
  assert.match(css, /\.rib-info--warning\{[^}]*background:var\(--warning-80\)/);
});

test('provides Flutter components backed by foundation tokens', () => {
  const dropdown = read('flutter/rib_dropdown.dart');
  const empty = read('flutter/rib_empty_state.dart');
  const info = read('flutter/rib_info.dart');
  assert.match(dropdown, /class RibDropdown<.*> extends StatelessWidget/);
  assert.match(dropdown, /DsColors\.primaryOrange100/);
  assert.match(empty, /class RibEmptyState extends StatelessWidget/);
  assert.match(empty, /DsColors\.surfaceCoolGrey90/);
  assert.match(info, /enum RibInfoTone/);
  assert.match(info, /DsColors\.success100/);
  assert.match(info, /DsColors\.error100/);
  assert.match(info, /DsColors\.warning110/);
});

test('publishes the first three audited component sets in catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  for (const id of ['dropdown', 'emptystate', 'info']) {
    assert.match(components, new RegExp(`sandbox: '${id}'`));
    assert.match(sandbox, new RegExp(`${id}:\\s*\\{`));
  }
});

