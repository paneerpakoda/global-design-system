import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibLabelSize { iconLarge, large, medium, small, badge }

enum RibLabelColour {
  translucent,
  inactive,
  defaultGrey,
  green,
  maroon,
  blue,
  red,
  orange,
}

/// RIB Label from Figma component set 4049:5384.
class RibLabel extends StatelessWidget {
  const RibLabel({
    required this.text,
    this.size = RibLabelSize.small,
    this.colour = RibLabelColour.inactive,
    this.icon,
    super.key,
  });

  final String text;
  final RibLabelSize size;
  final RibLabelColour colour;
  final Widget? icon;

  @override
  Widget build(BuildContext context) {
    final colors = _colors;
    final isBadge = size == RibLabelSize.badge;
    final foreground =
        isBadge &&
            const [
              RibLabelColour.green,
              RibLabelColour.maroon,
              RibLabelColour.red,
              RibLabelColour.orange,
            ].contains(colour)
        ? DsColors.neutralBaseWhite
        : colors.foreground;
    final background = isBadge
        ? _badgeBackground ?? colors.background
        : colors.background;
    return Semantics(
      label: text,
      child: Container(
        constraints: BoxConstraints(minHeight: _height),
        padding: _padding,
        decoration: BoxDecoration(color: background, borderRadius: _radius),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (size == RibLabelSize.iconLarge && icon != null) ...[
              IconTheme(
                data: IconThemeData(size: 12, color: foreground),
                child: icon!,
              ),
              const SizedBox(width: 4),
            ],
            Text(
              text,
              style: TextStyle(
                color: foreground,
                fontSize: 10,
                height: 16 / 10,
                fontWeight: size == RibLabelSize.iconLarge
                    ? FontWeight.w600
                    : FontWeight.w400,
                letterSpacing: .25,
              ),
            ),
          ],
        ),
      ),
    );
  }

  double get _height => switch (size) {
    RibLabelSize.iconLarge || RibLabelSize.large => 24,
    RibLabelSize.medium => 20,
    RibLabelSize.small || RibLabelSize.badge => 16,
  };
  EdgeInsets get _padding => switch (size) {
    RibLabelSize.iconLarge || RibLabelSize.large => const EdgeInsets.symmetric(
      horizontal: 8,
      vertical: 4,
    ),
    RibLabelSize.medium => const EdgeInsets.symmetric(
      horizontal: 8,
      vertical: 2,
    ),
    RibLabelSize.small => const EdgeInsets.symmetric(horizontal: 4),
    RibLabelSize.badge => const EdgeInsets.symmetric(horizontal: 8),
  };
  BorderRadius get _radius => size == RibLabelSize.badge
      ? const BorderRadius.vertical(top: Radius.circular(4))
      : BorderRadius.circular(
          size == RibLabelSize.iconLarge || size == RibLabelSize.large ? 8 : 4,
        );

  _RibLabelColors get _colors => switch (colour) {
    RibLabelColour.translucent => _RibLabelColors(
      DsColors.neutralBaseWhite.withValues(alpha: .2),
      DsColors.neutralBaseWhite,
    ),
    RibLabelColour.inactive => const _RibLabelColors(
      DsColors.neutralGrey60,
      DsColors.neutralGrey110,
    ),
    RibLabelColour.defaultGrey => const _RibLabelColors(
      DsColors.surfaceCoolGrey110,
      DsColors.neutralGrey130,
    ),
    RibLabelColour.green => const _RibLabelColors(
      DsColors.pastelGreen100,
      DsColors.success100,
    ),
    RibLabelColour.maroon => const _RibLabelColors(
      DsColors.pastelBrown100,
      DsColors.primaryMaroon100,
    ),
    RibLabelColour.blue => const _RibLabelColors(
      DsColors.pastelBlue90,
      DsColors.neutralGrey120,
    ),
    RibLabelColour.red => const _RibLabelColors(
      DsColors.pastelPeach100,
      DsColors.error100,
    ),
    RibLabelColour.orange => const _RibLabelColors(
      DsColors.pastelAmber100,
      DsColors.primaryOrange100,
    ),
  };

  Color? get _badgeBackground => switch (colour) {
    RibLabelColour.green => DsColors.success100,
    RibLabelColour.maroon => DsColors.primaryMaroon100,
    RibLabelColour.red => DsColors.error100,
    RibLabelColour.orange => DsColors.primaryOrange100,
    _ => null,
  };
}

class _RibLabelColors {
  const _RibLabelColors(this.background, this.foreground);
  final Color background;
  final Color foreground;
}
