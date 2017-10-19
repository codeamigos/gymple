import * as React from 'react'
import * as RN from 'react-native'
import { s, colors } from 'react-native-better-styles'
import LinearGradient from 'react-native-linear-gradient'

type RoundButtonProps = {
  isActive?: boolean
  label: string
  style?: RN.StyleProp<RN.ViewStyle>
  onPress?: () => void
}

export class RoundButton extends React.Component<RoundButtonProps> {
  render() {
    const { isActive, label, style, onPress } = this.props
    return (
      <RN.TouchableOpacity style={s.flx_row} onPress={onPress}>
        <LinearGradient
          style={[s.h175, s.br085, s.ph15, style, s.aic, s.jcc, !isActive ? s.b_blueDark : s.b_t]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={isActive ? [colors.blueDark, colors.blueBright] : [colors.t, colors.t]}
        >
          <RN.Text style={[s.f_pn, s.f7, s.fw7, s.bg_t, s.tc, isActive ? s.white : s.blueDark, { letterSpacing: 1.5 }]}>
            {label.toLocaleUpperCase()}
          </RN.Text>
        </LinearGradient>
      </RN.TouchableOpacity>
    )
  }
}

export class RoundButtonSm extends React.Component<RoundButtonProps> {
  render() {
    const { isActive, label, style, onPress } = this.props
    return (
      <RN.TouchableOpacity style={s.flx_row} onPress={onPress}>
        <LinearGradient
          style={[s.h15, s.br075, s.ph125, style, s.aic, s.jcc, s.bw1, !isActive ? s.b_blueDark : s.b_t]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={isActive ? [colors.blueDark, colors.blueBright] : [colors.t, colors.t]}
        >
          <RN.Text
            style={[s.f_pn, s.fs065, s.fw7, s.bg_t, s.tc, isActive ? s.white : s.blueDark, { letterSpacing: 1.5 }]}
          >
            {label.toLocaleUpperCase()}
          </RN.Text>
        </LinearGradient>
      </RN.TouchableOpacity>
    )
  }
}

export class TabButton extends React.Component<RoundButtonProps> {
  render() {
    const { isActive, label, style, onPress } = this.props
    return (
      <RN.TouchableOpacity style={s.flx_row} onPress={onPress}>
        <LinearGradient
          style={[s.h175, s.br085, s.ph15, style, s.aic, s.jcc]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={isActive ? [colors.blueDark, colors.blueBright] : [colors.t, colors.t]}
        >
          <RN.Text style={[s.f_pn, s.f7, s.fw7, s.bg_t, s.tc, isActive ? s.white : s.blueDark, { letterSpacing: 1.5 }]}>
            {label.toLocaleUpperCase()}
          </RN.Text>
        </LinearGradient>
      </RN.TouchableOpacity>
    )
  }
}
