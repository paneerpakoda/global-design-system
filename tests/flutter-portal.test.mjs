import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const context = vm.createContext({COMPONENTS: {}});
vm.runInContext(read('js/flutter-components.js'), context);
const specs = JSON.parse(vm.runInContext('JSON.stringify(FLUTTER_CORE_COMPONENTS)', context));
test('component families use current Dart constructors and stable preview IDs', () => {
  assert.equal(Object.keys(specs).length, 13);
  assert.equal(Object.values(specs).filter(s => s.kind === 'New').length, 6);
  const registry = read('js/components.js').match(/const PUBLISHED_COMPONENT_IDS = Object.freeze\(\[([^\]]+)\]/)[1];
  const catalog = read('flutter/example/lib/main.dart');
  const ids = [...catalog.match(/componentIds = \[([^\]]+)\]/s)[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
  for (const [id, spec] of Object.entries(specs)) {
    assert.ok(registry.includes("'" + id + "'"), id + ' is navigable');
    assert.equal(ids[spec.index], id === 'dropdown' ? 'select' : id);
    assert.ok(read(spec.source).includes(spec.constructor), id + ' constructor is current');
    for (const related of spec.related || []) assert.ok(read(related.source).includes(related.constructor));
    assert.ok(spec.usage.startsWith(spec.api + '(') || spec.usage.startsWith(spec.api + '<'));
  }
});
test('portal serves compiled Flutter previews and includes their deployment artifact', () => {
  const portal = read('js/flutter-components.js');
  assert.match(portal, /<iframe[^>]+src="\$\{preview\}&embed=true"/);
  assert.match(portal, /Earlier|earlier catalogue specimens/);
  const html = read('index.html');
  assert.ok(html.indexOf('js/components.js') < html.indexOf('js/flutter-components.js'));
  assert.ok(html.indexOf('js/flutter-components.js') < html.indexOf('js/app.js'));
  const pipeline = read('.github/workflows/pages.yml');
  assert.match(pipeline, /flutter build web.*--base-href/);
  assert.match(pipeline, /path: _site\/flutter-preview/);
});
