import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';
import 'rib_calendar.dart';
import 'rib_input_field.dart';

class RibDateField extends StatefulWidget {
  const RibDateField({
    required this.label,
    required this.onChanged,
    this.value,
    this.firstDate,
    this.lastDate,
    this.validator,
    this.icon,
    this.placeholder,
    this.helper,
    this.errorText,
    this.enabled = true,
    this.readOnly = false,
    this.type = RibInputFieldType.labelOut,
    super.key,
  });
  final String label;
  final String? placeholder, helper, errorText;
  final bool enabled, readOnly;
  final RibInputFieldType type;
  final Widget? icon;
  final DateTime? value, firstDate, lastDate;
  final ValueChanged<DateTime> onChanged;
  final FormFieldValidator<String>? validator;
  static String format(DateTime date) =>
      '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  @override
  State<RibDateField> createState() => _RibDateFieldState();
}

class _RibDateFieldState extends State<RibDateField> {
  final menu = MenuController();
  final focus = FocusNode();
  late DateTime month = widget.value ?? DateTime.now();
  RibCalendarMode mode = RibCalendarMode.date;
  @override
  void dispose() {
    focus.dispose();
    super.dispose();
  }

  void changeMonth(DateTime next) {
    setState(() {
      month = next;
      if (widget.firstDate != null &&
          month.isBefore(
            DateTime(widget.firstDate!.year, widget.firstDate!.month),
          )) {
        month = widget.firstDate!;
      }
      if (widget.lastDate != null &&
          month.isAfter(
            DateTime(widget.lastDate!.year, widget.lastDate!.month),
          )) {
        month = widget.lastDate!;
      }
      mode = RibCalendarMode.date;
    });
  }

  void open() {
    if (!widget.enabled || widget.readOnly) return;
    if (menu.isOpen) {
      menu.close();
      return;
    }
    changeMonth(widget.value ?? DateTime.now());
    menu.open();
  }

  @override
  Widget build(BuildContext context) => MenuAnchor(
    controller: menu,
    childFocusNode: focus,
    // Align the 258px calendar’s right edge to the icon side of the input.
    alignmentOffset: const Offset(-258, 4),
    style: const MenuStyle(
      alignment: AlignmentDirectional.bottomEnd,
      padding: WidgetStatePropertyAll(EdgeInsets.zero),
      backgroundColor: WidgetStatePropertyAll(DsColors.neutralBaseWhite),
      surfaceTintColor: WidgetStatePropertyAll(Colors.transparent),
    ),
    menuChildren: [
      FocusTraversalGroup(
        child: RibCalendar(
          month: month,
          mode: mode,
          selectedDate: widget.value,
          firstDate: widget.firstDate,
          lastDate: widget.lastDate,
          onModeChanged: (v) => setState(() => mode = v),
          onMonthChanged: changeMonth,
          onPreviousMonth:
              widget.firstDate != null &&
                  !DateTime(month.year, month.month).isAfter(
                    DateTime(widget.firstDate!.year, widget.firstDate!.month),
                  )
              ? null
              : () => changeMonth(DateTime(month.year, month.month - 1)),
          onNextMonth:
              widget.lastDate != null &&
                  !DateTime(month.year, month.month).isBefore(
                    DateTime(widget.lastDate!.year, widget.lastDate!.month),
                  )
              ? null
              : () => changeMonth(DateTime(month.year, month.month + 1)),
          onDateSelected: (date) {
            menu.close();
            widget.onChanged(date);
            focus.requestFocus();
          },
        ),
      ),
    ],
    builder: (context, _, child) => Focus(
      onKeyEvent: (_, e) {
        if (e is KeyDownEvent && e.logicalKey == LogicalKeyboardKey.escape) {
          menu.close();
          return KeyEventResult.handled;
        }
        if (e is KeyDownEvent && e.logicalKey == LogicalKeyboardKey.arrowDown) {
          open();
          return KeyEventResult.handled;
        }
        return KeyEventResult.ignored;
      },
      child: RibInputField(
        key: ValueKey((widget.label, widget.value)),
        label: widget.label,
        type: widget.type,
        placeholder: widget.placeholder,
        helper: widget.helper,
        errorText: widget.errorText,
        enabled: widget.enabled,
        width: double.infinity,
        focusNode: focus,
        initialValue: widget.value == null
            ? ''
            : RibDateField.format(widget.value!),
        readOnly: true,
        validator: widget.validator,
        onTap: widget.enabled && !widget.readOnly ? open : null,
        trailing: Semantics(
          label: 'Choose ${widget.label}',
          enabled: widget.enabled && !widget.readOnly,
          button: true,
          onTap: widget.enabled && !widget.readOnly ? open : null,
          child: ExcludeSemantics(
            child: IconButton(
              onPressed: widget.enabled && !widget.readOnly ? open : null,
              style: const ButtonStyle(
                overlayColor: WidgetStatePropertyAll(Colors.transparent),
              ),
              icon:
                  widget.icon ??
                  DsIcon(
                    DsIconData.calendar,
                    color: widget.enabled
                        ? DsColors.primaryOrange100
                        : DsColors.neutralGrey90,
                  ),
            ),
          ),
        ),
      ),
    ),
  );
}
