import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

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
    this.badge,
    this.primaryMetric,
    this.secondaryMetric,
    this.onPrimaryAction,
    this.onSecondaryAction,
    super.key,
  });

  final String title;
  final RibCardVariant variant;
  final String? identifier;
  final String? badge;
  final RibCardMetric? primaryMetric;
  final RibCardMetric? secondaryMetric;
  final VoidCallback? onPrimaryAction;
  final VoidCallback? onSecondaryAction;

  bool get _isOffer => variant == RibCardVariant.offer;
  bool get _hasFooter => variant != RibCardVariant.investment;

  EdgeInsets get _bodyPadding => switch (variant) {
        RibCardVariant.investment => const EdgeInsets.fromLTRB(
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.md,
          ),
        RibCardVariant.offer => const EdgeInsets.fromLTRB(
            DsSpacing.lg,
            DsSpacing.md + DsSpacing.xxs,
            DsSpacing.lg,
            DsSpacing.md,
          ),
        _ => const EdgeInsets.fromLTRB(
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.lg,
            DsSpacing.sm,
          ),
      };

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
    final foreground =
        _isOffer ? DsColors.neutralGrey140 : DsColors.neutralBaseWhite;

    return Semantics(
      container: true,
      label: '$title card',
      child: Container(
        width: _size.width,
        height: _size.height,
        clipBehavior: Clip.antiAlias,
        decoration: BoxDecoration(
          color:
              _isOffer ? DsColors.neutralBaseWhite : DsColors.primaryOrange100,
          gradient:
              variant == RibCardVariant.investment ? DsColors.cardHero : null,
          border: _isOffer ? Border.all(color: DsColors.pastelAmber90) : null,
          borderRadius: BorderRadius.circular(DsRadius.md),
          boxShadow: [
            BoxShadow(
              color: effect.color,
              offset: Offset(effect.offsetX, effect.offsetY),
              blurRadius: effect.radius,
              spreadRadius: effect.spread,
            ),
          ],
        ),
        child: Stack(
          children: [
            if (variant == RibCardVariant.investment)
              Positioned(
                left: 0,
                right: 0,
                top: 66,
                height: 64,
                child: ColoredBox(
                  color: DsColors.primaryOrange100.withValues(alpha: .1),
                ),
              ),
            Column(
              children: [
                Expanded(
                  child: Padding(
                    padding: _bodyPadding,
                    child: _isOffer
                        ? _offerBody(foreground)
                        : _productBody(foreground),
                  ),
                ),
                if (_hasFooter) _footer(),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _productBody(Color foreground) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(_icon, size: 20, color: foreground),
                const SizedBox(width: DsSpacing.sm),
                Expanded(
                  child: Text(
                    title,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: DsText.h3Semi.copyWith(
                      color: foreground,
                      letterSpacing: 0,
                    ),
                  ),
                ),
                if (badge != null) ...[
                  const SizedBox(width: DsSpacing.sm),
                  _badge(foreground),
                ],
              ],
            ),
            if (identifier != null)
              Padding(
                padding: const EdgeInsets.only(top: DsSpacing.xxs),
                child: Text(
                  identifier!,
                  style: DsText.p3Reg.copyWith(
                    color: foreground.withValues(alpha: .9),
                  ),
                ),
              ),
          ],
        ),
        const Spacer(),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: primaryMetric == null
                  ? const SizedBox.shrink()
                  : _metric(primaryMetric!, foreground),
            ),
            const SizedBox(width: DsSpacing.sm),
            Expanded(
              child: secondaryMetric == null
                  ? const SizedBox.shrink()
                  : _metric(secondaryMetric!, foreground, alignEnd: true),
            ),
          ],
        ),
      ],
    );
  }

  Widget _badge(Color foreground) {
    return Container(
      height: 20,
      alignment: Alignment.center,
      padding: const EdgeInsets.symmetric(horizontal: DsSpacing.sm),
      decoration: BoxDecoration(
        color: foreground.withValues(alpha: .2),
        borderRadius: BorderRadius.circular(DsRadius.xs),
      ),
      child: Text(
        badge!,
        style: DsText.p3Semi.copyWith(color: foreground, height: 1.2),
      ),
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
        const SizedBox(width: DsSpacing.md),
        Expanded(
          child: Text(title, style: DsText.h3Semi.copyWith(color: foreground)),
        ),
      ],
    );
  }

  Widget _metric(
    RibCardMetric metric,
    Color foreground, {
    bool alignEnd = false,
  }) {
    return Column(
      crossAxisAlignment:
          alignEnd ? CrossAxisAlignment.end : CrossAxisAlignment.start,
      children: [
        Text(
          metric.label,
          textAlign: alignEnd ? TextAlign.right : TextAlign.left,
          style: DsText.p3Reg.copyWith(color: foreground.withValues(alpha: .8)),
        ),
        Text(
          metric.value,
          textAlign: alignEnd ? TextAlign.right : TextAlign.left,
          maxLines: 1,
          style: DsText.h3Semi.copyWith(color: foreground),
        ),
      ],
    );
  }

  Widget _footer() {
    return Container(
      height: 44,
      decoration: BoxDecoration(
        color:
            _isOffer ? null : DsColors.primaryMaroon100.withValues(alpha: .2),
        gradient: _isOffer ? DsColors.hero : null,
      ),
      padding: const EdgeInsets.symmetric(horizontal: DsSpacing.xl2),
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
          : Stack(
              alignment: Alignment.center,
              children: [
                VerticalDivider(
                  width: 1,
                  thickness: 1,
                  indent: DsSpacing.sm,
                  endIndent: DsSpacing.sm,
                  color: DsColors.neutralBaseWhite.withValues(alpha: .2),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton.icon(
                      onPressed: onPrimaryAction,
                      icon: const Icon(Icons.download_outlined, size: 20),
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
                          SizedBox(width: DsSpacing.xxs),
                          Icon(Icons.chevron_right, size: 20),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
    );
  }

  ButtonStyle _footerActionStyle() {
    return TextButton.styleFrom(
      foregroundColor: DsColors.neutralBaseWhite,
      textStyle: DsText.s1Semi,
      padding: EdgeInsets.zero,
      minimumSize: const Size(0, 36),
      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    );
  }
}
