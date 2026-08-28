import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ console });
const source = fs.readFileSync(path.join(projectRoot, 'js/rib-atoms.js'), 'utf8');
vm.runInContext(source, context, { filename: 'js/rib-atoms.js' });
const ribAtoms = vm.runInContext('GlobalDSRIBAtoms', context);

test('captures every local style and variable audited from Atoms - RIB', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(ribAtoms.counts)), {
    paintStyles: 87,
    textStyles: 36,
    effectStyles: 8,
    gridStyles: 3,
    variables: 5,
    total: 139,
  });

  assert.equal(ribAtoms.paintStyles.length, ribAtoms.counts.paintStyles);
  assert.equal(ribAtoms.textStyles.length, ribAtoms.counts.textStyles);
  assert.equal(ribAtoms.effectStyles.length, ribAtoms.counts.effectStyles);
  assert.equal(ribAtoms.gridStyles.length, ribAtoms.counts.gridStyles);
  assert.equal(ribAtoms.variables.length, ribAtoms.counts.variables);
});

test('preserves exact RIB action colours, gradients, and the duplicate brown token conflict', () => {
  const paintStyles = JSON.parse(JSON.stringify(ribAtoms.paintStyles));
  const orange100 = paintStyles.find(style => style.name === 'NEWOrange/100');
  const white20 = paintStyles.find(style => style.name === 'NEWNeutral/White 20%');
  const buttonFill = paintStyles.find(style => style.name === 'NEWGradient/Button Fill');
  const brown120 = paintStyles.filter(style => style.name === 'NEWPastel/Brown/120');

  assert.equal(orange100.paints[0].color, '#F0792E');
  assert.deepEqual(white20.paints[0], { type: 'SOLID', color: '#FFFFFF', opacity: 0.2 });
  assert.deepEqual(buttonFill.paints, [
    { type: 'SOLID', color: '#F0792E', opacity: 1 },
    {
      type: 'GRADIENT_LINEAR',
      opacity: 0.12,
      stops: [
        { position: 0, color: '#FFFFFF' },
        { position: 1, color: '#FFFFFF00' },
      ],
      transform: [[0, 1, 0], [-1, 0, 1]],
    },
  ]);
  assert.deepEqual(brown120.map(style => style.paints[0].color), ['#CFCAAF', '#D9D5BF']);
  assert.ok(ribAtoms.issues.some(issue => issue.id === 'duplicate-pastel-brown-120'));
});

test('preserves all responsive RIB grids instead of treating RIB as desktop only', () => {
  const grids = Object.fromEntries(
    ribAtoms.gridStyles.map(style => [style.name, JSON.parse(JSON.stringify(style.layoutGrids))]),
  );

  assert.equal(grids.Mobile[0].count, 4);
  assert.equal(grids.Mobile[0].gutterSize, 16);
  assert.equal(grids.Tablet[0].count, 12);
  assert.equal(grids.Tablet[0].gutterSize, 12);
  assert.equal(grids['Desktop L'][0].count, 12);
  assert.equal(grids['Desktop L'][0].sectionSize, 72);
});

test('preserves the exact RIB typography and semantic variable resolutions', () => {
  const display = ribAtoms.textStyles.find(style => style.name === 'Display/D1');
  const label = ribAtoms.textStyles.find(style => style.name === 'Labels/Label Semibold');
  const variables = Object.fromEntries(ribAtoms.variables.map(variable => [variable.name, variable]));

  assert.deepEqual(JSON.parse(JSON.stringify(display)), {
    id: 'display1', name: 'Display/D1', group: 'Display', family: 'Mulish',
    fontStyle: 'SemiBold', size: 28, height: 36, weight: 600, tracking: 0,
    trackingUnit: 'PERCENT', decoration: 'NONE', textCase: 'ORIGINAL', description: '',
  });
  assert.equal(label.tracking, 1.2);
  assert.equal(label.textCase, 'UPPER');
  assert.equal(variables['bg/white-0'].resolvedValue, '#FFFFFF');
  assert.equal(variables['stroke/soft-200'].resolvedValue, '#E2E4E9');
  assert.equal(variables['icon/strong-900'].resolvedValue, '#0A0D14');
});

test('preserves all eight RIB effect styles, including focus and bottom-sticky treatments', () => {
  const effects = Object.fromEntries(ribAtoms.effectStyles.map(style => [style.name, style]));

  assert.equal(Object.keys(effects).length, 8);
  assert.deepEqual(Object.keys(effects), [
    'Drop Shadow/Shadow 100',
    'Drop Shadow/Shadow 200',
    'Drop Shadow/Shadow 300',
    'Drop Shadow/Shadow 400',
    'Drop Shadow/Button White',
    'Drop Shadow/Bottom sticky',
    'Elevation/Orange outline',
    'Elevation/Focus',
  ]);
  assert.deepEqual(JSON.parse(JSON.stringify(effects['Drop Shadow/Shadow 100'].effects[0].offset)), { x: 3, y: 4 });
  assert.deepEqual(JSON.parse(JSON.stringify(effects['Elevation/Focus'].effects[0])), {
    type: 'DROP_SHADOW', color: '#FFE8DD', offset: { x: 0, y: 0 },
    radius: 0, spread: 3, blendMode: 'NORMAL', visible: true,
  });
  assert.equal(effects['Drop Shadow/Bottom sticky'].effects[0].offset.y, -2);
});
