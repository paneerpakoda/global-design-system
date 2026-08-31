import 'package:flutter/material.dart';

import '../foundations/ds_tokens.dart';

enum RibLoadingSize { small, medium, large }

/// Foundation-backed fallback while RIB has no published Loading indicator set.
class RibLoadingIndicator extends StatelessWidget {
  const RibLoadingIndicator({
    this.label = 'Loading',
    this.size = RibLoadingSize.medium,
    super.key,
  });

  final String label;
  final RibLoadingSize size;

  @override
  Widget build(BuildContext context) {
    final dimension = switch (size) {
      RibLoadingSize.small => 16.0,
      RibLoadingSize.medium => 20.0,
      RibLoadingSize.large => 28.0,
    };
    return Semantics(
      label: label,
      liveRegion: true,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: dimension,
            height: dimension,
            child: CircularProgressIndicator(
              strokeWidth: size == RibLoadingSize.large ? 3 : 2,
              color: DsColors.primaryOrange100,
              backgroundColor: DsColors.pastelAmber110,
            ),
          ),
          const SizedBox(width: DsSpacing.sm),
          Text(
            label,
            style: DsText.s1Regular.copyWith(color: DsColors.neutralGrey130),
          ),
        ],
      ),
    );
  }
}
