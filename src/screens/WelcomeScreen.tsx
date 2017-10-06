import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s } from 'react-native-better-styles'
import * as Orientation from 'react-native-orientation'

// import { Link, Redirect } from '../components/Router'
import ScreenContainer from '../components/ScreenContainer'
import { stores } from '../store'

type WelcomeScreenProps = {
  dataStore: typeof stores.dataStore
}

@MobxReact.inject('dataStore')
@MobxReact.observer
export default class WelcomeScreen extends React.Component<WelcomeScreenProps> {
  componentWillMount() {
    Orientation.lockToPortrait()
  }

  render() {
    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        style={[s.bg_white, s.jcc, s.ph2]}
      >
        <RN.Text style={[s.f_ps, s.f1, s.black, s.tc, s.mb05]}>Welcome</RN.Text>
        <RN.Text style={[s.f_ps, s.f4, s.black, s.tc, s.mb4]}>
          Select from below to create your account or log in
        </RN.Text>

        {/* <Link to={{ path: '/signup' }} style={[s.mb05, s.h3, s.br025, s.bg_deepSkyBlue, s.ass, s.jcc]}>
          <RN.Text style={[s.f_ps, s.f4, s.white, s.tc, s.mb, s.bg_t]}>Create an Account</RN.Text>
        </Link>
        <Link to={{ path: '/login' }} style={[s.mb05, s.h3, s.br025, s.b_deepSkyBlue, s.bw1, s.ass, s.jcc]}>
          <RN.Text style={[s.f_ps, s.f4, s.deepSkyBlue, s.tc, s.mb, s.bg_t]}>I Already Have an Account</RN.Text>
        </Link> */}
      </ScreenContainer>
    )
  }
}
