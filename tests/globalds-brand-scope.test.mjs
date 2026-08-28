import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('brands the visual documentation site as GlobalDS Portal', () => {
  const index = read('index.html');
  const app = read('js/app.js');

  assert.match(index, /<title>GlobalDS Portal · ICICI Bank<\/title>/);
  assert.match(index, /<strong>GlobalDS Portal<\/strong>/);
  assert.match(index, /Skip to main content/);
  assert.match(app, /Made for the whole product team/);
  assert.match(app, /Designers/);
  assert.match(app, /Product and content/);
  assert.match(app, /Engineering/);
  assert.doesNotMatch(index + app, /RIB DesignOS/);
  assert.doesNotMatch(index + app, /RIB Canada/);
});

test('renders the platform estate from shared token metadata', () => {
  const index = read('index.html');
  const app = read('js/app.js');
  const scope = read('js/platforms.js');

  assert.ok(index.indexOf('js/platforms.js') > index.indexOf('js/tokens.js'));
  assert.ok(index.indexOf('js/platforms.js') < index.indexOf('js/app.js'));
  assert.match(app, /renderPlatformScope\(\)/);
  assert.match(scope, /DS\.platforms\.filter/);
  assert.match(scope, /DS\.sourceSystems\.map/);
  assert.match(scope, /DS\.deferredSystems\.map/);
  assert.match(scope, /Three live systems\. One global foundation\./);
  assert.match(scope, /DFF readiness/);
  assert.match(scope, /role="table"/);
  assert.match(app, /8 platforms/);
});

test('provides responsive styles for the platform scope ledger', () => {
  const css = read('css/app.css');

  assert.match(css, /\.platform-scope/);
  assert.match(css, /\.platform-ledger/);
  assert.match(css, /\.platform-row/);
  assert.match(css, /@media[^}]+\{[\s\S]*\.platform-scope/);
});
