import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
// Test the public component example without introducing a package dependency.
// ignore: avoid_relative_lib_imports
import '../example/lib/main.dart';

void main() {
  for (final width in [320.0, 1000.0]) {
    testWidgets('all fourteen core component specimens fit at $width',
        (tester) async {
      tester.view.physicalSize = Size(width, 1000);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const GlobalDSExample());
      await tester.pumpAndSettle();
      for (var index = 0; index < 14; index++) {
        tester
            .widget<DropdownButtonFormField<int>>(
                find.byType(DropdownButtonFormField<int>))
            .onChanged!(index);
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'Component $index');
      }
    });
  }
}
