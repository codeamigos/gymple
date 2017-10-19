import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s, colors } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import LinearGradient from 'react-native-linear-gradient'

import ScreenContainer from '../components/ScreenContainer'
import { TabButton } from '../components/Buttons'
import Navbar from '../components/Navbar'
import { stores } from '../store'
import * as Route from '../routes'

type SelectExerciseScreenProps = {
  dataStore: typeof stores.dataStore
  routing: typeof stores.routing
} & Route.SelectExerciseRouteProps

type SelectExerciseScreenState = {
  filter: string
}

@MobxReact.inject('dataStore', 'routing')
@MobxReact.observer
export default class SelectExerciseScreen extends React.Component<
  SelectExerciseScreenProps,
  SelectExerciseScreenState
> {
  constructor() {
    super()
    this.state = {
      filter: ''
    }
  }

  render() {
    const { filter } = this.state
    const { dataStore, set, routing } = this.props

    const exercises = dataStore.exercises.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()))

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
      >
        <Navbar
          title={'Select Exercise'}
          leftAction={routing.goBack}
          rightBtn={<Icon name="options" style={[s.blueDark, s.f4]} />}
        />
        <RN.View style={[s.mh05, s.flx_row, s.h265, s.br025, s.bg_greyLighter, s.ph075, s.aic]}>
          <Icon name="magnifier" style={[s.grey, s.f6, s.mr05]} />
          <RN.TextInput
            underlineColorAndroid={colors.t}
            placeholderTextColor={colors.grey}
            style={[s.bg_t, s.f4, s.f_pn, s.fw3, s.flx_i, s.black, s.h25, { letterSpacing: -0.75 }]}
            placeholder="Search through exercises"
            onChangeText={filter => this.setState({ filter })}
          />
        </RN.View>
        <RN.View style={[s.flx_row, s.jcsa, s.p075]}>
          <TabButton label="All" isActive />
          <TabButton label="By muscle" />
          <TabButton label="Recent" />
        </RN.View>
        <RN.View style={s.flx_i}>
          <RN.ScrollView style={s.flx_i} contentContainerStyle={[s.pl125]}>
            {exercises.map(e => (
              <RN.TouchableOpacity
                onPress={() => {
                  set.addExercise(e)
                  routing.goBack()
                }}
                key={e.id}
                style={[s.bbw1, s.b_greyLighter_70, s.pv1, s.pr15]}
              >
                <RN.Text style={[s.f_pn, s.f4, s.fw3, s.black, { letterSpacing: -0.5 }]}>{e.title}</RN.Text>
                <RN.Text style={[s.f_pn, s.f7, s.fw3, s.grey, { letterSpacing: -0.5 }]}>
                  {[...e.primaryMuscles, ...e.secondaryMuscles].map(m => m.title).join(', ')}
                </RN.Text>
              </RN.TouchableOpacity>
            ))}
          </RN.ScrollView>
          <LinearGradient
            style={[s.h075, s.absolute, s.l0, s.r0, s.t0]}
            colors={[colors.greyLighter, colors.greyLighter_10]}
          />
        </RN.View>
      </ScreenContainer>
    )
  }
}
