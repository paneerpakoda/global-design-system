import 'package:flutter/material.dart';
import '../foundations/ds_tokens.dart';

/// A connected, mutually exclusive choice. Use radio groups for longer questions.
class RibSegmentedControl<T> extends StatelessWidget {
  const RibSegmentedControl({
    required this.options,
    required this.value,
    required this.onChanged,
    this.label,
    super.key,
  });
  final Map<T, String> options;
  final T value;
  final ValueChanged<T>? onChanged;
  final String? label;
  @override
  Widget build(BuildContext context) => Semantics(
    label: label,
    container: true,
    child: Material(
      color: DsColors.surfaceCoolGrey100,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(DsRadius.md),
        side: const BorderSide(color: DsColors.surfaceCoolGrey110),
      ),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: const EdgeInsets.all(DsSpacing.xs),
        child: Row(
          children: [
            for (final entry in options.entries)
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: DsSpacing.xxs,
                  ),
                  child: Semantics(
                    selected: entry.key == value,
                    inMutuallyExclusiveGroup: true,
                    button: true,
                    enabled: onChanged != null,
                    label: entry.value,
                    onTap: onChanged == null
                        ? null
                        : () => onChanged!(entry.key),
                    child: ExcludeSemantics(
                      child: Ink(
                        decoration: BoxDecoration(
                          color: entry.key == value
                              ? DsColors.neutralBaseWhite
                              : Colors.transparent,
                          borderRadius: BorderRadius.circular(DsRadius.sm),
                          border: Border.all(
                            color: entry.key == value
                                ? DsColors.surfaceCoolGrey110
                                : Colors.transparent,
                          ),
                        ),
                        child: InkWell(
                          onTap: onChanged == null
                              ? null
                              : () => onChanged!(entry.key),
                          borderRadius: BorderRadius.circular(DsRadius.sm),
                          hoverColor: DsColors.surfaceCoolGrey110,
                          focusColor: DsEffects.ringFocus.color,
                          splashColor: Colors.transparent,
                          child: ConstrainedBox(
                            constraints: const BoxConstraints(minHeight: 40),
                            child: Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: DsSpacing.sm,
                                vertical: DsSpacing.sm,
                              ),
                              child: Center(
                                child: Text(
                                  entry.value,
                                  textAlign: TextAlign.center,
                                  style:
                                      (entry.key == value
                                              ? DsText.h3Semi
                                              : DsText.h3Regular)
                                          .copyWith(
                                            color: onChanged == null
                                                ? DsColors.neutralGrey90
                                                : entry.key == value
                                                ? DsColors.primaryOrange100
                                                : DsColors.neutralGrey120,
                                          ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    ),
  );
}
