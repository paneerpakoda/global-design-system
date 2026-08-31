/* ============================================================
   GlobalDS — deterministic platform exports
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
  return commentPrefix + ' GlobalDS v' + DS.meta.version + '\n' +
    commentPrefix + ' Generated from js/tokens.js. Do not edit by hand.\n';
}

function flutterHex(hex){
  const value = hex.replace('#', '').toUpperCase();
  return value.length === 8
    ? '0x' + value.slice(6, 8) + value.slice(0, 6)
    : '0xFF' + value;
}

function flutterTokens(){
  let output = "import 'package:flutter/material.dart';\n\n";
  output += exportHeader('///');
  output += 'class DsColors {\n  DsColors._();\n\n';
  for (const token of exportColorEntries()) {
    output += '  /// TOKEN_COLOR: ' + token.path + '\n';
    output += '  static const Color ' + token.name + ' = Color(' + flutterHex(token.value) + ');\n\n';
  }
  output += '  // Semantic variables resolved from the RIB Tokens collection.\n';
  DS.variables.forEach(variable => {
    output += '  /// TOKEN_VARIABLE: ' + variable.name + ' -> ' + variable.sourceAlias + '\n';
    output += '  static const Color ' + exportVariableName(variable.name) + ' = Color(' + flutterHex(variable.resolvedValue) + ');\n\n';
  });
  output += '  static const Gradient hero = LinearGradient(\n';
  output += '    begin: Alignment.topCenter,\n    end: Alignment.bottomCenter,\n';
  output += '    colors: [Color(' + flutterHex(DS.gradient.hero.stops[0]) + '), Color(' + flutterHex(DS.gradient.hero.stops[1]) + ')],\n  );\n';
  output += '\n  static const Gradient cardHero = LinearGradient(\n';
  output += '    begin: Alignment.centerLeft,\n    end: Alignment.centerRight,\n';
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
  output += '  const DsLayoutGrid({\n';
  output += '    required this.pattern,\n    required this.alignment,\n    required this.count,\n';
  output += '    this.sectionSize,\n    required this.gutterSize,\n    required this.offset,\n';
  output += '    required this.visible,\n  });\n';
  output += '  final String pattern;\n  final String alignment;\n  final int count;\n  final double? sectionSize;\n  final double gutterSize;\n  final double offset;\n  final bool visible;\n}\n\n';
  output += 'class DsGrids {\n  DsGrids._();\n\n';
  DS.grid.forEach((style, styleIndex) => {
    output += '  /// TOKEN_GRID: grid.' + style.viewport + '\n';
    output += '  static const List<DsLayoutGrid> ' + exportVariableName(style.name) + ' = [\n';
    style.layoutGrids.forEach(grid => {
      output += '    DsLayoutGrid(\n';
      output += "      pattern: '" + grid.pattern + "',\n";
      output += "      alignment: '" + grid.alignment + "',\n";
      output += '      count: ' + grid.count + ',\n';
      output += '      sectionSize: ' + (grid.sectionSize === undefined ? 'null' : grid.sectionSize) + ',\n';
      output += '      gutterSize: ' + grid.gutterSize + ',\n';
      output += '      offset: ' + grid.offset + ',\n';
      output += '      visible: ' + grid.visible + ',\n';
      output += '    ),\n';
    });
    output += styleIndex === DS.grid.length - 1 ? '  ];\n' : '  ];\n\n';
  });
  output += '}\n\nclass DsEffectToken {\n';
  output += '  const DsEffectToken(\n';
  output += '    this.color,\n    this.offsetX,\n    this.offsetY,\n    this.radius,\n    this.spread,\n  );\n';
  output += '  final Color color;\n  final double offsetX;\n  final double offsetY;\n  final double radius;\n  final double spread;\n}\n\n';
  output += 'class DsEffects {\n  DsEffects._();\n\n';
  DS.effects.forEach((style, styleIndex) => {
    const effect = style.effects[0];
    output += '  /// TOKEN_EFFECT: ' + style.path + ' · ' + style.name + '\n';
    output += '  static const DsEffectToken ' + style.token + ' =\n';
    output += '      DsEffectToken(Color(' + flutterHex(effect.color) + '), ' + effect.offset.x + ', ' +
      effect.offset.y + ', ' + effect.radius + ', ' + effect.spread + ');\n';
    if (styleIndex !== DS.effects.length - 1) output += '\n';
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
  output += "  static const String fontFamilyName = '" + DS.typeface.family + "';\n";
  output += "  static const String fontPackage = 'global_ds';\n";
  output += "  static const String fontFamily = 'packages/global_ds/" + DS.typeface.family + "';\n\n";
  DS.type.forEach(token => {
    output += '  /// TOKEN_TYPE: typography.' + token.token + '\n';
    output += '  static const TextStyle ' + token.token + ' = TextStyle(\n';
    output += '    fontFamily: fontFamilyName,\n    package: fontPackage,\n    fontSize: ' + token.size + ',\n';
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
          borderSide:
              const BorderSide(color: DsColors.primaryOrange100, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(DsRadius.md),
          borderSide: const BorderSide(color: DsColors.error100),
        ),
        labelStyle: DsText.inputMediumRegular,
        hintStyle:
            DsText.inputMediumRegular.copyWith(color: DsColors.neutralGrey90),
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

function platformNeutralTokensJson(){
  const colors = {};
  for (const [ramp, definition] of Object.entries(DS.color)) colors[ramp] = definition.stops;
  return JSON.stringify({
    meta: DS.meta,
    source: DS.ribAtoms.meta,
    foundationCoverage: DS.foundationCoverage,
    foundationIssues: DS.foundationIssues,
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
  'ds_tokens.dart': flutterTokens,
  'ds_theme.dart': flutterTheme,
  'ds_tokens.json': platformNeutralTokensJson
});

const GlobalDSExports = Object.freeze({
  targets: Object.freeze([
    Object.freeze({ id: 'flutter', label: 'Flutter', language: 'Dart', status: 'supported', files: Object.freeze(['ds_tokens.dart', 'ds_theme.dart']) })
  ]),
  commonFiles: Object.freeze(['ds_tokens.json']),
  generate(filename){
    const generator = GlobalDSExportGenerators[filename];
    if (!generator) throw new Error('Unknown GlobalDS export: ' + filename);
    return generator();
  }
});
