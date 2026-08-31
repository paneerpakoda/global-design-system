import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

test('validates pull requests and main before publishing the portal', () => {
  const workflow = read('.github/workflows/pages.yml');

  assert.match(workflow, /pull_request:[\s\S]*branches: \[main\]/);
  assert.match(workflow, /push:[\s\S]*branches: \[main\]/);
  assert.match(workflow, /node --test tests\/\*\.test\.mjs/);
  assert.match(workflow, /node scripts\/generate-exports\.mjs/);
  assert.match(workflow, /git diff --exit-code -- flutter\/lib\/src\/foundations/);
  assert.match(workflow, /subosito\/flutter-action@v2/);
  assert.match(workflow, /channel: stable/);
  assert.match(workflow, /working-directory: flutter/);
  assert.match(workflow, /flutter pub get/);
  assert.match(workflow, /flutter analyze/);
  assert.match(workflow, /flutter test/);
});

test('publishes only the static portal through the official Pages actions', () => {
  const workflow = read('.github/workflows/pages.yml');

  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /cp index\.html _site\//);
  assert.match(workflow, /cp -R css js _site\//);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /path: _site/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
});

test('documents the public GitHub Pages location', () => {
  const readme = read('README.md');

  assert.match(readme, /https:\/\/paneerpakoda\.github\.io\/global-design-system\//);
});
