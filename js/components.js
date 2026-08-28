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
  { key: 'primary', title: 'Primary', className: 'primary', note: 'Filled high-emphasis action.' },
  { key: 'outline', title: 'Outline', className: 'secondary-outline', note: 'Outlined alternative action.' },
  { key: 'secondary', title: 'Secondary', className: 'secondary-text', sizes: ['sm'], note: 'Text-style action. Figma specifies this as a compact 16px-height button.' },
  { key: 'pastel', title: 'Pastel', className: 'secondary-pastel', note: 'Soft filled secondary action.' },
  { key: 'white', title: 'White', className: 'secondary-white', onBrand: true, note: 'White action for brand, image, or dark surfaces.' },
  { key: 'destructive-outline', title: 'Destructive - Outlined', className: 'destructive-secondary', note: 'Outlined destructive action.' },
  { key: 'destructive-filled', title: 'Destructive - Filled', className: 'destructive-primary', note: 'Filled destructive confirmation.' }
];

const BUTTON_SIZES = [
  { key: 'lg', label: 'Large', figma: '44px high' },
  { key: 'sm', label: 'Small', figma: '36px high' },
  { key: 'xs', label: 'X-Small', figma: '28px high' }
];

const BUTTON_STATES = [
  { key: 'default', label: 'Active' },
  { key: 'hover', label: 'Hover', className: 'is-hover' },
  { key: 'focus', label: 'Focus', className: 'is-focus' },
  { key: 'disabled', label: 'Disabled', disabled: true }
];

const BUTTON_ICONS = [
  { key: 'none', label: 'No Icon' },
  { key: 'left', label: 'Left', before: '<i class="ti ti-plus"></i>' },
  { key: 'right', label: 'Right', after: '<i class="ti ti-arrow-right"></i>' }
];

function buttonLabel(type, icon){
  if(type.key === 'destructive-outline' || type.key === 'destructive-filled') return 'Delete';
  if(type.key === 'secondary') return icon.key === 'none' ? 'Edit' : 'Edit details';
  return 'Continue';
}

function renderButton(type, size, state, icon){
  const classes = ['ds-btn', type.className, size.key, state.className].filter(Boolean).join(' ');
  const label = buttonLabel(type, icon);
  return `<button class="${classes}"${state.disabled ? ' disabled' : ''}>${icon.before ? icon.before + ' ' : ''}${label}${icon.after ? ' ' + icon.after : ''}</button>`;
}

function renderButtonMatrix(){
  return `<div class="button-matrix">
    <div class="button-matrix-head">
      <span>Type / Size / Icon</span>
      ${BUTTON_STATES.map(state => `<span>${state.label}</span>`).join('')}
    </div>
    ${BUTTON_TYPES.map(type => {
      const sizes = BUTTON_SIZES.filter(size => !type.sizes || type.sizes.includes(size.key));
      return `<section class="button-type-section${type.onBrand ? ' is-onbrand' : ''}">
        <header>
          <h3>${type.title}</h3>
          <p>${type.note}</p>
        </header>
        ${sizes.map(size => `<div class="button-size-block">
          <div class="button-size-label"><b>${size.label}</b><span>${size.figma}</span></div>
          <div class="button-size-rows">
            ${BUTTON_ICONS.map(icon => `<div class="button-matrix-row">
              <span class="button-icon-label">${icon.label}</span>
              ${BUTTON_STATES.map(state => `<div class="button-cell">${renderButton(type, size, state, icon)}</div>`).join('')}
            </div>`).join('')}
          </div>
        </div>`).join('')}
      </section>`;
    }).join('')}
  </div>`;
}

const COMPONENTS = {

  button: {
    title: 'Buttons', group: 'Actions', status: 'stable', version: '1.4', updated: '18 Jun 2026',
    desc: 'Buttons trigger clear actions across web and mobile. Use one primary action per decision area, keep labels verb-first, and reserve destructive styles for actions that remove, cancel or permanently change customer data.',
    sections: [
      { title: 'Figma component structure',
        note: 'Matches the Components RIB button page: Type sections, Size groups, Icon rows, and State columns. The Figma file labels the default column as active.',
        html: renderButtonMatrix() },
      { title: 'Figma anatomy',
        note: 'The primary default state follows the Figma button anatomy: 356px reference width, 36px container, Primary Orange 100 base fill, 12% white linear overlay, a visible gradient stroke shell, 12px radius, and 12/16 Mulish semibold text.',
        html: `<div class="button-spec-card">
          <div class="button-spec-preview"><button class="ds-btn primary sm figma-default" style="width:min(356px,100%)">Continue</button></div>
          <div class="shape-token-table">
            <div class="shape-token-head"><span>Property</span><span>Value</span><span>Code reference</span></div>
            <div class="shape-token-row"><b>Width</b><code>356px · min 120px</code><span>Container(width: 356) inside BoxConstraints(minWidth: 120).</span></div>
            <div class="shape-token-row"><b>Fill</b><code>DsColors.buttonPrimaryFill</code><span>Primary Orange 100 base with a white-to-transparent linear overlay at 12%.</span></div>
            <div class="shape-token-row"><b>Stroke</b><code>DsColors.buttonStroke · 1px inside</code><span>Exact RIB stroke: white-to-transparent with the gradient paint set to 50% opacity.</span></div>
            <div class="shape-token-row"><b>Min width</b><code>120px</code><span>BoxConstraints(minWidth: 120)</span></div>
            <div class="shape-token-row"><b>Height</b><code>36px</code><span>Container(height: 36)</span></div>
            <div class="shape-token-row"><b>Padding</b><code>12px / 10px</code><span>EdgeInsets.symmetric(horizontal: 12, vertical: 10)</span></div>
            <div class="shape-token-row"><b>Radius</b><code>12px</code><span>BorderRadius.circular(12)</span></div>
            <div class="shape-token-row"><b>Text</b><code>12 / 16 · w600 · 0.25</code><span>Mulish semibold in neutralGrey.150; white on Orange 100 does not meet AA contrast.</span></div>
          </div>
        </div>` },
      { title: 'Mobile buttons',
        note: 'Mobile uses the same variants but larger touch targets. Primary bottom actions should be full width; paired actions stack when space is tight.',
        html: `<div class="button-device-grid">
          <article class="button-device-card">
            <h3>Mobile large</h3>
            <p>48px high · 14/16 text · primary page action</p>
            <button class="ds-btn primary lg mobile block">Continue</button>
            <button class="ds-btn secondary-outline lg mobile block">Cancel</button>
          </article>
          <article class="button-device-card">
            <h3>Mobile small</h3>
            <p>40px high · 12/16 text · cards and bottom-sheet utility actions</p>
            <button class="ds-btn secondary-pastel sm mobile block"><i class="ti ti-plus"></i> Add payee</button>
            <button class="ds-btn destructive-secondary sm mobile block">Remove</button>
          </article>
        </div>` },
      { title: 'Secondary state rule',
        note: 'Secondary is a text-style button in the RIB file. Orange100 states are shown in the matrix; other colour variants follow the same rule using the next darker colour for hover and focus, while disabled stays Grey110.',
        html: `<div class="button-rule-card">
          <button class="ds-btn secondary-text sm">Edit</button>
          <button class="ds-btn secondary-text sm is-hover">Edit</button>
          <button class="ds-btn secondary-text sm is-focus">Edit</button>
          <button class="ds-btn secondary-text sm" disabled>Edit</button>
        </div>` }
    ],
    props: [
      ['label','String','required','Button text. Sentence case, verb first.'],
      ['variant','DsButtonVariant','primary','primary · outline · secondary · pastel · white · destructiveOutline · destructiveFilled'],
      ['size','DsButtonSize','large','large · small · xSmall'],
      ['platform','DsButtonPlatform','web','web · mobile. Mobile increases height and defaults expanded.'],
      ['leadingIcon','IconData?','null','Optional icon before the label.'],
      ['trailingIcon','IconData?','null','Optional icon after the label for forward movement.'],
      ['loading','bool','false','Shows spinner, blocks taps, keeps label'],
      ['expanded','bool','false','Fills available width. Mobile primary actions default to true.'],
      ['onPressed','VoidCallback?','null','null renders the disabled state']
    ],
    flutter: `ConstrainedBox(
  constraints: BoxConstraints(minWidth: 120),
  child: SizedBox(
    width: 356,
    height: 36,
    child: Stack(
      children: [
        Positioned.fill(
          child: DecoratedBox(
            decoration: DsButtonDecorations.primaryStrokeShell,
          ),
        ),
        Positioned.fill(
          child: Padding(
            padding: EdgeInsets.all(DsColors.buttonStrokeWidth),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(
                12 - DsColors.buttonStrokeWidth,
              ),
              child: Stack(
                children: [
                  Positioned.fill(
                    child: DecoratedBox(
                      decoration: DsButtonDecorations.primaryFillBase,
                    ),
                  ),
                  Positioned.fill(
                    child: DecoratedBox(
                      decoration: DsButtonDecorations.primaryFillOverlay,
                    ),
                  ),
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 10,
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        spacing: 8,
                        children: [
                          Text(
                            'Continue',
                            style: TextStyle(
                              color: DsColors.neutralGrey150,
                              fontSize: 12,
                              fontFamily: 'Mulish',
                              fontWeight: FontWeight.w600,
                              height: 1.33,
                              letterSpacing: 0.25,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ),
  ),
)`
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
    title: 'Avatar', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Avatars identify people, payees and sessions. Use initials by default; use photos only when customer-provided or trusted.',
    sections: [
      { title: 'Sizes',
        html: `<div class="canvas">
          <span class="ds-avatar sm">DH</span>
          <span class="ds-avatar">DH</span>
          <span class="ds-avatar lg">DH</span>
          <span class="ds-avatar icon"><i class="ti ti-user"></i></span>
        </div>` },
      { title: 'Payee row',
        html: `<div class="canvas">
          <div class="ds-avatar-row"><span class="ds-avatar">SC</span><span><b>Sarah Chen</b><small>Interac e-Transfer payee</small></span></div>
        </div>` }
    ],
    props: [
      ['initials','String?','null','Two-letter fallback'],
      ['imageUrl','String?','null','Trusted photo source'],
      ['size','DsAvatarSize','medium','small · medium · large'],
      ['status','DsPresence?','null','Optional online/verified state']
    ],
    flutter: `DsAvatar(initials: 'SC', size: DsAvatarSize.medium)`
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
    title: 'Breadcrumbs', group: 'Navigation', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Breadcrumbs orient web users in multi-level flows. Keep labels short and hide middle levels on narrow widths.',
    sections: [
      { title: 'Default',
        html: `<div class="canvas">
          <nav class="ds-breadcrumbs"><a>Accounts</a><i class="ti ti-chevron-right"></i><a>Savings</a><i class="ti ti-chevron-right"></i><span>Statement</span></nav>
        </div>` }
    ],
    props: [
      ['items','List<DsBreadcrumbItem>','required','Ordered crumb list'],
      ['onTap','ValueChanged<int>?','null','Crumb navigation handler']
    ],
    flutter: `DsBreadcrumbs(items: crumbs, onTap: navigation.goToCrumb)`
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

  calendar: {
    title: 'Calendar', group: 'Inputs', status: 'beta', version: '0.1', updated: '18 Jun 2026',
    desc: 'Calendar supports date picking in forms and scheduled-payment flows. Keep the field shell aligned with Input fields and use a compact monthly grid in overlays.',
    sections: [
      { title: 'Date picker',
        html: `<div class="canvas col">
          <div class="ifield-example"><div class="ifield-shell"><span class="ifield-value">18 Jun 2026</span><i class="ti ti-calendar ifield-trailing"></i></div></div>
          <div class="ds-calendar"><div class="cal-head"><i class="ti ti-chevron-left"></i><b>June 2026</b><i class="ti ti-chevron-right"></i></div><div class="cal-grid">${['S','M','T','W','T','F','S','14','15','16','17','18','19','20','21','22','23','24','25','26','27'].map(d => `<span${d === '18' ? ' class="active"' : ''}>${d}</span>`).join('')}</div></div>
        </div>` }
    ],
    props: [
      ['value','DateTime?','null','Selected date'],
      ['minDate','DateTime?','null','Earliest selectable date'],
      ['maxDate','DateTime?','null','Latest selectable date'],
      ['onChanged','ValueChanged<DateTime>?','required','Date selection callback']
    ],
    flutter: `DsDatePicker(value: scheduledDate, onChanged: setScheduledDate)`
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
    title: 'Accordions', group: 'Display', status: 'stable', version: '1.0', updated: '18 Jun 2026',
    desc: 'Accordions reveal supporting information while keeping dense screens scannable. Use them for FAQs, fee details and optional explanations.',
    sections: [
      { title: 'Disclosure list',
        html: `<div class="canvas">
          <div class="ds-accordion"><div class="open"><button>Transfer limits <i class="ti ti-chevron-up"></i></button><p>You can send up to CA$ 10,000 per day from eligible accounts.</p></div><div><button>Fees <i class="ti ti-chevron-down"></i></button></div><div><button>Processing time <i class="ti ti-chevron-down"></i></button></div></div>
        </div>` }
    ],
    props: [
      ['items','List<DsAccordionItem>','required','Accordion rows'],
      ['expandedIndex','int?','null','Expanded row index'],
      ['onChanged','ValueChanged<int>?','required','Expansion callback']
    ],
    flutter: `DsAccordion(items: faqItems, expandedIndex: 0, onChanged: setExpanded)`
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

  cards: {
    title: 'Cards', group: 'Display', status: 'stable', version: '1.4', updated: '18 Jun 2026',
    desc: 'Cards group banking content into reusable surfaces: promo modules, offer cards, account cards, quick links and account list cards. Use white surfaces with quiet borders by default; reserve branded fills for account and promo moments.',
    sections: [
      { title: 'Promo and offers',
        note: 'Promo and offer cards use compact content, a small icon plate and restrained color. They should advertise one thing, not become a layout container.',
        html: `<div class="canvas grid2">
          <article class="ds-promo-card">
            <span class="ds-promo-icon"><i class="ti ti-sparkles"></i></span>
            <div><strong>Unlock preferred FX rates</strong><p>Send money globally with reduced transfer fees.</p></div>
            <i class="ti ti-chevron-right"></i>
          </article>
          <article class="ds-offer-card red">
            <span class="ds-promo-icon"><i class="ti ti-gift"></i></span>
            <div><strong>Travel card offer</strong><p>Earn bonus rewards on eligible overseas spends.</p></div>
          </article>
          <article class="ds-offer-card blue">
            <span class="ds-promo-icon"><i class="ti ti-plane"></i></span>
            <div><strong>Book faster</strong><p>Save beneficiary details for repeat transfers.</p></div>
          </article>
          <article class="ds-offer-card brown">
            <span class="ds-promo-icon"><i class="ti ti-building-bank"></i></span>
            <div><strong>Wealth access</strong><p>Connect with a relationship manager in Canada.</p></div>
          </article>
        </div>` },
      { title: 'Account card',
        html: `<div class="canvas">
          <div class="ds-account-card">
            <div class="ac-top"><span>Savings · CAD</span><i class="ti ti-eye" style="font-size:15px"></i></div>
            <div class="ac-bal">CA$ 24,580.32</div>
            <div class="ac-num">003501 ···· 8472</div>
            <div class="ac-foot"><span>Available CA$ 23,100.00</span><span>View details <i class="ti ti-chevron-right" style="font-size:11px"></i></span></div>
          </div>
        </div>` },
      { title: 'Account list cards',
        note: 'Account cards in lists stay white and border-led. They can expose two compact text actions on hover or within a detail drawer.',
        html: `<div class="canvas grid2">
          <article class="ds-basic-card account">
            <div class="ds-basic-card-head"><span class="ds-label translucent">Savings</span><span class="ds-currency-tag">CAD</span></div>
            <strong>Everyday Savings</strong>
            <p>•••• 8472</p>
            <div class="ds-basic-card-balance"><span>Available balance</span><b>CA$ 24,580.32</b></div>
            <div class="ds-card-actions"><button class="ds-btn tertiary xs">Details</button><button class="ds-btn tertiary xs">Statement</button></div>
          </article>
          <article class="ds-basic-card account">
            <div class="ds-basic-card-head"><span class="ds-label maroon">Current</span><span class="ds-currency-tag">USD</span></div>
            <strong>Global Chequing</strong>
            <p>•••• 1941</p>
            <div class="ds-basic-card-balance"><span>Available balance</span><b>US$ 8,410.00</b></div>
            <div class="ds-card-actions"><button class="ds-btn tertiary xs">Details</button><button class="ds-btn tertiary xs">Statement</button></div>
          </article>
        </div>` },
      { title: 'Quick action tiles',
        html: `<div class="canvas">
          <div class="ds-quick-grid">
            <div class="ds-quick"><i class="ti ti-send"></i>Send</div>
            <div class="ds-quick"><i class="ti ti-receipt"></i>Pay bills</div>
            <div class="ds-quick"><i class="ti ti-file-download"></i>Statement</div>
            <div class="ds-quick"><i class="ti ti-dots"></i>More</div>
          </div>
        </div>` }
    ],
    props: [
      ['account','Account','required','Account model — type, currency, balance, number'],
      ['masked','bool','false','Hides the balance behind dots'],
      ['onToggleMask','VoidCallback?','null','Eye affordance callback'],
      ['onTap','VoidCallback?','null','Navigates to account detail'],
      ['variant','DsCardVariant','account','account · promo · offer · quickLink']
    ],
    flutter: `DsAccountCard(
  account: accounts.primary,
  masked: privacyMode,
  onToggleMask: () => setState(() => privacyMode = !privacyMode),
  onTap: () => context.push('/accounts/primary'),
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
