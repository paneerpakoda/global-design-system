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

test('documents the RIB Activity timeline source and complete Figma matrix', () => {
  const components = read('js/components.js');

  assert.match(components, /title: 'Activity timeline'/);
  assert.match(components, /node-id=3981-10047/);
  assert.match(components, /With single line cards/);
  assert.match(components, /With double line cards/);
  assert.match(components, /Double line \+ trailing icon/);
  for (const state of ['Inactive', 'Completed', 'Warning', 'Failed']) {
    assert.match(components, new RegExp(`label:'${state}'`));
  }
});

test('renders a semantic activity list with state names exposed as text', () => {
  const components = read('js/components.js');

  assert.match(components, /function renderRibActivityTimeline/);
  assert.match(components, /<ol class="rib-activity-timeline/);
  assert.match(components, /<li class="rib-activity-timeline__item/);
  assert.match(components, /aria-label="\$\{esc\(stateSpec\.label\)\}/);
  assert.match(components, /rib-activity-card__state-label/);
  assert.match(components, /rib-activity-card__status/);
  assert.match(components, /options\.rightIcon/);
  assert.match(read('css/app.css'), /\.rib-activity-card__state-label\{[^}]*position:absolute[^}]*clip:rect\(0 0 0 0\)/);
});

test('ships the exact local Activity timeline assets and deploys them', () => {
  const assetPaths = [
    'assets/rib/activity-timeline/inactive.svg',
    'assets/rib/activity-timeline/completed.svg',
    'assets/rib/activity-timeline/warning.svg',
    'assets/rib/activity-timeline/failed.svg',
    'assets/rib/activity-timeline/chevron-right.svg',
    'assets/rib/activity-timeline/connector.svg',
    'assets/rib/activity-timeline/calendar-current.svg',
    'assets/rib/activity-timeline/calendar-connector.svg',
  ];

  for (const assetPath of assetPaths) {
    assert.ok(fs.existsSync(path.join(projectRoot, assetPath)), `${assetPath} should exist`);
    assert.match(read(assetPath), /^<svg/);
  }

  assert.match(read('.github/workflows/pages.yml'), /cp -R assets _site\//);
  assert.doesNotMatch(read('js/components.js'), /figma\.com\/api\/mcp\/asset/);
});

test('matches the Figma card, connector, type and state style contract', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-activity-timeline\{[^}]*width:min\(288px,100%\)[^}]*gap:12px/);
  assert.match(css, /\.rib-activity-timeline__connector\{[^}]*left:24px[^}]*width:1px[^}]*height:100%/);
  assert.match(css, /\.rib-activity-card\{[^}]*min-height:40px[^}]*border:1px solid var\(--surface-cool-grey-100\)[^}]*border-radius:12px[^}]*box-shadow:var\(--effect-shadow-button-white\)/);
  assert.match(css, /\.rib-activity-card\.is-double\{[^}]*min-height:60px/);
  assert.match(css, /\.rib-activity-card__label\{[^}]*font-size:12px[^}]*line-height:16px[^}]*font-weight:600[^}]*letter-spacing:\.25px/);
  assert.match(css, /\.rib-activity-card__sub-label,[^{]+\{[^}]*font-size:11px[^}]*line-height:16px[^}]*letter-spacing:\.25px/);
  assert.match(css, /\.rib-activity-card\.is-failed\.is-single \.rib-activity-card__label\{[^}]*color:var\(--err-600\)/);
});

test('uses AA-safe status text while keeping Figma state glyphs exact', () => {
  const components = read('js/components.js');
  const css = read('css/app.css');

  assert.match(components, /AA contrast correction/);
  assert.match(css, /\.rib-activity-card\.is-completed \.rib-activity-card__status\{[^}]*color:var\(--succ-700\)/);
  assert.match(css, /\.rib-activity-card\.is-warning \.rib-activity-card__status\{[^}]*color:var\(--neutral-grey-140\)/);
  assert.match(css, /\.rib-activity-card\.is-failed \.rib-activity-card__status\{[^}]*color:var\(--err-600\)/);
});

test('publishes Activity timeline in the catalogue and playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');

  assert.match(components, /PUBLISHED_COMPONENT_IDS = Object\.freeze\(\['button','calendar','accordions','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(components, /sandbox: 'activity-timeline'/);
  assert.match(sandbox, /['"]activity-timeline['"]:\s*\{/);
  assert.match(sandbox, /PUBLISHED_SANDBOX_IDS = Object\.freeze\(\['button','calendar','accordion','activity-timeline','avatar','breadcrumbs'\]\)/);
  assert.match(sandbox, /RibActivityCalendarTimeline\(/);
});

test('matches the Figma calendar timeline composition in the playground', () => {
  const components = read('js/components.js');
  const sandbox = read('js/sandbox.js');
  const css = read('css/app.css');

  assert.match(components, /function renderRibActivityCalendar/);
  assert.match(components, /data-figma-node="4235:18074"/);
  for (const dateLabel of ['Today', '02 Jan', '2023', '02 Dec', '02 Nov']) {
    assert.match(sandbox, new RegExp(`dateLabel:'${dateLabel}'`));
  }
  assert.match(sandbox, /renderRibActivityCalendar\(/);
  assert.doesNotMatch(sandbox, /Transfer tracking/);
  assert.match(css, /\.rib-activity-calendar\{[^}]*width:min\(367px,100%\)[^}]*gap:16px/);
  assert.match(css, /\.rib-activity-calendar__connector\{[^}]*left:59px[^}]*height:100%/);
  assert.match(css, /\.rib-activity-calendar__row\{[^}]*grid-template-columns:63px minmax\(0,288px\)[^}]*gap:16px/);
  assert.match(css, /\.rib-activity-calendar__date\{[^}]*font-size:11px[^}]*letter-spacing:1\.2px[^}]*text-transform:uppercase/);
  assert.match(css, /\.rib-activity-calendar__divider\{[^}]*border-top:1px dashed var\(--neutral-grey-70\)/);
  assert.match(css, /\.rib-activity-calendar \.rib-activity-card\{[^}]*height:60px[^}]*padding-top:11px[^}]*padding-bottom:11px/);
  assert.match(css, /\.sb-layout\.is-activity-timeline \.sb-preview\{[^}]*min-height:442px[^}]*border-width:1px[^}]*background:#f9f9f9[^}]*background-image:none/);
});

test('provides a reusable Flutter Activity timeline implementation', () => {
  const flutter = read('flutter/rib_activity_timeline.dart');

  assert.match(flutter, /enum RibActivityTimelineState/);
  assert.match(flutter, /enum RibActivityTimelineType/);
  assert.match(flutter, /class RibActivityTimelineItem/);
  assert.match(flutter, /class RibActivityTimeline extends StatelessWidget/);
  assert.match(flutter, /final List<RibActivityTimelineItem> items;/);
  assert.match(flutter, /Semantics\(/);
  assert.match(flutter, /explicitChildNodes: true/);
  assert.match(flutter, /ListView\.separated/);
  assert.match(flutter, /DsEffects\.shadowButtonWhite/);
  assert.match(flutter, /onItemTap/);
  assert.match(flutter, /class RibActivityCalendarItem/);
  assert.match(flutter, /class RibActivityCalendarTimeline extends StatelessWidget/);
});

test('keeps the Activity timeline playground responsive', () => {
  const css = read('css/app.css');

  assert.match(css, /\.rib-activity-calendar\{[^}]*width:min\(367px,100%\)/);
  assert.match(css, /\.sb-layout\.is-activity-timeline/);
  assert.match(css, /@media \(max-width:1000px\)\{[\s\S]*?\.sb-layout\.is-activity-timeline\{grid-template-columns:1fr\}/);
});

test('associates Activity timeline playground controls with accessible labels', () => {
  const sandbox = read('js/sandbox.js');

  assert.match(sandbox, /const controlId = `sb-\$\{sbCurrent\}-\$\{c\.key\}`/);
  assert.match(sandbox, /<label for="' \+ controlId \+ '">/);
  assert.match(sandbox, /<select id="' \+ controlId \+ '" name="' \+ c\.key \+ '"/);
  assert.match(sandbox, /aria-label="' \+ esc\(c\.label\) \+ '"/);
});
