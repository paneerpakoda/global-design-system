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

test('documents the four representative RIB Card families from Figma', () => {
  const components = read('js/components.js');
  assert.match(components, /title: 'Cards'/);
  assert.match(components, /node-id=3981-10044/);
  for (const variant of ['Loan', 'Investment', 'Insurance', 'Offer']) {
    assert.match(components, new RegExp(`label:'${variant}'`));
  }
});

test('renders reusable semantic cards with escaped content and real actions', () => {
  const components = read('js/components.js');
  assert.match(components, /function renderRibCard/);
  assert.match(components, /<article class="rib-card/);
  assert.match(components, /<button type="button" class="rib-card__action/);
  assert.match(components, /esc\(title\)/);
  assert.match(components, /'Education loan account card'/);
});

test('uses exact committed product icons and offer ornaments', () => {
  const components = read('js/components.js');
  for (const asset of [
    'assets/icons/product/line/education-loan--line--530-321.svg',
    'assets/icons/product/filled/nps--filled--934-464.svg',
    'assets/icons/product/line/life-insurance--line--235-402.svg',
    'assets/icons/general/line/download--line--599-44.svg',
    'assets/icons/general/line/chevron-right--line--235-115.svg',
    'assets/components/cards/offer-ornament-top.svg',
    'assets/components/cards/offer-ornament-bottom.svg',
  ]) {
    assert.ok(fs.existsSync(path.join(projectRoot, asset)), `${asset} should exist`);
  }
  assert.match(components, /education-loan--line--530-321\.svg/);
  assert.match(components, /nps--filled--934-464\.svg/);
  assert.doesNotMatch(components, /figma\.com\/api\/mcp\/asset/);
});

test('matches representative Figma card geometry and audited foundations', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-card--loan\{[^}]*width:272px[^}]*height:150px[^}]*background:var\(--primary-orange-100\)[^}]*border-radius:12px/);
  assert.match(css, /\.rib-card--investment\{[^}]*width:290px[^}]*height:130px[^}]*background:var\(--grad-hero\)[^}]*border-radius:12px/);
  assert.match(css, /\.rib-card--insurance\{[^}]*width:272px[^}]*height:160px[^}]*background:var\(--primary-orange-100\)/);
  assert.match(css, /\.rib-card--offer\{[^}]*width:288px[^}]*height:160px[^}]*border:1px solid var\(--pastel-amber-90\)/);
  assert.match(css, /\.rib-card__footer\{[^}]*height:44px[^}]*background:var\(--alpha-black-20\)/);
  assert.match(css, /\.rib-card--offer \.rib-card__footer\{[^}]*background:var\(--grad-hero\)/);
  assert.doesNotMatch(css, /#FDE9DD/i);
});

test('publishes Cards in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'cards'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /cards:\s*\{/);
  assert.match(sandbox, /RibCard\(/);
});

test('provides a reusable Flutter RibCard backed by foundation tokens', () => {
  const flutter = read('flutter/rib_card.dart');
  assert.match(flutter, /enum RibCardVariant/);
  assert.match(flutter, /class RibCard extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.pastelAmber90/);
  assert.match(flutter, /DsColors\.hero/);
});

test('keeps the fixed Figma specimens reachable on narrow screens', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-card-showcase__stage\{[^}]*overflow-x:auto/);
  assert.match(css, /@media \(max-width:560px\)\{[\s\S]*?\.rib-card-showcase\{grid-template-columns:1fr\}/);
});
