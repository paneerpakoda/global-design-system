import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

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
    final borderColor =
        hasError ? DsColors.error100 : DsColors.surfaceCoolGrey110;
    final field = TextField(
      controller: controller,
      enabled: enabled,
      onChanged: onChanged,
      minLines: isArea ? 3 : 1,
      maxLines: isArea ? 3 : 1,
      style: (textSize == RibInputTextSize.large
              ? DsText.h3Regular
              : DsText.inputRRegular)
          .copyWith(
        color: enabled ? DsColors.neutralGrey140 : DsColors.neutralGrey90,
      ),
      decoration: InputDecoration(
        hintText: type == RibInputFieldType.labelInline ? label : null,
        hintStyle: DsText.inputRRegular.copyWith(
          color: DsColors.neutralGrey110,
        ),
        prefixIcon: leading,
        suffixText: rightLabel,
        suffixStyle: DsText.s1Regular.copyWith(color: DsColors.neutralGrey120),
        filled: true,
        fillColor:
            enabled ? DsColors.neutralBaseWhite : DsColors.surfaceCoolGrey100,
        contentPadding: const EdgeInsets.fromLTRB(
          DsSpacing.sm,
          DsSpacing.md,
          DsSpacing.lg,
          DsSpacing.md,
        ),
        constraints: BoxConstraints(minHeight: isArea ? 84 : 48),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: BorderSide(color: borderColor),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.surfaceCoolGrey110),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.primaryOrange100),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
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
                padding: const EdgeInsets.symmetric(horizontal: DsSpacing.xs),
                child: Text(
                  label,
                  style: DsText.s1Semi.copyWith(color: DsColors.neutralGrey140),
                ),
              ),
              const SizedBox(height: DsSpacing.sm),
            ],
            field,
            if (helper != null || hasError) ...[
              const SizedBox(height: DsSpacing.sm),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: DsSpacing.xs),
                child: Row(
                  children: [
                    Icon(
                      hasError ? Icons.warning_amber : Icons.info,
                      size: 12,
                      color: hasError
                          ? DsColors.error100
                          : DsColors.neutralGrey120,
                    ),
                    const SizedBox(width: DsSpacing.xs),
                    Expanded(
                      child: Text(
                        errorText ?? helper!,
                        style: DsText.p2Reg.copyWith(
                          color: hasError
                              ? DsColors.error100
                              : DsColors.neutralGrey120,
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
