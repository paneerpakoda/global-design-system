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

test('documents all three Calendar variants and their complete Figma states', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Calendar'/);
  assert.equal((components.match(/title: 'Calendar'/g) || []).length, 1);
  assert.match(components, /node-id=1815-1068/);
  for (const variant of ['Date', 'Date range', 'Month and year']) {
    assert.match(components, new RegExp(variant));
  }
  for (const state of [
    'No date selected', 'Hover', 'Selected', 'Default',
    'Start date hover', 'Start date selected',
    'End date hover', 'End date selected',
  ]) {
    assert.match(components, new RegExp(state));
  }
});

test('renders Calendar with grid semantics and native date controls', () => {
  const components = read('js/components.js');

  assert.match(components, /function renderRibCalendar/);
  assert.match(components, /role="grid"/);
  assert.match(components, /role="columnheader"/);
  assert.match(components, /aria-label="Choose previous month"/);
  assert.match(components, /aria-label="Choose next month"/);
  assert.match(components, /aria-selected="\$\{selected \? 'true' : 'false'\}"/);
  assert.match(components, /<button type="button" class="rib-calendar__date/);
});

test('uses exact local RIB calendar glyphs without expiring URLs', () => {
  const components = read('js/components.js');
  for (const asset of [
    'assets/icons/general/line/chevron-left--line--235-116.svg',
    'assets/icons/general/line/chevron-right--line--235-115.svg',
    'assets/icons/general/filled/chevron-down--filled--679-239.svg',
    'assets/icons/general/filled/chevron-up--filled--717-260.svg',
  ]) {
    assert.ok(fs.existsSync(path.join(projectRoot, asset)), `${asset} should exist`);
  }
  assert.match(components, /chevron-left--line--235-116\.svg/);
  assert.match(components, /chevron-right--line--235-115\.svg/);
  assert.doesNotMatch(components, /figma\.com\/api\/mcp\/asset/);
});

test('matches Calendar geometry, typography, colours, and effects from Figma', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-calendar\{[^}]*width:258px[^}]*padding:16px[^}]*gap:16px[^}]*border:1px solid var\(--surface-cool-grey-110\)[^}]*border-radius:12px[^}]*box-shadow:var\(--effect-shadow-200\)/);
  assert.match(css, /\.rib-calendar__month-label\{[^}]*font-size:12px[^}]*line-height:20px[^}]*font-weight:600[^}]*letter-spacing:\.25px[^}]*color:var\(--neutral-grey-140\)/);
  assert.match(css, /\.rib-calendar__weekday\{[^}]*font-size:11px[^}]*line-height:16px[^}]*font-weight:700/);
  assert.match(css, /\.rib-calendar__date\{[^}]*width:24px[^}]*height:24px[^}]*font-size:11px[^}]*line-height:16px/);
  assert.match(css, /\.rib-calendar__date\.is-selected\{[^}]*background:var\(--primary-orange-100\)[^}]*color:#fff/);
  assert.match(css, /\.rib-calendar__date\.is-hover\{[^}]*background:var\(--surface-cool-grey-100\)/);
  assert.match(css, /\.rib-calendar__cell\.is-range-selected\{[^}]*background:var\(--pastel-amber-100\)/);
});

test('publishes Calendar in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','chip','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'calendar'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','chip','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /calendar:\s*\{/);
  assert.match(sandbox, /RibCalendar\(/);
});

test('provides a reusable Flutter RibCalendar backed by foundation tokens', () => {
  const flutter = read('flutter/rib_calendar.dart');

  assert.match(flutter, /enum RibCalendarMode/);
  assert.match(flutter, /class RibCalendar extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /GridView\.builder/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.pastelAmber100/);
  assert.match(flutter, /DsColors\.surfaceCoolGrey110/);
  assert.match(flutter, /DsEffects\.shadow200/);
});

test('keeps Calendar usable at 320px', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-calendar-stage\{[^}]*overflow-x:auto/);
  assert.match(css, /@media \(max-width:560px\)\{[\s\S]*?\.rib-calendar-showcase\{grid-template-columns:1fr\}/);
});
