import 'package:flutter/material.dart';
import 'package:global_ds/global_ds.dart';
import 'variant_gallery.dart';

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
  static const names = [
    'Dropdown',
    'Date field',
    'Radio group',
    'Toggle',
    'Segmented control',
    'OTP input',
    'Stepper',
    'Upload',
    'Input field',
    'Button',
    'Checkbox',
    'Calendar',
    'Accordion',
    'Info',
  ];
  final embedded = Uri.base.queryParameters['embed'] == 'true';
  late int selected;
  String? initialVariant;
  @override
  void initState() {
    super.initState();
    final requested = Uri.base.queryParameters['component'];
    final index = requested == 'dropdown'
        ? 0
        : componentIds.indexOf(requested ?? '');
    selected = index < 0
        ? 0
        : index == 1
        ? 8
        : index;
    initialVariant = index == 1 ? 'Date · outside label' : null;
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: DsColors.neutralBaseWhite,
    appBar: embedded
        ? null
        : AppBar(title: const Text('GlobalDS · Flutter components')),
    body: SingleChildScrollView(
      padding: const EdgeInsets.all(DsSpacing.lg),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1000),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (!embedded) ...[
                const Text('Core components', style: DsText.h2Semi),
                const SizedBox(height: DsSpacing.lg),
                DropdownButtonFormField<int>(
                  initialValue: selected,
                  isExpanded: true,
                  decoration: const InputDecoration(labelText: 'Component'),
                  items: [
                    for (var i = 0; i < names.length; i++)
                      if (i != 1)
                        DropdownMenuItem(value: i, child: Text(names[i])),
                  ],
                  onChanged: (value) => setState(() {
                    selected = value == 1 ? 8 : value!;
                    initialVariant = value == 1 ? 'Date · outside label' : null;
                  }),
                ),
                const SizedBox(height: DsSpacing.xl2),
              ],
              VariantGallery(
                key: ValueKey(selected),
                id: componentIds[selected],
                initialVariant: initialVariant,
              ),
            ],
          ),
        ),
      ),
    ),
  );
}
