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

test('documents all RIB Breadcrumb variants and states from Figma', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Breadcrumb'/);
  assert.match(components, /node-id=875-4938/);
  assert.match(components, /function renderRibBreadcrumb/);
  assert.match(components, /function renderRibBreadcrumbUnit/);
  assert.match(components, /1 item · 2 items · 3 items/);
  for (const state of ['default', 'hover', 'active']) {
    assert.match(components, new RegExp(`key:'${state}'`));
  }
});

test('renders semantic, sanitised breadcrumb navigation and title actions', () => {
  const components = read('js/components.js');

  assert.match(components, /<nav class="rib-breadcrumb__path" aria-label=/);
  assert.match(components, /<ol class="rib-breadcrumb__list"/);
  assert.match(components, /<li class="rib-breadcrumb__item/);
  assert.match(components, /aria-current="page"/);
  assert.match(components, /class="rib-breadcrumb__back" type="button" aria-label="Back"/);
  assert.match(components, /class="rib-breadcrumb__title-action" type="button" aria-expanded="false"/);
  assert.match(components, /esc\(item\.label\)/);
  assert.match(components, /esc\(title\)/);
});

test('ships exact local Figma breadcrumb glyphs without expiring URLs', () => {
  for (const filename of ['back.svg', 'chevron-down.svg', 'chevron-right.svg']) {
    const relativePath = `assets/rib/breadcrumb/${filename}`;
    assert.ok(fs.existsSync(path.join(projectRoot, relativePath)), `${filename} should exist`);
    assert.match(read(relativePath), /^<svg/);
  }
  assert.doesNotMatch(read('js/components.js'), /figma\.com\/api\/mcp\/asset/);
});

test('matches the Figma Breadcrumb geometry and typography', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-breadcrumb\{[^}]*width:min\(472px,100%\)[^}]*gap:8px/);
  assert.match(css, /\.rib-breadcrumb__list\{[^}]*gap:2px/);
  assert.match(css, /\.rib-breadcrumb__unit\{[^}]*font-size:10px[^}]*line-height:16px[^}]*font-weight:400[^}]*letter-spacing:\.25px/);
  assert.match(css, /\.rib-breadcrumb__title-row\{[^}]*height:24px[^}]*gap:8px/);
  assert.match(css, /\.rib-breadcrumb__back\{[^}]*width:24px[^}]*height:24px/);
  assert.match(css, /\.rib-breadcrumb__title-text\{[^}]*font-size:16px[^}]*line-height:20px[^}]*font-weight:700[^}]*letter-spacing:\.15px/);
  assert.match(css, /\.rib-breadcrumb__dropdown\{[^}]*width:16px[^}]*height:16px/);
});

test('publishes Breadcrumb in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'breadcrumbs'/);
  assert.match(sandbox, /breadcrumbs:\s*\{/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','cards','checkbox','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /RibBreadcrumb\(/);
});

test('provides a reusable Flutter RibBreadcrumb implementation', () => {
  const flutter = read('flutter/rib_breadcrumb.dart');

  assert.match(flutter, /class RibBreadcrumbItem/);
  assert.match(flutter, /class RibBreadcrumb extends StatelessWidget/);
  assert.match(flutter, /items\.length <= 3/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /label: 'Breadcrumb'/);
  assert.match(flutter, /Widget\? backIcon/);
  assert.match(flutter, /Widget\? dropdownIcon/);
});

test('keeps the 472px title row usable at 320px', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-breadcrumb\{[^}]*min-width:0/);
  assert.match(css, /\.rib-breadcrumb__title-row\{[^}]*min-width:0/);
  assert.match(css, /\.rib-breadcrumb__title-text\{[^}]*overflow:hidden[^}]*text-overflow:ellipsis/);
  assert.match(css, /\.sb-layout\.is-breadcrumbs/);
});
