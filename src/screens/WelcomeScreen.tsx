import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s } from 'react-native-better-styles'

import { Link } from '../components/Router'
import ScreenContainer from '../components/ScreenContainer'
import { stores } from '../store'
import { FinishedTraining } from '../store/dataStore'

type WelcomeScreenProps = {
  dataStore: typeof stores.dataStore
}

@MobxReact.inject('dataStore')
@MobxReact.observer
export default class WelcomeScreen extends React.Component<WelcomeScreenProps> {
  render() {
    const training = new FinishedTraining()

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        style={[s.jcc, s.ph3]}
      >
        <Link
          to={{ path: '/training', props: { training } }}
          style={[s.mb05, s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
        >
          <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t]}>New training</RN.Text>
        </Link>
      </ScreenContainer>
    )
  }
}
