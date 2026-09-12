import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';
import 'rib_input_field.dart';

enum RibOtpVariant { single, boxed, grouped }

enum RibOtpStatus { idle, verifying, verified }

/// One native editing target across single, boxed and grouped presentation.
/// The app owns expiry, resend, verification and its status.
class RibOtpField extends StatefulWidget {
  const RibOtpField({
    required this.onChanged,
    this.controller,
    this.length = 6,
    this.resend,
    this.errorText,
    this.enabled = true,
    this.autofocus = false,
    this.variant = RibOtpVariant.single,
    this.status = RibOtpStatus.idle,
    this.obscureText = false,
    super.key,
  }) : assert(length > 0);
  final ValueChanged<String> onChanged;
  final TextEditingController? controller;
  final int length;
  final Widget? resend;
  final String? errorText;
  final bool enabled, autofocus, obscureText;
  final RibOtpVariant variant;
  final RibOtpStatus status;
  @override
  State<RibOtpField> createState() => _RibOtpFieldState();
}

class _RibOtpFieldState extends State<RibOtpField> {
  final local = TextEditingController();
  final focus = FocusNode();
  TextEditingController get editing => widget.controller ?? local;
  @override
  void initState() {
    super.initState();
    focus.addListener(refresh);
  }

  void refresh() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    focus.dispose();
    local.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final blocked = !widget.enabled || widget.status != RibOtpStatus.idle;
    final trailing = widget.status == RibOtpStatus.verified
        ? const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              DsIcon(DsIconData.success, size: 16, color: DsColors.success100),
              SizedBox(width: DsSpacing.xs),
              Text('Verified', style: DsText.p1Semi),
            ],
          )
        : widget.status == RibOtpStatus.verifying
        ? const Text('Verifying…', style: DsText.p1Reg)
        : widget.resend;
    if (widget.variant == RibOtpVariant.single) {
      return RibInputField(
        label: 'Enter OTP',
        type: RibInputFieldType.labelInline,
        width: double.infinity,
        controller: editing,
        focusNode: focus,
        autofocus: widget.autofocus,
        keyboardType: TextInputType.number,
        autofillHints: const [AutofillHints.oneTimeCode],
        inputFormatters: [
          FilteringTextInputFormatter.digitsOnly,
          LengthLimitingTextInputFormatter(widget.length),
        ],
        errorText: widget.errorText,
        enabled: widget.enabled,
        readOnly: blocked,
        obscureText: widget.obscureText,
        onChanged: widget.onChanged,
        trailing: trailing == null
            ? null
            : Padding(
                padding: const EdgeInsets.symmetric(horizontal: DsSpacing.lg),
                child: Center(widthFactor: 1, heightFactor: 1, child: trailing),
              ),
      );
    }
    return ValueListenableBuilder<TextEditingValue>(
      valueListenable: editing,
      builder: (context, value, _) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('Enter OTP', style: DsText.h3Semi),
          const SizedBox(height: DsSpacing.sm),
          LayoutBuilder(
            builder: (context, constraints) {
              final grouped =
                  widget.variant == RibOtpVariant.grouped && widget.length > 3;
              final gaps =
                  (widget.length - 1) * DsSpacing.sm +
                  (grouped ? DsSpacing.sm : 0);
              final width = math.min(
                48 * widget.length + gaps,
                constraints.maxWidth,
              );
              final cell = (width - gaps) / widget.length;
              return SizedBox(
                width: width,
                height: 48,
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: TextFormField(
                        controller: editing,
                        focusNode: focus,
                        autofocus: widget.autofocus,
                        enabled: widget.enabled,
                        readOnly: blocked,
                        keyboardType: TextInputType.number,
                        autofillHints: const [AutofillHints.oneTimeCode],
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                          LengthLimitingTextInputFormatter(widget.length),
                        ],
                        style: DsText.inputLRegular.copyWith(
                          color: Colors.transparent,
                        ),
                        cursorColor: Colors.transparent,
                        enableInteractiveSelection: false,
                        obscureText: widget.obscureText,
                        showCursor: false,
                        decoration: InputDecoration(
                          labelText: 'Enter OTP',
                          floatingLabelBehavior: FloatingLabelBehavior.never,
                          labelStyle: DsText.inputLRegular.copyWith(
                            color: Colors.transparent,
                          ),
                          filled: false,
                          border: InputBorder.none,
                          enabledBorder: InputBorder.none,
                          focusedBorder: InputBorder.none,
                          disabledBorder: InputBorder.none,
                        ),
                        onChanged: widget.onChanged,
                      ),
                    ),
                    Positioned.fill(
                      child: IgnorePointer(
                        child: ExcludeSemantics(
                          child: Row(
                            children: [
                              for (var i = 0; i < widget.length; i++) ...[
                                if (i > 0)
                                  SizedBox(
                                    width:
                                        DsSpacing.sm +
                                        (grouped &&
                                                i == (widget.length / 2).ceil()
                                            ? DsSpacing.sm
                                            : 0),
                                  ),
                                Container(
                                  width: cell,
                                  height: 48,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: widget.enabled
                                        ? DsColors.surfaceCoolGrey90
                                        : DsColors.surfaceCoolGrey100,
                                    borderRadius: BorderRadius.circular(
                                      DsRadius.md,
                                    ),
                                    border: Border.all(
                                      color: widget.errorText != null
                                          ? DsColors.error100
                                          : widget.status ==
                                                RibOtpStatus.verified
                                          ? DsColors.success100
                                          : focus.hasFocus &&
                                                i ==
                                                    math.min(
                                                      value.text.length,
                                                      widget.length - 1,
                                                    )
                                          ? DsColors.primaryOrange100
                                          : DsColors.surfaceCoolGrey110,
                                    ),
                                  ),
                                  child: Text(
                                    i < value.text.length
                                        ? (widget.obscureText
                                              ? '•'
                                              : value.text[i])
                                        : '',
                                    style: DsText.inputLSemi.copyWith(
                                      color: widget.enabled
                                          ? DsColors.neutralGrey140
                                          : DsColors.neutralGrey90,
                                    ),
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
          if (widget.errorText != null)
            Padding(
              padding: const EdgeInsets.only(top: DsSpacing.sm),
              child: Text(
                widget.errorText!,
                style: DsText.p1Reg.copyWith(color: DsColors.error100),
              ),
            ),
          if (trailing != null)
            Padding(
              padding: const EdgeInsets.only(top: DsSpacing.sm),
              child: trailing,
            ),
        ],
      ),
    );
  }
}
