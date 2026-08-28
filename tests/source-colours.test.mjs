import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

const context = vm.createContext({ console });
vm.runInContext(read('js/source-colours.js'), context, { filename: 'js/source-colours.js' });
const sourceColours = vm.runInContext('GlobalDSSourceColours', context);

const countStops = variant => Object.values(variant.palette)
  .reduce((count, ramp) => count + Object.keys(ramp.stops).length, 0);

test('keeps iMobile Android, iMobile iOS, and RIB source palettes distinct', () => {
  assert.deepEqual(
    Array.from(sourceColours.imobile.variants, variant => variant.id),
    ['android', 'ios'],
  );
  assert.equal(sourceColours.rib.id, 'rib');
});

test('captures every scalar source occurrence from the comparison audit', () => {
  assert.equal(countStops(sourceColours.imobile.variants[0]), 72);
  assert.equal(countStops(sourceColours.imobile.variants[1]), 56);
  assert.equal(countStops(sourceColours.rib), 77);
});

test('preserves representative platform values and exact source token paths', () => {
  const android = sourceColours.imobile.variants[0].palette;
  const ios = sourceColours.imobile.variants[1].palette;
  const rib = sourceColours.rib.palette;

  assert.equal(android.primaryOrange.stops[100], '#D44500');
  assert.equal(android.primaryOrange.tokens[100], 'DsColors.primaryOrange100');
  assert.equal(ios.primaryOrange.stops[100], '#E3530F');
  assert.equal(ios.primaryOrange.tokens[100], 'Orange/100');
  assert.equal(rib.primaryOrange.stops[100], '#F0792E');
  assert.equal(rib.primaryOrange.tokens[100], 'NEWOrange/100');
  assert.equal(rib.primaryMaroonLegacy.stops[100], '#982F35');
  assert.equal(rib.primaryMaroonNew.tokens[100], 'NEWMaroon/100');
});

test('records inferred and nominal source values without promoting them to GlobalDS tokens', () => {
  const ios = sourceColours.imobile.variants[1].palette;
  const rib = sourceColours.rib.palette;

  assert.equal(ios.neutralGrey.status[70], 'visual-only');
  assert.equal(ios.pastelBrown.status[100], 'visual-only');
  assert.equal(rib.opacityBlack.status[20], 'nominal');
  assert.equal(rib.opacityWhite.stops[80], 'rgba(255,255,255,.80)');
});
