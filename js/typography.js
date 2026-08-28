function renderTypography(){
  const sourcePreviewStyle = style => {
    const tracking = style.tracking.endsWith('%') ? `${parseFloat(style.tracking) / 100}em` : style.tracking;
    return [
      `font-size:${Math.min(style.size, 36)}px`,
      `line-height:${Math.min(style.height, 44)}px`,
      `font-weight:${style.weight}`,
      `letter-spacing:${tracking}`,
      `text-decoration:${style.decoration === 'Underline' ? 'underline' : 'none'}`,
      `text-transform:${style.textCase === 'Uppercase' ? 'uppercase' : 'none'}`,
    ].join(';');
  };
  const renderSourceRow = style => {
    const copyValue = style.resolved || style.name;
    return `<button class="typography-source-row" type="button" data-copy-text="${esc(copyValue)}" title="Copy ${esc(copyValue)}" aria-label="Copy ${esc(copyValue)}">
      <span class="typography-source-preview" style="${sourcePreviewStyle(style)}">Global money, made simple</span>
      <span class="typography-source-name"><strong>${esc(style.name)}</strong>${style.resolved !== style.name ? `<small>${esc(style.resolved)}</small>` : ''}${style.note ? `<em>${esc(style.note)}</em>` : ''}</span>
      <span class="typography-source-metric"><b>${style.size}/${style.height}</b><small>Size / line</small></span>
      <span class="typography-source-metric"><b>${esc(style.fontStyle)} · ${style.weight}</b><small>Style / weight</small></span>
      <span class="typography-source-metric"><b>${esc(style.tracking)}</b><small>${esc(style.decoration)} · ${esc(style.textCase)}</small></span>
      <span class="type-copy"><i class="ti ti-copy"></i></span>
    </button>`;
  };
  const renderSourcePanel = source => {
    const groups = [...new Set(source.styles.map(style => style.group))];
    return `<header class="colour-panel-intro typography-panel-intro">
      <span>Source audit · ${source.styles.length} applied styles</span>
      <h2>${esc(source.platform)} typography</h2>
      <p>${esc(source.description)}</p>
    </header>
    <section class="typography-source-variant" aria-labelledby="typography-source-${esc(source.id)}">
      <header class="typography-source-head">
        <div><span>${esc(source.sourceLabel)}</span><h3 id="typography-source-${esc(source.id)}">Mulish type inventory</h3></div>
        <p>${source.styles.length} source styles · ${Math.min(...source.styles.map(style => style.size))}–${Math.max(...source.styles.map(style => style.size))}px</p>
      </header>
      ${groups.map(group => {
        const styles = source.styles.filter(style => style.group === group);
        return `<section class="typography-source-section">
          <div class="typography-source-section-head"><h4>${esc(group)}</h4><span>${styles.length} style${styles.length === 1 ? '' : 's'}</span></div>
          <div class="typography-source-table">
            <div class="typography-source-table-head"><span>Preview</span><span>Source style</span><span>Scale</span><span>Weight</span><span>Details</span><span></span></div>
            ${styles.map(renderSourceRow).join('')}
          </div>
        </section>`;
      }).join('')}
    </section>`;
  };
  const groups = [...new Set(DS.type.map(t => t.group || 'Type scale'))];
  let html = pageHeader({ crumbs:['Foundations','Typography'], title:'Typography', status:'stable', version:'1.1',
    updated:DS.meta.updated,
    desc:'The canonical GlobalDS type contract now preserves all 36 RIB text styles, including exact tracking, case transforms and link decoration.' });

  html += ribCoverageHtml();

  html += `<div class="colour-system-tabs typography-system-tabs" role="tablist" aria-label="Typography systems">
    <button class="colour-system-tab typography-system-tab" id="typography-tab-global" type="button" role="tab" aria-controls="typography-panel-global" aria-selected="true" tabindex="0" data-typography-tab="global">GlobalDS typography</button>
    <button class="colour-system-tab typography-system-tab" id="typography-tab-imobile" type="button" role="tab" aria-controls="typography-panel-imobile" aria-selected="false" tabindex="-1" data-typography-tab="imobile">iMobile typography</button>
    <button class="colour-system-tab typography-system-tab" id="typography-tab-rib" type="button" role="tab" aria-controls="typography-panel-rib" aria-selected="false" tabindex="-1" data-typography-tab="rib">RIB typography</button>
  </div>
  <div class="colour-system-panel typography-system-panel" id="typography-panel-global" role="tabpanel" aria-labelledby="typography-tab-global">
    <section class="type-specimen">
      <div class="type-specimen-head">
        <div><span class="type-specimen-label">Canonical typeface · ${DS.type.length} styles</span><h2>${esc(DS.typeface.family)}</h2></div>
        <code>DsText.fontFamily</code>
      </div>
      <div class="type-specimen-panel">
        <div class="type-specimen-big">Ag</div>
        <div class="type-glyphs">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%^&amp;*()</div>
      </div>
    </section>
    ${guidanceHtml('Typeface & numeric guidance', `
      <p class="guidance-note">${esc(DS.typeface.note)}</p>
      ${guidanceList([
        { term:'Canonical styles', token:'DsText.display1 … l2Active', text:'Use the 36 exact RIB styles as the component foundation contract.' },
        { term:'Compatibility aliases', token:'DS.typeAliases', text:'Existing theme names resolve to RIB styles without duplicating or altering the source metrics.' },
        { term:'Amounts and balances', token:'tabular figures', text:'Tabular figures keep balances, OTPs and animated numbers aligned without visual jitter.' }
      ])}
    `)}
    ${groups.map(group => {
      const rows = DS.type.filter(t => (t.group || 'Type scale') === group);
      return `<section class="section type-section">
        <h2 class="section-title">${esc(group)}</h2>
        <div class="type-table">
          <div class="type-table-head"><span>Preview</span><span>Token</span><span>Weight</span><span>Size</span><span>RIB details</span><span></span></div>
          ${rows.map(t => `<button class="type-row" type="button" data-copy-text="DsText.${esc(t.token)}" title="Copy DsText.${esc(t.token)}" aria-label="Copy DsText.${esc(t.token)}">
            <div class="type-sample" style="font-size:${t.size}px;line-height:${t.height}px;font-weight:${t.weight};letter-spacing:${t.trackingUnit === 'PERCENT' ? t.tracking / 100 + 'em' : t.tracking + 'px'};text-decoration:${t.decoration === 'UNDERLINE' ? 'underline' : 'none'};text-transform:${t.textCase === 'UPPER' ? 'uppercase' : 'none'}">Global money, made simple</div>
            <b class="type-token">${esc(t.token)}</b><span class="type-cell">w${t.weight}</span><span class="type-cell">${t.size}/${t.height}</span>
            <span class="type-use"><strong>${esc(t.name)}</strong><small>${t.tracking}${t.trackingUnit === 'PERCENT' ? '%' : 'px'} · ${esc(t.decoration.toLowerCase())} · ${esc(t.textCase.toLowerCase())}</small></span><span class="type-copy"><i class="ti ti-copy"></i></span>
          </button>`).join('')}
        </div>
      </section>`;
    }).join('')}
  </div>
  <div class="colour-system-panel typography-system-panel" id="typography-panel-imobile" role="tabpanel" aria-labelledby="typography-tab-imobile" hidden>
    ${renderSourcePanel(GlobalDSTypographySources.imobile)}
  </div>
  <div class="colour-system-panel typography-system-panel" id="typography-panel-rib" role="tabpanel" aria-labelledby="typography-tab-rib" hidden>
    ${renderSourcePanel(GlobalDSTypographySources.rib)}
  </div>`;
  return html;
}
