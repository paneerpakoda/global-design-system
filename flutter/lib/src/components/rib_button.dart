import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

enum RibButtonVariant {
  primary,
  outline,
  secondary,
  pastel,
  white,
  destructiveOutline,
  destructiveFilled,
}

enum RibButtonSize { large, small, xSmall }

/// The RIB Button component defined on Figma page 8:2.
class RibButton extends StatefulWidget {
  const RibButton({
    required this.label,
    this.variant = RibButtonVariant.primary,
    this.size = RibButtonSize.large,
    this.leadingIcon,
    this.trailingIcon,
    this.expanded = false,
    this.onPressed,
    super.key,
  })  : assert(
          leadingIcon == null || trailingIcon == null,
          'RIB Button supports one icon position at a time.',
        ),
        assert(
          variant != RibButtonVariant.secondary || size == RibButtonSize.small,
          'The RIB Secondary button is available in Small only.',
        );

  final String label;
  final RibButtonVariant variant;
  final RibButtonSize size;
  final Widget? leadingIcon;
  final Widget? trailingIcon;
  final bool expanded;
  final VoidCallback? onPressed;

  @override
  State<RibButton> createState() => _RibButtonState();
}

class _RibButtonState extends State<RibButton> {
  bool _hovered = false;
  bool _focused = false;
  bool _pressed = false;

  bool get _enabled => widget.onPressed != null;

  @override
  Widget build(BuildContext context) {
    final visual = _resolveVisual();
    final secondary = widget.variant == RibButtonVariant.secondary;
    final radius = widget.size == RibButtonSize.xSmall ? 8.0 : 12.0;
    final height = secondary
        ? 16.0
        : switch (widget.size) {
            RibButtonSize.large => 44.0,
            RibButtonSize.small => 36.0,
            RibButtonSize.xSmall => 28.0,
          };
    final minimumWidth =
        secondary || widget.size == RibButtonSize.xSmall ? 0.0 : 120.0;
    final borderWidth = _borderWidth(secondary);
    final button = Semantics(
      button: true,
      enabled: _enabled,
      label: widget.label,
      child: ExcludeSemantics(
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: visual.borderColor,
            gradient: visual.borderGradient,
            borderRadius: BorderRadius.circular(radius),
            boxShadow: visual.shadows,
          ),
          child: Padding(
            padding: EdgeInsets.all(borderWidth),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: visual.surfaceColor,
                gradient: visual.fillGradient,
                borderRadius: BorderRadius.circular(radius - borderWidth),
              ),
              child: Material(
                type: MaterialType.transparency,
                child: InkWell(
                  onTap: widget.onPressed,
                  onHover: _setHovered,
                  onFocusChange: _setFocused,
                  onHighlightChanged: _setPressed,
                  borderRadius: BorderRadius.circular(radius - borderWidth),
                  hoverColor: Colors.transparent,
                  focusColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  splashColor: Colors.transparent,
                  child: SizedBox(
                    height: height - (borderWidth * 2),
                    child: Padding(
                      padding: _contentPadding(secondary, borderWidth),
                      child: _buildContent(visual.contentColor, secondary),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: minimumWidth,
        maxWidth: widget.expanded ? double.infinity : double.maxFinite,
      ),
      child: widget.expanded
          ? SizedBox(width: double.infinity, child: button)
          : button,
    );
  }

  Widget _buildContent(Color color, bool secondary) {
    final iconSize = secondary ? 14.0 : 16.0;
    final textStyle = (widget.size == RibButtonSize.large
            ? DsText.buttonLarge
            : DsText.buttonSmall)
        .copyWith(color: color);
    final children = <Widget>[];

    if (widget.leadingIcon != null) {
      children.add(_icon(widget.leadingIcon!, iconSize, color));
      children.add(const SizedBox(width: DsSpacing.xs));
    }
    children.add(
      Flexible(
        child: Text(
          widget.label,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: textStyle,
        ),
      ),
    );
    if (widget.trailingIcon != null) {
      children.add(const SizedBox(width: DsSpacing.xs));
      children.add(_icon(widget.trailingIcon!, iconSize, color));
    }

    return Row(
      mainAxisSize: widget.expanded ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: children,
    );
  }

  Widget _icon(Widget icon, double size, Color color) {
    return IconTheme(
      data: IconThemeData(size: size, color: color),
      child: SizedBox.square(
        dimension: size,
        child: FittedBox(child: icon),
      ),
    );
  }

  EdgeInsets _contentPadding(bool secondary, double borderWidth) {
    if (secondary) return EdgeInsets.zero;
    if (widget.leadingIcon != null) {
      return EdgeInsets.only(
        left: DsSpacing.sm - borderWidth,
        right: DsSpacing.md - borderWidth,
      );
    }
    if (widget.trailingIcon != null) {
      return EdgeInsets.only(
        left: DsSpacing.md - borderWidth,
        right: DsSpacing.sm - borderWidth,
      );
    }
    final horizontal = widget.size == RibButtonSize.xSmall ? 8.0 : 12.0;
    return EdgeInsets.symmetric(horizontal: horizontal - borderWidth);
  }

  double _borderWidth(bool secondary) {
    if (secondary) return 0;
    if (widget.variant == RibButtonVariant.destructiveFilled) return 0;
    return DsColors.buttonStrokeWidth;
  }

  _RibButtonVisual _resolveVisual() {
    final focused = _enabled && _focused;
    final hovered = _enabled && (_hovered || _pressed) && !focused;
    final disabled = !_enabled;

    switch (widget.variant) {
      case RibButtonVariant.primary:
        return _RibButtonVisual(
          surfaceColor: disabled
              ? DsColors.neutralGrey70
              : hovered
                  ? DsColors.primaryOrange110
                  : DsColors.primaryOrange100,
          contentColor:
              disabled ? DsColors.neutralGrey110 : DsColors.neutralBaseWhite,
          borderColor: disabled
              ? DsColors.neutralGrey70
              : hovered
                  ? DsColors.primaryOrange110
                  : Colors.transparent,
          borderGradient: disabled || hovered ? null : DsColors.buttonStroke,
          fillGradient: disabled || hovered ? null : DsColors.buttonPrimaryFill,
          shadows: focused ? [_boxShadow(DsEffects.ringFocus)] : const [],
        );
      case RibButtonVariant.outline:
        return _RibButtonVisual(
          surfaceColor:
              hovered ? DsColors.primaryOrange100 : DsColors.neutralBaseWhite,
          contentColor: disabled
              ? DsColors.neutralGrey110
              : hovered
                  ? DsColors.neutralBaseWhite
                  : DsColors.primaryOrange100,
          borderColor:
              disabled ? DsColors.neutralGrey70 : DsColors.primaryOrange100,
          shadows: focused ? [_boxShadow(DsEffects.ringFocus)] : const [],
        );
      case RibButtonVariant.secondary:
        return _RibButtonVisual(
          surfaceColor: Colors.transparent,
          contentColor: disabled
              ? DsColors.neutralGrey110
              : hovered || focused
                  ? DsColors.primaryOrange110
                  : DsColors.primaryOrange100,
        );
      case RibButtonVariant.pastel:
        return _RibButtonVisual(
          surfaceColor: disabled
              ? DsColors.neutralGrey70
              : hovered
                  ? DsColors.pastelAmber100
                  : DsColors.pastelAmber90,
          contentColor: disabled
              ? DsColors.neutralGrey110
              : hovered
                  ? DsColors.primaryOrange110
                  : DsColors.primaryOrange100,
          borderColor: disabled ? DsColors.neutralGrey70 : Colors.transparent,
          borderGradient: disabled ? null : DsColors.buttonStroke,
          shadows: focused ? [_boxShadow(DsEffects.ringFocus)] : const [],
        );
      case RibButtonVariant.white:
        return _RibButtonVisual(
          surfaceColor: focused
              ? DsColors.surfaceCoolGrey90
              : hovered
                  ? DsColors.surfaceCoolGrey110
                  : DsColors.neutralBaseWhite,
          contentColor: disabled
              ? DsColors.neutralGrey110
              : hovered
                  ? DsColors.neutralGrey140
                  : DsColors.neutralGrey130,
          borderColor: disabled
              ? DsColors.neutralGrey70
              : focused
                  ? DsColors.pastelBlue90
                  : DsColors.surfaceCoolGrey110,
          shadows: focused
              ? [
                  BoxShadow(
                    color: DsColors.pastelBlue90.withValues(alpha: .8),
                    spreadRadius: DsEffects.ringFocus.spread,
                  ),
                ]
              : disabled
                  ? const []
                  : [_boxShadow(DsEffects.shadowButtonWhite)],
        );
      case RibButtonVariant.destructiveOutline:
        return _RibButtonVisual(
          surfaceColor: hovered ? DsColors.error100 : DsColors.neutralBaseWhite,
          contentColor: disabled
              ? DsColors.error90
              : hovered
                  ? DsColors.neutralBaseWhite
                  : DsColors.error100,
          borderColor: disabled ? DsColors.pastelPeach120 : DsColors.error100,
          shadows: focused
              ? [
                  BoxShadow(
                    color: DsColors.pastelPeach120,
                    spreadRadius: DsEffects.ringFocus.spread,
                  ),
                ]
              : const [],
        );
      case RibButtonVariant.destructiveFilled:
        return _RibButtonVisual(
          surfaceColor: disabled
              ? DsColors.pastelPeach110
              : hovered
                  ? DsColors.error110
                  : DsColors.error100,
          contentColor: disabled ? DsColors.error90 : DsColors.neutralBaseWhite,
          shadows: focused
              ? [
                  BoxShadow(
                    color: DsColors.pastelPeach120,
                    spreadRadius: DsEffects.ringFocus.spread,
                  ),
                ]
              : const [],
        );
    }
  }

  void _setHovered(bool value) {
    if (_hovered != value) setState(() => _hovered = value);
  }

  void _setFocused(bool value) {
    if (_focused != value) setState(() => _focused = value);
  }

  void _setPressed(bool value) {
    if (_pressed != value) setState(() => _pressed = value);
  }
}

class _RibButtonVisual {
  const _RibButtonVisual({
    required this.surfaceColor,
    required this.contentColor,
    this.borderColor = Colors.transparent,
    this.borderGradient,
    this.fillGradient,
    this.shadows = const [],
  });

  final Color surfaceColor;
  final Color contentColor;
  final Color borderColor;
  final Gradient? borderGradient;
  final Gradient? fillGradient;
  final List<BoxShadow> shadows;
}

BoxShadow _boxShadow(DsEffectToken token) {
  return BoxShadow(
    color: token.color,
    offset: Offset(token.offsetX, token.offsetY),
    blurRadius: token.radius,
    spreadRadius: token.spread,
  );
}
