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

test('documents the RIB Accordion source and all five Figma variants', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Accordion'/);
  assert.match(components, /Components - RIB/);
  assert.match(components, /node-id=3981-10048/);
  for (const variant of [
    'Default',
    'No container',
    'Coloured background',
    'Container standard',
    'Container explanation',
  ]) {
    assert.match(components, new RegExp(variant));
  }
});

test('renders the Accordion states with accessible disclosure semantics', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /function renderRibAccordion/);
  assert.match(components, /aria-expanded=/);
  assert.match(components, /data-rib-accordion-toggle/);
  assert.match(components, /interactive:false/);
  assert.match(sandbox, /accordion:\s*\{/);
  assert.match(sandbox, /RibAccordionVariant\./);
  assert.match(sandbox, /data-rib-accordion-toggle/);
});

test('ships the exact local Figma glyphs and deploys them with the portal', () => {
  const assetPaths = [
    'assets/rib/accordion/chevron-down.svg',
    'assets/rib/accordion/chevron-up.svg',
    'assets/rib/accordion/shield.svg',
    'assets/rib/accordion/shield-explanation.svg',
    'assets/rib/accordion/briefcase.svg',
  ];

  for (const assetPath of assetPaths) {
    assert.ok(fs.existsSync(path.join(projectRoot, assetPath)), `${assetPath} should exist`);
    assert.match(read(assetPath), /^<svg/);
  }

  assert.match(read('.github/workflows/pages.yml'), /cp -R assets _site\//);
  assert.doesNotMatch(read('js/components.js'), /figma\.com\/api\/mcp\/asset/);
});

test('provides a reusable controlled Flutter RIB Accordion implementation', () => {
  const flutter = read('flutter/rib_accordion.dart');

  assert.match(flutter, /enum RibAccordionVariant/);
  for (const variant of [
    'plain',
    'noContainer',
    'colouredBackground',
    'standardContainer',
    'explanationContainer',
  ]) {
    assert.match(flutter, new RegExp(`\\b${variant}\\b`));
  }
  assert.match(flutter, /class RibAccordion extends StatelessWidget/);
  assert.match(flutter, /final bool expanded;/);
  assert.match(flutter, /final ValueChanged<bool> onChanged;/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /button: true/);
  assert.match(flutter, /expanded: expanded/);
  assert.match(flutter, /excludeFromSemantics: true/);
  assert.match(flutter, /RoundedRectangleBorder\(/);
  assert.match(flutter, /AnimatedSize\(/);
  assert.doesNotMatch(flutter, /setState\(/);
});

test('keeps disclosure semantics on the header and sanitises catalogue inputs', () => {
  const components = read('js/components.js');
  const flutter = read('flutter/rib_accordion.dart');

  assert.match(flutter, /Widget _buildHeader[\s\S]*?return Semantics\(/);
  assert.match(components, /function ribAccordionId/);
  assert.match(components, /replace\(\/\[\^a-zA-Z0-9_-\]\+\/g, '-'\)/);
});

test('lays out specimens in aligned cards and links directly to the Accordion playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  const app = read('js/app.js');
  const css = read('css/app.css');

  assert.match(components, /rib-accordion-showcase__card/);
  assert.match(components, /rib-accordion-showcase__state/);
  assert.match(components, /href="#\/sandbox\/accordion"/);
  assert.match(components, /sandbox: 'accordion'/);
  assert.match(sandbox, /function selectSandboxComponent/);
  assert.match(sandbox, /history\.replaceState\(null, '', '#\/sandbox\/' \+ sbCurrent\)/);
  assert.match(app, /selectSandboxComponent\(parts\[1\]\)/);
  assert.match(css, /\.rib-accordion-showcase\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.rib-accordion-showcase__card\.is-wide/);
});

test('presents Accordion in a realistic controlled FAQ group', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  const css = read('css/app.css');

  assert.match(sandbox, /const RIB_ACCORDION_FAQS = \[/);
  assert.match(sandbox, /function renderRibAccordionScenario/);
  assert.match(sandbox, /expandedIndex/);
  assert.match(sandbox, /faqItems\.length/);
  assert.match(sandbox, /expandedQuestionIndex == index/);
  assert.match(sandbox, /nextToggle\?\.focus\(\)/);
  assert.match(components, /data-rib-accordion-index/);
  assert.match(css, /\.rib-accordion-scenario\{/);
  assert.match(css, /\.sb-layout\.is-accordion/);
});

test('allows the Accordion playground grid to shrink on narrow screens', () => {
  const css = read('css/app.css');

  assert.match(css, /\.sb-layout\{[^}]*min-width:0/);
  assert.match(css, /\.sb-preview\{[^}]*min-width:0/);
  assert.match(css, /\.sb-code\{[^}]*min-width:0/);
});

test('keeps small Accordion documentation labels at AA-safe contrast', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-accordion-showcase__card-head span\{[^}]*color:var\(--neutral-grey-120\)/);
  assert.match(css, /\.rib-accordion-showcase__state>b\{[^}]*color:var\(--neutral-grey-120\)/);
  assert.match(css, /\.rib-accordion-scenario__footer\{[^}]*color:var\(--neutral-grey-120\)/);
  assert.doesNotMatch(css, /\.ds-accordion/);
});

test('documents and applies the AA body-copy contrast correction', () => {
  const components = read('js/components.js');
  const flutter = read('flutter/rib_accordion.dart');

  assert.match(components, /AA contrast correction/);
  assert.match(components, /Grey 110.*Grey 120/);
  assert.equal(
    (flutter.match(/bodyStyle: DsText\.(?:p2Reg|s1Regular)\.copyWith\(\s*color: DsColors\.neutralGrey120/g) || []).length,
    5,
  );
});

test('publishes Accordion and Activity timeline across the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  const app = read('js/app.js');

  assert.match(components, /const PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(app, /PUBLISHED_COMPONENT_IDS\.map\(id =>/);
  assert.match(app, /const compCount = PUBLISHED_COMPONENT_IDS\.length/);
  assert.match(app, /if \(!c \|\| !PUBLISHED_COMPONENT_IDS\.includes\(id\)\)/);
  assert.doesNotMatch(app, /#\/c\/button/);

  assert.match(sandbox, /const PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /let sbCurrent = 'button'/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS\.map\(id =>/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS\.includes\(id\)/);
});

test('uses white labels on the orange landing-page buttons', () => {
  const css = read('css/app.css');

  assert.match(css, /\.hero \.ds-btn\.primary,[^{]+\{[^}]*color:#fff/);
  assert.match(css, /\.peek-button\{[^}]*color:#fff/);
});

test('keeps the Accordion component faithful to the Figma typography contract', () => {
  const components = read('js/components.js');
  const css = read('css/app.css');
  const flutter = read('flutter/rib_accordion.dart');

  assert.match(components, /typography, sizing, spacing and surface behaviour remain 1:1 with Figma/);
  assert.match(css, /\.rib-accordion__title\{[^}]*font-size:11px;line-height:16px/);
  assert.match(css, /\.rib-accordion__body\{[^}]*font-size:11px;line-height:16px/);
  assert.match(css, /\.rib-accordion__subtitle\{[^}]*font-size:11px;line-height:16px/);
  assert.match(css, /\.rib-accordion__title-stack \.rib-accordion__title\{[^}]*font-size:14px;line-height:20px[^}]*font-weight:400/);
  assert.match(css, /\.rib-accordion--no-container \.rib-accordion__title\{[^}]*font-size:12px;line-height:16px/);
  assert.match(css, /\.rib-accordion--coloured-background \.rib-accordion__title\{[^}]*font-size:12px;line-height:16px/);
  assert.match(css, /\.rib-accordion--standard-container \.rib-accordion__title\{[^}]*font-size:12px;line-height:16px/);
  assert.match(css, /\.rib-accordion--explanation-container\.is-expanded \.rib-accordion__body\{[^}]*font-size:12px;line-height:16px/);
  assert.equal(
    (flutter.match(/bodyStyle: DsText\.(?:p2Reg|s1Regular)\.copyWith\(\s*color: DsColors\.neutralGrey120/g) || []).length,
    5,
  );
  assert.match(flutter, /titleStyle: DsText\.h3Regular\.copyWith\(color: DsColors\.neutralGrey140\)/);
});

test('keeps Figma surfaces exact while previews provide readable context', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  const css = read('css/app.css');
  const flutter = read('flutter/rib_accordion.dart');

  assert.match(components, /is-variant-\$\{variant\.key\}/);
  assert.match(components, /rib-accordion-preview-scale/);
  assert.match(sandbox, /rib-accordion-preview-scale/);
  assert.match(css, /\.rib-accordion-preview-scale\{[^}]*--rib-preview-scale:1\.18[^}]*width:100%[^}]*zoom:var\(--rib-preview-scale\)/);
  assert.doesNotMatch(css, /\.rib-accordion-preview-scale\{[^}]*width:calc\(/);
  assert.match(css, /\.rib-accordion-showcase__stage\{[^}]*background:var\(--surface-cool-grey-100\)/);
  assert.match(css, /\.is-variant-coloured-background \.rib-accordion-showcase__stage\{[^}]*background:#fff/);
  assert.match(css, /\.rib-accordion--coloured-background\{[^}]*background:transparent/);
  assert.match(css, /\.rib-accordion--coloured-background\.is-expanded\{[^}]*background:var\(--surface-cool-grey-100\)/);
  assert.match(css, /\.rib-accordion-scenario__list\{[^}]*background:#fff/);
  assert.match(css, /\.rib-accordion-scenario__list\.is-plain,[^{]+\{[^}]*background:var\(--surface-cool-grey-100\)/);
  assert.doesNotMatch(css, /\.rib-accordion-scenario__list\.is-plain \.rib-accordion,[^{]+\{[^}]*padding:/);
  assert.match(css, /\.rib-accordion--plain \.rib-accordion__divider\{[^}]*background:var\(--neutral-grey-60\)/);
  assert.match(css, /\.rib-accordion--no-container \.rib-accordion__divider\{[^}]*background:var\(--surface-cool-grey-110\)/);
  assert.match(flutter, /color: variant == RibAccordionVariant\.plain[\s\S]*?DsColors\.neutralGrey60[\s\S]*?DsColors\.surfaceCoolGrey110/);
  assert.match(flutter, /case RibAccordionVariant\.colouredBackground:[\s\S]*?surfaceColor: expanded[\s\S]*?DsColors\.surfaceCoolGrey100[\s\S]*?: Colors\.transparent/);
});

test('keeps the Accordion preview visible beside compact controls at the 1200px desktop target', () => {
  const css = read('css/app.css');

  assert.match(css, /@media \(max-width:1240px\)\{[\s\S]*?\.rib-accordion-showcase\{grid-template-columns:1fr\}/);
  assert.match(css, /@media \(max-width:1280px\)\{[\s\S]*?\.sb-layout\.is-accordion\{grid-template-columns:220px minmax\(0,1fr\);gap:20px\}/);
  assert.match(css, /@media \(max-width:1000px\)\{[\s\S]*?\.sb-layout\.is-accordion\{grid-template-columns:1fr\}/);
});
