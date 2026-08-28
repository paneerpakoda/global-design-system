import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibActivityTimelineState { current, inactive, completed, warning, failed }

enum RibActivityTimelineType { singleLine, doubleLine }

class RibActivityTimelineItem {
  const RibActivityTimelineItem({
    required this.label,
    required this.subLabel,
    required this.state,
    this.value,
    this.status,
  });

  final String label;
  final String subLabel;
  final RibActivityTimelineState state;
  final String? value;
  final String? status;
}

/// A compact ordered activity feed based on the RIB Activity timeline.
///
/// This component reports completed or operational events. Use a stepper when
/// customers are expected to move forwards and backwards between stages.
class RibActivityTimeline extends StatelessWidget {
  const RibActivityTimeline({
    required this.items,
    this.type = RibActivityTimelineType.singleLine,
    this.rightIcon = false,
    this.onItemTap,
    this.shrinkWrap = true,
    this.semanticLabel = 'Activity timeline',
    super.key,
  }) : assert(
         !rightIcon || onItemTap != null,
         'rightIcon requires onItemTap so the chevron always represents an action.',
       );

  final List<RibActivityTimelineItem> items;
  final RibActivityTimelineType type;
  final bool rightIcon;
  final ValueChanged<int>? onItemTap;
  final bool shrinkWrap;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: semanticLabel,
      child: SizedBox(
        width: 288,
        child: Stack(
          children: [
            const Positioned(
              top: 0,
              bottom: 0,
              left: 24,
              child: ExcludeSemantics(
                child: ColoredBox(
                  color: DsColors.neutralGrey70,
                  child: SizedBox(width: 1),
                ),
              ),
            ),
            ListView.separated(
              shrinkWrap: shrinkWrap,
              physics: shrinkWrap ? const NeverScrollableScrollPhysics() : null,
              itemCount: items.length,
              separatorBuilder: (_, _) => const SizedBox(height: DsSpacing.md),
              itemBuilder: (context, index) => _RibActivityCard(
                item: items[index],
                type: type,
                rightIcon: rightIcon,
                onTap: onItemTap == null ? null : () => onItemTap!(index),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RibActivityCalendarItem {
  const RibActivityCalendarItem.activity({
    required this.dateLabel,
    required this.activity,
  }) : isDivider = false;

  const RibActivityCalendarItem.divider({required this.dateLabel})
    : activity = null,
      isDivider = true;

  final String dateLabel;
  final RibActivityTimelineItem? activity;
  final bool isDivider;
}

/// Calendar-labelled Activity timeline composition from RIB node 4235:18074.
class RibActivityCalendarTimeline extends StatelessWidget {
  const RibActivityCalendarTimeline({
    required this.items,
    this.currentState = RibActivityTimelineState.current,
    this.showYearDivider = true,
    this.semanticLabel = 'Calendar activity timeline',
    super.key,
  }) : assert(
         currentState == RibActivityTimelineState.current ||
             currentState == RibActivityTimelineState.inactive,
         'currentState only supports current or inactive.',
       );

  final List<RibActivityCalendarItem> items;
  final RibActivityTimelineState currentState;
  final bool showYearDivider;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final visibleItems = showYearDivider
        ? items
        : items.where((item) => !item.isDivider).toList(growable: false);

    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: semanticLabel,
      child: SizedBox(
        width: 367,
        child: Stack(
          children: [
            const Positioned(
              top: 0,
              bottom: 0,
              left: 59,
              child: ExcludeSemantics(
                child: ColoredBox(
                  color: DsColors.neutralGrey70,
                  child: SizedBox(width: 1),
                ),
              ),
            ),
            ListView.separated(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: visibleItems.length,
              separatorBuilder: (_, _) => const SizedBox(height: DsSpacing.lg),
              itemBuilder: (context, index) => _RibActivityCalendarRow(
                item: visibleItems[index],
                currentState: currentState,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RibActivityCalendarRow extends StatelessWidget {
  const _RibActivityCalendarRow({
    required this.item,
    required this.currentState,
  });

  final RibActivityCalendarItem item;
  final RibActivityTimelineState currentState;

  @override
  Widget build(BuildContext context) {
    final activity = item.activity;
    final resolvedActivity = activity?.state == RibActivityTimelineState.current
        ? RibActivityTimelineItem(
            label: activity!.label,
            subLabel: activity.subLabel,
            state: currentState,
            value: activity.value,
            status: activity.status,
          )
        : activity;
    final isCurrent =
        resolvedActivity?.state == RibActivityTimelineState.current;

    return SizedBox(
      height: item.isDivider ? 16 : 60,
      child: Row(
        children: [
          SizedBox(
            width: 63,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Flexible(
                  child: Text(
                    item.dateLabel.toUpperCase(),
                    maxLines: 1,
                    overflow: TextOverflow.fade,
                    softWrap: false,
                    textAlign: TextAlign.end,
                    style: DsText.labelRegular.copyWith(
                      color: isCurrent
                          ? DsColors.neutralGrey140
                          : DsColors.neutralGrey100,
                    ),
                  ),
                ),
                const SizedBox(width: DsSpacing.sm),
                Container(
                  width: 8,
                  height: 8,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isCurrent
                        ? DsColors.neutralGrey140
                        : DsColors.neutralGrey80,
                    boxShadow: const [
                      BoxShadow(
                        color: DsColors.neutralBaseWhite,
                        spreadRadius: 6,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: DsSpacing.lg),
          Expanded(
            child: item.isDivider
                ? const _RibActivityCalendarDivider()
                : _RibActivityCard(
                    item: resolvedActivity!,
                    type: RibActivityTimelineType.doubleLine,
                    rightIcon: false,
                    showTrailing: false,
                  ),
          ),
        ],
      ),
    );
  }
}

class _RibActivityCalendarDivider extends StatelessWidget {
  const _RibActivityCalendarDivider();

  @override
  Widget build(BuildContext context) {
    return ExcludeSemantics(
      child: LayoutBuilder(
        builder: (context, constraints) => CustomPaint(
          size: Size(constraints.maxWidth, 1),
          painter: _DashedLinePainter(),
        ),
      ),
    );
  }
}

class _DashedLinePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = DsColors.neutralGrey70
      ..strokeWidth = 1;
    for (double x = 0; x < size.width; x += 8) {
      canvas.drawLine(
        Offset(x, 0),
        Offset((x + 4).clamp(0, size.width), 0),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RibActivityCard extends StatelessWidget {
  const _RibActivityCard({
    required this.item,
    required this.type,
    required this.rightIcon,
    this.showTrailing = true,
    this.onTap,
  });

  final RibActivityTimelineItem item;
  final RibActivityTimelineType type;
  final bool rightIcon;
  final bool showTrailing;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final effect = DsEffects.shadowButtonWhite;
    final content = ConstrainedBox(
      constraints: BoxConstraints(
        minHeight: type == RibActivityTimelineType.doubleLine ? 60 : 40,
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: DsSpacing.lg,
          vertical: DsSpacing.md,
        ),
        child: Row(
          children: [
            _StateIcon(state: item.state),
            const SizedBox(width: DsSpacing.sm),
            Expanded(child: _buildLeading()),
            if (showTrailing) ...[
              const SizedBox(width: DsSpacing.sm),
              _buildTrailing(),
            ],
            if (rightIcon) ...[
              const SizedBox(width: DsSpacing.sm),
              const Icon(
                Icons.chevron_right_rounded,
                size: 20,
                color: DsColors.neutralGrey140,
              ),
            ],
          ],
        ),
      ),
    );

    return Semantics(
      label: '${item.state.semanticLabel}: ${item.label}',
      button: onTap != null,
      child: ExcludeSemantics(
        child: Container(
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: DsColors.neutralBaseWhite,
            border: Border.all(color: DsColors.surfaceCoolGrey100),
            borderRadius: BorderRadius.circular(DsRadius.md),
            boxShadow: [
              BoxShadow(
                color: effect.color,
                offset: Offset(effect.offsetX, effect.offsetY),
                blurRadius: effect.radius,
                spreadRadius: effect.spread,
              ),
            ],
          ),
          child: Material(
            color: Colors.transparent,
            child: onTap == null
                ? content
                : InkWell(
                    onTap: onTap,
                    focusColor: const Color(0xFFFFE8DD),
                    child: content,
                  ),
          ),
        ),
      ),
    );
  }

  Widget _buildLeading() {
    final labelColor =
        type == RibActivityTimelineType.singleLine &&
            item.state == RibActivityTimelineState.failed
        ? DsColors.error100
        : item.state == RibActivityTimelineState.inactive
        ? DsColors.neutralGrey130
        : DsColors.neutralGrey140;
    final label = Text(
      item.label,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      style: DsText.s1Semi.copyWith(color: labelColor),
    );

    if (type == RibActivityTimelineType.singleLine) return label;
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        label,
        const SizedBox(height: DsSpacing.xs),
        Text(
          item.subLabel,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
        ),
      ],
    );
  }

  Widget _buildTrailing() {
    if (type == RibActivityTimelineType.singleLine) {
      return Flexible(
        child: Text(
          item.subLabel,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          textAlign: TextAlign.end,
          style: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
        ),
      );
    }

    final status = item.status ?? item.state.defaultStatus;
    return SizedBox(
      width: 44,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(
            item.value ?? '',
            maxLines: 1,
            style: DsText.s1Semi.copyWith(color: DsColors.neutralGrey140),
          ),
          if (status.isNotEmpty) ...[
            const SizedBox(height: DsSpacing.xs),
            Text(
              status,
              maxLines: 1,
              style: DsText.p2Semi.copyWith(color: item.state.statusColor),
            ),
          ],
        ],
      ),
    );
  }
}

class _StateIcon extends StatelessWidget {
  const _StateIcon({required this.state});

  final RibActivityTimelineState state;

  @override
  Widget build(BuildContext context) {
    return Icon(state.icon, size: 16, color: state.iconColor);
  }
}

extension on RibActivityTimelineState {
  String get semanticLabel => switch (this) {
    RibActivityTimelineState.current => 'Current',
    RibActivityTimelineState.inactive => 'Inactive',
    RibActivityTimelineState.completed => 'Completed',
    RibActivityTimelineState.warning => 'Warning',
    RibActivityTimelineState.failed => 'Failed',
  };

  String get defaultStatus => switch (this) {
    RibActivityTimelineState.current => '',
    RibActivityTimelineState.inactive => '',
    RibActivityTimelineState.completed => 'Completed',
    RibActivityTimelineState.warning => 'Pending',
    RibActivityTimelineState.failed => 'Failed',
  };

  IconData get icon => switch (this) {
    RibActivityTimelineState.current => Icons.radio_button_checked,
    RibActivityTimelineState.inactive => Icons.radio_button_checked,
    RibActivityTimelineState.completed => Icons.check_circle,
    RibActivityTimelineState.warning => Icons.error,
    RibActivityTimelineState.failed => Icons.error,
  };

  Color get iconColor => switch (this) {
    RibActivityTimelineState.current => DsColors.primaryOrange100,
    RibActivityTimelineState.inactive => DsColors.neutralGrey90,
    RibActivityTimelineState.completed => DsColors.success100,
    RibActivityTimelineState.warning => DsColors.warning100,
    RibActivityTimelineState.failed => DsColors.error100,
  };

  Color get statusColor => switch (this) {
    RibActivityTimelineState.current => DsColors.neutralGrey140,
    RibActivityTimelineState.inactive => DsColors.neutralGrey120,
    RibActivityTimelineState.completed => DsColors.success110,
    RibActivityTimelineState.warning => DsColors.neutralGrey140,
    RibActivityTimelineState.failed => DsColors.error100,
  };
}
