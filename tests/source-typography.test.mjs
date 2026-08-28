import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const context = vm.createContext({ console });
vm.runInContext(read('js/source-typography.js'), context, { filename: 'js/source-typography.js' });
const sourceTypography = vm.runInContext('GlobalDSTypographySources', context);

test('keeps the provided iMobile iOS and RIB typography sources distinct', () => {
  assert.deepEqual(Object.keys(sourceTypography), ['imobile', 'rib']);
  assert.equal(sourceTypography.imobile.id, 'imobile');
  assert.equal(sourceTypography.imobile.platform, 'iMobile iOS');
  assert.equal(sourceTypography.rib.id, 'rib');
});

test('captures every source style from the comparison audit', () => {
  assert.equal(sourceTypography.imobile.styles.length, 28);
  assert.equal(sourceTypography.rib.styles.length, 36);
  assert.ok([...sourceTypography.imobile.styles, ...sourceTypography.rib.styles]
    .every(style => style.family === 'Mulish'));
});

test('preserves representative typography metrics and source names', () => {
  const iosDisplay = sourceTypography.imobile.styles.find(style => style.id === 'displayMedium');
  const ribDisplay = sourceTypography.rib.styles.find(style => style.id === 'display1');

  assert.deepEqual({ ...iosDisplay }, {
    id: 'displayMedium', name: 'Display Medium', resolved: 'Display Medium',
    group: 'Layout headings', family: 'Mulish', size: 48, height: 68,
    weight: 400, fontStyle: 'Medium', tracking: '0px', decoration: 'None',
    textCase: 'Original', note: 'fontStyle Medium; numeric weight 400',
  });
  assert.equal(ribDisplay.resolved, 'Display/D1');
  assert.equal(ribDisplay.size, 28);
  assert.equal(ribDisplay.height, 36);
  assert.equal(ribDisplay.weight, 600);
});

test('retains audited naming, decoration, and case exceptions', () => {
  const ribP2 = sourceTypography.rib.styles.find(style => style.id === 'p2Semi');
  const ribLabel = sourceTypography.rib.styles.find(style => style.id === 'labelSemibold');
  const iosLink = sourceTypography.imobile.styles.find(style => style.id === 'linkRegular');

  assert.equal(ribP2.name, 'Paragraph 2 - Semilbold');
  assert.equal(ribP2.resolved, 'Paragraph/P2 Semibold');
  assert.equal(ribLabel.textCase, 'Uppercase');
  assert.equal(ribLabel.tracking, '1.2px');
  assert.equal(iosLink.decoration, 'Underline');
});
