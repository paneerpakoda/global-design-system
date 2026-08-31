/* Audited source palettes shown for comparison only. They are not exported as GlobalDS tokens. */
const GlobalDSSourceColours = (() => {
  const ramp = ({ label, prefix, stops, tokens, note = '', status = {} }) => ({
    label,
    note,
    stops,
    tokens: tokens || Object.fromEntries(Object.keys(stops).map(stop => [stop, `${prefix}${stop}`])),
    status,
  });

  const android = {
    id: 'android',
    label: 'iMobile Android',
    sourceLabel: 'Foundation · stable v1.0',
    description: 'The stable Android foundation and the baseline used for the first GlobalDS convergence decision.',
    sections: [
      { title: 'Brand and primary colours', ramps: ['brand', 'primaryOrange', 'primaryMaroon'] },
      { title: 'Neutrals and surfaces', ramps: ['neutralBase', 'neutralGrey', 'surfaceCoolGrey'] },
      { title: 'Pastel colours', ramps: ['pastelBlue', 'pastelBrown', 'pastelGreen', 'pastelAmber', 'pastelPeach'] },
      { title: 'Semantic colours', ramps: ['success', 'warning', 'error', 'info'] },
    ],
    palette: {
      brand: ramp({
        label: 'Brand colours',
        stops: { orange: '#E3530F', maroon: '#BE2A2A' },
        tokens: { orange: 'DsColors.brandOrange', maroon: 'DsColors.brandMaroon' },
      }),
      primaryOrange: ramp({
        label: 'Primary orange', prefix: 'DsColors.primaryOrange',
        stops: { 80: '#F4B094', 90: '#E8692E', 100: '#D44500', 110: '#A93600', 120: '#732500' },
      }),
      primaryMaroon: ramp({
        label: 'Primary maroon', prefix: 'DsColors.primaryMaroon',
        stops: { 80: '#DA7B80', 90: '#BC343A', 100: '#94292E', 110: '#6C1E21', 120: '#441315' },
      }),
      neutralBase: ramp({
        label: 'Absolute neutrals',
        stops: { black: '#000000', white: '#FFFFFF' },
        tokens: { black: 'DsColors.neutralBaseBlack', white: 'DsColors.neutralBaseWhite' },
      }),
      neutralGrey: ramp({
        label: 'Neutral grey', prefix: 'DsColors.neutralGrey',
        stops: { 60: '#F7F7F7', 70: '#E7E8E9', 80: '#CDCFD0', 90: '#B2B5B8', 100: '#979B9F', 110: '#7D8287', 120: '#64696D', 130: '#4C4F52', 140: '#333638', 150: '#202428' },
      }),
      surfaceCoolGrey: ramp({
        label: 'Cool grey', prefix: 'DsColors.surfaceCoolGrey',
        stops: { 90: '#FCFCFD', 100: '#F8F9FB', 110: '#EFF1F6' },
      }),
      pastelBlue: ramp({
        label: 'Pastel blue', prefix: 'DsColors.success',
        note: 'The source uses semantic Success token names for this pastel-blue ramp.',
        stops: { 50: '#F7FAFC', 100: '#EBF1F8', 500: '#E3EDF8', 600: '#99ADC2', 700: '#7993AF' },
      }),
      pastelBrown: ramp({
        label: 'Pastel brown', prefix: 'DsColors.warning',
        note: 'The source uses semantic Warning token names for this pastel-brown ramp.',
        stops: { 50: '#FDFDFC', 100: '#F9F9F5', 500: '#F6F5F0', 600: '#E9E6D9', 700: '#CFCAAF' },
      }),
      pastelGreen: ramp({
        label: 'Pastel green', prefix: 'DsColors.error',
        note: 'The source uses semantic Error token names for this pastel-green ramp.',
        stops: { 50: '#F8FCFA', 100: '#F1F9F6', 500: '#E5F4EE', 600: '#E2F0EA', 700: '#BFDED1' },
      }),
      pastelAmber: ramp({
        label: 'Pastel amber', prefix: 'DsColors.info',
        note: 'The source repeats semantic Information token names for this pastel-amber ramp.',
        stops: { 50: '#FEFCFB', 100: '#FCF6F2', 500: '#FAEFE8', 600: '#F7E1D4', 700: '#FACAAD' },
      }),
      pastelPeach: ramp({
        label: 'Pastel peach', prefix: 'DsColors.info',
        note: 'The source uses semantic Information token names for this pastel-peach ramp.',
        stops: { 50: '#FEFBFB', 100: '#FDF4F4', 500: '#FCEEEE', 600: '#F8E8E9', 700: '#EEC9CC' },
      }),
      success: ramp({
        label: 'Semantic success', prefix: 'DsColors.success',
        stops: { 50: '#ECFDF3', 100: '#D1FADF', 500: '#12B76A', 600: '#039855', 700: '#027A48' },
      }),
      warning: ramp({
        label: 'Semantic warning', prefix: 'DsColors.warning',
        stops: { 50: '#FFFAEB', 100: '#FEF0C7', 500: '#F79009', 600: '#DC6803', 700: '#B54708' },
      }),
      error: ramp({
        label: 'Semantic error', prefix: 'DsColors.error',
        stops: { 50: '#FEF3F2', 100: '#FEE4E2', 500: '#F04438', 600: '#D92D20', 700: '#B42318' },
      }),
      info: ramp({
        label: 'Semantic information', prefix: 'DsColors.info',
        stops: { 50: '#EFF8FF', 100: '#D1E9FF', 500: '#2E90FA', 600: '#1570EF', 700: '#175CD3' },
      }),
    },
  };

  const ios = {
    id: 'ios',
    label: 'iMobile iOS',
    sourceLabel: 'Source audit',
    description: 'The iOS work-in-progress palette, including four grouped values reconstructed from the visible source.',
    sections: [
      { title: 'Primary colours', ramps: ['primaryOrange', 'primaryMaroon'] },
      { title: 'Neutrals and surfaces', ramps: ['neutralBase', 'neutralGrey', 'surfaceCoolGrey', 'backgroundGrey'] },
      { title: 'Pastel colours', ramps: ['pastelBlue', 'pastelBrown', 'pastelGreen', 'pastelAmber', 'pastelPeach'] },
      { title: 'Indicative colours', ramps: ['success', 'warning', 'error', 'info'] },
    ],
    palette: {
      primaryOrange: ramp({
        label: 'Primary orange', prefix: 'Orange/',
        stops: { 80: '#F8B291', 90: '#F16F31', 100: '#E3530F', 110: '#B1410C', 120: '#812F09' },
      }),
      primaryMaroon: ramp({
        label: 'Primary maroon', prefix: 'Maroon/',
        stops: { 80: '#DA7B80', 90: '#BC343A', 100: '#94292E', 110: '#6C1E22', 120: '#441315' },
      }),
      neutralBase: ramp({
        label: 'Absolute neutrals',
        stops: { black: '#000000', white: '#FFFFFF', blackNamespaced: '#000000' },
        tokens: { black: 'Neutral/Black/100', white: 'Neutral/White/100', blackNamespaced: 'Colours/Neutral/Black/100' },
      }),
      neutralGrey: ramp({
        label: 'Neutral grey', prefix: 'Neutral/Grey/',
        note: 'Stops 70, 120 and 140 are expanded from visibly grouped source values.',
        stops: { 60: '#E7E8E9', 70: '#E7E8E9', 80: '#CDCFD0', 90: '#B2B5B8', 100: '#979B9F', 110: '#4C4F52', 120: '#333638', 130: '#333638', 140: '#333638', 150: '#202428' },
        status: { 70: 'visual-only', 120: 'visual-only', 140: 'visual-only' },
      }),
      surfaceCoolGrey: ramp({
        label: 'Cool grey', prefix: 'Cool Grey/',
        stops: { 90: '#FCFCFD', 100: '#F8F9FB', 110: '#EFF1F6' },
      }),
      backgroundGrey: ramp({ label: 'Background grey', prefix: 'BG Grey/', stops: { 100: '#F9F9F9' } }),
      pastelBlue: ramp({
        label: 'Pastel blue', prefix: 'Pastels/Blue/',
        stops: { 80: '#F7FAFC', 90: '#EBF1F8', 100: '#E3EDF8', 110: '#99ADC2', 120: '#7993AF' },
      }),
      pastelBrown: ramp({
        label: 'Pastel brown', prefix: 'Pastels/Brown/',
        note: 'Stop 100 is visible in the source without a separate exact binding.',
        stops: { 100: '#F6F5F0', 110: '#E3E0D0', 120: '#CFCAAF' },
        status: { 100: 'visual-only' },
      }),
      pastelGreen: ramp({ label: 'Pastel green', prefix: 'Pastels/Green/', stops: { 100: '#E5F4EE', 110: '#E2F0EA', 120: '#BFDED1' } }),
      pastelAmber: ramp({ label: 'Pastel amber', prefix: 'Pastels/Amber/', stops: { 100: '#FAEFE8', 110: '#FDE9DD', 120: '#FACAAD' } }),
      pastelPeach: ramp({ label: 'Pastel peach', prefix: 'Pastels/Peach/', stops: { 100: '#FDF4F4', 110: '#FAEFF0', 120: '#EEC9CC' } }),
      success: ramp({ label: 'Indicative success', prefix: 'Indicative/Success/', stops: { 90: '#00C26F', 100: '#008F52', 110: '#005C35' } }),
      warning: ramp({ label: 'Indicative warning', prefix: 'Indicative/Warning/', stops: { 90: '#FFC633', 100: '#FFB800', 110: '#CC9300' } }),
      error: ramp({ label: 'Indicative error', prefix: 'Indicative/Error/', stops: { 90: '#E05257', 100: '#D8272D', 110: '#AD1F24' } }),
      info: ramp({ label: 'Indicative information', prefix: 'Indicative/Information/', stops: { 90: '#6B97FF', 100: '#3772FF', 110: '#054FFF' } }),
    },
  };

  const rib = {
    id: 'rib',
    label: 'RIB',
    sourceLabel: 'RIB Design System',
    description: 'The current RIB scalar palette, preserving its mixed legacy and NEW namespaces plus nominal opacity tokens.',
    sections: [
      { title: 'Primary colours', ramps: ['primaryOrange', 'primaryMaroonLegacy', 'primaryMaroonNew'] },
      { title: 'Neutrals and surfaces', ramps: ['neutralGrey', 'surfaceCoolGrey', 'backgroundGrey', 'opacityBlack', 'opacityWhite'] },
      { title: 'Pastel colours', ramps: ['pastelBlue', 'pastelBrown', 'pastelGreen', 'pastelAmber', 'pastelPeach'] },
      { title: 'Indicative colours', ramps: ['success', 'warning', 'error', 'info'] },
    ],
    palette: {
      primaryOrange: ramp({
        label: 'Primary orange · NEW', prefix: 'NEWOrange/',
        stops: { 80: '#F7B68D', 90: '#F3975D', 100: '#F0792E', 110: '#DB5E10', 120: '#AB4A0C' },
      }),
      primaryMaroonLegacy: ramp({
        label: 'Primary maroon · legacy alias', prefix: 'Maroon/',
        note: 'The same values are duplicated under the NEWMaroon path.',
        stops: { 80: '#CE5F66', 90: '#BF3B43', 100: '#982F35', 110: '#712327', 120: '#4A171A' },
      }),
      primaryMaroonNew: ramp({
        label: 'Primary maroon · NEW', prefix: 'NEWMaroon/',
        stops: { 80: '#CE5F66', 90: '#BF3B43', 100: '#982F35', 110: '#712327', 120: '#4A171A' },
      }),
      neutralGrey: ramp({
        label: 'Neutral grey',
        note: 'The source switches from NEWGrey to the legacy Grey path for stops 100–140.',
        stops: { 60: '#F7F7F7', 70: '#E7E8E9', 80: '#CDCFD0', 90: '#B2B5B8', 100: '#979B9F', 110: '#7D8287', 120: '#64696D', 130: '#4C4F52', 140: '#333638', 150: '#202428' },
        tokens: { 60: 'NEWGrey/60', 70: 'NEWGrey/70', 80: 'NEWGrey/80', 90: 'NEWGrey/90', 100: 'Grey/100', 110: 'Grey/110', 120: 'Grey/120', 130: 'Grey/130', 140: 'Grey/140', 150: 'NEWGrey/150' },
      }),
      surfaceCoolGrey: ramp({ label: 'Cool grey', prefix: 'NEWCool grey/', stops: { 90: '#FCFCFD', 100: '#F8F9FB', 110: '#EFF1F6' } }),
      backgroundGrey: ramp({ label: 'Background grey', prefix: 'NEWLight grey/', stops: { 100: '#F9F9F9' } }),
      opacityBlack: ramp({
        label: 'Black opacity neutrals',
        note: '20–80% values are nominal interpretations of the token names; duplicate opacity layers remain unresolved.',
        stops: { legacy100: '#000000', 20: 'rgba(0,0,0,.20)', 40: 'rgba(0,0,0,.40)', 60: 'rgba(0,0,0,.60)', 80: 'rgba(0,0,0,.80)', 100: '#000000' },
        tokens: { legacy100: 'Neutral/Black 100%', 20: 'NEWNeutral/Black 20%', 40: 'NEWNeutral/Black 40%', 60: 'NEWNeutral/Black 60%', 80: 'NEWNeutral/Black 80%', 100: 'NEWNeutral/Black 100%' },
        status: { 20: 'nominal', 40: 'nominal', 60: 'nominal', 80: 'nominal' },
      }),
      opacityWhite: ramp({
        label: 'White opacity neutrals',
        note: '20–80% values are nominal interpretations of the token names.',
        stops: { 20: 'rgba(255,255,255,.20)', 40: 'rgba(255,255,255,.40)', 60: 'rgba(255,255,255,.60)', 80: 'rgba(255,255,255,.80)', 100: '#FFFFFF' },
        tokens: { 20: 'NEWNeutral/White 20%', 40: 'NEWNeutral/White 40%', 60: 'NEWNeutral/White 60%', 80: 'NEWNeutral/White 80%', 100: 'NEWNeutral/White 100%' },
        status: { 20: 'nominal', 40: 'nominal', 60: 'nominal', 80: 'nominal' },
      }),
      pastelBlue: ramp({ label: 'Pastel blue', prefix: 'NEWPastel/Blue/', stops: { 80: '#F7FAFC', 90: '#EBF1F8', 100: '#E3EDF8', 110: '#99ADC2', 120: '#7993AF' } }),
      pastelBrown: ramp({ label: 'Pastel brown', prefix: 'NEWPastel/Brown/', stops: { 80: '#FDFDFC', 90: '#F9F9F5', 100: '#F6F5F0', 110: '#E9E6D9', 120: '#D9D5BF' } }),
      pastelGreen: ramp({ label: 'Pastel green', prefix: 'NEWPastel/Green/', stops: { 80: '#F8FCFA', 90: '#F1F9F6', 100: '#E5F4EE', 110: '#E2F0EA', 120: '#BFDED1' } }),
      pastelAmber: ramp({ label: 'Pastel amber', prefix: 'NEWPastels/Amber/', stops: { 80: '#FEFCFB', 90: '#FCF6F2', 100: '#FAEFE8', 110: '#F7E1D4', 120: '#FACAAD' } }),
      pastelPeach: ramp({ label: 'Pastel peach', prefix: 'NEWPastels/Peach/', stops: { 80: '#FEFBFB', 90: '#FDF4F4', 100: '#FCEEEE', 110: '#F8E8E9', 120: '#EEC9CC' } }),
      success: ramp({ label: 'Indicative success', prefix: 'Indicative/Success/', stops: { 90: '#00C26F', 100: '#008F52', 110: '#005C35' } }),
      warning: ramp({ label: 'Indicative warning', prefix: 'Indicative/Warning/', stops: { 90: '#FFC633', 100: '#FFB800', 110: '#CC9300' } }),
      error: ramp({ label: 'Indicative error', prefix: 'Indicative/Error/', stops: { 90: '#E05257', 100: '#D8272D', 110: '#AD1F24' } }),
      info: ramp({ label: 'Indicative information', prefix: 'Indicative/Information/', stops: { 90: '#6B97FF', 100: '#3772FF', 110: '#054FFF' } }),
    },
  };

  return {
    imobile: { id: 'imobile', label: 'iMobile colours', variants: [android, ios] },
    rib,
  };
})();
