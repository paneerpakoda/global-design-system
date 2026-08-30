import 'package:flutter/material.dart';

import 'ds_tokens.dart';

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
    final labelSize = size == RibCheckboxSize.small ? 12.0 : 14.0;

    return Semantics(
      checked: value,
      enabled: enabled,
      label: label,
      button: true,
      child: InkWell(
        onTap: enabled ? () => onChanged!(!value) : null,
        borderRadius: BorderRadius.circular(4),
        focusColor: const Color(0xFFFFE8DD),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 2),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                value ? Icons.check_box : Icons.check_box_outline_blank,
                size: 20,
                color: value
                    ? DsColors.primaryOrange100
                    : DsColors.neutralGrey120,
              ),
              const SizedBox(width: 8),
              Text(
                label,
                style: TextStyle(
                  color: DsColors.neutralGrey140,
                  fontSize: labelSize,
                  height: 20 / labelSize,
                  letterSpacing: size == RibCheckboxSize.large ? .5 : 0,
                  fontWeight: value ? FontWeight.w600 : FontWeight.w400,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
