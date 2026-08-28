/* ============================================================
   GlobalDS Portal — app shell: navigation, pages and exports UI
   ============================================================ */

const NAV = [
  { section: 'Getting started', items: [
    { route: '#/home', label: 'Overview', icon: 'ti-home' }
  ]},
  { section: 'Foundations', items: [
    { route: '#/f/colors',     label: 'Colours',            icon: 'ti-palette' },
    { route: '#/f/typography', label: 'Typography',         icon: 'ti-typography' },
    { route: '#/f/spacing',    label: 'Spacing & layout',   icon: 'ti-ruler' },
    { route: '#/f/shape',      label: 'Radius & effects', icon: 'ti-square-rounded' },
    { route: '#/f/icons',      label: 'Iconography',        icon: 'ti-star' }
  ]},
  { section: 'Components', items: PUBLISHED_COMPONENT_IDS.map(id => ({
    route: '#/c/' + id, label: COMPONENTS[id].title, icon: null, status: COMPONENTS[id].status
  }))},
  { section: 'Patterns', items: [
    { route: '#/patterns', label: 'Pattern lab', icon: 'ti-layout-grid' }
  ]},
  { section: 'Sandbox', items: [
    { route: '#/sandbox', label: 'Playground', icon: 'ti-flask' }
  ]},
  { section: 'Developers', items: [
    { route: '#/developers', label: 'Platform exports', icon: 'ti-code' }
  ]}
];

/* ---------- shared page header (the component we designed) ---------- */

function pageHeader(o){
  const crumbs = o.crumbs.map((c, i) =>
    (i ? '<i class="ti ti-arrow-right"></i>' : '') +
    '<span' + (i === o.crumbs.length - 1 ? ' class="cur"' : '') + '>' + esc(c) + '</span>'
  ).join('');
  const status = (o.status || '').toLowerCase();
  const statusClass = status === 'stable' ? 'success' : status === 'beta' ? 'info' : status === 'deprecated' ? 'error' : 'neutral';
  const titleBadge = o.status ? '<span class="dh-title-badge ' + statusClass + '"><i class="ti ti-circle-check"></i>' + esc(o.status.charAt(0).toUpperCase() + o.status.slice(1)) + '</span>' : '';
  const meta = [];
  if (o.version) meta.push('<span class="pill neutral">v' + esc(o.version) + '</span>');
  if (o.updated) meta.push('<span class="upd">Updated ' + esc(o.updated) + ' · Web and mobile</span>');
  return `<header class="doc-header">
    <div class="dh-top">
      <div class="dh-crumbs"><span class="dh-mark">i</span>${crumbs}</div>
      <span class="dh-site">www.icici.bank.in</span>
    </div>
    <div class="dh-title-row">
      <h1 class="dh-title">${esc(o.title)}</h1>
      ${titleBadge}
    </div>
    <p class="dh-desc">${esc(o.desc)}</p>
    ${meta.length ? '<div class="dh-meta">' + meta.join('') + '</div>' : ''}
  </header>`;
}

function sectionHtml(s){
  return `<section class="section">
    <h2 class="section-title">${esc(s.title)}</h2>
    ${s.note ? '<p class="section-note">' + esc(s.note) + '</p>' : ''}
    ${s.html}
    ${s.guidance ? guidanceHtml(s.guidance.label || 'Guidance', s.guidance.html || '') : ''}
  </section>`;
}

function guidanceHtml(label, inner){
  return `<details class="guidance">
    <summary><i class="ti ti-info-circle"></i><span>${esc(label)}</span><i class="ti ti-chevron-down guidance-caret"></i></summary>
    <div class="guidance-body">${inner}</div>
  </details>`;
}

function guidanceList(items){
  return `<dl class="guidance-list">${items.map(item => `
    <div>
      <dt>${esc(item.term)}${item.token ? ' <code>' + esc(item.token) + '</code>' : ''}</dt>
      <dd>${esc(item.text)}</dd>
    </div>`).join('')}</dl>`;
}

function ribCoverageHtml(){
  const coverage = DS.foundationCoverage;
  return `<section class="rib-coverage" aria-label="RIB foundation coverage">
    <div class="rib-coverage-copy">
      <span>Canonical source · Atoms - RIB</span>
      <h2>${coverage.total} audited RIB assets</h2>
      <p>GlobalDS now preserves the complete local RIB foundation contract and uses it as the basis for new components.</p>
    </div>
    <dl class="rib-coverage-grid">
      <div><dt>${coverage.paintStyles}</dt><dd>87 paint styles</dd></div>
      <div><dt>${coverage.textStyles}</dt><dd>36 text styles</dd></div>
      <div><dt>${coverage.effectStyles}</dt><dd>8 effect styles</dd></div>
      <div><dt>${coverage.gridStyles}</dt><dd>3 responsive grids</dd></div>
      <div><dt>${coverage.variables}</dt><dd>5 variables</dd></div>
    </dl>
  </section>`;
}

function productMockup(){
  return `<article class="product-mockup-card" aria-label="GlobalDS Portal preview">
    <div class="mockup-toolbar">
      <span></span><span></span><span></span>
      <b>GlobalDS Portal</b>
    </div>
    <div class="mockup-peek">
      <section class="peek-card peek-primary">
        <span class="mockup-badge">Foundations</span>
        <div class="peek-swatches" aria-hidden="true">
          <span style="--c:#E3530F"></span>
          <span style="--c:#BE2A2A"></span>
          <span style="--c:#202428"></span>
          <span style="--c:#EFF1F6"></span>
        </div>
      </section>
      <section class="peek-card peek-type">
        <span class="peek-label">Typography</span>
        <strong>Aa</strong>
        <p>Mulish · 16 / 24</p>
      </section>
      <section class="peek-card peek-component">
        <span class="peek-label">Component</span>
        <button class="peek-button" type="button">Continue</button>
      </section>
      <section class="peek-card peek-pattern">
        <span class="peek-label">Pattern</span>
        <div class="peek-steps" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </section>
    </div>
    <div class="mockup-caption">A quiet look inside the system.</div>
  </article>`;
}

function appFooter(){
  return `<footer class="app-footer">
    <div class="app-footer-inner">
      <div>
        <strong>GlobalDS Portal</strong>
        <p>One visual home for ICICI Bank foundations, components, patterns and platform guidance.</p>
      </div>
      <nav aria-label="Footer">
        <a href="#/f/colors">Foundations</a>
        <a href="#/c/accordions">Components</a>
        <a href="#/patterns">Patterns</a>
        <a href="#/developers">Exports</a>
      </nav>
    </div>
  </footer>`;
}

/* ---------- pages ---------- */

function renderHome(){
  const compCount = PUBLISHED_COMPONENT_IDS.length;
  const tokenCount = DS.foundationCoverage.total;
  return `
  <div class="hero cal-hero">
    <div class="hero-copy">
      <div class="hero-top">
        <div class="dh-crumbs"><span class="dh-mark">i</span><span>ICICI Bank</span><i class="ti ti-arrow-right"></i><span class="cur">GlobalDS Portal</span></div>
        <span class="dh-site">Shared visual language</span>
      </div>
      <div class="dh-title-row">
        <h1 class="hero-title" data-reveal-words>One system for every ICICI experience.</h1>
      </div>
      <p class="hero-desc">Explore the shared visual language for ICICI products. The portal turns the audited RIB foundation into practical guidance for designers, product teams and engineers across desktop and mobile.</p>
      <div class="hero-foot">
        <button class="ds-btn primary md" data-magnetic="0.12" data-go="#/f/colors">Explore the system <i class="ti ti-arrow-right"></i></button>
        <button class="ds-btn secondary md" data-go="#/c/accordions">Browse components</button>
      </div>
    </div>
    ${productMockup()}
  </div>
  <div class="metric-grid">
    <div class="metric"><small>Components</small><strong data-countup>${compCount}</strong></div>
    <div class="metric"><small>Audited foundation assets</small><strong data-countup>${tokenCount}</strong></div>
    <div class="metric"><small>Patterns</small><strong data-countup>${Object.keys(PATTERNS).length}</strong></div>
    <div class="metric"><small>Platform estate</small><strong>8 platforms</strong></div>
  </div>
  ${ribCoverageHtml()}
  ${renderPlatformScope()}
  <section class="section">
    <h2 class="section-title">Made for the whole product team</h2>
    <p class="section-note">Use the same source to discuss design decisions, validate journeys and implement platform-native experiences.</p>
    <div class="cards-grid">
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-pencil"></i><h3>Designers</h3><p>Inspect foundations, component states and responsive patterns without reading implementation code.</p></div>
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-route"></i><h3>Product and content</h3><p>Review real banking journeys, interaction states and guidance using a shared product vocabulary.</p></div>
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-code"></i><h3>Engineering</h3><p>Trace visual decisions to governed tokens and generate platform-native implementation files.</p></div>
    </div>
  </section>
  <section class="section">
    <h2 class="section-title">Start here</h2>
    <div class="cards-grid">
      <div class="link-card" data-go="#/f/colors" data-tilt="3" data-spotlight><i class="ti ti-palette"></i><h3>Foundations</h3><p>Colours, type, spacing, radius — the raw material of every screen.</p></div>
      <div class="link-card" data-go="#/c/accordions" data-tilt="3" data-spotlight><i class="ti ti-components"></i><h3>Components</h3><p>Visual specifications, behavior, states and implementation guidance for reusable building blocks.</p></div>
      <div class="link-card" data-go="#/sandbox" data-tilt="3" data-spotlight><i class="ti ti-flask"></i><h3>Playground</h3><p>Explore component properties and states live before moving into platform implementation.</p></div>
      <div class="link-card" data-go="#/patterns" data-tilt="3" data-spotlight><i class="ti ti-layout-grid"></i><h3>Pattern lab</h3><p>Login, OTP, transfers — full flows with switchable states.</p></div>
    </div>
  </section>
  <section class="section">
    <h2 class="section-title">Product UI fragments</h2>
    <div class="cards-grid feature-showcase">
      <div class="link-card product-fragment" style="cursor:default" data-tilt="3" data-spotlight>
        <div class="fragment-stage">
          <span class="fragment-kicker">Token sync</span>
          <div class="fx-window">
            <div class="fx-window-bar"><span></span><span></span><span></span><b>tokens.js</b></div>
            <div class="fx-window-body">
              <div class="fx-swatches"><i style="--c:var(--brand-400)"></i><i style="--c:var(--brand-maroon)"></i><i style="--c:var(--dos-ink)"></i><i style="--c:var(--dos-hairline)"></i></div>
              <div class="fx-type"><strong>Aa</strong><span></span></div>
            </div>
          </div>
        </div>
        <h3>Generated from one source</h3>
        <p>Colour, type, spacing and radius exports for Kotlin/React, Flutter and SwiftUI stay tied to the same token object.</p>
      </div>
      <div class="link-card product-fragment" style="cursor:default" data-tilt="3" data-spotlight>
        <div class="fragment-stage">
          <span class="fragment-kicker">Patterns</span>
          <div class="fx-window">
            <div class="fx-window-bar"><span></span><span></span><span></span><b>patterns</b></div>
            <div class="fx-window-body">
              <div class="fx-flow">
                <i class="done"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg></i>
                <u class="done"></u>
                <i class="done"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg></i>
                <u></u>
                <i class="live"></i>
              </div>
              <div class="fx-flow-labels"><span>Login</span><span>OTP</span><span>Done</span></div>
            </div>
          </div>
        </div>
        <h3>Flows over theory</h3>
        <p>Login, OTP and transfer patterns show real states instead of abstract documentation.</p>
      </div>
      <div class="link-card product-fragment" style="cursor:default" data-tilt="3" data-spotlight>
        <div class="fragment-stage">
          <span class="fragment-kicker">Handoff</span>
          <div class="fx-window">
            <div class="fx-window-bar"><span></span><span></span><span></span><b>theme.dart</b></div>
            <div class="fx-window-body fx-code">
              <div class="fx-line"><em>MaterialApp</em><span class="pun">(</span></div>
              <div class="fx-line indent"><em class="prop">theme</em><span class="pun">:</span> <b class="tok">DsTheme.light</b><span class="pun">,</span></div>
              <div class="fx-line"><span class="pun">)</span></div>
            </div>
          </div>
        </div>
        <h3>Buildable by default</h3>
        <p>The Developers page generates native token and theme files for all three delivery stacks.</p>
      </div>
    </div>
  </section>
  <section class="section cta-band-light">
    <h2>See the system in a real journey.</h2>
    <p>Move from individual foundations and components into complete login, OTP and transfer experiences.</p>
    <button class="ds-btn primary md" data-go="#/patterns">Explore patterns</button>
  </section>
  <section class="section">
    <h2 class="section-title">Principles</h2>
    <div class="cards-grid">
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-accessible"></i><h3>Accessible by default</h3><p>AA contrast everywhere, 44px touch targets, labels that survive translation.</p></div>
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-world"></i><h3>One system, many platforms</h3><p>Channel and journey differences live in configuration, not in forked foundations.</p></div>
      <div class="link-card" style="cursor:default" data-tilt="3" data-spotlight><i class="ti ti-code"></i><h3>One source, platform-native output</h3><p>Every supported framework receives a native API generated from the same governed token identity.</p></div>
    </div>
  </section>`;
}

function renderColors(){
  const tokenStop = (ramp, stop) => ramp + (String(stop).match(/^\d/) ? String(stop) : String(stop).charAt(0).toUpperCase() + String(stop).slice(1));
  const isLightColour = (value) => {
    let channels;
    if (value.startsWith('#')) {
      const h = value.replace('#','').slice(0, 6);
      channels = [0,2,4].map(i => parseInt(h.slice(i, i + 2), 16));
    } else {
      const rgba = value.match(/[\d.]+/g)?.map(Number) || [];
      const alpha = rgba.length > 3 ? rgba[3] : 1;
      channels = rgba.slice(0, 3).map(channel => channel * alpha + 255 * (1 - alpha));
    }
    const [r,g,b] = channels.map(channel => channel / 255);
    const lum = .2126 * r + .7152 * g + .0722 * b;
    return lum > .68;
  };
  const swatch = (stop, value, token, status = '') => {
    const light = isLightColour(value);
    const ink = light ? 'var(--gray-900)' : '#fff';
    const statusLabel = status === 'visual-only' ? 'Visual only' : status === 'nominal' ? 'Nominal value' : '';
    return `<button class="colour-swatch ${light ? 'is-light' : 'is-dark'}" data-copy-text="${esc(value)}" style="--swatch:${esc(value)};--swatch-ink:${ink}" title="Copy ${esc(value)}" aria-label="Copy ${esc(value)}, ${esc(token)}${statusLabel ? ', ' + statusLabel : ''}">
      <span class="colour-chip">
        <em>${esc(stop)}</em>
        <span class="colour-copy"><i class="ti ti-copy"></i></span>
      </span>
      <span class="colour-swatch-footer">
        <span class="colour-swatch-body">
          <b>${esc(value)}</b>
          <small>${esc(token)}</small>
          ${statusLabel ? `<span class="colour-source-status">${esc(statusLabel)}</span>` : ''}
        </span>
      </span>
    </button>`;
  };
  const rampCard = (ramp, options = {}) => {
    const def = options.palette ? options.palette[ramp] : DS.color[ramp];
    const label = def.label;
    const stops = Object.entries(def.stops);
    const tokenFor = stop => def.tokens?.[stop] || 'DsColors.' + tokenStop(ramp, stop);
    const swatches = stops.map(([stop, value]) => swatch(stop, value, tokenFor(stop), def.status?.[stop])).join('');
    const strip = stops.map(([stop, value]) => `<span style="background:${esc(value)}" title="${esc(stop)} · ${esc(value)}"></span>`).join('');
    const headingTag = options.headingTag || 'h3';
    const contract = options.source ? `${stops.length} source token${stops.length === 1 ? '' : 's'}` : `DsColors.${ramp}*`;
    return `<article class="colour-ramp-card">
      <div class="colour-ramp-head">
        <div>
          <span class="colour-ramp-kicker">${options.source ? 'Source ramp' : 'Palette ramp'}</span>
          <${headingTag}>${esc(label)}</${headingTag}>
          ${def.note ? `<p>${esc(def.note)}</p>` : ''}
        </div>
        <code>${esc(contract)}</code>
      </div>
      <div class="colour-ramp-strip">${strip}</div>
      <div class="colour-swatch-grid">${swatches}</div>
    </article>`;
  };
  // compact "<label> — note" list for the ramps in a section
  const rampNotes = (ramps) => `<dl class="colour-note-list">${ramps.map(ramp => {
    const def = DS.color[ramp];
    return `<div><dt>${esc(def.label)} <code>DsColors.${esc(ramp)}*</code></dt><dd>${esc(def.note)}</dd></div>`;
  }).join('')}</dl>`;
  const roleGridHtml = () => `<div class="colour-role-grid">${roleCards.map(card => `
    <article class="colour-role-card">
      <span class="colour-role-icon" style="background:${card.swatch}"><i class="ti ${card.icon}"></i></span>
      <div><h3>${esc(card.title)}</h3><code>${esc(card.token)}</code><p>${esc(card.text)}</p></div>
    </article>`).join('')}</div>`;
  const usageTableHtml = () => `<div class="colour-usage-table">${usageRows.map(row => `
    <div class="colour-usage-row">
      <strong>${esc(row[0])}</strong><code>${esc(row[1])}</code><span>${esc(row[2])}</span><em>${esc(row[3])}</em>
    </div>`).join('')}</div>`;
  const surfaceGridHtml = (rows) => `<div class="surface-token-grid">${rows.map(row => `
    <article class="surface-token-card" data-copy-text="${esc(row[2])}">
      <span style="background:${esc(row[2])}"></span>
      <div><strong>${esc(row[0])}</strong><code>${esc(row[1])}</code><p>${esc(row[3])}</p></div>
    </article>`).join('')}</div>`;
  const colorWithPaintOpacity = (color, opacity = 1) => {
    const value = color.replace('#', '');
    const sourceAlpha = value.length === 8 ? parseInt(value.slice(6, 8), 16) / 255 : 1;
    const resolvedAlpha = Math.round(sourceAlpha * opacity * 255);
    return `#${value.slice(0, 6)}${resolvedAlpha < 255 ? resolvedAlpha.toString(16).padStart(2, '0').toUpperCase() : ''}`;
  };
  const gradientCss = style => {
    const layers = style.paints.slice().reverse().map(paint => {
      if (paint.type === 'SOLID') return colorWithPaintOpacity(paint.color, paint.opacity);
      const stops = paint.stops.map(stop => `${colorWithPaintOpacity(stop.color, paint.opacity)} ${(stop.position * 100).toFixed(2)}%`).join(', ');
      return paint.type === 'GRADIENT_RADIAL'
        ? `radial-gradient(circle, ${stops})`
        : `linear-gradient(180deg, ${stops})`;
    });
    return layers.join(', ');
  };
  const gradientSummary = style => style.paints.map(paint => {
    if (paint.type === 'SOLID') return paint.color;
    return `${paint.type.replace('GRADIENT_', '').toLowerCase()} · ${paint.stops.map(stop => stop.color).join(' → ')}${paint.opacity !== 1 ? ` · ${Math.round(paint.opacity * 100)}% paint` : ''}`;
  }).join(' + ');
  const renderGradientCard = style => `<button class="colour-gradient-card rib-gradient-card" type="button" data-copy-text="${esc(JSON.stringify(style))}" title="Copy exact style JSON">
    <span class="rib-gradient-preview" style="background:${esc(gradientCss(style))}"></span>
    <div><strong>${esc(style.name)}</strong><code>${esc(gradientSummary(style))}</code><small>${style.paints.length} paint layer${style.paints.length === 1 ? '' : 's'} · exact Figma transform retained in export</small></div>
    <span class="foundation-copy"><i class="ti ti-copy"></i></span>
  </button>`;
  const roleCards = [
    { icon:'ti-sparkles', title:'Brand identity', token:'brand.orange / brand.maroon', text:'Fixed ICICI colours for identity, top rails, logo moments and signature brand expression.', swatch:'#E3530F' },
    { icon:'ti-click', title:'Primary action', token:'primaryOrange.100', text:'The exact RIB default action colour. Pair it with dark content for accessible text contrast.', swatch:'#F0792E' },
    { icon:'ti-click', title:'Pressed action', token:'primaryOrange.110 / 120', text:'Use the darker RIB stops for interaction states; stop 120 supports white text at AA.', swatch:'#DB5E10' },
    { icon:'ti-diamond', title:'Maroon emphasis', token:'primaryMaroon.100', text:'The exact RIB maroon action and emphasis colour.', swatch:'#982F35' }
  ];
  const usageRows = [
    ['Brand orange', 'brand.orange', 'Fixed identity orange for brand expression and top strips.', 'Do not use as the default CTA fill.'],
    ['Brand maroon', 'brand.maroon', 'Fixed identity red-maroon for the brand gradient and signature marks.', 'Do not use as error colour.'],
    ['Primary CTA fill', 'primaryOrange.100', 'Exact RIB high-emphasis action colour.', 'Use dark text: white is only 2.81:1 and fails AA.'],
    ['CTA hover', 'primaryOrange.110', 'RIB interaction state for primary controls.', 'Use dark text; white is 3.74:1.'],
    ['CTA pressed', 'primaryOrange.120', 'Deep RIB orange for pressed and high-contrast states.', 'White text passes AA at 5.65:1.'],
    ['Maroon emphasis', 'primaryMaroon.100', 'Secondary brand action, serious emphasis, and strong anchor moments.', 'Keep it deliberate; orange remains the default action colour.']
  ];
  const surfaceRows = [
    ['App canvas', '--surface-app', '#EFF1F6', 'The quiet page background that separates navigation from content.'],
    ['Sidebar', '--surface-sidebar', '#F8F9FB', 'A near-white rail for persistent navigation.'],
    ['Raised card', '--surface-raised', '#FFFFFF', 'Headers, cards, panels and form groups.'],
    ['Subtle surface', '--surface-subtle', '#F8F9FB', 'Low-emphasis panels, metric blocks and table headers.'],
    ['Quiet border', '--border-quiet', '#E7E8E9', 'Low-emphasis component edges and separators.'],
    ['Strong border', '--border-strong', '#CDCFD0', 'Page header edges and primary surface separation.']
  ];
  const alphaRows = Object.entries(DS.alpha).flatMap(([colour, stops]) =>
    Object.entries(stops).map(([stop, value]) => [
      `${colour.charAt(0).toUpperCase() + colour.slice(1)} overlay ${stop}`,
      `alpha.${colour}.${stop}`,
      value,
      stop === '50'
        ? 'Component-specific white stroke used by primary button anatomy.'
        : `${stop}% ${colour} overlay for scrims, media and layered surfaces.`
    ])
  );
  const renderSourceVariant = variant => `<section class="colour-source-variant" aria-labelledby="source-${esc(variant.id)}-title">
    <header class="colour-source-variant-head">
      <div>
        <span>${esc(variant.sourceLabel)}</span>
        <h3 id="source-${esc(variant.id)}-title">${esc(variant.label)}</h3>
      </div>
      <p>${esc(variant.description)}</p>
    </header>
    ${variant.sections.map(section => `<section class="colour-source-section">
      <h4>${esc(section.title)}</h4>
      <div class="colour-ramp-stack compact">${section.ramps.map(ramp => rampCard(ramp, {
        palette:variant.palette,
        source:true,
        headingTag:'h5',
      })).join('')}</div>
    </section>`).join('')}
  </section>`;
  const ribSolidStyles = DS.paintStyles.filter(style => style.paints.every(paint => paint.type === 'SOLID'));
  const solidStyleValue = style => {
    const paint = style.paints[0];
    if (paint.opacity === 1) return paint.color;
    const alpha = Math.round(paint.opacity * 255).toString(16).padStart(2, '0').toUpperCase();
    return `${paint.color}${alpha}`;
  };
  let html = pageHeader({ crumbs:['Foundations','Colours'], title:'Colours', status:'stable', version:'1.1',
    updated:DS.meta.updated,
    desc:'The canonical palette now covers every local colour style and variable in RIB Atoms, including multi-paint gradients and source conflicts.' });

  html += ribCoverageHtml();

  html += `<div class="colour-system-tabs" role="tablist" aria-label="Colour systems">
    <button class="colour-system-tab" id="colour-tab-global" type="button" role="tab" aria-controls="colour-panel-global" aria-selected="true" tabindex="0" data-colour-tab="global">GlobalDS colours</button>
    <button class="colour-system-tab" id="colour-tab-imobile" type="button" role="tab" aria-controls="colour-panel-imobile" aria-selected="false" tabindex="-1" data-colour-tab="imobile">iMobile colours</button>
    <button class="colour-system-tab" id="colour-tab-rib" type="button" role="tab" aria-controls="colour-panel-rib" aria-selected="false" tabindex="-1" data-colour-tab="rib">RIB colours</button>
  </div>
  <div class="colour-system-panel" id="colour-panel-global" role="tabpanel" aria-labelledby="colour-tab-global">`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Convergence decision</h2>
    <p class="section-note">RIB is the canonical foundation source for this release. Source values stay exact; semantic aliases make them safe to use in components.</p>
    ${guidanceHtml('How RIB values become component foundations', `
      ${guidanceList([
        { term:'Brand pair', token:'#E3530F / #BE2A2A', text:'Preserve the fixed ICICI identity colours; they are not repurposed as semantic state colours.' },
        { term:'Action ramps', token:'primaryOrange / primaryMaroon', text:'Preserve the exact NEWOrange and NEWMaroon RIB ramps, then map accessible foregrounds semantically.' },
        { term:'Neutrals', token:'neutralGrey / surfaceCoolGrey', text:'Preserve the mixed RIB style paths while publishing one stable code-facing alias.' },
        { term:'Source conflict', token:'NEWPastel/Brown/120', text:'Keep both published values in the audit contract; use #CFCAAF as the temporary canonical alias.' },
        { term:'Operational states', token:'success / warning / error / info', text:'Use every exact RIB indicative stop, including Warning 80 for background surfaces.' }
      ])}
    `)}
  </section>`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Brand and primary colours</h2>
    <div class="colour-ramp-stack">${['brand','primaryOrange','primaryMaroon'].map(rampCard).join('')}</div>
    ${guidanceHtml('Roles & usage guidance', `
      <p class="guidance-note">Brand colours create recognition; primary colours drive interaction. Primary Orange 100 is the exact RIB value <code>#F0792E</code>; use a dark content token on it for accessible labels.</p>
      ${roleGridHtml()}
      ${usageTableHtml()}
      ${rampNotes(['brand','primaryOrange','primaryMaroon'])}
    `)}
  </section>`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Neutrals and surfaces</h2>
    <div class="colour-ramp-stack">${['neutralBase','neutralGrey','surfaceCoolGrey','backgroundGrey'].map(rampCard).join('')}</div>
    ${guidanceHtml('Roles, surface & alpha tokens', `
      <p class="guidance-note">Neutrals are split by job: absolute endpoints, neutral greys for ink and structure, and cool surface greys for page planes — calm without flattening everything into one pale field.</p>
      ${rampNotes(['neutralBase','neutralGrey','surfaceCoolGrey','backgroundGrey'])}
      <h4 class="guidance-subhead">Surface tokens</h4>
      ${surfaceGridHtml(surfaceRows)}
      <h4 class="guidance-subhead">Alpha overlays</h4>
      <p class="guidance-note">Alpha tokens stay separate from the colour ramp because their appearance depends on what sits underneath them.</p>
      ${surfaceGridHtml(alphaRows)}
    `)}
  </section>`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Pastel ramps</h2>
    <p class="section-note">Pastels provide controlled tinted surfaces without borrowing the meaning of operational state colours.</p>
    <div class="colour-ramp-stack compact">${['pastelBlue','pastelBrown','pastelGreen','pastelAmber','pastelPeach'].map(rampCard).join('')}</div>
    ${guidanceHtml('Pastel usage guidance', `
      <p class="guidance-note">Use these for low-emphasis panels, decorative illustrations and category distinction. Pair them with explicit text or icons when meaning matters.</p>
      ${rampNotes(['pastelBlue','pastelBrown','pastelGreen','pastelAmber','pastelPeach'])}
    `)}
  </section>`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Semantic ramps</h2>
    <div class="colour-ramp-stack compact">${['success','warning','error','info'].map(rampCard).join('')}</div>
    ${guidanceHtml('When to reach for a semantic colour', `
      <p class="guidance-note">Semantic colour is reserved for state. A green, amber, red or blue surface must tell the user something operationally true.</p>
      ${guidanceList([
        { term:'Success fill', token:'success.110 + white', text:'Use the strong stop for filled confirmations; the mid stop remains useful for icons and indicators.' },
        { term:'Warning fill', token:'warning.110 + neutralGrey.150', text:'Warning needs dark foreground content; white does not provide sufficient contrast.' },
        { term:'Error fill', token:'error.110 + white', text:'Use the strong stop for destructive or failed-state fills.' },
        { term:'Information fill', token:'info.110 + white', text:'Use the strong stop for filled information surfaces; reserve the mid stop for non-text indicators.' }
      ])}
      ${rampNotes(['success','warning','error','info'])}
    `)}
  </section>`;

  html += `<section class="section colour-section">
    <h2 class="section-title">Gradients</h2>
    <p class="section-note">All 14 RIB gradient paint styles are retained, including exact stops, paint opacity, multiple layers and Figma transforms.</p>
    <div class="colour-gradient-stack">${DS.gradients.map(renderGradientCard).join('')}</div>
  </section>
  </div>
  <div class="colour-system-panel" id="colour-panel-imobile" role="tabpanel" aria-labelledby="colour-tab-imobile" hidden>
    <header class="colour-panel-intro">
      <span>Source audit · 128 scalar occurrences</span>
      <h2>iMobile colours</h2>
      <p>Android and iOS remain separate source variants here. These values are available for comparison and migration, but they are not part of the GlobalDS export contract.</p>
    </header>
    ${GlobalDSSourceColours.imobile.variants.map(renderSourceVariant).join('')}
  </div>
  <div class="colour-system-panel" id="colour-panel-rib" role="tabpanel" aria-labelledby="colour-tab-rib" hidden>
    <header class="colour-panel-intro">
      <span>Source audit · 87 paint styles + 5 variables</span>
      <h2>Complete RIB colour inventory</h2>
      <p>This is the exact audited RIB source contract used by GlobalDS: 73 solid paint styles, 14 gradient styles and all five local variables.</p>
    </header>
    <section class="section colour-section">
      <h2 class="section-title">73 solid paint styles</h2>
      <div class="rib-source-style-grid">${surfaceGridHtml(ribSolidStyles.map(style => [
        style.name,
        'RIB paint style',
        solidStyleValue(style),
        style.description || `${Math.round(style.paints[0].opacity * 100)}% paint opacity`,
      ]))}</div>
      <div class="callout warning"><i class="ti ti-alert-triangle"></i><div><strong>Source conflict retained.</strong> <code>NEWPastel/Brown/120</code> exists twice with <code>#CFCAAF</code> and <code>#D9D5BF</code>. GlobalDS does not silently discard either value.</div></div>
    </section>
    <section class="section colour-section">
      <h2 class="section-title">14 gradient paint styles</h2>
      <div class="colour-gradient-stack">${DS.gradients.map(renderGradientCard).join('')}</div>
    </section>
    <section class="section colour-section">
      <h2 class="section-title">5 semantic variables</h2>
      <div class="rib-variable-grid">${DS.variables.map(variable => `<button type="button" class="rib-variable-card" data-copy-text="${esc(variable.name)}" title="Copy ${esc(variable.name)}">
        <span style="background:${esc(variable.resolvedValue)}"></span>
        <div><strong>${esc(variable.name)}</strong><code>${esc(variable.resolvedValue)}</code><small>${esc(variable.sourceAlias)} · ${esc(variable.mode)}</small></div>
        <i class="ti ti-copy"></i>
      </button>`).join('')}</div>
      <p class="section-note">The RIB source scopes all five variables to <code>ALL_SCOPES</code> and hides them from publishing. GlobalDS preserves that source metadata while exporting their resolved values.</p>
    </section>
  </div>`;
  return html;
}

function renderSpacing(){
  let html = pageHeader({ crumbs:['Foundations','Spacing & layout'], title:'Spacing & layout', status:'stable', version:'1.1',
    updated:DS.meta.updated,
    desc:'The RIB layout foundation covers Desktop L, Tablet and Mobile explicitly, with a shared 4px rhythm underneath every viewport.' });
  const maxPx = Math.max.apply(null, DS.space.map(s => s.px));
  html += `<section class="section">
    <article class="foundation-card space-scale-card">
      <div class="foundation-card-head">
        <div><span class="foundation-kicker">Scale ramp</span><h2>Spacing scale</h2></div>
        <code>DsSpacing.*</code>
      </div>
      <div class="space-table">
        <div class="space-thead"><span>Token</span><span>Value</span><span>Scale</span><span>Use</span><span></span></div>
        ${DS.space.map(s => `<button class="space-trow" data-copy-text="DsSpacing.${esc(s.dart)}" title="Copy DsSpacing.${esc(s.dart)}">
          <b class="space-token">space.${esc(s.token)}</b>
          <span class="space-val">${s.px}px</span>
          <span class="space-track"><span class="space-fill" style="width:${Math.max(s.px / maxPx * 100, 4).toFixed(1)}%"></span></span>
          <span class="space-use">${esc(s.use)}</span>
          <span class="foundation-copy"><i class="ti ti-copy"></i></span>
        </button>`).join('')}
      </div>
    </article>
    ${guidanceHtml('Layout usage guidance', `
      <p class="guidance-note">One 4-point ramp drives every gap, inset and margin. Bars are drawn to scale against the largest step.</p>
      ${guidanceList([
        { term:'Mobile screen margins', token:'space.lg / space.xl', text:'Use 16-20px page margins depending on density and screen width.' },
        { term:'Card padding', token:'space.lg / space.xl', text:'Use 16-20px for most banking cards and form containers.' },
        { term:'Section separation', token:'space.2xl / space.3xl', text:'Use 24-32px to separate meaningful groups without over-fragmenting the page.' }
      ])}
    `)}
  </section>`;
  html += `<section class="section layout-grid-section">
    <h2 class="section-title">Responsive RIB grids</h2>
    <p class="section-note">Components adapt by layout behavior, but every platform reads the same named grid contract.</p>
    <div class="responsive-grid-cards">${DS.grid.map(style => {
      const columns = style.layoutGrids.find(grid => grid.pattern === 'COLUMNS');
      const row = style.layoutGrids.find(grid => grid.pattern === 'ROWS');
      return `<article class="responsive-grid-card">
        <header><div><span>${esc(style.viewport)}</span><h3>${esc(style.name)}</h3></div><code>grid.${esc(style.viewport)}</code></header>
        <div class="responsive-grid-preview" style="--grid-columns:${columns.count};--grid-gap:${columns.gutterSize}px;--grid-offset:${columns.offset}px">
          ${Array.from({ length:columns.count }, () => '<i></i>').join('')}
        </div>
        <dl>
          <div><dt>Columns</dt><dd>${columns.count}</dd></div>
          <div><dt>Gutter</dt><dd>${columns.gutterSize}px</dd></div>
          <div><dt>Offset</dt><dd>${columns.offset}px</dd></div>
          <div><dt>Mode</dt><dd>${esc(columns.alignment.toLowerCase())}</dd></div>
          ${columns.sectionSize ? `<div><dt>Column</dt><dd>${columns.sectionSize}px</dd></div>` : ''}
          ${row ? `<div><dt>Rows</dt><dd>${row.sectionSize}px / ${row.gutterSize}px gap${row.visible ? '' : ' · hidden'}</dd></div>` : ''}
        </dl>
      </article>`;
    }).join('')}</div>
    ${guidanceHtml('Responsive component rules', `
      ${guidanceList([
        { term:'Desktop L', token:'12 × 72px', text:'Use the fixed 12-column RIB grid with 8px gutters for large desktop compositions.' },
        { term:'Tablet', token:'12 stretch columns', text:'Keep the 12-column structure, with 16px page offsets and 12px gutters.' },
        { term:'Mobile', token:'4 stretch columns', text:'Collapse to four columns with 16px offsets and gutters; align vertical rhythm to the visible 4px row grid.' }
      ])}
    `)}
  </section>`;
  return html;
}

function renderShape(){
  const radiusGuidance = [
    { icon:'ti-square-rounded', title:'Controls stay functional', token:'radius.md', text:'Buttons, inputs and OTP boxes use a clear 12px shape without feeling bubbly.' },
    { icon:'ti-layout-card', title:'Cards stay quiet', token:'border + subtle radius', text:'Documentation and dense content cards rely on thin borders, white surfaces and restrained corners.' },
    { icon:'ti-layers-subtract', title:'Effects remain primitive', token:'effect.*', text:'Component aliases are created only while defining that component.' }
  ];
  const effectGroups = [
    { id:'depth', title:'Depth', note:'Four generic RIB depth primitives. They have no component meaning until a component maps one.' },
    { id:'special', title:'Special shadows', note:'Two source-named shadows retained exactly; component aliases remain deferred.' },
    { id:'rings', title:'Interaction rings', note:'Zero-blur spread effects for outline and focus treatment.' }
  ];
  let html = pageHeader({ crumbs:['Foundations','Radius & effects'], title:'Radius & effects', status:'stable', version:'1.2',
    updated:DS.meta.updated,
    desc:'GlobalDS retains all eight RIB effect primitives. Component and semantic effect aliases remain deferred until their components are defined.' });
  html += `<section class="section shape-section">
    <article class="foundation-card shape-scale-card">
      <div class="foundation-card-head">
        <div><span class="foundation-kicker">Shape ramp</span><h2>Corner radius</h2></div>
        <code>DsRadius.*</code>
      </div>
      <div class="radius-grid">${DS.radius.map(r => {
      const previewRadius = r.px === 999 ? '999px' : Math.min(r.px, 28) + 'px';
      return `<button class="radius-box" data-copy-text="DsRadius.${esc(r.dart)}" title="Copy DsRadius.${esc(r.dart)}">
        <div class="radius-preview" style="border-radius:${previewRadius}"><span></span></div>
        <div class="radius-meta">
          <b>radius.${esc(r.token)}</b>
          <code>${r.px === 999 ? '999 / full' : r.px + 'px'}</code>
          <p>${esc(r.use)}</p>
        </div>
        <span class="foundation-copy"><i class="ti ti-copy"></i></span>
      </button>`;
    }).join('')}</div>
    </article>
    ${guidanceHtml('Radius usage guidance', `
      <p class="guidance-note">Use the smallest radius that supports the component job. Pill is semantic for badges, chips, avatars and segmented selectors.</p>
      <div class="shape-rule-grid">${radiusGuidance.map(item => `
        <article class="shape-rule-card">
          <span><i class="ti ${item.icon}"></i></span>
          <div><h3>${esc(item.title)}</h3><code>${esc(item.token)}</code><p>${esc(item.text)}</p></div>
        </article>`).join('')}</div>
    `)}
  </section>`;
  html += `<section class="section shape-section">
    <article class="foundation-card effects-scale-card">
      <div class="foundation-card-head">
        <div><span class="foundation-kicker">8 exact RIB primitives</span><h2>Effects</h2></div>
        <code>DsEffects.*</code>
      </div>
      <div class="effect-groups">${effectGroups.map(group => {
        const effects = DS.effects.filter(effect => effect.group === group.title);
        return `<section class="effect-group" aria-labelledby="effect-group-${group.id}">
          <header class="effect-group-head">
            <div><span>RIB effect group</span><h3 id="effect-group-${group.id}">${esc(group.title)}</h3></div>
            <p>${esc(group.note)}</p>
          </header>
          <div class="effect-grid">${effects.map(e => {
            const index = DS.effects.indexOf(e);
            return `<button class="effect-card" data-copy-text="DsEffects.${esc(e.token)}" title="Copy DsEffects.${esc(e.token)}">
              <span class="effect-preview" style="box-shadow:${e.css}"><span>${String(index + 1).padStart(2, '0')}</span></span>
              <b>${esc(e.path)}</b>
              <small>${esc(e.name)}</small>
              <code>${esc(e.css)}</code>
              <p>${esc(e.use)}</p>
              <span class="foundation-copy"><i class="ti ti-copy"></i></span>
            </button>`;
          }).join('')}</div>
        </section>`;
      }).join('')}</div>
    </article>
    ${guidanceHtml('Effect usage guidance', `
      <p class="guidance-note">These are foundation primitives, not component decisions. Component aliases are added only when that component is defined.</p>
      ${guidanceList([
        { term:'Foundation', token:'effect.shadow.*', text:'Choose a depth primitive only while defining a component, then expose that choice through the component token.' },
        { term:'Source-specific', token:'effect.shadow.button-white / bottom-sticky', text:'Preserve the RIB source intent; do not generalise these special shadows into the depth scale.' },
        { term:'Interaction', token:'effect.ring.*', text:'Keep the one-pixel orange outline and three-pixel focus halo as separate, composable primitives.' }
      ])}
    `)}
  </section>`;
  return html;
}

function renderComponent(id){
  const c = COMPONENTS[id];
  if (!c || !PUBLISHED_COMPONENT_IDS.includes(id)) return '<div class="empty">Component not found.</div>';
  let html = pageHeader({ crumbs:['Components', c.group, c.title], title:c.title,
    status:c.status, version:c.version, updated:c.updated, desc:c.desc });
  c.sections.forEach(s => {
    html += sectionHtml({
      title:s.title,
      html:s.html,
      guidance:s.note ? { label:'Usage guidance', html:'<p class="guidance-note">' + esc(s.note) + '</p>' } : null
    });
  });
  html += `<section class="section"><h2 class="section-title">API</h2>
    <div class="props-wrap"><table class="props">
      <thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Notes</th></tr></thead>
      <tbody>${c.props.map(r => '<tr>' + r.map(cell => '<td>' + esc(cell) + '</td>').join('') + '</tr>').join('')}</tbody>
    </table></div></section>`;
  html += `<section class="section"><h2 class="section-title">Flutter</h2>${codeblock(c.flutter, 'dart')}</section>`;
  const sandboxHref = c.sandbox ? '#/sandbox/' + c.sandbox : '#/sandbox';
  html += `<div class="callout"><i class="ti ti-flask"></i><div>Want to try the props live? Open this component in the <a href="${sandboxHref}" style="font-weight:600;color:var(--brand-600)">sandbox</a>.</div></div>`;
  return html;
}

let patCurrent = 'login';
let patState = {};

function renderPatternsPage(){
  const p = PATTERNS[patCurrent];
  const publishedUses = p.uses.filter(id => PUBLISHED_COMPONENT_IDS.includes(id));
  if (!(patCurrent in patState)) patState[patCurrent] = p.states[0];
  const cur = patState[patCurrent];
  let html = pageHeader({ crumbs:['Patterns','Pattern lab'], title:'Pattern lab', status:'beta', version:'0.9',
    updated:'08 Jun 2026', noResources:true,
    desc:'Components composed into real banking flows. Switch states to see how a screen behaves when things go right — and when they don\'t. Every pattern here is buildable 1:1 from the component APIs.' });
  html += '<div class="seg" id="patPicker">' + Object.keys(PATTERNS).map(id =>
    '<button data-pat-pick="' + id + '"' + (id === patCurrent ? ' class="active"' : '') + '>' + esc(PATTERNS[id].title) + '</button>'
  ).join('') + '</div>';
  html += `<div class="pat-layout">
    <div class="ds-phone"><div class="ds-screen" id="patPhone">${p.render(cur)}</div></div>
    <div class="pat-info">
      <h3>State</h3>
      <div class="seg" id="patStates" style="margin-bottom:24px">${p.states.map(s =>
        '<button data-pat-state="' + s + '"' + (s === cur ? ' class="active"' : '') + '>' + s + '</button>').join('')}</div>
      ${publishedUses.length ? `<h3>Built from</h3>
      <div class="uses">${publishedUses.map(u =>
        '<span class="use-link" data-go="#/c/' + u + '"><i class="ti ti-components"></i>' + esc(COMPONENTS[u].title) + '<i class="ti ti-chevron-right" style="margin-left:auto;color:var(--gray-400)"></i></span>').join('')}</div>` : ''}
      ${guidanceHtml('Pattern guidance', '<p class="guidance-note">' + esc(p.desc) + '</p>')}
    </div>
  </div>`;
  return html;
}

function renderSandboxRoute(){
  let html = pageHeader({ crumbs:['Sandbox','Playground'], title:'Playground', status:'beta', version:'0.9',
    updated:'08 Jun 2026', noResources:true,
    desc:'Pick a component, toggle its properties and states, and copy the exact Flutter call that produces what you see. What you ship is what you tested here.' });
  html += '<div id="sandboxRoot">' + renderSandboxPage() + '</div>';
  return html;
}

/* ---------- Flutter codegen ---------- */

function dartHex(hex){ return '0xFF' + hex.replace('#','').toUpperCase(); }
function dartColorTokenName(ramp, stop){
  const s = String(stop);
  return ramp + (s.match(/^\d/) ? s : s.charAt(0).toUpperCase() + s.slice(1));
}

function dartTokens(){
  let s = "import 'dart:ui' show FontFeature;\n";
  s += "import 'package:flutter/material.dart';\n\n";
  s += '/// GlobalDS tokens — generated by GlobalDS v' + DS.meta.version + '\n';
  s += '/// Source of truth: icici-global-ds/js/tokens.js\n';
  s += '/// Regenerate from the GlobalDS Portal Developers page; do not edit by hand.\n\n';
  s += 'class DsColors {\n  DsColors._();\n\n';
  for (const [ramp, def] of Object.entries(DS.color)) {
    s += '  // ' + def.label + '\n';
    for (const [stop, hex] of Object.entries(def.stops)) {
      s += '  static const Color ' + dartColorTokenName(ramp, stop) + ' = Color(' + dartHex(hex) + ');\n';
    }
    s += '\n';
  }
  s += '  // Hero gradient — login hero, account card, section covers\n';
  s += '  static const Gradient hero = LinearGradient(\n';
  s += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  s += '    colors: [Color(' + dartHex(DS.gradient.hero.stops[0]) + '), Color(' + dartHex(DS.gradient.hero.stops[1]) + ')],\n  );\n\n';
  s += '  // Primary button fill — base + 12% white gradient overlay\n';
  s += '  static const Color buttonPrimaryFillBase = primaryOrange100;\n';
  s += '  static const Gradient buttonPrimaryFill = LinearGradient(\n';
  s += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  s += '    colors: [Color(0x1FFFFFFF), Color(0x00FFFFFF)],\n  );\n\n';
  s += '  // Button stroke gradient — exact RIB white-to-transparent paint at 50% opacity\n';
  s += '  static const double buttonStrokeWidth = 1;\n';
  s += '  static const Gradient buttonStroke = LinearGradient(\n';
  s += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  s += '    colors: [Color(0x80FFFFFF), Color(0x00FFFFFF)],\n  );\n}\n\n';
  s += 'class DsSpacing {\n  DsSpacing._();\n\n';
  DS.space.forEach(t => { s += '  static const double ' + t.dart + ' = ' + t.px + '; // ' + t.use + '\n'; });
  s += '}\n\nclass DsRadius {\n  DsRadius._();\n\n';
  DS.radius.forEach(t => { s += '  static const double ' + t.dart + ' = ' + t.px + '; // ' + t.use + '\n'; });
  s += '}\n\nclass DsText {\n  DsText._();\n\n';
  s += "  static const String fontFamily = '" + DS.typeface.family + "';\n\n";
  DS.type.forEach(t => {
    s += '  static const TextStyle ' + t.token + ' = TextStyle(\n';
    s += '    fontFamily: fontFamily,\n    fontSize: ' + t.size + ',\n    height: ' + (t.height / t.size).toFixed(2) + ',\n';
    s += '    fontWeight: FontWeight.w' + t.weight + ',\n';
    s += '    fontFeatures: [FontFeature.tabularFigures()],\n';
    s += '  );\n\n';
  });
  s += '}\n';
  return s;
}

function dartTheme(){
  return `import 'package:flutter/material.dart';
import 'ds_tokens.dart';

/// GlobalDS ThemeData — generated by GlobalDS v` + DS.meta.version + `
/// Wire it up once: MaterialApp(theme: DsTheme.light)
class DsTheme {
  DsTheme._();

  static ThemeData get light {
    const scheme = ColorScheme.light(
      primary: DsColors.primaryOrange100,
      onPrimary: DsColors.neutralGrey150,
      secondary: DsColors.primaryMaroon100,
      onSecondary: Colors.white,
      error: DsColors.error100,
      onError: Colors.white,
      surface: Colors.white,
      onSurface: DsColors.neutralGrey150,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: DsColors.surfaceCoolGrey110,
      fontFamily: DsText.fontFamily,
      textTheme: const TextTheme(
        displayLarge: DsText.displayLarge,
        displayMedium: DsText.displayMedium,
        displaySmall: DsText.displaySmall,
        headlineLarge: DsText.headingLargeBold,
        headlineMedium: DsText.headingLargeSemibold,
        headlineSmall: DsText.headingMediumSemibold,
        titleLarge: DsText.headingMediumSemibold,
        titleMedium: DsText.headingSmallSemibold,
        titleSmall: DsText.headingSmallRegular,
        bodyLarge: DsText.bodyLargeRegular,
        bodyMedium: DsText.bodyMediumRegular,
        bodySmall: DsText.bodySmallRegular,
        labelLarge: DsText.buttonLarge,
        labelMedium: DsText.labelSemibold,
        labelSmall: DsText.captionSemibold,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: DsColors.buttonPrimaryFillBase,
          foregroundColor: DsColors.neutralGrey150,
          disabledBackgroundColor: DsColors.neutralGrey60,
          disabledForegroundColor: DsColors.neutralGrey90,
          minimumSize: const Size(120, 36),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(DsRadius.md),
          ),
          textStyle: DsText.buttonSmall,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: DsColors.neutralGrey130,
          side: const BorderSide(color: DsColors.neutralGrey80),
          minimumSize: const Size(120, 36),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(DsRadius.md),
          ),
          textStyle: DsText.buttonSmall,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: DsSpacing.lg,
          vertical: DsSpacing.md,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.neutralGrey80),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.neutralGrey80),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.primaryOrange100, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
        labelStyle: DsText.inputMediumRegular,
        hintStyle: DsText.inputMediumRegular.copyWith(color: DsColors.neutralGrey90),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white,
        foregroundColor: DsColors.neutralGrey150,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: DsText.headingMediumSemibold,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Colors.white,
        selectedItemColor: DsColors.primaryOrange110,
        unselectedItemColor: DsColors.neutralGrey90,
        type: BottomNavigationBarType.fixed,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: Colors.white,
        selectedColor: DsColors.primaryOrange80,
        side: const BorderSide(color: DsColors.neutralGrey80),
        labelStyle: DsText.labelSemibold,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(DsRadius.full),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: DsColors.neutralGrey70,
        thickness: 1,
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: DsColors.neutralGrey150,
        contentTextStyle: DsText.bodyMediumRegular.copyWith(color: Colors.white),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
        ),
      ),
    );
  }
}

/// Use this decoration for custom DsButton implementations that need the
/// exact primary default anatomy from Figma.
class DsButtonDecorations {
  DsButtonDecorations._();

  static final ShapeDecoration primaryStrokeShell = ShapeDecoration(
    gradient: DsColors.buttonStroke,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(DsRadius.md),
    ),
  );

  static final ShapeDecoration primaryFillBase = ShapeDecoration(
    color: DsColors.buttonPrimaryFillBase,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(DsRadius.md - DsColors.buttonStrokeWidth),
    ),
  );

  static final ShapeDecoration primaryFillOverlay = ShapeDecoration(
    gradient: DsColors.buttonPrimaryFill,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(DsRadius.md - DsColors.buttonStrokeWidth),
    ),
  );
}
`;
}

function tokensJson(){
  const colors = {};
  for (const [ramp, def] of Object.entries(DS.color)) colors[ramp] = def.stops;
  return JSON.stringify({
    meta: DS.meta,
    platforms: DS.platforms,
    sourceSystems: DS.sourceSystems,
    deferredSystems: DS.deferredSystems,
    colors: colors,
    semanticColors: DS.semanticColor,
    gradient: DS.gradient.hero,
    gradients: DS.gradient,
    alpha: DS.alpha,
    typeface: DS.typeface,
    typography: DS.type,
    spacing: DS.space.map(s => ({ token: s.token, px: s.px })),
    radius: DS.radius.map(r => ({ token: r.token, px: r.px })),
    effects: DS.effects
  }, null, 2);
}

function renderFlutter(){
  let html = pageHeader({ crumbs:['Developers','Flutter theme & tokens'], title:'Flutter theme & tokens',
    status:'stable', version:DS.meta.version, updated:DS.meta.updated, noResources:true,
    desc:'Everything on this page is generated live from the same tokens that render this app — download the files, drop them into lib/theme/, and the Flutter build matches the design system by construction.' });
  html += sectionHtml({ title: '1 · Dependencies',
    html: codeblock(`dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1
  flutter_tabler_icons: ^1.10.0`, 'pubspec.yaml'),
    guidance:{ label:'Dependency guidance', html:'<p class="guidance-note">Mulish ships via google_fonts, or self-host the font files for air-gapped builds. Tabler icons match the web icon set 1:1.</p>' } });
  html += sectionHtml({ title: '2 · Tokens — ds_tokens.dart',
    html: codeblock(dartTokens(), 'dart', { file: 'ds_tokens.dart' }),
    guidance:{ label:'Token pipeline', html:'<p class="guidance-note">Colors, spacing, radius and the full TextStyle scale are generated as compile-time constants from tokens.js.</p>' } });
  html += sectionHtml({ title: '3 · Theme — ds_theme.dart',
    html: codeblock(dartTheme(), 'dart', { file: 'ds_theme.dart' }),
    guidance:{ label:'Theme guidance', html:'<p class="guidance-note">A complete Material 3 ThemeData wired to the tokens: buttons, inputs, app bar, bottom nav, chips and snackbars.</p>' } });
  html += sectionHtml({ title: '4 · Wire it up',
    html: codeblock(`import 'theme/ds_theme.dart';

void main() => runApp(const RibApp());

class RibApp extends StatelessWidget {
  const RibApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ICICI Bank — Internet Banking',
      theme: DsTheme.light,
      home: const LoginScreen(),
    );
  }
}`, 'main.dart') });
  html += sectionHtml({ title: 'FlutterFlow & design tools',
    html: `<div class="canvas"><button class="ds-btn secondary md" data-dl="ds_tokens.json"><i class="ti ti-download"></i> Download ds_tokens.json</button>
      <button class="ds-btn secondary md" data-dl="ds_tokens.dart"><i class="ti ti-download"></i> ds_tokens.dart</button>
      <button class="ds-btn secondary md" data-dl="ds_theme.dart"><i class="ti ti-download"></i> ds_theme.dart</button></div>`,
    guidance:{ label:'Export guidance', html:'<p class="guidance-note">Importing into FlutterFlow or syncing a token plugin? Use the raw JSON. For app builds, use the generated Dart files.</p>' } });
  html += guidanceHtml('End-to-end pipeline', '<p class="guidance-note"><code>tokens.js</code> in GlobalDS generates each native token package and keeps product widgets aligned to one shared source of truth.</p>');
  return html;
}

const EXPORT_TARGET_CONTENT = {
  'kotlin-react': {
    title: 'Kotlin · ReactJS',
    icon: 'ti-brand-kotlin',
    description: 'Framework-neutral Kotlin tokens plus a semantic theme bridge for Kotlin/JS React applications.',
    installLabel: 'Gradle setup',
    installLanguage: 'build.gradle.kts',
    install: `dependencies {
    jsMainImplementation(kotlinWrappers.react)
    jsMainImplementation(kotlinWrappers.reactDom)
    jsMainImplementation(kotlinWrappers.emotion.react)
}`,
    usageLanguage: 'GlobalDSButton.kt',
    usage: `import emotion.react.css
import react.FC
import react.Props
import react.dom.html.ReactHTML.button
import web.cssom.Color

val GlobalDSButton = FC<Props> {
    button {
        css {
            color = Color(GlobalDSTheme.light.onPrimary)
            backgroundColor = Color(GlobalDSTheme.light.primary)
        }
        +"Continue"
    }
}`
  },
  flutter: {
    title: 'Flutter',
    icon: 'ti-brand-flutter',
    description: 'Compile-time Dart tokens and a Material 3 ThemeData projection for Flutter applications.',
    installLabel: 'Package setup',
    installLanguage: 'pubspec.yaml',
    install: `dependencies:
  flutter:
    sdk: flutter`,
    usageLanguage: 'main.dart',
    usage: `import 'theme/ds_theme.dart';

MaterialApp(
  theme: DsTheme.light,
  home: const LoginScreen(),
)`
  },
  swiftui: {
    title: 'SwiftUI',
    icon: 'ti-brand-swift',
    description: 'Native SwiftUI colours, metrics, typography and an EnvironmentValues theme projection.',
    installLabel: 'Project setup',
    installLanguage: 'Xcode',
    install: `Add GlobalDSTokens.swift and GlobalDSTheme.swift
to the application target. Package the Mulish font faces
and register them in the target's Info.plist.`,
    usageLanguage: 'GlobalDSButton.swift',
    usage: `import SwiftUI

struct GlobalDSButton: View {
    @Environment(\\.globalDSTheme) private var theme

    var body: some View {
        Text("Continue")
            .font(GlobalDSTypography.buttonLarge.font)
            .foregroundStyle(theme.onPrimary)
            .padding(GlobalDSSpacing.spaceLg)
            .background(theme.primary)
            .clipShape(
                RoundedRectangle(cornerRadius: GlobalDSRadius.radiusMd)
            )
    }
}`
  }
};

function renderExportFile(filename, language){
  const output = GlobalDSExports.generate(filename);
  return `<details class="export-file">
    <summary>
      <span class="export-file-name"><i class="ti ti-file-code"></i>${esc(filename)}</span>
      <span class="export-file-action">Preview <i class="ti ti-chevron-down"></i></span>
    </summary>
    ${codeblock(output, language, { file: filename })}
  </details>`;
}

function renderDevelopers(){
  let html = pageHeader({
    crumbs:['Developers','Platform exports'],
    title:'Platform exports',
    status:'stable',
    version:DS.meta.version,
    updated:DS.meta.updated,
    noResources:true,
    desc:'Generate Kotlin/React, Flutter and SwiftUI token APIs from the same GlobalDS source. Token identity stays stable while each output follows its platform conventions.'
  });

  html += `<section class="section export-overview" aria-labelledby="export-targets-title">
    <div class="section-heading-row">
      <div>
        <h2 class="section-title" id="export-targets-title">Three native targets</h2>
        <p class="section-note">Choose the delivery stack. Every file below is produced live from <code>js/tokens.js</code>.</p>
      </div>
      <button class="ds-btn secondary md" data-dl="ds_tokens.json"><i class="ti ti-download"></i> Shared JSON</button>
    </div>
    <div class="export-target-grid">
      ${GlobalDSExports.targets.map(target => {
        const content = EXPORT_TARGET_CONTENT[target.id];
        return `<article class="export-target-card">
          <div class="export-target-icon"><i class="ti ${esc(content.icon)}"></i></div>
          <div>
            <span class="export-target-language">${esc(target.language)}</span>
            <h3>${esc(content.title)}</h3>
            <p>${esc(content.description)}</p>
          </div>
          <ul aria-label="${esc(content.title)} export files">
            ${target.files.map(filename => '<li>' + esc(filename) + '</li>').join('')}
          </ul>
        </article>`;
      }).join('')}
    </div>
  </section>`;

  for (const target of GlobalDSExports.targets) {
    const content = EXPORT_TARGET_CONTENT[target.id];
    html += `<section class="section export-target-section" id="export-${esc(target.id)}">
      <div class="export-target-heading">
        <div class="export-target-icon"><i class="ti ${esc(content.icon)}"></i></div>
        <div>
          <span class="export-target-language">${esc(target.language)} export</span>
          <h2 class="section-title">${esc(content.title)}</h2>
          <p class="section-note">${esc(content.description)}</p>
        </div>
      </div>
      <div class="export-setup-grid">
        <div>
          <h3>${esc(content.installLabel)}</h3>
          ${codeblock(content.install, content.installLanguage)}
        </div>
        <div>
          <h3>Use the generated theme</h3>
          ${codeblock(content.usage, content.usageLanguage)}
        </div>
      </div>
      <div class="export-file-list">
        ${target.files.map(filename => renderExportFile(filename, target.language.toLowerCase())).join('')}
      </div>
    </section>`;
  }

  html += sectionHtml({
    title:'Platform-neutral source',
    note:'Use JSON for token pipelines, design-tool plugins and validation across platforms.',
    html:codeblock(GlobalDSExports.generate('ds_tokens.json'), 'json', { file:'ds_tokens.json' }),
    guidance:{
      label:'Source-of-truth rule',
      html:'<p class="guidance-note">Audit exact RIB values in <code>js/rib-atoms.js</code>, map them through <code>js/tokens.js</code>, validate the generated outputs, then download the platform files. Generated Kotlin, Dart and Swift files should not be edited independently.</p>'
    }
  });

  return html;
}

/* ---------- router & shell ---------- */

const mainEl = document.getElementById('main');
const navEl = document.getElementById('nav');

function buildNav(filter){
  const f = (filter || '').toLowerCase();
  navEl.innerHTML = NAV.map(group => {
    const items = group.items.filter(i => !f || i.label.toLowerCase().includes(f));
    if (!items.length) return '';
    return '<div class="nav-sec">' + group.section + '</div>' + items.map(i =>
      '<a class="nav-item" href="' + i.route + '" data-route="' + i.route + '">' +
      (i.icon ? '<i class="ti ' + i.icon + '"></i>' : '') + i.label +
      (i.status === 'beta' ? '<span class="ds-badge info">beta</span>' : '') +
      '</a>').join('');
  }).join('');
  markActive();
}

function markActive(){
  const currentHash = location.hash || '#/home';
  const h = currentHash === '#/flutter' ? '#/developers' : currentHash;
  navEl.querySelectorAll('.nav-item').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-route') === h);
  });
  if (window.Motion) Motion.syncNav();
}

function route(){
  const h = location.hash || '#/home';
  const parts = h.replace('#/', '').split('/');
  let html = '';
  if (parts[0] === 'home' || parts[0] === '') html = renderHome();
  else if (parts[0] === 'f') {
    const map = { colors: renderColors, typography: renderTypography, spacing: renderSpacing, shape: renderShape, icons: renderIcons };
    html = (map[parts[1]] || renderColors)();
  }
  else if (parts[0] === 'c') html = renderComponent(parts[1]);
  else if (parts[0] === 'patterns') html = renderPatternsPage();
  else if (parts[0] === 'sandbox') {
    selectSandboxComponent(parts[1]);
    html = renderSandboxRoute();
  }
  else if (parts[0] === 'developers' || parts[0] === 'flutter') html = renderDevelopers();
  else html = renderHome();
  mainEl.innerHTML = '<div class="page">' + html + appFooter() + '</div>';
  mainEl.scrollTop = 0;
  window.scrollTo(0, 0);
  markActive();
  if (window.Motion) Motion.afterRender(mainEl);
}

/* ---------- global interactions ---------- */

document.addEventListener('click', e => {
  const copyBtn = e.target.closest('[data-copy]');
  if (copyBtn) {
    const block = copyBtn.closest('.codeblock');
    const pre = block && block.querySelector('pre');
    if (pre) copyText(pre.textContent, copyBtn);
    return;
  }
  const copyEl = e.target.closest('[data-copy-text]');
  if (copyEl) { copyText(copyEl.getAttribute('data-copy-text'), copyEl); return; }
  const dl = e.target.closest('[data-dl]');
  if (dl) {
    const filename = dl.getAttribute('data-dl');
    const mime = filename.endsWith('.json') ? 'application/json' : 'text/plain';
    downloadFile(filename, GlobalDSExports.generate(filename), mime);
    return;
  }
  const go = e.target.closest('[data-go]');
  if (go) { location.hash = go.getAttribute('data-go'); return; }
  const patPick = e.target.closest('[data-pat-pick]');
  if (patPick) {
    patCurrent = patPick.getAttribute('data-pat-pick');
    route();
    return;
  }
  const patSt = e.target.closest('[data-pat-state]');
  if (patSt) {
    patState[patCurrent] = patSt.getAttribute('data-pat-state');
    const phone = document.getElementById('patPhone');
    if (phone) phone.innerHTML = PATTERNS[patCurrent].render(patState[patCurrent]);
    document.querySelectorAll('#patStates button').forEach(b =>
      b.classList.toggle('active', b.getAttribute('data-pat-state') === patState[patCurrent]));
    return;
  }
});

document.getElementById('navSearch').addEventListener('input', e => buildNav(e.target.value));

GlobalDSSystemTabs.bind(document, {
  tabSelector:'[data-colour-tab]',
  panelSelector:'.colour-system-panel',
});
GlobalDSSystemTabs.bind(document, {
  tabSelector:'[data-typography-tab]',
  panelSelector:'.typography-system-panel',
});
bindSandbox(document);

window.addEventListener('hashchange', route);
buildNav();
route();
