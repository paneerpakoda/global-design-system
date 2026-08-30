import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibInputFieldType { labelInline, labelOut, textArea }

enum RibInputTextSize { defaultSize, large }

/// RIB Input field from Figma component set 941:3119.
class RibInputField extends StatelessWidget {
  const RibInputField({
    required this.label,
    this.type = RibInputFieldType.labelInline,
    this.textSize = RibInputTextSize.defaultSize,
    this.controller,
    this.helper,
    this.errorText,
    this.leading,
    this.rightLabel,
    this.enabled = true,
    this.onChanged,
    super.key,
  });

  final String label;
  final RibInputFieldType type;
  final RibInputTextSize textSize;
  final TextEditingController? controller;
  final String? helper;
  final String? errorText;
  final Widget? leading;
  final String? rightLabel;
  final bool enabled;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final isArea = type == RibInputFieldType.textArea;
    final hasError = errorText != null;
    final borderColor = hasError
        ? DsColors.error100
        : DsColors.surfaceCoolGrey110;
    final field = TextField(
      controller: controller,
      enabled: enabled,
      onChanged: onChanged,
      minLines: isArea ? 3 : 1,
      maxLines: isArea ? 3 : 1,
      style: TextStyle(
        color: enabled ? DsColors.neutralGrey140 : DsColors.neutralGrey90,
        fontSize: textSize == RibInputTextSize.large ? 14 : 13,
        height: 20 / (textSize == RibInputTextSize.large ? 14 : 13),
        fontWeight: FontWeight.w500,
        letterSpacing: .25,
      ),
      decoration: InputDecoration(
        hintText: type == RibInputFieldType.labelInline ? label : null,
        hintStyle: const TextStyle(color: DsColors.neutralGrey110),
        prefixIcon: leading,
        suffixText: rightLabel,
        suffixStyle: const TextStyle(
          color: DsColors.neutralGrey120,
          fontSize: 12,
          height: 16 / 12,
          letterSpacing: .25,
        ),
        filled: true,
        fillColor: enabled
            ? DsColors.neutralBaseWhite
            : DsColors.surfaceCoolGrey100,
        contentPadding: const EdgeInsets.fromLTRB(8, 12, 16, 12),
        constraints: BoxConstraints(minHeight: isArea ? 84 : 48),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: borderColor),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: DsColors.surfaceCoolGrey110),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: DsColors.primaryOrange100),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
      ),
    );

    return Semantics(
      textField: true,
      label: label,
      child: SizedBox(
        width: 245,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (type == RibInputFieldType.labelOut) ...[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Text(
                  label,
                  style: const TextStyle(
                    color: DsColors.neutralGrey140,
                    fontSize: 12,
                    height: 16 / 12,
                    fontWeight: FontWeight.w600,
                    letterSpacing: .25,
                  ),
                ),
              ),
              const SizedBox(height: 8),
            ],
            field,
            if (helper != null || hasError) ...[
              const SizedBox(height: 8),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Row(
                  children: [
                    Icon(
                      hasError ? Icons.warning_amber : Icons.info,
                      size: 12,
                      color: hasError
                          ? DsColors.error100
                          : DsColors.neutralGrey120,
                    ),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        errorText ?? helper!,
                        style: TextStyle(
                          color: hasError
                              ? DsColors.error100
                              : DsColors.neutralGrey120,
                          fontSize: 11,
                          height: 16 / 11,
                          letterSpacing: .25,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
