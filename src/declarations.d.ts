declare module 'react-native-vector-icons/Ionicons' {
  import * as R from 'react'
  import * as RN from 'react-native'

  export interface Props {
    size?: number
    name: string
    color?: string
    style?: RN.StyleProp<RN.TextStyle>
  }

  export default class Icon extends R.Component<Props> {}
}

declare module 'react-native-vector-icons/SimpleLineIcons' {
  import * as R from 'react'
  import * as RN from 'react-native'

  export interface Props {
    size?: number
    name: string
    color?: string
    style?: RN.StyleProp<RN.TextStyle>
  }

  export default class Icon extends R.Component<Props> {}
}

declare module 'react-native-keyboard-spacer' {
  import * as React from 'react'
  import * as RN from 'react-native'

  export interface KeyboardSpacerProps {
    topSpacing?: number
    onToggle?: () => void
  }
  export default class KeyboardSpacer extends React.Component<KeyboardSpacerProps> {}
}

declare module 'react-native-linear-gradient' {
  import * as R from 'react'
  import * as RN from 'react-native'

  export interface Props {
    children?: React.ReactNode
    start?: { x: number; y: number }
    end?: { x: number; y: number }
    locations?: number[]
    colors: string[]
    style?: RN.StyleProp<RN.ViewStyle>
  }

  export default class LinearGradient extends R.Component<Props> {}
}

declare module 'react-native-swipeout' {
  import * as R from 'react'
  import * as RN from 'react-native'

  export interface SwipeoutButton {
    backgroundColor?: string
    color?: string
    component?: R.ReactElement<any>
    onPress?: () => any
    text?: string
    type?: 'default' | 'primary' | 'secondary'
    underlayColor?: string
    disabled?: boolean
  }

  export interface Props {
    autoClose?: boolean
    backgroundColor?: string
    close?: boolean
    disabled?: boolean
    left?: SwipeoutButton[]
    onOpen?: (sectionID: number, rowId: number, direction: string) => void
    onClose?: (sectionID: number, rowId: number, direction: string) => void
    right?: SwipeoutButton[]
    scroll?: (isScrollAllowed: boolean) => void
    style?: RN.StyleProp<RN.ViewStyle>
    sensitivity?: number
    buttonWidth?: number
  }

  export default class Swipeout extends R.Component<Props> {}
}
