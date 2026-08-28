import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('loads typography sources and renderer before the app shell', () => {
  const index = read('index.html');
  const tokensIndex = index.indexOf('js/tokens.js');
  const sourcesIndex = index.indexOf('js/source-typography.js');
  const rendererIndex = index.indexOf('js/typography.js');
  const appIndex = index.indexOf('js/app.js');

  assert.ok(tokensIndex >= 0);
  assert.ok(sourcesIndex > tokensIndex);
  assert.ok(rendererIndex > sourcesIndex);
  assert.ok(appIndex > rendererIndex);
});

test('renders exactly three typography-system tabs with linked panels', () => {
  const typography = read('js/typography.js');

  assert.match(typography, /role="tablist"[^>]+aria-label="Typography systems"/);
  assert.match(typography, /data-typography-tab="global"[^>]*>GlobalDS typography</);
  assert.match(typography, /data-typography-tab="imobile"[^>]*>iMobile typography</);
  assert.match(typography, /data-typography-tab="rib"[^>]*>RIB typography</);
  assert.equal((typography.match(/role="tabpanel"/g) || []).length, 3);
  assert.match(typography, /GlobalDSTypographySources\.imobile/);
  assert.match(typography, /GlobalDSTypographySources\.rib/);
});

test('binds Typography to the shared accessible tab controller', () => {
  const app = read('js/app.js');

  assert.match(app, /tabSelector:'\[data-typography-tab\]'/);
  assert.match(app, /panelSelector:'\.typography-system-panel'/);
});

test('styles source specimens and the tab strip responsively', () => {
  const css = read('css/app.css');

  assert.match(css, /\.typography-system-tabs/);
  assert.match(css, /\.typography-source-row/);
  assert.match(css, /\.typography-system-tab:focus-visible/);
  assert.match(css, /@media[^}]+\{[\s\S]*\.typography-system-tabs/);
});
