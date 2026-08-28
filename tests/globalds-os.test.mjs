import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const context = vm.createContext({ console });
vm.runInContext(read('js/rib-atoms.js'), context, { filename: 'js/rib-atoms.js' });
vm.runInContext(read('js/iconography.js'), context, { filename: 'js/iconography.js' });
vm.runInContext(read('js/tokens.js'), context, { filename: 'js/tokens.js' });
const DS = vm.runInContext('DS', context);

test('captures the complete ICICI platform landscape and current convergence scope', () => {
  assert.deepEqual(
    Array.from(DS.platforms, platform => platform.id),
    ['rib', 'imobile', 'cib', 'instabiz', 'ucj', 'csp', 'public-website', 'm2i'],
  );

  assert.deepEqual(
    Array.from(DS.sourceSystems, system => system.id),
    ['imobile-android', 'imobile-ios', 'rib'],
  );

  assert.deepEqual(
    Array.from(DS.deferredSystems, system => system.id),
    ['cib', 'instabiz'],
  );
});

test('publishes the agreed canonical colour families', () => {
  assert.deepEqual(
    Object.keys(DS.color),
    [
      'brand',
      'primaryOrange',
      'primaryMaroon',
      'neutralBase',
      'neutralGrey',
      'surfaceCoolGrey',
      'backgroundGrey',
      'pastelBlue',
      'pastelBrown',
      'pastelGreen',
      'pastelAmber',
      'pastelPeach',
      'success',
      'warning',
      'error',
      'info',
    ],
  );

  assert.deepEqual({ ...DS.color.primaryOrange.stops }, {
    80: '#F7B68D', 90: '#F3975D', 100: '#F0792E', 110: '#DB5E10', 120: '#AB4A0C',
  });
  assert.deepEqual({ ...DS.color.primaryMaroon.stops }, {
    80: '#CE5F66', 90: '#BF3B43', 100: '#982F35', 110: '#712327', 120: '#4A171A',
  });
  assert.deepEqual({ ...DS.color.pastelBrown.stops }, {
    80: '#FDFDFC', 90: '#F9F9F5', 100: '#F6F5F0', 110: '#E9E6D9', 120: '#CFCAAF',
  });
  assert.deepEqual({ ...DS.color.success.stops }, {
    90: '#00C26F', 100: '#008F52', 110: '#005C35',
  });
  assert.deepEqual({ ...DS.color.warning.stops }, {
    80: '#FEFAED', 90: '#FFC633', 100: '#FFB800', 110: '#CC9300',
  });
  assert.deepEqual({ ...DS.color.error.stops }, {
    90: '#E05257', 100: '#D8272D', 110: '#AD1F24',
  });
  assert.deepEqual({ ...DS.color.info.stops }, {
    90: '#6B97FF', 100: '#3772FF', 110: '#054FFF',
  });
});

test('makes the extended palette and alpha overlays visible in the Colours foundation', () => {
  const app = read('js/app.js');

  for (const family of [
    'backgroundGrey', 'pastelBlue', 'pastelBrown', 'pastelGreen', 'pastelAmber', 'pastelPeach',
  ]) {
    assert.match(app, new RegExp(`['"]${family}['"]`));
  }

  assert.deepEqual({ ...DS.alpha.black }, {
    20: 'rgba(0,0,0,.20)', 40: 'rgba(0,0,0,.40)', 60: 'rgba(0,0,0,.60)',
    80: 'rgba(0,0,0,.80)', 100: 'rgba(0,0,0,1)',
  });
  assert.deepEqual({ ...DS.alpha.white }, {
    20: 'rgba(255,255,255,.20)', 40: 'rgba(255,255,255,.40)', 50: 'rgba(255,255,255,.50)',
    60: 'rgba(255,255,255,.60)', 80: 'rgba(255,255,255,.80)', 100: 'rgba(255,255,255,1)',
  });
});

test('publishes accessible foreground pairings for filled operational states', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(DS.semanticColor.state)), {
    success: {
      default: 'success.100', strong: 'success.110', onStrong: 'neutralBase.white',
      subtle: 'pastelGreen.80', onSubtle: 'success.110',
    },
    warning: {
      default: 'warning.100', strong: 'warning.110', onStrong: 'neutralGrey.150',
      subtle: 'warning.80', onSubtle: 'neutralGrey.150',
    },
    error: {
      default: 'error.100', strong: 'error.110', onStrong: 'neutralBase.white',
      subtle: 'pastelPeach.80', onSubtle: 'error.110',
    },
    info: {
      default: 'info.100', strong: 'info.110', onStrong: 'neutralBase.white',
      subtle: 'pastelBlue.80', onSubtle: 'info.110',
    },
  });
});

test('makes all 139 RIB atoms canonical GlobalDS foundations', () => {
  assert.equal(DS.ribAtoms.meta.fileKey, 'KlcvhcZPwn1c9BXBY2k6rl');
  assert.deepEqual(JSON.parse(JSON.stringify(DS.foundationCoverage)), {
    paintStyles: 87,
    textStyles: 36,
    effectStyles: 8,
    gridStyles: 3,
    variables: 5,
    total: 139,
  });
  assert.equal(DS.paintStyles.length, 87);
  assert.equal(DS.type.length, 36);
  assert.equal(DS.effects.length, 8);
  assert.equal(DS.grid.length, 3);
  assert.equal(DS.variables.length, 5);

  const label = DS.type.find(token => token.token === 'labelSemibold');
  assert.equal(label.name, 'Labels/Label Semibold');
  assert.equal(label.tracking, 1.2);
  assert.equal(label.textCase, 'UPPER');
  assert.equal(DS.typeAliases.displayLarge, 'display1');
});

test('publishes the approved primitive-only RIB effect paths and groups', () => {
  assert.deepEqual(
    Array.from(DS.effects, effect => ({
      path: effect.path,
      token: effect.token,
      group: effect.group,
    })),
    [
      { path: 'effect.shadow.100', token: 'shadow100', group: 'Depth' },
      { path: 'effect.shadow.200', token: 'shadow200', group: 'Depth' },
      { path: 'effect.shadow.300', token: 'shadow300', group: 'Depth' },
      { path: 'effect.shadow.400', token: 'shadow400', group: 'Depth' },
      { path: 'effect.shadow.button-white', token: 'shadowButtonWhite', group: 'Special shadows' },
      { path: 'effect.shadow.bottom-sticky', token: 'shadowBottomSticky', group: 'Special shadows' },
      { path: 'effect.ring.orange-outline', token: 'ringOrangeOutline', group: 'Interaction rings' },
      { path: 'effect.ring.focus', token: 'ringFocus', group: 'Interaction rings' },
    ],
  );
  assert.equal(DS.semanticEffect, undefined);
  assert.equal(DS.componentEffect, undefined);
});

test('preserves every RIB gradient and source conflict in the canonical contract', () => {
  assert.equal(DS.gradients.length, 14);
  assert.equal(DS.gradients.find(style => style.name === 'NEWGradient/Button Fill').paints.length, 2);
  assert.ok(DS.foundationIssues.some(issue => issue.id === 'duplicate-pastel-brown-120'));
});
