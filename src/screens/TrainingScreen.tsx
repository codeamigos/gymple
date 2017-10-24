import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s, colors, sizes } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'

import { TabButton } from '../components/Buttons'
import ScreenContainer from '../components/ScreenContainer'
import { shadows } from '../stylesSettings'
import Popup from '../components/Popup'
import Navbar from '../components/Navbar'
import { Set } from '../store/dataStore'
import { stores } from '../store'
import * as Route from '../routes'
import * as Util from '../utils'

type TrainingScreenProps = {
  dataStore: typeof stores.dataStore
  routing: typeof stores.routing
} & Route.TrainingRouteProps

type TrainingScreenState = {
  editingSet: Set | null
}

@MobxReact.inject('dataStore', 'routing')
@MobxReact.observer
export default class TrainingScreen extends React.Component<TrainingScreenProps, TrainingScreenState> {
  constructor() {
    super()
    this.state = {
      editingSet: null
    }
  }

  render() {
    const { training, routing } = this.props
    const { editingSet } = this.state

    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        style={s.bg_greyLightest}
        avoidKeyboard
      >
        <Navbar
          title={training.title}
          leftAction={routing.goBack}
          rightBtn={<Icon name="options" style={[s.blueDark, s.f4]} />}
        />
        <RN.View style={[s.flx_row, s.jcsa, s.p075]}>
          <TabButton label="Sets / exercises" isActive />
          <TabButton label="overview" />
        </RN.View>
        {training.completedSets.length > 0 ? (
          <RN.ScrollView style={s.flx_i} contentContainerStyle={[s.ph125, s.pb2, s.pt1]}>
            {training.completedSets.map((set, i) => (
              <SetView
                key={set.id}
                onRemove={() => training.removeCompletedSet(set)}
                onEditType={() => {
                  this.setState({ editingSet: set })
                }}
                set={set}
                index={i}
              />
            ))}
            <RN.TouchableOpacity
              onPress={() => {
                const set = new Set()
                routing.push({ route: { path: '/set', props: { set, trainingToAdd: training } } })
                routing.push({ route: { path: '/selectexercise', props: { set } } })
              }}
              style={[s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
            >
              <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.bg_t, { letterSpacing: -0.5 }]}>Add Set</RN.Text>
            </RN.TouchableOpacity>
          </RN.ScrollView>
        ) : (
          <RN.View style={[s.flx_i, s.jcc, s.aic, s.ph3, s.pb3]}>
            <IonIcon name="ios-clipboard-outline" style={[s.greyLighter, s.fs4, s.tc]} />
            <RN.Text style={[s.f_pn, s.f3, s.tc, s.greyLighter, s.mb3, { letterSpacing: -0.5 }]}>
              Sets list is empty
            </RN.Text>
            <RN.TouchableOpacity
              onPress={() => {
                const set = new Set()
                routing.push({ route: { path: '/set', props: { set, trainingToAdd: training } } })
                routing.push({ route: { path: '/selectexercise', props: { set } } })
              }}
              style={[s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
            >
              <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t, { letterSpacing: -0.5 }]}>
                Create First Set
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        )}
        <Popup isExpanded={!!editingSet} style={s.bg_black_40} contentContainerStyle={[s.jcc, s.aic]}>
          <RN.View style={[s.mh3, s.bg_white, s.br05, shadows.sm, s.ass]}>
            <RN.TouchableOpacity style={[s.pb15]} onPress={() => this.setState({ editingSet: null })}>
              <RN.Text style={[s.f_pn, s.f4, s.tc, s.blueDark]}>Done</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </Popup>
      </ScreenContainer>
    )
  }
}

type SetViewProps = {
  onEditType: () => void
  onRemove: () => void
  set: Set
  index: number
}

@MobxReact.observer
class SetView extends React.Component<SetViewProps> {
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
    const { set, index } = this.props
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
        <RN.View style={[s.jcsb, s.aic, s.flx_row, s.pv025, s.pr075]}>
          <RN.View style={[s.flx_row, s.aic]}>
            <LinearGradient
              style={[s.h125, s.br065, s.aic, s.jcc, s.w3, s.mr075, { marginLeft: -(sizes['1'] + sizes['025']) / 2 }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[colors.blueDark, colors.blueBright]}
            >
              <RN.Text style={[s.f_pn, s.fs065, s.fw7, s.bg_t, s.tc, s.white, { letterSpacing: 1.5 }]}>
                {index + 1} SET
              </RN.Text>
            </LinearGradient>
            <RN.Text style={[s.f6, s.f_pn, s.black, s.fw3, s.mr075, s.grey]}>
              <RN.Text style={[s.fw6, s.black]}>{set.attemptsAmount}</RN.Text>{' '}
              {set.attemptsAmount > 1 ? 'attempts' : 'attempt'},
            </RN.Text>
            <RN.Text style={[s.f6, s.f_pn, s.black, s.fw3, s.mr075, s.grey]}>
              <RN.Text style={[s.fw6, s.black]}>{Util.secondsToMinutes(set.recoverSec, 'm s')}</RN.Text> recover
            </RN.Text>
          </RN.View>
          <RN.TouchableOpacity style={[s.pv05, s.jcc]}>
            <Icon name="options" style={[s.blueDark, s.f5]} />
          </RN.TouchableOpacity>
        </RN.View>
        {set.exercises.map((e, i) => (
          <RN.View
            key={e.id}
            style={[
              s.ml1,
              i !== set.exercises.length - 1 ? s.bbw1 : null,
              s.b_greyLighter_70,
              s.pv1,
              s.pr075,
              s.flx_row,
              s.jcsb,
              s.ass
            ]}
          >
            <RN.View style={[s.pr15]}>
              <RN.Text style={[s.f_pn, s.f4, s.fw3, s.black, { letterSpacing: -0.5 }]}>
                {e.title}
                {e.weight > 0 ? ' ' + e.weight + 'kg' : ''}
              </RN.Text>
              <RN.Text style={[s.f_pn, s.f7, s.fw3, s.grey, { letterSpacing: -0.5 }]}>
                {[...e.primaryMuscles, ...e.secondaryMuscles].map(m => m.title).join(', ')}
              </RN.Text>
            </RN.View>
            <RN.Text style={[s.f_pn, s.f4, s.fw3, s.black, s.tr, { letterSpacing: -0.5 }]}>{e.weight}m</RN.Text>
          </RN.View>
        ))}
      </RN.Animated.View>
    )
  }
}
