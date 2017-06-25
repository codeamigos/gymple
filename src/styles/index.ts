const Color = require('color');
import {assign} from 'lodash';
import * as RN from 'react-native';

export interface Multiplicators {
  [key: string]: number,
}

export interface Palette {
  [key: string]: string,
}

export interface Style {
  [key: string]: number | string,
}

export interface StylesResult {
  [key: string]: Style,
}

const remStyles: StylesResult = {
  fs: {
    fontSize: 1,
  },
  mt: {
    marginTop: 1,
  },
  mb: {
    marginBottom: 1,
  },
  mr: {
    marginRight: 1,
  },
  ml: {
    marginLeft: 1,
  },
  mh: {
    marginLeft: 1,
    marginRight: 1,
  },
  mv: {
    marginTop: 1,
    marginBottom: 1,
  },
  pt: {
    paddingTop: 1,
  },
  pb: {
    paddingBottom: 1,
  },
  pr: {
    paddingRight: 1,
  },
  pl: {
    paddingLeft: 1,
  },
  ph: {
    paddingLeft: 1,
    paddingRight: 1,
  },
  pv: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  h: {
    height: 1,
  },
  w: {
    width: 1,
  },
  minh: {
    minHeight: 1,
  },
  minw: {
    minWidth: 1,
  },
  maxh: {
    maxHeight: 1,
  },
  maxw: {
    maxWidth: 1,
  },
  r: {
    right: 1,
  },
  l: {
    left: 1,
  },
  t: {
    top: 1,
  },
  b: {
    bottom: 1,
  },
  lh: {
    lineHeight: 1,
  },
  br: {
    borderRadius: 1,
  },
};

const pointStyles: StylesResult = {
  bw: {
    borderWidth: 1,
  },
  btw: {
    borderTopWidth: 1,
  },
  brw: {
    borderRightWidth: 1,
  },
  bbw: {
    borderBottomWidth: 1,
  },
  blw: {
    borderLeftWidth: 1,
  },
};

const staticStyles: StylesResult = {
  // No border radius
  'br__bottom': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
  },
  'br__top': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
  },
  'br__left': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
  },
  'br__right': {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
  },

  // absolute
  absolute: {
    position: 'absolute',
  },
  'absolute__fill': {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  // flexbox
  'flx_i': {
    flex: 1,
  },
  'flx_grow': {
    flexGrow: 1,
  },
  'flx_row': {
    flexDirection: 'row',
  },
  'flx_rr': {
    flexDirection: 'row-reverse',
  },
  'flx_cr': {
    flexDirection: 'column-reverse',
  },
  'flx_wrap': {
    flexWrap: 'wrap',
  },
  aifs: {
    alignItems: 'flex-start',
  },
  aic: {
    alignItems: 'center',
  },
  aife: {
    alignItems: 'flex-end',
  },
  asfs: {
    alignSelf: 'flex-start',
  },
  asc: {
    alignSelf: 'center',
  },
  asfe: {
    alignSelf: 'flex-end',
  },
  ass: {
    alignSelf: 'stretch',
  },
  jcfe: {
    justifyContent: 'flex-end',
  },
  jcc: {
    justifyContent: 'center',
  },
  jcsb: {
    justifyContent: 'space-between',
  },
  jcsa: {
    justifyContent: 'space-around',
  },

  // Image
  'rm_contain': {
    resizeMode: 'contain',
  },
  'rm_cover': {
    resizeMode: 'cover',
  },
  'rm_stretch': {
    resizeMode: 'stretch',
  },

  // Text
  i: {
    fontStyle: 'italic',
  },
  tl: {
    textAlign: 'left',
  },
  tc: {
    textAlign: 'center',
  },
  tr: {
    textAlign: 'right',
  },
  tj: {
    textAlign: 'justify',
  },
};

const multiplyStylesValues = (styles: StylesResult, multiplicators: Multiplicators): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(styles).map(key => {
    if (key.includes('__')) {
      resultStyles[key] = styles[key];
    }
    else {
      Object.keys(multiplicators).map(prefix => {
        const multiplicatorValue: number = multiplicators[prefix];
        const multiplyedStyle: Style = {};

        Object.keys(styles[key]).map((styleKey: string) => {
          const oldStyleValue = styles[key][styleKey];
          if (typeof oldStyleValue === 'number') {
            multiplyedStyle[styleKey] = oldStyleValue * multiplicatorValue;
          }
          else {
            multiplyedStyle[styleKey] = oldStyleValue;
          }
        });

        resultStyles[key + prefix] = multiplyedStyle;
      });
    }
  });
  return resultStyles;
};

const multiplyToRem = (remValue: number, multiplicators: Multiplicators): Multiplicators => {
  const multiplied: Multiplicators = {};
  Object.keys(multiplicators).map(prefix => {
    const multiplicatorValue: number = multiplicators[prefix];
    multiplied[prefix] = Math.round(multiplicatorValue * remValue * 100) / 100;
  });
  return multiplied;
};

const generatePalette = (colors: Palette): Palette => {
  const resultPalette: Palette = {};
  Object.keys(colors).map(name => {
    const color: string = colors[name];
    resultPalette[name] = color;

    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = Color(color).alpha(i / 100).rgb().string();
      resultPalette[`${name}_${i}`] = rgbString;
    }
  });
  return resultPalette;
};

const generateStylesPalette = (colors: Palette): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(colors).map(name => {
    const color: string = colors[name];
    resultStyles[`bg_${name}`] = { backgroundColor: color };
    resultStyles[name] = { color: color };
    resultStyles[`b_${name}`] = { borderColor: color };
    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = Color(color).alpha(i / 100).rgb().string();
      resultStyles[`bg_${name}_${i}`] = { backgroundColor: rgbString };
      resultStyles[`${name}_${i}`] = { color: rgbString };
      resultStyles[`b_${name}_${i}`] = { borderColor: rgbString };
    }
  });
  return resultStyles;
};

const generateOpacity = (): StylesResult => {
  const resultStyles: StylesResult = {};
  for (let i: number = 5; i < 100; i += 5) {
    const opacity: number = i / 100;
    resultStyles[`o_${i}`] = { opacity };
  }
  return resultStyles;
};

const generateFonts = (fonts: Palette): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(fonts).map(name => {
    const fontFamily: string = fonts[name];
    resultStyles[`f_${name}`] = { fontFamily };
  });
  return resultStyles;
};

const generateFontWeights = (weights: Palette): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(weights).map(name => {
    const fontWeight: string = weights[name];
    resultStyles[`${name}`] = { fontWeight };
  });
  return resultStyles;
};

export interface Options {
  remSize?: number,
  multiplicators?: Multiplicators,
  headings?: Multiplicators
  palette?: Palette,
  fonts?: Palette,
  fontWeights?: Palette
}

interface BuildStyles {
  s: StylesResult,
  sizes: Multiplicators,
  colors: Palette
  build: (
    defaultOptions: Options,
    callback?: () => any,
  ) => void,
}

const buildStyles: BuildStyles = {
  s: {},
  sizes: {},
  colors: {},

  build: (defaultOptions: Options = {}, callback = () => {}) => {

    const remSize = defaultOptions.remSize || 16;
    const multiplicators = defaultOptions.multiplicators || defaultMultiplicators;
    const headings = defaultOptions.headings || defaultHeadings;
    const palette = defaultOptions.palette || defaultPalette;
    const fonts = defaultOptions.palette || defaultPalette;
    const fontWeights = defaultOptions.fontWeights || defaultFontWeights;
    assign(buildStyles.colors, generatePalette(palette));
    assign(buildStyles.sizes, multiplyToRem(remSize, multiplicators));
    assign(buildStyles.s, RN.StyleSheet.create({
      ...multiplyStylesValues(pointStyles, multiplicators),
      ...multiplyStylesValues(remStyles, multiplyToRem(remSize, multiplicators)),
      ...multiplyStylesValues({f: {fontSize: 1}}, multiplyToRem(remSize, headings)),
      ...generateStylesPalette(palette),
      ...generateFonts(fonts),
      ...generateFontWeights(fontWeights),
      ...generateOpacity(),
      ...staticStyles,
    }));
    callback();
  },
};

export const defaultMultiplicators: Multiplicators = {
  '0': 0,
  '025': 0.25,
  '05': 0.5,
  '075': 0.75,
  '085': 0.85,
  '1': 1,
  '115': 1.15,
  '125': 1.25,
  '15': 1.5,
  '175': 1.75,
  '185': 1.85,
  '2': 2,
  '225': 2.25,
  '25': 2.5,
  '275': 2.75,
  '3': 3,
  '325': 3.25,
  '35': 3.5,
  '375': 3.75,
  '4': 4,
  '45': 4.5,
  '5': 5,
  '55': 5.5,
  '6': 6,
  '65': 6.5,
  '7': 7,
  '75': 7.5,
  '8': 8,
};

export const defaultHeadings: Multiplicators = {
  '6': 0.875,
  '5': 1,
  '4': 1.25,
  '3': 1.75,
  '2': 2.35,
  '1': 3.25,
};

export const defaultPalette: Palette = {
  white: 'rgb(255,255,255)',
  black: 'rgb(0,0,0)',
};

export const defaultFontWeights: Palette = {
  normal: 'normal',
  b: 'bold',
  fw1: '100',
  fw2: '200',
  fw3: '300',
  fw4: '400',
  fw5: '500',
  fw6: '600',
  fw7: '700',
  fw8: '800',
  fw9: '900',
};

export default buildStyles;
export const {colors, s, sizes} = buildStyles;
