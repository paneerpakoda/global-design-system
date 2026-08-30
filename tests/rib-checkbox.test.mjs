import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => {
  const absolutePath = path.join(projectRoot, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : '';
};

test('documents both RIB Checkbox sizes and all source states', () => {
  const components = read('js/components.js');
  assert.match(components, /title: 'Checkbox'/);
  assert.equal((components.match(/title: 'Checkbox'/g) || []).length, 1);
  assert.match(components, /node-id=68-1276/);
  for (const size of ['Small', 'Large']) assert.match(components, new RegExp(`label:'${size}'`));
  for (const state of ['Default', 'Hover', 'Active']) assert.match(components, new RegExp(`label:'${state}'`));
});

test('renders a native labelled checkbox and escapes its label', () => {
  const components = read('js/components.js');
  assert.match(components, /function renderRibCheckbox/);
  assert.match(components, /<label class="rib-checkbox/);
  assert.match(components, /<input class="rib-checkbox__input" type="checkbox"/);
  assert.match(components, /\$\{checked \? ' checked' : ''\}/);
  assert.match(components, /esc\(label\)/);
});

test('uses the exact local checked and unchecked Figma glyphs', () => {
  const components = read('js/components.js');
  for (const asset of [
    'assets/icons/general/filled/check-box-checked--filled--237-446.svg',
    'assets/icons/general/filled/checkbox-unchecked--filled--237-445.svg',
  ]) assert.ok(fs.existsSync(path.join(projectRoot, asset)), `${asset} should exist`);
  assert.match(components, /check-box-checked--filled--237-446\.svg/);
  assert.match(components, /checkbox-unchecked--filled--237-445\.svg/);
});

test('matches RIB Checkbox geometry, type, and audited colour states', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-checkbox__control\{[^}]*width:20px[^}]*height:20px/);
  assert.match(css, /\.rib-checkbox--small \.rib-checkbox__label\{[^}]*font-size:12px[^}]*line-height:20px/);
  assert.match(css, /\.rib-checkbox--large \.rib-checkbox__label\{[^}]*font-size:14px[^}]*line-height:20px[^}]*letter-spacing:\.5px/);
  assert.match(css, /\.rib-checkbox\.is-hover[^}]*\.rib-checkbox__label\{[^}]*font-weight:600[^}]*color:var\(--neutral-grey-140\)/);
  assert.match(css, /\.rib-checkbox__input:checked\+\.rib-checkbox__control\{[^}]*background-color:var\(--primary-orange-100\)/);
});

test('publishes Checkbox in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'checkbox'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /checkbox:\s*\{/);
  assert.match(sandbox, /RibCheckbox\(/);
});

test('provides a controlled Flutter RibCheckbox using foundation tokens', () => {
  const flutter = read('flutter/rib_checkbox.dart');
  assert.match(flutter, /enum RibCheckboxSize/);
  assert.match(flutter, /class RibCheckbox extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.neutralGrey140/);
  assert.match(flutter, /onChanged/);
});

test('provides a visible keyboard focus treatment', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-checkbox__input:focus-visible\+\.rib-checkbox__control\{[^}]*outline:3px solid #FFE8DD/);
});
