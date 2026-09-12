// Current Flutter core APIs; product compositions remain separate patterns.
const FLUTTER_CORE_COMPONENTS = {
  "dropdown": {
    "title": "Dropdown",
    "api": "RibSelectField",
    "index": 0,
    "kind": "Improved",
    "desc": "Labelled down-chevron fields paired with anchored menus. Includes inline/outside labels, search, compact, calling-code and subheading variants.",
    "source": "flutter/lib/src/components/rib_select_field.dart",
    "constructor": "const RibSelectField({\n    required this.label,\n    required this.items,\n    required this.onChanged,\n    this.value,\n    this.validator,\n    this.enabled = true,\n    this.searchable = false,\n    this.showSubheadings = false,\n    this.compact = false,\n    this.embedded = false,\n    this.leading,\n    this.placeholder,\n    this.type = RibInputFieldType.labelInline,\n    super.key,\n  });",
    "usage": "RibSelectField<String>(\n  label: 'Country',\n  value: country,\n  searchable: true,\n  items: const [RibDropdownItem(value: 'IN', label: 'India')],\n  onChanged: (value) => setState(() => country = value),\n)"
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
    "desc": "A connected choice between two or three related options, such as Monthly / Yearly. The selected option stays visibly raised within one shared track. Longer questions belong in a radio group.",
    "source": "flutter/lib/src/components/rib_segmented_control.dart",
    "constructor": "const RibSegmentedControl({\n    required this.options,\n    required this.value,\n    required this.onChanged,\n    this.label,\n    super.key,\n  });",
    "usage": "RibSegmentedControl<String>(\n  options: const {'business': 'Business', 'individual': 'Individual'},\n  value: accountType,\n  onChanged: (value) => setState(() => accountType = value),\n)"
  },
  "otp": {
    "title": "OTP input",
    "api": "RibOtpField",
    "index": 5,
    "kind": "New",
    "desc": "Single-field, four-box, six-box, grouped and masked entry. Supports paste/autofill, error, verifying, verified and disabled states, plus an app-owned timer or resend action.",
    "source": "flutter/lib/src/components/rib_otp_field.dart",
    "constructor": "const RibOtpField({\n    required this.onChanged,\n    this.controller,\n    this.length = 6,\n    this.resend,\n    this.errorText,\n    this.enabled = true,\n    this.autofocus = false,\n    this.variant = RibOtpVariant.single,\n    this.status = RibOtpStatus.idle,\n    this.obscureText = false,\n    super.key,\n  }) : assert(length > 0);",
    "usage": "RibOtpField(\n  controller: otpController,\n  length: 6,\n  errorText: verificationError,\n  onChanged: (value) => setState(() => otp = value),\n)"
  },
  "stepper": {
    "title": "Stepper",
    "api": "RibStepper",
    "index": 6,
    "kind": "New",
    "desc": "Horizontal, vertical, compact and short-flow progress. Defines upcoming, current, completed and error states; completed steps may be revisited. Adaptive layout uses compact progress on narrow screens.",
    "source": "flutter/lib/src/components/rib_form_controls.dart",
    "constructor": "const RibStepper({\n    required this.steps,\n    required this.currentIndex,\n    this.completed = const {},\n    this.showLabels = false,\n    this.completedIcon,\n    this.onStepSelected,\n    this.variant = RibStepperVariant.adaptive,\n    this.descriptions,\n    this.errorIndex,\n    super.key,\n  }) : assert(steps.length > 0),\n       assert(descriptions == null || descriptions.length == steps.length);",
    "usage": "RibStepper(\n  steps: const ['Details', 'Verify', 'Review'],\n  currentIndex: currentStep,\n  completed: completedSteps,\n  showLabels: true,\n  onStepSelected: (value) => setState(() => currentStep = value),\n)"
  },
  "upload": {
    "title": "Upload",
    "api": "RibUpload",
    "index": 7,
    "kind": "New",
    "desc": "Upload-area and compact-selector variants with requirements, file details, progress, success, retry and removal. File selection, validation and transfer remain app-owned.",
    "source": "flutter/lib/src/components/rib_upload.dart",
    "constructor": "const RibUpload({\n    required this.label,\n    required this.requirements,\n    required this.onSelect,\n    this.state = RibUploadState.idle,\n    this.fileName,\n    this.fileDetails,\n    this.errorText,\n    this.onRemove,\n    this.progress,\n    this.enabled = true,\n    this.variant = RibUploadVariant.dropZone,\n    super.key,\n  });",
    "usage": "RibUpload(\n  label: 'Supporting document',\n  requirements: 'Choose a supported file',\n  state: uploadState,\n  fileName: fileName,\n  onSelect: chooseFile,\n  onRemove: removeFile,\n)"
  },
  "textfield": {
    "title": "Input field",
    "api": "RibInputField",
    "index": 8,
    "kind": "Improved",
    "desc": "Complete input family: inline/outside labels, leading and trailing content, phone, amount, password, helper/error, text area and date fields. Native validation, focus and read-only behaviour are retained.",
    "source": "flutter/lib/src/components/rib_input_field.dart",
    "constructor": "const RibInputField({\n    required this.label,\n    this.type = RibInputFieldType.labelInline,\n    this.textSize = RibInputTextSize.defaultSize,\n    this.controller,\n    this.helper,\n    this.placeholder,\n    this.floatingLabelBehavior = FloatingLabelBehavior.auto,\n    this.errorText,\n    this.leading,\n    this.rightLabel,\n    this.enabled = true,\n    this.onChanged,\n    this.width = 245,\n    this.initialValue,\n    this.validator,\n    this.autovalidateMode = AutovalidateMode.disabled,\n    this.focusNode,\n    this.autofocus = false,\n    this.keyboardType,\n    this.textInputAction,\n    this.inputFormatters,\n    this.readOnly = false,\n    this.obscureText = false,\n    this.trailing,\n    this.onTap,\n    this.onFieldSubmitted,\n    this.autofillHints,\n    this.hintMaxLines = 1,\n    super.key,\n  });",
    "usage": "RibInputField(\n  label: 'Company name',\n  width: double.infinity,\n  controller: companyController,\n  validator: (value) => value == null || value.trim().isEmpty\n      ? 'Enter company name' : null,\n)",
    "related": [
      {
        "title": "Date field",
        "api": "RibDateField",
        "index": 1,
        "kind": "New",
        "desc": "A date input with an anchored calendar, month/year navigation and date bounds.",
        "source": "flutter/lib/src/components/rib_date_field.dart",
        "constructor": "const RibDateField({\n    required this.label,\n    required this.onChanged,\n    this.value,\n    this.firstDate,\n    this.lastDate,\n    this.validator,\n    this.icon,\n    this.placeholder,\n    this.helper,\n    this.errorText,\n    this.enabled = true,\n    this.readOnly = false,\n    this.type = RibInputFieldType.labelOut,\n    super.key,\n  });",
        "usage": "RibDateField(\n  label: 'Date of incorporation',\n  value: date,\n  firstDate: DateTime(1900),\n  lastDate: DateTime.now(),\n  onChanged: (value) => setState(() => date = value),\n)"
      }
    ]
  },
  "button": {
    "title": "Button",
    "api": "RibButton",
    "index": 9,
    "kind": "Improved",
    "desc": "Seven button styles with size and icon variants. Default, hover, focus, pressed and disabled states remain; loading is an optional state that blocks repeated activation.",
    "source": "flutter/lib/src/components/rib_button.dart",
    "constructor": "const RibButton({\n    required this.label,\n    this.variant = RibButtonVariant.primary,\n    this.size = RibButtonSize.large,\n    this.leadingIcon,\n    this.trailingIcon,\n    this.expanded = false,\n    this.loading = false,\n    this.borderRadius,\n    this.onPressed,\n    super.key,\n  }) : assert(\n         leadingIcon == null || trailingIcon == null,\n         'RIB Button supports one icon position at a time.',\n       ),\n       assert(\n         variant != RibButtonVariant.secondary || size == RibButtonSize.small,\n         'The RIB Secondary button is available in Small only.',\n       );",
    "usage": "RibButton(\n  label: 'Continue',\n  onPressed: submit,\n  // Set loading: submitting only during a pending action.\n)"
  },
  "checkbox": {
    "title": "Checkbox",
    "api": "RibCheckbox",
    "index": 10,
    "kind": "Improved",
    "desc": "Small, large and checkbox-only variants with wrapping labels. Rounded hover areas have internal padding and a minimum 44px target; checked, unchecked and disabled states remain.",
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
    "desc": "All five existing styles are retained, with expanded/collapsed states and full-width header interaction. Header targets are at least 48px high, and expanded content can retain its state.",
    "source": "flutter/lib/src/components/rib_accordion.dart",
    "constructor": "const RibAccordion({\n    required this.title,\n    required this.content,\n    required this.expanded,\n    required this.onChanged,\n    this.variant = RibAccordionVariant.plain,\n    this.subtitle,\n    this.leading,\n    this.actions = const [],\n    this.maintainState = false,\n    this.animationDuration = const Duration(milliseconds: 200),\n    super.key,\n  });",
    "usage": "RibAccordion(\n  title: 'Business details',\n  expanded: expanded,\n  maintainState: true,\n  onChanged: (value) => setState(() => expanded = value),\n  content: details,\n)"
  },
  "info": {
    "title": "Info",
    "api": "RibInfo",
    "index": 13,
    "kind": "Improved",
    "desc": "All four tones with body-only, heading/body, outline, icon-free and centred variants. The icon is vertically centred against the complete text block.",
    "source": "flutter/lib/src/components/rib_info.dart",
    "constructor": "const RibInfo({\n    required this.message,\n    this.tone = RibInfoTone.defaultTone,\n    this.centre = false,\n    this.stroke = false,\n    this.showIcon = true,\n    this.width = 516,\n    this.textStyle,\n    this.title,\n    super.key,\n  });",
    "usage": "RibInfo(\n  title: 'Before you continue',\n  message: 'Keep your business details ready.',\n  textStyle: DsText.h3Regular,\n  width: double.infinity,\n)"
  }
};
for (const [id, spec] of Object.entries(FLUTTER_CORE_COMPONENTS)) {
  const existing = COMPONENTS[id];
  COMPONENTS[id] = {...(existing || {}), title: spec.title, group: 'Flutter',
    version: '0.6.0-dev.1', updated: '13 Sep 2026', status: 'beta',
    desc: spec.desc, flutterCore: spec, sections: existing?.sections || [],
    flutter: spec.usage};
  // Previous unpublished illustrations are not the implementation contract.
  if (spec.kind === 'New') COMPONENTS[id].sections = [];
}
function renderFlutterComponentPage(id, c) {
  const spec = c.flutterCore;
  const preview = 'flutter-preview/?component=' + encodeURIComponent(id);
  const source = 'https://github.com/paneerpakoda/global-design-system/blob/codex/flutter-core-components/' + spec.source;
  let html = pageHeader({crumbs:['Components','Flutter',c.title], title:c.title,
    version:c.version, updated:c.updated, desc:c.desc});
  html += `<section class="section flutter-component-preview">
    <div class="flutter-preview-toolbar"><h2 class="section-title">Variants and states</h2>
      <span class="pill info">${esc(spec.kind)} in Flutter</span>
      <a href="${preview}" target="_blank" rel="noopener">Open full preview ↗</a></div>
    <p class="section-note">Choose a variant and state, then interact with the actual Flutter component. Scroll inside the preview to compare every variant. The example owns sample values and callbacks.</p>
    <iframe class="flutter-preview-frame" style="height:900px" src="${preview}&embed=true" title="${esc(c.title)} — live Flutter component" loading="lazy"></iframe>
    <p class="section-note">If the preview is unavailable, <a href="${source}" target="_blank" rel="noopener">view the Dart source</a> or run <code>flutter run -d chrome</code> from <code>flutter/example</code>.</p>
  </section>`;
  html += sectionHtml({title:spec.kind === 'New' ? 'What this component provides' : 'What improved',
    html:'<p>' + esc(spec.desc) + '</p>'});
  html += sectionHtml({title:'Use in Flutter', note:'Import package:global_ds/global_ds.dart. State variables, controllers and callbacks in this example belong to your application.', html:codeblock(spec.usage,'dart')});
  html += sectionHtml({title:'Constructor', note:'Public constructor from the GlobalDS Flutter implementation. Follow the Dart source for full types and behavior.', html:codeblock(spec.constructor,'dart') + '<p><a href="' + source + '" target="_blank" rel="noopener">View full API source ↗</a></p>'});
  for (const related of spec.related || []) {
    const relatedSource = 'https://github.com/paneerpakoda/global-design-system/blob/codex/flutter-core-components/' + related.source;
    html += sectionHtml({title:related.title + ' · part of ' + c.title,
      note:related.desc, html:codeblock(related.usage, 'dart') + codeblock(related.constructor, 'dart') + '<p><a href="' + relatedSource + '" target="_blank" rel="noopener">View Dart source ↗</a></p>'});
  }
  html += sectionHtml({title:'GlobalDS foundations', html:`<p>Uses the shared <code>DsText</code>, <code>DsColors</code>, <code>DsSpacing</code>, <code>DsRadius</code> and <code>DsEffects</code> foundations. Control icons use original GlobalDS SVG assets through <code>DsIcon</code>.</p><p><a href="#/f/typography">Typography</a> · <a href="#/f/colors">Colours</a> · <a href="#/f/spacing">Spacing</a> · <a href="#/f/icons">Icons</a> · <a href="#/developers">Install the Flutter package</a></p><p>Development branch: <code>codex/flutter-core-components</code>. Requires Flutter 3.35+ and Dart 3.9+.</p>`});
  if (c.sections.length) html += '<details class="flutter-design-references"><summary>Design references · earlier catalogue specimens</summary><p class="section-note">These HTML illustrations document design variants. Use the live Flutter preview and constructor above for the implemented API.</p>' + c.sections.map(s => sectionHtml({title:s.title,html:'<div class="component-static-preview" data-static-component-preview>' + s.html + '</div>'})).join('') + '</details>';
  return html;
}

if (typeof document !== 'undefined') {
  for (const token of DS.space) document.documentElement.style.setProperty('--ds-space-' + token.dart, token.px + 'px');
}
