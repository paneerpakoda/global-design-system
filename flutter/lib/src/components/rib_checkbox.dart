import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

enum RibCheckboxSize { small, large }

/// Controlled RIB Checkbox from Figma page 68:1276.
class RibCheckbox extends StatelessWidget {
  const RibCheckbox({
    required this.value,
    required this.label,
    required this.onChanged,
    this.size = RibCheckboxSize.small,
    super.key,
  });

  final bool value;
  final String label;
  final ValueChanged<bool>? onChanged;
  final RibCheckboxSize size;

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
      child: InkWell(
        onTap: enabled ? () => onChanged!(!value) : null,
        borderRadius: BorderRadius.circular(DsRadius.xs),
        focusColor: DsEffects.ringFocus.color,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: DsSpacing.xxs),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                value ? Icons.check_box : Icons.check_box_outline_blank,
                size: 20,
                color:
                    value ? DsColors.primaryOrange100 : DsColors.neutralGrey120,
              ),
              const SizedBox(width: DsSpacing.sm),
              Text(
                label,
                style: labelStyle.copyWith(color: DsColors.neutralGrey140),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
