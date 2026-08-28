let iconCategory = 'all';
let iconSearchQuery = '';

const ICON_CATEGORIES = [
  { id:'all', label:'All', count:GlobalDSIconography.meta.total },
  { id:'general', label:'General', count:GlobalDSIconography.counts.general.total },
  { id:'product', label:'Product specific', count:GlobalDSIconography.counts.product.total },
  { id:'special', label:'Special', count:GlobalDSIconography.counts.special.total },
  { id:'sideNav', label:'Side navigation', count:GlobalDSIconography.counts.sideNav.total }
];

const ICON_CATEGORY_ORDER = ['general', 'product', 'special', 'sideNav'];

function iconCategoryLabel(category){
  return ({ general:'General', product:'Product specific', special:'Special', sideNav:'Side navigation' })[category] || category;
}

function filteredIcons(){
  const query = iconSearchQuery.trim().toLowerCase();
  return GlobalDSIconography.icons.filter(icon => {
    if (iconCategory !== 'all' && icon.category !== iconCategory) return false;
    if (!query) return true;
    return [icon.name, icon.sourceName, icon.id, icon.category, icon.variant]
      .some(value => String(value).toLowerCase().includes(query));
  });
}

function iconCardHtml(icon){
  return `<article class="icon-card" aria-label="${esc(icon.name)}, ${esc(icon.variant)} icon">
    <button class="icon-copy" type="button" data-copy-text="${esc(icon.asset)}" aria-label="Copy ${esc(icon.name)} ${esc(icon.variant)} asset path" title="Copy asset path">
      <span class="icon-copy-state" role="status" aria-live="polite"><i class="ti ti-copy" aria-hidden="true"></i></span>
    </button>
    <div class="icon-preview" aria-hidden="true">
      <img src="${esc(icon.asset)}" alt="" loading="lazy">
    </div>
    <span class="icon-card-name">${esc(icon.name)}</span>
  </article>`;
}

function iconGroupHtml(category, icons){
  const headingId = `icon-group-${category}`;
  return `<section class="icon-group" data-icon-group="${category}" aria-labelledby="${headingId}">
    <header class="icon-group-head">
      <h3 id="${headingId}">${esc(iconCategoryLabel(category))}</h3>
      <span>${icons.length} ${icons.length === 1 ? 'icon' : 'icons'}</span>
    </header>
    <div class="icon-catalog-grid">${icons.map(iconCardHtml).join('')}</div>
  </section>`;
}

function iconCatalogHtml(icons = filteredIcons()){
  if (!icons.length) {
    return '<div class="icon-empty" role="status"><i class="ti ti-search-off" aria-hidden="true"></i><h3>No icons found</h3><p>Try a different name or category.</p></div>';
  }
  if (iconCategory !== 'all') {
    return `<div class="icon-catalog-grid">${icons.map(iconCardHtml).join('')}</div>`;
  }
  return ICON_CATEGORY_ORDER.map(category => {
    const groupIcons = icons.filter(icon => icon.category === category);
    return groupIcons.length ? iconGroupHtml(category, groupIcons) : '';
  }).join('');
}

function updateIconCatalog(){
  const catalog = document.getElementById('iconCatalog');
  const count = document.getElementById('iconResultCount');
  if (!catalog || !count) return;
  const icons = filteredIcons();
  catalog.innerHTML = iconCatalogHtml(icons);
  count.textContent = `${icons.length} ${icons.length === 1 ? 'icon' : 'icons'}`;
  document.querySelectorAll('[data-icon-category]').forEach(button => {
    const active = button.getAttribute('data-icon-category') === iconCategory;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function renderIcons(){
  const count = filteredIcons().length;
  const sample = GlobalDSIconography.icons.find(icon => icon.id === '235:115');
  let html = pageHeader({ crumbs:['Foundations','Iconography'], title:'Iconography', status:'stable', version:'2.0',
    updated:'29 Aug 2026',
    desc:'A source-faithful RIB icon library for shared banking experiences, audited directly from Figma and committed as local assets.' });
  html += `<section class="icon-source-summary" aria-label="Iconography source summary">
    <div>
      <span>Canonical source · Atoms - RIB</span>
      <h2>283 exact Figma icons</h2>
      <p>General, product-specific, special and side-navigation artwork preserved by component ID, source name, variant and intrinsic size.</p>
      <a href="https://www.figma.com/design/KlcvhcZPwn1c9BXBY2k6rl/Atoms---RIB--Copy-?node-id=92-6201" target="_blank" rel="noreferrer">Open the Figma source <i class="ti ti-external-link" aria-hidden="true"></i></a>
    </div>
    <dl>
      <div><dt>144</dt><dd>General</dd></div>
      <div><dt>70</dt><dd>Product</dd></div>
      <div><dt>51</dt><dd>Special</dd></div>
      <div><dt>18</dt><dd>Side navigation</dd></div>
    </dl>
  </section>`;
  html += `<section class="section icon-library-section">
    <div class="icon-library-head">
      <div><h2 class="section-title">Library</h2><p class="section-note">Search by source name or Figma ID, then copy the exact repository asset path.</p></div>
      <span id="iconResultCount" aria-live="polite">${count} ${count === 1 ? 'icon' : 'icons'}</span>
    </div>
    <div class="icon-toolbar">
      <label class="icon-search" for="iconSearch"><i class="ti ti-search" aria-hidden="true"></i><input id="iconSearch" type="search" value="${esc(iconSearchQuery)}" placeholder="Search icon name or Figma ID" autocomplete="off" aria-label="Search iconography"></label>
      <div class="icon-filters" aria-label="Filter icons by category">
        ${ICON_CATEGORIES.map(category => `<button type="button" data-icon-category="${category.id}" aria-pressed="${category.id === iconCategory}" class="${category.id === iconCategory ? 'active' : ''}">${esc(category.label)} <span>${category.count}</span></button>`).join('')}
      </div>
    </div>
    <div class="icon-catalog" id="iconCatalog">${iconCatalogHtml()}</div>
    ${guidanceHtml('Usage and implementation guidance', `
      ${guidanceList([
        { term:'Use the source size', token:'16 / 20 / 22 / 24px', text:'Keep each icon on its audited frame. Do not stretch a 16px side-navigation glyph into a 24px general icon.' },
        { term:'Match the variant', token:'line / filled / special', text:'Use line for lower emphasis, filled for active or stronger emphasis, and special only in the product moments it was designed for.' },
        { term:'Preserve the source format', token:'251 SVG / 32 PNG', text:'SVG covers clean vector nodes. PNG preserves composite or raster-backed Figma nodes without inventing a traced vector.' },
        { term:'Name the action', token:'accessible name', text:'Decorative icons use empty alt text. Icon-only controls require an explicit accessible label that describes the action.' },
        { term:'Keep chrome separate', token:'portal UI only', text:'Tabler remains a documentation-shell dependency; it is not the GlobalDS product iconography source.' }
      ])}
      ${sample ? codeblock(`<span class="ds-icon-frame" style="width:${sample.width}px;height:${sample.height}px">
  <img src="${sample.asset}" alt="">
</span>`, 'html') : ''}
    `)}
  </section>`;
  return html;
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-icon-category]');
  if (!button) return;
  iconCategory = button.getAttribute('data-icon-category') || 'all';
  updateIconCatalog();
});

document.addEventListener('input', event => {
  if (event.target.id !== 'iconSearch') return;
  iconSearchQuery = event.target.value;
  updateIconCatalog();
});
