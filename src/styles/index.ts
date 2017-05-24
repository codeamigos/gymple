// import {StyleSheet} from 'react-native';
// import {ViewStyle, TextStyle, ImageStyle} from '@types/react-native/index';

export interface Multiplicator {
  [key: string]: number,
}

export interface Color {
  [key: string]: string,
}

export interface Style {
  [key: string]: number | string,
}

export interface StylesResult {
  [key: string]: Style,
}

const defaultMultiplicators: Multiplicator = {
  '0': 0,
  '05': 0.5,
  '075': 0.75,
  '1': 1,
};

const result = (
  remSize: number = 16,
): StylesResult => {

  const borderStyles = generateBorderStyles(defaultMultiplicators);
  const borderRadiusStyles = generateBorderRadiusStyles(multiplyToRem(remSize, defaultMultiplicators));
  const fontSizeStyles = generateFontSizeStyles(multiplyToRem(remSize, defaultMultiplicators));

  return {
    ...borderStyles,
    ...borderRadiusStyles,
    ...fontSizeStyles,
  };
};

const generateBorderStyles = (multiplicators: Multiplicator): StylesResult => {
  return multiplyStylesValues({
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
  }, multiplicators);
};

const generateBorderRadiusStyles = (multiplicators: Multiplicator): StylesResult => {
  return multiplyStylesValues({
    br: {
        borderRadius: 1,
    },
    'br--bottom': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    'br--top': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    'br--left': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    'br--right': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
  },
  multiplicators);
};

const generateFontSizeStyles = (multiplicators: Multiplicator): StylesResult => {
  return multiplyStylesValues({
    fs: {
      fontSize: 1,
    },
  },
  multiplicators);
};

const multiplyStylesValues = (styles: StylesResult, multiplicators: Multiplicator): StylesResult => {
  const resultStyles: StylesResult = {};
  Object.keys(styles).map(key => {
    if (key.includes('--')) {
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

const multiplyToRem = (remValue: number, multiplicators: Multiplicator): Multiplicator => {
  const multiplied: Multiplicator = {};
  Object.keys(multiplicators).map(prefix => {
    const multiplicatorValue: number = multiplicators[prefix];
    multiplied[prefix] = multiplicatorValue * remValue;
  });
  return multiplied;
};

export default result;
