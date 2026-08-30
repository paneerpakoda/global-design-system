import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibCardVariant { loan, investment, insurance, offer }

@immutable
class RibCardMetric {
  const RibCardMetric(this.label, this.value);

  final String label;
  final String value;
}

/// Compact product card from the RIB Cards source page 3981:10044.
class RibCard extends StatelessWidget {
  const RibCard({
    required this.title,
    this.variant = RibCardVariant.loan,
    this.identifier,
    this.primaryMetric,
    this.secondaryMetric,
    this.onPrimaryAction,
    this.onSecondaryAction,
    super.key,
  });

  final String title;
  final RibCardVariant variant;
  final String? identifier;
  final RibCardMetric? primaryMetric;
  final RibCardMetric? secondaryMetric;
  final VoidCallback? onPrimaryAction;
  final VoidCallback? onSecondaryAction;

  bool get _isOffer => variant == RibCardVariant.offer;
  bool get _hasFooter => variant != RibCardVariant.investment;

  Size get _size => switch (variant) {
    RibCardVariant.loan => const Size(272, 150),
    RibCardVariant.investment => const Size(290, 130),
    RibCardVariant.insurance => const Size(272, 160),
    RibCardVariant.offer => const Size(288, 160),
  };

  IconData get _icon => switch (variant) {
    RibCardVariant.loan => Icons.school_outlined,
    RibCardVariant.investment => Icons.savings,
    RibCardVariant.insurance => Icons.health_and_safety_outlined,
    RibCardVariant.offer => Icons.currency_rupee,
  };

  @override
  Widget build(BuildContext context) {
    final effect = DsEffects.shadow100;
    final foreground = _isOffer
        ? DsColors.neutralGrey140
        : DsColors.neutralBaseWhite;

    return Semantics(
      container: true,
      label: '$title card',
      child: Container(
        width: _size.width,
        height: _size.height,
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color: _isOffer
              ? DsColors.neutralBaseWhite
              : DsColors.primaryOrange100,
          gradient: variant == RibCardVariant.investment ? DsColors.hero : null,
          border: _isOffer ? Border.all(color: DsColors.pastelAmber90) : null,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: effect.color,
              offset: Offset(effect.offsetX, effect.offsetY),
              blurRadius: effect.radius,
              spreadRadius: effect.spread,
            ),
          ],
        ),
        child: Column(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
                child: _isOffer
                    ? _offerBody(foreground)
                    : _productBody(foreground),
              ),
            ),
            if (_hasFooter) _footer(),
          ],
        ),
      ),
    );
  }

  Widget _productBody(Color foreground) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(_icon, size: 24, color: foreground),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      color: foreground,
                      fontSize: 14,
                      height: 20 / 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (identifier != null)
                    Text(
                      identifier!,
                      style: TextStyle(
                        color: foreground.withValues(alpha: .8),
                        fontSize: 10,
                        height: 1.6,
                      ),
                    ),
                ],
              ),
            ),
          ],
        ),
        const Spacer(),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            if (primaryMetric != null) _metric(primaryMetric!, foreground),
            if (secondaryMetric != null) _metric(secondaryMetric!, foreground),
          ],
        ),
      ],
    );
  }

  Widget _offerBody(Color foreground) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: const BoxDecoration(
            color: DsColors.pastelAmber110,
            shape: BoxShape.circle,
          ),
          child: Icon(_icon, color: DsColors.primaryOrange120),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            title,
            style: TextStyle(
              color: foreground,
              fontSize: 14,
              height: 20 / 14,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  Widget _metric(RibCardMetric metric, Color foreground) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          metric.label,
          style: TextStyle(
            color: foreground.withValues(alpha: .8),
            fontSize: 10,
          ),
        ),
        Text(
          metric.value,
          style: TextStyle(
            color: foreground,
            fontSize: 14,
            height: 20 / 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _footer() {
    return Container(
      height: 44,
      decoration: BoxDecoration(
        color: _isOffer ? null : const Color(0x33000000),
        gradient: _isOffer ? DsColors.hero : null,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: _isOffer
          ? Align(
              alignment: Alignment.centerRight,
              child: TextButton.icon(
                onPressed: onPrimaryAction,
                icon: const Icon(Icons.chevron_right, size: 14),
                label: const Text('Get started'),
                style: _footerActionStyle(),
              ),
            )
          : Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton.icon(
                  onPressed: onPrimaryAction,
                  icon: const Icon(Icons.download_outlined, size: 14),
                  label: const Text('Statement'),
                  style: _footerActionStyle(),
                ),
                TextButton(
                  onPressed: onSecondaryAction,
                  style: _footerActionStyle(),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('See details'),
                      SizedBox(width: 4),
                      Icon(Icons.chevron_right, size: 14),
                    ],
                  ),
                ),
              ],
            ),
    );
  }

  ButtonStyle _footerActionStyle() {
    return TextButton.styleFrom(
      foregroundColor: DsColors.neutralBaseWhite,
      textStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600),
      padding: const EdgeInsets.symmetric(horizontal: 2),
      minimumSize: const Size(0, 36),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    );
  }
}
