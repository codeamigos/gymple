import * as BS from 'react-native-better-styles'

// prettier-ignore
export const palette: BS.Palette = {
  white:          '#ffffff',
  black:          '#000000',
  greyDarkest:    '#2e333d',
  greyDarker:     '#434b55',
  greyDark:       '#555b65',
  grey:           '#8a949d',
  greyLight:      '#d2dadd',
  greyLighter:    '#e5eaee',
  greyLightest:   '#fafafa',
  blueDark:       '#2b55e4',
  blue:           '#2c5cff',
  blueLight:      '#587eff',
  bluePurple:     '#5c14e3',
  blueBright:     '#0075fd',
  blueBrighter:   '#00a2fd',
  red:            '#ff2b71',
  orange:         '#ff605e',
  yellow:         '#fbcf00',
  tealLight:      '#85e3d1',  
  green:          '#0cddae',
  greenCyan:      '#33ffad',
  greenBaby:      '#7cff94',
  t:              'rgba(255,255,255,0)',
  tb:             'rgba(0,0,0,0)'
}

// prettier-ignore
export const multipliers: BS.Multipliers = {
  '0':        0,
  '025':      0.25,
  '035':      0.35,
  '05':       0.5,
  '065':      0.65,
  '075':      0.75,
  '085':      0.85,
  '1':        1,
  '115':      1.15,
  '125':      1.25,
  '15':       1.5,
  '165':      1.65,
  '175':      1.75,
  '185':      1.85,
  '2':        2,
  '225':      2.25,
  '25':       2.5,
  '265':      2.65,
  '275':      2.75,
  '3':        3,
  '325':      3.25,
  '35':       3.5,
  '375':      3.75,
  '4':        4,
  '425':      4.25,
  '45':       4.5,
  '5':        5,
  '55':       5.5,
  '6':        6,
  '625':       6.25,
  '65':       6.5,
  '7':        7,
  '75':       7.5,
  '8':        8
}

// prettier-ignore
export const headings: BS.Multipliers = {
  '7': 0.75,
  '6': 0.85,
  '5': 1,
  '4': 1.2,
  '3': 1.6,
  '2': 2,
  '1': 3.25
}

// prettier-ignore
export const fonts: BS.Palette = {
  pn:        'Proxima Nova',
}

export interface Shadow {
  shadowColor: string
  shadowOffset?: {
    width: number
    height: number
  }
  shadowRadius: number
  shadowOpacity?: number
}

export const shadows: {
  [key: string]: Shadow
} = {
  sm: {
    shadowColor: palette.black,
    shadowRadius: 8,
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
}
