import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

class RibDropdownItem<T> {
  const RibDropdownItem({
    required this.value,
    required this.label,
    this.subheading,
  });

  final T value;
  final String label;
  final String? subheading;
}

/// RIB Dropdown area from Figma component set 3869:5784.
class RibDropdown<T> extends StatelessWidget {
  const RibDropdown({
    required this.items,
    required this.onChanged,
    this.value,
    this.showSubheadings = false,
    this.scroll = true,
    this.semanticLabel = 'Dropdown options',
    super.key,
  });

  final List<RibDropdownItem<T>> items;
  final ValueChanged<T>? onChanged;
  final T? value;
  final bool showSubheadings;
  final bool scroll;
  final String semanticLabel;

  @override
  Widget build(BuildContext context) {
    final list = ListView.builder(
      padding: EdgeInsets.zero,
      shrinkWrap: !scroll,
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        final selected = item.value == value;
        return Semantics(
          button: true,
          selected: selected,
          child: InkWell(
            onTap: onChanged == null ? null : () => onChanged!(item.value),
            focusColor: DsColors.neutralGrey60,
            hoverColor: DsColors.neutralGrey60,
            splashColor: DsColors.pastelAmber90,
            child: ConstrainedBox(
              constraints: const BoxConstraints(minHeight: 40),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: DsSpacing.lg,
                  vertical: DsSpacing.md,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      item.label,
                      style: DsText.s1Regular.copyWith(
                        color: selected
                            ? DsColors.primaryOrange100
                            : DsColors.neutralGrey130,
                      ),
                    ),
                    if (showSubheadings && item.subheading != null) ...[
                      const SizedBox(height: DsSpacing.xs),
                      Text(
                        item.subheading!,
                        style: DsText.p3Reg.copyWith(
                          color: selected
                              ? DsColors.primaryOrange100
                              : DsColors.neutralGrey120,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );

    return Semantics(
      label: semanticLabel,
      container: true,
      child: Container(
        width: 258,
        constraints: BoxConstraints(maxHeight: scroll ? 304 : double.infinity),
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: DsColors.neutralBaseWhite,
          border: Border.all(color: DsColors.surfaceCoolGrey110),
          borderRadius: BorderRadius.circular(DsRadius.md),
          boxShadow: [_boxShadowFrom(DsEffects.shadow200)],
        ),
        child: list,
      ),
    );
  }
}

BoxShadow _boxShadowFrom(DsEffectToken effect) => BoxShadow(
      color: effect.color,
      offset: Offset(effect.offsetX, effect.offsetY),
      blurRadius: effect.radius,
      spreadRadius: effect.spread,
    );
