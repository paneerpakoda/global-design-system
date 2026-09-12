export 'rib_otp_field.dart';
export 'rib_segmented_control.dart';
export 'rib_upload.dart';
// Radio's groupValue/onChanged keep this package compatible with Flutter 3.27.
// ignore_for_file: deprecated_member_use
import 'package:flutter/material.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';

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

enum RibStepperVariant { adaptive, horizontal, vertical, compact }

/// Progress for complete journeys. Completed stages can be revisited.
class RibStepper extends StatelessWidget {
  const RibStepper({
    required this.steps,
    required this.currentIndex,
    this.completed = const {},
    this.showLabels = false,
    this.completedIcon,
    this.onStepSelected,
    this.variant = RibStepperVariant.adaptive,
    this.descriptions,
    this.errorIndex,
    super.key,
  }) : assert(steps.length > 0),
       assert(descriptions == null || descriptions.length == steps.length);
  final List<String> steps;
  final int currentIndex;
  final Set<int> completed;
  final bool showLabels;
  final Widget? completedIcon;
  final ValueChanged<int>? onStepSelected;
  final RibStepperVariant variant;
  final List<String>? descriptions;
  final int? errorIndex;
  int get current => completed.length == steps.length
      ? -1
      : currentIndex.clamp(0, steps.length - 1);
  String status(int i) => errorIndex == i
      ? 'error'
      : completed.contains(i)
      ? 'completed'
      : current == i
      ? 'current'
      : 'upcoming';
  Color colour(int i) => errorIndex == i
      ? DsColors.error100
      : current == i
      ? DsColors.primaryOrange100
      : DsColors.neutralGrey120;
  Widget marker(int i) => Container(
    width: 32,
    height: 32,
    alignment: Alignment.center,
    decoration: BoxDecoration(
      shape: BoxShape.circle,
      color: current == i ? colour(i) : DsColors.neutralBaseWhite,
      border: Border.all(
        color: completed.contains(i)
            ? DsColors.neutralGrey120
            : current == i || errorIndex == i
            ? colour(i)
            : DsColors.surfaceCoolGrey110,
      ),
    ),
    child: errorIndex == i
        ? DsIcon(
            DsIconData.error,
            size: 20,
            color: current == i ? DsColors.neutralBaseWhite : DsColors.error100,
          )
        : completed.contains(i)
        ? completedIcon ??
              const DsIcon(
                DsIconData.tick,
                size: 16,
                color: DsColors.neutralGrey120,
              )
        : Text(
            '${i + 1}',
            style: DsText.h3Semi.copyWith(
              color: current == i
                  ? DsColors.neutralBaseWhite
                  : DsColors.neutralGrey120,
            ),
          ),
  );
  Widget target(int i, Widget child) {
    final action =
        onStepSelected != null && (completed.contains(i) || current == i)
        ? () => onStepSelected!(i)
        : null;
    return Semantics(
      label: 'Step ${i + 1} of ${steps.length}: ${steps[i]}, ${status(i)}',
      selected: current == i,
      button: action != null,
      onTap: action,
      child: ExcludeSemantics(
        child: InkWell(
          onTap: action,
          borderRadius: BorderRadius.circular(DsRadius.sm),
          hoverColor: DsColors.surfaceCoolGrey100,
          focusColor: DsEffects.ringFocus.color,
          child: child,
        ),
      ),
    );
  }

  Widget label(int i) => Column(
    mainAxisSize: MainAxisSize.min,
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(steps[i], style: DsText.h3Semi.copyWith(color: colour(i))),
      if (descriptions != null) ...[
        const SizedBox(height: DsSpacing.xs),
        Text(
          descriptions![i],
          style: DsText.p1Reg.copyWith(color: DsColors.neutralGrey120),
        ),
      ],
      if (errorIndex == i)
        Text(
          'Action required',
          style: DsText.p1Reg.copyWith(color: DsColors.error100),
        ),
    ],
  );
  @override
  Widget build(BuildContext context) => LayoutBuilder(
    builder: (context, constraints) {
      if (variant == RibStepperVariant.adaptive && showLabels) {
        return _RibLegacyStepper(
          steps: steps,
          currentIndex: currentIndex,
          completed: completed,
          showLabels: true,
          completedIcon: completedIcon,
          onStepSelected: onStepSelected,
          errorIndex: errorIndex,
        );
      }
      final display = variant == RibStepperVariant.adaptive
          ? (constraints.maxWidth < 600
                ? RibStepperVariant.compact
                : RibStepperVariant.horizontal)
          : variant;
      if (display == RibStepperVariant.compact) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              current < 0
                  ? 'All steps complete'
                  : 'Step ${current + 1} of ${steps.length} · ${steps[current]}',
              style: DsText.h3Semi,
            ),
            const SizedBox(height: DsSpacing.sm),
            LinearProgressIndicator(
              value: current < 0 ? 1 : (current + 1) / steps.length,
              color: errorIndex == current
                  ? DsColors.error100
                  : DsColors.primaryOrange100,
              backgroundColor: DsColors.surfaceCoolGrey110,
              semanticsLabel: 'Application progress',
            ),
            if (errorIndex == current)
              Padding(
                padding: const EdgeInsets.only(top: DsSpacing.sm),
                child: Text(
                  'Action required',
                  style: DsText.p1Reg.copyWith(color: DsColors.error100),
                ),
              ),
          ],
        );
      }
      if (display == RibStepperVariant.vertical) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < steps.length; i++) ...[
              target(
                i,
                Padding(
                  padding: const EdgeInsets.all(DsSpacing.sm),
                  child: Row(
                    children: [
                      marker(i),
                      const SizedBox(width: DsSpacing.md),
                      Expanded(child: label(i)),
                    ],
                  ),
                ),
              ),
              if (i < steps.length - 1)
                Align(
                  alignment: Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(left: DsSpacing.xl2),
                    width: 1,
                    height: 20,
                    color: DsColors.surfaceCoolGrey110,
                  ),
                ),
            ],
          ],
        );
      }
      return Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (var i = 0; i < steps.length; i++)
            Expanded(
              child: target(
                i,
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: DsSpacing.sm),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Container(
                              height: 1,
                              color: i == 0
                                  ? Colors.transparent
                                  : DsColors.surfaceCoolGrey110,
                            ),
                          ),
                          marker(i),
                          Expanded(
                            child: Container(
                              height: 1,
                              color: i == steps.length - 1
                                  ? Colors.transparent
                                  : DsColors.surfaceCoolGrey110,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: DsSpacing.sm),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: DsSpacing.xs,
                        ),
                        child: label(i),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      );
    },
  );
}

class _RibLegacyStepper extends StatelessWidget {
  const _RibLegacyStepper({
    required this.steps,
    required this.currentIndex,
    this.completed = const {},
    this.showLabels = false,
    this.completedIcon,
    this.onStepSelected,
    this.errorIndex,
  }) : assert(steps.length > 0);
  final int? errorIndex;
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
      final current = completed.length == steps.length
          ? -1
          : currentIndex.clamp(0, steps.length - 1);
      if (showLabels) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var i = 0; i < steps.length; i++) ...[
              Flexible(
                child: Semantics(
                  label:
                      'Step ${i + 1} of ${steps.length}: ${steps[i]}, ${errorIndex == i
                          ? 'error'
                          : completed.contains(i)
                          ? 'completed'
                          : i == current
                          ? 'current'
                          : 'upcoming'}',
                  selected: i == current,
                  excludeSemantics: true,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(DsRadius.sm),
                    hoverColor: DsColors.surfaceCoolGrey100,
                    splashColor: Colors.transparent,
                    onTap:
                        onStepSelected != null &&
                            (completed.contains(i) || i == current)
                        ? () => onStepSelected!(i)
                        : null,
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(minHeight: 44),
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
                                color: errorIndex == i
                                    ? DsColors.error100
                                    : i == current
                                    ? DsColors.primaryOrange100
                                    : DsColors.surfaceCoolGrey110,
                              ),
                              color: i == current
                                  ? (errorIndex == i
                                        ? DsColors.error100
                                        : DsColors.primaryOrange100)
                                  : DsColors.neutralBaseWhite,
                            ),
                            child: errorIndex == i
                                ? DsIcon(
                                    DsIconData.error,
                                    size: 16,
                                    color: i == current
                                        ? DsColors.neutralBaseWhite
                                        : DsColors.error100,
                                  )
                                : completed.contains(i)
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
                                    (i == current
                                            ? DsText.s1Bold
                                            : DsText.p1Semi)
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
      return const SizedBox.shrink();
    },
  );
}
