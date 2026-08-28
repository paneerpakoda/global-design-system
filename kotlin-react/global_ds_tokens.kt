// ICICI Global DS v0.2.0
// Generated from js/tokens.js. Do not edit by hand.
package com.icici.globalds

/** Framework-neutral Kotlin values for Kotlin/JS React applications. */
object GlobalDSColors {
    // TOKEN_COLOR: color.brand.orange
    const val brandOrange = "#E3530F"
    // TOKEN_COLOR: color.brand.maroon
    const val brandMaroon = "#BE2A2A"
    // TOKEN_COLOR: color.primaryOrange.80
    const val primaryOrange80 = "#F4B094"
    // TOKEN_COLOR: color.primaryOrange.90
    const val primaryOrange90 = "#E8692E"
    // TOKEN_COLOR: color.primaryOrange.100
    const val primaryOrange100 = "#D44500"
    // TOKEN_COLOR: color.primaryOrange.110
    const val primaryOrange110 = "#A93600"
    // TOKEN_COLOR: color.primaryOrange.120
    const val primaryOrange120 = "#732500"
    // TOKEN_COLOR: color.primaryMaroon.80
    const val primaryMaroon80 = "#DA7B80"
    // TOKEN_COLOR: color.primaryMaroon.90
    const val primaryMaroon90 = "#BC343A"
    // TOKEN_COLOR: color.primaryMaroon.100
    const val primaryMaroon100 = "#94292E"
    // TOKEN_COLOR: color.primaryMaroon.110
    const val primaryMaroon110 = "#6C1E21"
    // TOKEN_COLOR: color.primaryMaroon.120
    const val primaryMaroon120 = "#441315"
    // TOKEN_COLOR: color.neutralBase.black
    const val neutralBaseBlack = "#000000"
    // TOKEN_COLOR: color.neutralBase.white
    const val neutralBaseWhite = "#FFFFFF"
    // TOKEN_COLOR: color.neutralGrey.60
    const val neutralGrey60 = "#F7F7F7"
    // TOKEN_COLOR: color.neutralGrey.70
    const val neutralGrey70 = "#E7E8E9"
    // TOKEN_COLOR: color.neutralGrey.80
    const val neutralGrey80 = "#CDCFD0"
    // TOKEN_COLOR: color.neutralGrey.90
    const val neutralGrey90 = "#B2B5B8"
    // TOKEN_COLOR: color.neutralGrey.100
    const val neutralGrey100 = "#979B9F"
    // TOKEN_COLOR: color.neutralGrey.110
    const val neutralGrey110 = "#7D8287"
    // TOKEN_COLOR: color.neutralGrey.120
    const val neutralGrey120 = "#64696D"
    // TOKEN_COLOR: color.neutralGrey.130
    const val neutralGrey130 = "#4C4F52"
    // TOKEN_COLOR: color.neutralGrey.140
    const val neutralGrey140 = "#333638"
    // TOKEN_COLOR: color.neutralGrey.150
    const val neutralGrey150 = "#202428"
    // TOKEN_COLOR: color.surfaceCoolGrey.90
    const val surfaceCoolGrey90 = "#FCFCFD"
    // TOKEN_COLOR: color.surfaceCoolGrey.100
    const val surfaceCoolGrey100 = "#F8F9FB"
    // TOKEN_COLOR: color.surfaceCoolGrey.110
    const val surfaceCoolGrey110 = "#EFF1F6"
    // TOKEN_COLOR: color.success.50
    const val success50 = "#ECFDF3"
    // TOKEN_COLOR: color.success.100
    const val success100 = "#D1FADF"
    // TOKEN_COLOR: color.success.500
    const val success500 = "#12B76A"
    // TOKEN_COLOR: color.success.600
    const val success600 = "#039855"
    // TOKEN_COLOR: color.success.700
    const val success700 = "#027A48"
    // TOKEN_COLOR: color.error.50
    const val error50 = "#FEF3F2"
    // TOKEN_COLOR: color.error.100
    const val error100 = "#FEE4E2"
    // TOKEN_COLOR: color.error.500
    const val error500 = "#F04438"
    // TOKEN_COLOR: color.error.600
    const val error600 = "#D92D20"
    // TOKEN_COLOR: color.error.700
    const val error700 = "#B42318"
    // TOKEN_COLOR: color.warning.50
    const val warning50 = "#FFFAEB"
    // TOKEN_COLOR: color.warning.100
    const val warning100 = "#FEF0C7"
    // TOKEN_COLOR: color.warning.500
    const val warning500 = "#F79009"
    // TOKEN_COLOR: color.warning.600
    const val warning600 = "#DC6803"
    // TOKEN_COLOR: color.warning.700
    const val warning700 = "#B54708"
    // TOKEN_COLOR: color.info.50
    const val info50 = "#EFF8FF"
    // TOKEN_COLOR: color.info.100
    const val info100 = "#D1E9FF"
    // TOKEN_COLOR: color.info.500
    const val info500 = "#2E90FA"
    // TOKEN_COLOR: color.info.600
    const val info600 = "#1570EF"
    // TOKEN_COLOR: color.info.700
    const val info700 = "#175CD3"
}

object GlobalDSSpacing {
    const val spaceXxs = 2.0
    const val spaceXs = 4.0
    const val spaceSm = 8.0
    const val spaceMd = 12.0
    const val spaceLg = 16.0
    const val spaceXl = 20.0
    const val spaceXl2 = 24.0
    const val spaceXl3 = 32.0
    const val spaceXl4 = 40.0
    const val spaceXl5 = 48.0
    const val spaceXl6 = 64.0
}

object GlobalDSRadius {
    const val radiusXs = 4.0
    const val radiusSm = 8.0
    const val radiusMd = 12.0
    const val radiusLg = 16.0
    const val radiusXl = 24.0
    const val radiusFull = 999.0
}

data class GlobalDSTextStyle(
    val fontFamily: String,
    val fontSizePx: Double,
    val lineHeightPx: Double,
    val fontWeight: Int,
)

object GlobalDSTypography {
    const val fontFamily = "Mulish"

    // TOKEN_TYPE: typography.displayLarge
    val displayLarge = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 32.0,
        lineHeightPx = 40.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.displayMedium
    val displayMedium = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 28.0,
        lineHeightPx = 36.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.displaySmall
    val displaySmall = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 24.0,
        lineHeightPx = 32.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.headingLargeBold
    val headingLargeBold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 20.0,
        lineHeightPx = 28.0,
        fontWeight = 700,
    )

    // TOKEN_TYPE: typography.headingLargeSemibold
    val headingLargeSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 20.0,
        lineHeightPx = 28.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.headingMediumBold
    val headingMediumBold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 16.0,
        lineHeightPx = 24.0,
        fontWeight = 700,
    )

    // TOKEN_TYPE: typography.headingMediumSemibold
    val headingMediumSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 16.0,
        lineHeightPx = 24.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.headingSmallBold
    val headingSmallBold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 700,
    )

    // TOKEN_TYPE: typography.headingSmallSemibold
    val headingSmallSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.headingSmallRegular
    val headingSmallRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.bodyLargeRegular
    val bodyLargeRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.bodyLargeSemibold
    val bodyLargeSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.bodyMediumRegular
    val bodyMediumRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 20.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.bodyMediumSemibold
    val bodyMediumSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 20.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.bodySmallRegular
    val bodySmallRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.bodySmallSemibold
    val bodySmallSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.captionRegular
    val captionRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 11.0,
        lineHeightPx = 16.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.captionSemibold
    val captionSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 11.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.microSemibold
    val microSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 10.0,
        lineHeightPx = 14.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.inputLargeRegular
    val inputLargeRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 16.0,
        lineHeightPx = 24.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.inputLargeSemibold
    val inputLargeSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 16.0,
        lineHeightPx = 24.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.inputMediumRegular
    val inputMediumRegular = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 20.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.inputMediumSemibold
    val inputMediumSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 20.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.buttonLarge
    val buttonLarge = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.buttonSmall
    val buttonSmall = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.linkLarge
    val linkLarge = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 14.0,
        lineHeightPx = 20.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.linkSmall
    val linkSmall = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.labelBold
    val labelBold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 11.0,
        lineHeightPx = 16.0,
        fontWeight = 700,
    )

    // TOKEN_TYPE: typography.labelSemibold
    val labelSemibold = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 11.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.navLevel1Default
    val navLevel1Default = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 16.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.navLevel1Active
    val navLevel1Active = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 13.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

    // TOKEN_TYPE: typography.navLevel2Default
    val navLevel2Default = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 400,
    )

    // TOKEN_TYPE: typography.navLevel2Active
    val navLevel2Active = GlobalDSTextStyle(
        fontFamily = fontFamily,
        fontSizePx = 12.0,
        lineHeightPx = 16.0,
        fontWeight = 600,
    )

}
