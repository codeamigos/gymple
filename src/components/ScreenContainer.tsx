import * as React from 'react'
import * as RN from 'react-native'
import { s, colors } from 'react-native-better-styles'
import LinearGradient from 'react-native-linear-gradient'
import KeyboardSpacer from 'react-native-keyboard-spacer'

type ScreenContainerProps = {
  gradient?: {
    colors: string[]
    start: { x: number; y: number }
    end: { x: number; y: number }
  }
  statusbar?: {
    hidden?: boolean
    barStyle?: 'light-content' | 'dark-content'
  }
  avoidKeyboard?: boolean
  style?: RN.StyleProp<RN.ViewStyle>
  children: React.ReactNode
}

export default class ScreenContainer extends React.PureComponent<ScreenContainerProps> {
  render() {
    const { gradient, statusbar, style, children, avoidKeyboard } = this.props
    return (
      <RN.View style={[s.flx_i, s.bg_white, statusbar && statusbar.hidden ? null : { paddingTop: 20 }, style]}>
        {gradient &&
          <LinearGradient
            colors={gradient.colors}
            start={gradient.start}
            end={gradient.end}
            style={[s.absolute, s.absolute__fill]}
          />}

        <RN.StatusBar
          animated
          translucent={true}
          hidden={statusbar && statusbar.hidden}
          backgroundColor={colors.t}
          barStyle={statusbar && statusbar.barStyle}
        />
        {children}
        {avoidKeyboard && RN.Platform.OS === 'ios' && <KeyboardSpacer />}
      </RN.View>
    )
  }
}
