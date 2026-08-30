import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file), 'utf8') : '';

test('documents all five published RIB List component sets', () => {
  const source = read('js/components.js');
  for (const node of ['4122-2771', '4122-2906', '4251-15996', '4254-17222', '4254-17224']) assert.match(source, new RegExp(`node-id=${node}`));
  for (const type of ['Single column', 'Headline', 'Two column container', 'Two column standard', 'Checklist']) assert.match(source, new RegExp(type));
  for (const variant of ['Filled icon + circle', 'Line icon', 'Filled icon + square', 'No Headline Large', 'No Headline Small', 'Numbered']) assert.ok(source.includes(variant), `${variant} should be documented`);
});

test('renders semantic escaped lists and checklist controls', () => {
  const source = read('js/components.js');
  assert.match(source, /function renderRibList/);
  assert.match(source, /<ul class="rib-list/);
  assert.match(source, /<li class="rib-list__item/);
  assert.match(source, /<input type="checkbox"/);
  assert.match(source, /esc\(item\.title\)/);
  assert.match(source, /esc\(item\.subject/);
  assert.ok(fs.existsSync(path.join(root, 'assets/rib/list/bank.svg')));
  assert.ok(fs.existsSync(path.join(root, 'assets/rib/list/block-card.svg')));
});

test('matches List single and two-column foundation geometry', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-list\{[^}]*width:308px[^}]*font-family:var\(--font\)/);
  assert.match(css, /\.rib-list__item\{[^}]*gap:12px[^}]*padding:12px 0[^}]*border-bottom:1px solid var\(--surface-cool-grey-110\)/);
  assert.match(css, /\.rib-list__icon\{[^}]*width:36px[^}]*height:36px[^}]*background:var\(--surface-cool-grey-100\)/);
  assert.match(css, /\.rib-list--icon-circle,\.rib-list--line-icon,\.rib-list--icon-square\{[^}]*width:288px/);
  assert.match(css, /\.rib-list--line-icon \.rib-list__icon::after\{[^}]*inset:6px/);
  assert.match(css, /\.rib-list--no-headline-large\{[^}]*width:276px/);
  assert.match(css, /\.rib-list--no-headline-small \.rib-list__icon\{[^}]*width:32px[^}]*height:32px/);
  assert.match(css, /\.rib-list__no-headline strong\{[^}]*font-weight:600[^}]*color:var\(--neutral-grey-140\)/);
  assert.match(css, /\.rib-list--two-column\{[^}]*width:356px/);
  assert.match(css, /\.rib-list--checklist\{[^}]*width:516px/);
  assert.match(css, /\.rib-list__title\{[^}]*font-size:12px[^}]*line-height:16px[^}]*font-weight:600/);
  assert.match(css, /\.rib-list__subtitle\{[^}]*font-size:11px[^}]*line-height:16px/);
});

test('implements an accessible foundation-backed Loading indicator', () => {
  const source = read('js/components.js');
  assert.match(source, /function renderRibLoadingIndicator/);
  assert.match(source, /role="status"/);
  assert.match(source, /aria-live="polite"/);
  assert.match(source, /esc\(label\)/);
  assert.match(source, /No published Loading indicator component set/);
  const css = read('css/app.css');
  assert.match(css, /\.rib-loading-indicator__spinner\{[^}]*border:2px solid var\(--pastel-amber-110\)[^}]*border-top-color:var\(--primary-orange-100\)[^}]*animation:rib-loading-spin/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)\{[^}]*\.rib-loading-indicator__spinner\{animation:none/);
});

test('provides List and Loading Flutter components backed by foundations', () => {
  const list = read('flutter/rib_list.dart');
  const loading = read('flutter/rib_loading_indicator.dart');
  assert.match(list, /class RibList extends StatelessWidget/);
  assert.match(list, /enum RibListVariant/);
  assert.match(list, /DsColors\.surfaceCoolGrey110/);
  assert.match(list, /DsColors\.primaryOrange100/);
  assert.match(list, /RibListVariant\.lineIcon \? 24 : 16/);
  assert.match(list, /RibListVariant\.noHeadlineLarge => 276\.0/);
  assert.match(loading, /class RibLoadingIndicator extends StatelessWidget/);
  assert.match(loading, /CircularProgressIndicator/);
  assert.match(loading, /DsColors\.primaryOrange100/);
  assert.match(loading, /Semantics\(/);
});

test('publishes Lists and Loading indicator in catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /sandbox: 'lists'/);
  assert.match(components, /sandbox: 'loadingindicator'/);
  assert.match(sandbox, /lists:\s*\{/);
  assert.match(sandbox, /loadingindicator:\s*\{/);
  assert.match(sandbox, /RibList\(/);
  assert.match(sandbox, /RibLoadingIndicator\(/);
});
