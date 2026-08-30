/* ============================================================
   ICICI Global DS — sandbox (component playground)
   Toggle props/states, see the component live, and get the
   matching Flutter call generated underneath.
   ============================================================ */

const RIB_ACCORDION_FAQS = [
  {
    question: 'When will the beneficiary receive my transfer?',
    category: 'Delivery time',
    answer: 'Most international transfers arrive within 1–3 business days. The receiving bank, destination country and local holidays can affect the final delivery time.'
  },
  {
    question: 'What exchange rate will be applied?',
    category: 'Exchange rate',
    answer: 'The applicable exchange rate and fees are shown before you confirm the transfer. Review the final debit amount and beneficiary amount before continuing.'
  },
  {
    question: 'Why is my transfer still pending?',
    category: 'Transfer status',
    answer: 'A transfer may remain pending while beneficiary details, compliance checks or the receiving bank are being verified. You can track its latest status from Transfer history.'
  },
  {
    question: 'Can I cancel an international transfer?',
    category: 'Cancellation',
    answer: 'You can request cancellation while the transfer is still eligible. Once processing has started with the receiving bank, cancellation may no longer be available.'
  }
];

function renderRibAccordionScenario(p){
  const webVariant = p.variant.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
  const expandedIndex = Number(p.expandedIndex);
  return `<section class="rib-accordion-scenario" aria-label="International transfer FAQ example">
    <header class="rib-accordion-scenario__header">
      <span>Help centre</span>
      <h2>International transfers</h2>
      <p>Find answers to common questions about sending money abroad.</p>
    </header>
    <div class="rib-accordion-scenario__list is-${webVariant}">
      ${RIB_ACCORDION_FAQS.map((item, index) => `<div class="rib-accordion-preview-scale">${renderRibAccordion({
          id:`sandbox-faq-${index}`,
          index,
          variant:webVariant,
          expanded:expandedIndex === index,
          title:item.question,
          subtitle:item.category,
          body:item.answer
        })}</div>`).join('')}
    </div>
    <footer class="rib-accordion-scenario__footer"><i class="ti ti-lock" aria-hidden="true"></i><span>Answers are shown in a secure banking help context.</span></footer>
  </section>`;
}

const RIB_ACTIVITY_CALENDAR_EVENTS = [
  { dateLabel:'Today', label:'Label text', subLabel:'Sub label', state:'current' },
  { dateLabel:'02 Jan', label:'Label text', subLabel:'Sub label', state:'completed' },
  { dateLabel:'2023', divider:true },
  { dateLabel:'02 Dec', label:'Label text', subLabel:'Sub label', state:'inactive' },
  { dateLabel:'02 Nov', label:'Label text', subLabel:'Sub label', state:'failed' }
];

function renderRibActivityScenario(p){
  return renderRibActivityCalendar({
    ariaLabel:'Calendar activity timeline',
    currentState:p.todayState === 'inactive' ? 'inactive' : 'current',
    showYearDivider:Boolean(p.showYearDivider),
    items:RIB_ACTIVITY_CALENDAR_EVENTS
  });
}

function renderRibAvatarScenario(p){
  if(p.presentation === 'group'){
    return `<section class="rib-avatar-scenario" aria-label="International transfer beneficiaries">
      <span class="rib-avatar-scenario__eyebrow">Beneficiaries</span>
      ${renderRibAvatarGroup({ headline:p.headline, ariaLabel:'Saved beneficiaries' })}
    </section>`;
  }
  return `<section class="rib-avatar-scenario is-single" aria-label="Selected beneficiary">
    <span class="rib-avatar-scenario__eyebrow">Selected beneficiary</span>
    ${renderRibAvatar({
      label:p.label,
      initials:p.initials,
      color:p.color,
      bankLogo:Boolean(p.bankLogo)
    })}
  </section>`;
}

function ribBreadcrumbItems(p){
  const count = Math.min(3, Math.max(1, Number(p.itemCount) || 1));
  const labels = String(p.items || '').split(',').map(label => label.trim()).filter(Boolean).slice(0, count);
  while(labels.length < count) labels.push(`Item ${labels.length + 1}`);
  return labels;
}

function renderRibBreadcrumbScenario(p){
  return `<section class="rib-breadcrumb-scenario" aria-label="Account services page header">
    <span class="rib-breadcrumb-scenario__eyebrow">Account services</span>
    ${renderRibBreadcrumb({
      items:ribBreadcrumbItems(p),
      title:p.title,
      web:Boolean(p.web),
      dropDown:Boolean(p.dropDown),
      ariaLabel:'Account services breadcrumb'
    })}
  </section>`;
}

function renderRibButtonScenario(p){
  const resolvedSize = p.variant === 'secondary' ? 'sm' : p.size;
  return `<section class="rib-button-scenario" aria-label="Transfer action example">
    <span class="rib-button-scenario__eyebrow">International transfer</span>
    <div class="rib-button-scenario__copy">
      <h2>Ready to send?</h2>
      <p>Review the beneficiary and transfer amount before continuing.</p>
    </div>
    <div class="rib-button-scenario__actions">
      ${renderRibButton({
        label:p.text,
        variant:p.variant,
        size:resolvedSize,
        state:p.state,
        icon:p.icon,
        expanded:Boolean(p.expanded)
      })}
      ${renderRibButton({ label:'Cancel', variant:'outline', size:p.size === 'xs' ? 'xs' : p.size })}
    </div>
  </section>`;
}

function renderRibCalendarScenario(p){
  const state = ribCalendarState(p.mode, p.state);
  return `<section class="rib-calendar-scenario" aria-label="Transfer date example">
    <div class="rib-calendar-scenario__copy"><span>International transfer</span><h2>Choose a transfer date</h2><p>Select when the payment should leave your account.</p></div>
    ${renderRibCalendar({ mode:p.mode, state })}
  </section>`;
}

const SANDBOX = {

  button: {
    label: 'RIB Button',
    controls: [
      { key:'text',    label:'Label',        type:'text',   value:'Send money' },
      { key:'variant', label:'Variant',      type:'select', options:['primary','outline','secondary','pastel','white','destructive-outline','destructive-filled'], value:'primary' },
      { key:'size',    label:'Size',         type:'select', options:['lg','sm','xs'], value:'lg' },
      { key:'state',   label:'State',        type:'select', options:['default','hover','focus','disabled'], value:'default' },
      { key:'icon',    label:'Icon',         type:'select', options:['none','left','right'], value:'left' },
      { key:'expanded',label:'Full width',    type:'toggle', value:false }
    ],
    render(p){
      return renderRibButtonScenario(p);
    },
    dart(p){
      const resolvedSize = p.variant === 'secondary' ? 'sm' : p.size;
      const variantMap = {
        'primary': 'primary',
        'outline': 'outline',
        'secondary': 'secondary',
        'pastel': 'pastel',
        'white': 'white',
        'destructive-outline': 'destructiveOutline',
        'destructive-filled': 'destructiveFilled'
      };
      const lines = [
        "label: '" + p.text.replace(/'/g, "\\'") + "'",
        'variant: RibButtonVariant.' + (variantMap[p.variant] || p.variant.replace(/-([a-z])/g, (_, c) => c.toUpperCase())),
        'size: RibButtonSize.' + (resolvedSize === 'lg' ? 'large' : resolvedSize === 'sm' ? 'small' : 'xSmall')
      ];
      if (p.icon === 'left') lines.push('leadingIcon: const Icon(Icons.add)');
      if (p.icon === 'right') lines.push('trailingIcon: const Icon(Icons.add)');
      lines.push('expanded: ' + p.expanded);
      lines.push(p.state === 'disabled' ? 'onPressed: null' : 'onPressed: () => handleTap()');
      return 'RibButton(\n  ' + lines.join(',\n  ') + ',\n)';
    }
  },

  calendar: {
    label:'RIB Calendar',
    controls:[
      { key:'mode', label:'Variant', type:'select', options:['date','range','month-year'], value:'date' },
      { key:'state', label:'State', type:'select', options:['No date selected','Hover','Selected','Default','Start date hover','Start date selected','End date hover','End date selected'], value:'Selected' }
    ],
    render(p){
      return renderRibCalendarScenario(p);
    },
    dart(p){
      const mode = p.mode === 'month-year' ? 'monthYear' : p.mode;
      const lines = [
        `mode: RibCalendarMode.${mode}`,
        `month: DateTime(${p.mode === 'date' ? '2023' : '2020'}, 10)`
      ];
      if(p.mode === 'date' && p.state === 'Selected') lines.push('selectedDate: DateTime(2023, 10, 8)');
      if(p.mode === 'range' && ['Start date selected','End date hover','End date selected'].includes(p.state)) lines.push('rangeStart: DateTime(2020, 10, 8)');
      if(p.mode === 'range' && p.state === 'End date selected') lines.push('rangeEnd: DateTime(2020, 10, 16)');
      lines.push('onDateSelected: (date) => setState(() => selectedDate = date)');
      return 'RibCalendar(\n  ' + lines.join(',\n  ') + ',\n)';
    }
  },

  accordion: {
    label: 'RIB Accordion',
    defaults: { expandedIndex:0 },
    controls: [
      { key:'variant', label:'Variant', type:'select', options:['plain','noContainer','colouredBackground','standardContainer','explanationContainer'], value:'standardContainer' },
      { key:'allowCollapseAll', label:'Allow all items closed', type:'toggle', value:true }
    ],
    render(p){
      return renderRibAccordionScenario(p);
    },
    dart(p){
      const subtitle = p.variant === 'explanationContainer'
        ? '            subtitle: item.category,\n'
        : '';
      const collapsedValue = p.allowCollapseAll ? 'null' : 'index';
      return `Column(
  children: List.generate(faqItems.length, (index) {
    final item = faqItems[index];
    return Padding(
      padding: const EdgeInsets.only(bottom: DsSpacing.md),
      child: RibAccordion(
        title: item.question,
        content: Text(item.answer),
${subtitle}        expanded: expandedQuestionIndex == index,
        variant: RibAccordionVariant.${p.variant},
        onChanged: (isExpanded) {
          setState(() {
            expandedQuestionIndex = isExpanded ? index : ${collapsedValue};
          });
        },
      ),
    );
  }),
)`;
    }
  },

  'activity-timeline': {
    label: 'RIB Activity timeline',
    controls: [
      { key:'todayState', label:"Today's state", type:'select', options:['default','inactive'], value:'default' },
      { key:'showYearDivider', label:'Year divider', type:'toggle', value:true }
    ],
    render(p){
      return renderRibActivityScenario(p);
    },
    dart(p){
      const currentState = p.todayState === 'inactive' ? 'inactive' : 'current';
      return `RibActivityCalendarTimeline(
  items: calendarEvents,
  currentState: RibActivityTimelineState.${currentState},
  showYearDivider: ${p.showYearDivider},
)`;
    }
  },

  avatar: {
    label: 'RIB Avatar',
    controls: [
      { key:'presentation', label:'Presentation', type:'select', options:['single','group'], value:'group' },
      { key:'color', label:'Mnemonic colour', type:'select', options:['picture','orange','blue','gold','maroon','multi'], value:'picture' },
      { key:'label', label:'Name', type:'text', value:'Amar' },
      { key:'initials', label:'Initials', type:'text', value:'A' },
      { key:'headline', label:'Group headline', type:'text', value:'Recent beneficiaries' },
      { key:'bankLogo', label:'Bank logo', type:'toggle', value:false }
    ],
    render(p){
      return renderRibAvatarScenario(p);
    },
    dart(p){
      if(p.presentation === 'group'){
        return `RibAvatarGroup(
  headline: '${p.headline.replace(/'/g, "\\'")}',
  avatars: beneficiaries,
)`;
      }
      const image = p.color === 'picture'
        ? "\n  image: const AssetImage('assets/rib/avatar/amar.jpeg'),"
        : '';
      const bankLogo = p.bankLogo
        ? '\n  bankLogo: bankLogo,'
        : '';
      return `RibAvatar(
  label: '${p.label.replace(/'/g, "\\'")}',
  initials: '${p.initials.replace(/'/g, "\\'")}',
  color: RibAvatarColor.${p.color},${image}${bankLogo}
)`;
    }
  },

  breadcrumbs: {
    label: 'RIB Breadcrumb',
    controls: [
      { key:'itemCount', label:'Number of items', type:'select', options:['1','2','3'], value:'3' },
      { key:'items', label:'Path labels (comma separated)', type:'text', value:'Transfers, Beneficiaries, Add beneficiary' },
      { key:'title', label:'Page title', type:'text', value:'Add beneficiary' },
      { key:'web', label:'Show web path', type:'toggle', value:true },
      { key:'dropDown', label:'Title dropdown', type:'toggle', value:false }
    ],
    render(p){
      return renderRibBreadcrumbScenario(p);
    },
    dart(p){
      const items = ribBreadcrumbItems(p).map(label => `    RibBreadcrumbItem(label: '${label.replace(/'/g, "\\'")}'),`).join('\n');
      return `RibBreadcrumb(
  items: const [
${items}
  ],
  title: '${p.title.replace(/'/g, "\\'")}',
  web: ${p.web},
  showDropdown: ${p.dropDown},
  onBack: navigation.goBack,
)`;
    }
  },

  textfield: {
    label: 'Text field',
    controls: [
      { key:'label',    label:'Label',          type:'text',   value:'User ID' },
      { key:'value',    label:'Value',          type:'text',   value:'' },
      { key:'hint',     label:'Placeholder',    type:'text',   value:'Enter your user ID' },
      { key:'helper',   label:'Helper text',    type:'text',   value:'As printed on your welcome kit.' },
      { key:'state',    label:'State',          type:'select', options:['default','focus','error','disabled'], value:'default' },
      { key:'icon',     label:'Prefix icon',    type:'toggle', value:true },
      { key:'password', label:'Password mode',  type:'toggle', value:false }
    ],
    render(p){
      let cls = 'ds-field';
      if (p.state === 'focus') cls += ' is-focus';
      if (p.state === 'error') cls += ' is-error';
      if (p.state === 'disabled') cls += ' is-disabled';
      const helper = p.state === 'error' ? 'This doesn\'t look right — check and retry.' : p.helper;
      return '<div class="' + cls + '">' +
        '<label>' + esc(p.label) + '</label>' +
        '<div class="ds-input">' +
        (p.icon ? '<i class="ti ti-user"></i>' : '') +
        '<input ' + (p.password ? 'type="password" ' : '') +
        (p.value ? 'value="' + esc(p.value) + '" ' : '') +
        'placeholder="' + esc(p.hint) + '"' + (p.state === 'disabled' ? ' disabled' : '') + '>' +
        (p.password ? '<i class="ti ti-eye"></i>' : '') +
        '</div>' +
        (helper ? '<span class="ds-help">' + esc(helper) + '</span>' : '') +
        '</div>';
    },
    dart(p){
      const lines = ["label: '" + p.label.replace(/'/g, "\\'") + "'"];
      if (p.hint) lines.push("hint: '" + p.hint.replace(/'/g, "\\'") + "'");
      if (p.helper) lines.push("helper: '" + p.helper.replace(/'/g, "\\'") + "'");
      if (p.icon) lines.push('prefixIcon: TablerIcons.user');
      if (p.password) lines.push('obscure: true');
      if (p.state === 'error') lines.push("errorText: 'This doesn\\'t look right — check and retry.'");
      if (p.state === 'disabled') lines.push('enabled: false');
      lines.push('onChanged: (value) => controller.update(value)');
      return 'DsTextField(\n  ' + lines.join(',\n  ') + ',\n)';
    }
  },

  otp: {
    label: 'OTP & grid card',
    controls: [
      { key:'length',  label:'Length',  type:'select', options:['4','6'], value:'6' },
      { key:'state',   label:'State',   type:'select', options:['default','typing','filled','error','success'], value:'typing' },
      { key:'grouped', label:'Grouped (6-digit)', type:'toggle', value:true },
      { key:'masked',  label:'Masked digits',     type:'toggle', value:false }
    ],
    render(p){
      const n = parseInt(p.length, 10);
      const digits = ['3','1','0','9','2','7'];
      const half = n / 2;
      let boxes = [];
      for (let i = 0; i < n; i++) {
        let cls = 'ds-otp-box', content = '';
        if (p.state === 'typing') {
          const cursor = Math.ceil(n / 2) - 1;
          if (i < cursor) { cls += p.masked ? ' dot filled' : ' filled'; content = p.masked ? '' : digits[i]; }
          else if (i === cursor) cls += ' active';
        } else if (p.state === 'filled') {
          cls += p.masked ? ' dot filled' : ' filled'; content = p.masked ? '' : digits[i];
        } else if (p.state === 'error') {
          cls += p.masked ? ' dot error' : ' error'; content = p.masked ? '' : digits[i];
        } else if (p.state === 'success') {
          cls += p.masked ? ' dot success' : ' success'; content = p.masked ? '' : digits[i];
        } else if (i === 0) {
          cls += ' active';
        }
        boxes.push('<div class="' + cls + '">' + content + '</div>');
      }
      if (n === 6 && p.grouped) boxes.splice(half, 0, '<span class="ds-otp-sep"></span>');
      return '<div class="ds-otp">' + boxes.join('') + '</div>';
    },
    dart(p){
      const stateMap = { default:'idle', typing:'active', filled:'idle', error:'error', success:'success' };
      return 'DsOtpField(\n' +
        '  length: ' + p.length + ',\n' +
        '  grouped: ' + (p.length === '6' ? p.grouped : false) + ',\n' +
        '  masked: ' + p.masked + ',\n' +
        '  state: DsFieldState.' + stateMap[p.state] + ',\n' +
        '  onCompleted: (code) => verify(code),\n' +
        ')';
    }
  },

  badges: {
    label: 'Badge / chip',
    controls: [
      { key:'kind',     label:'Kind',   type:'select', options:['badge','chip'], value:'badge' },
      { key:'text',     label:'Label',  type:'text',   value:'Pending' },
      { key:'tone',     label:'Tone (badge)', type:'select', options:['neutral','brand','success','warning','error','info'], value:'warning' },
      { key:'selected', label:'Selected (chip)', type:'toggle', value:true },
      { key:'icon',     label:'Leading icon (chip)', type:'toggle', value:true }
    ],
    render(p){
      if (p.kind === 'badge') return '<span class="ds-badge ' + p.tone + '">' + esc(p.text) + '</span>';
      return '<span class="ds-chip' + (p.selected ? ' selected' : '') + '">' +
        (p.icon ? '<i class="ti ti-' + (p.selected ? 'check' : 'calendar') + '"></i>' : '') + esc(p.text) + '</span>';
    },
    dart(p){
      if (p.kind === 'badge') {
        return "DsBadge(label: '" + p.text.replace(/'/g, "\\'") + "', tone: DsTone." + p.tone + ')';
      }
      const lines = ["label: '" + p.text.replace(/'/g, "\\'") + "'"];
      if (p.icon) lines.push('leadingIcon: TablerIcons.calendar');
      lines.push('selected: ' + p.selected);
      lines.push('onTap: () => toggleFilter()');
      return 'DsChip(\n  ' + lines.join(',\n  ') + ',\n)';
    }
  },

  alerts: {
    label: 'Alert',
    controls: [
      { key:'tone',    label:'Tone',    type:'select', options:['info','success','warning','error'], value:'warning' },
      { key:'title',   label:'Title',   type:'text', value:'Scheduled maintenance' },
      { key:'message', label:'Message', type:'text', value:'Transfers will be unavailable 14 Jun, 02:00–04:00 EST.' },
      { key:'dismiss', label:'Dismissible', type:'toggle', value:true }
    ],
    render(p){
      const icons = { info:'info-circle', success:'circle-check', warning:'alert-triangle', error:'alert-circle' };
      return '<div class="ds-alert ' + p.tone + '"><i class="ti ti-' + icons[p.tone] + '"></i>' +
        '<div class="ds-alert-body"><strong>' + esc(p.title) + '</strong>' + esc(p.message) + '</div>' +
        (p.dismiss ? '<i class="ti ti-x ds-alert-x"></i>' : '') + '</div>';
    },
    dart(p){
      return 'DsAlert(\n' +
        '  tone: DsTone.' + p.tone + ',\n' +
        "  title: '" + p.title.replace(/'/g, "\\'") + "',\n" +
        "  message: '" + p.message.replace(/'/g, "\\'") + "',\n" +
        '  dismissible: ' + p.dismiss + ',\n)';
    }
  },

  selection: {
    label: 'Selection control',
    controls: [
      { key:'kind',     label:'Control', type:'select', options:['switch','checkbox','radio'], value:'switch' },
      { key:'text',     label:'Label',   type:'text',   value:'Transaction alerts' },
      { key:'checked',  label:'On / checked', type:'toggle', value:true },
      { key:'disabled', label:'Disabled',     type:'toggle', value:false }
    ],
    render(p){
      let ctl = '';
      const dis = p.disabled ? ' disabled' : '';
      if (p.kind === 'switch') ctl = '<span class="ds-switch' + (p.checked ? ' on' : '') + dis + '"></span>';
      if (p.kind === 'checkbox') ctl = '<span class="ds-check' + (p.checked ? ' checked' : '') + dis + '"></span>';
      if (p.kind === 'radio') ctl = '<span class="ds-radio' + (p.checked ? ' checked' : '') + dis + '"></span>';
      return '<span class="ds-ctl-row">' + ctl + ' ' + esc(p.text) + '</span>';
    },
    dart(p){
      const widget = { switch:'DsSwitch', checkbox:'DsCheckbox', radio:'DsRadio' }[p.kind];
      return widget + '(\n' +
        '  value: ' + p.checked + ',\n' +
        "  label: '" + p.text.replace(/'/g, "\\'") + "',\n" +
        '  onChanged: ' + (p.disabled ? 'null' : '(v) => setState(() => value = v)') + ',\n)';
    }
  }
};

/* ---------- sandbox page rendering ---------- */

const PUBLISHED_SANDBOX_IDS = Object.freeze(['button','calendar','accordion','activity-timeline','avatar','breadcrumbs']);

let sbCurrent = 'button';
let sbProps = {};

function sbDefaults(id){
  const out = { ...(SANDBOX[id].defaults || {}) };
  SANDBOX[id].controls.forEach(c => { out[c.key] = c.type === 'toggle' ? !!c.value : String(c.value); });
  return out;
}

function selectSandboxComponent(id){
  if(id && PUBLISHED_SANDBOX_IDS.includes(id)) sbCurrent = id;
  else if(!PUBLISHED_SANDBOX_IDS.includes(sbCurrent)) sbCurrent = PUBLISHED_SANDBOX_IDS[0];
  return sbCurrent;
}

function renderSandboxPage(){
  if (!sbProps[sbCurrent]) sbProps[sbCurrent] = sbDefaults(sbCurrent);
  const picker = PUBLISHED_SANDBOX_IDS.map(id =>
    '<button data-sb-pick="' + id + '"' + (id === sbCurrent ? ' class="active"' : '') + '>' + esc(SANDBOX[id].label) + '</button>'
  ).join('');
  return '<div class="seg" id="sbPicker">' + picker + '</div>' +
    '<div class="sb-layout is-' + sbCurrent + '">' +
    '<div class="sb-panel" id="sbControls">' + sbControlsHtml() + '</div>' +
    '<div class="sb-preview" id="sbPreview">' + SANDBOX[sbCurrent].render(sbProps[sbCurrent]) + '</div>' +
    '<div class="sb-code" id="sbCode">' + codeblock(SANDBOX[sbCurrent].dart(sbProps[sbCurrent]), 'dart — generated live') + '</div>' +
    '</div>';
}

function sbControlsHtml(){
  const def = SANDBOX[sbCurrent];
  const p = sbProps[sbCurrent];
  let html = '<h3>Properties</h3>';
  def.controls.forEach(c => {
    const controlId = `sb-${sbCurrent}-${c.key}`;
    if (c.type === 'select') {
      html += '<div class="sb-ctl"><label for="' + controlId + '">' + esc(c.label) + '</label><select id="' + controlId + '" name="' + c.key + '" data-sb-key="' + c.key + '">' +
        c.options.map(o => '<option value="' + o + '"' + (p[c.key] === o ? ' selected' : '') + '>' + o + '</option>').join('') +
        '</select></div>';
    } else if (c.type === 'text') {
      html += '<div class="sb-ctl"><label for="' + controlId + '">' + esc(c.label) + '</label>' +
        '<input id="' + controlId + '" name="' + c.key + '" type="text" data-sb-key="' + c.key + '" value="' + esc(p[c.key]) + '"></div>';
    } else if (c.type === 'toggle') {
      html += '<div class="sb-toggle"><span>' + esc(c.label) + '</span>' +
        '<span class="ds-switch' + (p[c.key] ? ' on' : '') + '" data-sb-key="' + c.key + '" data-sb-toggle role="switch" tabindex="0" aria-label="' + esc(c.label) + '" aria-checked="' + p[c.key] + '"></span></div>';
    }
  });
  return html;
}

function sbRefresh(){
  const def = SANDBOX[sbCurrent];
  const p = sbProps[sbCurrent];
  const prev = document.getElementById('sbPreview');
  const code = document.getElementById('sbCode');
  if (prev) prev.innerHTML = def.render(p);
  if (code) code.innerHTML = codeblock(def.dart(p), 'dart — generated live');
}

function bindSandbox(root){
  root.addEventListener('click', e => {
    const pick = e.target.closest('[data-sb-pick]');
    if (pick) {
      sbCurrent = pick.getAttribute('data-sb-pick');
      history.replaceState(null, '', '#/sandbox/' + sbCurrent);
      const main = document.getElementById('sandboxRoot');
      if (main) { main.innerHTML = renderSandboxPage(); }
      return;
    }
    const accordionToggle = e.target.closest('[data-rib-accordion-toggle]');
    if (accordionToggle && sbCurrent === 'accordion') {
      const accordion = accordionToggle.closest('[data-rib-accordion-index]');
      const nextIndex = Number(accordion && accordion.getAttribute('data-rib-accordion-index'));
      const currentIndex = Number(sbProps[sbCurrent].expandedIndex);
      sbProps[sbCurrent].expandedIndex = currentIndex === nextIndex && sbProps[sbCurrent].allowCollapseAll
        ? -1
        : nextIndex;
      const main = document.getElementById('sandboxRoot');
      if (main) {
        main.innerHTML = renderSandboxPage();
        const nextToggle = main.querySelector(`[data-rib-accordion-index="${nextIndex}"] [data-rib-accordion-toggle]`);
        nextToggle?.focus();
      }
      return;
    }
    const tgl = e.target.closest('[data-sb-toggle]');
    if (tgl) {
      const key = tgl.getAttribute('data-sb-key');
      sbProps[sbCurrent][key] = !sbProps[sbCurrent][key];
      tgl.classList.toggle('on', sbProps[sbCurrent][key]);
      tgl.setAttribute('aria-checked', sbProps[sbCurrent][key]);
      sbRefresh();
    }
  });
  root.addEventListener('input', e => {
    const key = e.target.getAttribute && e.target.getAttribute('data-sb-key');
    if (key && !e.target.hasAttribute('data-sb-toggle')) {
      sbProps[sbCurrent][key] = e.target.value;
      sbRefresh();
    }
  });
}
