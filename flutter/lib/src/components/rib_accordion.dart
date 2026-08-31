import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

/// Visual presentations defined by the RIB Accordion component set.
enum RibAccordionVariant {
  plain,
  noContainer,
  colouredBackground,
  standardContainer,
  explanationContainer,
}

/// A controlled disclosure component for RIB Flutter journeys.
///
/// The parent owns [expanded] so a list can enforce either single-open or
/// multiple-open behaviour without that policy being hidden inside the row.
class RibAccordion extends StatelessWidget {
  const RibAccordion({
    required this.title,
    required this.content,
    required this.expanded,
    required this.onChanged,
    this.variant = RibAccordionVariant.plain,
    this.subtitle,
    this.leading,
    this.animationDuration = const Duration(milliseconds: 200),
    super.key,
  });

  final String title;
  final Widget content;
  final bool expanded;
  final ValueChanged<bool> onChanged;
  final RibAccordionVariant variant;
  final String? subtitle;
  final Widget? leading;
  final Duration animationDuration;

  @override
  Widget build(BuildContext context) {
    final spec = _RibAccordionSpec.fromVariant(variant, expanded: expanded);
    final accordion = Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _buildHeader(spec),
        AnimatedSize(
          duration: animationDuration,
          curve: Curves.easeInOut,
          alignment: Alignment.topCenter,
          child: expanded ? _buildBody(spec) : const SizedBox.shrink(),
        ),
        if (spec.hasDivider)
          Padding(
            padding: const EdgeInsets.only(top: DsSpacing.md),
            child: Divider(
              height: 1,
              thickness: 1,
              color: variant == RibAccordionVariant.plain
                  ? DsColors.neutralGrey60
                  : DsColors.surfaceCoolGrey110,
            ),
          ),
      ],
    );

    return _buildSurface(spec, accordion);
  }

  Widget _buildHeader(_RibAccordionSpec spec) {
    final resolvedLeading = leading ?? _defaultLeading();
    final hasLeading = variant != RibAccordionVariant.plain;
    final titleWidget = variant == RibAccordionVariant.explanationContainer
        ? Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: spec.titleStyle),
              if (subtitle != null) ...[
                const SizedBox(height: DsSpacing.sm),
                Text(subtitle!, style: spec.subtitleStyle),
              ],
            ],
          )
        : Text(title, style: spec.titleStyle);

    return Semantics(
      button: true,
      expanded: expanded,
      child: InkWell(
        excludeFromSemantics: true,
        onTap: () => onChanged(!expanded),
        borderRadius: spec.borderRadius,
        focusColor: DsEffects.ringFocus.color,
        child: Padding(
          padding: spec.headerPadding,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              if (hasLeading) ...[
                resolvedLeading,
                SizedBox(width: spec.leadingGap),
              ],
              Expanded(child: titleWidget),
              const SizedBox(width: DsSpacing.sm),
              Icon(
                expanded
                    ? Icons.keyboard_arrow_up_rounded
                    : Icons.keyboard_arrow_down_rounded,
                size: 20,
                color: DsColors.neutralGrey150,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBody(_RibAccordionSpec spec) {
    return ColoredBox(
      color: spec.bodyColor,
      child: Padding(
        padding: spec.bodyPadding,
        child: DefaultTextStyle(style: spec.bodyStyle, child: content),
      ),
    );
  }

  Widget _buildSurface(_RibAccordionSpec spec, Widget child) {
    if (spec.borderColor != null) {
      return Material(
        color: spec.surfaceColor,
        shape: RoundedRectangleBorder(
          borderRadius: spec.borderRadius,
          side: BorderSide(color: spec.borderColor!),
        ),
        clipBehavior: Clip.antiAlias,
        child: child,
      );
    }
    return Material(color: spec.surfaceColor, child: child);
  }

  Widget _defaultLeading() {
    switch (variant) {
      case RibAccordionVariant.plain:
        return const SizedBox.shrink();
      case RibAccordionVariant.noContainer:
        return const Icon(
          Icons.verified_user_rounded,
          size: 16,
          color: DsColors.primaryOrange100,
        );
      case RibAccordionVariant.colouredBackground:
        return const Icon(
          Icons.work_rounded,
          size: 20,
          color: DsColors.primaryMaroon100,
        );
      case RibAccordionVariant.standardContainer:
        return const _RibShieldPlate();
      case RibAccordionVariant.explanationContainer:
        return const Icon(
          Icons.verified_user_rounded,
          size: 20,
          color: DsColors.primaryOrange100,
        );
    }
  }
}

class _RibShieldPlate extends StatelessWidget {
  const _RibShieldPlate();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 38,
      height: 38,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
        color: DsColors.neutralGrey60,
        shape: BoxShape.circle,
      ),
      child: const Icon(
        Icons.verified_user_rounded,
        size: 20,
        color: DsColors.primaryOrange100,
      ),
    );
  }
}

class _RibAccordionSpec {
  const _RibAccordionSpec({
    required this.headerPadding,
    required this.bodyPadding,
    required this.titleStyle,
    required this.subtitleStyle,
    required this.bodyStyle,
    required this.surfaceColor,
    required this.bodyColor,
    required this.borderRadius,
    required this.leadingGap,
    this.borderColor,
    this.hasDivider = false,
  });

  factory _RibAccordionSpec.fromVariant(
    RibAccordionVariant variant, {
    required bool expanded,
  }) {
    switch (variant) {
      case RibAccordionVariant.plain:
        return _RibAccordionSpec(
          headerPadding: EdgeInsets.zero,
          bodyPadding: const EdgeInsets.only(top: DsSpacing.sm),
          titleStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey140),
          subtitleStyle: DsText.p2Reg,
          bodyStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
          surfaceColor: Colors.transparent,
          bodyColor: Colors.transparent,
          borderRadius: BorderRadius.zero,
          leadingGap: 0,
          hasDivider: true,
        );
      case RibAccordionVariant.noContainer:
        return _RibAccordionSpec(
          headerPadding: EdgeInsets.zero,
          bodyPadding: const EdgeInsets.only(top: DsSpacing.sm),
          titleStyle: (expanded ? DsText.s1Semi : DsText.s1Regular).copyWith(
            color: DsColors.neutralGrey140,
          ),
          subtitleStyle: DsText.p2Reg,
          bodyStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
          surfaceColor: Colors.transparent,
          bodyColor: Colors.transparent,
          borderRadius: BorderRadius.zero,
          leadingGap: DsSpacing.md,
          hasDivider: true,
        );
      case RibAccordionVariant.colouredBackground:
        return _RibAccordionSpec(
          headerPadding: expanded
              ? const EdgeInsets.fromLTRB(
                  DsSpacing.lg,
                  DsSpacing.lg,
                  DsSpacing.lg,
                  0,
                )
              : const EdgeInsets.symmetric(
                  horizontal: DsSpacing.lg,
                  vertical: DsSpacing.md,
                ),
          bodyPadding: const EdgeInsets.fromLTRB(
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.lg,
          ),
          titleStyle: DsText.s1Semi.copyWith(color: DsColors.neutralGrey140),
          subtitleStyle: DsText.p2Reg,
          bodyStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
          surfaceColor:
              expanded ? DsColors.surfaceCoolGrey100 : Colors.transparent,
          bodyColor: Colors.transparent,
          borderRadius: BorderRadius.zero,
          leadingGap: DsSpacing.sm,
        );
      case RibAccordionVariant.standardContainer:
        return _RibAccordionSpec(
          headerPadding: const EdgeInsets.symmetric(
            horizontal: DsSpacing.lg,
            vertical: DsSpacing.md,
          ),
          bodyPadding: const EdgeInsets.symmetric(
            horizontal: DsSpacing.lg,
            vertical: DsSpacing.md,
          ),
          titleStyle: DsText.s1Semi.copyWith(color: DsColors.neutralGrey130),
          subtitleStyle: DsText.p2Reg,
          bodyStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey120),
          surfaceColor: DsColors.neutralBaseWhite,
          bodyColor: DsColors.surfaceCoolGrey90,
          borderColor: DsColors.surfaceCoolGrey110,
          borderRadius: BorderRadius.circular(DsRadius.lg),
          leadingGap: DsSpacing.sm,
        );
      case RibAccordionVariant.explanationContainer:
        return _RibAccordionSpec(
          headerPadding: const EdgeInsets.symmetric(
            horizontal: DsSpacing.lg,
            vertical: DsSpacing.md,
          ),
          bodyPadding: const EdgeInsets.fromLTRB(
            DsSpacing.lg,
            DsSpacing.md,
            DsSpacing.lg,
            DsSpacing.md,
          ),
          titleStyle: DsText.h3Regular.copyWith(color: DsColors.neutralGrey140),
          subtitleStyle: DsText.p2Reg.copyWith(color: DsColors.neutralGrey130),
          bodyStyle: DsText.s1Regular.copyWith(color: DsColors.neutralGrey120),
          surfaceColor: DsColors.neutralBaseWhite,
          bodyColor:
              expanded ? DsColors.surfaceCoolGrey90 : DsColors.neutralBaseWhite,
          borderColor: DsColors.surfaceCoolGrey110,
          borderRadius: BorderRadius.circular(DsRadius.md),
          leadingGap: DsSpacing.sm,
        );
    }
  }

  final EdgeInsets headerPadding;
  final EdgeInsets bodyPadding;
  final TextStyle titleStyle;
  final TextStyle subtitleStyle;
  final TextStyle bodyStyle;
  final Color surfaceColor;
  final Color bodyColor;
  final Color? borderColor;
  final BorderRadius borderRadius;
  final double leadingGap;
  final bool hasDivider;
}
