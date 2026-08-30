/* ============================================================
   ICICI Global DS — component registry
   Each entry drives: sidebar nav, doc page, props table,
   Flutter snippet. Sandbox definitions live in sandbox.js.
   ============================================================ */

const INPUT_FIELD_STATES = [
  { key: 'empty', className: 'empty', label: 'Empty', desc: 'Placeholder only, default border, no value.' },
  { key: 'active', className: 'active', label: 'Active', desc: 'Interactive state with subtle elevation, before text entry.' },
  { key: 'typing', className: 'typing', label: 'Typing', desc: 'Focused field with orange border, floated label and caret.' },
  { key: 'filled', className: 'filled', label: 'Filled', desc: 'Value entered at rest.' },
  { key: 'filledHover', className: 'filled-hover', label: 'Filled hover', desc: 'Value entered with neutral hover surface.' },
  { key: 'error', className: 'error', label: 'Error', desc: 'Validation failure with red border and error copy.' }
];

const INPUT_FIELD_VARIANTS = [
  { key: 'basic', title: 'Basic input field', label: 'Label', placeholder: 'User ID', value: 'Input' },
  { key: 'leading', title: 'Input leading icon', label: 'Label', placeholder: 'User ID', value: 'Input', leadingIcon: 'ti-info-circle' },
  { key: 'trailingText', title: 'Input with trailing text', label: 'Label', placeholder: 'User ID', value: 'Input', suffixText: 'Text' },
  { key: 'trailingIcon', title: 'Input with trailing icon', label: 'Label', placeholder: 'User ID', value: 'Input', trailingIcon: 'ti-keyboard' },
  { key: 'eye', title: 'Input with eye icon', label: 'Label', placeholder: 'User ID', value: 'Input', trailingIcon: 'ti-eye' },
  { key: 'helper', title: 'With helper text', label: 'User ID', placeholder: 'Place holder', value: 'Input', helper: 'Please enter Customer Identification (CIF) Number' },
  { key: 'errorMessage', title: 'Error', label: 'Label', placeholder: 'User ID', value: 'Input', helper: 'Please enter Customer Identification (CIF) Number', errorFirst: true },
  { key: 'mobile', title: 'Mobile input', label: 'Mobile number', placeholder: 'Mobile number', value: '9292929292', kind: 'phone' },
  { key: 'amount', title: 'Amount input', label: 'Amount', placeholder: '0.00', value: '1,250.00', kind: 'amount', suffixText: 'CAD' },
  { key: 'otp', title: 'OTP input', label: 'Enter OTP', placeholder: 'Enter OTP', value: '129899', kind: 'otp' }
];

function renderInputStateModel(){
  return `<div class="input-state-model">
    ${INPUT_FIELD_STATES.map(state => `<article><b>${state.label}</b><span>${state.desc}</span></article>`).join('')}
  </div>`;
}

function inputDisplayValue(variant, state){
  if(state.key === 'empty' || state.key === 'active') return variant.placeholder;
  if(variant.kind === 'amount' && state.key === 'typing') return '1,250';
  if(variant.kind === 'phone' && state.key === 'typing') return '';
  if(variant.kind === 'otp' && state.key === 'typing') return '';
  return variant.value || 'Input';
}

function inputHelperText(variant, state){
  if(variant.kind === 'otp' && state.key === 'error') return 'OTP entered is wrong, please retry';
  if(variant.kind === 'phone' && state.key === 'error') return 'Please enter a valid mobile number';
  if(variant.kind === 'amount' && state.key === 'error') return 'Please enter a valid amount';
  if(state.key === 'error' || variant.key === 'helper' || variant.key === 'errorMessage') {
    return variant.helper || 'Please enter a valid value';
  }
  return '';
}

function inputFieldContent(variant, state){
  const display = inputDisplayValue(variant, state);
  const muted = state.key === 'empty' || state.key === 'active';
  const value = `<span class="ifield-value${muted ? ' is-placeholder' : ''}">${display}</span>${state.key === 'typing' ? '<span class="ifield-caret"></span>' : ''}`;
  if(variant.kind === 'phone') {
    return `<span class="ifield-code">+91 <i class="ti ti-chevron-down"></i></span>${value}`;
  }
  if(variant.kind === 'amount') {
    return `<span class="ifield-prefix">CA$</span>${value}<span class="ifield-affix">CAD</span>`;
  }
  if(variant.kind === 'otp') {
    const trailing = state.key === 'error'
      ? '<button class="ifield-action">Resend OTP</button>'
      : '<span class="ifield-affix">Resend OTP in 00:20</span>';
    return `${value}${trailing}`;
  }
  return `${variant.leadingIcon ? `<i class="ti ${variant.leadingIcon} ifield-leading"></i>` : ''}${value}${variant.suffixText ? `<span class="ifield-affix">${variant.suffixText}</span>` : ''}${variant.trailingIcon ? `<i class="ti ${variant.trailingIcon} ifield-trailing"></i>` : ''}`;
}

function renderInputExample(variant, state){
  const hasLabel = state.key === 'typing' || state.key === 'filled' || state.key === 'filledHover' || state.key === 'error' || variant.key === 'helper' || variant.key === 'errorMessage';
  const helper = inputHelperText(variant, state);
  const isError = state.key === 'error';
  const classes = [
    'ifield-shell',
    `is-${state.className}`,
    variant.kind ? `is-${variant.kind}` : '',
    variant.leadingIcon ? 'has-leading' : '',
    variant.trailingIcon || variant.suffixText ? 'has-trailing' : ''
  ].filter(Boolean).join(' ');
  return `<div class="ifield-example${hasLabel ? ' has-label' : ''}${isError ? ' has-error' : ''}">
    ${hasLabel ? `<span class="ifield-floating">${variant.label}</span>` : ''}
    <div class="${classes}">${inputFieldContent(variant, state)}</div>
    ${helper ? `<span class="ifield-help${isError ? ' is-error' : ''}"><i class="ti ${isError ? 'ti-alert-circle' : 'ti-info-circle'}"></i>${helper}</span>` : ''}
  </div>`;
}

function renderInputVariantCard(variant){
  return `<article class="input-variant-card">
    <header><span>Variant</span><h3>${variant.title}</h3></header>
    <div class="input-state-stack">
      ${INPUT_FIELD_STATES.map(state => `<div class="input-state-row"><span>${state.label}</span>${renderInputExample(variant, state)}</div>`).join('')}
    </div>
  </article>`;
}

function renderInputVariantGrid(){
  return `<div class="input-variant-grid">${INPUT_FIELD_VARIANTS.map(renderInputVariantCard).join('')}</div>`;
}

const BUTTON_TYPES = [
  { key: 'primary', title: 'Primary', note: 'Orange 100 fill; Orange 110 on hover.' },
  { key: 'outline', title: 'Outline', note: 'White surface with an Orange 100 border.' },
  { key: 'secondary', title: 'Secondary', sizes: ['sm'], note: 'Compact text action; the source defines Small only.' },
  { key: 'pastel', title: 'Pastel', note: 'Amber 90 surface with Orange 100 content.' },
  { key: 'white', title: 'White', note: 'White utility action with a Cool Grey 110 border.' },
  { key: 'destructive-outline', title: 'Destructive - Outlined', note: 'White surface with an Error 100 border.' },
  { key: 'destructive-filled', title: 'Destructive - Filled', note: 'Error 100 fill for destructive confirmation.' }
];

const BUTTON_SIZES = [
  { key: 'lg', label: 'Large', figma: '44px high' },
  { key: 'sm', label: 'Small', figma: '36px high' },
  { key: 'xs', label: 'X-Small', figma: '28px high' }
];

const BUTTON_STATES = [
  { key: 'default', label: 'Default' },
  { key: 'hover', label: 'Hover', className: 'is-hover' },
  { key: 'focus', label: 'Focus', className: 'is-focus' },
  { key: 'disabled', label: 'Disabled', disabled: true }
];

const BUTTON_ICONS = [
  { key: 'none', label: 'No icon' },
  { key: 'left', label: 'Left' },
  { key: 'right', label: 'Right' }
];

const RIB_BUTTON_ICON_ASSET = '../assets/icons/general/line/add--line--519-38.svg';

function renderRibButton(options = {}){
  const type = BUTTON_TYPES.find(item => item.key === options.variant) || BUTTON_TYPES[0];
  const size = BUTTON_SIZES.find(item => item.key === options.size && (!type.sizes || type.sizes.includes(item.key)))
    || BUTTON_SIZES.find(item => !type.sizes || type.sizes.includes(item.key));
  const state = BUTTON_STATES.find(item => item.key === options.state) || BUTTON_STATES[0];
  const icon = BUTTON_ICONS.find(item => item.key === options.icon) || BUTTON_ICONS[0];
  const label = String(options.label || 'Button');
  const classes = ['ds-btn', type.key, size.key, state.className, icon.key !== 'none' ? `icon-${icon.key}` : '', options.expanded ? 'block' : ''].filter(Boolean).join(' ');
  const iconHtml = `<span class="ds-btn__icon" style="--rib-button-icon:url(${RIB_BUTTON_ICON_ASSET})" aria-hidden="true"></span>`;

  return `<button type="button" class="${classes}"${state.disabled ? ' disabled' : ''}>${icon.key === 'left' ? iconHtml : ''}<span class="ds-btn__label">${esc(label)}</span>${icon.key === 'right' ? iconHtml : ''}</button>`;
}

function renderButtonMatrix(){
  return `<div class="button-matrix">
    <div class="button-matrix-head">
      <span>Type / Size / Icon</span>
      ${BUTTON_STATES.map(state => `<span>${state.label}</span>`).join('')}
    </div>
    ${BUTTON_TYPES.map(type => {
      const sizes = BUTTON_SIZES.filter(size => !type.sizes || type.sizes.includes(size.key));
      return `<section class="button-type-section">
        <header>
          <h3>${type.title}</h3>
          <p>${type.note}</p>
        </header>
        ${sizes.map(size => `<div class="button-size-block">
          <div class="button-size-label"><b>${size.label}</b><span>${size.figma}</span></div>
          <div class="button-size-rows">
            ${BUTTON_ICONS.map(icon => `<div class="button-matrix-row">
              <span class="button-icon-label">${icon.label}</span>
              ${BUTTON_STATES.map(state => `<div class="button-cell">${renderRibButton({ variant:type.key, size:size.key, state:state.key, icon:icon.key })}</div>`).join('')}
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </section>`;
    }).join('')}
  </div>`;
}

const RIB_ACCORDION_VARIANTS = [
  { key:'plain', label:'Default', width:276 },
  { key:'no-container', label:'No container', width:276 },
  { key:'coloured-background', label:'Coloured background', width:386 },
  { key:'standard-container', label:'Container standard', width:276 },
  { key:'explanation-container', label:'Container explanation', width:516 }
];

function ribAccordionLeading(variant){
  if(variant === 'plain') return '';
  if(variant === 'standard-container') {
    return `<span class="rib-accordion__icon-plate" aria-hidden="true">
      <img src="assets/rib/accordion/shield.svg" alt="" width="13" height="14">
    </span>`;
  }
  const asset = variant === 'coloured-background'
    ? 'assets/rib/accordion/briefcase.svg'
    : variant === 'explanation-container'
      ? 'assets/rib/accordion/shield-explanation.svg'
      : 'assets/rib/accordion/shield.svg';
  return `<span class="rib-accordion__leading" aria-hidden="true">
    <img src="${asset}" alt="">
  </span>`;
}

function ribAccordionId(value){
  return String(value).replace(/[^a-zA-Z0-9_-]+/g, '-');
}

function renderRibAccordion(options = {}){
  const variant = RIB_ACCORDION_VARIANTS.some(item => item.key === options.variant)
    ? options.variant
    : 'plain';
  const expanded = Boolean(options.expanded);
  const title = options.title || 'Subject line';
  const body = options.body || 'Dummy text for long sentences here';
  const subtitle = options.subtitle || 'Long subline here';
  const uid = ribAccordionId('rib-accordion-' + (options.id || `${variant}-${expanded ? 'expanded' : 'collapsed'}`));
  const spec = RIB_ACCORDION_VARIANTS.find(item => item.key === variant);
  const interactive = options.interactive !== false;
  const triggerTag = interactive ? 'button' : 'div';
  const triggerAttributes = interactive
    ? ` type="button" aria-expanded="${expanded}" aria-controls="${uid}-panel" data-rib-accordion-toggle`
    : '';
  const indexAttribute = Number.isInteger(options.index)
    ? ` data-rib-accordion-index="${options.index}"`
    : '';
  const titleHtml = variant === 'explanation-container'
    ? `<span class="rib-accordion__title-stack"><span class="rib-accordion__title">${esc(title)}</span><span class="rib-accordion__subtitle">${esc(subtitle)}</span></span>`
    : `<span class="rib-accordion__title">${esc(title)}</span>`;

  return `<div class="rib-accordion rib-accordion--${variant}${expanded ? ' is-expanded' : ''}" style="--rib-accordion-width:${spec.width}px"${indexAttribute}>
    <${triggerTag} class="rib-accordion__trigger" id="${uid}-trigger"${triggerAttributes}>
      ${ribAccordionLeading(variant)}
      ${titleHtml}
      <img class="rib-accordion__chevron" src="assets/rib/accordion/chevron-${expanded ? 'up' : 'down'}.svg" alt="" width="20" height="20" aria-hidden="true">
    </${triggerTag}>
    ${expanded ? `<div class="rib-accordion__body" id="${uid}-panel" role="region" aria-labelledby="${uid}-trigger">${esc(body)}</div>` : ''}
    ${variant === 'plain' || variant === 'no-container' ? '<span class="rib-accordion__divider" aria-hidden="true"></span>' : ''}
  </div>`;
}

function renderRibAccordionShowcase(){
  return `<div class="rib-accordion-source"><span>RIB only</span><div class="rib-accordion-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=3981-10048" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-accordion-try" href="#/sandbox/accordion"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-accordion-showcase">
    ${RIB_ACCORDION_VARIANTS.map((variant, index) => `<article class="rib-accordion-showcase__card is-variant-${variant.key}${variant.width > 386 ? ' is-wide' : ''}">
      <header class="rib-accordion-showcase__card-head"><div><span>${index === 0 ? 'Standard' : index < 3 ? 'Icons' : 'Container'}</span><h3>${variant.label}</h3></div><code>${variant.width}px Figma · 118% preview</code></header>
      <div class="rib-accordion-showcase__state"><b>Collapsed</b><div class="rib-accordion-showcase__stage"><div class="rib-accordion-preview-scale">${renderRibAccordion({ variant:variant.key, expanded:false, interactive:false, id:`matrix-${variant.key}-collapsed` })}</div></div></div>
      <div class="rib-accordion-showcase__state"><b>Expanded</b><div class="rib-accordion-showcase__stage"><div class="rib-accordion-preview-scale">${renderRibAccordion({ variant:variant.key, expanded:true, interactive:false, id:`matrix-${variant.key}-expanded` })}</div></div></div>
    </article>`).join('')}
  </div>`;
}

const RIB_ACTIVITY_STATES = [
  { key:'inactive', label:'Inactive', icon:'inactive.svg', status:'' },
  { key:'completed', label:'Completed', icon:'completed.svg', status:'Completed' },
  { key:'warning', label:'Warning', icon:'warning.svg', status:'Pending' },
  { key:'failed', label:'Failed', icon:'failed.svg', status:'Failed' }
];

const RIB_ACTIVITY_VARIANTS = [
  { key:'single', label:'With single line cards', rightIcon:false },
  { key:'double', label:'With double line cards', rightIcon:false },
  { key:'double', label:'Double line + trailing icon', rightIcon:true }
];

const RIB_ACTIVITY_CURRENT_STATE = Object.freeze({
  key:'current', label:'Current', icon:'calendar-current.svg', status:''
});

function ribActivityState(value){
  if(value === RIB_ACTIVITY_CURRENT_STATE.key) return RIB_ACTIVITY_CURRENT_STATE;
  return RIB_ACTIVITY_STATES.find(state => state.key === value) || RIB_ACTIVITY_STATES[0];
}

function renderRibActivityCard(item = {}, options = {}, index = 0){
  const type = options.type === 'double' ? 'double' : 'single';
  const stateSpec = ribActivityState(item.state);
  const label = item.label || 'Label text';
  const subLabel = item.subLabel || 'Sub label';
  const value = item.value || '₹ 1,000';
  const status = item.status || stateSpec.status;
  const rightIcon = Boolean(options.rightIcon);
  const interactive = Boolean(options.interactive && rightIcon);
  const showTrailing = options.showTrailing !== false;
  const cardTag = interactive ? 'button' : 'div';
  const cardAttributes = interactive
    ? ` type="button" data-rib-activity-index="${index}"`
    : '';
  const typeClass = type === 'double' ? 'is-double' : 'is-single';
  const labelStack = type === 'double'
    ? `<span class="rib-activity-card__text"><span class="rib-activity-card__label">${esc(label)}</span><span class="rib-activity-card__sub-label">${esc(subLabel)}</span></span>`
    : `<span class="rib-activity-card__label">${esc(label)}</span>`;
  const trailing = showTrailing
    ? type === 'double'
      ? `<span class="rib-activity-card__value-stack"><span class="rib-activity-card__value">${esc(value)}</span>${status ? `<span class="rib-activity-card__status">${esc(status)}</span>` : ''}</span>`
      : `<span class="rib-activity-card__trailing-label">${esc(subLabel)}</span>`
    : '';
  const trailingGroup = trailing || rightIcon
    ? `<span class="rib-activity-card__trailing">
        ${trailing}
        ${rightIcon ? '<img class="rib-activity-card__chevron" src="assets/rib/activity-timeline/chevron-right.svg" alt="" width="20" height="20" aria-hidden="true">' : ''}
      </span>`
    : '';

  return `<${cardTag} class="rib-activity-card ${typeClass} is-${stateSpec.key}"${cardAttributes}>
    <span class="rib-activity-card__state-label">${esc(stateSpec.label)}</span>
    <span class="rib-activity-card__leading">
      <img src="assets/rib/activity-timeline/${stateSpec.icon}" alt="" width="16" height="16" aria-hidden="true">
      ${labelStack}
    </span>
    ${trailingGroup}
  </${cardTag}>`;
}

function renderRibActivityTimeline(options = {}){
  const type = options.type === 'double' ? 'double' : 'single';
  const items = Array.isArray(options.items) && options.items.length
    ? options.items
    : RIB_ACTIVITY_STATES.map(state => ({ state:state.key }));
  const typeClass = type === 'double' ? 'is-double' : 'is-single';
  const itemHtml = items.map((item, index) => {
    const stateSpec = ribActivityState(item.state);
    const label = item.label || 'Label text';

    return `<li class="rib-activity-timeline__item" aria-label="${esc(stateSpec.label)}: ${esc(label)}">
      ${renderRibActivityCard(item, options, index)}
    </li>`;
  }).join('');

  return `<ol class="rib-activity-timeline ${typeClass}" aria-label="${esc(options.ariaLabel || 'Activity timeline')}">
    <img class="rib-activity-timeline__connector" src="assets/rib/activity-timeline/connector.svg" alt="" aria-hidden="true">
    ${itemHtml}
  </ol>`;
}

function renderRibActivityCalendar(options = {}){
  const sourceItems = Array.isArray(options.items) ? options.items : [];
  const items = options.showYearDivider === false
    ? sourceItems.filter(item => !item.divider)
    : sourceItems;
  const currentState = options.currentState === 'inactive' ? 'inactive' : 'current';
  const itemHtml = items.map((item, index) => {
    const dateLabel = item.dateLabel || '';
    const state = item.state === 'current' ? currentState : item.state;
    const markerClass = state === 'current' ? ' is-current' : '';
    if(item.divider){
      return `<li class="rib-activity-calendar__row is-divider" aria-label="${esc(dateLabel)}">
        <span class="rib-activity-calendar__marker${markerClass}"><span class="rib-activity-calendar__date">${esc(dateLabel)}</span><span class="rib-activity-calendar__dot" aria-hidden="true"></span></span>
        <span class="rib-activity-calendar__divider" aria-hidden="true"></span>
      </li>`;
    }
    const cardItem = { ...item, state };
    const stateSpec = ribActivityState(state);
    return `<li class="rib-activity-calendar__row" aria-label="${esc(dateLabel)}: ${esc(stateSpec.label)}: ${esc(item.label || 'Label text')}">
      <span class="rib-activity-calendar__marker${markerClass}"><span class="rib-activity-calendar__date">${esc(dateLabel)}</span><span class="rib-activity-calendar__dot" aria-hidden="true"></span></span>
      ${renderRibActivityCard(cardItem, { type:'double', showTrailing:false }, index)}
    </li>`;
  }).join('');

  return `<ol class="rib-activity-calendar" aria-label="${esc(options.ariaLabel || 'Calendar activity timeline')}" data-figma-node="4235:18074">
    <img class="rib-activity-calendar__connector" src="assets/rib/activity-timeline/calendar-connector.svg" alt="" aria-hidden="true">
    ${itemHtml}
  </ol>`;
}

function renderRibActivityTimelineShowcase(){
  return `<div class="rib-activity-source"><span>RIB only</span><div class="rib-activity-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=3981-10047" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-activity-try" href="#/sandbox/activity-timeline"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-activity-showcase">
    ${RIB_ACTIVITY_VARIANTS.map(variant => `<article class="rib-activity-showcase__card">
      <header><div><span>Activity timeline</span><h3>${variant.label}</h3></div><code>288px · ${variant.key === 'single' ? '40px' : '60px'} cards</code></header>
      <div class="rib-activity-showcase__stage">${renderRibActivityTimeline({ type:variant.key, rightIcon:variant.rightIcon })}</div>
    </article>`).join('')}
  </div>`;
}

const RIB_AVATAR_COLORS = [
  { key:'picture', label:'Picture' },
  { key:'orange', label:'Orange' },
  { key:'blue', label:'Blue' },
  { key:'gold', label:'Gold' },
  { key:'maroon', label:'Maroon' },
  { key:'multi', label:'Multi' }
];

const RIB_AVATAR_GROUP_PEOPLE = [
  { label:'Amar', color:'picture', imageUrl:'assets/rib/avatar/amar.jpeg' },
  { label:'Sunidhi', initials:'S', color:'gold' },
  { label:'Aditya', initials:'A', color:'maroon' },
  { label:'Preksha', initials:'P', color:'multi' },
  { label:'Udita', initials:'U', color:'orange' },
  { label:'Roshan', initials:'R', color:'blue' }
];

function renderRibAvatar(options = {}){
  const color = RIB_AVATAR_COLORS.some(item => item.key === options.color)
    ? options.color
    : 'picture';
  const label = String(options.label || 'Amar');
  const initials = String(options.initials || label.trim().charAt(0) || 'A').slice(0, 2).toUpperCase();
  const imageUrl = options.imageUrl || 'assets/rib/avatar/amar.jpeg';
  const bankLogo = Boolean(options.bankLogo);
  const visual = color === 'picture'
    ? `<img class="rib-avatar__image" src="${esc(imageUrl)}" alt="" width="40" height="40">`
    : `<span class="rib-avatar__initials" aria-hidden="true">${esc(initials)}</span>`;
  const bankBadge = bankLogo
    ? `<span class="rib-avatar__bank-badge">
        <img src="assets/rib/avatar/icici-bank-mark.svg" alt="" width="12" height="12" aria-hidden="true">
        <span class="rib-avatar__bank-name" aria-hidden="true">ICICI Bank</span>
      </span>`
    : '';
  const accessibleLabel = options.ariaLabel || `${label}${bankLogo ? ', ICICI Bank' : ''}`;

  return `<figure class="rib-avatar rib-avatar--${color}" role="img" aria-label="${esc(accessibleLabel)}">
    <span class="rib-avatar__visual">${visual}</span>
    <figcaption class="rib-avatar__label" aria-hidden="true">${esc(label)}</figcaption>
    ${bankBadge}
  </figure>`;
}

function renderRibAvatarGroup(options = {}){
  const people = Array.isArray(options.people) && options.people.length
    ? options.people
    : RIB_AVATAR_GROUP_PEOPLE;
  const headline = String(options.headline || 'Headline');
  const itemHtml = people.map(person => `<li class="rib-avatar-group__item">${renderRibAvatar(person)}</li>`).join('');

  return `<section class="rib-avatar-group" aria-label="${esc(options.ariaLabel || headline)}">
    <h3 class="rib-avatar-group__headline">${esc(headline)}</h3>
    <div class="rib-avatar-group__scroller" tabindex="0" aria-label="${esc(headline)} avatars">
      <ul class="rib-avatar-group__list">${itemHtml}</ul>
    </div>
  </section>`;
}

function renderRibAvatarShowcase(){
  return `<div class="rib-avatar-source"><span>RIB only</span><div class="rib-avatar-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=3981-10046" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-avatar-try" href="#/sandbox/avatar"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-avatar-showcase">
    <article class="rib-avatar-showcase__card">
      <header><div><span>Standard</span><h3>Picture and mnemonic colours</h3></div><code>40px visual · 64px label</code></header>
      <div class="rib-avatar-showcase__stage">${RIB_AVATAR_COLORS.map(color => renderRibAvatar({ color:color.key, bankLogo:color.key === 'picture' })).join('')}</div>
    </article>
    <article class="rib-avatar-showcase__card">
      <header><div><span>Group</span><h3>Labelled people</h3></div><code>6 avatars · 12px gap</code></header>
      <div class="rib-avatar-showcase__stage is-group">${renderRibAvatarGroup()}</div>
    </article>
  </div>`;
}

const RIB_BREADCRUMB_STATES = [
  { key:'default', label:'Default' },
  { key:'hover', label:'Hover' },
  { key:'active', label:'Active' }
];

function renderRibBreadcrumbUnit(item, state = 'default', isCurrent = false){
  const stateName = RIB_BREADCRUMB_STATES.some(option => option.key === state) ? state : 'default';
  const className = `rib-breadcrumb__unit is-${stateName}`;
  if(isCurrent || stateName === 'active') {
    return `<span class="${className}" aria-current="page">${esc(item.label)}</span>`;
  }
  return `<a class="${className}" href="${esc(item.href || '#/c/breadcrumbs')}">${esc(item.label)}</a>`;
}

function renderRibBreadcrumb(options = {}){
  const sourceItems = Array.isArray(options.items) && options.items.length
    ? options.items.slice(0, 3)
    : ['Item 1'];
  const items = sourceItems.map((item, index) => typeof item === 'string'
    ? { label:item || `Item ${index + 1}`, href:'#/c/breadcrumbs' }
    : { label:String(item.label || `Item ${index + 1}`), href:String(item.href || '#/c/breadcrumbs') });
  const title = String(options.title || 'Title');
  const showPath = options.web !== false;
  const dropDown = options.dropDown === undefined ? items.length < 3 : Boolean(options.dropDown);
  const path = showPath
    ? `<nav class="rib-breadcrumb__path" aria-label="${esc(options.ariaLabel || 'Breadcrumb')}">
        <ol class="rib-breadcrumb__list">${items.map((item, index) => `<li class="rib-breadcrumb__item">
          ${renderRibBreadcrumbUnit(item, index === items.length - 1 ? 'active' : 'default', index === items.length - 1)}
          ${index < items.length - 1 ? '<img class="rib-breadcrumb__separator" src="assets/rib/breadcrumb/chevron-right.svg" alt="" width="12" height="12" aria-hidden="true">' : ''}
        </li>`).join('')}</ol>
      </nav>`
    : '';
  const titleControl = dropDown
    ? `<button class="rib-breadcrumb__title-action" type="button" aria-expanded="false">
        <span class="rib-breadcrumb__title-text">${esc(title)}</span>
        <img class="rib-breadcrumb__dropdown" src="assets/rib/breadcrumb/chevron-down.svg" alt="" width="16" height="16" aria-hidden="true">
      </button>`
    : `<span class="rib-breadcrumb__title-text">${esc(title)}</span>`;

  return `<div class="rib-breadcrumb" data-figma-node="1415:737">
    ${path}
    <div class="rib-breadcrumb__title-row">
      <button class="rib-breadcrumb__back" type="button" aria-label="Back">
        <img src="assets/rib/breadcrumb/back.svg" alt="" width="24" height="24" aria-hidden="true">
      </button>
      ${titleControl}
    </div>
  </div>`;
}

function renderRibBreadcrumbShowcase(){
  const variants = [
    { label:'1 item', items:['Item 1'] },
    { label:'2 items', items:['Item 1','Item 2'] },
    { label:'3 items', items:['Item 1','Item 2','Item 3'] }
  ];
  return `<div class="rib-breadcrumb-source"><span>RIB only</span><div class="rib-breadcrumb-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=875-4938" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-breadcrumb-try" href="#/sandbox/breadcrumbs"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-breadcrumb-showcase">
    <article class="rib-breadcrumb-showcase__card is-variants">
      <header><div><span>Breadcrumb</span><h3>1 item · 2 items · 3 items</h3></div><code>472px · 48px</code></header>
      <div class="rib-breadcrumb-showcase__stage">${variants.map(variant => `<div class="rib-breadcrumb-showcase__variant"><b>${variant.label}</b>${renderRibBreadcrumb({ items:variant.items })}</div>`).join('')}</div>
    </article>
    <article class="rib-breadcrumb-showcase__card is-states">
      <header><div><span>Breadcrumb unit</span><h3>Interaction states</h3></div><code>10 / 16</code></header>
      <div class="rib-breadcrumb-showcase__states">${RIB_BREADCRUMB_STATES.map(state => `<div><b>${state.label}</b>${renderRibBreadcrumbUnit({ label:state.label }, state.key, state.key === 'active')}</div>`).join('')}</div>
    </article>
  </div>`;
}

const RIB_CALENDAR_ASSETS = Object.freeze({
  previous:'../assets/icons/general/line/chevron-left--line--235-116.svg',
  next:'../assets/icons/general/line/chevron-right--line--235-115.svg',
  down:'../assets/icons/general/filled/chevron-down--filled--679-239.svg',
  up:'../assets/icons/general/filled/chevron-up--filled--717-260.svg'
});

const RIB_CALENDAR_VARIANTS = [
  { key:'date', label:'Date', states:['No date selected','Hover','Selected'] },
  { key:'range', label:'Date range', states:['Default','Start date hover','Start date selected','End date hover','End date selected'] },
  { key:'month-year', label:'Month and year', states:['Selected','Hover'] }
];

function renderRibCalendarIcon(asset, label = ''){
  return `<span class="rib-calendar__icon" style="--rib-calendar-icon:url(${asset})"${label ? ` aria-label="${label}"` : ' aria-hidden="true"'}></span>`;
}

function ribCalendarState(mode, requested){
  const variant = RIB_CALENDAR_VARIANTS.find(item => item.key === mode) || RIB_CALENDAR_VARIANTS[0];
  return variant.states.includes(requested) ? requested : variant.states[0];
}

function renderRibCalendarGrid(mode, state){
  const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const selectedDay = mode === 'date' && state === 'Selected' ? 8
    : mode === 'range' && ['Start date selected','End date hover','End date selected'].includes(state) ? 8 : null;
  const endDay = mode === 'range' && state === 'End date selected' ? 16 : null;
  const hoverDay = state === 'Hover' || state === 'Start date hover' ? 8 : state === 'End date hover' ? 16 : null;
  const rangeActive = mode === 'range' && ['End date hover','End date selected'].includes(state);
  const cells = [null,null,null,...Array.from({ length:31 }, (_, index) => index + 1)];

  return `<div class="rib-calendar__grid" role="grid" aria-label="October ${mode === 'date' ? '2023' : '2020'}">
    ${weekDays.map(day => `<span class="rib-calendar__weekday" role="columnheader">${day}</span>`).join('')}
    ${cells.map(day => {
      if(day == null) return '<span class="rib-calendar__cell is-empty" role="gridcell"></span>';
      const selected = day === selectedDay || day === endDay;
      const inRange = rangeActive && day >= 8 && day <= 16;
      const classes = [
        'rib-calendar__cell',
        inRange ? (state === 'End date selected' ? 'is-range-selected' : 'is-range-hover') : '',
        day === 8 && inRange ? 'is-range-start' : '',
        day === 16 && inRange ? 'is-range-end' : ''
      ].filter(Boolean).join(' ');
      const dateStateClasses = [
        day === 2 ? ' is-today' : '',
        selected ? ' is-selected' : '',
        day === hoverDay ? ' is-hover' : ''
      ].filter(Boolean).join('');
      return `<span class="${classes}" role="gridcell"><button type="button" class="rib-calendar__date${dateStateClasses}" aria-label="${day} October ${mode === 'date' ? '2023' : '2020'}" aria-selected="${selected ? 'true' : 'false'}">${day}</button></span>`;
    }).join('')}
  </div>`;
}

function renderRibCalendarMonthYear(state){
  const months = ['July','August','September','October','November','December'];
  const years = ['2017','2018','2019','2020','2021','2022'];
  return `<div class="rib-calendar__picker" aria-label="Choose month and year">
    <div class="rib-calendar__picker-column" role="listbox" aria-label="Month">
      ${months.map(month => `<button type="button" role="option" aria-selected="${month === 'October'}" class="${month === 'October' ? 'is-selected' : ''}${state === 'Hover' && month === 'September' ? ' is-hover' : ''}">${month}</button>`).join('')}
    </div>
    <div class="rib-calendar__picker-column" role="listbox" aria-label="Year">
      ${years.map(year => `<button type="button" role="option" aria-selected="${year === '2020'}" class="${year === '2020' ? 'is-selected' : ''}">${year}</button>`).join('')}
    </div>
  </div>`;
}

function renderRibCalendar(options = {}){
  const mode = RIB_CALENDAR_VARIANTS.some(item => item.key === options.mode) ? options.mode : 'date';
  const state = ribCalendarState(mode, options.state);
  const range = mode === 'range';
  const monthYear = mode === 'month-year';
  const year = mode === 'date' ? '2023' : '2020';
  const helper = range ? (['Start date selected','End date hover','End date selected'].includes(state) ? 'Choose end date' : 'Choose start date') : monthYear ? 'Choose start date' : '';
  const classes = ['rib-calendar', `rib-calendar--${mode}`].join(' ');

  return `<section class="${classes}" aria-label="${mode === 'date' ? 'Date calendar' : mode === 'range' ? 'Date range calendar' : 'Month and year picker'}">
    <header class="rib-calendar__header">
      ${helper ? `<span class="rib-calendar__helper">${helper}</span>` : ''}
      <div class="rib-calendar__navigation">
        <button type="button" class="rib-calendar__month-label" aria-label="Choose month and year">October ${year}${renderRibCalendarIcon(monthYear ? RIB_CALENDAR_ASSETS.up : RIB_CALENDAR_ASSETS.down)}</button>
        ${monthYear ? '' : `<div class="rib-calendar__arrows"><button type="button" aria-label="Choose previous month">${renderRibCalendarIcon(RIB_CALENDAR_ASSETS.previous)}</button><button type="button" aria-label="Choose next month">${renderRibCalendarIcon(RIB_CALENDAR_ASSETS.next)}</button></div>`}
      </div>
    </header>
    ${monthYear ? renderRibCalendarMonthYear(state) : renderRibCalendarGrid(mode, state)}
  </section>`;
}

function renderRibCalendarShowcase(){
  return `<div class="rib-calendar-source"><span>RIB only</span><div class="rib-calendar-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=1815-1068" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-calendar-try" href="#/sandbox/calendar"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-calendar-showcase">
    ${RIB_CALENDAR_VARIANTS.map(variant => `<article class="rib-calendar-showcase__card${variant.key === 'range' ? ' is-wide' : ''}"><header><div><span>Calendar</span><h3>${variant.label}</h3></div><code>258px</code></header><div class="rib-calendar-showcase__states">${variant.states.map(state => `<div class="rib-calendar-stage"><b>${state}</b>${renderRibCalendar({ mode:variant.key, state })}</div>`).join('')}</div></article>`).join('')}
  </div>`;
}

const RIB_CARD_ASSETS = Object.freeze({
  loan: '../assets/icons/product/line/education-loan--line--530-321.svg',
  investment: '../assets/icons/product/filled/nps--filled--934-464.svg',
  insurance: '../assets/icons/product/line/life-insurance--line--235-402.svg',
  download: '../assets/icons/general/line/download--line--599-44.svg',
  next: '../assets/icons/general/line/chevron-right--line--235-115.svg',
  ornamentTop: '../assets/components/cards/offer-ornament-top.svg',
  ornamentBottom: '../assets/components/cards/offer-ornament-bottom.svg'
});

const RIB_CARD_VARIANTS = Object.freeze([
  { key:'loan', label:'Loan', width:272, height:150 },
  { key:'investment', label:'Investment', width:290, height:130 },
  { key:'insurance', label:'Insurance', width:272, height:160 },
  { key:'offer', label:'Offer', width:288, height:160 }
]);

function renderRibCardIcon(asset, className = ''){
  return `<span class="rib-card__icon ${className}" style="--rib-card-icon:url(${asset})" aria-hidden="true"></span>`;
}

function renderRibCard(options = {}){
  const variant = RIB_CARD_VARIANTS.find(item => item.key === options.variant) || RIB_CARD_VARIANTS[0];
  const content = {
    loan: { title:'Education loan', number:'LN 003501 ···· 8472', metricLabel:'Outstanding', metric:'₹ 8,40,000', secondaryLabel:'Next EMI', secondary:'₹ 18,420' },
    investment: { title:'National Pension System', number:'PRAN ···· 9021', metricLabel:'Current value', metric:'₹ 4,28,650', secondaryLabel:'Returns', secondary:'+12.4%' },
    insurance: { title:'Life insurance', number:'Policy ···· 6734', metricLabel:'Sum assured', metric:'₹ 50,00,000', secondaryLabel:'Premium due', secondary:'18 Sep' },
    offer: { title:'Build wealth for tomorrow', number:'Start an SIP from ₹500', metricLabel:'', metric:'', secondaryLabel:'', secondary:'' }
  }[variant.key];
  const title = String(options.title || content.title);
  const icon = RIB_CARD_ASSETS[variant.key];

  if(variant.key === 'offer') {
    return `<article class="rib-card rib-card--offer" aria-label="Investment offer card">
      <img class="rib-card__ornament is-top" src="${RIB_CARD_ASSETS.ornamentTop}" alt="">
      <img class="rib-card__ornament is-bottom" src="${RIB_CARD_ASSETS.ornamentBottom}" alt="">
      <div class="rib-card__offer-copy"><span class="rib-card__offer-mark">₹</span><div><h3>${esc(title)}</h3><p>${esc(content.number)}</p></div></div>
      <footer class="rib-card__footer"><button type="button" class="rib-card__action">Get started ${renderRibCardIcon(RIB_CARD_ASSETS.next)}</button></footer>
    </article>`;
  }

  const aria = variant.key === 'loan' ? 'Education loan account card' : `${variant.label} account card`;
  return `<article class="rib-card rib-card--${variant.key}" aria-label="${aria}">
    <div class="rib-card__body">
      <header class="rib-card__heading">${renderRibCardIcon(icon, 'is-product')}<div><h3>${esc(title)}</h3><p>${esc(content.number)}</p></div></header>
      <div class="rib-card__metrics"><span><small>${content.metricLabel}</small><b>${content.metric}</b></span><span><small>${content.secondaryLabel}</small><b>${content.secondary}</b></span></div>
    </div>
    ${variant.key === 'investment' ? '' : `<footer class="rib-card__footer"><button type="button" class="rib-card__action">${renderRibCardIcon(RIB_CARD_ASSETS.download)} Statement</button><button type="button" class="rib-card__action">See details ${renderRibCardIcon(RIB_CARD_ASSETS.next)}</button></footer>`}
  </article>`;
}

function renderRibCardShowcase(){
  return `<div class="rib-card-source"><span>RIB only</span><div class="rib-card-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=3981-10044" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-card-try" href="#/sandbox/cards"><i class="ti ti-player-play"></i>Try in playground</a></div></div>
  <div class="rib-card-showcase">${RIB_CARD_VARIANTS.map(variant => `<article class="rib-card-showcase__card"><header><div><span>Card</span><h3>${variant.label}</h3></div><code>${variant.width} × ${variant.height}</code></header><div class="rib-card-showcase__stage">${renderRibCard({ variant:variant.key })}</div></article>`).join('')}</div>`;
}

const PUBLISHED_COMPONENT_IDS = Object.freeze(['button','calendar','cards','accordions','activity-timeline','avatar','breadcrumbs']);

const COMPONENTS = {

  button: {
    title: 'Button', group: 'Actions', status: 'stable', version: '1.0', updated: '29 Aug 2026',
    desc: 'The RIB Button triggers a clear action with seven emphasis variants, three compact web sizes, optional leading or trailing icons, and explicit default, hover, focus and disabled states.',
    sections: [
      { title: 'RIB source component',
        note: 'The catalogue reproduces the source component set directly: type sections, size groups, icon positions and state columns all map to the Figma properties.',
        html: `<div class="rib-button-source"><span>RIB only</span><div class="rib-button-source__actions"><a href="https://www.figma.com/design/TNYMpYpdcSbrPo6QidRBzC/Components---RIB?node-id=8-2" target="_blank" rel="noreferrer">Open source component <i class="ti ti-external-link"></i></a><a class="rib-button-try" href="#/sandbox/button"><i class="ti ti-player-play"></i>Try in playground</a></div></div>${renderButtonMatrix()}` },
      { title: 'Foundation mapping',
        note: 'Every visual state resolves to the audited RIB foundations. The source white-on-Orange100 pairing is preserved exactly, but remains below AA contrast for normal text and needs design review before production use.',
        html: `<div class="button-foundation-grid">
          <article><span>Primary</span><b>Orange 100 · Orange 110</b><code>#F0792E · #DB5E10</code></article>
          <article><span>Pastel</span><b>Amber 90 · Amber 100</b><code>#FCF6F2 · #FAEFE8</code></article>
          <article><span>White</span><b>Cool Grey 90 · Cool Grey 110</b><code>#FCFCFD · #EFF1F6</code></article>
          <article><span>Disabled</span><b>Grey 70 · Grey 110</b><code>#E7E8E9 · #7D8287</code></article>
          <article><span>Destructive</span><b>Error 90 · 100 · 110</b><code>#E05257 · #D8272D · #AD1F24</code></article>
          <article><span>Focus</span><b>Focus Orange · Peach 120</b><code>#FFE8DD · #EEC9CC</code></article>
        </div>` },
      { title: 'Secondary state rule',
        note: 'Secondary is a text-style button in the RIB file. Orange100 states are shown in the matrix; other colour variants follow the same rule using the next darker colour for hover and focus, while disabled stays Grey110.',
        html: `<div class="button-rule-card">
          ${renderRibButton({ variant:'secondary', size:'sm', state:'default', label:'Edit' })}
          ${renderRibButton({ variant:'secondary', size:'sm', state:'hover', label:'Edit' })}
          ${renderRibButton({ variant:'secondary', size:'sm', state:'focus', label:'Edit' })}
          ${renderRibButton({ variant:'secondary', size:'sm', state:'disabled', label:'Edit' })}
        </div>` }
    ],
    props: [
      ['label','String','required','Button text. Sentence case, verb first.'],
      ['variant','RibButtonVariant','primary','primary · outline · secondary · pastel · white · destructiveOutline · destructiveFilled'],
      ['size','RibButtonSize','large','large · small · xSmall. Secondary supports small only.'],
      ['leadingIcon','Widget?','null','Optional 16px icon before the label; 14px for Secondary.'],
      ['trailingIcon','Widget?','null','Optional icon after the label. Do not provide both icons.'],
      ['expanded','bool','false','Fills the available width while preserving the source height.'],
      ['onPressed','VoidCallback?','null','A null callback renders the source disabled state.']
    ],
    flutter: `RibButton(
  label: 'Continue',
  variant: RibButtonVariant.primary,
  size: RibButtonSize.large,
  leadingIcon: const Icon(Icons.add),
  onPressed: submitTransfer,
)`,
    sandbox: 'button'
  },

  calendar: {
    title: 'Calendar', group: 'Inputs', status: 'stable', version: '1.0', updated: '30 Aug 2026',
    desc: 'The RIB Calendar supports single-date, date-range, and month/year selection in the exact compact 258px desktop shell.',
    sections: [
      { title:'RIB source component', note:'Every source state is reproduced with the audited RIB foundations, local glyphs, and calendar grid semantics.', html:renderRibCalendarShowcase() },
      { title:'Foundation mapping', note:'Selected dates use Orange100; hover and range previews use Cool Grey 100; confirmed ranges use Amber100; the shell uses Cool Grey 110 and Shadow 200.', html:`<div class="button-foundation-grid"><article><span>Selected</span><b>Orange 100</b><code>#F0792E</code></article><article><span>Range</span><b>Amber 100</b><code>#FAEFE8</code></article><article><span>Hover</span><b>Cool Grey 100</b><code>#F8F9FB</code></article><article><span>Border</span><b>Cool Grey 110</b><code>#EFF1F6</code></article><article><span>Text</span><b>Grey 120 · 140</b><code>#64696D · #333638</code></article><article><span>Elevation</span><b>Shadow 200</b><code>0 4 4 · 12%</code></article></div>` }
    ],
    props: [
      ['mode','RibCalendarMode','date','date · range · monthYear'],
      ['month','DateTime','required','Visible calendar month.'],
      ['selectedDate','DateTime?','null','Selected date in single-date mode.'],
      ['rangeStart','DateTime?','null','Selected range start.'],
      ['rangeEnd','DateTime?','null','Selected range end.'],
      ['onDateSelected','ValueChanged<DateTime>?','null','Selection callback.']
    ],
    flutter:`RibCalendar(
  mode: RibCalendarMode.date,
  month: DateTime(2023, 10),
  selectedDate: DateTime(2023, 10, 8),
  onDateSelected: setDate,
)`,
    sandbox: 'calendar'
  },

  cards: {
    title: 'Cards', group: 'Display', status: 'stable', version: '1.0', updated: '30 Aug 2026',
    desc: 'RIB Cards present loans, investments, insurance policies, and offers in compact branded product surfaces with clear metrics and actions.',
    sections: [
      { title:'RIB source components', note:'Representative source cards preserve their exact Figma dimensions, product hierarchy, actions, and local decorative artwork.', html:renderRibCardShowcase() },
      { title:'Foundation mapping', note:'Branded cards use Orange100 or the approved Hero gradient. Offer surfaces use Amber90, while Amber110 remains the audited #F7E1D4 foundation value.', html:`<div class="button-foundation-grid"><article><span>Product fill</span><b>Orange 100</b><code>#F0792E</code></article><article><span>Investment fill</span><b>Hero gradient</b><code>#EF8C24 → #F06837</code></article><article><span>Offer border</span><b>Amber 90</b><code>#FCF6F2</code></article><article><span>Offer support</span><b>Amber 110</b><code>#F7E1D4</code></article><article><span>Footer</span><b>Black 20%</b><code>rgba(0,0,0,.20)</code></article><article><span>Content</span><b>White 100</b><code>#FFFFFF</code></article></div>` }
    ],
    props: [
      ['variant','RibCardVariant','loan','loan · investment · insurance · offer'],
      ['title','String','required','Product or offer title.'],
      ['identifier','String?','null','Masked account, policy, or investment identifier.'],
      ['primaryMetric','RibCardMetric?','null','Primary amount or value.'],
      ['secondaryMetric','RibCardMetric?','null','Supporting value such as due date or return.'],
      ['onPrimaryAction','VoidCallback?','null','Primary footer action.']
    ],
    flutter:`RibCard(
  variant: RibCardVariant.loan,
  title: 'Education loan',
  identifier: 'LN 003501 ···· 8472',
  primaryMetric: const RibCardMetric('Outstanding', '₹ 8,40,000'),
  onPrimaryAction: downloadStatement,
)`,
    sandbox: 'cards'
  },

  buttongroups: {
    title: 'Button groups', group: 'Actions', status: 'beta', version: '0.1', updated: '18 Jun 2026',
    desc: 'Button groups are included for inventory completeness but should be used sparingly. Prefer tabs for view switching and chips for filters.',
    sections: [
      { title: 'Segmented actions',
        html: `<div class="canvas">
          <div class="ds-button-group"><button class="active">Daily</button><button>Weekly</button><button>Monthly</button></div>
          <div class="ds-button-group"><button><i class="ti ti-list"></i></button><button class="active"><i class="ti ti-layout-grid"></i></button></div>
        </div>` }
    ],
    props: [
      ['items','List<DsButtonGroupItem>','required','Actions or view modes'],
      ['selectedIndex','int','0','Active item'],
      ['onChanged','ValueChanged<int>','required','Selection callback']
    ],
    flutter: `DsButtonGroup(items: items, selectedIndex: 0, onChanged: setMode)`
  },

  textfield: {
    title: 'Input fields', group: 'Inputs', status: 'stable', version: '1.4', updated: '18 Jun 2026',
    desc: 'Input fields use Mulish and a single state model across text, mobile, amount and OTP variants. Keep labels medium, field text regular, and use orange only for active typing and red only for validation failure.',
    sections: [
      { title: 'Required states',
        note: 'These are the canonical states for every input variant in GlobalDS.',
        html: renderInputStateModel() },
      { title: 'Typography weights',
        note: 'The production field treatment should stay light. Avoid bold field values; reserve semibold only for compact metadata and actions.',
        html: `<div class="input-type-spec">
          <div><span>Label</span><b style="font-weight:500">Mulish 14/20 · 500</b></div>
          <div><span>Placeholder</span><b style="font-weight:400;color:var(--gray-500)">Mulish 14/20 · 400</b></div>
          <div><span>Entered value</span><b style="font-weight:400">Mulish 14/20 · 400</b></div>
          <div><span>Helper / error</span><b style="font-weight:500">Mulish 12/16 · 500</b></div>
          <div><span>Affix / country code</span><b style="font-weight:500">Mulish 12/16 · 500</b></div>
          <div><span>Field action</span><b style="font-weight:600">Mulish 12/16 · 600</b></div>
        </div>` },
      { title: 'Variant and state matrix',
        note: 'Each variant below is shown in the same state order: empty, active, typing, filled, filled hover and error.',
        html: renderInputVariantGrid() }
    ],
    props: [
      ['label','String?','null','Optional top or floating label'],
      ['hint','String?','null','Placeholder/example content'],
      ['helper','String?','null','Persistent helper text below the field'],
      ['errorText','String?','null','Replaces helper and switches to error state'],
      ['prefixIcon','IconData?','null','Leading icon'],
      ['suffixIcon','IconData?','null','Trailing icon such as eye or keyboard'],
      ['suffixText','String?','null','Trailing text such as currency or unit'],
      ['countryCode','String?','null','Enables phone input mode with country selector'],
      ['floatingLabel','bool','false','Uses the compact inset label treatment'],
      ['enabled','bool','true','Disabled fields keep their value readable'],
      ['keyboardType','TextInputType','text','Use phone, number, emailAddress or text']
    ],
    flutter: `DsTextField(
  label: 'Mobile number',
  hint: 'Enter mobile number',
  countryCode: '+91',
  suffixIcon: TablerIcons.keyboard,
  errorText: state.invalidMobile ? 'Please enter Customer Identification (CIF) Number' : null,
  onChanged: controller.setMobile,
)`
  },

  dropdown: {
    title: 'Dropdown', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Dropdowns select one value from a short, known list. Keep the field 356px wide on web forms where possible, reuse the input field shell, and place menu options directly below the trigger with the same radius and border treatment.',
    sections: [
      { title: 'States',
        html: `<div class="canvas grid2">
          <div class="ds-field">
            <label>Country</label>
            <div class="ds-dropdown"><span>Canada</span><i class="ti ti-chevron-down"></i></div>
          </div>
          <div class="ds-field is-focus">
            <label>Country</label>
            <div class="ds-dropdown is-open"><span>Canada</span><i class="ti ti-chevron-up"></i></div>
            <div class="ds-menu">
              <div class="ds-menu-item selected"><span>Canada</span><i class="ti ti-check"></i></div>
              <div class="ds-menu-item">United States</div>
              <div class="ds-menu-item">United Kingdom</div>
            </div>
          </div>
          <div class="ds-field is-error">
            <label>Purpose</label>
            <div class="ds-dropdown"><span>Select purpose</span><i class="ti ti-chevron-down"></i></div>
            <span class="ds-help">Choose one option to continue.</span>
          </div>
          <div class="ds-field is-disabled">
            <label>Currency</label>
            <div class="ds-dropdown"><span>CAD</span><i class="ti ti-lock"></i></div>
          </div>
        </div>` },
      { title: 'Menu rules',
        note: 'Menus use white surfaces, 8px radius, thin borders and compact rows. If the list exceeds 6 options, add search instead of making the menu tall.',
        html: `<div class="canvas">
          <div class="ds-menu" style="position:static;width:356px">
            <div class="ds-menu-item selected"><span>Savings account · 8472</span><i class="ti ti-check"></i></div>
            <div class="ds-menu-item">Chequing account · 1941</div>
            <div class="ds-menu-item">USD account · 5088</div>
            <div class="ds-menu-item disabled">Closed account · 1102</div>
          </div>
        </div>` }
    ],
    props: [
      ['label','String','required','Field label, always visible'],
      ['value','T?','null','Selected value'],
      ['items','List<T>','required','Options, preferably 2–6 items'],
      ['hint','String?','null','Shown when no value is selected'],
      ['errorText','String?','null','Switches to error state'],
      ['enabled','bool','true','Disabled state keeps selected value readable'],
      ['onChanged','ValueChanged<T>?','required','Fires on option selection']
    ],
    flutter: `DsDropdown<String>(
  label: 'Country',
  value: 'Canada',
  items: const ['Canada', 'United States', 'United Kingdom'],
  onChanged: (country) => profile.setCountry(country),
)`
  },

  otp: {
    title: 'OTP input', group: 'Inputs', status: 'stable', version: '2.2', updated: '18 Jun 2026',
    desc: 'One-time password input for SMS and app verification flows. The default GlobalDS pattern is a single field with resend affordance and explicit timer, success, error and disabled states. Split boxes remain available for grid card and high-assurance numeric challenges.',
    sections: [
      { title: 'Single-field OTP states',
        html: `<div class="canvas col otp-state-demo">
          <div class="otp-demo-row"><b>Default — Timer State</b><div class="ds-otp-single"><input placeholder="Enter OTP"><span>Resend OTP in 00:20</span></div></div>
          <div class="otp-demo-row"><b>Resend Available State</b><div class="ds-otp-single"><input placeholder="Enter OTP"><button>Resend OTP</button></div></div>
          <div class="otp-demo-row"><b>Active / Typing State</b><div class="ds-otp-single active float"><label>Enter OTP</label><input value=""><span>Resend OTP in 00:20</span></div></div>
          <div class="otp-demo-row"><b>Hover State</b><div class="ds-otp-single hover"><input placeholder="Enter OTP"><span>Resend OTP in 00:20</span></div></div>
          <div class="otp-demo-row"><b>Success / Verified State</b><div class="ds-otp-single success float"><label>Enter OTP</label><input value="129899"><span>Verified <i class="ti ti-check"></i></span></div></div>
          <div class="otp-demo-row"><b>Error State</b><div><div class="ds-otp-single error float"><label>Enter OTP</label><input value="129899"><button>Resend OTP</button></div><span class="ds-help otp-error"><i class="ti ti-info-circle"></i>OTP entered is wrong, please retry</span></div></div>
          <div class="otp-demo-row"><b>Disabled State</b><div class="ds-otp-single disabled float"><label>Enter OTP</label><input value="129899" disabled></div></div>
        </div>` },
      { title: 'Boxed OTP states',
        html: `<div class="canvas col">
          <span class="demo-label">Default</span>
          <div class="ds-otp">
            <div class="ds-otp-box"></div><div class="ds-otp-box"></div><div class="ds-otp-box"></div><div class="ds-otp-box"></div>
          </div>
          <span class="demo-label">Typing — masked, cursor on next box</span>
          <div class="ds-otp">
            <div class="ds-otp-box dot filled"></div><div class="ds-otp-box filled">5</div><div class="ds-otp-box active"></div><div class="ds-otp-box"></div>
          </div>
          <span class="demo-label">Error</span>
          <div class="ds-otp">
            <div class="ds-otp-box error">7</div><div class="ds-otp-box error">2</div><div class="ds-otp-box error">9</div><div class="ds-otp-box error">1</div>
          </div>
          <span class="demo-label">Success</span>
          <div class="ds-otp">
            <div class="ds-otp-box success">4</div><div class="ds-otp-box success">8</div><div class="ds-otp-box success">2</div><div class="ds-otp-box success">6</div>
          </div>
        </div>` },
      { title: 'Six digits, grouped',
        note: 'Above 4 digits, split into sections of 3 — customers chunk numbers the way they hear them on the phone.',
        html: `<div class="canvas col">
          <div class="ds-otp">
            <div class="ds-otp-box filled">3</div><div class="ds-otp-box filled">1</div><div class="ds-otp-box filled">0</div>
            <span class="ds-otp-sep"></span>
            <div class="ds-otp-box active"></div><div class="ds-otp-box"></div><div class="ds-otp-box"></div>
          </div>
        </div>` }
    ],
    props: [
      ['length','int','6','4 for grid card challenges, 6 for SMS OTP'],
      ['mode','DsOtpMode','single','single · boxed · grouped'],
      ['grouped','bool','true','Splits boxed 6-digit codes as 3–3 with a separator'],
      ['masked','bool','false','Shows dots after a 300ms peek per digit'],
      ['state','DsFieldState','idle','idle · active · hover · error · success · disabled'],
      ['timerText','String?','null','Shows countdown copy such as Resend OTP in 00:20'],
      ['resendEnabled','bool','false','Shows the filled Resend OTP button'],
      ['verifiedText','String?','Verified','Success-state label'],
      ['errorText','String?','null','Error copy shown below the field'],
      ['onCompleted','ValueChanged<String>','required','Fires once all boxes are filled'],
      ['onResend','VoidCallback?','null','Enables the resend affordance when timer hits zero']
    ],
    flutter: `DsOtpField(
  length: 6,
  mode: DsOtpMode.single,
  timerText: 'Resend OTP in 00:20',
  resendEnabled: state.canResend,
  state: DsFieldState.idle,
  onCompleted: (code) => context.read<AuthBloc>().add(VerifyOtp(code)),
  onResend: controller.resendOtp,
)`
  },

  selection: {
    title: 'Selection controls', group: 'Inputs', status: 'stable', version: '1.0', updated: '20 May 2026',
    desc: 'Checkboxes for independent options, radios for exclusive choices, switches for instant on/off settings. Switches apply immediately — never pair them with a save button.',
    sections: [
      { title: 'Checkbox & radio',
        html: `<div class="canvas col">
          <div class="hstack">
            <span class="ds-ctl-row"><span class="ds-check"></span> Unchecked</span>
            <span class="ds-ctl-row"><span class="ds-check checked"></span> Checked</span>
            <span class="ds-ctl-row"><span class="ds-check disabled"></span> Disabled</span>
          </div>
          <div class="hstack">
            <span class="ds-ctl-row"><span class="ds-radio"></span> Savings account</span>
            <span class="ds-ctl-row"><span class="ds-radio checked"></span> Chequing account</span>
            <span class="ds-ctl-row"><span class="ds-radio disabled"></span> Locked</span>
          </div>
        </div>` },
      { title: 'Switch',
        html: `<div class="canvas col">
          <span class="ds-ctl-row"><span class="ds-switch"></span> Transaction alerts off</span>
          <span class="ds-ctl-row"><span class="ds-switch on"></span> Transaction alerts on</span>
          <span class="ds-ctl-row"><span class="ds-switch on disabled"></span> Required by regulation</span>
        </div>` }
    ],
    props: [
      ['value','bool','required','Current state'],
      ['onChanged','ValueChanged<bool>?','null','null renders disabled'],
      ['label','String?','null','Tappable label — the whole row is the hit area'],
      ['dense','bool','false','Compact row height inside settings lists']
    ],
    flutter: `DsSwitch(
  value: settings.transactionAlerts,
  label: 'Transaction alerts',
  onChanged: (v) => settings.setTransactionAlerts(v),
)`
  },

  checkbox: {
    title: 'Checkbox', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Checkboxes capture independent yes/no decisions. The whole row should be tappable, labels stay visible, and disabled options remain readable.',
    sections: [
      { title: 'States',
        html: `<div class="canvas col">
          <span class="ds-ctl-row"><span class="ds-check"></span> Unchecked</span>
          <span class="ds-ctl-row"><span class="ds-check checked"></span> Checked</span>
          <span class="ds-ctl-row"><span class="ds-check mixed"></span> Indeterminate</span>
          <span class="ds-ctl-row"><span class="ds-check disabled"></span> Disabled</span>
        </div>` },
      { title: 'Rows',
        html: `<div class="canvas col">
          <label class="ds-option-row"><span class="ds-check checked"></span><span><b>Email alerts</b><small>Receive transfer and login alerts.</small></span></label>
          <label class="ds-option-row"><span class="ds-check"></span><span><b>Marketing consent</b><small>Product updates and offers from ICICI Bank.</small></span></label>
        </div>` }
    ],
    props: [
      ['checked','bool','required','Current value'],
      ['indeterminate','bool','false','Shows a mixed state for parent rows'],
      ['label','String?','null','Visible row label'],
      ['helper','String?','null','Optional supporting text'],
      ['onChanged','ValueChanged<bool>?','required','null renders disabled']
    ],
    flutter: `DsCheckbox(
  checked: preferences.emailAlerts,
  label: 'Email alerts',
  helper: 'Receive transfer and login alerts.',
  onChanged: preferences.setEmailAlerts,
)`
  },

  toggle: {
    title: 'Toggle', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Toggles switch settings on or off immediately. Use them for preferences, not actions that need review or submission.',
    sections: [
      { title: 'States',
        html: `<div class="canvas col">
          <span class="ds-ctl-row"><span class="ds-switch"></span> Off</span>
          <span class="ds-ctl-row"><span class="ds-switch on"></span> On</span>
          <span class="ds-ctl-row"><span class="ds-switch disabled"></span> Disabled off</span>
          <span class="ds-ctl-row"><span class="ds-switch on disabled"></span> Disabled on</span>
        </div>` },
      { title: 'Settings row',
        html: `<div class="canvas">
          <div class="ds-setting-row"><span><b>Transaction alerts</b><small>Notify me for debit and credit activity.</small></span><span class="ds-switch on"></span></div>
        </div>` }
    ],
    props: [
      ['value','bool','required','Current on/off state'],
      ['label','String?','null','Setting name'],
      ['helper','String?','null','Optional supporting text'],
      ['onChanged','ValueChanged<bool>?','required','null renders disabled']
    ],
    flutter: `DsToggle(
  value: settings.transactionAlerts,
  label: 'Transaction alerts',
  onChanged: settings.setTransactionAlerts,
)`
  },

  badges: {
    title: 'Badges', group: 'Display', status: 'stable', version: '1.1', updated: '18 Jun 2026',
    desc: 'Labels, badges, chips and currency tags are compact status primitives. Labels describe account and product metadata, badges communicate state, chips filter or select, and currency tags identify account currency.',
    sections: [
      { title: 'Labels',
        note: 'Labels come in small, medium and large. Keep them short, sentence case, and use semantic tones only when the label is operationally meaningful.',
        html: `<div class="canvas">
          <span class="ds-label translucent">Savings</span>
          <span class="ds-label green">Active</span>
          <span class="ds-label maroon">Premium</span>
          <span class="ds-label blue"><i class="ti ti-shield-check"></i> Verified</span>
          <span class="ds-label red">Blocked</span>
          <span class="ds-label orange">Pending</span>
        </div>` },
      { title: 'Currency tags',
        note: 'Currency tags are fixed-height identifiers for account cards and account lists. Use the same neutral border system and tabular type.',
        html: `<div class="canvas">
          <span class="ds-currency-tag">USD</span>
          <span class="ds-currency-tag">GBP</span>
          <span class="ds-currency-tag">EUR</span>
          <span class="ds-currency-tag">CAD</span>
          <span class="ds-currency-tag">AED</span>
          <span class="ds-currency-tag">AUD</span>
        </div>` },
      { title: 'Status badges',
        html: `<div class="canvas">
          <span class="ds-badge neutral">Draft</span>
          <span class="ds-badge brand">New</span>
          <span class="ds-badge success">Completed</span>
          <span class="ds-badge warning">Pending</span>
          <span class="ds-badge error">Failed</span>
          <span class="ds-badge info">Scheduled</span>
        </div>` },
      { title: 'Filter chips',
        html: `<div class="canvas">
          <span class="ds-chip selected"><i class="ti ti-check"></i> All</span>
          <span class="ds-chip">Transfers</span>
          <span class="ds-chip">Bills</span>
          <span class="ds-chip">Deposits</span>
          <span class="ds-chip"><i class="ti ti-calendar"></i> This month</span>
        </div>` }
    ],
    props: [
      ['label','String','required','Badge or chip text'],
      ['tone','DsTone','neutral','neutral · brand · success · warning · error · info · maroon · orange'],
      ['size','DsLabelSize','small','Labels only — small · medium · large'],
      ['selected','bool','false','Chips only — selected visual state'],
      ['leadingIcon','IconData?','null','Chips only'],
      ['onTap','VoidCallback?','null','Chips only — badges ignore taps']
    ],
    flutter: `DsBadge(label: 'Pending', tone: DsTone.warning)

DsChip(
  label: 'This month',
  leadingIcon: TablerIcons.calendar,
  selected: filter.isThisMonth,
  onTap: () => filter.toggleThisMonth(),
)`
  },

  chips: {
    title: 'Chips', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Chips are compact interactive filters and selections. They use pill radius, 12px body text and clear selected state.',
    sections: [
      { title: 'Filter chips',
        html: `<div class="canvas">
          <span class="ds-chip selected"><i class="ti ti-check"></i> All</span>
          <span class="ds-chip">Transfers</span>
          <span class="ds-chip">Bills</span>
          <span class="ds-chip">Deposits</span>
          <span class="ds-chip"><i class="ti ti-calendar"></i> This month</span>
        </div>` },
      { title: 'Removable chips',
        html: `<div class="canvas">
          <span class="ds-chip selected">Canada <i class="ti ti-x"></i></span>
          <span class="ds-chip selected">CAD <i class="ti ti-x"></i></span>
          <span class="ds-chip">Add filter <i class="ti ti-plus"></i></span>
        </div>` }
    ],
    props: [
      ['label','String','required','Chip text'],
      ['selected','bool','false','Selected visual state'],
      ['leadingIcon','IconData?','null','Optional leading icon'],
      ['trailingIcon','IconData?','null','Optional close or add icon'],
      ['onTap','VoidCallback?','required','Chip action']
    ],
    flutter: `DsChip(
  label: 'This month',
  leadingIcon: TablerIcons.calendar,
  selected: filter.isThisMonth,
  onTap: filter.toggleThisMonth,
)`
  },

  avatar: {
    title: 'Avatar and Avatar groups', group: 'Display', status: 'beta', version: '0.1', updated: '29 Aug 2026',
    sandbox: 'avatar',
    desc: 'The RIB Avatar identifies a person with a trusted picture or one of five mnemonic colour treatments. AvatarGroup keeps a short, labelled set of people in a predictable order.',
    sections: [
      { title: 'RIB variants',
        note: 'Source: Components - RIB, Avatar and Avatar groups node 3981:10046. The component preserves the Figma 40px visual, 64px label width, five mnemonic colour treatments, optional 12px ICICI Bank badge, and exact exported picture and bank mark.',
        html: renderRibAvatarShowcase() },
      { title: 'Usage contract',
        note: 'The visible name is always part of the component. Initials and pictures reinforce identity; they never replace a readable label. Groups retain the Figma order and become horizontally scrollable when 444px is not available.',
        html: `<div class="shape-rule-grid">
          <article class="shape-rule-card"><span><i class="ti ti-user"></i></span><div><h3>Name stays visible</h3><code>label: String</code><p>Use a concise recognisable name and keep it visible below the 40px visual.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-photo"></i></span><div><h3>Pictures are trusted</h3><code>color: picture</code><p>Only render an image supplied by a trusted customer or product source; otherwise use a mnemonic.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-building-bank"></i></span><div><h3>Bank badge is explicit</h3><code>bankLogo</code><p>The optional ICICI mark is announced in the accessible name and should only indicate a verified bank relationship.</p></div></article>
        </div>` }
    ],
    props: [
      ['label','String','required','Visible person name and semantic identity.'],
      ['color','RibAvatarColor','picture','picture · orange · blue · gold · maroon · multi'],
      ['initials','String?','label initial','One or two mnemonic characters.'],
      ['image','ImageProvider?','null','Trusted picture source; required for picture.'],
      ['bankLogo','Widget?','null','Optional exact bank mark rendered inside the badge.']
    ],
    flutter: `RibAvatar(
  label: 'Amar',
  color: RibAvatarColor.picture,
  image: const AssetImage('assets/rib/avatar/amar.jpeg'),
)`
  },

  pagination: {
    title: 'Pagination', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Pagination moves through finite result sets. Use compact controls for tables and full controls for dense lists.',
    sections: [
      { title: 'Default',
        html: `<div class="canvas">
          <nav class="ds-pagination"><button><i class="ti ti-chevron-left"></i></button><button class="active">1</button><button>2</button><button>3</button><span>…</span><button>12</button><button><i class="ti ti-chevron-right"></i></button></nav>
        </div>` },
      { title: 'Compact',
        html: `<div class="canvas">
          <nav class="ds-pagination compact"><button><i class="ti ti-chevron-left"></i></button><span>Page 2 of 12</span><button><i class="ti ti-chevron-right"></i></button></nav>
        </div>` }
    ],
    props: [
      ['page','int','required','Current page, 1-based'],
      ['pageCount','int','required','Total pages'],
      ['onChanged','ValueChanged<int>','required','Page selection callback'],
      ['compact','bool','false','Use compact label-only treatment']
    ],
    flutter: `DsPagination(page: 2, pageCount: 12, onChanged: table.goToPage)`
  },

  divider: {
    title: 'Content divider', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Dividers separate related content without adding card weight. Use neutral-grey 70 for lines and keep labels optional.',
    sections: [
      { title: 'Line dividers',
        html: `<div class="canvas col">
          <div class="ds-divider"></div>
          <div class="ds-divider label"><span>Today</span></div>
          <div class="ds-divider dashed"></div>
        </div>` }
    ],
    props: [
      ['label','String?','null','Optional centered label'],
      ['orientation','Axis','horizontal','horizontal · vertical'],
      ['dashed','bool','false','Use dashed treatment in empty states only']
    ],
    flutter: `DsDivider(label: 'Today')`
  },

  stepper: {
    title: 'Stepper', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Steppers show progress through a short linear flow. Use for onboarding, transfer review, and verification steps.',
    sections: [
      { title: 'Progress',
        html: `<div class="canvas">
          <ol class="ds-stepper"><li class="done"><span>1</span><b>Details</b></li><li class="active"><span>2</span><b>Review</b></li><li><span>3</span><b>Confirm</b></li></ol>
        </div>` }
    ],
    props: [
      ['steps','List<String>','required','Step labels'],
      ['currentIndex','int','0','Active step index'],
      ['completed','Set<int>','{}','Completed step indexes']
    ],
    flutter: `DsStepper(steps: const ['Details', 'Review', 'Confirm'], currentIndex: 1)`
  },

  breadcrumbs: {
    title: 'Breadcrumb', group: 'Navigation', status: 'beta', version: '0.1', updated: '29 Aug 2026',
    sandbox: 'breadcrumbs',
    desc: 'The RIB Breadcrumb orients customers within a short hierarchy and pairs that path with a back action and page title. Use one to three concise levels.',
    sections: [
      { title: 'RIB variants',
        note: 'Source: Components - RIB, Breadcrumb node 875:4938. The component preserves the 1–3 item matrix, 472px title row, 8px vertical spacing, and exact exported back, down, and right glyphs.',
        html: renderRibBreadcrumbShowcase() },
      { title: 'Usage contract',
        note: 'The final path item is the current page and is not a link. Earlier levels remain navigable. On narrow screens the title truncates rather than forcing the page wider.',
        html: `<div class="shape-rule-grid">
          <article class="shape-rule-card"><span><i class="ti ti-route"></i></span><div><h3>Keep the path short</h3><code>1–3 items</code><p>Use concise hierarchy labels and stop at three levels, matching the RIB source variants.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-accessible"></i></span><div><h3>Current page is announced</h3><code>aria-current="page"</code><p>The final item is readable but not interactive; separators stay decorative.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-contrast"></i></span><div><h3>Readable by default</h3><code>neutralGrey.120</code><p>GlobalDS raises the source Black 40% label to an AA-safe neutral while retaining the Figma hover treatment.</p></div></article>
        </div>` }
    ],
    props: [
      ['items','List<RibBreadcrumbItem>','required','One to three ordered path items.'],
      ['title','String','required','Current page title in the 16/20 title row.'],
      ['web','bool','true','Shows the breadcrumb path above the title.'],
      ['showDropdown','bool?','item-count rule','Defaults on for one or two items and off for three.'],
      ['onBack','VoidCallback?','null','Back action; null disables interaction.'],
      ['onTitleTap','VoidCallback?','null','Optional title menu action when dropdown is shown.']
    ],
    flutter: `RibBreadcrumb(
  items: const [
    RibBreadcrumbItem(label: 'Transfers'),
    RibBreadcrumbItem(label: 'Beneficiaries'),
  ],
  title: 'Add beneficiary',
  onBack: navigation.goBack,
)`
  },

  toast: {
    title: 'Toast', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Toasts confirm lightweight outcomes without taking over the page. They auto-dismiss and should not contain critical recovery instructions.',
    sections: [
      { title: 'Tones',
        html: `<div class="canvas col">
          <div class="ds-toast success"><i class="ti ti-circle-check"></i><span>Payee added successfully</span><i class="ti ti-x"></i></div>
          <div class="ds-toast info"><i class="ti ti-info-circle"></i><span>Statement download started</span><i class="ti ti-x"></i></div>
          <div class="ds-toast error"><i class="ti ti-alert-circle"></i><span>Could not save changes</span><i class="ti ti-x"></i></div>
        </div>` }
    ],
    props: [
      ['tone','DsTone','success','success · info · warning · error'],
      ['message','String','required','Short confirmation text'],
      ['duration','Duration','3s','Auto-dismiss duration'],
      ['action','DsToastAction?','null','Optional short action']
    ],
    flutter: `DsToast.show(context, tone: DsTone.success, message: 'Payee added successfully')`
  },

  tabs: {
    title: 'Tabs', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Tabs switch between sibling views at the same hierarchy level. Use no more than five tabs and keep labels compact.',
    sections: [
      { title: 'Default',
        html: `<div class="canvas">
          <div class="ds-tabs"><button class="active">Accounts</button><button>Cards</button><button>Deposits</button><button>Loans</button></div>
        </div>` },
      { title: 'Icon tabs',
        html: `<div class="canvas">
          <div class="ds-tabs compact"><button class="active"><i class="ti ti-wallet"></i> Accounts</button><button><i class="ti ti-send"></i> Payments</button><button><i class="ti ti-chart-pie"></i> Insights</button></div>
        </div>` }
    ],
    props: [
      ['tabs','List<String>','required','Tab labels'],
      ['index','int','0','Selected tab index'],
      ['onChanged','ValueChanged<int>','required','Selection callback']
    ],
    flutter: `DsTabs(tabs: const ['Accounts', 'Cards', 'Deposits'], index: 0, onChanged: setTab)`
  },

  tablecells: {
    title: 'Table cells', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Table cells support dense comparison surfaces. Use compact typography, 40px minimum row height and clear alignment for numbers.',
    sections: [
      { title: 'Cells',
        html: `<div class="canvas col">
          <div class="ds-table-demo">
            <div class="head">Date</div><div class="head">Description</div><div class="head right">Amount</div>
            <div>18 Jun</div><div>Interac e-Transfer</div><div class="right debit">- CA$ 250.00</div>
            <div>17 Jun</div><div>Salary credit</div><div class="right credit">+ CA$ 4,200.00</div>
          </div>
        </div>` }
    ],
    props: [
      ['content','Widget','required','Cell content'],
      ['align','TextAlign','start','start · center · end'],
      ['tone','DsTone?','null','Optional semantic amount color'],
      ['sortable','bool','false','Header cell affordance']
    ],
    flutter: `DsTableCell.amount(Money(-250, 'CAD'))`
  },

  tooltips: {
    title: 'Tooltips', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Tooltips explain icons or dense controls on hover/focus. They are supplementary only and must never carry required instructions.',
    sections: [
      { title: 'Placement',
        html: `<div class="canvas">
          <div class="ds-tooltip-demo"><button class="ds-icon-btn"><i class="ti ti-info-circle"></i></button><span class="ds-tooltip">Daily transfer limit</span></div>
          <div class="ds-tooltip-demo below"><button class="ds-icon-btn"><i class="ti ti-download"></i></button><span class="ds-tooltip">Download statement</span></div>
        </div>` }
    ],
    props: [
      ['message','String','required','Short helper text'],
      ['placement','DsTooltipPlacement','top','top · bottom · left · right'],
      ['child','Widget','required','Trigger element']
    ],
    flutter: `DsTooltip(message: 'Daily transfer limit', child: Icon(TablerIcons.info_circle))`
  },

  menuoptions: {
    title: 'Menu options', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Menu options are compact action rows inside dropdowns, overflow menus and command surfaces.',
    sections: [
      { title: 'Options',
        html: `<div class="canvas">
          <div class="ds-menu" style="position:static;width:280px">
            <div class="ds-menu-item"><span><i class="ti ti-edit"></i> Rename account</span></div>
            <div class="ds-menu-item selected"><span><i class="ti ti-star"></i> Set as favourite</span><i class="ti ti-check"></i></div>
            <div class="ds-menu-item danger"><span><i class="ti ti-trash"></i> Remove payee</span></div>
          </div>
        </div>` }
    ],
    props: [
      ['label','String','required','Visible option text'],
      ['leadingIcon','IconData?','null','Optional leading icon'],
      ['selected','bool','false','Selected option state'],
      ['destructive','bool','false','Danger action treatment'],
      ['onTap','VoidCallback','required','Option callback']
    ],
    flutter: `DsMenuOption(label: 'Rename account', leadingIcon: TablerIcons.edit, onTap: rename)`
  },

  virtualkeyboard: {
    title: 'Virtual Keyboard', group: 'Inputs', status: 'beta', version: '0.1', updated: '18 Jun 2026',
    desc: 'Virtual Keyboard is pending final interaction and security review. Use this placeholder for PIN/password flows that require randomized or controlled input surfaces.',
    sections: [
      { title: 'Pending design',
        note: 'The component is included in GlobalDS for inventory completeness, but it should not be used in production flows until security, accessibility and localization rules are finalized.',
        html: `<div class="canvas col">
          <div class="ds-vkeyboard">
            ${['1','2','3','4','5','6','7','8','9','⌫','0','Done'].map(k => `<button${k === 'Done' ? ' class="done"' : ''}>${k}</button>`).join('')}
          </div>
        </div>` }
    ],
    props: [
      ['mode','DsKeyboardMode','numeric','numeric · secureNumeric'],
      ['randomized','bool','false','Randomizes key order for secure entry'],
      ['onKey','ValueChanged<String>','required','Key press handler'],
      ['onSubmit','VoidCallback?','null','Submit handler']
    ],
    flutter: `DsVirtualKeyboard(
  mode: DsKeyboardMode.secureNumeric,
  randomized: true,
  onKey: controller.handleKey,
  onSubmit: controller.submit,
)`
  },

  loadingindicator: {
    title: 'Loading Indicator', group: 'Feedback', status: 'beta', version: '0.1', updated: '18 Jun 2026',
    desc: 'Loading indicators are included as a utility. Prefer button-level loading for submissions and skeleton states for page-level loading.',
    sections: [
      { title: 'Inline',
        html: `<div class="canvas">
          <span class="ds-loading"><span class="ds-spinner"></span> Loading account details</span>
          <button class="ds-btn primary sm" disabled><span class="ds-spinner"></span> Continue</button>
        </div>` },
      { title: 'Page placeholder',
        html: `<div class="canvas col">
          <div class="ds-skeleton" style="width:60%"></div>
          <div class="ds-skeleton" style="width:90%"></div>
          <div class="ds-skeleton" style="width:72%"></div>
        </div>` }
    ],
    props: [
      ['label','String?','null','Optional accessible loading label'],
      ['size','DsLoaderSize','small','small · medium'],
      ['visible','bool','true','Controls visibility']
    ],
    flutter: `DsLoadingIndicator(label: 'Loading account details')`
  },

  radiobutton: {
    title: 'Radio button', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Radio buttons let customers choose one option from a small set. Use them when all options should be visible at once; use dropdowns when the list is long.',
    sections: [
      { title: 'States',
        html: `<div class="canvas col">
          <span class="ds-ctl-row"><span class="ds-radio"></span> Unselected</span>
          <span class="ds-ctl-row"><span class="ds-radio checked"></span> Selected</span>
          <span class="ds-ctl-row"><span class="ds-radio disabled"></span> Disabled</span>
        </div>` },
      { title: 'Option group',
        html: `<div class="canvas col">
          <label class="ds-option-row"><span class="ds-radio checked"></span><span><b>Email</b><small>Receive payment notifications by email.</small></span></label>
          <label class="ds-option-row"><span class="ds-radio"></span><span><b>SMS</b><small>Receive payment notifications by text message.</small></span></label>
        </div>` }
    ],
    props: [
      ['value','T','required','Current selected value'],
      ['groupValue','T','required','Selected value for the group'],
      ['label','String?','null','Visible option label'],
      ['helper','String?','null','Optional supporting text'],
      ['onChanged','ValueChanged<T>?','required','null renders disabled']
    ],
    flutter: `DsRadio<String>(
  value: 'email',
  groupValue: notificationMethod,
  label: 'Email',
  onChanged: setNotificationMethod,
)`
  },

  info: {
    title: 'Info', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Info components provide short contextual help without interrupting the task. Pair the icon with tooltip, inline copy, or a compact callout depending on available space.',
    sections: [
      { title: 'Inline info',
        html: `<div class="canvas col">
          <span class="ds-info-inline">Payee name <i class="ti ti-info-circle"></i></span>
          <div class="ds-info-callout"><i class="ti ti-info-circle"></i><span>Transfers over CA$ 10,000 may require additional verification.</span></div>
        </div>` }
    ],
    props: [
      ['message','String','required','Short contextual copy'],
      ['placement','DsInfoPlacement','inline','inline · callout · tooltip'],
      ['tone','DsTone','neutral','neutral · info · warning']
    ],
    flutter: `DsInfo(message: 'Transfers over CA$ 10,000 may require additional verification.')`
  },

  progress: {
    title: 'Progress', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Progress communicates completion for determinate tasks and current position in short flows. Use loading indicators for unknown duration.',
    sections: [
      { title: 'Linear progress',
        html: `<div class="canvas col">
          <div class="ds-progress"><span style="width:64%"></span></div>
          <div class="ds-progress-meta"><b>Profile completion</b><span>64%</span></div>
        </div>` },
      { title: 'Step progress',
        html: `<div class="canvas">
          <ol class="ds-stepper"><li class="done"><span>1</span><b>Details</b></li><li class="active"><span>2</span><b>Verify</b></li><li><span>3</span><b>Done</b></li></ol>
        </div>` }
    ],
    props: [
      ['value','double','required','0.0 to 1.0 completion'],
      ['label','String?','null','Optional accessible label'],
      ['steps','List<String>?','null','Use step progress when present']
    ],
    flutter: `DsProgress(value: .64, label: 'Profile completion')`
  },

  emptystate: {
    title: 'Empty state', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Empty states explain why a surface has no content and offer one clear next action. Keep the illustration/icon quiet and the copy short.',
    sections: [
      { title: 'Default',
        html: `<div class="canvas">
          <div class="ds-empty-state"><span><i class="ti ti-inbox"></i></span><b>No payees yet</b><p>Add a payee to start sending transfers from this account.</p><button class="ds-btn primary sm"><i class="ti ti-plus"></i> Add payee</button></div>
        </div>` }
    ],
    props: [
      ['title','String','required','Empty-state heading'],
      ['message','String','required','Short explanation'],
      ['action','DsButtonAction?','null','Primary recovery action'],
      ['icon','IconData?','null','Quiet illustrative icon']
    ],
    flutter: `DsEmptyState(title: 'No payees yet', message: 'Add a payee to start sending transfers.', action: addPayee)`
  },

  upload: {
    title: 'Upload', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Upload accepts supporting documents with clear file requirements, progress and error states.',
    sections: [
      { title: 'Drop zone',
        html: `<div class="canvas col">
          <div class="ds-upload"><i class="ti ti-cloud-upload"></i><b>Upload proof of address</b><p>PDF, JPG or PNG up to 5 MB</p><button class="ds-btn secondary-outline sm">Choose file</button></div>
          <div class="ds-file-row"><i class="ti ti-file-text"></i><span><b>statement.pdf</b><small>2.4 MB · uploaded</small></span><i class="ti ti-check"></i></div>
        </div>` }
    ],
    props: [
      ['accept','List<String>','required','Allowed file types'],
      ['maxSizeMb','int','5','Maximum file size'],
      ['state','DsUploadState','idle','idle · uploading · uploaded · error'],
      ['onSelect','VoidCallback','required','Opens file picker']
    ],
    flutter: `DsUpload(accept: const ['pdf', 'jpg', 'png'], maxSizeMb: 5, onSelect: pickFile)`
  },

  sliders: {
    title: 'Sliders', group: 'Inputs', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Sliders adjust bounded numeric values where approximate selection is acceptable. Pair them with visible min, max and current value.',
    sections: [
      { title: 'Amount slider',
        html: `<div class="canvas col">
          <div class="ds-slider-row"><div><b>Daily transfer limit</b><small>CA$ 5,000 of CA$ 10,000</small></div><span>50%</span></div>
          <div class="ds-slider"><span style="width:50%"></span><i style="left:50%"></i></div>
        </div>` }
    ],
    props: [
      ['value','double','required','Current value'],
      ['min','double','required','Minimum'],
      ['max','double','required','Maximum'],
      ['onChanged','ValueChanged<double>','required','Value callback']
    ],
    flutter: `DsSlider(value: limit, min: 0, max: 10000, onChanged: setLimit)`
  },

  stackedbutton: {
    title: 'Stacked button', group: 'Actions', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Stacked buttons arrange primary and secondary actions vertically for mobile dialogs, drawers and narrow cards.',
    sections: [
      { title: 'Mobile stack',
        html: `<div class="canvas">
          <div class="ds-stacked-actions"><button class="ds-btn primary lg mobile block">Authenticate with OTP</button><button class="ds-btn secondary-outline lg mobile block">Cancel</button><button class="ds-btn tertiary sm mobile block">Use another method</button></div>
        </div>` }
    ],
    props: [
      ['primary','DsButtonAction','required','Primary action'],
      ['secondary','DsButtonAction?','null','Secondary action'],
      ['tertiary','DsButtonAction?','null','Optional low-emphasis action']
    ],
    flutter: `DsStackedButton(primary: authenticate, secondary: cancel)`
  },

  lists: {
    title: 'Lists', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Lists organize repeated rows such as payees, settings and account actions. Rows use compact type, optional icon/avatar and a clear trailing affordance.',
    sections: [
      { title: 'Action list',
        html: `<div class="canvas">
          <div class="ds-list">
            <div class="ds-list-row"><i class="ti ti-user-plus"></i><span><b>Add new payee</b><small>Send money to someone new</small></span><i class="ti ti-chevron-right"></i></div>
            <div class="ds-list-row"><i class="ti ti-shield-check"></i><span><b>Security settings</b><small>Manage verification methods</small></span><i class="ti ti-chevron-right"></i></div>
            <div class="ds-list-row"><i class="ti ti-file-text"></i><span><b>Statements</b><small>Download account documents</small></span><i class="ti ti-chevron-right"></i></div>
          </div>
        </div>` }
    ],
    props: [
      ['items','List<DsListItem>','required','Rows to render'],
      ['dense','bool','false','Use compact row height'],
      ['onTap','ValueChanged<int>?','null','Row action callback']
    ],
    flutter: `DsList(items: settingsItems, onTap: openItem)`
  },

  activitytimeline: {
    title: 'Activity timeline', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Activity timelines show chronological events such as transfer status, verification progress and servicing history.',
    sections: [
      { title: 'Timeline',
        html: `<div class="canvas">
          <ol class="ds-timeline"><li class="done"><span></span><b>Transfer created</b><small>Today, 09:12</small></li><li class="done"><span></span><b>OTP verified</b><small>Today, 09:14</small></li><li><span></span><b>Recipient bank processing</b><small>Expected within 1 business day</small></li></ol>
        </div>` }
    ],
    props: [
      ['items','List<DsTimelineItem>','required','Chronological events'],
      ['currentIndex','int?','null','Current event index'],
      ['dense','bool','false','Compact layout']
    ],
    flutter: `DsActivityTimeline(items: transfer.events)`
  },

  accordions: {
    title: 'Accordion', group: 'Display', status: 'beta', version: '0.1', updated: '28 Aug 2026',
    sandbox: 'accordion',
    desc: 'The RIB Accordion is a controlled Flutter disclosure component for the International Geographies Internet Banking Revamp. This contract is intentionally scoped to RIB and mirrors the five presentations in Components - RIB.',
    sections: [
      { title: 'RIB variants and states',
        note: 'Source: Components - RIB, Accordion node 3981:10048. The matrix preserves the Figma typography, spacing, borders, surfaces and exported glyphs. Specimens are uniformly previewed at 118% for review on a 1200 × 800 desktop frame; typography, sizing, spacing and surface behaviour remain 1:1 with Figma.',
        html: renderRibAccordionShowcase() },
      { title: 'Behaviour contract',
        note: 'Use one controlled expanded value per item. The parent decides whether a group permits one or several open items, which keeps business behaviour outside the visual component. Preview scaling is presentation-only and does not change the component contract. AA contrast correction: Figma\'s Grey 110 body copy is promoted to Grey 120 on Cool Grey 90, increasing contrast from 3.78:1 to 5.41:1 while preserving the layout.',
        html: `<div class="shape-rule-grid">
          <article class="shape-rule-card"><span><i class="ti ti-click"></i></span><div><h3>Whole header toggles</h3><code>onChanged(!expanded)</code><p>The complete header is one semantic button with an exposed expanded state.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-accessible"></i></span><div><h3>Keyboard and screen reader ready</h3><code>Semantics(expanded: …)</code><p>Enter or Space activates the disclosure and collapsed content leaves the semantic tree.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-language"></i></span><div><h3>Content owns wrapping</h3><code>title + Widget content</code><p>Titles and body content wrap without fixed-height clipping for internationalised copy.</p></div></article>
        </div>` }
    ],
    props: [
      ['title','String','required','Visible disclosure label.'],
      ['content','Widget','required','Expanded content; text is styled through DefaultTextStyle.'],
      ['expanded','bool','required','Controlled collapsed or expanded state.'],
      ['onChanged','ValueChanged<bool>','required','Receives the requested next state.'],
      ['variant','RibAccordionVariant','plain','plain · noContainer · colouredBackground · standardContainer · explanationContainer'],
      ['subtitle','String?','null','Supporting line used by explanationContainer.'],
      ['leading','Widget?','variant default','Override the RIB leading icon when product context requires it.'],
      ['animationDuration','Duration','200ms','Expand/collapse motion duration.']
    ],
    flutter: `RibAccordion(
  title: 'Where will my LAS Account be opened?',
  content: const Text(
    'Your LAS Account will be opened at the branch specified by you.',
  ),
  expanded: expandedQuestion == 0,
  variant: RibAccordionVariant.plain,
  onChanged: (expanded) {
    setState(() => expandedQuestion = expanded ? 0 : null);
  },
)`
  },

  'activity-timeline': {
    title: 'Activity timeline', group: 'Display', status: 'beta', version: '0.1', updated: '29 Aug 2026',
    sandbox: 'activity-timeline',
    desc: 'The RIB Activity timeline presents the ordered state of banking events as compact connected cards. It supports single- and double-line content, four operational states, and an optional trailing navigation affordance.',
    sections: [
      { title: 'RIB variants and states',
        note: 'Source: Components - RIB, Activity timeline node 3981:10047. Cards preserve the Figma 288px width, 12px rhythm, 12px radius, Button White shadow, exact exported state glyphs, and single- or double-line typography. AA contrast correction: completed status copy uses Success 110 and warning status copy uses Neutral Grey 140; the Figma glyph colour and geometry remain exact.',
        html: renderRibActivityTimelineShowcase() },
      { title: 'Behaviour contract',
        note: 'The timeline is an ordered list, not a stepper: it reports events that have happened or are in progress and does not imply that customers can move between stages. State is always exposed through text and semantics, never colour alone.',
        html: `<div class="shape-rule-grid">
          <article class="shape-rule-card"><span><i class="ti ti-list-numbers"></i></span><div><h3>Order carries meaning</h3><code>List&lt;RibActivityTimelineItem&gt;</code><p>Render events in chronological or reverse-chronological order and keep that policy explicit at the call site.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-accessible"></i></span><div><h3>State is announced</h3><code>Semantics(label: …)</code><p>Icons reinforce Inactive, Completed, Warning and Failed labels; colour never communicates the state by itself.</p></div></article>
          <article class="shape-rule-card"><span><i class="ti ti-chevron-right"></i></span><div><h3>Chevron means action</h3><code>rightIcon + onItemTap</code><p>Only show the trailing chevron when the complete card opens a related activity detail.</p></div></article>
        </div>` }
    ],
    props: [
      ['items','List<RibActivityTimelineItem>','required','Ordered activity events with label, supporting content, value and state.'],
      ['type','RibActivityTimelineType','singleLine','singleLine · doubleLine'],
      ['rightIcon','bool','false','Shows a trailing chevron when items open details.'],
      ['onItemTap','ValueChanged<int>?','null','Activates a card by index; required when rightIcon is true.'],
      ['shrinkWrap','bool','true','Sizes the timeline to its content for embedded banking surfaces.']
    ],
    flutter: `RibActivityTimeline(
  type: RibActivityTimelineType.doubleLine,
  rightIcon: true,
  items: transferEvents,
  onItemTap: (index) => openTransferEvent(transferEvents[index]),
)`
  },

  banners: {
    title: 'Banners', group: 'Feedback', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Banners communicate page-level status or guidance. Keep them dismissible when informational and persistent when action is required.',
    sections: [
      { title: 'Tones',
        html: `<div class="canvas col">
          <div class="ds-banner info"><i class="ti ti-info-circle"></i><span><b>Profile update required</b><small>Confirm your Canadian address to keep transfers active.</small></span><button class="ds-btn tertiary xs">Update</button></div>
          <div class="ds-banner warning"><i class="ti ti-alert-triangle"></i><span><b>Scheduled maintenance</b><small>Transfers may be unavailable tonight from 02:00 to 04:00 EST.</small></span></div>
          <div class="ds-banner error"><i class="ti ti-alert-circle"></i><span><b>Payment failed</b><small>Try again or choose another account.</small></span></div>
        </div>` }
    ],
    props: [
      ['tone','DsTone','info','info · warning · error · success'],
      ['title','String','required','Short status headline'],
      ['message','String?','null','Supporting copy'],
      ['action','DsButtonAction?','null','Optional action']
    ],
    flutter: `DsBanner(tone: DsTone.warning, title: 'Scheduled maintenance', message: maintenanceCopy)`
  },

  sidedrawer: {
    title: 'Side drawer', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Side drawers hold secondary workflows without leaving the current page. Use them for review, filters, details and lightweight edit flows.',
    sections: [
      { title: 'Drawer anatomy',
        html: `<div class="canvas">
          <aside class="ds-drawer"><header><b>Add new payee</b><i class="ti ti-x"></i></header><div class="drawer-body"><div class="ifield-example"><span class="ifield-floating">Payee name</span><div class="ifield-shell"><span class="ifield-value is-placeholder">Enter payee name</span></div></div><div class="ifield-example"><span class="ifield-floating">Notification method</span><div class="ifield-shell"><span class="ifield-value is-placeholder">Select notification method</span><i class="ti ti-chevron-down ifield-trailing"></i></div></div></div><footer><button class="ds-btn primary lg mobile block" disabled>Authenticate with OTP</button></footer></aside>
        </div>` }
    ],
    props: [
      ['title','String','required','Drawer title'],
      ['open','bool','required','Visibility'],
      ['onClose','VoidCallback','required','Close callback'],
      ['actions','List<DsButtonAction>','[]','Footer actions']
    ],
    flutter: `DsSideDrawer(title: 'Add new payee', open: isOpen, onClose: closeDrawer, child: form)`
  },

  alerts: {
    title: 'Alerts & banners', group: 'Feedback', status: 'beta', version: '0.9', updated: '05 Jun 2026',
    desc: 'Inline alerts explain what happened and what to do next, in place. Use error alerts above forms for submission failures, warning banners for maintenance windows, success confirmations after non-navigating actions.',
    sections: [
      { title: 'Tones',
        html: `<div class="canvas col">
          <div class="ds-alert info"><i class="ti ti-info-circle"></i><div class="ds-alert-body"><strong>Heads up</strong>Transfers over CA$ 10,000 need a one-time security check.</div><i class="ti ti-x ds-alert-x"></i></div>
          <div class="ds-alert success"><i class="ti ti-circle-check"></i><div class="ds-alert-body"><strong>Payee added</strong>Sarah Chen can now receive Interac e-Transfers from you.</div><i class="ti ti-x ds-alert-x"></i></div>
          <div class="ds-alert warning"><i class="ti ti-alert-triangle"></i><div class="ds-alert-body"><strong>Scheduled maintenance</strong>Transfers will be unavailable 14 Jun, 02:00–04:00 EST.</div></div>
          <div class="ds-alert error"><i class="ti ti-alert-circle"></i><div class="ds-alert-body"><strong>Transfer failed</strong>Your daily limit was reached. Try again tomorrow or raise your limit.</div></div>
        </div>` }
    ],
    props: [
      ['tone','DsTone','info','info · success · warning · error'],
      ['title','String','required','Bold first line — what happened'],
      ['message','String?','null','What to do next'],
      ['dismissible','bool','false','Shows the close affordance'],
      ['action','DsAlertAction?','null','Optional inline action (label + callback)']
    ],
    flutter: `DsAlert(
  tone: DsTone.warning,
  title: 'Scheduled maintenance',
  message: 'Transfers will be unavailable 14 Jun, 02:00–04:00 EST.',
  dismissible: true,
)`
  },

  tiles: {
    title: 'Tiles', group: 'Display', status: 'stable', version: '1.1', updated: '30 May 2026',
    desc: 'Transaction rows and settings rows. Credits are green with an explicit plus; debits stay neutral — red is reserved for failures, not spending. Pending rows carry a badge, not a color change on the amount.',
    sections: [
      { title: 'Transaction tiles',
        html: `<div class="canvas col" style="gap:0">
          <div style="border:1px solid var(--gray-200);border-radius:12px;overflow:hidden">
            <div class="ds-tile">
              <div class="ds-tile-ic"><i class="ti ti-arrow-down-left"></i></div>
              <div class="ds-tile-body"><b>Salary — TechCorp Inc.</b><small>Today, 09:12</small></div>
              <span class="ds-amount credit">+ CA$ 4,200.00</span>
            </div>
            <div class="ds-tile">
              <div class="ds-tile-ic"><i class="ti ti-arrow-up-right"></i></div>
              <div class="ds-tile-body"><b>Interac e-Transfer · Sarah Chen</b><small>Yesterday</small></div>
              <span class="ds-amount debit">− CA$ 250.00</span>
            </div>
            <div class="ds-tile">
              <div class="ds-tile-ic"><i class="ti ti-clock"></i></div>
              <div class="ds-tile-body"><b>Hydro-Québec</b><small>Bill payment</small></div>
              <span class="ds-badge warning">Pending</span>
            </div>
          </div>
        </div>` }
    ],
    props: [
      ['title','String','required','Merchant or payee'],
      ['subtitle','String?','null','Date or category'],
      ['amount','Money?','null','Signed amount — sign drives color'],
      ['status','DsTone?','null','Replaces amount with a status badge'],
      ['leadingIcon','IconData','required','Category icon in a gray circle'],
      ['onTap','VoidCallback?','null','Opens transaction detail']
    ],
    flutter: `DsListTile(
  title: 'Interac e-Transfer · Sarah Chen',
  subtitle: 'Yesterday',
  amount: Money(-250.00, 'CAD'),
  leadingIcon: TablerIcons.arrow_up_right,
  onTap: () => context.push('/transactions/tx_8841'),
)`
  },

  navigation: {
    title: 'Navigation', group: 'Navigation', status: 'beta', version: '0.9', updated: '18 Jun 2026',
    desc: 'Navigation basics cover web TopNav, web SideNav, mobile app bar and bottom navigation. Keep navigational surfaces quiet and predictable: white surfaces, thin borders, compact rows and clear selected states.',
    sections: [
      { title: 'TopNav',
        note: 'TopNav is the web shell header. It carries the product context, optional help action and user controls without competing with page content.',
        html: `<div class="canvas col">
          <div class="ds-topnav">
            <div class="ds-topnav-brand"><span class="dh-mark">i</span><strong>ICICI Global RIB</strong></div>
            <div class="ds-topnav-tabs"><span class="active">Accounts</span><span>Payments</span><span>Offers</span><span>Support</span></div>
            <div class="ds-topnav-actions"><button class="ds-btn secondary-outline xs">Help</button><span class="ds-avatar">DH</span></div>
          </div>
        </div>` },
      { title: 'SideNav',
        note: 'SideNav rows are 32px high with 16px icons. Selected rows use a white pill/card, subtle shadow and primary icon color.',
        html: `<div class="canvas">
          <nav class="ds-sidenav">
            <a class="active"><i class="ti ti-home"></i>Home</a>
            <a><i class="ti ti-wallet"></i>Accounts</a>
            <a><i class="ti ti-building-bank"></i>Deposits</a>
            <a><i class="ti ti-send"></i>Payments</a>
            <a><i class="ti ti-headset"></i>Customer service<i class="ti ti-chevron-down"></i></a>
          </nav>
        </div>` },
      { title: 'App bar',
        html: `<div class="canvas col">
          <div style="width:100%;max-width:340px;border:1px solid var(--gray-200);border-radius:12px;overflow:hidden">
            <div class="ds-appbar"><i class="ti ti-chevron-left"></i><b>Review transfer</b><i class="ti ti-help-circle"></i></div>
          </div>
        </div>` },
      { title: 'Bottom navigation',
        html: `<div class="canvas col">
          <div style="width:100%;max-width:340px;border:1px solid var(--gray-200);border-radius:12px;overflow:hidden">
            <div class="ds-bottomnav">
              <div class="bn-item active"><i class="ti ti-home"></i>Home</div>
              <div class="bn-item"><i class="ti ti-send"></i>Payments</div>
              <div class="bn-item"><i class="ti ti-chart-pie"></i>Insights</div>
              <div class="bn-item"><i class="ti ti-user"></i>Profile</div>
            </div>
          </div>
        </div>` }
    ],
    props: [
      ['title','String','required','App bar title, centered'],
      ['onBack','VoidCallback?','null','Hides the back chevron when null'],
      ['action','DsAppBarAction?','null','Single trailing action maximum'],
      ['currentIndex','int','0','Bottom nav — selected destination'],
      ['onDestination','ValueChanged<int>','required','Bottom nav tap handler']
    ],
    flutter: `DsScaffold(
  appBar: DsAppBar(title: 'Review transfer', onBack: context.pop),
  bottomNav: DsBottomNav(
    currentIndex: 1,
    onDestination: (i) => context.go(DsRoutes.byIndex(i)),
  ),
  body: const TransferReviewView(),
)`
  }
};

/* Render helpers shared by app.js */
function statusPill(status){
  const map = { stable:'success', beta:'info', 'in review':'warning', deprecated:'error' };
  const cls = map[(status||'').toLowerCase()] || 'neutral';
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return '<span class="pill ' + cls + '">' + esc(label) + '</span>';
}
