import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:global_ds/global_ds.dart';

void main() {
  testWidgets('plain accordion header has a complete accessible target', (
    tester,
  ) async {
    bool open = false;
    final semantics = tester.ensureSemantics();
    await tester.pumpWidget(
      MaterialApp(
        theme: DsTheme.light,
        home: Scaffold(
          body: SizedBox(
            width: 320,
            child: RibAccordion(
              title: 'Details',
              content: const Text('Content'),
              expanded: open,
              onChanged: (v) => open = v,
            ),
          ),
        ),
      ),
    );
    final header = find
        .ancestor(of: find.text('Details'), matching: find.byType(InkWell))
        .first;
    expect(tester.getSize(header).height, greaterThanOrEqualTo(48));
    await tester.tapAt(tester.getRect(header).topLeft + const Offset(4, 4));
    expect(open, isTrue);
    semantics.dispose();
  });
  testWidgets('checkbox label and icon sit inside a padded hover target', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RibCheckbox(value: false, label: 'Consent', onChanged: (_) {}),
        ),
      ),
    );
    final rect = tester.getRect(find.byType(InkWell));
    final icon = tester.getRect(find.byType(DsIcon));
    expect(icon.left - rect.left, DsSpacing.sm);
    expect(rect.height, greaterThanOrEqualTo(44));
  });
  testWidgets('info icon centres against heading and complete body', (
    tester,
  ) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: RibInfo(
            width: 300,
            title: 'Heading',
            message:
                'A body that wraps over multiple lines to explain what happens next.',
          ),
        ),
      ),
    );
    final top = tester.getRect(find.text('Heading')).top;
    final bottom = tester
        .getRect(
          find.text(
            'A body that wraps over multiple lines to explain what happens next.',
          ),
        )
        .bottom;
    expect(
      tester.getCenter(find.byType(DsIcon)).dy,
      closeTo((top + bottom) / 2, .5),
    );
  });
  testWidgets(
    'grouped OTP accepts whole-code paste through one numeric editor',
    (tester) async {
      String value = '';
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: SizedBox(
              width: 280,
              child: RibOtpField(
                variant: RibOtpVariant.grouped,
                onChanged: (v) => value = v,
              ),
            ),
          ),
        ),
      );
      await tester.enterText(find.byType(TextField), '12a345678');
      await tester.pump();
      expect(value, '123456');
      expect(find.byType(TextField), findsOneWidget);
      for (final digit in ['1', '2', '3', '4', '5', '6']) {
        expect(find.text(digit), findsOneWidget);
      }
      expect(tester.takeException(), isNull);
    },
  );
  testWidgets('disabled date picker cannot open from its action', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RibDateField(label: 'Date', enabled: false, onChanged: (_) {}),
        ),
      ),
    );
    expect(
      tester.widget<IconButton>(find.byType(IconButton)).onPressed,
      isNull,
    );
    await tester.tapAt(tester.getCenter(find.byType(IconButton)));
    await tester.pumpAndSettle();
    expect(find.byType(RibCalendar), findsNothing);
  });
  testWidgets('uploading locks file selection and removal', (tester) async {
    var invoked = false;
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RibUpload(
            label: 'Document',
            requirements: 'PDF',
            state: RibUploadState.uploading,
            fileName: 'document.pdf',
            progress: .5,
            onSelect: () => invoked = true,
            onRemove: () => invoked = true,
          ),
        ),
      ),
    );
    expect(
      tester.widget<IconButton>(find.byType(IconButton)).onPressed,
      isNull,
    );
    expect(invoked, isFalse);
    expect(find.text('Uploading · 50%'), findsOneWidget);
  });
}
