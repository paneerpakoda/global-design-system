import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';

enum RibCheckboxSize { small, large }

/// Controlled RIB Checkbox from Figma page 68:1276.
class RibCheckbox extends StatelessWidget {
  const RibCheckbox({
    required this.value,
    required this.label,
    required this.onChanged,
    this.size = RibCheckboxSize.small,
    this.showLabel = true,
    super.key,
  });

  final bool value;
  final String label;
  final ValueChanged<bool>? onChanged;
  final RibCheckboxSize size;
  final bool showLabel;

  @override
  Widget build(BuildContext context) {
    final enabled = onChanged != null;
    final labelStyle = switch ((size, value)) {
      (RibCheckboxSize.small, true) => DsText.p1Semi.copyWith(letterSpacing: 0),
      (RibCheckboxSize.small, false) => DsText.p1Reg.copyWith(letterSpacing: 0),
      (RibCheckboxSize.large, true) => DsText.h3Semi,
      (RibCheckboxSize.large, false) => DsText.h3Regular,
    };

    return Semantics(
      checked: value,
      enabled: enabled,
      label: label,
      child: ConstrainedBox(
        constraints: const BoxConstraints(minWidth: 44, minHeight: 44),
        child: InkWell(
          onTap: enabled ? () => onChanged!(!value) : null,
          borderRadius: BorderRadius.circular(DsRadius.sm),
          hoverColor: DsColors.surfaceCoolGrey100,
          splashColor: Colors.transparent,
          focusColor: DsEffects.ringFocus.color,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: DsSpacing.sm,
              vertical: DsSpacing.sm,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                DsIcon(
                  value
                      ? DsIconData.checkboxChecked
                      : DsIconData.checkboxUnchecked,
                  size: 20,
                  color: !enabled
                      ? DsColors.neutralGrey90
                      : value
                      ? DsColors.primaryOrange100
                      : DsColors.neutralGrey120,
                ),
                if (showLabel) const SizedBox(width: DsSpacing.sm),
                if (showLabel)
                  Flexible(
                    child: ExcludeSemantics(
                      child: Text(
                        label,
                        style: labelStyle.copyWith(
                          color: enabled
                              ? DsColors.neutralGrey140
                              : DsColors.neutralGrey90,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
