import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibChipVariant { standard, labelWhite, labelTranslucent }

enum RibChipSize { large, medium, small }

/// Selectable RIB Chip from Figma page 1135:15928.
class RibChip extends StatelessWidget {
  const RibChip({
    required this.label,
    required this.onPressed,
    this.variant = RibChipVariant.standard,
    this.size = RibChipSize.medium,
    this.selected = false,
    this.leadingIcon,
    this.trailingIcon,
    super.key,
  });

  final String label;
  final VoidCallback? onPressed;
  final RibChipVariant variant;
  final RibChipSize size;
  final bool selected;
  final Widget? leadingIcon;
  final Widget? trailingIcon;

  double get _height {
    if (variant == RibChipVariant.labelWhite) return 32;
    if (variant == RibChipVariant.labelTranslucent) return 36;
    return switch (size) {
      RibChipSize.large => 32,
      RibChipSize.medium => 24,
      RibChipSize.small => 20,
    };
  }

  double get _horizontalPadding {
    if (variant == RibChipVariant.labelWhite) return 12;
    if (variant == RibChipVariant.labelTranslucent) return 16;
    return size == RibChipSize.large ? 16 : 8;
  }

  double get _fontSize => size == RibChipSize.small
      ? 10
      : size == RibChipSize.medium
      ? 11
      : 12;

  @override
  Widget build(BuildContext context) {
    final colors = _colors();
    final effect = DsEffects.shadowButtonWhite;
    final hasShadow = selected || variant == RibChipVariant.labelWhite;

    return Semantics(
      button: true,
      selected: selected,
      enabled: onPressed != null,
      label: label,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(
            size == RibChipSize.small ? 4 : 8,
          ),
          focusColor: const Color(0xFFFFE8DD),
          child: Container(
            height: _height,
            padding: EdgeInsets.symmetric(horizontal: _horizontalPadding),
            decoration: BoxDecoration(
              color: colors.background,
              border: Border.all(color: colors.border),
              borderRadius: BorderRadius.circular(
                size == RibChipSize.small ? 4 : 8,
              ),
              boxShadow: hasShadow
                  ? [
                      BoxShadow(
                        color: effect.color,
                        offset: Offset(effect.offsetX, effect.offsetY),
                        blurRadius: effect.radius,
                        spreadRadius: effect.spread,
                      ),
                    ]
                  : null,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (leadingIcon != null) ...[
                  IconTheme(
                    data: IconThemeData(size: 14, color: colors.foreground),
                    child: leadingIcon!,
                  ),
                  const SizedBox(width: 4),
                ],
                Text(
                  label,
                  style: TextStyle(
                    color: colors.foreground,
                    fontSize: _fontSize,
                    height: 16 / _fontSize,
                    fontWeight: FontWeight.w600,
                    letterSpacing: .25,
                  ),
                ),
                if (trailingIcon != null) ...[
                  const SizedBox(width: 4),
                  IconTheme(
                    data: IconThemeData(size: 14, color: colors.foreground),
                    child: trailingIcon!,
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  _RibChipColors _colors() {
    if (variant == RibChipVariant.labelTranslucent) {
      return _RibChipColors(
        background: DsColors.neutralBaseWhite.withValues(alpha: .1),
        border: DsColors.neutralBaseWhite.withValues(alpha: .2),
        foreground: DsColors.neutralBaseWhite,
      );
    }
    if (variant == RibChipVariant.labelWhite) {
      return const _RibChipColors(
        background: DsColors.neutralBaseWhite,
        border: DsColors.surfaceCoolGrey110,
        foreground: DsColors.neutralGrey140,
      );
    }
    if (selected) {
      return const _RibChipColors(
        background: DsColors.pastelAmber90,
        border: DsColors.primaryOrange100,
        foreground: DsColors.primaryOrange100,
      );
    }
    return const _RibChipColors(
      background: DsColors.neutralBaseWhite,
      border: DsColors.neutralGrey70,
      foreground: DsColors.neutralGrey110,
    );
  }
}

class _RibChipColors {
  const _RibChipColors({
    required this.background,
    required this.border,
    required this.foreground,
  });

  final Color background;
  final Color border;
  final Color foreground;
}
