import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('loads the export contract after tokens and before the app shell', () => {
  const index = read('index.html');
  const ribAtomsIndex = index.indexOf('js/rib-atoms.js');
  const tokensIndex = index.indexOf('js/tokens.js');
  const exportsIndex = index.indexOf('js/exports.js');
  const appIndex = index.indexOf('js/app.js');

  assert.ok(ribAtomsIndex >= 0);
  assert.ok(tokensIndex > ribAtomsIndex);
  assert.ok(exportsIndex > tokensIndex);
  assert.ok(appIndex > exportsIndex);
});

test('documents complete RIB foundation coverage and all three responsive grids', () => {
  const app = read('js/app.js');
  assert.match(app, /\$\{coverage\.total\} audited RIB assets/);
  assert.match(app, /87 paint styles/);
  assert.match(app, /36 text styles/);
  assert.match(app, /8 effect styles/);
  assert.match(app, /5 variables/);
  assert.match(app, /Desktop L/);
  assert.match(app, /Tablet/);
  assert.match(app, /Mobile/);
  assert.doesNotMatch(app, /RIB.*not part of the current GlobalDS implementation scope/);
});

test('presents RIB effects as primitive groups without premature semantic aliases', () => {
  const app = read('js/app.js');
  assert.match(app, /label: 'Radius & effects'/);
  assert.match(app, /<h2>Effects<\/h2>/);
  assert.match(app, /DsEffects\./);
  assert.match(app, /Depth/);
  assert.match(app, /Special shadows/);
  assert.match(app, /Interaction rings/);
  assert.match(app, /Component aliases are added only when that component is defined/);
  assert.doesNotMatch(app, /DsElevation\./);
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
