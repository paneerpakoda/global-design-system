import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

enum RibInfoTone { defaultTone, success, error, warning }

/// RIB Info from Figma component set 348:9040.
class RibInfo extends StatelessWidget {
  const RibInfo({
    required this.message,
    this.tone = RibInfoTone.defaultTone,
    this.centre = false,
    this.stroke = false,
    this.showIcon = true,
    super.key,
  });

  final String message;
  final RibInfoTone tone;
  final bool centre;
  final bool stroke;
  final bool showIcon;

  @override
  Widget build(BuildContext context) {
    final colors = _colors;
    return Semantics(
      liveRegion: tone == RibInfoTone.error,
      label: message,
      child: Container(
        width: 516,
        padding: const EdgeInsets.symmetric(
          horizontal: DsSpacing.lg,
          vertical: DsSpacing.md,
        ),
        decoration: BoxDecoration(
          color: colors.background,
          border: Border.all(
            color: stroke ? colors.border : Colors.transparent,
          ),
          borderRadius: BorderRadius.circular(DsRadius.md),
        ),
        child: Row(
          mainAxisAlignment:
              centre ? MainAxisAlignment.center : MainAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (showIcon) ...[
              Icon(_icon, color: colors.icon, size: 16),
              const SizedBox(width: DsSpacing.sm),
            ],
            Flexible(
              child: Text(
                message,
                style: DsText.p1Reg.copyWith(color: colors.text),
              ),
            ),
          ],
        ),
      ),
    );
  }

  IconData get _icon => switch (tone) {
        RibInfoTone.defaultTone => Icons.info,
        RibInfoTone.success => Icons.check_circle,
        RibInfoTone.error => Icons.error,
        RibInfoTone.warning => Icons.warning,
      };

  _RibInfoColors get _colors => switch (tone) {
        RibInfoTone.defaultTone => const _RibInfoColors(
            DsColors.pastelAmber100,
            DsColors.pastelAmber110,
            DsColors.primaryOrange100,
            DsColors.neutralGrey150,
          ),
        RibInfoTone.success => const _RibInfoColors(
            DsColors.pastelGreen90,
            DsColors.pastelGreen110,
            DsColors.success100,
            DsColors.neutralGrey150,
          ),
        RibInfoTone.error => const _RibInfoColors(
            DsColors.pastelPeach90,
            DsColors.pastelPeach110,
            DsColors.error100,
            DsColors.error100,
          ),
        RibInfoTone.warning => const _RibInfoColors(
            DsColors.warning80,
            DsColors.pastelAmber110,
            DsColors.warning110,
            DsColors.neutralGrey150,
          ),
      };
}

class _RibInfoColors {
  const _RibInfoColors(this.background, this.border, this.icon, this.text);
  final Color background;
  final Color border;
  final Color icon;
  final Color text;
}
