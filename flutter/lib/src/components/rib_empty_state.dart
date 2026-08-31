import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

/// RIB Empty state from Figma component set 56:237.
class RibEmptyState extends StatelessWidget {
  const RibEmptyState({
    required this.title,
    required this.subline,
    this.showHeading = false,
    this.hovered = false,
    this.actionLabel = 'Button',
    this.onAction,
    this.icon,
    super.key,
  });

  final String title;
  final String subline;
  final bool showHeading;
  final bool hovered;
  final String actionLabel;
  final VoidCallback? onAction;
  final Widget? icon;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '$title. $subline',
      container: true,
      child: Container(
        width: 468,
        padding: const EdgeInsets.all(DsSpacing.lg),
        decoration: BoxDecoration(
          color: showHeading
              ? Colors.transparent
              : hovered
                  ? DsColors.pastelAmber90
                  : DsColors.surfaceCoolGrey90,
          border: Border.all(
            color: showHeading
                ? Colors.transparent
                : hovered
                    ? DsColors.primaryOrange80
                    : DsColors.surfaceCoolGrey110,
          ),
          borderRadius: BorderRadius.circular(DsRadius.md),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconTheme(
              data: IconThemeData(
                color: hovered
                    ? DsColors.primaryOrange100
                    : DsColors.neutralGrey120,
                size: 24,
              ),
              child: icon ?? const Icon(Icons.remove_circle_outline),
            ),
            if (showHeading) ...[
              const SizedBox(height: DsSpacing.xs),
              Text(
                title,
                textAlign: TextAlign.center,
                style: DsText.s1Semi.copyWith(color: DsColors.neutralGrey140),
              ),
            ],
            const SizedBox(height: DsSpacing.xs),
            Text(
              subline,
              textAlign: TextAlign.center,
              style: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
            ),
            if (onAction != null) ...[
              const SizedBox(height: DsSpacing.sm),
              TextButton.icon(
                onPressed: onAction,
                icon: const Icon(Icons.add, size: 14),
                label: Text(actionLabel),
                style: TextButton.styleFrom(
                  foregroundColor: DsColors.primaryOrange100,
                  textStyle: DsText.buttonSmall,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
