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
});
