import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('loads audited source colours after canonical tokens and before the app', () => {
  const index = read('index.html');
  const tokensIndex = index.indexOf('js/tokens.js');
  const sourcesIndex = index.indexOf('js/source-colours.js');
  const controllerIndex = index.indexOf('js/colour-tabs.js');
  const appIndex = index.indexOf('js/app.js');

  assert.ok(tokensIndex >= 0);
  assert.ok(sourcesIndex > tokensIndex);
  assert.ok(controllerIndex > sourcesIndex);
  assert.ok(appIndex > controllerIndex);
});

test('renders exactly three colour-system tabs with linked tab panels', () => {
  const app = read('js/app.js');

  assert.match(app, /role="tablist"[^>]+aria-label="Colour systems"/);
  assert.match(app, /data-colour-tab="global"[^>]*>GlobalDS colours</);
  assert.match(app, /data-colour-tab="imobile"[^>]*>iMobile colours</);
  assert.match(app, /data-colour-tab="rib"[^>]*>RIB colours</);
  assert.equal((app.match(/role="tabpanel"/g) || []).length, 3);
  assert.match(app, /GlobalDSSourceColours\.imobile\.variants/);
  assert.match(app, /GlobalDSSourceColours\.rib/);
});

test('supports click and standard keyboard tab navigation', () => {
  const controller = read('js/colour-tabs.js');

  assert.match(controller, /activateColourTab/);
  assert.match(controller, /ArrowLeft/);
  assert.match(controller, /ArrowRight/);
  assert.match(controller, /Home/);
  assert.match(controller, /End/);
  assert.match(controller, /aria-selected/);
  assert.match(controller, /tab\.tabIndex/);
  assert.match(read('js/app.js'), /GlobalDSColourTabs\.bind\(document\)/);
});

test('styles the tab strip responsively and exposes a visible focus state', () => {
  const css = read('css/app.css');

  assert.match(css, /\.colour-system-tabs/);
  assert.match(css, /\.colour-system-tab:focus-visible/);
  assert.match(css, /@media[^}]+\{[\s\S]*\.colour-system-tabs/);
});
