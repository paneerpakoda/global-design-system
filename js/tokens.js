/* ============================================================
   GlobalDS — design tokens (single source of truth)
   The app renders foundations from this object AND generates
   Kotlin/React, Flutter, SwiftUI and JSON exports from it.
   ============================================================ */

const DS = {
  meta: {
    name: 'GlobalDS',
    fullName: 'ICICI Bank Global Design System',
    org: 'ICICI Bank · Multi-platform design system',
    version: '0.5.0',
    updated: '28 Aug 2026'
  },

  /* RIB is the canonical foundation source for this release. */
  ribAtoms: GlobalDSRIBAtoms,
  foundationCoverage: GlobalDSRIBAtoms.counts,
  foundationIssues: GlobalDSRIBAtoms.issues,
  paintStyles: GlobalDSRIBAtoms.paintStyles,
  gradients: GlobalDSRIBAtoms.paintStyles.filter(style =>
    style.paints.some(paint => paint.type.startsWith('GRADIENT_'))
  ),
  variables: GlobalDSRIBAtoms.variables,
  grid: GlobalDSRIBAtoms.gridStyles,

  platforms: [
    { id:'rib', name:'RIB', fullName:'Retail Internet Banking', channel:'Retail · Web', adoption:'now' },
    { id:'imobile', name:'iMobile', fullName:'Retail Mobile Banking', channel:'Retail · Mobile', adoption:'now' },
    { id:'cib', name:'CIB', fullName:'Corporate Internet Banking', channel:'Corporate · Web', adoption:'deferred' },
    { id:'instabiz', name:'InstaBiz', fullName:'Corporate Mobile Banking', channel:'Corporate · Mobile', adoption:'deferred' },
    { id:'ucj', name:'UCJ', fullName:'Unified Customer Journey', channel:'Onboarding journeys', adoption:'future' },
    { id:'csp', name:'CSP', fullName:'Common Service Platforms', channel:'Service journeys', adoption:'future' },
    { id:'public-website', name:'Public Website', fullName:'Non Logged In (NLI)', channel:'Public web', adoption:'future' },
    { id:'m2i', name:'M2I', fullName:'M2I', channel:'Platform', adoption:'future' }
  ],

  sourceSystems: [
    { id:'imobile-android', name:'iMobile Android', basis:'Existing Android design system' },
    { id:'imobile-ios', name:'iMobile iOS', basis:'Existing iOS design system' },
    { id:'rib', name:'RIB', basis:'Existing RIB design system' }
  ],

  deferredSystems: [
    { id:'cib', name:'CIB', reason:'DFF is not yet ready for GlobalDS convergence.' },
    { id:'instabiz', name:'InstaBiz', reason:'DFF is not yet ready for GlobalDS convergence.' }
  ],

  color: {
    brand: {
      label: 'Brand colours',
      note: 'Fixed ICICI identity colours. Use for brand expression, the top rail, logo moments and the hero gradient — not as a full UI action ramp.',
      stops: { orange:'#E3530F', maroon:'#BE2A2A' }
    },
    primaryOrange: {
      label: 'Primary orange',
      note: 'RIB action orange for CTAs, focus, selected states and interaction emphasis. 100 is the default action colour.',
      stops: { 80:'#F7B68D',90:'#F3975D',100:'#F0792E',110:'#DB5E10',120:'#AB4A0C' }
    },
    primaryMaroon: {
      label: 'Primary maroon',
      note: 'RIB maroon ramp for secondary emphasis and strong moments where orange would feel too loud.',
      stops: { 80:'#CE5F66',90:'#BF3B43',100:'#982F35',110:'#712327',120:'#4A171A' }
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
    backgroundGrey: {
      label: 'Background grey',
      note: 'A neutral application background shared by the iMobile iOS and RIB systems.',
      stops: { 100:'#F9F9F9' }
    },
    pastelBlue: {
      label: 'Pastel blue',
      note: 'Quiet informational and cool decorative surfaces. Values are shared across all three source systems.',
      stops: { 80:'#F7FAFC',90:'#EBF1F8',100:'#E3EDF8',110:'#99ADC2',120:'#7993AF' }
    },
    pastelBrown: {
      label: 'Pastel brown',
      note: 'Warm neutral surfaces. RIB publishes two conflicting values for stop 120; #CFCAAF remains the canonical alias until that source conflict is resolved.',
      stops: { 80:'#FDFDFC',90:'#F9F9F5',100:'#F6F5F0',110:'#E9E6D9',120:'#CFCAAF' }
    },
    pastelGreen: {
      label: 'Pastel green',
      note: 'Positive and reassuring tinted surfaces, separate from operational success colours.',
      stops: { 80:'#F8FCFA',90:'#F1F9F6',100:'#E5F4EE',110:'#E2F0EA',120:'#BFDED1' }
    },
    pastelAmber: {
      label: 'Pastel amber',
      note: 'Warm attention and decorative surfaces, separate from operational warning colours.',
      stops: { 80:'#FEFCFB',90:'#FCF6F2',100:'#FAEFE8',110:'#F7E1D4',120:'#FACAAD' }
    },
    pastelPeach: {
      label: 'Pastel peach',
      note: 'Soft brand-adjacent surfaces, separate from error and alert colours.',
      stops: { 80:'#FEFBFB',90:'#FDF4F4',100:'#FCEEEE',110:'#F8E8E9',120:'#EEC9CC' }
    },
    success: {
      label: 'Indicative success',
      note: 'Positive amounts, confirmations and completed states. Shared exactly by iMobile iOS and RIB.',
      stops: { 90:'#00C26F',100:'#008F52',110:'#005C35' }
    },
    warning: {
      label: 'Indicative warning',
      note: 'Pending states, maintenance notices and actions needing attention. RIB includes an 80 background stop in addition to its action ramp.',
      stops: { 80:'#FEFAED',90:'#FFC633',100:'#FFB800',110:'#CC9300' }
    },
    error: {
      label: 'Indicative error',
      note: 'Validation errors, failed transactions and destructive actions. Shared exactly by iMobile iOS and RIB.',
      stops: { 90:'#E05257',100:'#D8272D',110:'#AD1F24' }
    },
    info: {
      label: 'Indicative information',
      note: 'Informational banners, tips and neutral notices. Shared exactly by iMobile iOS and RIB.',
      stops: { 90:'#6B97FF',100:'#3772FF',110:'#054FFF' }
    }
  },

  semanticColor: {
    primary: { default:'primaryOrange.100', onDefault:'neutralGrey.150', hover:'primaryOrange.110', pressed:'primaryOrange.120', onPressed:'neutralBase.white', subtle:'primaryOrange.80' },
    secondary: { default:'primaryMaroon.100', hover:'primaryMaroon.110', pressed:'primaryMaroon.120', subtle:'primaryMaroon.80' },
    surface: { canvas:'surfaceCoolGrey.110', default:'neutralBase.white', subtle:'surfaceCoolGrey.100', alternate:'backgroundGrey.100' },
    content: { primary:'neutralGrey.150', secondary:'neutralGrey.130', muted:'neutralGrey.110', inverse:'neutralBase.white' },
    border: { quiet:'neutralGrey.70', default:'neutralGrey.80', strong:'neutralGrey.100' },
    state: {
      success: { default:'success.100', strong:'success.110', onStrong:'neutralBase.white', subtle:'pastelGreen.80', onSubtle:'success.110' },
      warning: { default:'warning.100', strong:'warning.110', onStrong:'neutralGrey.150', subtle:'warning.80', onSubtle:'neutralGrey.150' },
      error: { default:'error.100', strong:'error.110', onStrong:'neutralBase.white', subtle:'pastelPeach.80', onSubtle:'error.110' },
      info: { default:'info.100', strong:'info.110', onStrong:'neutralBase.white', subtle:'pastelBlue.80', onSubtle:'info.110' }
    }
  },

  gradient: {
    hero: { stops: ['#EF8C24', '#F06837'], angle: 180,
      sourceStyle:'NEWGradient/General/Orange',
      note: 'RIB general-orange gradient for selected hero and feature surfaces. Never place small body text directly over it.' },
    buttonPrimaryFill: { base:'#F0792E', stops: [
        { color:'#FFFFFF', opacity:.12 },
        { color:'#FFFFFF', opacity:0 }
      ], angle: 180,
      sourceStyle:'NEWGradient/Button Fill',
      note: 'Exact RIB button fill: Primary Orange 100 plus a white-to-transparent overlay at 12% opacity.' },
    buttonStroke: { width:1, opacity:.5, stops: ['#FFFFFF', '#FFFFFF00'], angle: 180,
      sourceStyle:'NEWGradient/Stroke',
      note: 'Exact RIB gradient stroke: white to transparent at 50% paint opacity.' }
  },

  alpha: {
    black: { 20:'rgba(0,0,0,.20)', 40:'rgba(0,0,0,.40)', 60:'rgba(0,0,0,.60)', 80:'rgba(0,0,0,.80)', 100:'rgba(0,0,0,1)' },
    white: { 20:'rgba(255,255,255,.20)', 40:'rgba(255,255,255,.40)', 50:'rgba(255,255,255,.50)', 60:'rgba(255,255,255,.60)', 80:'rgba(255,255,255,.80)', 100:'rgba(255,255,255,1)' }
  },

  typeface: {
    family: 'Mulish',
    note: 'Rounded, calm and highly legible across ICICI Bank interfaces. Use tabular figures for balances, amounts and OTP-like numeric UI.'
  },

  /* Exact RIB text-style contract, including tracking, case and decoration. */
  type: GlobalDSRIBAtoms.textStyles.map(style => ({
    group:style.group,
    token:style.id,
    name:style.name,
    size:style.size,
    height:style.height,
    weight:style.weight,
    fontStyle:style.fontStyle,
    tracking:style.tracking,
    trackingUnit:style.trackingUnit,
    decoration:style.decoration,
    textCase:style.textCase,
    use:style.description || `RIB ${style.name}`,
  })),

  /* Stable aliases keep existing component themes source-compatible. */
  typeAliases: {
    displayLarge:'display1', displayMedium:'display1', displaySmall:'display2',
    headingLargeBold:'h1Bold', headingLargeSemibold:'h1Semi',
    headingMediumBold:'h2Bold', headingMediumSemibold:'h2Semi',
    headingSmallBold:'h3Bold', headingSmallSemibold:'h3Semi', headingSmallRegular:'h3Regular',
    bodyLargeRegular:'h3Regular', bodyLargeSemibold:'h3Semi',
    bodyMediumRegular:'inputRRegular', bodyMediumSemibold:'inputRSemi',
    bodySmallRegular:'p1Reg', bodySmallSemibold:'p1Semi',
    captionRegular:'p2Reg', captionSemibold:'p2Semi',
    microRegular:'p3Reg', microSemibold:'p3Semi', labelLargeSemibold:'s1Semi',
    inputLargeRegular:'inputLRegular', inputLargeSemibold:'inputLSemi',
    inputMediumRegular:'inputRRegular', inputMediumSemibold:'inputRSemi',
    navLevel1Default:'l1Default', navLevel1Active:'l1Active',
    navLevel2Default:'l2Default', navLevel2Active:'l2Active',
  },

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

  effects: GlobalDSRIBAtoms.effectStyles.map(style => {
    const effect = style.effects[0];
    const definition = ({
      'Drop Shadow/Shadow 100':{ token:'shadow100', path:'effect.shadow.100', group:'Depth' },
      'Drop Shadow/Shadow 200':{ token:'shadow200', path:'effect.shadow.200', group:'Depth' },
      'Drop Shadow/Shadow 300':{ token:'shadow300', path:'effect.shadow.300', group:'Depth' },
      'Drop Shadow/Shadow 400':{ token:'shadow400', path:'effect.shadow.400', group:'Depth' },
      'Drop Shadow/Button White':{ token:'shadowButtonWhite', path:'effect.shadow.button-white', group:'Special shadows' },
      'Drop Shadow/Bottom sticky':{ token:'shadowBottomSticky', path:'effect.shadow.bottom-sticky', group:'Special shadows' },
      'Elevation/Orange outline':{ token:'ringOrangeOutline', path:'effect.ring.orange-outline', group:'Interaction rings' },
      'Elevation/Focus':{ token:'ringFocus', path:'effect.ring.focus', group:'Interaction rings' },
    })[style.name];
    const uses = {
      shadow100:'RIB depth primitive 100; component role intentionally unassigned.',
      shadow200:'RIB depth primitive 200; component role intentionally unassigned.',
      shadow300:'RIB depth primitive 300; component role intentionally unassigned.',
      shadow400:'RIB depth primitive 400; component role intentionally unassigned.',
      shadowButtonWhite:'Source-defined white-button shadow; component alias deferred.',
      shadowBottomSticky:'Source-defined upward shadow for bottom-sticky surfaces; component alias deferred.',
      ringOrangeOutline:'Source-defined one-pixel orange interaction ring.',
      ringFocus:'Source-defined three-pixel focus halo.',
    };
    return {
      token:definition.token,
      path:definition.path,
      group:definition.group,
      name:style.name,
      css:`${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${effect.spread}px ${effect.color}`,
      use:uses[definition.token],
      effects:style.effects,
    };
  }),

  icons: GlobalDSIconography
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
        : btn.querySelector && btn.querySelector('.colour-copy, .foundation-copy, .type-copy, .icon-copy-state');
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
    navigator.clipboard.writeText(text).catch(() => {});
    done();
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
