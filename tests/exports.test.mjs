import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ console });

for (const relativePath of ['js/rib-atoms.js', 'js/iconography.js', 'js/tokens.js', 'js/exports.js']) {
  const source = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
  vm.runInContext(source, context, { filename: relativePath });
}

const DS = vm.runInContext('DS', context);
const exportsApi = vm.runInContext('GlobalDSExports', context);

test('publishes Flutter as the supported generation target', () => {
  assert.deepEqual(
    Array.from(exportsApi.targets, target => [target.id, target.status]),
    [['flutter', 'supported']],
  );

  assert.deepEqual(
    Array.from(exportsApi.targets, target => Array.from(target.files)),
    [['ds_tokens.dart', 'ds_theme.dart']],
  );
});

test('generates every declared platform file deterministically', () => {
  const filenames = exportsApi.targets.flatMap(target => Array.from(target.files));
  assert.equal(new Set(filenames).size, filenames.length);

  for (const filename of filenames) {
    const first = exportsApi.generate(filename);
    const second = exportsApi.generate(filename);
    assert.equal(first, second, `${filename} should be deterministic`);
    assert.ok(first.length > 200, `${filename} should contain a complete export`);
  }
});

test('projects every colour and typography token into Flutter', () => {
  const colourCount = Object.values(DS.color)
    .reduce((count, ramp) => count + Object.keys(ramp.stops).length, 0);

  const tokenFiles = [exportsApi.generate('ds_tokens.dart')];

  for (const output of tokenFiles) {
    const generatedColours = (output.match(/TOKEN_COLOR:/g) || []).length;
    const generatedTextStyles = (output.match(/TOKEN_TYPE:/g) || []).length;
    assert.equal(generatedColours, colourCount);
    assert.equal(generatedTextStyles, DS.type.length);
  }
});

test('projects RIB variables, responsive grids, and effects into Flutter', () => {
  const tokenFiles = [exportsApi.generate('ds_tokens.dart')];

  for (const output of tokenFiles) {
    assert.equal((output.match(/TOKEN_VARIABLE:/g) || []).length, 5);
    assert.equal((output.match(/TOKEN_GRID:/g) || []).length, 3);
    assert.equal((output.match(/TOKEN_EFFECT:/g) || []).length, 8);
    assert.match(output, /grid\.desktop/);
    assert.match(output, /grid\.tablet/);
    assert.match(output, /grid\.mobile/);
    for (const path of [
      'effect.shadow.100',
      'effect.shadow.200',
      'effect.shadow.300',
      'effect.shadow.400',
      'effect.shadow.button-white',
      'effect.shadow.bottom-sticky',
      'effect.ring.orange-outline',
      'effect.ring.focus',
    ]) {
      assert.match(output, new RegExp(path.replaceAll('.', '\\.')));
    }
  }
});

test('uses the native Flutter theme API', () => {
  const flutter = exportsApi.generate('ds_theme.dart');

  assert.match(flutter, /ThemeData/);
  assert.match(flutter, /useMaterial3: true/);
});

test('preserves the established Flutter token and component-theme surface', () => {
  const tokens = exportsApi.generate('ds_tokens.dart');
  const theme = exportsApi.generate('ds_theme.dart');

  for (const symbol of [
    'buttonPrimaryFillBase',
    'buttonPrimaryFill',
    'buttonStrokeWidth',
    'buttonStroke',
  ]) {
    assert.match(tokens, new RegExp(symbol));
  }

  for (const symbol of [
    'elevatedButtonTheme',
    'outlinedButtonTheme',
    'inputDecorationTheme',
    'appBarTheme',
    'bottomNavigationBarTheme',
    'chipTheme',
    'dividerTheme',
    'snackBarTheme',
    'DsButtonDecorations',
  ]) {
    assert.match(theme, new RegExp(symbol));
  }
});

test('keeps platform-neutral JSON available for contract verification', () => {
  const parsed = JSON.parse(exportsApi.generate('ds_tokens.json'));
  assert.equal(parsed.meta.name, DS.meta.name);
  assert.equal(parsed.typography.length, DS.type.length);
  assert.equal(parsed.spacing.length, DS.space.length);
  assert.deepEqual(parsed.foundationCoverage, {
    paintStyles: 87, textStyles: 36, effectStyles: 8, gridStyles: 3, variables: 5, total: 139,
  });
  assert.equal(parsed.paintStyles.length, 87);
  assert.equal(parsed.gradients.length, 14);
  assert.equal(parsed.grids.length, 3);
  assert.equal(parsed.variables.length, 5);
  assert.equal(parsed.effects.length, 8);
  assert.equal(parsed.elevation, undefined);
  assert.equal(parsed.foundationIssues[0].id, 'duplicate-pastel-brown-120');
});

test('keeps checked-in platform snapshots identical to live generation', () => {
  const directories = {
    flutter: 'flutter/lib/src/foundations',
  };

  for (const target of exportsApi.targets) {
    for (const filename of target.files) {
      const snapshotPath = path.join(projectRoot, directories[target.id], filename);
      assert.equal(
        fs.readFileSync(snapshotPath, 'utf8'),
        exportsApi.generate(filename),
        `${filename} snapshot should match live generation`,
      );
    }
  }
});

test('rejects unknown export filenames', () => {
  assert.throws(
    () => exportsApi.generate('unknown.txt'),
    /Unknown GlobalDS export: unknown\.txt/,
  );
});
