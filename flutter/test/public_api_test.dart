import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:global_ds/global_ds.dart';

void main() {
  testWidgets('loading button blocks activation and resumes when ready',
      (tester) async {
    var calls = 0;
    Future<void> render(bool loading) => tester.pumpWidget(MaterialApp(
          theme: DsTheme.light,
          home: Scaffold(
              body: MediaQuery(
            data: const MediaQueryData(disableAnimations: true),
            child: RibButton(
                label: loading ? 'Verifying…' : 'Continue',
                loading: loading,
                onPressed: () => calls++),
          )),
        ));
    await render(true);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Verifying…'));
    expect(calls, 0);
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
    expect(tester.binding.hasScheduledFrame, isFalse);
    await render(false);
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue'));
    expect(calls, 1);
    expect(find.byType(CircularProgressIndicator), findsNothing);
  });

  test('exports governed foundations and the Material theme', () {
    expect(DsColors.primaryOrange100, const Color(0xFFE3530F));
    expect(DsTheme.light.useMaterial3, isTrue);
    expect(DsText.fontFamilyName, 'Mulish');
    expect(DsText.fontFamily, 'packages/global_ds/Mulish');
  });

  test('exports every public foundation and Rib type from the package barrel',
      () {
    const publicTypes = <Type>[
      DsTheme,
      DsButtonDecorations,
      DsColors,
      DsLayoutGrid,
      DsGrids,
      DsEffectToken,
      DsEffects,
      DsSpacing,
      DsRadius,
      DsText,
      RibAccordionVariant,
      RibAccordion,
      RibActivityTimelineState,
      RibActivityTimelineType,
      RibActivityTimelineItem,
      RibActivityTimeline,
      RibActivityCalendarItem,
      RibActivityCalendarTimeline,
      RibAvatarColor,
      RibAvatarData,
      RibAvatar,
      RibAvatarGroup,
      RibBreadcrumbItem,
      RibBreadcrumb,
      RibButtonVariant,
      RibButtonSize,
      RibButton,
      RibCalendarMode,
      RibCalendar,
      RibCardVariant,
      RibCardMetric,
      RibCard,
      RibCheckboxSize,
      RibCheckbox,
      RibChipVariant,
      RibChipSize,
      RibChip,
      RibDropdownItem,
      RibDropdown,
      RibEmptyState,
      RibInfoTone,
      RibInfo,
      RibInputFieldType,
      RibInputTextSize,
      RibInputField,
      RibLabelSize,
      RibLabelColour,
      RibLabel,
      RibListVariant,
      RibListItem,
      RibList,
      RibLoadingSize,
      RibLoadingIndicator,
    ];

    expect(publicTypes, hasLength(53));
  });

  testWidgets('renders a public component through the package barrel', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: DsTheme.light,
        home: Scaffold(
          body: RibButton(label: 'Continue', onPressed: () {}),
        ),
      ),
    );

    expect(find.text('Continue'), findsOneWidget);
  });
}
