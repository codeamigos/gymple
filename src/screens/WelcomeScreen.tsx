import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s } from 'react-native-better-styles'
import { Link } from '../components/Router'
import ScreenContainer from '../components/ScreenContainer'
import { stores } from '../store'
import { Set, Exercise } from '../store/dataStore'

type WelcomeScreenProps = {
  dataStore: typeof stores.dataStore
}

@MobxReact.inject('dataStore')
@MobxReact.observer
export default class WelcomeScreen extends React.Component<WelcomeScreenProps> {
  render() {
    const set = new Set({
      id: '1',
      attemptsAmount: 1,
      recoverSec: 90,
      exercises: []
    })
    const exercise = new Exercise({
      id: '1',
      title: '',
      imgSrc: '',
      inventoryIds: [],
      primaryMusclesIds: [],
      secondaryMusclesIds: [],
      weight: 0,
      type: {
        kind: 'repetitions',
        count: 10
      }
    })

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        style={[s.jcc, s.ph3]}
      >
        <Link to={{ path: '/set', props: { set } }} style={[s.mb05, s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}>
          <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t]}>Edit Set</RN.Text>
        </Link>
        <Link
          to={{ path: '/editexercise', props: { exercise } }}
          style={[s.mb05, s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
        >
          <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t]}>Edit Set</RN.Text>
        </Link>
      </ScreenContainer>
    )
  }
}
