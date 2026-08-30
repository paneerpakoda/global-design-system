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

test('documents Standard and Label RIB Chip families and source states', () => {
  const components = read('js/components.js');
  assert.match(components, /title: 'Chip'/);
  assert.equal((components.match(/title: 'Chip'/g) || []).length, 1);
  assert.match(components, /node-id=1135-15928/);
  for (const family of ['Standard', 'Label white', 'Label translucent']) assert.match(components, new RegExp(`label:'${family}'`));
  for (const state of ['Default', 'Hover', 'Selected']) assert.match(components, new RegExp(`label:'${state}'`));
});

test('renders an escaped semantic toggle button', () => {
  const components = read('js/components.js');
  assert.match(components, /function renderRibChip/);
  assert.match(components, /<button type="button" class="rib-chip/);
  assert.match(components, /aria-pressed="\$\{selected \? 'true' : 'false'\}"/);
  assert.match(components, /esc\(label\)/);
});

test('uses exact local RIB chip action glyphs', () => {
  const components = read('js/components.js');
  for (const asset of [
    'assets/icons/general/line/repeat--line--237-432.svg',
    'assets/icons/general/line/copy--line--237-435.svg',
    'assets/icons/general/line/close--line--237-434.svg',
    'assets/icons/general/line/chevron-down--line--235-118.svg',
  ]) assert.ok(fs.existsSync(path.join(projectRoot, asset)), `${asset} should exist`);
  assert.match(components, /repeat--line--237-432\.svg/);
  assert.match(components, /copy--line--237-435\.svg/);
  assert.match(components, /close--line--237-434\.svg/);
});

test('matches Standard Chip size, state, and foundation contracts', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-chip--large\{[^}]*height:32px[^}]*padding:0 16px[^}]*border-radius:8px/);
  assert.match(css, /\.rib-chip--medium\{[^}]*height:24px[^}]*padding:0 8px[^}]*font-size:11px[^}]*line-height:16px/);
  assert.match(css, /\.rib-chip--small\{[^}]*height:20px[^}]*padding:0 8px[^}]*border-radius:4px[^}]*font-size:10px/);
  assert.match(css, /\.rib-chip--standard\.is-selected\{[^}]*border-color:var\(--primary-orange-100\)[^}]*background:var\(--pastel-amber-90\)/);
  assert.match(css, /\.rib-chip--standard\.is-hover\{[^}]*border-color:var\(--neutral-grey-80\)/);
});

test('matches white and translucent Label Chip contracts', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-chip--label-white\{[^}]*height:32px[^}]*padding:0 12px[^}]*border:1px solid var\(--surface-cool-grey-110\)[^}]*box-shadow:var\(--effect-shadow-button-white\)/);
  assert.match(css, /\.rib-chip--label-translucent\{[^}]*height:36px[^}]*padding:0 16px[^}]*border:1px solid var\(--alpha-white-20\)[^}]*background:rgba\(255,255,255,\.10\)/);
  assert.match(css, /\.rib-chip--label-translucent\.is-hover\{[^}]*background:var\(--alpha-white-20\)/);
});

test('publishes Chip in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','chip','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'chip'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','chip','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /chip:\s*\{/);
  assert.match(sandbox, /RibChip\(/);
});

test('provides a controlled Flutter RibChip backed by foundations', () => {
  const flutter = read('flutter/rib_chip.dart');
  assert.match(flutter, /enum RibChipVariant/);
  assert.match(flutter, /enum RibChipSize/);
  assert.match(flutter, /class RibChip extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.pastelAmber90/);
  assert.match(flutter, /DsEffects\.shadowButtonWhite/);
});

test('provides visible focus and narrow-screen wrapping', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-chip:focus-visible\{[^}]*outline:3px solid #FFE8DD/);
  assert.match(css, /@media \(max-width:560px\)\{[\s\S]*?\.rib-chip-showcase\{grid-template-columns:1fr\}/);
});
