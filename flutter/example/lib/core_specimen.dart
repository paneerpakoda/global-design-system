import 'package:flutter/material.dart';
import 'package:global_ds/global_ds.dart';

class CoreSpecimen extends StatefulWidget {
  const CoreSpecimen({
    required this.id,
    required this.variant,
    required this.state,
    this.size = 'Large',
    this.iconPosition = 'None',
    super.key,
  });
  final String id, variant, state, size, iconPosition;
  @override
  State<CoreSpecimen> createState() => _CoreSpecimenState();
}

class _CoreSpecimenState extends State<CoreSpecimen> {
  late bool flag = [
    'On',
    'Checked',
    'Disabled checked',
    'Expanded',
  ].contains(widget.state);
  late bool? radio = widget.state == 'Selected' ? true : null;
  late String? country = widget.state == 'Filled' ? 'IN' : null;
  late String segment = widget.state == 'Last selected' ? 'yearly' : 'monthly';
  late DateTime? date = widget.state == 'Empty' ? null : DateTime(2026, 9, 12);
  DateTime month = DateTime(2026, 9);
  late RibCalendarMode mode = widget.variant == 'Month and year'
      ? RibCalendarMode.monthYear
      : RibCalendarMode.date;
  DateTime? rangeStart = DateTime(2026, 9, 8), rangeEnd = DateTime(2026, 9, 14);
  bool obscure = true;
  RibUploadState? uploadOverride;
  int? stepOverride;
  late final code = TextEditingController(
    text: ['Empty', 'Timer', 'Resend available'].contains(widget.state)
        ? ''
        : (widget.variant == 'Four boxes' ? '1234' : '123456'),
  );
  bool get disabled => widget.state.startsWith('Disabled');
  String get variant => widget.variant;
  @override
  void dispose() {
    code.dispose();
    super.dispose();
  }

  Widget icon(DsIconData data, {double size = 20}) => Center(
    widthFactor: 1,
    heightFactor: 1,
    child: DsIcon(data, size: size, color: DsColors.neutralGrey120),
  );
  @override
  Widget build(BuildContext context) {
    switch (widget.id) {
      case 'button':
        const styles = {
          'Primary': RibButtonVariant.primary,
          'Outline': RibButtonVariant.outline,
          'Text': RibButtonVariant.secondary,
          'Pastel': RibButtonVariant.pastel,
          'White': RibButtonVariant.white,
          'Destructive outline': RibButtonVariant.destructiveOutline,
          'Destructive filled': RibButtonVariant.destructiveFilled,
        };
        return Align(
          alignment: Alignment.centerLeft,
          child: RibButton(
            label: variant.startsWith('Destructive') ? 'Delete' : 'Continue',
            variant: styles[variant]!,
            size: variant == 'Text' || widget.size == 'Small'
                ? RibButtonSize.small
                : widget.size == 'Extra small'
                ? RibButtonSize.xSmall
                : RibButtonSize.large,
            loading: widget.state == 'Loading',
            onPressed: disabled ? null : () {},
            leadingIcon: widget.iconPosition == 'Leading'
                ? const DsIcon(DsIconData.document, size: 16)
                : null,
            trailingIcon: widget.iconPosition == 'Trailing'
                ? const DsIcon(DsIconData.chevronRight, size: 16)
                : null,
          ),
        );
      case 'accordions':
        const styles = {
          'Standard container': RibAccordionVariant.standardContainer,
          'Plain': RibAccordionVariant.plain,
          'No container': RibAccordionVariant.noContainer,
          'Coloured background': RibAccordionVariant.colouredBackground,
          'Heading and subheading': RibAccordionVariant.explanationContainer,
        };
        return RibAccordion(
          title: 'Business details',
          subtitle: 'Company information and registered address',
          variant: styles[variant]!,
          expanded: flag,
          onChanged: (v) => setState(() => flag = v),
          maintainState: true,
          content: const Text(
            'Add your business information here. This content stays available when the section is reopened.',
          ),
        );
      case 'checkbox':
        return Align(
          alignment: Alignment.centerLeft,
          child: RibCheckbox(
            label: variant == 'Checkbox only'
                ? 'Select item'
                : 'I confirm that the information provided is correct.',
            size: variant == 'Large'
                ? RibCheckboxSize.large
                : RibCheckboxSize.small,
            showLabel: variant != 'Checkbox only',
            value: flag,
            onChanged: disabled ? null : (v) => setState(() => flag = v),
          ),
        );
      case 'info':
        const tones = {
          'Information': RibInfoTone.defaultTone,
          'Success': RibInfoTone.success,
          'Error': RibInfoTone.error,
          'Warning': RibInfoTone.warning,
        };
        return RibInfo(
          title: variant == 'Heading and body' ? 'Before you continue' : null,
          message:
              'Keep your business documents ready. You can save your progress and return later.',
          width: double.infinity,
          tone: tones[widget.state]!,
          showIcon: variant != 'Without icon',
          stroke: variant == 'With outline',
          centre: variant == 'Centred content',
        );
      case 'textfield':
        final error = widget.state == 'Error' || variant == 'Error message';
        if (variant.startsWith('Date')) {
          return RibDateField(
            label: 'Date of incorporation',
            placeholder: 'DD/MM/YYYY',
            type: variant.endsWith('inline label')
                ? RibInputFieldType.labelInline
                : RibInputFieldType.labelOut,
            value: date,
            enabled: !disabled,
            readOnly: widget.state == 'Read-only',
            errorText: error ? 'Choose a valid date' : null,
            helper: 'Use the date on your registration document',
            firstDate: DateTime(1900),
            lastDate: DateTime(2026, 12, 31),
            onChanged: (v) => setState(() => date = v),
          );
        }
        return RibInputField(
          textSize: widget.size == 'Large'
              ? RibInputTextSize.large
              : RibInputTextSize.defaultSize,
          label: variant == 'Phone'
              ? 'Phone number'
              : variant == 'Amount'
              ? 'Amount'
              : variant == 'Password'
              ? 'Password'
              : 'Company name',
          placeholder: variant == 'Phone'
              ? 'Enter phone number'
              : variant == 'Amount'
              ? 'Enter amount'
              : variant == 'Password'
              ? 'Enter password'
              : 'Enter company name',
          type: variant == 'Outside label'
              ? RibInputFieldType.labelOut
              : variant == 'Text area'
              ? RibInputFieldType.textArea
              : RibInputFieldType.labelInline,
          width: double.infinity,
          initialValue: widget.state == 'Empty'
              ? ''
              : variant == 'Phone'
              ? '9876543210'
              : variant == 'Amount'
              ? '1250.00'
              : 'Example business',
          enabled: !disabled,
          readOnly: widget.state == 'Read-only',
          obscureText: variant == 'Password' && obscure,
          errorText: error ? 'Enter a valid value' : null,
          helper: variant == 'Helper text'
              ? 'Enter the name on your registration document'
              : null,
          leading: variant == 'Leading icon'
              ? Padding(
                  padding: const EdgeInsets.only(left: DsSpacing.md),
                  child: icon(DsIconData.document),
                )
              : variant == 'Phone'
              ? SizedBox(
                  width: 72,
                  child: RibSelectField<String>(
                    label: 'Calling code',
                    compact: true,
                    embedded: true,
                    value: country == '+1' ? '+1' : '+91',
                    items: const [
                      RibDropdownItem(value: '+91', label: '+91'),
                      RibDropdownItem(value: '+1', label: '+1'),
                    ],
                    onChanged: disabled || widget.state == 'Read-only'
                        ? null
                        : (v) => setState(() => country = v),
                  ),
                )
              : variant == 'Amount'
              ? const Center(
                  widthFactor: 1,
                  child: Text('₹', style: DsText.h3Semi),
                )
              : null,
          rightLabel: variant == 'Trailing text'
              ? 'Text'
              : variant == 'Amount'
              ? 'INR'
              : null,
          trailing: variant == 'Trailing icon'
              ? Padding(
                  padding: const EdgeInsets.all(DsSpacing.md),
                  child: icon(DsIconData.info),
                )
              : variant == 'Password'
              ? IconButton(
                  tooltip: obscure ? 'Show password' : 'Hide password',
                  onPressed: disabled
                      ? null
                      : () => setState(() => obscure = !obscure),
                  icon: icon(
                    obscure
                        ? DsIconData.visibilityOn
                        : DsIconData.visibilityOff,
                  ),
                )
              : null,
        );
      case 'select':
        if (variant == 'Calling code') {
          return RibInputField(
            label: 'Phone number',
            placeholder: 'Enter phone number',
            width: double.infinity,
            enabled: !disabled,
            leading: SizedBox(
              width: 72,
              child: RibSelectField<String>(
                label: 'Calling code',
                enabled: !disabled,
                compact: true,
                embedded: true,
                value: country == '+1' ? '+1' : '+91',
                items: const [
                  RibDropdownItem(value: '+91', label: '+91'),
                  RibDropdownItem(value: '+1', label: '+1'),
                ],
                onChanged: (v) => setState(() => country = v),
              ),
            ),
          );
        }
        return RibSelectField<String>(
          label: variant == 'Calling code' ? 'Calling code' : 'Country',
          placeholder: 'Choose a country',
          enabled: !disabled,
          value: country,
          type: variant == 'Inline label'
              ? RibInputFieldType.labelInline
              : RibInputFieldType.labelOut,
          searchable: variant == 'Searchable',
          compact: variant == 'Compact' || variant == 'Calling code',
          items: const [
            RibDropdownItem(
              value: 'IN',
              label: 'India',
              subheading: 'Indian rupee · INR',
            ),
            RibDropdownItem(
              value: 'SG',
              label: 'Singapore',
              subheading: 'Singapore dollar · SGD',
            ),
            RibDropdownItem(
              value: 'US',
              label: 'United States',
              subheading: 'US dollar · USD',
            ),
          ],
          showSubheadings: variant == 'With subheading',
          onChanged: (v) => setState(() => country = v),
        );
      case 'radio':
        return RibRadioGroup<bool>(
          label: 'Do you have an existing account?',
          options: const {true: 'Yes', false: 'No'},
          value: radio,
          inline: variant == 'Inline',
          onChanged: disabled ? null : (v) => setState(() => radio = v),
        );
      case 'toggle':
        return RibToggle(
          label: 'Transaction alerts',
          value: flag,
          onChanged: disabled ? null : (v) => setState(() => flag = v),
        );
      case 'segmented':
        return RibSegmentedControl<String>(
          label: 'Statement frequency',
          value: segment,
          options: variant == 'Two options'
              ? const {'monthly': 'Monthly', 'yearly': 'Yearly'}
              : const {
                  'monthly': 'Monthly',
                  'quarterly': 'Quarterly',
                  'yearly': 'Yearly',
                },
          onChanged: disabled ? null : (v) => setState(() => segment = v),
        );
      case 'otp':
        return RibOtpField(
          controller: code,
          length: variant == 'Four boxes' ? 4 : 6,
          enabled: !disabled,
          variant: variant == 'Single field'
              ? RibOtpVariant.single
              : variant == 'Grouped six'
              ? RibOtpVariant.grouped
              : RibOtpVariant.boxed,
          status: widget.state == 'Verifying'
              ? RibOtpStatus.verifying
              : widget.state == 'Verified'
              ? RibOtpStatus.verified
              : RibOtpStatus.idle,
          obscureText: variant == 'Masked boxes',
          errorText: widget.state == 'Error'
              ? 'Incorrect code. Please try again.'
              : null,
          resend: widget.state == 'Timer'
              ? const Text('Resend in 00:20', style: DsText.p1Reg)
              : widget.state == 'Resend available' || widget.state == 'Error'
              ? RibButton(
                  label: 'Resend OTP',
                  variant: RibButtonVariant.secondary,
                  size: RibButtonSize.small,
                  onPressed: () {},
                )
              : null,
          onChanged: (_) {},
        );
      case 'stepper':
        final short = variant == 'Short flow';
        final steps = short
            ? const ['Mobile', 'Email']
            : const ['Business', 'Ownership', 'Review', 'Submit'];
        final current =
            stepOverride ??
            (widget.state == 'First step'
                ? 0
                : widget.state == 'Complete'
                ? steps.length - 1
                : 1);
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            RibStepper(
              steps: steps,
              currentIndex: current,
              completed: {
                for (
                  var i = 0;
                  i < (widget.state == 'Complete' ? steps.length : current);
                  i++
                )
                  i,
              },
              variant: variant == 'Vertical'
                  ? RibStepperVariant.vertical
                  : variant == 'Compact'
                  ? RibStepperVariant.compact
                  : short
                  ? RibStepperVariant.adaptive
                  : RibStepperVariant.horizontal,
              showLabels: short,
              errorIndex: widget.state == 'Error' ? current : null,
              onStepSelected: (v) => setState(() => stepOverride = v),
              descriptions: variant == 'Vertical'
                  ? const [
                      'Company information',
                      'Owners and controllers',
                      'Check your details',
                      'Complete registration',
                    ]
                  : null,
            ),
            const SizedBox(height: DsSpacing.md),
            Wrap(
              spacing: DsSpacing.sm,
              children: [
                TextButton(
                  onPressed: current == 0
                      ? null
                      : () => setState(() => stepOverride = current - 1),
                  child: const Text('Previous step'),
                ),
                TextButton(
                  onPressed: current == steps.length - 1
                      ? null
                      : () => setState(() => stepOverride = current + 1),
                  child: const Text('Next step'),
                ),
              ],
            ),
          ],
        );
      case 'upload':
        final state =
            uploadOverride ??
            (widget.state == 'Uploading'
                ? RibUploadState.uploading
                : widget.state == 'Uploaded'
                ? RibUploadState.uploaded
                : widget.state == 'Error'
                ? RibUploadState.error
                : RibUploadState.idle);
        return RibUpload(
          label: 'Supporting document',
          requirements: 'PDF, JPG or PNG · Example file requirement',
          variant: variant == 'Compact selector'
              ? RibUploadVariant.compact
              : RibUploadVariant.dropZone,
          state: state,
          enabled: !disabled,
          fileName: state == RibUploadState.idle
              ? null
              : 'business-registration.pdf',
          fileDetails: 'PDF · 1.4 MB',
          progress: .62,
          errorText: 'Upload failed. Check your connection and try again.',
          onSelect: () =>
              setState(() => uploadOverride = RibUploadState.uploaded),
          onRemove: state == RibUploadState.idle
              ? null
              : () => setState(() => uploadOverride = RibUploadState.idle),
        );
      case 'calendar':
        return Align(
          alignment: Alignment.centerLeft,
          child: RibCalendar(
            month: month,
            mode: variant == 'Date range' && mode != RibCalendarMode.monthYear
                ? RibCalendarMode.range
                : mode,
            rangeStart: rangeStart,
            rangeEnd: rangeEnd,
            selectedDate: date,
            firstDate: variant == 'Bounded dates' ? DateTime(2026, 9, 5) : null,
            lastDate: variant == 'Bounded dates' ? DateTime(2026, 9, 25) : null,
            onPreviousMonth: () =>
                setState(() => month = DateTime(month.year, month.month - 1)),
            onNextMonth: () =>
                setState(() => month = DateTime(month.year, month.month + 1)),
            onDateSelected: (v) => setState(() {
              date = v;
              if (variant == 'Date range') {
                if (rangeStart == null ||
                    rangeEnd != null ||
                    v.isBefore(rangeStart!)) {
                  rangeStart = v;
                  rangeEnd = null;
                } else {
                  rangeEnd = v;
                }
              }
            }),
            onModeChanged: (v) => setState(() => mode = v),
            onMonthChanged: (v) => setState(() => month = v),
          ),
        );
      default:
        return const SizedBox.shrink();
    }
  }
}
