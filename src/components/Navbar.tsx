import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

type NavbarProps = {
  leftAction?: () => void
  rightAction?: () => void
  leftBtn?: React.ReactChild
  rightBtn?: React.ReactChild
  title: string | number
}

@MobxReact.observer
export default class Navbar extends React.Component<NavbarProps> {
  render() {
    const { leftAction, leftBtn, rightAction, rightBtn, title } = this.props
    return (
      <RN.View style={s.h265}>
        <RN.Text style={[s.f_pn, s.fw3, s.f4, s.black, s.tc, s.absolute, s.asc, s.t05, { letterSpacing: -0.55 }]}>
          {title}
        </RN.Text>
        <RN.View style={[s.flx_row, s.jcsb, s.aic]}>
          <RN.TouchableOpacity style={[s.h265, s.ph05, s.jcc]} onPress={leftAction}>
            {leftBtn || <Icon name="arrow-left" style={[s.blueDark, s.f4]} />}
          </RN.TouchableOpacity>
          {rightBtn ? (
            <RN.TouchableOpacity style={[s.h265, s.ph05, s.jcc]} onPress={rightAction}>
              {rightBtn}
            </RN.TouchableOpacity>
          ) : (
            <RN.View />
          )}
        </RN.View>
      </RN.View>
    )
  }
}
