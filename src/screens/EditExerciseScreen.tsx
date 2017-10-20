import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s, colors } from 'react-native-better-styles'
import LinearGradient from 'react-native-linear-gradient'

import ScreenContainer from '../components/ScreenContainer'
import { RoundButtonSm } from '../components/Buttons'
import Navbar from '../components/Navbar'
import { stores } from '../store'
import { Exercise } from '../store/dataStore'
import * as Route from '../routes'

type EditExerciseScreenProps = {
  dataStore: typeof stores.dataStore
  uiStore: typeof stores.uiStore
  routing: typeof stores.routing
} & Route.EditExerciseRouteProps

type EditExerciseScreenState = {
  title: string
  primaryMusclesIds: string[]
  secondaryMusclesIds: string[]
}

@MobxReact.inject('dataStore', 'routing', 'uiStore')
@MobxReact.observer
export default class EditExerciseScreen extends React.Component<EditExerciseScreenProps, EditExerciseScreenState> {
  constructor(props: EditExerciseScreenProps) {
    super(props)
    this.state = {
      title: props.exerciseTemplate.title,
      primaryMusclesIds: props.exerciseTemplate.primaryMuscles.map(m => m.id),
      secondaryMusclesIds: props.exerciseTemplate.secondaryMuscles.map(m => m.id)
    }
  }

  togglePrimary = (muscleId: string) => {
    const { primaryMusclesIds, secondaryMusclesIds } = this.state
    const currentIndex = primaryMusclesIds.indexOf(muscleId)
    if (currentIndex === -1) {
      this.setState({
        primaryMusclesIds: [...primaryMusclesIds, muscleId],
        secondaryMusclesIds: secondaryMusclesIds.filter(id => id !== muscleId)
      })
    } else {
      this.setState({
        primaryMusclesIds: primaryMusclesIds.filter(id => id !== muscleId),
        secondaryMusclesIds: secondaryMusclesIds.filter(id => id !== muscleId)
      })
    }
  }

  toggleSecondary = (muscleId: string) => {
    const { primaryMusclesIds, secondaryMusclesIds } = this.state
    const currentIndex = secondaryMusclesIds.indexOf(muscleId)
    if (currentIndex === -1) {
      this.setState({
        secondaryMusclesIds: [...secondaryMusclesIds, muscleId],
        primaryMusclesIds: primaryMusclesIds.filter(id => id !== muscleId)
      })
    } else {
      this.setState({
        primaryMusclesIds: primaryMusclesIds.filter(id => id !== muscleId),
        secondaryMusclesIds: secondaryMusclesIds.filter(id => id !== muscleId)
      })
    }
  }

  render() {
    const { routing, dataStore, exerciseTemplate, uiStore, setToAdd } = this.props
    const { title, primaryMusclesIds, secondaryMusclesIds } = this.state
    const upperMuscles = dataStore.muscles.filter(m => m.bodyPart === 'upper')
    const lowerMuscles = dataStore.muscles.filter(m => m.bodyPart === 'lower')

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
      >
        <Navbar
          title={'Edit Exercise'}
          leftAction={routing.goBack}
          rightAction={() => {
            if (title !== '' && primaryMusclesIds.length > 0) {
              exerciseTemplate.setTitle(title)
              exerciseTemplate.updatePrimaryMusclesByIds(primaryMusclesIds)
              exerciseTemplate.updateSecondaryMusclesByIds(secondaryMusclesIds)
              exerciseTemplate.save()
              if (setToAdd) setToAdd.addExercise(new Exercise(exerciseTemplate))
              routing.goBack()
            } else {
              uiStore.createNotification({
                message: 'Exercise must have a title and al least one primary affected muscle',
                type: 'ERROR'
              })
            }
          }}
          rightBtn={<RN.Text style={[s.f_pn, s.f4, s.blueDark, { letterSpacing: -0.5 }]}>Done</RN.Text>}
        />
        <RN.View style={[s.m1, s.h55, s.br025, s.bg_greyLighter, s.ph125, s.pv05, s.jcc]}>
          <RN.TextInput
            value={title}
            underlineColorAndroid={colors.t}
            placeholderTextColor={colors.grey}
            multiline
            onChangeText={title => this.setState({ title })}
            style={[s.bg_t, s.f3, s.f_pn, s.fw3, s.flx_i, s.black, { letterSpacing: -0.75 }]}
            placeholder="Exercise title..."
          />
        </RN.View>
        <RN.View style={s.flx_i}>
          <RN.ScrollView style={s.flx_i} contentContainerStyle={[s.pl125, s.pv125]}>
            <RN.Text style={[s.f_pn, s.fw7, s.fs065, s.grey, { letterSpacing: 1.5 }]}>SELECT AFFECTED MUSCLES</RN.Text>
            <RN.Text style={[s.f_pn, s.fw7, s.f4, s.black, s.mt15, { letterSpacing: -0.55 }]}>Upper Body</RN.Text>
            {upperMuscles.map((m, i) => (
              <MuscleView
                key={m.id}
                title={m.title}
                isPrimary={primaryMusclesIds.indexOf(m.id) !== -1}
                isSecondary={secondaryMusclesIds.indexOf(m.id) !== -1}
                onTogglePrimary={() => this.togglePrimary(m.id)}
                onToggleSecondary={() => this.toggleSecondary(m.id)}
                hideBorder={i === upperMuscles.length - 1}
              />
            ))}
            <RN.Text style={[s.f_pn, s.fw7, s.f4, s.black, s.mt15, { letterSpacing: -0.55 }]}>Lower Body</RN.Text>
            {lowerMuscles.map((m, i) => (
              <MuscleView
                key={m.id}
                title={m.title}
                isPrimary={primaryMusclesIds.indexOf(m.id) !== -1}
                isSecondary={secondaryMusclesIds.indexOf(m.id) !== -1}
                onTogglePrimary={() => this.togglePrimary(m.id)}
                onToggleSecondary={() => this.toggleSecondary(m.id)}
                hideBorder={i === lowerMuscles.length - 1}
              />
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

type MuscleViewProps = {
  title: string
  isPrimary: boolean
  isSecondary: boolean
  onTogglePrimary: () => void
  onToggleSecondary: () => void
  hideBorder: boolean
}

class MuscleView extends React.PureComponent<MuscleViewProps> {
  render() {
    const { title, isPrimary, isSecondary, onTogglePrimary, onToggleSecondary, hideBorder } = this.props
    return (
      <RN.View style={[s.bbw1, hideBorder ? s.b_t : s.b_greyLighter_70, s.pv1, s.pr15, s.flx_row, s.jcsb]}>
        <RN.Text numberOfLines={1} style={[s.f_pn, s.f4, s.fw3, s.black, s.ass, { letterSpacing: -0.5 }]}>
          {title}
        </RN.Text>
        <RN.View style={s.flx_row}>
          <RoundButtonSm style={s.mr05} isActive={isPrimary} onPress={onTogglePrimary} label="Primary" />
          <RoundButtonSm style={s.ph075} isActive={isSecondary} onPress={onToggleSecondary} label="Secondary" />
        </RN.View>
      </RN.View>
    )
  }
}
