import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';

enum RibInfoTone { defaultTone, success, error, warning }

/// RIB Info from Figma component set 348:9040.
class RibInfo extends StatelessWidget {
  const RibInfo({
    required this.message,
    this.tone = RibInfoTone.defaultTone,
    this.centre = false,
    this.stroke = false,
    this.showIcon = true,
    this.width = 516,
    this.textStyle,
    this.title,
    super.key,
  });

  final String message;
  final String? title;
  final RibInfoTone tone;
  final bool centre;
  final bool stroke;
  final bool showIcon;
  final double width;
  final TextStyle? textStyle;

  @override
  Widget build(BuildContext context) {
    final colors = _colors;
    return Semantics(
      container: true,
      liveRegion: tone == RibInfoTone.error,
      label: title == null ? message : '$title. $message',
      child: ExcludeSemantics(
        child: Container(
          width: width,
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
          child: title == null
              ? _iconRow(
                  Text(
                    message,
                    style: (textStyle ?? DsText.p1Reg).copyWith(
                      color: colors.text,
                    ),
                  ),
                )
              : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _iconRow(
                      Text(
                        title!,
                        style: DsText.h3Semi.copyWith(color: colors.text),
                      ),
                    ),
                    const SizedBox(height: DsSpacing.xs),
                    Padding(
                      padding: EdgeInsetsDirectional.only(
                        start: showIcon ? 24 + DsSpacing.sm : 0,
                      ),
                      child: Text(
                        message,
                        style: (textStyle ?? DsText.p1Reg).copyWith(
                          color: colors.text,
                        ),
                      ),
                    ),
                  ],
                ),
        ),
      ),
    );
  }

  // Centre against the text itself, including wrapped messages or headings.
  Widget _iconRow(Widget text) => Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    mainAxisAlignment: centre
        ? MainAxisAlignment.center
        : MainAxisAlignment.start,
    mainAxisSize: MainAxisSize.min,
    children: [
      if (showIcon) ...[
        DsIcon(_icon, color: _colors.icon, size: 24),
        const SizedBox(width: DsSpacing.sm),
      ],
      Flexible(child: text),
    ],
  );

  DsIconData get _icon => switch (tone) {
    RibInfoTone.defaultTone => DsIconData.info,
    RibInfoTone.success => DsIconData.success,
    RibInfoTone.error => DsIconData.error,
    RibInfoTone.warning => DsIconData.warning,
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
