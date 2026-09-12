import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';
import 'rib_dropdown.dart';
import 'rib_input_field.dart';

/// A controlled select. Searchable variants edit the trigger itself.
class RibSelectField<T> extends StatefulWidget {
  const RibSelectField({
    required this.label,
    required this.items,
    required this.onChanged,
    this.value,
    this.validator,
    this.enabled = true,
    this.searchable = false,
    this.compact = false,
    this.embedded = false,
    this.leading,
    this.placeholder,
    this.type = RibInputFieldType.labelInline,
    super.key,
  });
  final String label;
  final List<RibDropdownItem<T>> items;
  final T? value;
  final ValueChanged<T>? onChanged;
  final FormFieldValidator<T>? validator;
  final bool enabled, searchable, compact, embedded;
  final Widget? leading;
  final String? placeholder;
  final RibInputFieldType type;
  @override
  State<RibSelectField<T>> createState() => _RibSelectFieldState<T>();
}

class _RibSelectFieldState<T> extends State<RibSelectField<T>> {
  final menu = MenuController();
  final focus = FocusNode();
  final firstOption = FocusNode();
  final text = TextEditingController();
  bool get typeIsInline => widget.type == RibInputFieldType.labelInline;
  String query = '';
  String get selected =>
      widget.items.where((e) => e.value == widget.value).firstOrNull?.label ??
      '';
  @override
  void initState() {
    super.initState();
    text.text = selected;
  }

  @override
  void didUpdateWidget(covariant RibSelectField<T> old) {
    super.didUpdateWidget(old);
    if (old.value != widget.value) {
      text.value = TextEditingValue(
        text: selected,
        selection: TextSelection.collapsed(offset: selected.length),
      );
      query = '';
    }
  }

  @override
  void dispose() {
    focus.dispose();
    firstOption.dispose();
    text.dispose();
    super.dispose();
  }

  void open() {
    if (!menu.isOpen) {
      setState(() => query = '');
      menu.open();
    }
    if (widget.searchable) {
      focus.requestFocus();
      text.selection = TextSelection(
        baseOffset: 0,
        extentOffset: text.text.length,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final enabled = widget.enabled && widget.onChanged != null;
    final outside =
        !widget.compact && widget.type == RibInputFieldType.labelOut;
    final floating = !widget.compact && !widget.embedded && typeIsInline;
    final filtered = widget.items
        .where((e) => e.label.toLowerCase().contains(query.toLowerCase()))
        .toList();
    return FormField<T>(
      key: ValueKey((widget.label, widget.value)),
      initialValue: widget.value,
      validator: widget.validator,
      builder: (field) => Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (outside) ...[
            ExcludeSemantics(
              child: Padding(
                padding: const EdgeInsets.only(left: DsSpacing.xs),
                child: Text(widget.label, style: DsText.h3Semi),
              ),
            ),
            const SizedBox(height: DsSpacing.sm),
          ],
          LayoutBuilder(
            builder: (context, constraints) {
              final width = math.min(
                math.max(constraints.maxWidth, widget.embedded ? 160.0 : 0.0),
                MediaQuery.sizeOf(context).width - 32,
              );
              return MenuAnchor(
                controller: menu,
                childFocusNode: focus,
                crossAxisUnconstrained: false,
                alignmentOffset: const Offset(0, 4),
                onOpen: () {
                  setState(() {});
                  if (!widget.searchable) {
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      if (mounted && menu.isOpen) firstOption.requestFocus();
                    });
                  }
                },
                onClose: () {
                  if (mounted) {
                    setState(() {
                      query = '';
                      text.value = TextEditingValue(
                        text: selected,
                        selection: TextSelection.collapsed(
                          offset: selected.length,
                        ),
                      );
                    });
                  }
                },
                style: MenuStyle(
                  alignment: AlignmentDirectional.bottomStart,
                  minimumSize: WidgetStatePropertyAll(Size(width, 0)),
                  maximumSize: WidgetStatePropertyAll(Size(width, 320)),
                  padding: const WidgetStatePropertyAll(EdgeInsets.zero),
                  backgroundColor: const WidgetStatePropertyAll(
                    DsColors.neutralBaseWhite,
                  ),
                  surfaceTintColor: const WidgetStatePropertyAll(
                    Colors.transparent,
                  ),
                  elevation: const WidgetStatePropertyAll(4),
                  shape: WidgetStatePropertyAll(
                    RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(DsRadius.md),
                    ),
                  ),
                  side: const WidgetStatePropertyAll(
                    BorderSide(color: DsColors.surfaceCoolGrey110),
                  ),
                ),
                menuChildren: [
                  if (filtered.isEmpty)
                    const Padding(
                      padding: EdgeInsets.all(DsSpacing.lg),
                      child: Text('No matching options'),
                    ),
                  for (final item in filtered)
                    MenuItemButton(
                      focusNode: item == filtered.first ? firstOption : null,
                      onPressed: () {
                        field.didChange(item.value);
                        widget.onChanged?.call(item.value);
                        menu.close();
                        if (widget.searchable) focus.unfocus();
                      },
                      style: ButtonStyle(
                        minimumSize: WidgetStatePropertyAll(Size(width, 48)),
                        padding: const WidgetStatePropertyAll(
                          EdgeInsets.symmetric(
                            horizontal: DsSpacing.lg,
                            vertical: DsSpacing.sm,
                          ),
                        ),
                        backgroundColor: WidgetStateProperty.resolveWith(
                          (s) =>
                              s.contains(WidgetState.hovered) ||
                                  s.contains(WidgetState.focused)
                              ? DsColors.neutralGrey60
                              : DsColors.neutralBaseWhite,
                        ),
                      ),
                      trailingIcon: item.value == widget.value
                          ? const DsIcon(
                              DsIconData.tick,
                              size: 18,
                              color: DsColors.primaryOrange100,
                            )
                          : null,
                      child: SizedBox(
                        width: math.max(0, width - 72),
                        child: Text(item.label, style: DsText.inputRRegular),
                      ),
                    ),
                ],
                builder: (context, controller, child) {
                  final border = OutlineInputBorder(
                    borderRadius: BorderRadius.circular(DsRadius.md),
                    borderSide: BorderSide(
                      color: field.hasError
                          ? DsColors.error100
                          : menu.isOpen
                          ? DsColors.primaryOrange100
                          : DsColors.surfaceCoolGrey110,
                    ),
                  );
                  if (widget.searchable) {
                    return Focus(
                      onKeyEvent: (_, event) {
                        if (event is KeyDownEvent &&
                            event.logicalKey == LogicalKeyboardKey.arrowDown) {
                          if (!menu.isOpen) open();
                          firstOption.requestFocus();
                          return KeyEventResult.handled;
                        }
                        if (event is KeyDownEvent &&
                            event.logicalKey == LogicalKeyboardKey.escape) {
                          menu.close();
                          return KeyEventResult.handled;
                        }
                        return KeyEventResult.ignored;
                      },
                      child: Semantics(
                        label: widget.label,
                        expanded: menu.isOpen,
                        child: TextField(
                          controller: text,
                          focusNode: focus,
                          selectAllOnFocus: false,
                          enabled: enabled,
                          onTap: open,
                          onChanged: (v) {
                            setState(() => query = v);
                            if (!menu.isOpen) menu.open();
                          },
                          style: DsText.inputRSemi.copyWith(
                            color: DsColors.neutralGrey140,
                          ),
                          decoration: InputDecoration(
                            label: floating
                                ? ExcludeSemantics(
                                    child: Text(
                                      text.text.isEmpty
                                          ? (widget.placeholder ?? widget.label)
                                          : widget.label,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  )
                                : null,
                            floatingLabelStyle: DsText.inputLRegular.copyWith(
                              color: DsColors.neutralGrey120,
                            ),
                            labelStyle: DsText.inputRRegular.copyWith(
                              color: DsColors.neutralGrey110,
                            ),
                            hint: floating
                                ? null
                                : ExcludeSemantics(
                                    child: Text(
                                      widget.placeholder ?? widget.label,
                                    ),
                                  ),
                            hintStyle: DsText.inputRRegular.copyWith(
                              color: DsColors.neutralGrey110,
                            ),
                            prefixIcon: widget.leading == null
                                ? null
                                : Padding(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: DsSpacing.lg,
                                    ),
                                    child: widget.leading,
                                  ),
                            suffixIcon: ExcludeSemantics(
                              child: DsIcon(
                                menu.isOpen
                                    ? DsIconData.chevronUp
                                    : DsIconData.chevronDown,
                                size: 20,
                              ),
                            ),
                            contentPadding: const EdgeInsets.symmetric(
                              horizontal: DsSpacing.lg,
                              vertical: 14,
                            ),
                            constraints: const BoxConstraints(minHeight: 48),
                            filled: true,
                            fillColor: DsColors.surfaceCoolGrey90,
                            enabledBorder: border,
                            focusedBorder: border,
                            disabledBorder: border,
                          ),
                        ),
                      ),
                    );
                  }
                  final trigger = Semantics(
                    label: widget.label,
                    expanded: menu.isOpen,
                    child: OutlinedButton(
                      focusNode: focus,
                      onPressed: !enabled
                          ? null
                          : () => menu.isOpen ? menu.close() : open(),
                      style:
                          OutlinedButton.styleFrom(
                            minimumSize: Size(0, widget.embedded ? 46 : 48),
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            visualDensity: VisualDensity.standard,
                            padding: EdgeInsets.symmetric(
                              horizontal: widget.embedded
                                  ? DsSpacing.sm
                                  : DsSpacing.lg,
                              vertical: DsSpacing.md,
                            ),
                            foregroundColor: DsColors.neutralGrey140,
                            backgroundColor: widget.embedded
                                ? Colors.transparent
                                : enabled
                                ? DsColors.surfaceCoolGrey90
                                : DsColors.surfaceCoolGrey100,
                            shape: RoundedRectangleBorder(
                              borderRadius: widget.embedded
                                  ? const BorderRadius.horizontal(
                                      left: Radius.circular(DsRadius.md),
                                    )
                                  : BorderRadius.circular(DsRadius.md),
                            ),
                          ).copyWith(
                            side: WidgetStatePropertyAll(
                              widget.embedded
                                  ? BorderSide.none
                                  : border.borderSide,
                            ),
                            overlayColor: WidgetStateProperty.resolveWith(
                              (s) =>
                                  !widget.embedded &&
                                      (s.contains(WidgetState.hovered) ||
                                          s.contains(WidgetState.pressed))
                                  ? Theme.of(
                                          context,
                                        ).inputDecorationTheme.hoverColor ??
                                        Theme.of(context).hoverColor
                                  : Colors.transparent,
                            ),
                          ),
                      child: Row(
                        mainAxisAlignment: widget.embedded
                            ? MainAxisAlignment.center
                            : MainAxisAlignment.start,
                        children: [
                          if (widget.leading != null) ...[
                            widget.leading!,
                            const SizedBox(width: DsSpacing.lg),
                          ],
                          Flexible(
                            fit: widget.embedded
                                ? FlexFit.loose
                                : FlexFit.tight,
                            child: Text(
                              selected.isEmpty
                                  ? (outside
                                        ? 'Select an option'
                                        : (widget.placeholder ?? widget.label))
                                  : selected,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style:
                                  (selected.isEmpty
                                          ? DsText.inputRRegular
                                          : DsText.inputRSemi)
                                      .copyWith(
                                        color: !enabled
                                            ? DsColors.neutralGrey90
                                            : selected.isEmpty
                                            ? DsColors.neutralGrey110
                                            : DsColors.neutralGrey140,
                                      ),
                            ),
                          ),
                          SizedBox(
                            width: widget.embedded
                                ? DsSpacing.xs
                                : DsSpacing.sm,
                          ),
                          DsIcon(
                            menu.isOpen
                                ? DsIconData.chevronUp
                                : DsIconData.chevronDown,
                            size: widget.embedded ? 16 : 20,
                          ),
                        ],
                      ),
                    ),
                  );
                  if (!floating || selected.isEmpty) return trigger;
                  return Stack(
                    clipBehavior: Clip.none,
                    children: [
                      trigger,
                      Positioned(
                        left: 16,
                        top: -8,
                        right: 16,
                        child: ExcludeSemantics(
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Container(
                              color: DsColors.neutralBaseWhite,
                              padding: const EdgeInsets.symmetric(
                                horizontal: DsSpacing.xs,
                              ),
                              child: Text(
                                widget.label,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: DsText.s1Regular.copyWith(
                                  color: DsColors.neutralGrey120,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  );
                },
              );
            },
          ),
          if (field.hasError)
            Padding(
              padding: const EdgeInsets.only(top: DsSpacing.sm),
              child: Text(
                field.errorText!,
                style: DsText.p2Reg.copyWith(color: DsColors.error100),
              ),
            ),
        ],
      ),
    );
  }
}
