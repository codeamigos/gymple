import Color from 'color';

// import {StyleSheet} from 'react-native';
// import {ViewStyle, TextStyle, ImageStyle} from '@types/react-native/index';

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

const defaultMultiplicators: Multiplicators = {
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
  '7': 7,
  '8': 8,
};

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
};

const pointStyles = {
  ba: {
    borderWidth: 1,
  },
  bt: {
    borderTopWidth: 1,
  },
  br: {
    borderRightWidth: 1,
  },
  bb: {
    borderBottomWidth: 1,
  },
  bl: {
    borderLeftWidth: 1,
  },
};

const staticStyles = {
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
    multiplied[prefix] = multiplicatorValue * remValue;
  });
  return multiplied;
};

const generatePalette = (colors: Palette): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(colors).map(name => {
    const color: string = colors[name];
    resultStyles[`bg_${name}`] = { backgroundColor: color };
    resultStyles[name] = { color: color };
    resultStyles[`b_${name}`] = { borderColor: color };
    for (let i: number = 5; i < 100; i += 5) {
      const rgbString: string = new Color(color).alpha(i / 100).rgb().string();
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

export default (
  remSize: number = 16,
  headings: Multiplicators = {
    '6': 0.875,
    '5': 1,
    '4': 1.25,
    '3': 1.75,
    '2': 2.35,
    '1': 3.25,
  },
  palette: Palette = {},
  fonts: Palette = {},
): StylesResult => {

  return {
    ...multiplyStylesValues(pointStyles, defaultMultiplicators),
    ...multiplyStylesValues(remStyles, multiplyToRem(remSize, defaultMultiplicators)),
    ...multiplyStylesValues({f: {fontSize: 1}}, multiplyToRem(remSize, headings)),
    ...generatePalette(palette),
    ...generateFonts(fonts),
    ...generateOpacity(),
    ...staticStyles,
  };
};
