import SwiftUI

// ICICI Global DS v0.2.0
// Generated from js/tokens.js. Do not edit by hand.
struct GlobalDSTheme {
    let primary: Color
    let onPrimary: Color
    let secondary: Color
    let onSecondary: Color
    let surface: Color
    let onSurface: Color
    let error: Color

    static let light = GlobalDSTheme(
        primary: GlobalDSColors.primaryOrange100,
        onPrimary: GlobalDSColors.neutralBaseWhite,
        secondary: GlobalDSColors.primaryMaroon100,
        onSecondary: GlobalDSColors.neutralBaseWhite,
        surface: GlobalDSColors.neutralBaseWhite,
        onSurface: GlobalDSColors.neutralGrey150,
        error: GlobalDSColors.error500
    )
}

private struct GlobalDSThemeKey: EnvironmentKey {
    static let defaultValue = GlobalDSTheme.light
}

extension EnvironmentValues {
    var globalDSTheme: GlobalDSTheme {
        get { self[GlobalDSThemeKey.self] }
        set { self[GlobalDSThemeKey.self] = newValue }
    }
}

extension View {
    func globalDSTheme(_ theme: GlobalDSTheme) -> some View {
        environment(\.globalDSTheme, theme)
    }
}
