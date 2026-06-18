/* ============================================================
   ICICI Global DS — design tokens (single source of truth)
   The app renders foundations from this object AND generates
   ds_tokens.dart / tokens JSON from it (see Flutter page).
   ============================================================ */

const DS = {
  meta: {
    name: 'ICICI Global DS',
    fullName: 'ICICI Global Design System',
    org: 'ICICI Bank · International retail net banking',
    version: '0.1.0',
    updated: '11 Jun 2026'
  },

  color: {
    brand: {
      label: 'Brand colours',
      note: 'Fixed ICICI identity colours. Use for brand expression, the top rail, logo moments and the hero gradient — not as a full UI action ramp.',
      stops: { orange:'#E3530F', maroon:'#BE2A2A' }
    },
    primaryOrange: {
      label: 'Primary orange',
      note: 'Action orange for CTAs, focus, selected states and interaction emphasis. 100 is the default action colour.',
      stops: { 80:'#F4B094',90:'#E8692E',100:'#D44500',110:'#A93600',120:'#732500' }
    },
    primaryMaroon: {
      label: 'Primary maroon',
      note: 'Deep brand action colour for secondary emphasis and strong moments where orange would feel too loud.',
      stops: { 80:'#DA7B80',90:'#BC343A',100:'#94292E',110:'#6C1E21',120:'#441315' }
    },
    neutralBase: {
      label: 'Absolute neutrals',
      note: 'Pure black and white. Use deliberately; most UI should prefer neutral grey or surface tokens.',
      stops: { black:'#000000', white:'#FFFFFF' }
    },
    neutralGrey: {
      label: 'Neutral grey',
      note: 'Text, icons, borders and dividers. The workhorse ramp for calm banking interfaces.',
      stops: { 60:'#F7F7F7',70:'#E7E8E9',80:'#CDCFD0',90:'#B2B5B8',100:'#979B9F',110:'#7D8287',120:'#64696D',130:'#4C4F52',140:'#333638',150:'#202428' }
    },
    surfaceCoolGrey: {
      label: 'Surface cool grey',
      note: 'Page canvas, sidebar, quiet panels and structural backgrounds. Keep separate from text/border greys.',
      stops: { 90:'#FCFCFD',100:'#F8F9FB',110:'#EFF1F6' }
    },
    success: {
      label: 'Success green',
      note: 'Positive amounts, confirmations, completed states.',
      stops: { 50:'#ECFDF3',100:'#D1FADF',500:'#12B76A',600:'#039855',700:'#027A48' }
    },
    error: {
      label: 'Error red',
      note: 'Validation errors, failed transactions, destructive actions.',
      stops: { 50:'#FEF3F2',100:'#FEE4E2',500:'#F04438',600:'#D92D20',700:'#B42318' }
    },
    warning: {
      label: 'Warning amber',
      note: 'Pending states, maintenance notices, actions needing attention.',
      stops: { 50:'#FFFAEB',100:'#FEF0C7',500:'#F79009',600:'#DC6803',700:'#B54708' }
    },
    info: {
      label: 'Info blue',
      note: 'Informational banners, tips, neutral notices.',
      stops: { 50:'#EFF8FF',100:'#D1E9FF',500:'#2E90FA',600:'#1570EF',700:'#175CD3' }
    }
  },

  gradient: {
    hero: { stops: ['#E3530F', '#BE2A2A'], angle: 180,
      note: 'Reserved for hero surfaces: login hero, account card, section covers. Never behind body text smaller than 13px.' },
    buttonPrimaryFill: { base:'#D44500', stops: [
        { color:'#FFFFFF', opacity:.12 },
        { color:'#FFFFFF', opacity:0 }
      ], angle: 180,
      note: 'Primary button fill style: Primary Orange 100 base with a white-to-transparent linear gradient overlay at 12%.' },
    buttonStroke: { stops: [
        { color:'#FFFFFF', opacity:.5 },
        { color:'#FFFFFF', opacity:0 }
      ], angle: 180,
      note: 'Primary button inside stroke: white-to-transparent linear gradient at 50%, drawn inside at 1px.' }
  },

  alpha: {
    white: { 20:'rgba(255,255,255,.20)', 40:'rgba(255,255,255,.40)', 50:'rgba(255,255,255,.50)' }
  },

  typeface: {
    family: 'Mulish',
    note: 'Rounded, calm and highly legible for RIB interfaces. Use tabular figures for balances, amounts and OTP-like numeric UI.'
  },

  /* Typography — core styles first, usage aliases second */
  type: [
    { group:'Display', token:'displayLarge', size:32, height:40, weight:600, use:'Rare hero and web moments' },
    { group:'Display', token:'displayMedium', size:28, height:36, weight:600, use:'Large balances and major page titles' },
    { group:'Display', token:'displaySmall', size:24, height:32, weight:600, use:'Screen titles and dialogs' },

    { group:'Headings', token:'headingLargeBold', size:20, height:28, weight:700, use:'Important section headers' },
    { group:'Headings', token:'headingLargeSemibold', size:20, height:28, weight:600, use:'Dialog titles and softer H1s' },
    { group:'Headings', token:'headingMediumBold', size:16, height:24, weight:700, use:'Card titles and form groups' },
    { group:'Headings', token:'headingMediumSemibold', size:16, height:24, weight:600, use:'List headers and emphasized rows' },
    { group:'Headings', token:'headingSmallBold', size:14, height:20, weight:700, use:'Dense table headings' },
    { group:'Headings', token:'headingSmallSemibold', size:14, height:20, weight:600, use:'Compact section labels' },
    { group:'Headings', token:'headingSmallRegular', size:14, height:20, weight:400, use:'Quiet supporting headings' },

    { group:'Body', token:'bodyLargeRegular', size:14, height:20, weight:400, use:'Default reading text' },
    { group:'Body', token:'bodyLargeSemibold', size:14, height:20, weight:600, use:'Emphasized body copy' },
    { group:'Body', token:'bodyMediumRegular', size:13, height:20, weight:400, use:'Dense descriptions and helper text' },
    { group:'Body', token:'bodyMediumSemibold', size:13, height:20, weight:600, use:'Dense emphasized text' },
    { group:'Body', token:'bodySmallRegular', size:12, height:16, weight:400, use:'Metadata and compact descriptions' },
    { group:'Body', token:'bodySmallSemibold', size:12, height:16, weight:600, use:'Compact emphasized text' },

    { group:'Labels & micro', token:'captionRegular', size:11, height:16, weight:400, use:'Timestamps and small support text' },
    { group:'Labels & micro', token:'captionSemibold', size:11, height:16, weight:600, use:'Small labels and captions' },
    { group:'Labels & micro', token:'microSemibold', size:10, height:14, weight:600, use:'Rare badges, legal and tiny UI' },

    { group:'Usage aliases', token:'inputLargeRegular', size:16, height:24, weight:400, use:'Large input value text' },
    { group:'Usage aliases', token:'inputLargeSemibold', size:16, height:24, weight:600, use:'Large emphasized input text' },
    { group:'Usage aliases', token:'inputMediumRegular', size:13, height:20, weight:400, use:'Medium input value text' },
    { group:'Usage aliases', token:'inputMediumSemibold', size:13, height:20, weight:600, use:'Medium emphasized input text' },
    { group:'Usage aliases', token:'buttonLarge', size:14, height:16, weight:600, use:'Large buttons' },
    { group:'Usage aliases', token:'buttonSmall', size:12, height:16, weight:600, use:'Compact buttons' },
    { group:'Usage aliases', token:'linkLarge', size:14, height:20, weight:600, use:'Inline and standalone links' },
    { group:'Usage aliases', token:'linkSmall', size:12, height:16, weight:600, use:'Compact links' },
    { group:'Usage aliases', token:'labelBold', size:11, height:16, weight:700, use:'High-emphasis labels' },
    { group:'Usage aliases', token:'labelSemibold', size:11, height:16, weight:600, use:'Default labels' },
    { group:'Usage aliases', token:'navLevel1Default', size:13, height:16, weight:400, use:'Primary navigation default' },
    { group:'Usage aliases', token:'navLevel1Active', size:13, height:16, weight:600, use:'Primary navigation active' },
    { group:'Usage aliases', token:'navLevel2Default', size:12, height:16, weight:400, use:'Secondary navigation default' },
    { group:'Usage aliases', token:'navLevel2Active', size:12, height:16, weight:600, use:'Secondary navigation active' }
  ],

  /* 4pt spatial grid — dart: valid Dart identifier for codegen */
  space: [
    { token:'xxs', dart:'xxs', px:2,  use:'Hairline gaps' },
    { token:'xs',  dart:'xs',  px:4,  use:'Icon-to-label gaps' },
    { token:'sm',  dart:'sm',  px:8,  use:'Inside compact components' },
    { token:'md',  dart:'md',  px:12, use:'Between related elements' },
    { token:'lg',  dart:'lg',  px:16, use:'Screen margins (mobile), card padding' },
    { token:'xl',  dart:'xl',  px:20, use:'Comfortable card padding' },
    { token:'2xl', dart:'xl2', px:24, use:'Between sections' },
    { token:'3xl', dart:'xl3', px:32, use:'Large section breaks' },
    { token:'4xl', dart:'xl4', px:40, use:'Page-level separation' },
    { token:'5xl', dart:'xl5', px:48, use:'Hero padding' },
    { token:'6xl', dart:'xl6', px:64, use:'Web page headers' }
  ],

  radius: [
    { token:'xs',   dart:'xs',   px:4,   use:'Tags, tiny elements' },
    { token:'sm',   dart:'sm',   px:8,   use:'Small controls, segments' },
    { token:'md',   dart:'md',   px:12,  use:'Buttons, inputs, OTP boxes' },
    { token:'lg',   dart:'lg',   px:16,  use:'Cards, alerts' },
    { token:'xl',   dart:'xl',   px:24,  use:'Sheets, page headers' },
    { token:'full', dart:'full', px:999, use:'Pills, badges, avatars' }
  ],

  elevation: [
    { token:'e1', css:'0 1px 2px rgba(16,24,40,.06)', use:'Cards at rest' },
    { token:'e2', css:'0 4px 8px -2px rgba(16,24,40,.10), 0 2px 4px -2px rgba(16,24,40,.06)', use:'Raised cards, dropdowns' },
    { token:'e3', css:'0 12px 16px -4px rgba(16,24,40,.12), 0 4px 6px -2px rgba(16,24,40,.05)', use:'Bottom sheets, popovers' },
    { token:'e4', css:'0 24px 48px -12px rgba(16,24,40,.18)', use:'Dialogs, modals' }
  ],

  icons: {
    note: 'The system uses the Tabler outline icon set: 24px frame, 2px stroke, round caps. In Flutter use the flutter_tabler_icons package; on web the @tabler/icons-webfont.',
    showcase: [
      'home','credit-card','send','qrcode','building-bank','wallet','receipt','chart-pie',
      'arrow-up-right','arrow-down-left','transfer','currency-dollar','lock','shield-check',
      'face-id','fingerprint','bell','user','settings','help-circle','search','calendar',
      'clock','check','x','alert-triangle','info-circle','eye','eye-off','chevron-right','plus','dots'
    ]
  }
};

/* ============================================================
   Shared utilities
   ============================================================ */

function esc(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function copyText(text, btn){
  const done = () => {
    if (!btn) return;
    if (btn.hasAttribute && btn.hasAttribute('data-copy-text')) {
      const action = btn.matches && btn.matches('.type-copy')
        ? btn
        : btn.querySelector && btn.querySelector('.colour-copy, .foundation-copy, .type-copy');
      if (!action) return;
      btn.classList.remove('copied', 'copy-label-phase', 'copy-check-phase');
      if (action.getBoundingClientRect) action.getBoundingClientRect();
      btn.classList.add('copied');
      btn.classList.add('copy-label-phase');
      action.innerHTML = '<span class="copy-state-label">Copied</span>';
      btn.setAttribute('aria-live', 'polite');
      clearTimeout(btn._copyTimer);
      clearTimeout(btn._copyCheckTimer);
      btn._copyCheckTimer = setTimeout(() => {
        btn.classList.remove('copy-label-phase');
        btn.classList.add('copy-check-phase');
        action.innerHTML = '<i class="ti ti-check"></i>';
      }, 650);
      btn._copyTimer = setTimeout(() => {
        btn.classList.remove('copied');
        btn.classList.remove('copy-label-phase');
        btn.classList.remove('copy-check-phase');
        btn.removeAttribute('aria-live');
        action.innerHTML = '<i class="ti ti-copy"></i>';
      }, 1450);
      return;
    }
    const old = btn.innerHTML;
    btn.classList.add('done');
    btn.innerHTML = '<i class="ti ti-check"></i> Copied';
    setTimeout(() => { btn.classList.remove('done'); btn.innerHTML = old; }, 1400);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(done);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta); done();
  }
}

function downloadFile(name, text, mime){
  const blob = new Blob([text], { type: mime || 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 200);
}

/* Code block builder used across pages */
function codeblock(code, lang, opts){
  opts = opts || {};
  const dl = opts.file
    ? '<button class="dlbtn" data-dl="' + esc(opts.file) + '"><i class="ti ti-download"></i> ' + esc(opts.file) + '</button>'
    : '';
  return '<div class="codeblock"><div class="codebar"><span>' + esc(lang || 'code') + '</span>' +
    '<div class="bar-actions">' + dl +
    '<button class="copybtn" data-copy><i class="ti ti-copy"></i> Copy</button></div></div>' +
    '<pre>' + esc(code) + '</pre></div>';
}
