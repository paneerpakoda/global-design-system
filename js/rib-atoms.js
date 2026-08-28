/* ============================================================
   GlobalDS OS — audited RIB foundation contract

   This file mirrors every local style and variable found in the
   “Atoms - RIB” Figma file. It is deliberately lossless: source
   names, multiple paints, responsive grids, text transforms and
   known naming/value conflicts are preserved for traceability.
   ============================================================ */

const GlobalDSRIBAtoms = (() => {
  const solid = (name, color, opacity = 1, description = '') => ({
    name,
    description,
    paints: [{ type:'SOLID', color, opacity }],
  });

  const ramp = (prefix, stops) => Object.entries(stops).map(([stop, color]) =>
    solid(`${prefix}${stop}`, color)
  );

  const paintStyles = [
    ...ramp('NEWOrange/', {
      80:'#F7B68D', 90:'#F3975D', 100:'#F0792E', 110:'#DB5E10', 120:'#AB4A0C',
    }),
    ...ramp('NEWMaroon/', {
      80:'#CE5F66', 90:'#BF3B43', 100:'#982F35', 110:'#712327', 120:'#4A171A',
    }),
    ...[
      ['NEWGrey/60','#F7F7F7'], ['NEWGrey/70','#E7E8E9'],
      ['NEWGrey/80','#CDCFD0'], ['NEWGrey/90','#B2B5B8'],
      ['Grey/100','#979B9F'], ['Grey/110','#7D8287'],
      ['Grey/120','#64696D'], ['Grey/130','#4C4F52'],
      ['Grey/140','#333638'], ['NEWGrey/150','#202428'],
    ].map(([name, color]) => solid(name, color)),
    ...[20, 40, 60, 80, 100].map(value =>
      solid(`NEWNeutral/White ${value}%`, '#FFFFFF', value / 100)
    ),
    ...[20, 40, 60, 80, 100].map(value =>
      solid(`NEWNeutral/Black ${value}%`, '#000000', value / 100)
    ),
    ...ramp('NEWCool grey/', { 90:'#FCFCFD', 100:'#F8F9FB', 110:'#EFF1F6' }),
    ...ramp('NEWLight grey/', { 100:'#F9F9F9' }),
    ...ramp('NEWPastel/Blue/', {
      80:'#F7FAFC', 90:'#EBF1F8', 100:'#E3EDF8', 110:'#99ADC2', 120:'#7993AF',
    }),
    ...ramp('NEWPastel/Brown/', {
      80:'#FDFDFC', 90:'#F9F9F5', 100:'#F6F5F0', 110:'#E9E6D9', 120:'#CFCAAF',
    }),
    // The source contains two published local styles with this exact name.
    solid('NEWPastel/Brown/120', '#D9D5BF'),
    ...ramp('NEWPastel/Green/', {
      80:'#F8FCFA', 90:'#F1F9F6', 100:'#E5F4EE', 110:'#E2F0EA', 120:'#BFDED1',
    }),
    ...ramp('NEWPastels/Amber/', {
      80:'#FEFCFB', 90:'#FCF6F2', 100:'#FAEFE8', 110:'#F7E1D4', 120:'#FACAAD',
    }),
    ...ramp('NEWPastels/Peach/', {
      80:'#FEFBFB', 90:'#FDF4F4', 100:'#FCEEEE', 110:'#F8E8E9', 120:'#EEC9CC',
    }),
    ...ramp('Indicative/Success/', { 90:'#00C26F', 100:'#008F52', 110:'#005C35' }),
    solid('Indicative/Warning/80', '#FEFAED', 1, 'Background'),
    ...ramp('Indicative/Warning/', { 90:'#FFC633', 100:'#FFB800', 110:'#CC9300' }),
    ...ramp('Indicative/Error/', { 90:'#E05257', 100:'#D8272D', 110:'#AD1F24' }),
    ...ramp('Indicative/Information/', { 90:'#6B97FF', 100:'#3772FF', 110:'#054FFF' }),

    {
      name:'NEWGradient/General/Orange', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#EF8C24' }, { position:1, color:'#F06837' }],
        transform:[[0.999994,-0.000733,0.000372],[0.000733,0.09377,0.452382]],
      }],
    },
    {
      name:'NEWGradient/General/Maroon', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#A83939' }, { position:1, color:'#982F35' }],
        transform:[[0.999994,-0.000733,0.000372],[0.000733,0.09377,0.452382]],
      }],
    },
    {
      name:'NEWGradient/General/Black', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#373737' }, { position:1, color:'#121212' }],
        transform:[[0.999994,-0.000733,0.000372],[0.000733,0.09377,0.452382]],
      }],
    },
    {
      name:'NEWGradient/General/Gold', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#C3993C' }, { position:1, color:'#C9A963' }],
        transform:[[0.999994,-0.000733,0.000372],[0.000733,0.09377,0.452382]],
      }],
    },
    {
      name:'NEWGradient/Directional/Brown', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#F6F3F0' }, { position:1, color:'#F6F5F000' }],
        transform:[[0.747764,0,0],[0,0.011082,0.494459]],
      }],
    },
    {
      name:'NEWGradient/Mandala/Brown', description:'', paints:[{
        type:'GRADIENT_RADIAL', opacity:1,
        stops:[{ position:0.036583, color:'#CFCAAF' }, { position:0.963069, color:'#E7E5D780' }],
        transform:[[-0.324807,-0.213788,0.774351],[0.229386,-0.348504,0.570797]],
      }],
    },
    {
      name:'NEWGradient/Directional/Blue', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#F0F4F9' }, { position:1, color:'#F8F9FB00' }],
        transform:[[0.590395,0.000084,-0.000042],[0,0.011612,0.494194]],
      }],
    },
    {
      name:'NEWGradient/Mandala/Blue', description:'', paints:[{
        type:'GRADIENT_RADIAL', opacity:1,
        stops:[{ position:0, color:'#ACB2BE' }, { position:0.985425, color:'#ACB2BE45' }],
        transform:[[-0.995238,0,1],[0,-0.19433,0.597165]],
      }],
    },
    {
      name:'NEWGradient/Directional/Neutral', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:1,
        stops:[{ position:0, color:'#FCFCFD' }, { position:1, color:'#FFFFFF' }],
        transform:[[0.590395,0.000084,-0.000042],[0,0.011612,0.494194]],
      }],
    },
    {
      name:'NEWGradient/Mandala/White', description:'', paints:[{
        type:'GRADIENT_RADIAL', opacity:1,
        stops:[
          { position:0, color:'#FFFFFF' },
          { position:0.0001, color:'#FFFFFFE9' },
          { position:1, color:'#FFFFFF4A' },
        ],
        transform:[[-1.007631,-0.005647,1.002823],[0.01206,-0.201812,0.600906]],
      }],
    },
    {
      name:'NEWGradient/Mandala/Maroon', description:'', paints:[{
        type:'GRADIENT_RADIAL', opacity:1,
        stops:[{ position:0, color:'#CE5F6680' }, { position:0.985425, color:'#CE5F6640' }],
        transform:[[-0.995238,0,1],[0,-0.19433,0.597165]],
      }],
    },
    {
      name:'NEWGradient/Stroke', description:'', paints:[{
        type:'GRADIENT_LINEAR', opacity:0.5,
        stops:[{ position:0, color:'#FFFFFF' }, { position:1, color:'#FFFFFF00' }],
        transform:[[0,1,0],[-1,0,1]],
      }],
    },
    {
      name:'NEWGradient/Button Fill', description:'', paints:[
        { type:'SOLID', color:'#F0792E', opacity:1 },
        {
          type:'GRADIENT_LINEAR', opacity:0.12,
          stops:[{ position:0, color:'#FFFFFF' }, { position:1, color:'#FFFFFF00' }],
          transform:[[0,1,0],[-1,0,1]],
        },
      ],
    },
    {
      name:'NEWGradient/Mandala/Orange', description:'', paints:[{
        type:'GRADIENT_RADIAL', opacity:1,
        stops:[{ position:0, color:'#F7B68D99' }, { position:0.985425, color:'#FBD8BF66' }],
        transform:[[-0.995238,0,1],[0,-0.19433,0.597165]],
      }],
    },
  ];

  const makeTextStyles = rows => rows.map(([
    id, name, group, fontStyle, size, height, weight, tracking,
    trackingUnit = 'PIXELS', decoration = 'NONE', textCase = 'ORIGINAL', description = '',
  ]) => ({
    id, name, group, family:'Mulish', fontStyle, size, height, weight,
    tracking, trackingUnit, decoration, textCase, description,
  }));

  const textStyles = makeTextStyles([
    ['display1','Display/D1','Display','SemiBold',28,36,600,0,'PERCENT'],
    ['display2','Display/D2','Display','SemiBold',24,32,600,0,'PERCENT'],
    ['h1Bold','Heading/H1 Bold','Headings','Bold',20,24,700,0.15],
    ['h1Semi','Heading/H1 Semibold','Headings','SemiBold',20,24,600,0.15],
    ['h2Bold','Heading/H2 Bold','Headings','Bold',16,20,700,0.15],
    ['h2Semi','Heading/H2 Semibold','Headings','SemiBold',16,20,600,0.15],
    ['h3Bold','Heading/H3 Bold','Headings','Bold',14,20,700,0.5],
    ['h3Semi','Heading/H3 Semibold','Headings','SemiBold',14,20,600,0.5],
    ['h3Regular','Heading/H3 Regular','Headings','Regular',14,20,400,0.5],
    ['s1Bold','Subtitle/S1 Bold','Subheadings','Bold',12,16,700,0.25],
    ['s1Semi','Subtitle/S1 Semibold','Subheadings','SemiBold',12,16,600,0.25],
    ['s1Regular','Subtitle/S1 Regular','Subheadings','Regular',12,16,400,0.25],
    ['p1Bold','Paragraph/P1 Bold','Paragraph','Bold',12,20,700,0.25],
    ['p1Semi','Paragraph/P1 Semibold','Paragraph','SemiBold',12,20,600,0.25],
    ['p1Reg','Paragraph/P1 Regular','Paragraph','Regular',12,20,400,0.25],
    ['p2Bold','Paragraph/P2 Bold','Paragraph','Bold',11,16,700,0.25],
    ['p2Semi','Paragraph/P2 Semibold','Paragraph','SemiBold',11,16,600,0.25],
    ['p2Reg','Paragraph/P2 Regular','Paragraph','Regular',11,16,400,0.25],
    ['p3Bold','Paragraph/P3 Bold','Paragraph','Bold',10,16,700,0.25],
    ['p3Semi','Paragraph/P3 Semibold','Paragraph','SemiBold',10,16,600,0.25],
    ['p3Reg','Paragraph/P3 Regular','Paragraph','Regular',10,16,400,0.25,'PIXELS','NONE','ORIGINAL','Use very sparingly!'],
    ['inputLRegular','Inputs/Input L Regular','Inputs','Regular',16,20,400,0.25],
    ['inputLSemi','Inputs/Input L Semibold','Inputs','SemiBold',16,20,600,0.25],
    ['inputRRegular','Inputs/Input R Regular','Inputs','Regular',13,20,400,0.25],
    ['inputRSemi','Inputs/Input R Semibold','Inputs','SemiBold',13,20,600,0.25],
    ['buttonLarge','Inputs/Button L','Inputs','SemiBold',14,16,600,0.25],
    ['buttonSmall','Inputs/Button S','Inputs','SemiBold',12,16,600,0.25],
    ['linkLarge','Inputs/Link L','Inputs','SemiBold',12,16,600,0.25,'PIXELS','UNDERLINE'],
    ['linkSmall','Inputs/Link S','Inputs','SemiBold',11,16,600,0.25,'PIXELS','UNDERLINE'],
    ['labelRegular','Labels/Label Regular','Labels','Regular',11,16,400,1.2,'PIXELS','NONE','UPPER'],
    ['labelSemibold','Labels/Label Semibold','Labels','SemiBold',11,16,600,1.2,'PIXELS','NONE','UPPER'],
    ['labelBold','Labels/Label Bold','Labels','Bold',11,16,700,1.2,'PIXELS','NONE','UPPER'],
    ['l1Default','Navigation/L1 Default','Navigation','Regular',13,16,400,0.2],
    ['l1Active','Navigation/L1 Active','Navigation','SemiBold',13,16,600,0.25],
    ['l2Default','Navigation/L2 Default','Navigation','Regular',12,16,400,0.2],
    ['l2Active','Navigation/L2 Active','Navigation','SemiBold',12,16,600,0.2],
  ]);

  const shadow = (name, color, x, y, radius, spread = 0) => ({
    name,
    effects:[{
      type:'DROP_SHADOW', color, offset:{ x, y }, radius, spread,
      blendMode:'NORMAL', visible:true,
    }],
  });

  const effectStyles = [
    shadow('Drop Shadow/Shadow 100', '#6E6E6E1F', 3, 4, 5),
    shadow('Drop Shadow/Shadow 200', '#0000001F', 0, 4, 4),
    shadow('Drop Shadow/Shadow 300', '#00000026', 0, 3, 8),
    shadow('Drop Shadow/Shadow 400', '#00000026', 0, 4, 10),
    shadow('Drop Shadow/Button White', '#5258660F', 0, 1, 2),
    shadow('Drop Shadow/Bottom sticky', '#6E6E720D', 0, -2, 4),
    shadow('Elevation/Orange outline', '#FF9A6C', 0, 0, 0, 1),
    shadow('Elevation/Focus', '#FFE8DD', 0, 0, 0, 3),
  ];

  const gridStyles = [
    {
      name:'Desktop L', viewport:'desktop',
      layoutGrids:[
        { pattern:'COLUMNS', alignment:'MAX', count:12, sectionSize:72, gutterSize:8, offset:8, visible:true },
        { pattern:'ROWS', alignment:'CENTER', count:100000, sectionSize:1, gutterSize:4, offset:0, visible:false },
      ],
    },
    {
      name:'Tablet', viewport:'tablet',
      layoutGrids:[
        { pattern:'COLUMNS', alignment:'STRETCH', count:12, gutterSize:12, offset:16, visible:true },
      ],
    },
    {
      name:'Mobile', viewport:'mobile',
      layoutGrids:[
        { pattern:'COLUMNS', alignment:'STRETCH', count:4, gutterSize:16, offset:16, visible:true },
        { pattern:'ROWS', alignment:'MIN', count:10000, sectionSize:4, gutterSize:0, offset:0, visible:true },
      ],
    },
  ];

  const variables = [
    { name:'bg/white-0', type:'COLOR', collection:'Tokens', mode:'Blue Theme', sourceAlias:'neutral/0', resolvedValue:'#FFFFFF', scopes:['ALL_SCOPES'], hiddenFromPublishing:true },
    { name:'icon/sub-500', type:'COLOR', collection:'Tokens', mode:'Blue Theme', sourceAlias:'neutral/500', resolvedValue:'#525866', scopes:['ALL_SCOPES'], hiddenFromPublishing:true },
    { name:'icon/strong-900', type:'COLOR', collection:'Tokens', mode:'Blue Theme', sourceAlias:'neutral/900', resolvedValue:'#0A0D14', scopes:['ALL_SCOPES'], hiddenFromPublishing:true },
    { name:'stroke/soft-200', type:'COLOR', collection:'Tokens', mode:'Blue Theme', sourceAlias:'neutral/200', resolvedValue:'#E2E4E9', scopes:['ALL_SCOPES'], hiddenFromPublishing:true },
    { name:'text/sub-500', type:'COLOR', collection:'Tokens', mode:'Blue Theme', sourceAlias:'neutral/500', resolvedValue:'#525866', scopes:['ALL_SCOPES'], hiddenFromPublishing:true },
  ];

  const counts = {
    paintStyles:paintStyles.length,
    textStyles:textStyles.length,
    effectStyles:effectStyles.length,
    gridStyles:gridStyles.length,
    variables:variables.length,
    total:paintStyles.length + textStyles.length + effectStyles.length + gridStyles.length + variables.length,
  };

  return {
    meta:{
      name:'Atoms - RIB',
      fileKey:'KlcvhcZPwn1c9BXBY2k6rl',
      sourceNode:'3:715',
      sourcePage:'Colours',
      sourceUrl:'https://www.figma.com/design/KlcvhcZPwn1c9BXBY2k6rl/Atoms---RIB--Copy-?node-id=3-715',
      audited:'28 Aug 2026',
    },
    counts,
    paintStyles,
    textStyles,
    effectStyles,
    gridStyles,
    variables,
    issues:[{
      id:'duplicate-pastel-brown-120',
      severity:'source-conflict',
      styleName:'NEWPastel/Brown/120',
      values:['#CFCAAF','#D9D5BF'],
      resolution:'Preserve both source styles. GlobalDS aliases the first value until the RIB owner resolves the duplicate.',
    }],
  };
})();
