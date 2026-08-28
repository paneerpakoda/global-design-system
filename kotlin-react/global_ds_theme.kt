// ICICI Global DS v0.2.0
// Generated from js/tokens.js. Do not edit by hand.
package com.icici.globalds

/** Stable semantic bridge for Kotlin/JS React and CSS-in-Kotlin consumers. */
data class GlobalDSTheme(
    val primary: String,
    val onPrimary: String,
    val secondary: String,
    val onSecondary: String,
    val surface: String,
    val onSurface: String,
    val error: String,
) {
    fun cssVariables(): Map<String, String> = mapOf(
        "--globalds-color-primary" to primary,
        "--globalds-color-on-primary" to onPrimary,
        "--globalds-color-secondary" to secondary,
        "--globalds-color-on-secondary" to onSecondary,
        "--globalds-color-surface" to surface,
        "--globalds-color-on-surface" to onSurface,
        "--globalds-color-error" to error,
        "--globalds-font-family" to GlobalDSTypography.fontFamily,
    )

    companion object {
        val light = GlobalDSTheme(
            primary = GlobalDSColors.primaryOrange100,
            onPrimary = GlobalDSColors.neutralBaseWhite,
            secondary = GlobalDSColors.primaryMaroon100,
            onSecondary = GlobalDSColors.neutralBaseWhite,
            surface = GlobalDSColors.neutralBaseWhite,
            onSurface = GlobalDSColors.neutralGrey150,
            error = GlobalDSColors.error500,
        )
    }
}
