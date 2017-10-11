import * as BS from 'react-native-better-styles'

// prettier-ignore
export const palette: BS.Palette = {
  white:          '#ffffff',
  black:          '#000000',
  deepSkyBlue:    '#188af5',
  darkGrey:       '#262628',
  slateGrey:      '#5d5d6b',
  marine:         '#032f49',
  slate:          '#5b697a',
  steel:          '#88889c',
  darkKnight:     '#56545a',
  asphalt:        '#322f37',
  red:            'rgb(255,144,144)',
  green:          'rgb(42,188,109)',
  almostBlack:    'rgb(12,21,32)',
  gunmetal:       'rgb(81,92,97)',
  aquaMarine:     'rgb(56,213,227)',
  pinkishOrange:  'rgb(255,100,51)',
  golden:         'rgb(241,197,0)',
  waterBlue:      'rgb(14,131,189)',
  t:              'rgba(255,255,255,0)',
  tb:             'rgba(0,0,0,0)',
  paleGrey:       'rgb(227,227,233)',
  coolGrey:       'rgb(172, 180, 190)',
  weirdGreen:     '#55e797',
  topaz:          '#11cdb6',
  orangeyRed:     'rgb(249,95,53)',
  redPink:        'rgb(246,43,101)',
  skyBlue:        'rgb(106,202,255)',
  charcoalGrey:        'rgb(56,56,64)',
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
  // ps:        RN.Platform.OS === 'ios' ? 'Product Sans' : 'Product Sans Regular',
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
    shadowRadius: 4,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
}
