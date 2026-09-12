import 'package:flutter/material.dart';
import 'package:global_ds/global_ds.dart';

void main() => runApp(const GlobalDSExample());

class GlobalDSExample extends StatelessWidget {
  const GlobalDSExample({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'GlobalDS Flutter components',
    theme: DsTheme.light,
    home: const ComponentCatalog(),
  );
}

// This is a developer example, not an exported design-system pattern.
class ComponentCatalog extends StatefulWidget {
  const ComponentCatalog({super.key});
  @override
  State<ComponentCatalog> createState() => _ComponentCatalogState();
}

class _ComponentCatalogState extends State<ComponentCatalog> {
  static const componentIds = [
    'select',
    'datefield',
    'radio',
    'toggle',
    'segmented',
    'otp',
    'stepper',
    'upload',
    'textfield',
    'button',
    'checkbox',
    'calendar',
    'accordions',
    'info',
  ];
  static int get initialSelection {
    final index = componentIds.indexOf(
      Uri.base.queryParameters['component'] ?? '',
    );
    return index < 0 ? 0 : index;
  }

  final embedded = Uri.base.queryParameters['embed'] == 'true';
  int selected = initialSelection, step = 1;
  String? country;
  String segment = 'business';
  bool? radio;
  bool toggle = false, checked = false, expanded = true, loading = false;
  DateTime month = DateTime(2021, 5);
  DateTime? date;
  RibCalendarMode calendarMode = RibCalendarMode.date;
  RibUploadState uploadState = RibUploadState.idle;
  static const names = [
    'Select field',
    'Date field',
    'Radio group',
    'Toggle',
    'Segmented control',
    'OTP field',
    'Stepper',
    'Upload',
    'Input field',
    'Button',
    'Checkbox',
    'Calendar',
    'Accordion',
    'Info',
  ];
  static const apis = [
    'RibSelectField<T>',
    'RibDateField',
    'RibRadioGroup<T>',
    'RibToggle',
    'RibSegmentedControl<T>',
    'RibOtpField',
    'RibStepper',
    'RibUpload',
    'RibInputField',
    'RibButton',
    'RibCheckbox',
    'RibCalendar',
    'RibAccordion',
    'RibInfo',
  ];
  static const changes = [
    'Search directly in the field. Options stay anchored, keyboard navigation works, and selecting an option ends editing cleanly.',
    'A controlled date input with an anchored calendar, minimum/maximum dates, placeholders and an optional custom icon.',
    'Validated exclusive choices with stacked or inline layout, 14px labels, 44px targets and stable accessibility targets when selection changes.',
    'Controlled on/off input using the shared 44 × 24 track geometry and accessible switch semantics.',
    'Controlled choices for a small set of options. The application owns the selected value.',
    'Numeric-only entry with code-length limits, whole-code paste, autofill, autofocus and an optional inline resend action. Timers remain app-owned.',
    'Responsive current, completed and upcoming stages. Short flows can retain labels at compact widths.',
    'Idle, uploading, uploaded and error states. Selection/removal callbacks let the app own file access and validation.',
    'Native Form validation, readable floating labels, placeholders, responsive width, prefix/trailing slots, keyboard options and consistent helper/error spacing.',
    'Correct orange primary fill, optional corner radius, distinct accessible actions and a loading state that blocks repeated activation.',
    'Long labels wrap; rich consent can use the checkbox-only variant. Labelled targets and semantics remain usable at phone widths.',
    'Six-week months no longer lose dates. Month/year selection and minimum/maximum boundaries are controlled by the app.',
    'Optional header actions and maintainState preserve editable content through collapse. The app owns expansion policy.',
    'Responsive wrapping, optional titles/body styling and isolated semantics keep guidance separate from the next form control.',
  ];
  bool get isNew => selected < 8;
  Widget gap() => const SizedBox(height: DsSpacing.lg);
  @override
  Widget build(BuildContext context) => embedded
      ? Scaffold(
          backgroundColor: DsColors.neutralBaseWhite,
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(DsSpacing.lg),
            child: preview(),
          ),
        )
      : Scaffold(
          appBar: AppBar(title: const Text('GlobalDS · Flutter components')),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 900),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text('Core components', style: DsText.h2Semi),
                    gap(),
                    const Text(
                      '8 new Flutter controls · 6 existing components improved',
                      style: DsText.h3Regular,
                    ),
                    gap(),
                    DropdownButtonFormField<int>(
                      initialValue: selected,
                      decoration: const InputDecoration(labelText: 'Component'),
                      isExpanded: true,
                      items: [
                        for (var i = 0; i < names.length; i++)
                          DropdownMenuItem(
                            value: i,
                            child: Text(
                              '${i < 8 ? 'New' : 'Improved'} · ${names[i]}',
                            ),
                          ),
                      ],
                      onChanged: (value) => setState(() {
                        selected = value!;
                        loading = false;
                        uploadState = RibUploadState.idle;
                      }),
                    ),
                    const SizedBox(height: DsSpacing.xl2),
                    Text(apis[selected], style: DsText.h2Semi),
                    const SizedBox(height: DsSpacing.sm),
                    Text(changes[selected], style: DsText.h3Regular),
                    gap(),
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: DsColors.neutralBaseWhite,
                        border: Border.all(color: DsColors.surfaceCoolGrey110),
                        borderRadius: BorderRadius.circular(DsRadius.md),
                      ),
                      child: KeyedSubtree(
                        key: ValueKey(selected),
                        child: preview(),
                      ),
                    ),
                    gap(),
                    SelectableText(
                      "import 'package:global_ds/global_ds.dart';",
                      style: DsText.s1Regular,
                    ),
                    const SizedBox(height: DsSpacing.xl2),
                    const Text('Patterns are deferred', style: DsText.h3Semi),
                    const SizedBox(height: DsSpacing.sm),
                    const Text(
                      'Address blocks, record editors, review layouts, dialogs and branded sections remain in the product app.',
                      style: DsText.h3Regular,
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
  Widget preview() {
    switch (selected) {
      case 0:
        return RibSelectField<String>(
          label: 'Country',
          value: country,
          searchable: true,
          items: const [
            RibDropdownItem(value: 'US', label: 'United States'),
            RibDropdownItem(value: 'IN', label: 'India'),
            RibDropdownItem(value: 'SG', label: 'Singapore'),
          ],
          onChanged: (value) => setState(() => country = value),
        );
      case 1:
        return RibDateField(
          label: 'Date of incorporation',
          value: date,
          firstDate: DateTime(1900),
          lastDate: DateTime.now(),
          onChanged: (value) => setState(() => date = value),
        );
      case 2:
        return RibRadioGroup<bool>(
          label: 'Do you have an existing account?',
          options: const {true: 'Yes', false: 'No'},
          value: radio,
          onChanged: (value) => setState(() => radio = value),
        );
      case 3:
        return RibToggle(
          label: 'Enable option',
          value: toggle,
          onChanged: (value) => setState(() => toggle = value),
        );
      case 4:
        return RibSegmentedControl<String>(
          options: const {'business': 'Business', 'individual': 'Individual'},
          value: segment,
          onChanged: (value) => setState(() => segment = value),
        );
      case 5:
        return RibOtpField(
          onChanged: (_) {},
          resend: TextButton(onPressed: () {}, child: const Text('Resend')),
        );
      case 6:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            RibStepper(
              steps: const ['Details', 'Verify', 'Review'],
              currentIndex: step,
              completed: {for (var i = 0; i < step; i++) i},
              showLabels: true,
              onStepSelected: (value) => setState(() => step = value),
            ),
            gap(),
            Wrap(
              spacing: 8,
              children: [
                TextButton(
                  onPressed: step == 0 ? null : () => setState(() => step--),
                  child: const Text('Previous'),
                ),
                TextButton(
                  onPressed: step == 2 ? null : () => setState(() => step++),
                  child: const Text('Next'),
                ),
              ],
            ),
          ],
        );
      case 7:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            RibUpload(
              label: 'Supporting document',
              requirements: 'File rules belong to the application.',
              state: uploadState,
              fileName: uploadState == RibUploadState.uploaded
                  ? 'example.pdf'
                  : null,
              errorText: uploadState == RibUploadState.error
                  ? 'Upload failed. Try again.'
                  : null,
              onSelect: () =>
                  setState(() => uploadState = RibUploadState.uploaded),
              onRemove: () => setState(() => uploadState = RibUploadState.idle),
            ),
            gap(),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final state in RibUploadState.values)
                  ChoiceChip(
                    label: Text(state.name),
                    selected: state == uploadState,
                    onSelected: (_) => setState(() => uploadState = state),
                  ),
              ],
            ),
          ],
        );
      case 8:
        return Column(
          children: [
            RibInputField(
              label: 'Company name',
              placeholder: 'Enter company name',
              width: double.infinity,
              helper: 'The helper remains below the input.',
            ),
            gap(),
            const RibInputField(
              label: 'Email address',
              initialValue: 'invalid',
              errorText: 'Enter a valid email address',
              width: double.infinity,
            ),
            gap(),
            const RibInputField(
              label: 'Read-only value',
              initialValue: 'Example',
              readOnly: true,
              width: double.infinity,
            ),
          ],
        );
      case 9:
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: [
                RibButton(
                  label: loading ? 'Saving…' : 'Continue',
                  loading: loading,
                  onPressed: () => setState(() => loading = true),
                ),
                RibButton(
                  label: 'Secondary',
                  variant: RibButtonVariant.outline,
                  onPressed: () {},
                ),
                const RibButton(label: 'Disabled', onPressed: null),
              ],
            ),
            gap(),
            TextButton(
              onPressed: () => setState(() => loading = false),
              child: const Text('Reset loading demo'),
            ),
          ],
        );
      case 10:
        return RibCheckbox(
          label:
              'I confirm that the information provided is correct and understand the declaration.',
          size: RibCheckboxSize.large,
          value: checked,
          onChanged: (value) => setState(() => checked = value),
        );
      case 11:
        return Align(
          alignment: Alignment.centerLeft,
          child: RibCalendar(
            month: month,
            mode: calendarMode,
            selectedDate: date,
            firstDate: DateTime(2020),
            lastDate: DateTime(2030),
            onDateSelected: (value) => setState(() => date = value),
            onModeChanged: (value) => setState(() => calendarMode = value),
            onMonthChanged: (value) => setState(() {
              month = value;
              calendarMode = RibCalendarMode.date;
            }),
            onPreviousMonth: () =>
                setState(() => month = DateTime(month.year, month.month - 1)),
            onNextMonth: () =>
                setState(() => month = DateTime(month.year, month.month + 1)),
          ),
        );
      case 12:
        return RibAccordion(
          title: 'Editable details',
          expanded: expanded,
          maintainState: true,
          onChanged: (value) => setState(() => expanded = value),
          content: const RibInputField(
            label: 'Value retained when collapsed',
            width: double.infinity,
          ),
        );
      default:
        return Column(
          children: [
            for (final tone in RibInfoTone.values)
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: RibInfo(
                  title: tone.name,
                  message: 'Guidance wraps within the available space.',
                  tone: tone,
                  width: double.infinity,
                  textStyle: DsText.h3Regular,
                ),
              ),
          ],
        );
    }
  }
}
