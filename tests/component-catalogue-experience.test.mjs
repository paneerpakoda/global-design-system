import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const alphabeticalComponentIds = [
  'accordions',
  'activity-timeline',
  'avatar',
  'breadcrumbs',
  'button',
  'calendar',
  'cards',
  'checkbox',
  'chip',
  'dropdown',
  'emptystate',
  'info',
  'textfield',
  'label',
  'lists',
  'loadingindicator',
];

test('publishes the component catalogue in alphabetical title order', () => {
  const components = read('js/components.js');
  const published = components.match(/const PUBLISHED_COMPONENT_IDS = Object\.freeze\(\[([^\]]+)\]\)/);

  assert.ok(published, 'published component registry should exist');
  const ids = [...published[1].matchAll(/'([^']+)'/g)].map(match => match[1]);
  assert.deepEqual(ids, alphabeticalComponentIds);
});

test('embeds one mini playground on each component page and retires the standalone destination', () => {
  const app = read('js/app.js');
  const sandbox = read('js/sandbox.js');

  assert.match(app, /renderMiniPlayground\(c\.sandbox\)/);
  assert.match(app, /class="section component-mini-playground"/);
  assert.match(sandbox, /function renderMiniPlayground\(id\)/);
  assert.doesNotMatch(app, /section: 'Sandbox'/);
  assert.doesNotMatch(app, /data-go="#\/sandbox"/);
  assert.doesNotMatch(app, /function renderSandboxRoute\(/);
  assert.doesNotMatch(sandbox, /PUBLISHED_SANDBOX_IDS\.map\(id =>/);
});

test('keeps catalogue specimens static while mini playground controls remain interactive', () => {
  const app = read('js/app.js');
  const css = read('css/app.css');

  assert.match(app, /data-static-component-preview/);
  assert.match(app, /function bindStaticComponentPreviews\(root\)/);
  assert.match(app, /control\.inert = true/);
  assert.match(css, /\.component-static-preview :is\(button,input,select,textarea,summary/);
  assert.match(css, /pointer-events:none/);
});

test('does not surface beta labels as component navigation or page-title badges', () => {
  const app = read('js/app.js');

  assert.doesNotMatch(app, /status: COMPONENTS\[id\]\.status/);
  assert.doesNotMatch(app, /status:c\.status/);
});
