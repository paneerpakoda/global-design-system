import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const context = vm.createContext({ console });
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
    80: '#F4B094', 90: '#E8692E', 100: '#D44500', 110: '#A93600', 120: '#732500',
  });
  assert.deepEqual({ ...DS.color.primaryMaroon.stops }, {
    80: '#DA7B80', 90: '#BC343A', 100: '#94292E', 110: '#6C1E21', 120: '#441315',
  });
  assert.deepEqual({ ...DS.color.pastelBrown.stops }, {
    80: '#FDFDFC', 90: '#F9F9F5', 100: '#F6F5F0', 110: '#E9E6D9', 120: '#CFCAAF',
  });
  assert.deepEqual({ ...DS.color.success.stops }, {
    90: '#00C26F', 100: '#008F52', 110: '#005C35',
  });
  assert.deepEqual({ ...DS.color.warning.stops }, {
    90: '#FFC633', 100: '#FFB800', 110: '#CC9300',
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
      subtle: 'pastelAmber.80', onSubtle: 'neutralGrey.150',
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

test('publishes all 35 GlobalDS typography entries from the comparison audit', () => {
  assert.equal(DS.type.length, 35);
  assert.deepEqual(
    JSON.parse(JSON.stringify(
      DS.type.filter(token => ['labelLargeSemibold', 'microRegular'].includes(token.token)),
    )),
    [
      {
        group: 'Labels & micro', token: 'labelLargeSemibold', size: 12,
        height: 16, weight: 600, use: 'Large compact labels',
      },
      {
        group: 'Labels & micro', token: 'microRegular', size: 10,
        height: 16, weight: 400, use: 'Legal copy and quiet micro text',
      },
    ],
  );
});
