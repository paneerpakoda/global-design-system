// Radio's groupValue/onChanged keep this package compatible with Flutter 3.27.
// ignore_for_file: deprecated_member_use
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';
import 'rib_input_field.dart';

class RibRadioGroup<T> extends StatelessWidget {
  const RibRadioGroup({
    required this.label,
    required this.options,
    required this.onChanged,
    this.value,
    this.validator,
    this.inline = false,
    this.showLabel = true,
    this.labelSpacing = DsSpacing.md,
    super.key,
  });
  final String label;
  final Map<T, String> options;
  final T? value;
  final ValueChanged<T>? onChanged;
  final FormFieldValidator<T>? validator;
  final bool inline;
  final bool showLabel;
  final double labelSpacing;
  @override
  Widget build(BuildContext context) => _RadioFormField<T>(
    key: ValueKey(label),
    initialValue: value,
    validator: validator,
    builder: (field) {
      void select(T? next) {
        if (next != null && onChanged != null) {
          field.didChange(next);
          onChanged!(next);
        }
      }

      Widget optionTile(MapEntry<T, String> option) {
        void activate() => select(option.key);
        return Semantics(
          key: ValueKey(option.key),
          container: true,
          label: option.value,
          checked: value == option.key,
          inMutuallyExclusiveGroup: true,
          enabled: onChanged != null,
          onTap: onChanged == null ? null : activate,
          child: ExcludeSemantics(
            child: InkWell(
              borderRadius: BorderRadius.circular(DsRadius.sm),
              hoverColor: DsColors.surfaceCoolGrey110,
              onTap: onChanged == null ? null : activate,
              child: ConstrainedBox(
                constraints: const BoxConstraints(minHeight: 44),
                child: Row(
                  mainAxisSize: inline ? MainAxisSize.min : MainAxisSize.max,
                  children: [
                    SizedBox(
                      width: DsSpacing.xl4,
                      height: DsSpacing.xl4,
                      child: Center(
                        child: DsIcon(
                          value == option.key
                              ? DsIconData.radioOn
                              : DsIconData.radioOff,
                          size: DsSpacing.xl,
                          color: onChanged == null
                              ? DsColors.neutralGrey90
                              : value == option.key
                              ? DsColors.primaryOrange100
                              : DsColors.neutralGrey120,
                        ),
                      ),
                    ),
                    Flexible(
                      child: Text(option.value, style: DsText.h3Regular),
                    ),
                    const SizedBox(width: DsSpacing.sm),
                  ],
                ),
              ),
            ),
          ),
        );
      }

      final content = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (showLabel) ...[
            Text(label, style: DsText.h3Semi),
            SizedBox(height: labelSpacing),
          ],
          if (inline)
            Wrap(
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: DsSpacing.lg,
              runSpacing: DsSpacing.xs,
              children: options.entries.map(optionTile).toList(),
            )
          else
            ...options.entries.map(optionTile),
          if (field.hasError)
            Text(
              field.errorText!,
              style: DsText.p2Reg.copyWith(color: DsColors.error100),
            ),
        ],
      );
      return showLabel
          ? content
          : Semantics(container: true, label: label, child: content);
    },
  );
}

// Update a controlled value without replacing the option focus/semantics nodes.
// Recreating the field on every selection also recreates web interaction targets.
class _RadioFormField<T> extends FormField<T> {
  const _RadioFormField({
    required super.builder,
    super.initialValue,
    super.validator,
    super.key,
  });

  @override
  FormFieldState<T> createState() => _RadioFormFieldState<T>();
}

class _RadioFormFieldState<T> extends FormFieldState<T> {
  @override
  void didUpdateWidget(covariant _RadioFormField<T> oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.initialValue != oldWidget.initialValue) {
      setValue(widget.initialValue);
    }
  }
}

class RibToggle extends StatelessWidget {
  const RibToggle({
    required this.label,
    required this.value,
    required this.onChanged,
    super.key,
  });
  final String label;
  final bool value;
  final ValueChanged<bool>? onChanged;
  @override
  Widget build(BuildContext context) => Semantics(
    label: label,
    toggled: value,
    enabled: onChanged != null,
    onTap: onChanged == null ? null : () => onChanged!(!value),
    child: ExcludeSemantics(
      child: InkWell(
        onTap: onChanged == null ? null : () => onChanged!(!value),
        borderRadius: BorderRadius.circular(DsRadius.sm),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            vertical: DsSpacing.sm + DsSpacing.xxs,
          ),
          child: Row(
            children: [
              Expanded(child: Text(label, style: DsText.h3Regular)),
              const SizedBox(width: DsSpacing.lg),
              Opacity(
                opacity: onChanged == null ? .45 : 1,
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  width: 44,
                  height: 24,
                  padding: const EdgeInsets.all(DsSpacing.xxs),
                  decoration: BoxDecoration(
                    color: value
                        ? DsColors.primaryOrange100
                        : DsColors.neutralGrey80,
                    borderRadius: BorderRadius.circular(DsRadius.xl),
                  ),
                  child: AnimatedAlign(
                    duration: const Duration(milliseconds: 150),
                    alignment: value
                        ? Alignment.centerRight
                        : Alignment.centerLeft,
                    child: Container(
                      width: 20,
                      height: 20,
                      decoration: const BoxDecoration(
                        color: DsColors.neutralBaseWhite,
                        shape: BoxShape.circle,
                      ),
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

class RibSegmentedControl<T> extends StatelessWidget {
  const RibSegmentedControl({
    required this.options,
    required this.value,
    required this.onChanged,
    super.key,
  });
  final Map<T, String> options;
  final T value;
  final ValueChanged<T> onChanged;
  @override
  Widget build(BuildContext context) => Wrap(
    spacing: DsSpacing.sm,
    runSpacing: DsSpacing.sm,
    children: options.entries
        .map(
          (entry) => ChoiceChip(
            label: Text(entry.value),
            selected: value == entry.key,
            onSelected: (_) => onChanged(entry.key),
          ),
        )
        .toList(),
  );
}

/// OTP lifecycle (expiry, resend, verification) belongs to the consumer.
class RibOtpField extends StatelessWidget {
  const RibOtpField({
    required this.onChanged,
    this.controller,
    this.length = 6,
    this.resend,
    this.errorText,
    this.enabled = true,
    this.autofocus = false,
    super.key,
  });
  final ValueChanged<String> onChanged;
  final TextEditingController? controller;
  final int length;

  /// Optional resend action displayed inside the trailing end of the input.
  final Widget? resend;
  final String? errorText;
  final bool enabled;
  final bool autofocus;
  @override
  Widget build(BuildContext context) => RibInputField(
    label: 'Enter OTP',
    trailing: resend == null
        ? null
        : Padding(
            padding: const EdgeInsets.symmetric(horizontal: DsSpacing.lg),
            child: Center(widthFactor: 1, heightFactor: 1, child: resend),
          ),
    type: RibInputFieldType.labelInline,
    width: double.infinity,
    controller: controller,
    autofocus: autofocus,
    keyboardType: TextInputType.number,
    autofillHints: const [AutofillHints.oneTimeCode],
    inputFormatters: [
      FilteringTextInputFormatter.digitsOnly,
      LengthLimitingTextInputFormatter(length),
    ],
    errorText: errorText,
    enabled: enabled,
    onChanged: onChanged,
  );
}

class RibStepper extends StatelessWidget {
  const RibStepper({
    required this.steps,
    required this.currentIndex,
    this.completed = const {},
    this.showLabels = false,
    this.completedIcon,
    this.onStepSelected,
    super.key,
  }) : assert(steps.length > 0);
  final List<String> steps;
  final int currentIndex;
  final Set<int> completed;

  /// Keep every step visible in short flows, including compact dialogs.
  final bool showLabels;
  final Widget? completedIcon;
  final ValueChanged<int>? onStepSelected;
  @override
  Widget build(BuildContext context) => LayoutBuilder(
    builder: (context, constraints) {
      final current = currentIndex.clamp(0, steps.length - 1);
      if (showLabels) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < steps.length; i++) ...[
              Flexible(
                child: Semantics(
                  label:
                      'Step ${i + 1} of ${steps.length}: ${steps[i]}, ${completed.contains(i)
                          ? 'completed'
                          : i == current
                          ? 'current'
                          : 'upcoming'}',
                  selected: i == current,
                  excludeSemantics: true,
                  child: InkWell(
                    onTap:
                        onStepSelected != null &&
                            (completed.contains(i) || i == current)
                        ? () => onStepSelected!(i)
                        : null,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          width: 24,
                          height: 24,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: i == current
                                  ? DsColors.primaryOrange100
                                  : DsColors.surfaceCoolGrey110,
                            ),
                            color: i == current
                                ? DsColors.primaryOrange100
                                : DsColors.neutralBaseWhite,
                          ),
                          child: completed.contains(i)
                              ? completedIcon ??
                                    const DsIcon(
                                      DsIconData.tick,
                                      size: 16,
                                      color: DsColors.neutralGrey100,
                                    )
                              : Text(
                                  '${i + 1}',
                                  style: DsText.s1Semi.copyWith(
                                    color: i == current
                                        ? DsColors.neutralBaseWhite
                                        : DsColors.neutralGrey100,
                                  ),
                                ),
                        ),
                        const SizedBox(width: DsSpacing.sm),
                        Flexible(
                          child: FittedBox(
                            fit: BoxFit.scaleDown,
                            alignment: Alignment.centerLeft,
                            child: Text(
                              steps[i],
                              maxLines: 1,
                              softWrap: false,
                              style:
                                  (i == current ? DsText.s1Bold : DsText.p1Semi)
                                      .copyWith(
                                        color: i == current
                                            ? DsColors.primaryOrange100
                                            : DsColors.neutralGrey100,
                                      ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              if (i < steps.length - 1)
                Container(
                  width: 24,
                  height: 1,
                  margin: const EdgeInsets.symmetric(horizontal: DsSpacing.sm),
                  color: DsColors.neutralGrey70,
                ),
            ],
          ],
        );
      }
      if (constraints.maxWidth < 600) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Step ${current + 1} of ${steps.length} · ${steps[current]}',
              style: DsText.s1Semi,
            ),
            const SizedBox(height: DsSpacing.sm),
            LinearProgressIndicator(
              value: (current + 1) / steps.length,
              semanticsLabel: 'Application progress',
            ),
          ],
        );
      }
      return Row(
        children: [
          for (var i = 0; i < steps.length; i++) ...[
            Tooltip(
              message: steps[i],
              child: Semantics(
                label:
                    'Step ${i + 1}: ${steps[i]}${completed.contains(i) ? ', completed' : ''}',
                selected: i == current,
                child: InkWell(
                  onTap:
                      onStepSelected != null &&
                          (completed.contains(i) || i == current)
                      ? () => onStepSelected!(i)
                      : null,
                  customBorder: const CircleBorder(),
                  child: Container(
                    width: 30,
                    height: 30,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: i == current || completed.contains(i)
                          ? DsColors.primaryOrange100
                          : DsColors.neutralGrey70,
                    ),
                    child: Text(
                      '${i + 1}',
                      style: DsText.p2Semi.copyWith(
                        color: i == current || completed.contains(i)
                            ? DsColors.neutralBaseWhite
                            : DsColors.neutralGrey120,
                      ),
                    ),
                  ),
                ),
              ),
            ),
            if (i < steps.length - 1)
              Expanded(
                child: Container(
                  height: 2,
                  color: completed.contains(i)
                      ? DsColors.primaryOrange80
                      : DsColors.neutralGrey70,
                ),
              ),
          ],
        ],
      );
    },
  );
}

enum RibUploadState { idle, uploading, uploaded, error }

/// Platform-independent upload presentation; the app owns file access and I/O.
class RibUpload extends StatelessWidget {
  const RibUpload({
    required this.label,
    required this.requirements,
    required this.onSelect,
    this.state = RibUploadState.idle,
    this.fileName,
    this.errorText,
    this.onRemove,
    super.key,
  });
  final String label, requirements;
  final String? fileName, errorText;
  final RibUploadState state;
  final VoidCallback? onSelect, onRemove;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(DsSpacing.lg),
    decoration: BoxDecoration(
      color: DsColors.surfaceCoolGrey90,
      border: Border.all(
        color: state == RibUploadState.error
            ? DsColors.error100
            : DsColors.surfaceCoolGrey110,
      ),
      borderRadius: BorderRadius.circular(DsRadius.md),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(label, style: DsText.s1Semi),
        const SizedBox(height: DsSpacing.sm),
        Text(requirements, style: DsText.p2Reg),
        if (fileName != null)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: DsSpacing.sm),
            child: Text(fileName!, style: DsText.inputRRegular),
          ),
        if (state == RibUploadState.uploading)
          const LinearProgressIndicator(semanticsLabel: 'Uploading document'),
        if (state == RibUploadState.uploaded) const Text('Document added'),
        if (errorText != null)
          Text(
            errorText!,
            style: DsText.p2Reg.copyWith(color: DsColors.error100),
          ),
        Wrap(
          spacing: DsSpacing.sm,
          children: [
            TextButton.icon(
              onPressed: state == RibUploadState.uploading ? null : onSelect,
              icon: const DsIcon(DsIconData.document),
              label: Text(
                state == RibUploadState.error
                    ? 'Retry / choose file'
                    : 'Choose file',
              ),
            ),
            if (onRemove != null)
              TextButton(
                onPressed: state == RibUploadState.uploading ? null : onRemove,
                child: const Text('Remove'),
              ),
          ],
        ),
      ],
    ),
  );
}
