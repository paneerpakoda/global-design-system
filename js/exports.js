/* ============================================================
   GlobalDS OS — deterministic platform exports
   Every generated file projects the shared DS object from tokens.js.
   ============================================================ */

function exportColorEntries(){
  const entries = [];
  for (const [ramp, definition] of Object.entries(DS.color)) {
    for (const [stop, value] of Object.entries(definition.stops)) {
      entries.push({
        path: 'color.' + ramp + '.' + stop,
        name: exportTokenName(ramp, stop),
        value,
        label: definition.label
      });
    }
  }
  return entries;
}

function exportTokenName(group, token){
  const value = String(token);
  return group + (value.match(/^\d/) ? value : value.charAt(0).toUpperCase() + value.slice(1));
}

function exportPascalCase(value){
  return String(value)
    .replace(/(^|[-_\s]+)([a-zA-Z0-9])/g, (_, __, char) => char.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

function exportVariableName(value){
  const parts = String(value).split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return parts.map((part, index) => index === 0
    ? part.charAt(0).toLowerCase() + part.slice(1)
    : part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
}

function exportTrackingEm(token){
  if (!token.tracking) return 0;
  return token.trackingUnit === 'PERCENT'
    ? token.tracking / 100
    : token.tracking / token.size;
}

function exportHeader(commentPrefix){
  return commentPrefix + ' GlobalDS OS v' + DS.meta.version + '\n' +
    commentPrefix + ' Generated from js/tokens.js. Do not edit by hand.\n';
}

function kotlinReactTokens(){
  let output = exportHeader('//');
  output += 'package com.icici.globalds\n\n';
  output += '/** Framework-neutral Kotlin values for Kotlin/JS React applications. */\n';
  output += 'object GlobalDSColors {\n';
  for (const token of exportColorEntries()) {
    output += '    // TOKEN_COLOR: ' + token.path + '\n';
    output += '    const val ' + token.name + ' = "' + token.value + '"\n';
  }
  output += '\n    // Semantic variables resolved from the RIB Tokens collection.\n';
  DS.variables.forEach(variable => {
    output += '    // TOKEN_VARIABLE: ' + variable.name + ' -> ' + variable.sourceAlias + '\n';
    output += '    const val ' + exportVariableName(variable.name) + ' = "' + variable.resolvedValue + '"\n';
  });
  output += '}\n\n';
  output += 'data class GlobalDSLayoutGrid(\n';
  output += '    val pattern: String, val alignment: String, val count: Int,\n';
  output += '    val sectionSizePx: Double?, val gutterSizePx: Double, val offsetPx: Double, val visible: Boolean,\n';
  output += ')\n\nobject GlobalDSGrids {\n';
  DS.grid.forEach(style => {
    output += '    // TOKEN_GRID: grid.' + style.viewport + '\n';
    output += '    val ' + exportVariableName(style.name) + ' = listOf(\n';
    style.layoutGrids.forEach(grid => {
      output += '        GlobalDSLayoutGrid("' + grid.pattern + '", "' + grid.alignment + '", ' + grid.count + ', ' +
        (grid.sectionSize === undefined ? 'null' : grid.sectionSize + '.0') + ', ' + grid.gutterSize + '.0, ' +
        grid.offset + '.0, ' + grid.visible + '),\n';
    });
    output += '    )\n';
  });
  output += '}\n\n';
  output += 'data class GlobalDSEffect(val color: String, val x: Double, val y: Double, val radius: Double, val spread: Double)\n\n';
  output += 'object GlobalDSEffects {\n';
  DS.effects.forEach(style => {
    const effect = style.effects[0];
    output += '    // TOKEN_EFFECT: ' + style.path + ' · ' + style.name + '\n';
    output += '    val ' + style.token + ' = GlobalDSEffect("' + effect.color + '", ' + effect.offset.x + '.0, ' +
      effect.offset.y + '.0, ' + effect.radius + '.0, ' + effect.spread + '.0)\n';
  });
  output += '}\n\n';
  output += 'object GlobalDSSpacing {\n';
  DS.space.forEach(token => {
    output += '    const val ' + exportTokenName('space', token.dart) + ' = ' + token.px + '.0\n';
  });
  output += '}\n\n';
  output += 'object GlobalDSRadius {\n';
  DS.radius.forEach(token => {
    output += '    const val ' + exportTokenName('radius', token.dart) + ' = ' + token.px + '.0\n';
  });
  output += '}\n\n';
  output += 'data class GlobalDSTextStyle(\n';
  output += '    val fontFamily: String,\n';
  output += '    val fontSizePx: Double,\n';
  output += '    val lineHeightPx: Double,\n';
  output += '    val fontWeight: Int,\n';
  output += '    val letterSpacingEm: Double,\n';
  output += '    val textDecoration: String,\n';
  output += '    val textCase: String,\n';
  output += ')\n\n';
  output += 'object GlobalDSTypography {\n';
  output += '    const val fontFamily = "' + DS.typeface.family + '"\n\n';
  DS.type.forEach(token => {
    output += '    // TOKEN_TYPE: typography.' + token.token + '\n';
    output += '    val ' + token.token + ' = GlobalDSTextStyle(\n';
    output += '        fontFamily = fontFamily,\n';
    output += '        fontSizePx = ' + token.size + '.0,\n';
    output += '        lineHeightPx = ' + token.height + '.0,\n';
    output += '        fontWeight = ' + token.weight + ',\n';
    output += '        letterSpacingEm = ' + exportTrackingEm(token).toFixed(4) + ',\n';
    output += '        textDecoration = "' + token.decoration + '",\n';
    output += '        textCase = "' + token.textCase + '",\n';
    output += '    )\n\n';
  });
  output += '    // Backwards-compatible component aliases.\n';
  Object.entries(DS.typeAliases).forEach(([alias, token]) => {
    output += '    val ' + alias + ' = ' + token + '\n';
  });
  output += '}\n';
  return output;
}

function kotlinReactTheme(){
  return exportHeader('//') + `package com.icici.globalds

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
            onPrimary = GlobalDSColors.neutralGrey150,
            secondary = GlobalDSColors.primaryMaroon100,
            onSecondary = GlobalDSColors.neutralBaseWhite,
            surface = GlobalDSColors.neutralBaseWhite,
            onSurface = GlobalDSColors.neutralGrey150,
            error = GlobalDSColors.error100,
        )
    }
}
`;
}

function flutterHex(hex){
  const value = hex.replace('#', '').toUpperCase();
  return value.length === 8
    ? '0x' + value.slice(6, 8) + value.slice(0, 6)
    : '0xFF' + value;
}

function flutterTokens(){
  let output = "import 'dart:ui' show FontFeature;\n";
  output += "import 'package:flutter/material.dart';\n\n";
  output += exportHeader('///');
  output += 'class DsColors {\n  DsColors._();\n\n';
  for (const token of exportColorEntries()) {
    output += '  /// TOKEN_COLOR: ' + token.path + '\n';
    output += '  static const Color ' + token.name + ' = Color(' + flutterHex(token.value) + ');\n';
  }
  output += '\n  // Semantic variables resolved from the RIB Tokens collection.\n';
  DS.variables.forEach(variable => {
    output += '  /// TOKEN_VARIABLE: ' + variable.name + ' -> ' + variable.sourceAlias + '\n';
    output += '  static const Color ' + exportVariableName(variable.name) + ' = Color(' + flutterHex(variable.resolvedValue) + ');\n';
  });
  output += '\n  static const Gradient hero = LinearGradient(\n';
  output += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  output += '    colors: [Color(' + flutterHex(DS.gradient.hero.stops[0]) + '), Color(' + flutterHex(DS.gradient.hero.stops[1]) + ')],\n  );\n';
  output += '\n  static const Color buttonPrimaryFillBase = primaryOrange100;\n';
  output += '  static const Gradient buttonPrimaryFill = LinearGradient(\n';
  output += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  output += '    colors: [Color(0x1FFFFFFF), Color(0x00FFFFFF)],\n  );\n';
  output += '\n  static const double buttonStrokeWidth = 1;\n';
  output += '  static const Gradient buttonStroke = LinearGradient(\n';
  output += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  output += '    colors: [Color(0x80FFFFFF), Color(0x00FFFFFF)],\n  );\n';
  output += '}\n\nclass DsLayoutGrid {\n';
  output += '  const DsLayoutGrid({required this.pattern, required this.alignment, required this.count, this.sectionSize, required this.gutterSize, required this.offset, required this.visible});\n';
  output += '  final String pattern;\n  final String alignment;\n  final int count;\n  final double? sectionSize;\n  final double gutterSize;\n  final double offset;\n  final bool visible;\n}\n\n';
  output += 'class DsGrids {\n  DsGrids._();\n\n';
  DS.grid.forEach(style => {
    output += '  /// TOKEN_GRID: grid.' + style.viewport + '\n';
    output += '  static const List<DsLayoutGrid> ' + exportVariableName(style.name) + ' = [\n';
    style.layoutGrids.forEach(grid => {
      output += "    DsLayoutGrid(pattern: '" + grid.pattern + "', alignment: '" + grid.alignment + "', count: " + grid.count +
        ', sectionSize: ' + (grid.sectionSize === undefined ? 'null' : grid.sectionSize) + ', gutterSize: ' + grid.gutterSize +
        ', offset: ' + grid.offset + ', visible: ' + grid.visible + '),\n';
    });
    output += '  ];\n';
  });
  output += '}\n\nclass DsEffectToken {\n';
  output += '  const DsEffectToken(this.color, this.offsetX, this.offsetY, this.radius, this.spread);\n';
  output += '  final Color color;\n  final double offsetX;\n  final double offsetY;\n  final double radius;\n  final double spread;\n}\n\n';
  output += 'class DsEffects {\n  DsEffects._();\n\n';
  DS.effects.forEach(style => {
    const effect = style.effects[0];
    output += '  /// TOKEN_EFFECT: ' + style.path + ' · ' + style.name + '\n';
    output += '  static const DsEffectToken ' + style.token + ' = DsEffectToken(Color(' + flutterHex(effect.color) + '), ' +
      effect.offset.x + ', ' + effect.offset.y + ', ' + effect.radius + ', ' + effect.spread + ');\n';
  });
  output += '}\n\nclass DsSpacing {\n  DsSpacing._();\n\n';
  DS.space.forEach(token => {
    output += '  static const double ' + token.dart + ' = ' + token.px + ';\n';
  });
  output += '}\n\nclass DsRadius {\n  DsRadius._();\n\n';
  DS.radius.forEach(token => {
    output += '  static const double ' + token.dart + ' = ' + token.px + ';\n';
  });
  output += '}\n\nclass DsText {\n  DsText._();\n\n';
  output += "  static const String fontFamily = '" + DS.typeface.family + "';\n\n";
  DS.type.forEach(token => {
    output += '  /// TOKEN_TYPE: typography.' + token.token + '\n';
    output += '  static const TextStyle ' + token.token + ' = TextStyle(\n';
    output += '    fontFamily: fontFamily,\n    fontSize: ' + token.size + ',\n';
    output += '    height: ' + (token.height / token.size).toFixed(2) + ',\n';
    output += '    fontWeight: FontWeight.w' + token.weight + ',\n';
    output += '    letterSpacing: ' + token.tracking + ',\n';
    if (token.decoration === 'UNDERLINE') output += '    decoration: TextDecoration.underline,\n';
    output += '    fontFeatures: [FontFeature.tabularFigures()],\n  );\n\n';
  });
  output += '  // Backwards-compatible component aliases.\n';
  Object.entries(DS.typeAliases).forEach(([alias, token]) => {
    output += '  static const TextStyle ' + alias + ' = ' + token + ';\n';
  });
  output += '}\n';
  return output;
}

function flutterTheme(){
  return `import 'package:flutter/material.dart';
import 'ds_tokens.dart';

` + exportHeader('///') + `class DsTheme {
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
`;
}

function swiftRGB(hex){
  const value = parseInt(hex.replace('#', ''), 16);
  return {
    red: ((value >> 16) & 255) / 255,
    green: ((value >> 8) & 255) / 255,
    blue: (value & 255) / 255
  };
}

function swiftRGBA(hex){
  const raw = hex.replace('#', '');
  const rgb = swiftRGB('#' + raw.slice(0, 6));
  return { ...rgb, alpha: raw.length === 8 ? parseInt(raw.slice(6, 8), 16) / 255 : 1 };
}

function swiftNumber(value){
  return Number(value).toFixed(4).replace(/0+$/, '').replace(/\.$/, '.0');
}

function swiftWeight(weight){
  return ({ 400: 'regular', 500: 'medium', 600: 'semibold', 700: 'bold', 800: 'heavy' })[weight] || 'regular';
}

function swiftUITokens(){
  let output = 'import SwiftUI\n\n' + exportHeader('//');
  output += 'enum GlobalDSColors {\n';
  for (const token of exportColorEntries()) {
    const rgb = swiftRGB(token.value);
    output += '    // TOKEN_COLOR: ' + token.path + '\n';
    output += '    static let ' + token.name + ' = Color(.sRGB, red: ' + swiftNumber(rgb.red) +
      ', green: ' + swiftNumber(rgb.green) + ', blue: ' + swiftNumber(rgb.blue) + ', opacity: 1)\n';
  }
  output += '\n    // Semantic variables resolved from the RIB Tokens collection.\n';
  DS.variables.forEach(variable => {
    const rgb = swiftRGB(variable.resolvedValue);
    output += '    // TOKEN_VARIABLE: ' + variable.name + ' -> ' + variable.sourceAlias + '\n';
    output += '    static let ' + exportVariableName(variable.name) + ' = Color(.sRGB, red: ' + swiftNumber(rgb.red) +
      ', green: ' + swiftNumber(rgb.green) + ', blue: ' + swiftNumber(rgb.blue) + ', opacity: 1)\n';
  });
  output += '}\n\nstruct GlobalDSLayoutGrid {\n';
  output += '    let pattern: String\n    let alignment: String\n    let count: Int\n    let sectionSize: CGFloat?\n    let gutterSize: CGFloat\n    let offset: CGFloat\n    let visible: Bool\n}\n\n';
  output += 'enum GlobalDSGrids {\n';
  DS.grid.forEach(style => {
    output += '    // TOKEN_GRID: grid.' + style.viewport + '\n';
    output += '    static let ' + exportVariableName(style.name) + ': [GlobalDSLayoutGrid] = [\n';
    style.layoutGrids.forEach(grid => {
      output += '        .init(pattern: "' + grid.pattern + '", alignment: "' + grid.alignment + '", count: ' + grid.count +
        ', sectionSize: ' + (grid.sectionSize === undefined ? 'nil' : grid.sectionSize) + ', gutterSize: ' + grid.gutterSize +
        ', offset: ' + grid.offset + ', visible: ' + grid.visible + '),\n';
    });
    output += '    ]\n';
  });
  output += '}\n\nstruct GlobalDSEffectToken {\n';
  output += '    let color: Color\n    let x: CGFloat\n    let y: CGFloat\n    let radius: CGFloat\n    let spread: CGFloat\n}\n\n';
  output += 'enum GlobalDSEffects {\n';
  DS.effects.forEach(style => {
    const effect = style.effects[0];
    const rgba = swiftRGBA(effect.color);
    output += '    // TOKEN_EFFECT: ' + style.path + ' · ' + style.name + '\n';
    output += '    static let ' + style.token + ' = GlobalDSEffectToken(color: Color(.sRGB, red: ' + swiftNumber(rgba.red) +
      ', green: ' + swiftNumber(rgba.green) + ', blue: ' + swiftNumber(rgba.blue) + ', opacity: ' + swiftNumber(rgba.alpha) +
      '), x: ' + effect.offset.x + ', y: ' + effect.offset.y + ', radius: ' + effect.radius + ', spread: ' + effect.spread + ')\n';
  });
  output += '}\n\nenum GlobalDSSpacing {\n';
  DS.space.forEach(token => {
    output += '    static let ' + exportTokenName('space', token.dart) + ': CGFloat = ' + token.px + '\n';
  });
  output += '}\n\nenum GlobalDSRadius {\n';
  DS.radius.forEach(token => {
    output += '    static let ' + exportTokenName('radius', token.dart) + ': CGFloat = ' + token.px + '\n';
  });
  output += '}\n\nstruct GlobalDSTextStyle {\n';
  output += '    let size: CGFloat\n    let lineHeight: CGFloat\n    let weight: Font.Weight\n';
  output += '    let tracking: CGFloat\n    let isUnderlined: Bool\n    let textCase: String\n\n';
  output += '    var font: Font { .custom(GlobalDSTypography.fontFamily, size: size).weight(weight) }\n';
  output += '    var lineSpacing: CGFloat { max(0, lineHeight - size) }\n';
  output += '}\n\nenum GlobalDSTypography {\n';
  output += '    static let fontFamily = "' + DS.typeface.family + '"\n\n';
  DS.type.forEach(token => {
    output += '    // TOKEN_TYPE: typography.' + token.token + '\n';
    output += '    static let ' + token.token + ' = GlobalDSTextStyle(size: ' + token.size +
      ', lineHeight: ' + token.height + ', weight: .' + swiftWeight(token.weight) +
      ', tracking: ' + token.tracking + ', isUnderlined: ' + (token.decoration === 'UNDERLINE') +
      ', textCase: "' + token.textCase + '")\n';
  });
  output += '\n    // Backwards-compatible component aliases.\n';
  Object.entries(DS.typeAliases).forEach(([alias, token]) => {
    output += '    static let ' + alias + ' = ' + token + '\n';
  });
  output += '}\n';
  return output;
}

function swiftUITheme(){
  return `import SwiftUI

` + exportHeader('//') + `struct GlobalDSTheme {
    let primary: Color
    let onPrimary: Color
    let secondary: Color
    let onSecondary: Color
    let surface: Color
    let onSurface: Color
    let error: Color

    static let light = GlobalDSTheme(
        primary: GlobalDSColors.primaryOrange100,
        onPrimary: GlobalDSColors.neutralGrey150,
        secondary: GlobalDSColors.primaryMaroon100,
        onSecondary: GlobalDSColors.neutralBaseWhite,
        surface: GlobalDSColors.neutralBaseWhite,
        onSurface: GlobalDSColors.neutralGrey150,
        error: GlobalDSColors.error100
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
        environment(\\.globalDSTheme, theme)
    }
}
`;
}

function platformNeutralTokensJson(){
  const colors = {};
  for (const [ramp, definition] of Object.entries(DS.color)) colors[ramp] = definition.stops;
  return JSON.stringify({
    meta: DS.meta,
    source: DS.ribAtoms.meta,
    foundationCoverage: DS.foundationCoverage,
    foundationIssues: DS.foundationIssues,
    platforms: DS.platforms,
    sourceSystems: DS.sourceSystems,
    deferredSystems: DS.deferredSystems,
    colors,
    semanticColors: DS.semanticColor,
    gradient: DS.gradient.hero,
    gradients: DS.gradient,
    alpha: DS.alpha,
    typeface: DS.typeface,
    typography: DS.type,
    typographyAliases: DS.typeAliases,
    spacing: DS.space.map(token => ({ token: token.token, px: token.px })),
    radius: DS.radius.map(token => ({ token: token.token, px: token.px })),
    effects: DS.effects,
    paintStyles: DS.paintStyles,
    gradients: DS.gradients,
    grids: DS.grid,
    variables: DS.variables
  }, null, 2);
}

const GlobalDSExportGenerators = Object.freeze({
  'global_ds_tokens.kt': kotlinReactTokens,
  'global_ds_theme.kt': kotlinReactTheme,
  'ds_tokens.dart': flutterTokens,
  'ds_theme.dart': flutterTheme,
  'GlobalDSTokens.swift': swiftUITokens,
  'GlobalDSTheme.swift': swiftUITheme,
  'ds_tokens.json': platformNeutralTokensJson
});

const GlobalDSExports = Object.freeze({
  targets: Object.freeze([
    Object.freeze({ id: 'kotlin-react', label: 'Kotlin · ReactJS', language: 'Kotlin', files: Object.freeze(['global_ds_tokens.kt', 'global_ds_theme.kt']) }),
    Object.freeze({ id: 'flutter', label: 'Flutter', language: 'Dart', files: Object.freeze(['ds_tokens.dart', 'ds_theme.dart']) }),
    Object.freeze({ id: 'swiftui', label: 'SwiftUI', language: 'Swift', files: Object.freeze(['GlobalDSTokens.swift', 'GlobalDSTheme.swift']) })
  ]),
  commonFiles: Object.freeze(['ds_tokens.json']),
  generate(filename){
    const generator = GlobalDSExportGenerators[filename];
    if (!generator) throw new Error('Unknown GlobalDS export: ' + filename);
    return generator();
  }
});
