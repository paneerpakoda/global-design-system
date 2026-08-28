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

test('documents every Button variant, size, icon placement and state from Figma', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Button'/);
  assert.match(components, /node-id=8-2/);
  for (const variant of [
    'Primary',
    'Outline',
    'Secondary',
    'Pastel',
    'White',
    'Destructive - Outlined',
    'Destructive - Filled',
  ]) {
    assert.match(components, new RegExp(variant));
  }
  for (const size of ['Large', 'Small', 'X-Small']) {
    assert.match(components, new RegExp(`label: '${size}'`));
  }
  for (const icon of ['No icon', 'Left', 'Right']) {
    assert.match(components, new RegExp(`label: '${icon}'`));
  }
  for (const state of ['Default', 'Hover', 'Focus', 'Disabled']) {
    assert.match(components, new RegExp(`label: '${state}'`));
  }
});

test('renders semantic, escaped buttons with the exact local Figma add glyph', () => {
  const components = read('js/components.js');

  assert.match(components, /function renderRibButton/);
  assert.match(components, /<button type="button" class="\$\{classes\}"/);
  assert.match(components, /esc\(label\)/);
  assert.match(components, /state\.disabled \? ' disabled' : ''/);
  assert.match(components, /RIB_BUTTON_ICON_ASSET = '\.\.\/assets\/icons\/general\/line\/add--line--519-38\.svg'/);
  assert.ok(fs.existsSync(path.join(projectRoot, 'assets/icons/general/line/add--line--519-38.svg')));
  assert.doesNotMatch(components, /figma\.com\/api\/mcp\/asset/);
});

test('uses the audited RIB foundation colours for every Button state', () => {
  const css = read('css/app.css');

  assert.match(css, /\.ds-btn\.primary\{[^}]*--rib-button-bg:var\(--primary-orange-100\)[^}]*color:#fff/);
  assert.match(css, /\.ds-btn\.primary:hover,[^{]+\{[^}]*--rib-button-bg:var\(--primary-orange-110\)/);
  assert.match(css, /\.ds-btn\.primary:disabled\{[^}]*--rib-button-bg:var\(--neutral-grey-70\)[^}]*background:var\(--rib-button-bg\)[^}]*color:var\(--neutral-grey-110\)/);
  assert.match(css, /\.ds-btn\.outline\{[^}]*border-color:var\(--primary-orange-100\)[^}]*color:var\(--primary-orange-100\)/);
  assert.match(css, /\.ds-btn\.pastel\{[^}]*--rib-button-bg:var\(--pastel-amber-90\)[^}]*color:var\(--primary-orange-100\)/);
  assert.match(css, /\.ds-btn\.pastel:disabled\{[^}]*--rib-button-bg:var\(--neutral-grey-70\)[^}]*background:var\(--rib-button-bg\)[^}]*color:var\(--neutral-grey-110\)/);
  assert.match(css, /\.ds-btn\.white\{[^}]*--rib-button-bg:#fff[^}]*border-color:var\(--surface-cool-grey-110\)[^}]*color:var\(--neutral-grey-130\)/);
  assert.match(css, /\.ds-btn\.destructive-outline\{[^}]*border-color:var\(--err-600\)[^}]*color:var\(--err-600\)/);
  assert.match(css, /\.ds-btn\.destructive-filled\{[^}]*--rib-button-bg:var\(--err-600\)[^}]*color:#fff/);
  assert.match(css, /\.ds-btn\.destructive-filled:disabled,[^{]+\{[^}]*--rib-button-bg:var\(--pastel-peach-110\)[^}]*color:var\(--err-500\)/);
});

test('matches the Figma Button geometry, typography and state effects', () => {
  const css = read('css/app.css');

  assert.match(css, /\.ds-btn\.lg\{[^}]*min-width:120px[^}]*height:44px[^}]*padding:0 12px[^}]*font-size:14px/);
  assert.match(css, /\.ds-btn\.sm\{[^}]*min-width:120px[^}]*height:36px[^}]*padding:0 12px[^}]*font-size:12px/);
  assert.match(css, /\.ds-btn\.xs\{[^}]*height:28px[^}]*padding:0 8px[^}]*font-size:12px[^}]*border-radius:8px/);
  assert.match(css, /\.ds-btn\{[^}]*gap:4px[^}]*font-weight:600[^}]*line-height:16px[^}]*letter-spacing:\.25px/);
  assert.match(css, /\.ds-btn\.is-focus,[^{]+\{[^}]*box-shadow:var\(--effect-ring-focus\)/);
  assert.match(css, /\.ds-btn\.destructive-outline\.is-focus,[^{]+\{[^}]*box-shadow:0 0 0 3px var\(--pastel-peach-120\)/);
  assert.match(css, /\.ds-btn\.white\.is-focus,[^{]+\{[^}]*box-shadow:0 0 0 3px rgba\(235,241,248,\.8\)/);
});

test('publishes Button in the component catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'button'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /let sbCurrent = 'button'/);
  assert.match(sandbox, /renderRibButton\(/);
  assert.match(sandbox, /RibButton\(/);
});

test('provides a reusable Flutter RibButton backed by generated foundation tokens', () => {
  const flutter = read('flutter/rib_button.dart');

  assert.match(flutter, /enum RibButtonVariant/);
  assert.match(flutter, /enum RibButtonSize/);
  assert.match(flutter, /class RibButton extends StatefulWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /button: true/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.primaryOrange110/);
  assert.match(flutter, /DsColors\.pastelAmber90/);
  assert.match(flutter, /DsColors\.neutralGrey110/);
  assert.match(flutter, /DsColors\.error100/);
  assert.match(flutter, /DsColors\.pastelPeach110/);
  assert.match(flutter, /DsText\.buttonLarge/);
  assert.match(flutter, /DsText\.buttonSmall/);
  assert.match(flutter, /8 - borderWidth/);
  assert.match(flutter, /12 - borderWidth/);
  assert.doesNotMatch(flutter, /double _borderWidth[\s\S]*?if \(secondary \|\| widget\.size == RibButtonSize\.xSmall\)/);
});

test('keeps the Button playground usable at 320px', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-button-scenario\{[^}]*width:min\(420px,100%\)[^}]*min-width:0/);
  assert.match(css, /@media \(max-width:560px\)\{[\s\S]*?\.rib-button-scenario__actions\{display:grid;grid-template-columns:1fr\}/);
});
