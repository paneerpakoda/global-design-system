import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

function loadIconography(){
  const context = vm.createContext({ console });
  vm.runInContext(read('js/iconography.js'), context, { filename: 'js/iconography.js' });
  return vm.runInContext('GlobalDSIconography', context);
}

function loadIconographyPage(){
  const context = vm.createContext({
    console,
    document: { addEventListener() {} },
    esc: value => String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;'),
  });
  vm.runInContext(read('js/iconography.js'), context, { filename: 'js/iconography.js' });
  vm.runInContext(read('js/iconography-page.js'), context, { filename: 'js/iconography-page.js' });
  return context;
}

test('publishes the complete Figma iconography inventory as a governed contract', () => {
  const iconography = loadIconography();

  assert.deepEqual(JSON.parse(JSON.stringify(iconography.meta)), {
    fileKey: 'KlcvhcZPwn1c9BXBY2k6rl',
    nodeId: '92:6201',
    source: 'Atoms - RIB / Icons',
    total: 283,
  });
  assert.deepEqual(JSON.parse(JSON.stringify(iconography.counts)), {
    general: { filled: 112, line: 32, total: 144 },
    product: { line: 27, filled: 35, special: 8, total: 70 },
    special: { special: 51, total: 51 },
    sideNav: { outlined: 9, filled: 9, total: 18 },
  });
  assert.equal(iconography.icons.length, iconography.meta.total);
});

test('keeps every Figma icon addressable by stable metadata and an exact committed asset', () => {
  const iconography = loadIconography();
  const ids = new Set();
  const assetPaths = new Set();

  for (const icon of iconography.icons) {
    assert.match(icon.id, /^\d+:\d+$/);
    assert.ok(icon.name);
    assert.ok(['general', 'product', 'special', 'sideNav'].includes(icon.category));
    assert.ok(['filled', 'line', 'special', 'outlined'].includes(icon.variant));
    assert.ok(icon.width === 16 || icon.width === 20 || icon.width === 22 || icon.width === 24);
    assert.equal(icon.height, icon.width);
    assert.match(icon.asset, /^assets\/icons\/.+\.(svg|png)$/);
    assert.equal(ids.has(icon.id), false, `duplicate Figma id ${icon.id}`);
    assert.equal(assetPaths.has(icon.asset), false, `duplicate asset path ${icon.asset}`);
    ids.add(icon.id);
    assetPaths.add(icon.asset);

    const asset = fs.readFileSync(path.join(projectRoot, icon.asset));
    if (icon.asset.endsWith('.svg')) {
      assert.match(asset.toString('utf8'), /^<svg[\s>]/);
    } else {
      assert.deepEqual(Array.from(asset.subarray(0, 8)), [137, 80, 78, 71, 13, 10, 26, 10]);
    }
  }
});

test('loads iconography before the token and portal layers that consume it', () => {
  const index = read('index.html');
  const iconographyIndex = index.indexOf('js/iconography.js');
  const tokensIndex = index.indexOf('js/tokens.js');
  const pageIndex = index.indexOf('js/iconography-page.js');
  const appIndex = index.indexOf('js/app.js');

  assert.ok(iconographyIndex >= 0);
  assert.ok(tokensIndex > iconographyIndex);
  assert.ok(pageIndex > tokensIndex);
  assert.ok(appIndex > pageIndex);
});

test('presents the Figma library as a searchable, filterable iconography foundation', () => {
  const page = read('js/iconography-page.js');

  assert.match(page, /GlobalDSIconography/);
  assert.match(page, /id="iconSearch"/);
  assert.match(page, /data-icon-category/);
  assert.match(page, /283 exact Figma icons/);
  assert.doesNotMatch(page, /system uses Tabler outline icons/);
});

test('groups the All view under ordered category headers while keeping filtered views flat', () => {
  const context = loadIconographyPage();
  const allHtml = vm.runInContext('iconCatalogHtml(filteredIcons())', context);
  const groupIds = ['general', 'product', 'special', 'sideNav'];
  const positions = groupIds.map(id => allHtml.indexOf(`data-icon-group="${id}"`));

  positions.forEach(position => assert.ok(position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(allHtml, /<h3[^>]*>General<\/h3>/);
  assert.match(allHtml, /<h3[^>]*>Product specific<\/h3>/);
  assert.match(allHtml, /<h3[^>]*>Special<\/h3>/);
  assert.match(allHtml, /<h3[^>]*>Side navigation<\/h3>/);

  const generalHtml = vm.runInContext("iconCategory = 'general'; iconCatalogHtml(filteredIcons())", context);
  assert.doesNotMatch(generalHtml, /data-icon-group=/);
  assert.equal((generalHtml.match(/class="icon-card"/g) || []).length, 144);
});

test('keeps icon cards minimal with one copy action anchored to the preview corner', () => {
  const context = loadIconographyPage();
  const cardHtml = vm.runInContext('iconCardHtml(GlobalDSIconography.icons[0])', context);
  const css = read('css/iconography.css');

  assert.match(cardHtml, /class="icon-copy"/);
  assert.match(cardHtml, /aria-label="Copy Curated filled asset path"/);
  assert.match(cardHtml, /class="icon-preview"/);
  assert.match(cardHtml, /class="icon-card-name"/);
  assert.doesNotMatch(cardHtml, /icon-tags|icon-card-actions|<code|download/);
  assert.match(css, /\.icon-card\{[^}]*position:relative/);
  assert.match(css, /\.icon-copy\{[^}]*position:absolute;[^}]*top:[^;]+;right:/);
});
