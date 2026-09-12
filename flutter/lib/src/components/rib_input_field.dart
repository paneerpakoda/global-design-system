import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';

enum RibInputFieldType { labelInline, labelOut, textArea }

enum RibInputTextSize { defaultSize, large }

/// RIB Input field from Figma component set 941:3119.
class RibInputField extends StatefulWidget {
  const RibInputField({
    required this.label,
    this.type = RibInputFieldType.labelInline,
    this.textSize = RibInputTextSize.defaultSize,
    this.controller,
    this.helper,
    this.placeholder,
    this.floatingLabelBehavior = FloatingLabelBehavior.auto,
    this.errorText,
    this.leading,
    this.rightLabel,
    this.enabled = true,
    this.onChanged,
    this.width = 245,
    this.initialValue,
    this.validator,
    this.autovalidateMode = AutovalidateMode.disabled,
    this.focusNode,
    this.autofocus = false,
    this.keyboardType,
    this.textInputAction,
    this.inputFormatters,
    this.readOnly = false,
    this.obscureText = false,
    this.trailing,
    this.onTap,
    this.onFieldSubmitted,
    this.autofillHints,
    this.hintMaxLines = 1,
    super.key,
  });

  final String label;
  final RibInputFieldType type;
  final RibInputTextSize textSize;
  final TextEditingController? controller;
  final String? helper;
  final String? placeholder;
  final FloatingLabelBehavior floatingLabelBehavior;
  final String? errorText;
  final Widget? leading;
  final String? rightLabel;
  final bool enabled;
  final ValueChanged<String>? onChanged;
  final double? width;
  final String? initialValue;
  final FormFieldValidator<String>? validator;
  final AutovalidateMode autovalidateMode;
  final FocusNode? focusNode;
  final bool autofocus;
  final TextInputType? keyboardType;
  final TextInputAction? textInputAction;
  final List<TextInputFormatter>? inputFormatters;
  final bool readOnly;
  final bool obscureText;
  final Widget? trailing;
  final VoidCallback? onTap;
  final ValueChanged<String>? onFieldSubmitted;
  final Iterable<String>? autofillHints;
  final int hintMaxLines;

  @override
  State<RibInputField> createState() => _RibInputFieldState();

  Widget _build(BuildContext context, TextEditingController editing) {
    final isArea = type == RibInputFieldType.textArea;
    // Composite controls keep their label outside the prefix/input surface.
    final outside =
        type == RibInputFieldType.labelOut ||
        (leading != null &&
            floatingLabelBehavior != FloatingLabelBehavior.never);
    final inline = !outside && type == RibInputFieldType.labelInline;
    final displayLabel = editing.text.isEmpty ? (placeholder ?? label) : label;
    final hasError = errorText != null;
    final borderColor = hasError
        ? DsColors.error100
        : DsColors.surfaceCoolGrey110;
    final field = TextFormField(
      controller: editing,
      validator: validator,
      // Material 3 supplies a 4px subtext gap; add 4px to match the 8px DS gap.
      errorBuilder: (context, message) => Padding(
        padding: const EdgeInsets.only(top: DsSpacing.xs),
        child: Text(
          message,
          maxLines: 3,
          style: DsText.s1Regular.copyWith(color: DsColors.error100),
        ),
      ),
      autovalidateMode: autovalidateMode,
      focusNode: focusNode,
      autofocus: autofocus,
      keyboardType: keyboardType,
      textInputAction: textInputAction,
      inputFormatters: inputFormatters,
      readOnly: readOnly,
      selectAllOnFocus: false,
      obscureText: obscureText,
      onTap: onTap,
      onFieldSubmitted: onFieldSubmitted,
      autofillHints: autofillHints,
      enabled: enabled,
      onChanged: onChanged,
      minLines: isArea ? 3 : 1,
      maxLines: isArea ? 3 : 1,
      style:
          (textSize == RibInputTextSize.large
                  ? DsText.h3Regular
                  : DsText.inputRSemi)
              .copyWith(
                color: enabled
                    ? DsColors.neutralGrey140
                    : DsColors.neutralGrey90,
              ),
      decoration: InputDecoration(
        labelText:
            inline &&
                placeholder == null &&
                floatingLabelBehavior != FloatingLabelBehavior.never
            ? label
            : null,
        label:
            inline &&
                placeholder != null &&
                floatingLabelBehavior != FloatingLabelBehavior.never
            ? ExcludeSemantics(
                child: Text(
                  displayLabel,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              )
            : null,
        hint: inline && floatingLabelBehavior == FloatingLabelBehavior.never
            ? ExcludeSemantics(
                child: Text(
                  placeholder ?? label,
                  style: DsText.inputRRegular.copyWith(
                    color: DsColors.neutralGrey110,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              )
            : null,
        floatingLabelBehavior: floatingLabelBehavior,
        floatingLabelStyle: DsText.inputLRegular.copyWith(
          color: DsColors.neutralGrey120,
        ),
        labelStyle: DsText.inputRRegular.copyWith(
          color: DsColors.neutralGrey110,
        ),
        hintMaxLines: hintMaxLines,
        hintStyle: DsText.inputRRegular.copyWith(
          color: DsColors.neutralGrey110,
        ),
        prefixIcon: leading == null
            ? null
            : Padding(
                // Material 3 adds 4px between the prefix and editable area.
                padding: const EdgeInsets.only(
                  left: 1,
                  top: 1,
                  bottom: 1,
                  right: DsSpacing.md,
                ),
                // Keep the prefix surface inside the enclosing one-pixel border.
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    maxHeight: MediaQuery.textScalerOf(context).scale(20) + 26,
                  ),
                  child: leading,
                ),
              ),
        suffixIcon: trailing,
        errorMaxLines: 3,
        errorStyle: DsText.s1Regular.copyWith(color: DsColors.error100),
        suffixText: rightLabel,
        suffixStyle: DsText.s1Regular.copyWith(color: DsColors.neutralGrey120),
        filled: true,
        fillColor: enabled
            ? DsColors.surfaceCoolGrey90
            : DsColors.surfaceCoolGrey100,
        contentPadding: const EdgeInsets.fromLTRB(
          DsSpacing.lg,
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

    return SizedBox(
      width: width,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (outside) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: DsSpacing.xs),
              child: ExcludeSemantics(
                child: Text(
                  label,
                  style: DsText.h3Semi.copyWith(color: DsColors.neutralGrey140),
                ),
              ),
            ),
            const SizedBox(height: DsSpacing.sm),
          ],
          Semantics(
            label:
                outside ||
                    isArea ||
                    placeholder != null ||
                    floatingLabelBehavior == FloatingLabelBehavior.never
                ? label
                : null,
            child: field,
          ),
          if (helper != null || hasError) ...[
            const SizedBox(height: DsSpacing.sm),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: DsSpacing.xs),
              child: Row(
                children: [
                  DsIcon(
                    hasError ? DsIconData.warning : DsIconData.info,
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
    );
  }
}

class _RibInputFieldState extends State<RibInputField> {
  late final local = TextEditingController(text: widget.initialValue);
  @override
  void dispose() {
    local.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final editing = widget.controller ?? local;
    return ValueListenableBuilder<TextEditingValue>(
      valueListenable: editing,
      builder: (context, value, child) => widget._build(context, editing),
    );
  }
}
