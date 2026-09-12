import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'ds_tokens.dart';

/// Audited GlobalDS assets. See docs/icon-provenance.json for source paths/hashes.
enum DsIconData {
  chevronLeft('chevron-left--line--235-116.svg'),
  chevronRight('chevron-right--line--235-115.svg'),
  chevronUp('chevron-up--line--235-117.svg'),
  chevronDown('chevron-down--line--235-118.svg'),
  caretUp('chevron-up--filled--717-260.svg'),
  caretDown('chevron-down--filled--679-239.svg'),
  tick('tick--line--237-436.svg'),
  calendar('calendar--filled--237-437.svg'),
  info('information--filled--237-442.svg'),
  success('done--filled--237-450.svg'),
  error('error--filled--237-451.svg'),
  warning('alert--filled--237-447.svg'),
  checkboxChecked('check-box-checked--filled--237-446.svg'),
  checkboxUnchecked('checkbox-unchecked--filled--237-445.svg'),
  radioOn('radio-button-on--filled--237-443.svg'),
  radioOff('radio-button-off--filled--237-444.svg'),
  shield('shield-1--filled--548-237.svg'),
  document('document-1--filled--571-335.svg');

  const DsIconData(this.fileName);
  final String fileName;
}

/// Renders the original GlobalDS SVG geometry with a semantic theme colour.
/// Decorative by default; controls provide their own accessible labels.
class DsIcon extends StatelessWidget {
  const DsIcon(
    this.icon, {
    this.size,
    this.color,
    this.semanticLabel,
    super.key,
  });
  final DsIconData icon;
  final double? size;
  final Color? color;
  final String? semanticLabel;
  @override
  Widget build(BuildContext context) {
    final theme = IconTheme.of(context);
    final extent = size ?? theme.size ?? DsSpacing.xl2;
    return SvgPicture.asset(
      'assets/icons/${icon.fileName}',
      package: 'global_ds',
      width: extent,
      height: extent,
      colorFilter: ColorFilter.mode(
        color ?? theme.color ?? DsColors.neutralGrey140,
        BlendMode.srcIn,
      ),
      semanticsLabel: semanticLabel,
      excludeFromSemantics: semanticLabel == null,
    );
  }
}
