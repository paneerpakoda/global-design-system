import 'dart:ui' as ui;
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:global_ds/global_ds.dart';

void main() {
  testWidgets('info guidance stays separate from a following consent label', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: FormField<bool>(
            builder: (_) => Column(
              children: [
                const RibInfo(message: 'Review the copied details.'),
                RibCheckbox(
                  value: false,
                  label: 'I confirm accuracy.',
                  onChanged: (_) {},
                ),
              ],
            ),
          ),
        ),
      ),
    );
    expect(
      tester.getSemantics(find.byType(RibCheckbox)).label,
      'I confirm accuracy.',
    );
    semantics.dispose();
  });

  testWidgets('radio targets stay stable when conditional content changes', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    bool? value;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: StatefulBuilder(
            builder: (context, setState) => Column(
              children: [
                RibRadioGroup<bool>(
                  label: 'Other countries',
                  showLabel: false,
                  options: const {true: 'Yes', false: 'No'},
                  value: value,
                  onChanged: (next) => setState(() => value = next),
                ),
                if (value == true)
                  const SizedBox(height: 100, child: Text('Select country')),
              ],
            ),
          ),
        ),
      ),
    );
    Finder target(String label) => find.byWidgetPredicate(
      (w) =>
          w is Semantics &&
          w.properties.label == label &&
          w.properties.checked != null,
    );
    final ids = [
      for (final label in ['Yes', 'No']) tester.getSemantics(target(label)).id,
    ];
    for (final choice in [true, false, true, false]) {
      final label = choice ? 'Yes' : 'No';
      final rect = tester.getRect(target(label));
      await tester.tapAt(Offset(rect.right - 8, rect.center.dy));
      await tester.pumpAndSettle();
      expect(value, choice);
      expect(
        find.text('Select country'),
        choice ? findsOneWidget : findsNothing,
      );
      expect([
        for (final label in ['Yes', 'No'])
          tester.getSemantics(target(label)).id,
      ], ids);
    }
    semantics.dispose();
  });

  testWidgets(
    'radio semantic targets coincide with painted options after selection',
    (tester) async {
      final semantics = tester.ensureSemantics();
      var value = true;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Padding(
              padding: const EdgeInsets.only(top: 200, left: 120),
              child: StatefulBuilder(
                builder: (context, setState) => RibRadioGroup<bool>(
                  label: 'Countries',
                  options: const {true: 'Yes', false: 'No'},
                  value: value,
                  onChanged: (v) => setState(() => value = v),
                ),
              ),
            ),
          ),
        ),
      );
      for (final choice in [false, true, false]) {
        final label = find.text(choice ? 'Yes' : 'No');
        final target = find.byWidgetPredicate(
          (w) =>
              w is Semantics &&
              w.properties.label == (choice ? 'Yes' : 'No') &&
              w.properties.checked != null,
        );
        final radio = find.descendant(
          of: target,
          matching: find.byType(DsIcon),
        );
        final hit = tester.getRect(target);
        expect(hit.contains(tester.getCenter(radio)), isTrue);
        expect(hit.contains(tester.getCenter(label)), isTrue);
        expect(tester.getSemantics(target).rect.height, hit.height);
        await tester.tapAt(tester.getCenter(radio));
        await tester.pumpAndSettle();
        expect(value, choice);
        expect(tester.widget<Semantics>(target).properties.checked, isTrue);
        await tester.tap(label);
        await tester.pumpAndSettle();
        expect(value, choice);
      }
      expect(tester.takeException(), isNull);
      semantics.dispose();
    },
  );

  testWidgets(
    'labeled stepper exposes all stages and completion at compact widths',
    (tester) async {
      final handle = tester.ensureSemantics();
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SizedBox(
              width: 280,
              child: RibStepper(
                steps: const ['Mobile number', 'Email address'],
                currentIndex: 1,
                completed: const {0},
                showLabels: true,
              ),
            ),
          ),
        ),
      );
      expect(find.text('Mobile number'), findsOneWidget);
      expect(find.text('Email address'), findsOneWidget);
      expect(
        find.bySemanticsLabel('Step 1 of 2: Mobile number, completed'),
        findsOneWidget,
      );
      expect(
        find.bySemanticsLabel('Step 2 of 2: Email address, current'),
        findsOneWidget,
      );
      expect(
        tester
            .widget<DsIcon>(
              find.byWidgetPredicate(
                (w) => w is DsIcon && w.icon == DsIconData.tick,
              ),
            )
            .color,
        DsColors.neutralGrey100,
      );
      final circles = tester
          .widgetList<Container>(
            find.byWidgetPredicate(
              (w) =>
                  w is Container &&
                  w.decoration is BoxDecoration &&
                  (w.decoration as BoxDecoration).shape == BoxShape.circle,
            ),
          )
          .toList();
      expect(
        (circles.first.decoration as BoxDecoration).color,
        DsColors.neutralBaseWhite,
      );
      expect(
        (circles.last.decoration as BoxDecoration).color,
        DsColors.primaryOrange100,
      );
      expect(
        tester.widget<Text>(find.text('Mobile number')).style!.color,
        DsColors.neutralGrey100,
      );
      expect(
        tester.widget<Text>(find.text('Email address')).style!.fontSize,
        12,
      );
      expect(
        find.byWidgetPredicate((w) => w is DsIcon && w.icon == DsIconData.tick),
        findsOneWidget,
      );
      expect(tester.getSize(find.byType(RibStepper)).height, 44);
      expect(tester.takeException(), isNull);
      handle.dispose();
    },
  );

  testWidgets('committing a searchable choice ends editing without selection', (
    tester,
  ) async {
    var selected = 'US';
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: StatefulBuilder(
            builder: (context, setState) => SizedBox(
              width: 300,
              child: RibSelectField<String>(
                label: 'Country',
                searchable: true,
                value: selected,
                items: const [
                  RibDropdownItem(value: 'US', label: 'United States'),
                  RibDropdownItem(value: 'CA', label: 'Canada'),
                ],
                onChanged: (value) => setState(() => selected = value),
              ),
            ),
          ),
        ),
      ),
    );
    for (final keyboard in [false, true]) {
      await tester.tap(find.byType(TextField));
      await tester.pumpAndSettle();
      await tester.enterText(find.byType(TextField), 'Can');
      await tester.pumpAndSettle();
      if (keyboard) {
        await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
        await tester.pumpAndSettle();
        await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      } else {
        await tester.tap(find.widgetWithText(MenuItemButton, 'Canada'));
      }
      await tester.pumpAndSettle();
      final input = tester.widget<TextField>(find.byType(TextField));
      expect(selected, 'CA');
      expect(input.controller!.text, 'Canada');
      expect(input.controller!.selection.isCollapsed, isTrue);
      expect(input.focusNode!.hasFocus, isFalse);
      expect(find.byType(MenuItemButton), findsNothing);
    }
  });

  testWidgets('text button remains a distinct accessible action in a list', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    var added = false;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: Column(
            children: [
              const Text('1 vendor added'),
              RibButton(
                label: 'Add another vendor',
                variant: RibButtonVariant.secondary,
                size: RibButtonSize.small,
                onPressed: () => added = true,
              ),
            ],
          ),
        ),
      ),
    );
    final node = tester.getSemantics(
      find.byWidgetPredicate(
        (widget) =>
            widget is Semantics &&
            widget.properties.label == 'Add another vendor',
      ),
    );
    expect(node.label, 'Add another vendor');
    expect(node.getSemanticsData().hasAction(ui.SemanticsAction.tap), isTrue);
    node.owner!.performAction(node.id, ui.SemanticsAction.tap);
    expect(added, isTrue);
    semantics.dispose();
  });

  testWidgets(
    'composite input label stays above prefix and focus preserves selection',
    (tester) async {
      final controller = TextEditingController(text: '12345678');
      final next = FocusNode();
      await tester.pumpWidget(
        MaterialApp(
          theme: DsTheme.light,
          home: Scaffold(
            body: SizedBox(
              width: 328,
              child: Column(
                children: [
                  RibInputField(
                    label: 'Mobile number of the authorised person',
                    width: double.infinity,
                    controller: controller,
                    leading: const SizedBox(
                      width: 64,
                      height: 48,
                      child: Center(child: Text('+1')),
                    ),
                  ),
                  TextField(focusNode: next),
                ],
              ),
            ),
          ),
        ),
      );
      final field = find.byType(TextFormField);
      expect(
        tester
            .getRect(find.text('Mobile number of the authorised person'))
            .bottom,
        lessThan(tester.getRect(field).top),
      );
      await tester.tap(field);
      await tester.pumpAndSettle();
      expect(controller.selection.isCollapsed, isTrue);
      await tester.enterText(field, '123456789');
      next.requestFocus();
      await tester.pumpAndSettle();
      await tester.tap(field);
      await tester.pumpAndSettle();
      expect(controller.selection.isCollapsed, isTrue);
      expect(controller.text, '123456789');
      await tester.pumpWidget(const SizedBox.shrink());
      controller.dispose();
      next.dispose();
    },
  );

  testWidgets('validation message has an 8px gap below the input surface', (
    tester,
  ) async {
    final form = GlobalKey<FormState>();
    final suffix = GlobalKey();
    await tester.pumpWidget(
      MaterialApp(
        theme: DsTheme.light,
        home: Scaffold(
          body: Form(
            key: form,
            child: RibInputField(
              label: 'Website',
              type: RibInputFieldType.labelOut,
              width: 370,
              trailing: SizedBox(key: suffix, width: 24, height: 48),
              validator: (_) => 'Enter a website, such as example.com',
            ),
          ),
        ),
      ),
    );
    form.currentState!.validate();
    await tester.pumpAndSettle();
    expect(
      tester.getRect(find.text('Enter a website, such as example.com')).top -
          tester.getRect(find.byKey(suffix)).bottom,
      closeTo(8, .1),
    );
  });

  testWidgets('primary button paints an orange fill before hover', (
    tester,
  ) async {
    final key = GlobalKey();
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: Center(
            child: RepaintBoundary(
              key: key,
              child: SizedBox(
                width: 200,
                child: RibButton(label: 'Continue', onPressed: () {}),
              ),
            ),
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    await tester.runAsync(() async {
      final image =
          await (key.currentContext!.findRenderObject()
                  as RenderRepaintBoundary)
              .toImage();
      final bytes = (await image.toByteData(
        format: ui.ImageByteFormat.rawRgba,
      ))!;
      final pixel = (22 * image.width + 20) * 4;
      expect(bytes.getUint8(pixel), greaterThan(200));
      expect(bytes.getUint8(pixel + 1), lessThan(180));
      expect(bytes.getUint8(pixel + 2), lessThan(100));
      image.dispose();
    });
  });
  testWidgets(
    'calendar exposes every day in a six-week month and enforces bounds',
    (tester) async {
      DateTime? selected;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: RibCalendar(
              month: DateTime(2026, 8),
              firstDate: DateTime(2026, 8, 2),
              lastDate: DateTime(2026, 8, 30),
              onDateSelected: (value) => selected = value,
            ),
          ),
        ),
      );
      await tester.tap(find.text('1'));
      expect(selected, isNull);
      await tester.tap(find.text('30'));
      expect(selected, DateTime(2026, 8, 30));
      expect(find.text('31').hitTestable(), findsOneWidget);
      expect(tester.takeException(), isNull);
    },
  );
  testWidgets('select searches options and returns a selected value', (
    tester,
  ) async {
    String? selected;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RibSelectField<String>(
            label: 'Country',
            searchable: true,
            items: const [
              RibDropdownItem(value: 'US', label: 'United States'),
              RibDropdownItem(value: 'IN', label: 'India'),
            ],
            onChanged: (value) => selected = value,
          ),
        ),
      ),
    );
    await tester.tap(find.byType(TextField));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'India');
    await tester.pumpAndSettle();
    expect(find.text('United States'), findsNothing);
    await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
    await tester.sendKeyEvent(LogicalKeyboardKey.enter);
    await tester.pumpAndSettle();
    expect(selected, 'IN');
  });
  testWidgets(
    'select menu anchors to its field and dismisses without a dialog',
    (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Padding(
              padding: const EdgeInsets.only(left: 100, top: 100),
              child: SizedBox(
                width: 300,
                child: RibSelectField<String>(
                  label: 'Country',
                  compact: true,
                  value: 'US',
                  items: const [
                    RibDropdownItem(value: 'US', label: 'United States'),
                    RibDropdownItem(value: 'IN', label: 'India'),
                  ],
                  onChanged: (_) {},
                ),
              ),
            ),
          ),
        ),
      );
      final trigger = find.byType(OutlinedButton);
      final rect = tester.getRect(trigger);
      await tester.tap(trigger);
      await tester.pumpAndSettle();
      expect(find.byType(AlertDialog), findsNothing);
      final option = tester.getRect(
        find.widgetWithText(MenuItemButton, 'United States'),
      );
      expect(option.left, closeTo(rect.left + DsSpacing.xs, 2));
      expect(option.top, closeTo(rect.bottom + 4 + DsSpacing.xs, 2));
      expect(option.width, closeTo(rect.width - 2 * DsSpacing.xs, 2));
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pumpAndSettle();
      expect(find.byType(MenuItemButton), findsNothing);
      expect(
        tester.widget<OutlinedButton>(trigger).focusNode!.hasFocus,
        isTrue,
      );
      await tester.tap(trigger);
      await tester.pumpAndSettle();
      await tester.tapAt(const Offset(20, 20));
      await tester.pumpAndSettle();
      expect(find.byType(MenuItemButton), findsNothing);
    },
  );

  testWidgets(
    'embedded select opens within a narrow viewport and selects by keyboard',
    (tester) async {
      tester.view.physicalSize = const Size(360, 700);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      String? selected;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: Align(
              alignment: Alignment.bottomRight,
              child: SizedBox(
                width: 72,
                child: RibSelectField<String>(
                  label: 'Calling code',
                  compact: true,
                  embedded: true,
                  value: '+1',
                  items: const [
                    RibDropdownItem(value: '+1', label: '+1'),
                    RibDropdownItem(value: '+44', label: '+44'),
                  ],
                  onChanged: (value) => selected = value,
                ),
              ),
            ),
          ),
        ),
      );
      expect(
        tester
                .getRect(
                  find.byWidgetPredicate(
                    (w) => w is DsIcon && w.icon == DsIconData.caretDown,
                  ),
                )
                .left -
            tester.getRect(find.text('+1')).right,
        closeTo(4, .1),
      );
      await tester.tap(find.byType(OutlinedButton));
      await tester.pumpAndSettle();
      final option = tester.getRect(find.widgetWithText(MenuItemButton, '+44'));
      expect(option.left, greaterThanOrEqualTo(0));
      expect(option.right, lessThanOrEqualTo(360));
      expect(option.bottom, lessThan(652));
      expect(option.width, greaterThanOrEqualTo(150));
      await tester.sendKeyEvent(LogicalKeyboardKey.arrowDown);
      await tester.pumpAndSettle();
      await tester.sendKeyEvent(LogicalKeyboardKey.enter);
      await tester.pumpAndSettle();
      expect(selected, '+44');
      expect(find.byType(MenuItemButton), findsNothing);
      expect(tester.takeException(), isNull);
    },
  );

  testWidgets('select and input paint the same neutral hover surface', (
    tester,
  ) async {
    final inputKey = GlobalKey();
    final selectKey = GlobalKey();
    await tester.pumpWidget(
      MaterialApp(
        theme: DsTheme.light,
        home: Scaffold(
          body: SizedBox(
            width: 300,
            child: Column(
              children: [
                RepaintBoundary(
                  key: inputKey,
                  child: const RibInputField(
                    label: 'Phone',
                    width: double.infinity,
                  ),
                ),
                const SizedBox(height: 16),
                RepaintBoundary(
                  key: selectKey,
                  child: RibSelectField<String>(
                    label: 'Country',
                    compact: true,
                    value: 'US',
                    items: const [
                      RibDropdownItem(value: 'US', label: 'United States'),
                    ],
                    onChanged: (_) {},
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
    final mouse = await tester.createGesture(kind: ui.PointerDeviceKind.mouse);
    await mouse.addPointer(location: const Offset(500, 500));
    Future<List<int>> hoverPixel(GlobalKey key) async {
      await mouse.moveTo(tester.getCenter(find.byKey(key)));
      await tester.pumpAndSettle();
      List<int> pixel = [];
      await tester.runAsync(() async {
        final image =
            await (key.currentContext!.findRenderObject()
                    as RenderRepaintBoundary)
                .toImage();
        final bytes = (await image.toByteData(
          format: ui.ImageByteFormat.rawRgba,
        ))!;
        final offset = (24 * image.width + image.width - 65) * 4;
        pixel = List.generate(4, (i) => bytes.getUint8(offset + i));
        image.dispose();
      });
      return pixel;
    }

    final inputPixel = await hoverPixel(inputKey);
    final selectPixel = await hoverPixel(selectKey);
    expect(selectPixel, inputPixel);
    expect((selectPixel[0] - selectPixel[2]).abs(), lessThan(3));
    await mouse.removePointer();
  });

  testWidgets('input participates in Form validation and fills its parent', (
    tester,
  ) async {
    final form = GlobalKey<FormState>();
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: Form(
            key: form,
            child: RibInputField(
              label: 'Company',
              width: double.infinity,
              validator: (value) =>
                  value == null || value.isEmpty ? 'Enter company' : null,
            ),
          ),
        ),
      ),
    );
    expect(form.currentState!.validate(), isFalse);
    await tester.pump();
    expect(find.text('Enter company'), findsOneWidget);
    await tester.enterText(find.byType(TextFormField), 'Acme');
    expect(form.currentState!.validate(), isTrue);
    expect(tester.getSize(find.byType(TextFormField)).width, 800);
  });

  testWidgets('checkbox wraps long labels at phone width', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: SizedBox(
            width: 280,
            child: RibCheckbox(
              value: false,
              label:
                  'Communication address is the same as the company registered address',
              onChanged: (_) {},
            ),
          ),
        ),
      ),
    );
    expect(tester.takeException(), isNull);
  });
  testWidgets('date field changes year and returns a bounded date', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();

    DateTime? selected;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RibDateField(
            label: 'Incorporation',
            value: DateTime(2026, 8, 16),
            firstDate: DateTime(2025),
            lastDate: DateTime(2026, 12, 31),
            onChanged: (date) => selected = date,
          ),
        ),
      ),
    );
    await tester.tap(find.bySemanticsLabel('Choose Incorporation'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('August 2026'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('2025'));
    await tester.pumpAndSettle();
    expect(find.text('August 2025'), findsOneWidget);
    await tester.tap(find.text('10'));
    await tester.pumpAndSettle();
    expect(selected, DateTime(2025, 8, 10));
    expect(find.byType(AlertDialog), findsNothing);
    semantics.dispose();
    await tester.pumpWidget(const SizedBox.shrink());
    await tester.pumpAndSettle();
  });
}
