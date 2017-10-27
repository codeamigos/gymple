import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import * as moment from 'moment'
import { s, colors } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'

import { TabButton } from '../components/Buttons'
import ScreenContainer from '../components/ScreenContainer'
import { shadows } from '../stylesSettings'
// import Popup from '../components/Popup'
import Navbar from '../components/Navbar'
import { stores } from '../store'
import { FinishedTraining } from '../store/dataStore'
// import * as Util from '../utils'

type TrainingsListScreenProps = {
  dataStore: typeof stores.dataStore
  routing: typeof stores.routing
}

@MobxReact.inject('dataStore', 'routing')
@MobxReact.observer
export default class TrainingsListScreen extends React.Component<TrainingsListScreenProps> {
  createNewTraining = () => {
    const { dataStore, routing } = this.props
    const finishedTraining = new FinishedTraining()
    routing.push({ route: { path: '/training', props: { training: finishedTraining } } })
    dataStore.addFinishedTraining(finishedTraining)
    dataStore.saveFinishedTrainings()
  }

  render() {
    const { dataStore, routing } = this.props
    const { finishedTrainings } = dataStore

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        avoidKeyboard
      >
        <Navbar
          title="My trainings"
          rightAction={this.createNewTraining}
          rightBtn={<RN.Text style={[s.f_pn, s.f4, s.blueDark, { letterSpacing: -0.5 }]}>Start new</RN.Text>}
        />
        <RN.View style={[s.flx_row, s.jcsa, s.p075]}>
          <TabButton label="History" isActive />
          <TabButton label="statistics" />
        </RN.View>
        <RN.View style={s.flx_i}>
          {finishedTrainings.length > 0 ? (
            <RN.ScrollView style={s.flx_i} contentContainerStyle={[s.ph125, s.pb2, s.pt1]}>
              <RN.Text style={[s.f_pn, s.fw7, s.f7, s.grey, s.mb1, { letterSpacing: 1.5 }]}>THIS WEEK</RN.Text>
              {finishedTrainings.map((training, i) => (
                <FinishedTrainingView
                  key={training.id}
                  onRemove={() => {
                    dataStore.removeFinishedTraining(training)
                    dataStore.saveFinishedTrainings()
                  }}
                  onPress={() => routing.push({ route: { path: '/training', props: { training } } })}
                  training={training}
                  index={i}
                />
              ))}
            </RN.ScrollView>
          ) : (
            <RN.View style={[s.flx_i, s.jcc, s.aic, s.ph3, s.pb3]}>
              <IonIcon name="ios-clipboard-outline" style={[s.greyLighter, s.fs4, s.tc]} />
              <RN.Text style={[s.f_pn, s.f3, s.tc, s.greyLighter, s.mb3, { letterSpacing: -0.5 }]}>
                There is no finished trainings
              </RN.Text>
              <RN.TouchableOpacity
                onPress={this.createNewTraining}
                style={[s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
              >
                <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t, { letterSpacing: -0.5 }]}>
                  Start the first one
                </RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
          )}
          <LinearGradient
            style={[s.h075, s.absolute, s.l0, s.r0, s.t0]}
            colors={[colors.greyLighter, colors.greyLighter_10]}
          />
        </RN.View>
      </ScreenContainer>
    )
  }
}

type FinishedTrainingViewProps = {
  onRemove: () => void
  onPress: () => void
  training: FinishedTraining
  index: number
}

@MobxReact.observer
class FinishedTrainingView extends React.Component<FinishedTrainingViewProps> {
  private animatedValue: RN.Animated.Value = new RN.Animated.Value(0)

  componentDidMount() {
    const { index } = this.props
    setTimeout(this.startAnimation, 100 * index)
  }

  startAnimation = () => {
    RN.Animated
      .timing(this.animatedValue, {
        toValue: 100,
        duration: 200
      })
      .start()
  }

  render() {
    const { training, onPress } = this.props

    const exercises = training.completedSets.reduce((acc, set) => [...acc, ...set.exercises], [])
    const duration = moment(training.finishedAt).diff(moment(training.startedAt), 'minutes')

    const affectedMuscles = exercises.reduce((acc, exercise) => [...acc, ...exercise.primaryMuscles], [])

    const muscleUsing: { [key: string]: number } = affectedMuscles.map(m => m.title).reduce(function(acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1
      } else {
        acc[curr] += 1
      }

      return acc
    }, {})

    return (
      <RN.Animated.View
        style={[
          s.bw1,
          s.bg_white,
          s.b_greyLighter,
          shadows.sm,
          s.mb1,
          {
            opacity: this.animatedValue.interpolate({ inputRange: [0, 100, 200], outputRange: [0, 1, 0] }),
            transform: [
              {
                scale: this.animatedValue.interpolate({ inputRange: [0, 100, 200], outputRange: [1.1, 1, 0.9] })
              }
            ]
          }
        ]}
      >
        <RN.View style={[s.flx_row, s.jcsb, s.ph1, s.pv075]}>
          <RN.TouchableOpacity onPress={onPress}>
            <RN.Text style={[s.f_pn, s.fw7, s.f7, s.blueDark, { letterSpacing: 1.5 }]}>
              {moment(training.finishedAt)
                .format('DD MMM')
                .toUpperCase()}
            </RN.Text>
            <RN.Text style={[s.f_pn, s.f4, s.fw3, s.blueDark, { letterSpacing: -0.5 }]}>{training.title}</RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity>
            <Icon name="options" style={[s.blueDark, s.f5]} />
          </RN.TouchableOpacity>
        </RN.View>
        {training.completedSets.length > 0 ? (
          <RN.View>
            <RN.View style={[s.flx_row, s.jcsa, s.pv025, s.bg_greyLightest, s.aic]}>
              <RN.View style={[s.flx_i, s.pv05]}>
                <RN.Text style={[s.f_pn, s.fw7, s.mb025, s.f7, s.grey, s.tc, { letterSpacing: 1.5 }]}>SETS</RN.Text>
                <RN.Text style={[s.f_pn, s.f4, s.tc, s.fw3, s.black, { letterSpacing: -0.5 }]}>
                  {training.completedSets.length}
                </RN.Text>
              </RN.View>
              <RN.View style={[s.w05, s.h05, s.br025, s.bg_greyLighter]} />
              <RN.View style={[s.flx_i, s.pv05]}>
                <RN.Text style={[s.f_pn, s.fw7, s.mb025, s.f7, s.grey, s.tc, { letterSpacing: 1.5 }]}>
                  EXERCISES
                </RN.Text>
                <RN.Text style={[s.f_pn, s.f4, s.tc, s.fw3, s.black, { letterSpacing: -0.5 }]}>
                  {exercises.length}
                </RN.Text>
              </RN.View>
              <RN.View style={[s.w05, s.h05, s.br025, s.bg_greyLighter]} />
              <RN.View style={[s.flx_i, s.pv05]}>
                <RN.Text style={[s.f_pn, s.fw7, s.mb025, s.f7, s.grey, s.tc, { letterSpacing: 1.5 }]}>DURATION</RN.Text>
                <RN.Text style={[s.f_pn, s.f4, s.tc, s.fw3, s.black, { letterSpacing: -0.5 }]}>{duration}m</RN.Text>
              </RN.View>
            </RN.View>
            <RN.View style={[s.pv075, s.ph1]}>
              <RN.Text style={[s.f_pn, s.fw7, s.mb025, s.f7, s.grey, { letterSpacing: 1.5 }]}>
                MOST AFFECTED MUSCLES
              </RN.Text>
              <RN.Text style={[s.f_pn, s.f6, s.fw3, s.greyDark, { letterSpacing: -0.5 }]}>
                {Object.keys(muscleUsing)
                  .sort()
                  .slice(0, 3)
                  .map(muscleTitle => {
                    const percUsing = Math.round(muscleUsing[muscleTitle] / affectedMuscles.length * 100)
                    return muscleTitle + ' ' + percUsing + '%'
                  })
                  .join(', ')}
              </RN.Text>
            </RN.View>
          </RN.View>
        ) : (
          <RN.View style={[s.jcc, s.aic, s.flx_row, s.ph2, s.pb075]}>
            <IonIcon name="ios-clipboard-outline" style={[s.greyLighter, s.f1, s.mr1, s.tc]} />
            <RN.Text style={[s.f_pn, s.f4, s.greyLighter, { letterSpacing: -0.5 }]}>
              There is no sets/exercises in this training
            </RN.Text>
          </RN.View>
        )}
      </RN.Animated.View>
    )
  }
}
