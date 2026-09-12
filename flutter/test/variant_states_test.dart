import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:global_ds/global_ds.dart';
// Exercise the public specimens across their state/variant combinations.
// ignore: avoid_relative_lib_imports
import '../example/lib/core_specimen.dart';
// ignore: avoid_relative_lib_imports
import '../example/lib/variant_gallery.dart';

void main() {
  for (final width in [280.0, 960.0]) {
    testWidgets('state combinations fit at $width', (tester) async {
      tester.view.physicalSize = Size(width + 32, 1100);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      for (final id in [
        'textfield',
        'button',
        'otp',
        'stepper',
        'upload',
        'info',
      ]) {
        for (final variant in variantFamilies[id]!) {
          for (final state in specimenStates[id]!) {
            await tester.pumpWidget(
              MaterialApp(
                theme: DsTheme.light,
                home: Scaffold(
                  body: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: CoreSpecimen(
                        key: ValueKey('$id-$variant-$state'),
                        id: id,
                        variant: variant,
                        state: state,
                      ),
                    ),
                  ),
                ),
              ),
            );
            await tester.pump(const Duration(milliseconds: 200));
            expect(
              tester.takeException(),
              isNull,
              reason: '$id / $variant / $state',
            );
          }
        }
      }
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
  testWidgets(
    'all stepper layouts expose an error and completed steps remain actionable',
    (tester) async {
      final semantics = tester.ensureSemantics();
      for (final variant in RibStepperVariant.values) {
        int? selected;
        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(
              body: RibStepper(
                steps: const ['Details', 'Verify', 'Review'],
                currentIndex: 1,
                completed: const {0},
                errorIndex: 1,
                variant: variant,
                showLabels: variant == RibStepperVariant.adaptive,
                onStepSelected: (i) => selected = i,
              ),
            ),
          ),
        );
        await tester.pump();
        if (variant != RibStepperVariant.compact) {
          expect(
            find.bySemanticsLabel(RegExp('Step 2.*error')),
            findsOneWidget,
          );
          await tester.tap(find.text('Details'));
          expect(selected, 0);
        } else {
          expect(find.text('Action required'), findsOneWidget);
        }
      }
      semantics.dispose();
    },
  );
}
