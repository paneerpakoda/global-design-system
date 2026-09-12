// Current Flutter core APIs; product compositions remain separate patterns.
const FLUTTER_CORE_COMPONENTS = {
  "select": {
    "title": "Select field",
    "api": "RibSelectField",
    "index": 0,
    "kind": "New",
    "desc": "Search in the trigger, anchored options, keyboard navigation and Form validation.",
    "source": "flutter/lib/src/components/rib_select_field.dart",
    "constructor": "const RibSelectField({\n    required this.label,\n    required this.items,\n    required this.onChanged,\n    this.value,\n    this.validator,\n    this.enabled = true,\n    this.searchable = false,\n    this.compact = false,\n    this.embedded = false,\n    this.leading,\n    this.placeholder,\n    this.type = RibInputFieldType.labelInline,\n    super.key,\n  });",
    "usage": "RibSelectField<String>(\n  label: 'Country',\n  value: country,\n  searchable: true,\n  items: const [RibDropdownItem(value: 'IN', label: 'India')],\n  onChanged: (value) => setState(() => country = value),\n)"
  },
  "datefield": {
    "title": "Date field",
    "api": "RibDateField",
    "index": 1,
    "kind": "New",
    "desc": "A date input with an anchored calendar, month/year navigation and date bounds.",
    "source": "flutter/lib/src/components/rib_date_field.dart",
    "constructor": "const RibDateField({\n    required this.label,\n    required this.onChanged,\n    this.value,\n    this.firstDate,\n    this.lastDate,\n    this.validator,\n    this.icon,\n    this.placeholder,\n    this.type = RibInputFieldType.labelOut,\n    super.key,\n  });",
    "usage": "RibDateField(\n  label: 'Date of incorporation',\n  value: date,\n  firstDate: DateTime(1900),\n  lastDate: DateTime.now(),\n  onChanged: (value) => setState(() => date = value),\n)"
  },
  "radio": {
    "title": "Radio group",
    "api": "RibRadioGroup",
    "index": 2,
    "kind": "New",
    "desc": "Exclusive choices with GlobalDS radio assets, stable accessible targets, validation and stacked or inline layout.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibRadioGroup({\n    required this.label,\n    required this.options,\n    required this.onChanged,\n    this.value,\n    this.validator,\n    this.inline = false,\n    this.showLabel = true,\n    this.labelSpacing = DsSpacing.md,\n    super.key,\n  });",
    "usage": "RibRadioGroup<bool>(\n  label: 'Do you have an existing account?',\n  options: const {true: 'Yes', false: 'No'},\n  value: hasAccount,\n  onChanged: (value) => setState(() => hasAccount = value),\n)"
  },
  "toggle": {
    "title": "Toggle",
    "api": "RibToggle",
    "index": 3,
    "kind": "New",
    "desc": "Controlled on/off selection using the GlobalDS track geometry, colours and accessible switch semantics.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibToggle({\n    required this.label,\n    required this.value,\n    required this.onChanged,\n    super.key,\n  });",
    "usage": "RibToggle(\n  label: 'Enable alerts',\n  value: alerts,\n  onChanged: (value) => setState(() => alerts = value),\n)"
  },
  "segmented": {
    "title": "Segmented control",
    "api": "RibSegmentedControl",
    "index": 4,
    "kind": "New",
    "desc": "A controlled choice between a small set of discrete options.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibSegmentedControl({\n    required this.options,\n    required this.value,\n    required this.onChanged,\n    super.key,\n  });",
    "usage": "RibSegmentedControl<String>(\n  options: const {'business': 'Business', 'individual': 'Individual'},\n  value: accountType,\n  onChanged: (value) => setState(() => accountType = value),\n)"
  },
  "otp": {
    "title": "OTP input",
    "api": "RibOtpField",
    "index": 5,
    "kind": "New",
    "desc": "Single-field numeric entry, paste, length limits, autofill and a slot for the app-owned resend action. Expiry and verification remain app-owned.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibOtpField({\n    required this.onChanged,\n    this.controller,\n    this.length = 6,\n    this.resend,\n    this.errorText,\n    this.enabled = true,\n    this.autofocus = false,\n    super.key,\n  });",
    "usage": "RibOtpField(\n  controller: otpController,\n  length: 6,\n  errorText: verificationError,\n  onChanged: (value) => setState(() => otp = value),\n)"
  },
  "stepper": {
    "title": "Stepper",
    "api": "RibStepper",
    "index": 6,
    "kind": "New",
    "desc": "Responsive progress with current, completed and upcoming semantics; optional persistent labels for short flows.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibStepper({\n    required this.steps,\n    required this.currentIndex,\n    this.completed = const {},\n    this.showLabels = false,\n    this.completedIcon,\n    this.onStepSelected,\n    super.key,\n  }) : assert(steps.length > 0);",
    "usage": "RibStepper(\n  steps: const ['Details', 'Verify', 'Review'],\n  currentIndex: currentStep,\n  completed: completedSteps,\n  showLabels: true,\n  onStepSelected: (value) => setState(() => currentStep = value),\n)"
  },
  "upload": {
    "title": "Upload",
    "api": "RibUpload",
    "index": 7,
    "kind": "New",
    "desc": "Idle, uploading, uploaded and error presentation. The app owns file selection, limits and network operations.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibUpload({\n    required this.label,\n    required this.requirements,\n    required this.onSelect,\n    this.state = RibUploadState.idle,\n    this.fileName,\n    this.errorText,\n    this.onRemove,\n    super.key,\n  });",
    "usage": "RibUpload(\n  label: 'Supporting document',\n  requirements: 'Choose a supported file',\n  state: uploadState,\n  fileName: fileName,\n  onSelect: chooseFile,\n  onRemove: removeFile,\n)"
  },
  "textfield": {
    "title": "Input field",
    "api": "RibInputField",
    "index": 8,
    "kind": "Improved",
    "desc": "Native Form validation, full-width layout, prefix/trailing slots, read-only state and clearer floating labels. Focus preserves text selection.",
    "source": "flutter/lib/src/components/rib_input_field.dart",
    "constructor": "const RibInputField({\n    required this.label,\n    this.type = RibInputFieldType.labelInline,\n    this.textSize = RibInputTextSize.defaultSize,\n    this.controller,\n    this.helper,\n    this.placeholder,\n    this.floatingLabelBehavior = FloatingLabelBehavior.auto,\n    this.errorText,\n    this.leading,\n    this.rightLabel,\n    this.enabled = true,\n    this.onChanged,\n    this.width = 245,\n    this.initialValue,\n    this.validator,\n    this.autovalidateMode = AutovalidateMode.disabled,\n    this.focusNode,\n    this.autofocus = false,\n    this.keyboardType,\n    this.textInputAction,\n    this.inputFormatters,\n    this.readOnly = false,\n    this.obscureText = false,\n    this.trailing,\n    this.onTap,\n    this.onFieldSubmitted,\n    this.autofillHints,\n    this.hintMaxLines = 1,\n    super.key,\n  });",
    "usage": "RibInputField(\n  label: 'Company name',\n  width: double.infinity,\n  controller: companyController,\n  validator: (value) => value == null || value.trim().isEmpty\n      ? 'Enter company name' : null,\n)"
  },
  "button": {
    "title": "Button",
    "api": "RibButton",
    "index": 9,
    "kind": "Improved",
    "desc": "Correct primary fill beneath the highlight, accessible actions and loading that blocks repeated activation. Optional corner-radius override.",
    "source": "flutter/lib/src/components/rib_button.dart",
    "constructor": "const RibButton({\n    required this.label,\n    this.variant = RibButtonVariant.primary,\n    this.size = RibButtonSize.large,\n    this.leadingIcon,\n    this.trailingIcon,\n    this.expanded = false,\n    this.loading = false,\n    this.borderRadius,\n    this.onPressed,\n    super.key,\n  }) : assert(\n         leadingIcon == null || trailingIcon == null,\n         'RIB Button supports one icon position at a time.',\n       ),\n       assert(\n         variant != RibButtonVariant.secondary || size == RibButtonSize.small,\n         'The RIB Secondary button is available in Small only.',\n       );",
    "usage": "RibButton(\n  label: 'Continue',\n  loading: submitting,\n  onPressed: submit,\n)"
  },
  "checkbox": {
    "title": "Checkbox",
    "api": "RibCheckbox",
    "index": 10,
    "kind": "Improved",
    "desc": "Wrapping labels, accessible targets and a checkbox-only visual option that retains its semantic label. Uses the GlobalDS checked/unchecked assets.",
    "source": "flutter/lib/src/components/rib_checkbox.dart",
    "constructor": "const RibCheckbox({\n    required this.value,\n    required this.label,\n    required this.onChanged,\n    this.size = RibCheckboxSize.small,\n    this.showLabel = true,\n    super.key,\n  });",
    "usage": "RibCheckbox(\n  label: 'I confirm that the information is correct',\n  value: confirmed,\n  onChanged: (value) => setState(() => confirmed = value),\n)"
  },
  "calendar": {
    "title": "Calendar",
    "api": "RibCalendar",
    "index": 11,
    "kind": "Improved",
    "desc": "Complete six-week months, controlled month/year selection and enforced date bounds. Uses GlobalDS navigation icons.",
    "source": "flutter/lib/src/components/rib_calendar.dart",
    "constructor": "const RibCalendar({\n    required this.month,\n    this.mode = RibCalendarMode.date,\n    this.selectedDate,\n    this.rangeStart,\n    this.rangeEnd,\n    this.onDateSelected,\n    this.onPreviousMonth,\n    this.onNextMonth,\n    this.firstDate,\n    this.lastDate,\n    this.onModeChanged,\n    this.onMonthChanged,\n    super.key,\n  });",
    "usage": "RibCalendar(\n  month: displayedMonth,\n  selectedDate: selectedDate,\n  onDateSelected: (value) => setState(() => selectedDate = value),\n)"
  },
  "accordions": {
    "title": "Accordion",
    "api": "RibAccordion",
    "index": 12,
    "kind": "Improved",
    "desc": "Optional header actions and maintainState preserve form fields through collapse. Leading and disclosure icons use GlobalDS assets.",
    "source": "flutter/lib/src/components/rib_accordion.dart",
    "constructor": "const RibAccordion({\n    required this.title,\n    required this.content,\n    required this.expanded,\n    required this.onChanged,\n    this.variant = RibAccordionVariant.plain,\n    this.subtitle,\n    this.leading,\n    this.actions = const [],\n    this.maintainState = false,\n    this.animationDuration = const Duration(milliseconds: 200),\n    super.key,\n  });",
    "usage": "RibAccordion(\n  title: 'Business details',\n  expanded: expanded,\n  maintainState: true,\n  onChanged: (value) => setState(() => expanded = value),\n  content: details,\n)"
  },
  "info": {
    "title": "Info",
    "api": "RibInfo",
    "index": 13,
    "kind": "Improved",
    "desc": "Responsive text wrapping, optional title/body styling and isolated guidance semantics. All four tones use GlobalDS icons and colours.",
    "source": "flutter/lib/src/components/rib_info.dart",
    "constructor": "const RibInfo({\n    required this.message,\n    this.tone = RibInfoTone.defaultTone,\n    this.centre = false,\n    this.stroke = false,\n    this.showIcon = true,\n    this.width = 516,\n    this.textStyle,\n    this.title,\n    super.key,\n  });",
    "usage": "RibInfo(\n  title: 'Before you continue',\n  message: 'Keep your business details ready.',\n  textStyle: DsText.h3Regular,\n  width: double.infinity,\n)"
  }
};
for (const [id, spec] of Object.entries(FLUTTER_CORE_COMPONENTS)) {
  const existing = COMPONENTS[id];
  COMPONENTS[id] = {...(existing || {}), title: spec.title, group: 'Flutter',
    version: '0.6.0-dev.1', updated: '12 Sep 2026', status: 'beta',
    desc: spec.desc, flutterCore: spec, sections: existing?.sections || [],
    flutter: spec.usage};
  // Previous unpublished illustrations are not the implementation contract.
  if (spec.kind === 'New') COMPONENTS[id].sections = [];
}
function renderFlutterComponentPage(id, c) {
  const spec = c.flutterCore;
  const preview = 'flutter-preview/?component=' + encodeURIComponent(id);
  const heights = {select:360,datefield:460,radio:220,toggle:140,segmented:140,otp:160,stepper:180,upload:340,textfield:360,button:320,checkbox:200,calendar:380,accordions:260,info:480};
  const source = 'https://github.com/paneerpakoda/global-design-system/blob/codex/flutter-core-components/' + spec.source;
  let html = pageHeader({crumbs:['Components','Flutter',c.title], title:c.title,
    version:c.version, updated:c.updated, desc:c.desc});
  html += `<section class="section flutter-component-preview">
    <div class="flutter-preview-toolbar"><h2 class="section-title">Live Flutter preview</h2>
      <span class="pill info">${esc(spec.kind)} in Flutter</span>
      <a href="${preview}" target="_blank" rel="noopener">Open full preview ↗</a></div>
    <p class="section-note">Interact with the actual GlobalDS Flutter component. The example owns its sample values and callbacks.</p>
    <iframe class="flutter-preview-frame" style="height:${heights[id]}px" src="${preview}&embed=true" title="${esc(c.title)} — live Flutter component" loading="lazy"></iframe>
    <p class="section-note">If the preview is unavailable, <a href="${source}" target="_blank" rel="noopener">view the Dart source</a> or run <code>flutter run -d chrome</code> from <code>flutter/example</code>.</p>
  </section>`;
  html += sectionHtml({title:spec.kind === 'New' ? 'What this component provides' : 'What improved',
    html:'<p>' + esc(spec.desc) + '</p>'});
  html += sectionHtml({title:'Use in Flutter', note:'Import package:global_ds/global_ds.dart. State variables, controllers and callbacks in this example belong to your application.', html:codeblock(spec.usage,'dart')});
  html += sectionHtml({title:'Constructor', note:'Public constructor from the GlobalDS Flutter implementation. Follow the Dart source for full types and behavior.', html:codeblock(spec.constructor,'dart') + '<p><a href="' + source + '" target="_blank" rel="noopener">View full API source ↗</a></p>'});
  html += sectionHtml({title:'GlobalDS foundations', html:`<p>Uses the shared <code>DsText</code>, <code>DsColors</code>, <code>DsSpacing</code>, <code>DsRadius</code> and <code>DsEffects</code> foundations. Control icons use original GlobalDS SVG assets through <code>DsIcon</code>.</p><p><a href="#/f/typography">Typography</a> · <a href="#/f/colors">Colours</a> · <a href="#/f/spacing">Spacing</a> · <a href="#/f/icons">Icons</a> · <a href="#/developers">Install the Flutter package</a></p><p>Development branch: <code>codex/flutter-core-components</code>. Requires Flutter 3.35+ and Dart 3.9+.</p>`});
  if (c.sections.length) html += '<details class="flutter-design-references"><summary>Design references · earlier catalogue specimens</summary><p class="section-note">These HTML illustrations document design variants. Use the live Flutter preview and constructor above for the implemented API.</p>' + c.sections.map(s => sectionHtml({title:s.title,html:'<div class="component-static-preview" data-static-component-preview>' + s.html + '</div>'})).join('') + '</details>';
  return html;
}

if (typeof document !== 'undefined') {
  for (const token of DS.space) document.documentElement.style.setProperty('--ds-space-' + token.dart, token.px + 'px');
}
