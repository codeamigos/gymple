import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s /*, colors, sizes  */ } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
// import IonIcon from 'react-native-vector-icons/Ionicons'
// import LinearGradient from 'react-native-linear-gradient'

import { TabButton } from '../components/Buttons'
import ScreenContainer from '../components/ScreenContainer'
// import { shadows } from '../stylesSettings'
// import Popup from '../components/Popup'
import Navbar from '../components/Navbar'
import { stores } from '../store'
// import * as Util from '../utils'

type TrainingsListScreenProps = {
  dataStore: typeof stores.dataStore
  routing: typeof stores.routing
}

@MobxReact.inject('dataStore', 'routing')
@MobxReact.observer
export default class TrainingsListScreen extends React.Component<TrainingsListScreenProps> {
  render() {
    const { routing } = this.props

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        avoidKeyboard
      >
        <Navbar
          title="My trainings"
          leftAction={routing.goBack}
          rightBtn={<Icon name="options" style={[s.blueDark, s.f4]} />}
        />
        <RN.View style={[s.flx_row, s.jcsa, s.p075]}>
          <TabButton label="History" isActive />
          <TabButton label="statistics" />
        </RN.View>
      </ScreenContainer>
    )
  }
}
