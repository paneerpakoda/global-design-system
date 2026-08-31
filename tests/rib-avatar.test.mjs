import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => {
  const absolutePath = path.join(projectRoot, relativePath);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : '';
};

test('documents the complete RIB Avatar and Avatar group Figma contract', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Avatar and Avatar groups'/);
  assert.match(components, /node-id=3981-10046/);
  assert.match(components, /function renderRibAvatar/);
  assert.match(components, /function renderRibAvatarGroup/);
  for (const color of ['picture', 'orange', 'blue', 'gold', 'maroon', 'multi']) {
    assert.match(components, new RegExp(`key:'${color}'`));
  }
});

test('renders labelled avatars and a semantic avatar group', () => {
  const components = read('js/components.js');

  assert.match(components, /<figure class="rib-avatar/);
  assert.match(components, /role="img"/);
  assert.match(components, /<figcaption class="rib-avatar__label/);
  assert.match(components, /<ul class="rib-avatar-group__list/);
  assert.match(components, /<li class="rib-avatar-group__item/);
  assert.match(components, /aria-label="\$\{esc\(options\.ariaLabel/);
  assert.match(components, /rib-avatar__bank-name/);
  assert.match(components, /esc\(label\)/);
  assert.match(components, /esc\(initials\)/);
});

test('ships exact local Figma image assets without expiring URLs', () => {
  const photo = path.join(projectRoot, 'assets/rib/avatar/amar.jpeg');
  const logo = path.join(projectRoot, 'assets/rib/avatar/icici-bank-mark.svg');

  assert.ok(fs.existsSync(photo), 'Figma avatar photo should exist');
  assert.ok(fs.statSync(photo).size > 1000, 'Figma avatar photo should not be a placeholder');
  assert.ok(fs.existsSync(logo), 'Figma bank mark should exist');
  assert.match(read('assets/rib/avatar/icici-bank-mark.svg'), /^<svg/);
  assert.doesNotMatch(read('js/components.js'), /figma\.com\/api\/mcp\/asset/);
});

test('matches the Figma avatar geometry, typography and colour tokens', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-avatar\{[^}]*width:64px[^}]*gap:4px/);
  assert.match(css, /\.rib-avatar__visual\{[^}]*width:40px[^}]*height:40px[^}]*border-radius:50%/);
  assert.match(css, /\.rib-avatar__initials\{[^}]*font-size:16px[^}]*line-height:20px[^}]*font-weight:600[^}]*letter-spacing:\.15px/);
  assert.match(css, /\.rib-avatar__label\{[^}]*font-size:12px[^}]*line-height:20px[^}]*letter-spacing:\.25px/);
  assert.match(css, /\.rib-avatar--orange \.rib-avatar__visual\{[^}]*background:var\(--pastel-amber-100\)/);
  assert.match(css, /\.rib-avatar--blue \.rib-avatar__visual\{[^}]*background:var\(--pastel-blue-90\)/);
  assert.match(css, /\.rib-avatar--gold \.rib-avatar__visual,[^{]+\{[^}]*background:var\(--pastel-brown-100\)/);
  assert.match(css, /\.rib-avatar--maroon \.rib-avatar__visual\{[^}]*background:var\(--pastel-peach-90\)/);
  assert.match(css, /\.rib-avatar__bank-badge\{[^}]*left:36px[^}]*top:-4px[^}]*padding:4px[^}]*border-radius:var\(--r-lg\)/);
});

test('publishes Avatar in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['accordions','activity-timeline','avatar','breadcrumbs','button','calendar','cards','checkbox','chip','dropdown','emptystate','info','textfield','label','lists','loadingindicator'\]\)/);
  assert.match(components, /sandbox: 'avatar'/);
  assert.match(sandbox, /avatar:\s*\{/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['accordion','activity-timeline','avatar','breadcrumbs','button','calendar','cards','checkbox','chip','dropdown','emptystate','info','textfield','label','lists','loadingindicator'\]\)/);
  assert.match(sandbox, /RibAvatarGroup\(/);
});

test('provides reusable Flutter Avatar and AvatarGroup implementations', () => {
  const flutter = read('flutter/lib/src/components/rib_avatar.dart');

  assert.match(flutter, /enum RibAvatarColor/);
  assert.match(flutter, /class RibAvatar extends StatelessWidget/);
  assert.match(flutter, /class RibAvatarData/);
  assert.match(flutter, /class RibAvatarGroup extends StatelessWidget/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /ClipOval\(/);
  assert.match(flutter, /ListView\.separated/);
  assert.match(flutter, /final Widget\? bankLogo;/);
});

test('keeps the six-avatar Figma group usable on narrow viewports', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-avatar-group\{[^}]*width:min\(444px,100%\)/);
  assert.match(css, /\.rib-avatar-group__scroller\{[^}]*overflow-x:auto/);
  assert.match(css, /\.rib-avatar-group__list\{[^}]*width:max-content[^}]*gap:12px/);
});
