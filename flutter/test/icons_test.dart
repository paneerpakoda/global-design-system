import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:global_ds/global_ds.dart';

void main() {
  testWidgets('every packaged GlobalDS SVG loads and paints', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: DsTheme.light,
        home: Scaffold(
          body: Wrap(
            children: [for (final icon in DsIconData.values) DsIcon(icon)],
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.byType(SvgPicture), findsNWidgets(DsIconData.values.length));
    expect(tester.takeException(), isNull);
  });
  testWidgets('standalone icon label is exposed only when requested', (
    tester,
  ) async {
    final semantics = tester.ensureSemantics();
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: Row(
            children: [
              DsIcon(DsIconData.calendar, semanticLabel: 'Calendar action'),
              DsIcon(DsIconData.info),
            ],
          ),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.bySemanticsLabel('Calendar action'), findsOneWidget);
    expect(tester.takeException(), isNull);
    semantics.dispose();
  });
}
