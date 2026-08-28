import 'package:flutter/material.dart';

import 'ds_tokens.dart';

class RibBreadcrumbItem {
  const RibBreadcrumbItem({required this.label, this.onTap});

  final String label;
  final VoidCallback? onTap;
}

/// The one-to-three level RIB Breadcrumb defined at Figma node 1415:737.
class RibBreadcrumb extends StatelessWidget {
  const RibBreadcrumb({
    required this.items,
    required this.title,
    this.web = true,
    this.showDropdown,
    this.onBack,
    this.onTitleTap,
    this.backIcon,
    this.dropdownIcon,
    this.separatorIcon,
    super.key,
  }) : assert(items.length > 0 && items.length <= 3);

  final List<RibBreadcrumbItem> items;
  final String title;
  final bool web;
  final bool? showDropdown;
  final VoidCallback? onBack;
  final VoidCallback? onTitleTap;
  final Widget? backIcon;
  final Widget? dropdownIcon;
  final Widget? separatorIcon;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: 'Breadcrumb',
      child: LayoutBuilder(
        builder: (context, constraints) {
          final width =
              constraints.hasBoundedWidth && constraints.maxWidth < 472
              ? constraints.maxWidth
              : 472.0;
          return SizedBox(
            width: width,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (web) ...[
                  _buildPath(),
                  const SizedBox(height: DsSpacing.sm),
                ],
                _buildTitleRow(),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildPath() {
    return SizedBox(
      height: 16,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var index = 0; index < items.length; index++) ...[
              _buildItem(items[index], current: index == items.length - 1),
              if (index < items.length - 1) ...[
                const SizedBox(width: 2),
                SizedBox.square(
                  dimension: 12,
                  child:
                      separatorIcon ??
                      const Icon(
                        Icons.chevron_right_rounded,
                        size: 12,
                        color: DsColors.neutralGrey120,
                      ),
                ),
                const SizedBox(width: 2),
              ],
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildItem(RibBreadcrumbItem item, {required bool current}) {
    final label = Text(
      item.label,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      style: DsText.p3Reg.copyWith(color: DsColors.neutralGrey120),
    );

    if (current || item.onTap == null) {
      return Semantics(
        label: current ? '${item.label}, current page' : item.label,
        child: ExcludeSemantics(child: label),
      );
    }

    return TextButton(
      onPressed: item.onTap,
      style: TextButton.styleFrom(
        minimumSize: Size.zero,
        padding: EdgeInsets.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        foregroundColor: DsColors.neutralGrey120,
        textStyle: DsText.p3Reg,
      ),
      child: label,
    );
  }

  Widget _buildTitleRow() {
    final resolvedShowDropdown = showDropdown ?? items.length < 3;
    return SizedBox(
      height: 24,
      child: Row(
        children: [
          SizedBox.square(
            dimension: 24,
            child: IconButton(
              onPressed: onBack,
              tooltip: 'Back',
              padding: EdgeInsets.zero,
              constraints: const BoxConstraints.tightFor(width: 24, height: 24),
              icon:
                  backIcon ??
                  const Icon(
                    Icons.chevron_left_rounded,
                    size: 16,
                    color: DsColors.neutralGrey140,
                  ),
            ),
          ),
          const SizedBox(width: DsSpacing.sm),
          Flexible(
            child: resolvedShowDropdown ? _buildTitleAction() : _buildTitle(),
          ),
        ],
      ),
    );
  }

  Widget _buildTitleAction() {
    return TextButton(
      onPressed: onTitleTap,
      style: TextButton.styleFrom(
        minimumSize: Size.zero,
        padding: EdgeInsets.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        foregroundColor: DsColors.neutralGrey140,
        disabledForegroundColor: DsColors.neutralGrey140,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Flexible(child: _buildTitle()),
          const SizedBox(width: DsSpacing.sm),
          SizedBox.square(
            dimension: 16,
            child:
                dropdownIcon ??
                const Icon(
                  Icons.keyboard_arrow_down_rounded,
                  size: 16,
                  color: DsColors.neutralGrey140,
                ),
          ),
        ],
      ),
    );
  }

  Widget _buildTitle() {
    return Text(
      title,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      style: DsText.h2Bold.copyWith(color: DsColors.neutralGrey140),
    );
  }
}
