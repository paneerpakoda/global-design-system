import 'package:flutter/material.dart';
import 'package:global_ds/global_ds.dart';
import 'core_specimen.dart';

const variantFamilies = <String, List<String>>{
  'select': [
    'Outside label',
    'Inline label',
    'Searchable',
    'Compact',
    'Calling code',
    'With subheading',
  ],
  'radio': ['Stacked', 'Inline'],
  'toggle': ['With label'],
  'segmented': ['Two options', 'Three options'],
  'otp': [
    'Single field',
    'Four boxes',
    'Six boxes',
    'Grouped six',
    'Masked boxes',
  ],
  'stepper': ['Horizontal', 'Vertical', 'Compact', 'Short flow'],
  'upload': ['Upload area', 'Compact selector'],
  'textfield': [
    'Basic',
    'Outside label',
    'Leading icon',
    'Trailing text',
    'Trailing icon',
    'Password',
    'Helper text',
    'Error message',
    'Phone',
    'Amount',
    'Text area',
    'Date · outside label',
    'Date · inline label',
  ],
  'button': [
    'Primary',
    'Outline',
    'Text',
    'Pastel',
    'White',
    'Destructive outline',
    'Destructive filled',
  ],
  'checkbox': ['Small', 'Large', 'Checkbox only'],
  'calendar': [
    'Date selection',
    'Date range',
    'Month and year',
    'Bounded dates',
  ],
  'accordions': [
    'Standard container',
    'Plain',
    'No container',
    'Coloured background',
    'Heading and subheading',
  ],
  'info': [
    'Body only',
    'Heading and body',
    'With outline',
    'Without icon',
    'Centred content',
  ],
};
const specimenStates = <String, List<String>>{
  'select': ['Empty', 'Filled', 'Disabled'],
  'radio': ['Unselected', 'Selected', 'Disabled'],
  'toggle': ['Off', 'On', 'Disabled'],
  'segmented': ['First selected', 'Last selected', 'Disabled'],
  'otp': [
    'Empty',
    'Timer',
    'Resend available',
    'Error',
    'Verifying',
    'Verified',
    'Disabled',
  ],
  'stepper': ['First step', 'In progress', 'Error', 'Complete'],
  'upload': ['Empty', 'Uploading', 'Uploaded', 'Error', 'Disabled'],
  'textfield': ['Empty', 'Filled', 'Error', 'Disabled', 'Read-only'],
  'button': ['Default', 'Disabled', 'Loading'],
  'checkbox': ['Unchecked', 'Checked', 'Disabled', 'Disabled checked'],
  'calendar': ['Default'],
  'accordions': ['Collapsed', 'Expanded'],
  'info': ['Information', 'Success', 'Error', 'Warning'],
};

class VariantGallery extends StatefulWidget {
  const VariantGallery({required this.id, this.initialVariant, super.key});
  final String id;
  final String? initialVariant;
  @override
  State<VariantGallery> createState() => _VariantGalleryState();
}

class _VariantGalleryState extends State<VariantGallery> {
  late String variant =
      widget.initialVariant ?? variantFamilies[widget.id]!.first;
  late String state = specimenStates[widget.id]!.first;
  late String size = widget.id == 'textfield' ? 'Default' : 'Large';
  String icon = 'None';
  Widget picker(
    String label,
    String value,
    List<String> options,
    ValueChanged<String> change,
  ) => SizedBox(
    width: 220,
    child: DropdownButtonFormField<String>(
      key: ValueKey('$label-$value'),
      initialValue: value,
      isExpanded: true,
      decoration: InputDecoration(labelText: label),
      items: [
        for (final option in options)
          DropdownMenuItem(value: option, child: Text(option)),
      ],
      onChanged: (v) => setState(() => change(v!)),
    ),
  );
  Widget specimen(String choice) => CoreSpecimen(
    key: ValueKey('${widget.id}-$choice-$state-$size-$icon'),
    id: widget.id,
    variant: choice,
    state: state,
    size: size,
    iconPosition: icon,
  );
  Widget card(String choice, {bool selected = false}) => Container(
    padding: const EdgeInsets.all(DsSpacing.lg),
    decoration: BoxDecoration(
      color: DsColors.neutralBaseWhite,
      border: Border.all(color: DsColors.surfaceCoolGrey110),
      borderRadius: BorderRadius.circular(DsRadius.md),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(choice, style: DsText.h3Semi),
        const SizedBox(height: DsSpacing.lg),
        specimen(choice),
      ],
    ),
  );
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      if (widget.id == 'segmented') ...[
        const Text(
          'One connected choice between two or three related options, such as Monthly / Yearly. Use a radio group for longer questions.',
          style: DsText.h3Regular,
        ),
        const SizedBox(height: DsSpacing.lg),
      ],
      Wrap(
        spacing: DsSpacing.md,
        runSpacing: DsSpacing.md,
        children: [
          picker(
            'Variant',
            variant,
            variantFamilies[widget.id]!,
            (v) => variant = v,
          ),
          picker(
            widget.id == 'info' ? 'Tone' : 'State',
            state,
            specimenStates[widget.id]!,
            (v) => state = v,
          ),
          if (widget.id == 'textfield' && !variant.startsWith('Date'))
            picker('Text size', size, const [
              'Default',
              'Large',
            ], (v) => size = v),
          if (widget.id == 'button') ...[
            picker('Size', size, const [
              'Large',
              'Small',
              'Extra small',
            ], (v) => size = v),
            picker('Icon', icon, const [
              'None',
              'Leading',
              'Trailing',
            ], (v) => icon = v),
          ],
        ],
      ),
      const SizedBox(height: DsSpacing.md),
      const Text(
        'Hover, press or Tab into enabled controls to inspect their interaction states. Each example is interactive.',
        style: DsText.p1Reg,
      ),
      const SizedBox(height: DsSpacing.lg),
      card(variant, selected: true),
      const SizedBox(height: DsSpacing.xl2),
      Text(
        'All ${variantFamilies[widget.id]!.length} variants',
        style: DsText.h2Semi,
      ),
      const SizedBox(height: DsSpacing.sm),
      const Text(
        'The selected state applies to every variant below.',
        style: DsText.p1Reg,
      ),
      const SizedBox(height: DsSpacing.lg),
      for (final choice in variantFamilies[widget.id]!) ...[
        card(choice),
        const SizedBox(height: DsSpacing.lg),
      ],
    ],
  );
}
