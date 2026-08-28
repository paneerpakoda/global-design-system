import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('loads the export contract after tokens and before the app shell', () => {
  const index = read('index.html');
  const tokensIndex = index.indexOf('js/tokens.js');
  const exportsIndex = index.indexOf('js/exports.js');
  const appIndex = index.indexOf('js/app.js');

  assert.ok(tokensIndex >= 0);
  assert.ok(exportsIndex > tokensIndex);
  assert.ok(appIndex > exportsIndex);
});

test('exposes one Developers destination for all three development targets', () => {
  const app = read('js/app.js');
  assert.match(app, /route: '#\/developers'/);
  assert.match(app, /Platform exports/);
  assert.match(app, /Kotlin · ReactJS/);
  assert.match(app, /Flutter/);
  assert.match(app, /SwiftUI/);
  assert.match(app, /Three native targets/);
});

test('routes every download through the shared export contract', () => {
  const app = read('js/app.js');
  assert.match(app, /GlobalDSExports\.generate\(filename\)/);
  assert.doesNotMatch(app, /if \(f === 'ds_tokens\.dart'\)/);
});

test('keeps the previous Flutter route as a backwards-compatible alias', () => {
  const app = read('js/app.js');
  assert.match(app, /parts\[0\] === 'developers' \|\| parts\[0\] === 'flutter'/);
});
