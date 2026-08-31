import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

enum RibCalendarMode { date, range, monthYear }

/// Compact RIB calendar defined on Figma page 1815:1068.
class RibCalendar extends StatelessWidget {
  const RibCalendar({
    required this.month,
    this.mode = RibCalendarMode.date,
    this.selectedDate,
    this.rangeStart,
    this.rangeEnd,
    this.onDateSelected,
    this.onPreviousMonth,
    this.onNextMonth,
    super.key,
  });

  final DateTime month;
  final RibCalendarMode mode;
  final DateTime? selectedDate;
  final DateTime? rangeStart;
  final DateTime? rangeEnd;
  final ValueChanged<DateTime>? onDateSelected;
  final VoidCallback? onPreviousMonth;
  final VoidCallback? onNextMonth;

  static const _weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  static const _months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  @override
  Widget build(BuildContext context) {
    final range = mode == RibCalendarMode.range;
    final monthYear = mode == RibCalendarMode.monthYear;
    final height = range || monthYear ? 272.0 : 244.0;

    return Semantics(
      label: monthYear ? 'Choose month and year' : 'Choose date',
      container: true,
      child: SizedBox(
        width: 258,
        height: height,
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: DsColors.neutralBaseWhite,
            border: Border.all(color: DsColors.surfaceCoolGrey110),
            borderRadius: BorderRadius.circular(DsRadius.md),
            boxShadow: [_shadow(DsEffects.shadow200)],
          ),
          child: Padding(
            padding: const EdgeInsets.all(DsSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (range || monthYear) ...[
                  Text(
                    rangeStart == null
                        ? 'Choose start date'
                        : 'Choose end date',
                    style: _paragraphSemibold,
                  ),
                  const SizedBox(height: DsSpacing.sm),
                ],
                _buildNavigation(monthYear),
                const SizedBox(height: DsSpacing.lg),
                Expanded(
                  child: monthYear ? _buildMonthYearPicker() : _buildDateGrid(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavigation(bool monthYear) {
    final label = '${_months[month.month - 1]} ${month.year}';
    return Row(
      children: [
        InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(DsRadius.xs),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(label, style: _paragraphSemibold),
              const SizedBox(width: DsSpacing.xxs),
              Icon(
                monthYear ? Icons.arrow_drop_up : Icons.arrow_drop_down,
                size: 16,
              ),
            ],
          ),
        ),
        const Spacer(),
        if (!monthYear) ...[
          _navigationButton(
            'Previous month',
            Icons.chevron_left,
            onPreviousMonth,
          ),
          const SizedBox(width: DsSpacing.sm),
          _navigationButton('Next month', Icons.chevron_right, onNextMonth),
        ],
      ],
    );
  }

  Widget _navigationButton(String label, IconData icon, VoidCallback? onTap) {
    return Semantics(
      label: label,
      button: true,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(DsRadius.xs),
        child: Icon(icon, size: 16, color: DsColors.neutralGrey140),
      ),
    );
  }

  Widget _buildDateGrid() {
    final days = DateUtils.getDaysInMonth(month.year, month.month);
    final offset = DateTime(month.year, month.month).weekday - 1;
    final itemCount = offset + days;

    return Column(
      children: [
        Row(
          children: _weekdays
              .map(
                (day) => Expanded(
                  child: Text(
                    day,
                    textAlign: TextAlign.center,
                    style: _weekdayStyle,
                  ),
                ),
              )
              .toList(),
        ),
        const SizedBox(height: DsSpacing.sm),
        Expanded(
          child: GridView.builder(
            padding: EdgeInsets.zero,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: itemCount,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 7,
              mainAxisExtent: 30,
            ),
            itemBuilder: (context, index) {
              if (index < offset) return const SizedBox.shrink();
              final date = DateTime(
                month.year,
                month.month,
                index - offset + 1,
              );
              return _buildDate(date);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildDate(DateTime date) {
    final selected = _sameDay(date, selectedDate) ||
        _sameDay(date, rangeStart) ||
        _sameDay(date, rangeEnd);
    final inRange = rangeStart != null &&
        rangeEnd != null &&
        !date.isBefore(rangeStart!) &&
        !date.isAfter(rangeEnd!);

    return ColoredBox(
      color: inRange ? DsColors.pastelAmber100 : Colors.transparent,
      child: Center(
        child: Semantics(
          selected: selected,
          button: true,
          label: '${date.day} ${_months[date.month - 1]} ${date.year}',
          child: InkWell(
            onTap: onDateSelected == null ? null : () => onDateSelected!(date),
            customBorder: const CircleBorder(),
            child: Container(
              width: 24,
              height: 24,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color:
                    selected ? DsColors.primaryOrange100 : Colors.transparent,
                shape: BoxShape.circle,
              ),
              child: Text(
                '${date.day}',
                style: (selected ? DsText.p2Semi : DsText.p2Reg).copyWith(
                  color: selected
                      ? DsColors.neutralBaseWhite
                      : DsColors.neutralGrey120,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMonthYearPicker() {
    final visibleMonths = [7, 8, 9, 10, 11, 12];
    final visibleYears = [2017, 2018, 2019, 2020, 2021, 2022];
    return DecoratedBox(
      decoration: BoxDecoration(
        border: Border.all(color: DsColors.surfaceCoolGrey110),
        borderRadius: BorderRadius.circular(DsRadius.sm),
      ),
      child: Row(
        children: [
          Expanded(
            child: _pickerColumn(
              visibleMonths.map((value) => _months[value - 1]),
              _months[month.month - 1],
            ),
          ),
          Container(width: 1, color: DsColors.surfaceCoolGrey110),
          Expanded(
            child: _pickerColumn(
              visibleYears.map((value) => '$value'),
              '${month.year}',
            ),
          ),
        ],
      ),
    );
  }

  Widget _pickerColumn(Iterable<String> values, String selectedValue) {
    return Column(
      children: values
          .map(
            (value) => Expanded(
              child: Semantics(
                selected: value == selectedValue,
                button: true,
                child: InkWell(
                  onTap: () {},
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: DsSpacing.sm,
                      ),
                      child: Text(
                        value,
                        style: (value == selectedValue
                                ? DsText.p2Semi
                                : DsText.p2Reg)
                            .copyWith(
                          color: value == selectedValue
                              ? DsColors.primaryOrange100
                              : DsColors.neutralGrey120,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          )
          .toList(),
    );
  }

  bool _sameDay(DateTime date, DateTime? other) {
    return other != null &&
        date.year == other.year &&
        date.month == other.month &&
        date.day == other.day;
  }

  static final _paragraphSemibold = DsText.p1Semi.copyWith(
    color: DsColors.neutralGrey140,
  );
  static final _weekdayStyle = DsText.p2Bold.copyWith(
    color: DsColors.neutralGrey140,
  );
}

BoxShadow _shadow(DsEffectToken token) {
  return BoxShadow(
    color: token.color,
    offset: Offset(token.offsetX, token.offsetY),
    blurRadius: token.radius,
    spreadRadius: token.spread,
  );
}
