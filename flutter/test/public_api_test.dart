import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:global_ds/global_ds.dart';

void main() {
  test('exports governed foundations and the Material theme', () {
    expect(DsColors.primaryOrange100, const Color(0xFFF0792E));
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
