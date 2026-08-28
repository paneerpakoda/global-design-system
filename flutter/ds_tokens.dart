import 'dart:ui' show FontFeature;
import 'package:flutter/material.dart';

/// ICICI Global DS v0.2.0
/// Generated from js/tokens.js. Do not edit by hand.
class DsColors {
  DsColors._();

  /// TOKEN_COLOR: color.brand.orange
  static const Color brandOrange = Color(0xFFE3530F);
  /// TOKEN_COLOR: color.brand.maroon
  static const Color brandMaroon = Color(0xFFBE2A2A);
  /// TOKEN_COLOR: color.primaryOrange.80
  static const Color primaryOrange80 = Color(0xFFF4B094);
  /// TOKEN_COLOR: color.primaryOrange.90
  static const Color primaryOrange90 = Color(0xFFE8692E);
  /// TOKEN_COLOR: color.primaryOrange.100
  static const Color primaryOrange100 = Color(0xFFD44500);
  /// TOKEN_COLOR: color.primaryOrange.110
  static const Color primaryOrange110 = Color(0xFFA93600);
  /// TOKEN_COLOR: color.primaryOrange.120
  static const Color primaryOrange120 = Color(0xFF732500);
  /// TOKEN_COLOR: color.primaryMaroon.80
  static const Color primaryMaroon80 = Color(0xFFDA7B80);
  /// TOKEN_COLOR: color.primaryMaroon.90
  static const Color primaryMaroon90 = Color(0xFFBC343A);
  /// TOKEN_COLOR: color.primaryMaroon.100
  static const Color primaryMaroon100 = Color(0xFF94292E);
  /// TOKEN_COLOR: color.primaryMaroon.110
  static const Color primaryMaroon110 = Color(0xFF6C1E21);
  /// TOKEN_COLOR: color.primaryMaroon.120
  static const Color primaryMaroon120 = Color(0xFF441315);
  /// TOKEN_COLOR: color.neutralBase.black
  static const Color neutralBaseBlack = Color(0xFF000000);
  /// TOKEN_COLOR: color.neutralBase.white
  static const Color neutralBaseWhite = Color(0xFFFFFFFF);
  /// TOKEN_COLOR: color.neutralGrey.60
  static const Color neutralGrey60 = Color(0xFFF7F7F7);
  /// TOKEN_COLOR: color.neutralGrey.70
  static const Color neutralGrey70 = Color(0xFFE7E8E9);
  /// TOKEN_COLOR: color.neutralGrey.80
  static const Color neutralGrey80 = Color(0xFFCDCFD0);
  /// TOKEN_COLOR: color.neutralGrey.90
  static const Color neutralGrey90 = Color(0xFFB2B5B8);
  /// TOKEN_COLOR: color.neutralGrey.100
  static const Color neutralGrey100 = Color(0xFF979B9F);
  /// TOKEN_COLOR: color.neutralGrey.110
  static const Color neutralGrey110 = Color(0xFF7D8287);
  /// TOKEN_COLOR: color.neutralGrey.120
  static const Color neutralGrey120 = Color(0xFF64696D);
  /// TOKEN_COLOR: color.neutralGrey.130
  static const Color neutralGrey130 = Color(0xFF4C4F52);
  /// TOKEN_COLOR: color.neutralGrey.140
  static const Color neutralGrey140 = Color(0xFF333638);
  /// TOKEN_COLOR: color.neutralGrey.150
  static const Color neutralGrey150 = Color(0xFF202428);
  /// TOKEN_COLOR: color.surfaceCoolGrey.90
  static const Color surfaceCoolGrey90 = Color(0xFFFCFCFD);
  /// TOKEN_COLOR: color.surfaceCoolGrey.100
  static const Color surfaceCoolGrey100 = Color(0xFFF8F9FB);
  /// TOKEN_COLOR: color.surfaceCoolGrey.110
  static const Color surfaceCoolGrey110 = Color(0xFFEFF1F6);
  /// TOKEN_COLOR: color.success.50
  static const Color success50 = Color(0xFFECFDF3);
  /// TOKEN_COLOR: color.success.100
  static const Color success100 = Color(0xFFD1FADF);
  /// TOKEN_COLOR: color.success.500
  static const Color success500 = Color(0xFF12B76A);
  /// TOKEN_COLOR: color.success.600
  static const Color success600 = Color(0xFF039855);
  /// TOKEN_COLOR: color.success.700
  static const Color success700 = Color(0xFF027A48);
  /// TOKEN_COLOR: color.error.50
  static const Color error50 = Color(0xFFFEF3F2);
  /// TOKEN_COLOR: color.error.100
  static const Color error100 = Color(0xFFFEE4E2);
  /// TOKEN_COLOR: color.error.500
  static const Color error500 = Color(0xFFF04438);
  /// TOKEN_COLOR: color.error.600
  static const Color error600 = Color(0xFFD92D20);
  /// TOKEN_COLOR: color.error.700
  static const Color error700 = Color(0xFFB42318);
  /// TOKEN_COLOR: color.warning.50
  static const Color warning50 = Color(0xFFFFFAEB);
  /// TOKEN_COLOR: color.warning.100
  static const Color warning100 = Color(0xFFFEF0C7);
  /// TOKEN_COLOR: color.warning.500
  static const Color warning500 = Color(0xFFF79009);
  /// TOKEN_COLOR: color.warning.600
  static const Color warning600 = Color(0xFFDC6803);
  /// TOKEN_COLOR: color.warning.700
  static const Color warning700 = Color(0xFFB54708);
  /// TOKEN_COLOR: color.info.50
  static const Color info50 = Color(0xFFEFF8FF);
  /// TOKEN_COLOR: color.info.100
  static const Color info100 = Color(0xFFD1E9FF);
  /// TOKEN_COLOR: color.info.500
  static const Color info500 = Color(0xFF2E90FA);
  /// TOKEN_COLOR: color.info.600
  static const Color info600 = Color(0xFF1570EF);
  /// TOKEN_COLOR: color.info.700
  static const Color info700 = Color(0xFF175CD3);

  static const Gradient hero = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0xFFE3530F), Color(0xFFBE2A2A)],
  );

  static const Color buttonPrimaryFillBase = primaryOrange100;
  static const Gradient buttonPrimaryFill = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0x1FFFFFFF), Color(0x00FFFFFF)],
  );

  static const double buttonStrokeWidth = 1;
  static const Gradient buttonStroke = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Color(0xFFF4B094), Color(0xFFE8692E), Color(0xFFD44500)],
    stops: [0, .45, 1],
  );
}

class DsSpacing {
  DsSpacing._();

  static const double xxs = 2;
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 20;
  static const double xl2 = 24;
  static const double xl3 = 32;
  static const double xl4 = 40;
  static const double xl5 = 48;
  static const double xl6 = 64;
}

class DsRadius {
  DsRadius._();

  static const double xs = 4;
  static const double sm = 8;
  static const double md = 12;
  static const double lg = 16;
  static const double xl = 24;
  static const double full = 999;
}

class DsText {
  DsText._();

  static const String fontFamily = 'Mulish';

  /// TOKEN_TYPE: typography.displayLarge
  static const TextStyle displayLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    height: 1.25,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.displayMedium
  static const TextStyle displayMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 28,
    height: 1.29,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.displaySmall
  static const TextStyle displaySmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 24,
    height: 1.33,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingLargeBold
  static const TextStyle headingLargeBold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 20,
    height: 1.40,
    fontWeight: FontWeight.w700,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingLargeSemibold
  static const TextStyle headingLargeSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 20,
    height: 1.40,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingMediumBold
  static const TextStyle headingMediumBold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.50,
    fontWeight: FontWeight.w700,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingMediumSemibold
  static const TextStyle headingMediumSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.50,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingSmallBold
  static const TextStyle headingSmallBold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w700,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingSmallSemibold
  static const TextStyle headingSmallSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.headingSmallRegular
  static const TextStyle headingSmallRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodyLargeRegular
  static const TextStyle bodyLargeRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodyLargeSemibold
  static const TextStyle bodyLargeSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodyMediumRegular
  static const TextStyle bodyMediumRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.54,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodyMediumSemibold
  static const TextStyle bodyMediumSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.54,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodySmallRegular
  static const TextStyle bodySmallRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.bodySmallSemibold
  static const TextStyle bodySmallSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.captionRegular
  static const TextStyle captionRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    height: 1.45,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.captionSemibold
  static const TextStyle captionSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    height: 1.45,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.microSemibold
  static const TextStyle microSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 10,
    height: 1.40,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.inputLargeRegular
  static const TextStyle inputLargeRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.50,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.inputLargeSemibold
  static const TextStyle inputLargeSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 1.50,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.inputMediumRegular
  static const TextStyle inputMediumRegular = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.54,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.inputMediumSemibold
  static const TextStyle inputMediumSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.54,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.buttonLarge
  static const TextStyle buttonLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.14,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.buttonSmall
  static const TextStyle buttonSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.linkLarge
  static const TextStyle linkLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 1.43,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.linkSmall
  static const TextStyle linkSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.labelBold
  static const TextStyle labelBold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    height: 1.45,
    fontWeight: FontWeight.w700,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.labelSemibold
  static const TextStyle labelSemibold = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    height: 1.45,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.navLevel1Default
  static const TextStyle navLevel1Default = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.23,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.navLevel1Active
  static const TextStyle navLevel1Active = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 1.23,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.navLevel2Default
  static const TextStyle navLevel2Default = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w400,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  /// TOKEN_TYPE: typography.navLevel2Active
  static const TextStyle navLevel2Active = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    height: 1.33,
    fontWeight: FontWeight.w600,
    fontFeatures: [FontFeature.tabularFigures()],
  );

}
