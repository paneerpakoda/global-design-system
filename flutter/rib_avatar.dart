import 'package:flutter/material.dart';

import 'ds_tokens.dart';

enum RibAvatarColor { picture, orange, blue, gold, maroon, multi }

class RibAvatarData {
  const RibAvatarData({
    required this.label,
    this.color = RibAvatarColor.picture,
    this.initials,
    this.image,
    this.bankLogo,
  }) : assert(
         color != RibAvatarColor.picture || image != null,
         'Picture avatars require an image.',
       );

  final String label;
  final RibAvatarColor color;
  final String? initials;
  final ImageProvider<Object>? image;
  final Widget? bankLogo;
}

/// A labelled 40px RIB avatar based on Figma node 4087:1107.
class RibAvatar extends StatelessWidget {
  const RibAvatar({
    required this.label,
    this.color = RibAvatarColor.picture,
    this.initials,
    this.image,
    this.bankLogo,
    super.key,
  }) : assert(
         color != RibAvatarColor.picture || image != null,
         'Picture avatars require an image.',
       );

  factory RibAvatar.fromData(RibAvatarData data, {Key? key}) {
    return RibAvatar(
      key: key,
      label: data.label,
      color: data.color,
      initials: data.initials,
      image: data.image,
      bankLogo: data.bankLogo,
    );
  }

  final String label;
  final RibAvatarColor color;
  final String? initials;
  final ImageProvider<Object>? image;
  final Widget? bankLogo;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      image: true,
      label: bankLogo == null ? label : '$label, ICICI Bank',
      child: ExcludeSemantics(
        child: SizedBox(
          width: 64,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: 64,
                height: 40,
                child: Stack(
                  clipBehavior: Clip.none,
                  children: [
                    Positioned(left: 12, child: _buildVisual()),
                    if (bankLogo != null)
                      Positioned(
                        left: 36,
                        top: -4,
                        child: Container(
                          padding: const EdgeInsets.all(DsSpacing.xs),
                          decoration: BoxDecoration(
                            color: DsColors.neutralBaseWhite,
                            border: Border.all(
                              color: DsColors.surfaceCoolGrey110,
                            ),
                            borderRadius: BorderRadius.circular(DsRadius.lg),
                          ),
                          child: SizedBox.square(
                            dimension: 12,
                            child: FittedBox(child: bankLogo),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(height: DsSpacing.xs),
              Text(
                label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                style: DsText.p1Reg.copyWith(color: DsColors.neutralGrey140),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildVisual() {
    if (color == RibAvatarColor.picture) {
      return ClipOval(
        child: Image(
          image: image!,
          width: 40,
          height: 40,
          fit: BoxFit.cover,
          filterQuality: FilterQuality.high,
        ),
      );
    }

    final palette = _RibAvatarPalette.fromColor(color);
    final fallback = label.trim().isEmpty ? 'A' : label.trim().characters.first;
    final mnemonic = (initials?.trim().isNotEmpty == true ? initials! : fallback)
        .characters
        .take(2)
        .toString()
        .toUpperCase();

    return Container(
      width: 40,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: palette.background,
        shape: BoxShape.circle,
      ),
      child: Text(
        mnemonic,
        style: DsText.h2Semi.copyWith(color: palette.foreground),
      ),
    );
  }
}

/// A short horizontal collection of labelled RIB avatars.
class RibAvatarGroup extends StatelessWidget {
  const RibAvatarGroup({
    required this.avatars,
    this.headline = 'Headline',
    this.semanticLabel,
    super.key,
  });

  final List<RibAvatarData> avatars;
  final String headline;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      explicitChildNodes: true,
      label: semanticLabel ?? headline,
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 444),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              headline,
              style: DsText.p1Semi.copyWith(
                height: 16 / 12,
                color: DsColors.neutralGrey140,
              ),
            ),
            const SizedBox(height: DsSpacing.lg),
            SizedBox(
              width: double.infinity,
              height: 64,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: avatars.length,
                separatorBuilder: (_, _) =>
                    const SizedBox(width: DsSpacing.md),
                itemBuilder: (context, index) =>
                    RibAvatar.fromData(avatars[index]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RibAvatarPalette {
  const _RibAvatarPalette(this.background, this.foreground);

  factory _RibAvatarPalette.fromColor(RibAvatarColor color) {
    switch (color) {
      case RibAvatarColor.picture:
        throw StateError('Picture avatars do not use a mnemonic palette.');
      case RibAvatarColor.orange:
        return const _RibAvatarPalette(
          DsColors.pastelAmber100,
          DsColors.primaryOrange100,
        );
      case RibAvatarColor.blue:
        return const _RibAvatarPalette(
          DsColors.pastelBlue90,
          DsColors.neutralGrey120,
        );
      case RibAvatarColor.gold:
        return const _RibAvatarPalette(
          DsColors.pastelBrown100,
          DsColors.warning110,
        );
      case RibAvatarColor.maroon:
        return const _RibAvatarPalette(
          DsColors.pastelPeach90,
          DsColors.primaryMaroon100,
        );
      case RibAvatarColor.multi:
        return const _RibAvatarPalette(
          DsColors.pastelBrown100,
          DsColors.primaryMaroon100,
        );
    }
  }

  final Color background;
  final Color foreground;
}
