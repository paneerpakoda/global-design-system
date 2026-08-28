import 'package:flutter/material.dart';
import 'ds_tokens.dart';

/// GlobalDS v0.5.0
/// Generated from js/tokens.js. Do not edit by hand.
class DsTheme {
  DsTheme._();

  static ThemeData get light {
    const scheme = ColorScheme.light(
      primary: DsColors.primaryOrange100,
      onPrimary: DsColors.neutralGrey150,
      secondary: DsColors.primaryMaroon100,
      onSecondary: DsColors.neutralBaseWhite,
      error: DsColors.error100,
      onError: DsColors.neutralBaseWhite,
      surface: DsColors.neutralBaseWhite,
      onSurface: DsColors.neutralGrey150,
    );

    return ThemeData(
      useMaterial3: true,
      colorScheme: scheme,
      scaffoldBackgroundColor: DsColors.surfaceCoolGrey110,
      fontFamily: DsText.fontFamily,
      textTheme: const TextTheme(
        displayLarge: DsText.displayLarge,
        displayMedium: DsText.displayMedium,
        displaySmall: DsText.displaySmall,
        headlineLarge: DsText.headingLargeBold,
        headlineMedium: DsText.headingLargeSemibold,
        headlineSmall: DsText.headingMediumSemibold,
        titleLarge: DsText.headingMediumSemibold,
        titleMedium: DsText.headingSmallSemibold,
        titleSmall: DsText.headingSmallRegular,
        bodyLarge: DsText.bodyLargeRegular,
        bodyMedium: DsText.bodyMediumRegular,
        bodySmall: DsText.bodySmallRegular,
        labelLarge: DsText.buttonLarge,
        labelMedium: DsText.labelSemibold,
        labelSmall: DsText.captionSemibold,
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: DsColors.buttonPrimaryFillBase,
          foregroundColor: DsColors.neutralGrey150,
          disabledBackgroundColor: DsColors.neutralGrey60,
          disabledForegroundColor: DsColors.neutralGrey90,
          minimumSize: const Size(120, 36),
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(DsRadius.md),
          ),
          textStyle: DsText.buttonSmall,
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: DsColors.neutralGrey130,
          side: const BorderSide(color: DsColors.neutralGrey80),
          minimumSize: const Size(120, 36),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(DsRadius.md),
          ),
          textStyle: DsText.buttonSmall,
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: DsColors.neutralBaseWhite,
        contentPadding: const EdgeInsets.symmetric(
          horizontal: DsSpacing.lg,
          vertical: DsSpacing.md,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.neutralGrey80),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.neutralGrey80),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.primaryOrange100, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
        labelStyle: DsText.inputMediumRegular,
        hintStyle: DsText.inputMediumRegular.copyWith(color: DsColors.neutralGrey90),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: DsColors.neutralBaseWhite,
        foregroundColor: DsColors.neutralGrey150,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: DsText.headingMediumSemibold,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: DsColors.neutralBaseWhite,
        selectedItemColor: DsColors.primaryOrange110,
        unselectedItemColor: DsColors.neutralGrey90,
        type: BottomNavigationBarType.fixed,
      ),
      chipTheme: ChipThemeData(
        backgroundColor: DsColors.neutralBaseWhite,
        selectedColor: DsColors.primaryOrange80,
        side: const BorderSide(color: DsColors.neutralGrey80),
        labelStyle: DsText.labelSemibold,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(DsRadius.full),
        ),
      ),
      dividerTheme: const DividerThemeData(
        color: DsColors.neutralGrey70,
        thickness: 1,
      ),
      snackBarTheme: SnackBarThemeData(
        backgroundColor: DsColors.neutralGrey150,
        contentTextStyle: DsText.bodyMediumRegular.copyWith(
          color: DsColors.neutralBaseWhite,
        ),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
        ),
      ),
    );
  }
}

class DsButtonDecorations {
  DsButtonDecorations._();

  static final ShapeDecoration primaryStrokeShell = ShapeDecoration(
    gradient: DsColors.buttonStroke,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(DsRadius.md),
    ),
  );

  static final ShapeDecoration primaryFillBase = ShapeDecoration(
    color: DsColors.buttonPrimaryFillBase,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(
        DsRadius.md - DsColors.buttonStrokeWidth,
      ),
    ),
  );

  static final ShapeDecoration primaryFillOverlay = ShapeDecoration(
    gradient: DsColors.buttonPrimaryFill,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(
        DsRadius.md - DsColors.buttonStrokeWidth,
      ),
    ),
  );
}
