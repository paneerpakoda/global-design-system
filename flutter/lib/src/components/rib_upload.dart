import 'package:flutter/material.dart';
import '../foundations/ds_tokens.dart';
import '../foundations/ds_icons.dart';
import 'rib_button.dart';

enum RibUploadState { idle, uploading, uploaded, error }

enum RibUploadVariant { dropZone, compact }

/// File-selection and file-status control. The consumer owns platform I/O.
class RibUpload extends StatelessWidget {
  const RibUpload({
    required this.label,
    required this.requirements,
    required this.onSelect,
    this.state = RibUploadState.idle,
    this.fileName,
    this.fileDetails,
    this.errorText,
    this.onRemove,
    this.progress,
    this.enabled = true,
    this.variant = RibUploadVariant.dropZone,
    super.key,
  });
  final String label, requirements;
  final String? fileName, fileDetails, errorText;
  final RibUploadState state;
  final RibUploadVariant variant;
  final VoidCallback? onSelect, onRemove;
  final double? progress;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final busy = state == RibUploadState.uploading;
    final failed = state == RibUploadState.error;
    final hasFile =
        fileName != null || busy || state == RibUploadState.uploaded;
    final active = enabled && !busy;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(label, style: DsText.h3Semi),
        const SizedBox(height: DsSpacing.sm),
        if (!hasFile && variant == RibUploadVariant.dropZone)
          OutlinedButton(
            onPressed: active ? onSelect : null,
            style: ButtonStyle(
              padding: const WidgetStatePropertyAll(
                EdgeInsets.all(DsSpacing.xl2),
              ),
              minimumSize: const WidgetStatePropertyAll(Size(0, 144)),
              shape: WidgetStatePropertyAll(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(DsRadius.md),
                ),
              ),
              side: WidgetStateProperty.resolveWith(
                (s) => BorderSide(
                  color: failed
                      ? DsColors.error100
                      : s.contains(WidgetState.focused)
                      ? DsColors.primaryOrange100
                      : DsColors.surfaceCoolGrey110,
                ),
              ),
              backgroundColor: WidgetStateProperty.resolveWith(
                (s) => s.contains(WidgetState.hovered)
                    ? DsColors.surfaceCoolGrey100
                    : DsColors.neutralBaseWhite,
              ),
              overlayColor: const WidgetStatePropertyAll(Colors.transparent),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DsIcon(
                  DsIconData.document,
                  size: 32,
                  color: active
                      ? DsColors.primaryOrange100
                      : DsColors.neutralGrey90,
                ),
                const SizedBox(height: DsSpacing.md),
                Text(
                  failed ? 'Try another file' : 'Choose a file',
                  style: DsText.h3Semi.copyWith(
                    color: active
                        ? DsColors.primaryOrange100
                        : DsColors.neutralGrey90,
                  ),
                ),
                const SizedBox(height: DsSpacing.xs),
                Text(
                  'Select a document from your device',
                  textAlign: TextAlign.center,
                  style: DsText.p1Reg.copyWith(color: DsColors.neutralGrey120),
                ),
              ],
            ),
          )
        else if (!hasFile)
          Align(
            alignment: Alignment.centerLeft,
            child: RibButton(
              label: 'Choose file',
              variant: RibButtonVariant.outline,
              size: RibButtonSize.small,
              leadingIcon: const DsIcon(DsIconData.document, size: 16),
              onPressed: active ? onSelect : null,
            ),
          )
        else
          Container(
            padding: const EdgeInsets.all(DsSpacing.lg),
            decoration: BoxDecoration(
              color: DsColors.neutralBaseWhite,
              borderRadius: BorderRadius.circular(DsRadius.md),
              border: Border.all(
                color: failed ? DsColors.error100 : DsColors.surfaceCoolGrey110,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    DsIcon(
                      DsIconData.document,
                      size: 24,
                      color: enabled
                          ? DsColors.neutralGrey120
                          : DsColors.neutralGrey90,
                    ),
                    const SizedBox(width: DsSpacing.md),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            fileName ?? 'Selected document',
                            style: DsText.h3Semi,
                          ),
                          if (fileDetails != null)
                            Text(
                              fileDetails!,
                              style: DsText.p1Reg.copyWith(
                                color: DsColors.neutralGrey120,
                              ),
                            ),
                        ],
                      ),
                    ),
                    if (state == RibUploadState.uploaded)
                      const Padding(
                        padding: EdgeInsets.only(left: DsSpacing.sm),
                        child: DsIcon(
                          DsIconData.success,
                          color: DsColors.success100,
                          size: 20,
                        ),
                      ),
                    if (onRemove != null)
                      IconButton(
                        tooltip: 'Remove file',
                        onPressed: active ? onRemove : null,
                        style: IconButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(DsRadius.sm),
                          ),
                          hoverColor: DsColors.surfaceCoolGrey100,
                        ),
                        icon: const DsIcon(DsIconData.close, size: 20),
                      ),
                  ],
                ),
                const SizedBox(height: DsSpacing.sm),
                if (busy) ...[
                  LinearProgressIndicator(
                    value: progress?.clamp(0, 1),
                    color: DsColors.primaryOrange100,
                    backgroundColor: DsColors.surfaceCoolGrey110,
                    semanticsLabel: 'Uploading document',
                  ),
                  const SizedBox(height: DsSpacing.sm),
                ],
                Text(
                  failed
                      ? 'Upload unsuccessful'
                      : busy
                      ? 'Uploading${progress == null ? '…' : ' · ${(progress!.clamp(0, 1) * 100).round()}%'}'
                      : 'File added',
                  style: DsText.p1Reg.copyWith(
                    color: failed
                        ? DsColors.error100
                        : busy
                        ? DsColors.neutralGrey120
                        : DsColors.success100,
                  ),
                ),
                if (failed)
                  Align(
                    alignment: Alignment.centerLeft,
                    child: TextButton(
                      onPressed: active ? onSelect : null,
                      child: const Text('Try again'),
                    ),
                  ),
              ],
            ),
          ),
        const SizedBox(height: DsSpacing.sm),
        Text(
          requirements,
          style: DsText.p1Reg.copyWith(color: DsColors.neutralGrey120),
        ),
        if (failed)
          Padding(
            padding: const EdgeInsets.only(top: DsSpacing.xs),
            child: Text(
              errorText ?? 'Choose another file or try again.',
              style: DsText.p1Reg.copyWith(color: DsColors.error100),
            ),
          ),
      ],
    );
  }
}
