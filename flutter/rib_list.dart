import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibListVariant {
  single,
  numbered,
  iconCircle,
  lineIcon,
  iconSquare,
  noHeadlineLarge,
  noHeadlineSmall,
  headline,
  twoColumn,
  container,
  checklist,
}

class RibListItem {
  const RibListItem({
    required this.title,
    this.subtitle,
    this.subject,
    this.icon,
    this.checked = false,
  });

  final String title;
  final String? subtitle;
  final String? subject;
  final Widget? icon;
  final bool checked;
}

/// RIB List family from Figma page 3981:10043.
class RibList extends StatelessWidget {
  const RibList({
    required this.items,
    this.variant = RibListVariant.single,
    this.onTap,
    this.onChecked,
    this.semanticLabel = 'List',
    super.key,
  });

  final List<RibListItem> items;
  final RibListVariant variant;
  final ValueChanged<int>? onTap;
  final ValueChanged<int>? onChecked;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final width = switch (variant) {
      RibListVariant.checklist => 516.0,
      RibListVariant.twoColumn || RibListVariant.container => 356.0,
      RibListVariant.iconCircle ||
      RibListVariant.lineIcon ||
      RibListVariant.iconSquare => 288.0,
      RibListVariant.noHeadlineLarge => 276.0,
      _ => 308.0,
    };
    return Semantics(
      label: semanticLabel,
      container: true,
      child: SizedBox(
        width: width,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(
            items.length,
            (index) => _item(items[index], index),
          ),
        ),
      ),
    );
  }

  Widget _item(RibListItem item, int index) {
    final child = Container(
      constraints: const BoxConstraints(minHeight: 40),
      padding: EdgeInsets.symmetric(
        horizontal:
            variant == RibListVariant.container ||
                variant == RibListVariant.headline
            ? 16
            : 0,
        vertical: 12,
      ),
      decoration: BoxDecoration(
        color:
            variant == RibListVariant.container ||
                variant == RibListVariant.headline
            ? DsColors.surfaceCoolGrey100
            : Colors.transparent,
        border: const Border(
          bottom: BorderSide(color: DsColors.surfaceCoolGrey110),
        ),
        borderRadius:
            variant == RibListVariant.container && index == items.length - 1
            ? const BorderRadius.vertical(bottom: Radius.circular(12))
            : null,
      ),
      child: Row(
        children: [
          if (variant == RibListVariant.numbered) ...[
            Container(
              width: 24,
              height: 24,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: DsColors.neutralBaseWhite,
                border: Border.all(color: DsColors.neutralGrey60),
                shape: BoxShape.circle,
              ),
              child: Text(
                '${index + 1}',
                style: const TextStyle(
                  color: DsColors.neutralGrey140,
                  fontSize: 11,
                ),
              ),
            ),
            const SizedBox(width: 12),
          ],
          if (_hasIcon) ...[
            Container(
              width: _iconDimension,
              height: _iconDimension,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: DsColors.surfaceCoolGrey100,
                borderRadius: BorderRadius.circular(
                  variant == RibListVariant.iconSquare ? 8 : 24,
                ),
              ),
              child: IconTheme(
                data: IconThemeData(
                  color: DsColors.primaryOrange100,
                  size: _iconGlyphDimension,
                ),
                child: item.icon ?? const Icon(Icons.account_balance),
              ),
            ),
            SizedBox(width: variant == RibListVariant.iconSquare ? 8 : 12),
          ],
          if (variant == RibListVariant.checklist) ...[
            Checkbox(
              value: item.checked,
              activeColor: DsColors.primaryOrange100,
              onChanged: onChecked == null ? null : (_) => onChecked!(index),
              visualDensity: VisualDensity.compact,
            ),
            Expanded(
              child: Text(
                item.title,
                style: const TextStyle(
                  color: DsColors.neutralGrey120,
                  fontSize: 14,
                  height: 20 / 14,
                  letterSpacing: .5,
                ),
              ),
            ),
          ] else
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (!_noHeadline)
                    Text(
                      item.title,
                      style: const TextStyle(
                        color: DsColors.neutralGrey140,
                        fontSize: 12,
                        height: 16 / 12,
                        fontWeight: FontWeight.w600,
                        letterSpacing: .25,
                      ),
                    ),
                  if (_noHeadline)
                    Text.rich(
                      TextSpan(
                        children: [
                          TextSpan(
                            text: item.title,
                            style: TextStyle(
                              color: variant == RibListVariant.noHeadlineSmall
                                  ? DsColors.neutralGrey150
                                  : DsColors.neutralGrey140,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          if (item.subtitle != null)
                            TextSpan(
                              text: ' ${item.subtitle}',
                              style: TextStyle(
                                color: DsColors.neutralGrey120,
                                fontWeight:
                                    variant == RibListVariant.noHeadlineSmall
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                              ),
                            ),
                        ],
                      ),
                      style: TextStyle(
                        fontSize: variant == RibListVariant.noHeadlineSmall
                            ? 11
                            : 12,
                        height: variant == RibListVariant.noHeadlineSmall
                            ? 16 / 11
                            : 20 / 12,
                        letterSpacing: .25,
                      ),
                    )
                  else if (item.subtitle != null) ...[
                    if (!_noHeadline) const SizedBox(height: 4),
                    Text(
                      item.subtitle!,
                      style: const TextStyle(
                        color: DsColors.neutralGrey120,
                        fontSize: 11,
                        height: 16 / 11,
                        letterSpacing: .25,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          if ((_isTwoColumn || variant == RibListVariant.headline) &&
              item.subject != null) ...[
            const SizedBox(width: 16),
            Text(
              item.subject!,
              textAlign: TextAlign.right,
              style: const TextStyle(
                color: DsColors.neutralGrey150,
                fontSize: 12,
                height: 16 / 12,
                fontWeight: FontWeight.w600,
                letterSpacing: .25,
              ),
            ),
          ],
        ],
      ),
    );
    return onTap == null
        ? child
        : InkWell(
            onTap: () => onTap!(index),
            focusColor: DsColors.pastelAmber90,
            child: child,
          );
  }

  bool get _isTwoColumn => const [
    RibListVariant.twoColumn,
    RibListVariant.container,
    RibListVariant.checklist,
  ].contains(variant);
  bool get _hasIcon => const [
    RibListVariant.iconCircle,
    RibListVariant.lineIcon,
    RibListVariant.iconSquare,
    RibListVariant.noHeadlineLarge,
    RibListVariant.noHeadlineSmall,
  ].contains(variant);
  double get _iconDimension => switch (variant) {
    RibListVariant.iconSquare || RibListVariant.noHeadlineSmall => 32,
    _ => 36,
  };
  double get _iconGlyphDimension =>
      variant == RibListVariant.lineIcon ? 24 : 16;
  bool get _noHeadline => const [
    RibListVariant.noHeadlineLarge,
    RibListVariant.noHeadlineSmall,
  ].contains(variant);
}
