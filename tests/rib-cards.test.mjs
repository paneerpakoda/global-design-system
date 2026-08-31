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

test('matches the audited loan and investment card content from Figma', () => {
  const components = read('js/components.js');
  for (const text of [
    'HBAT02340290231',
    'Principal outstanding',
    '₹ 12,65,808',
    'Next EMI on',
    '3 Jul ‘24',
    'Upcoming EMI',
    'PRAN ID: 892384097901',
    'Tier I',
    '₹ 1,25,067',
    'As on date',
    '12 Jan ‘24',
  ]) {
    assert.match(components, new RegExp(text));
  }
  assert.match(components, /rib-card__badge/);
  assert.match(components, /<\/header><p class="rib-card__identifier">/);
  assert.match(components, /rib-card__ornament is-top/);
  assert.match(components, /rib-card__ornament is-bottom/);
});

test('matches representative Figma card geometry and audited foundations', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-card--loan\{[^}]*width:272px[^}]*height:150px[^}]*background:var\(--primary-orange-100\)[^}]*border-radius:var\(--r-md\)/);
  assert.match(css, /\.rib-card--investment\{[^}]*width:290px[^}]*height:130px[^}]*background:var\(--grad-card-hero\)[^}]*border-radius:var\(--r-md\)/);
  assert.match(css, /\.rib-card--insurance\{[^}]*width:272px[^}]*height:160px[^}]*background:var\(--primary-orange-100\)/);
  assert.match(css, /\.rib-card--offer\{[^}]*width:288px[^}]*height:160px[^}]*border:1px solid var\(--pastel-amber-90\)/);
  assert.match(css, /\.rib-card__footer\{[^}]*height:44px[^}]*background:color-mix\(in srgb,var\(--primary-maroon-100\) 20%,transparent\)/);
  assert.match(css, /\.rib-card__action\{[^}]*font-size:12px[^}]*font-weight:600/);
  assert.match(css, /\.rib-card__footer::after\{[^}]*width:1px[^}]*height:28px/);
  assert.match(css, /\.rib-card__badge\{[^}]*background:var\(--alpha-white-20\)/);
  assert.match(css, /\.rib-card--investment::before\{[^}]*top:66px[^}]*height:64px/);
  assert.match(css, /\.rib-card--offer \.rib-card__footer\{[^}]*background:var\(--grad-hero\)/);
  assert.doesNotMatch(css, /#FDE9DD/i);
});

test('publishes Cards in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['accordions','activity-timeline','avatar','breadcrumbs','button','calendar','cards','checkbox','chip','dropdown','emptystate','info','textfield','label','lists','loadingindicator'\]\)/);
  assert.match(components, /sandbox: 'cards'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['accordion','activity-timeline','avatar','breadcrumbs','button','calendar','cards','checkbox','chip','dropdown','emptystate','info','textfield','label','lists','loadingindicator'\]\)/);
  assert.match(sandbox, /cards:\s*\{/);
  assert.match(sandbox, /RibCard\(/);
});

test('provides a reusable Flutter RibCard backed by foundation tokens', () => {
  const flutter = read('flutter/lib/src/components/rib_card.dart');
  assert.match(flutter, /enum RibCardVariant/);
  assert.match(flutter, /class RibCard extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /DsColors\.primaryOrange100/);
  assert.match(flutter, /DsColors\.pastelAmber90/);
  assert.match(flutter, /DsColors\.hero/);
  assert.match(flutter, /final String\? badge/);
  assert.match(flutter, /DsColors\.cardHero/);
  assert.match(flutter, /DsColors\.primaryMaroon100\.withValues\(alpha: \.2\)/);
  assert.match(flutter, /VerticalDivider/);
  assert.match(flutter, /onSecondaryAction/);
});

test('keeps the fixed Figma specimens reachable on narrow screens', () => {
  const css = read('css/app.css');
  assert.match(css, /\.rib-card-showcase__stage\{[^}]*overflow-x:auto/);
  assert.match(css, /@media \(max-width:560px\)\{[\s\S]*?\.rib-card-showcase\{grid-template-columns:1fr\}/);
});
