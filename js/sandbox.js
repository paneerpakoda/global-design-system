/* ============================================================
   ICICI Global DS — sandbox (component playground)
   Toggle props/states, see the component live, and get the
   matching Flutter call generated underneath.
   ============================================================ */

const SANDBOX = {

  button: {
    label: 'Button',
    controls: [
      { key:'text',    label:'Label',        type:'text',   value:'Send money' },
      { key:'variant', label:'Variant',      type:'select', options:['primary','destructive-primary','secondary-outline','secondary-pastel','secondary-white','destructive-secondary','tertiary'], value:'primary' },
      { key:'size',    label:'Size',         type:'select', options:['lg','sm','xs'], value:'lg' },
      { key:'state',   label:'State',        type:'select', options:['default','hover','focus','disabled','loading'], value:'default' },
      { key:'icon',    label:'Icon',         type:'select', options:['none','left','right'], value:'left' },
      { key:'block',   label:'Full width',   type:'toggle', value:false }
    ],
    render(p){
      let cls = 'ds-btn ' + p.variant + ' ' + p.size;
      if (p.state === 'hover') cls += ' is-hover';
      if (p.state === 'focus') cls += ' is-focus';
      const dis = (p.state === 'disabled' || p.state === 'loading') ? ' disabled' : '';
      const inner = p.state === 'loading'
        ? '<span class="ds-spinner"></span> ' + esc(p.text)
        : (p.icon === 'left' ? '<i class="ti ti-send"></i> ' : '') + esc(p.text) + (p.icon === 'right' ? ' <i class="ti ti-arrow-right"></i>' : '');
      const style = p.block ? ' style="width:300px"' : '';
      return '<button class="' + cls + '"' + dis + style + '>' + inner + '</button>';
    },
    dart(p){
      const lines = [
        "label: '" + p.text.replace(/'/g, "\\'") + "'",
        'variant: DsButtonVariant.' + p.variant.replace(/-([a-z])/g, (_, c) => c.toUpperCase()),
        'size: DsButtonSize.' + (p.size === 'lg' ? 'large' : p.size === 'sm' ? 'small' : 'xSmall')
      ];
      if (p.icon === 'left') lines.push('leadingIcon: TablerIcons.send');
      if (p.icon === 'right') lines.push('trailingIcon: TablerIcons.arrow_right');
      if (p.state === 'loading') lines.push('loading: true');
      lines.push('expanded: ' + p.block);
      lines.push(p.state === 'disabled' ? 'onPressed: null' : 'onPressed: () => handleTap()');
      return 'DsButton(\n  ' + lines.join(',\n  ') + ',\n)';
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

let sbCurrent = 'button';
let sbProps = {};

function sbDefaults(id){
  const out = {};
  SANDBOX[id].controls.forEach(c => { out[c.key] = c.type === 'toggle' ? !!c.value : String(c.value); });
  return out;
}

function renderSandboxPage(){
  if (!sbProps[sbCurrent]) sbProps[sbCurrent] = sbDefaults(sbCurrent);
  const picker = Object.keys(SANDBOX).map(id =>
    '<button data-sb-pick="' + id + '"' + (id === sbCurrent ? ' class="active"' : '') + '>' + esc(SANDBOX[id].label) + '</button>'
  ).join('');
  return '<div class="seg" id="sbPicker">' + picker + '</div>' +
    '<div class="sb-layout">' +
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
    if (c.type === 'select') {
      html += '<div class="sb-ctl"><label>' + esc(c.label) + '</label><select data-sb-key="' + c.key + '">' +
        c.options.map(o => '<option value="' + o + '"' + (p[c.key] === o ? ' selected' : '') + '>' + o + '</option>').join('') +
        '</select></div>';
    } else if (c.type === 'text') {
      html += '<div class="sb-ctl"><label>' + esc(c.label) + '</label>' +
        '<input type="text" data-sb-key="' + c.key + '" value="' + esc(p[c.key]) + '"></div>';
    } else if (c.type === 'toggle') {
      html += '<div class="sb-toggle"><span>' + esc(c.label) + '</span>' +
        '<span class="ds-switch' + (p[c.key] ? ' on' : '') + '" data-sb-key="' + c.key + '" data-sb-toggle role="switch" tabindex="0" aria-checked="' + p[c.key] + '"></span></div>';
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
      const main = document.getElementById('sandboxRoot');
      if (main) { main.innerHTML = renderSandboxPage(); }
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
