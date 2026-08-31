import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

function lineNumber(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function matchingLines(source, pattern) {
  return [...source.matchAll(pattern)].map(match => ({
    line: lineNumber(source, match.index),
    value: match[0].replace(/\s+/g, ' ').trim(),
  }));
}

test('Flutter components consume GlobalDS foundations instead of recreating them', () => {
  const componentDirectory = path.join(projectRoot, 'flutter/lib/src/components');
  const componentFiles = fs.readdirSync(componentDirectory)
    .filter(file => /^rib_.+\.dart$/.test(file))
    .sort();

  assert.ok(componentFiles.length > 0, 'expected Flutter component implementations');

  const forbiddenFoundationLiterals = [
    ['raw colours', /\b(?:const\s+)?Color\(0x[0-9A-Fa-f]+\)/g],
    ['ad-hoc text styles', /(?<!Default)\bTextStyle\(/g],
    ['raw radii', /BorderRadius\.circular\(\s*\d+(?:\.\d+)?\s*\)/g],
    [
      'raw foundation spacing in EdgeInsets',
      /EdgeInsets\.(?:all|only|symmetric|fromLTRB)\([^)]*\b(?:2|4|8|12|16|20|24|32|40|48|64)(?:\.0)?\b[^)]*\)/gs,
    ],
    [
      'raw foundation spacing in SizedBox',
      /SizedBox\(\s*(?:width|height):\s*(?:2|4|8|12|16|20|24|32|40|48|64)(?:\.0)?\s*[,)]/g,
    ],
  ];

  const violations = [];
  for (const file of componentFiles) {
    const source = read(`flutter/lib/src/components/${file}`);
    assert.match(
      source,
      /import '\.\.\/foundations\/ds_tokens\.dart';/,
      `${file} must import GlobalDS foundations`,
    );

    for (const [kind, pattern] of forbiddenFoundationLiterals) {
      for (const match of matchingLines(source, pattern)) {
        violations.push(`${file}:${match.line} ${kind}: ${match.value}`);
      }
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Component foundation literals must resolve through ds_tokens.dart:\n${violations.join('\n')}`,
  );
});

test('published web component styles consume GlobalDS colour and radius foundations', () => {
  const source = read('css/app.css');
  const violations = [];
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  const publishedComponentPrefixes = [
    '.ds-btn',
    '.rib-accordion',
    '.rib-activity',
    '.rib-avatar',
    '.rib-breadcrumb',
    '.rib-button',
    '.rib-calendar',
    '.rib-card',
    '.rib-checkbox',
    '.rib-chip',
    '.rib-dropdown',
    '.rib-empty',
    '.rib-info',
    '.rib-input-field',
    '.rib-label',
    '.rib-list',
    '.rib-loading',
  ];

  for (const match of source.matchAll(rulePattern)) {
    const selector = match[1].trim();
    const declarations = match[2];
    if (!publishedComponentPrefixes.some(prefix => selector.includes(prefix))) continue;

    for (const literal of matchingLines(declarations, /#[0-9A-Fa-f]{3,8}|rgba?\([^)]*\)/g)) {
      violations.push(`${selector} uses raw colour ${literal.value}`);
    }
    for (const literal of matchingLines(declarations, /border-radius:\s*(?:4|8|12|16|24|999)px/g)) {
      violations.push(`${selector} uses raw radius ${literal.value}`);
    }
  }

  assert.deepEqual(
    violations,
    [],
    `Published web components must resolve colours and radii through :root foundations:\n${violations.join('\n')}`,
  );
});
