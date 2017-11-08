import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'
import { s, colors, sizes } from 'react-native-better-styles'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'

import { Link } from '../components/Router'
import ScreenContainer from '../components/ScreenContainer'
import { shadows } from '../stylesSettings'
import Popup from '../components/Popup'
import Navbar from '../components/Navbar'
import { Exercise } from '../store/dataStore'
import { stores } from '../store'
import * as Route from '../routes'
import * as Util from '../utils'

type SetScreenProps = {
  dataStore: typeof stores.dataStore
  routing: typeof stores.routing
} & Route.SetRouteProps

type SetScreenState = {
  showEditRecoverPopup: boolean
  editingExercise: Exercise | null
}

@MobxReact.inject('dataStore', 'routing')
@MobxReact.observer
export default class SetScreen extends React.Component<SetScreenProps, SetScreenState> {
  constructor() {
    super()
    this.state = {
      editingExercise: null,
      showEditRecoverPopup: false
    }
  }

  changeEditingExerciseType = (kind: 'distance' | 'time' | 'repetitions') => {
    const { editingExercise } = this.state

    const getTypeAmount = (e: Exercise) => {
      switch (e.type.kind) {
        case 'distance':
          return e.type.meters
        case 'time':
          return e.type.seconds
        case 'repetitions':
          return e.type.count
        default:
          return Util.shouldNeverHappen(e.type)
      }
    }

    if (editingExercise) {
      switch (kind) {
        case 'distance':
          editingExercise.setType({
            kind: 'distance',
            meters: getTypeAmount(editingExercise)
          })
          editingExercise.save()
          break
        case 'time':
          editingExercise.setType({
            kind: 'time',
            seconds: getTypeAmount(editingExercise)
          })
          editingExercise.save()
          break
        case 'repetitions':
          editingExercise.setType({
            kind: 'repetitions',
            count: getTypeAmount(editingExercise)
          })
          editingExercise.save()
          break
        default:
          Util.shouldNeverHappen(kind)
      }
    }
  }

  render() {
    const { set, routing, trainingToAdd } = this.props
    const { showEditRecoverPopup, editingExercise } = this.state
    return (
      <ScreenContainer
        statusbar={{
          barStyle: 'dark-content'
        }}
        style={s.bg_greyLightest}
        avoidKeyboard
      >
        <Navbar
          title={'Edit Set'}
          leftAction={() => {
            if (trainingToAdd && set.exercises.length > 0) {
              trainingToAdd.addCompletedSet(set)
              trainingToAdd.save()
            }
            routing.goBack()
          }}
        />
        <RN.View style={[s.flx_row, s.m1]}>
          <RN.View style={[s.flx_i, s.aic]}>
            <RN.Text style={[s.f_pn, s.fw7, s.f7, s.grey, s.tc, { letterSpacing: 1.5 }]}>ATTEMPTS</RN.Text>
            <RN.View style={[s.flx_row, s.aic, s.mt025]}>
              <RN.TouchableOpacity
                disabled={set.attemptsAmount === 1}
                style={s.p05}
                onPress={() => {
                  set.setAttemptsAmount(set.attemptsAmount - 1)
                  set.save()
                }}
              >
                <Icon name="minus" style={[s.blueDark, s.f3]} />
              </RN.TouchableOpacity>
              <RN.Text style={[s.f_pn, s.w2, s.fw3, s.f2, s.blueDark, s.tc, { letterSpacing: -0.5 }]}>
                {set.attemptsAmount}
              </RN.Text>
              <RN.TouchableOpacity
                disabled={set.attemptsAmount === 99}
                style={s.p05}
                onPress={() => {
                  set.setAttemptsAmount(set.attemptsAmount + 1)
                  set.save()
                }}
              >
                <Icon name="plus" style={[s.blueDark, s.f3]} />
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
          <RN.View style={[s.flx_i, s.aic]}>
            <RN.Text style={[s.f_pn, s.fw7, s.f7, s.grey, s.tc, { letterSpacing: 1.5 }]}>RECOVER</RN.Text>
            <RN.TouchableOpacity style={s.pv025} onPress={() => this.setState({ showEditRecoverPopup: true })}>
              <RN.Text style={[s.f_pn, s.fw3, s.f2, s.blueDark, s.tc, { letterSpacing: -0.5 }]}>
                {Util.secondsToMinutes(set.recoverSec, 'm s')}
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
        {set.exercises.length > 0 ? (
          <RN.ScrollView style={s.flx_i} contentContainerStyle={[s.ph125, s.pb2, s.pt05]}>
            {set.exercises.map((e, i) => (
              <ExerciseView
                key={e.id}
                onRemove={() => {
                  set.removeExercise(e)
                  set.save()
                }}
                onEditType={() => {
                  this.setState({ editingExercise: e })
                }}
                exercise={e}
                index={i}
              />
            ))}
            <Link
              to={{ path: '/selectexercise', props: { set } }}
              style={[s.mt1, s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
            >
              <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t, { letterSpacing: -0.5 }]}>
                Add Exercise
              </RN.Text>
            </Link>
          </RN.ScrollView>
        ) : (
          <RN.View style={[s.flx_i, s.jcc, s.aic, s.ph3, s.pb3]}>
            <IonIcon name="ios-clipboard-outline" style={[s.greyLighter, s.fs4, s.tc]} />
            <RN.Text style={[s.f_pn, s.f3, s.tc, s.greyLighter, s.mb3, { letterSpacing: -0.5 }]}>
              Exercise list is empty
            </RN.Text>
            <Link
              to={{ path: '/selectexercise', props: { set } }}
              style={[s.h3, s.br025, s.b_blueDark, s.bw1, s.ass, s.jcc]}
            >
              <RN.Text style={[s.f_pn, s.f4, s.blueDark, s.tc, s.mb, s.bg_t, { letterSpacing: -0.5 }]}>
                Select Exercise
              </RN.Text>
            </Link>
          </RN.View>
        )}
        <Popup isExpanded={!!editingExercise} style={s.bg_black_40} contentContainerStyle={[s.jcc, s.aic]}>
          <RN.View style={[s.mh3, s.bg_white, s.br05, shadows.sm, s.ass]}>
            <RN.View style={[s.bbw1, s.b_greyLighter, s.aic, s.pv075]}>
              <RN.Text style={[s.f_pn, s.f3, s.fw3, s.tc, s.black, { letterSpacing: -0.5 }]}>
                Select exercise type
              </RN.Text>
            </RN.View>
            <RN.Picker
              selectedValue={editingExercise ? editingExercise.type.kind : undefined}
              onValueChange={(value: 'distance' | 'time' | 'repetitions') => this.changeEditingExerciseType(value)}
            >
              <RN.Picker.Item label="Repetitions" value="repetitions" />
              <RN.Picker.Item label="Time" value="time" />
              <RN.Picker.Item label="Distance" value="distance" />
            </RN.Picker>
            <RN.TouchableOpacity style={[s.pb15]} onPress={() => this.setState({ editingExercise: null })}>
              <RN.Text style={[s.f_pn, s.f4, s.tc, s.blueDark]}>Done</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </Popup>
        <Popup isExpanded={showEditRecoverPopup} style={s.bg_black_40} contentContainerStyle={[s.jcc, s.aic]}>
          <RN.View style={[s.mh3, s.bg_white, s.br05, shadows.sm, s.ass]}>
            <RN.View style={[s.bbw1, s.b_greyLighter, s.aic, s.pv075]}>
              <RN.Text style={[s.f_pn, s.f3, s.fw3, s.tc, s.black, { letterSpacing: -0.5 }]}>
                Select recover time
              </RN.Text>
            </RN.View>
            <RN.Picker
              selectedValue={set.recoverSec}
              onValueChange={(itemValue: number) => {
                set.setRecoverSec(itemValue)
                set.save()
              }}
            >
              <RN.Picker.Item label="30 sec" value={30} />
              <RN.Picker.Item label="45 sec" value={45} />
              <RN.Picker.Item label="1 min" value={60} />
              <RN.Picker.Item label="1 min 30 sec" value={90} />
              <RN.Picker.Item label="2 min" value={120} />
              <RN.Picker.Item label="2 min 30 sec" value={150} />
              <RN.Picker.Item label="3 min" value={180} />
              <RN.Picker.Item label="4 min" value={240} />
              <RN.Picker.Item label="5 min" value={300} />
            </RN.Picker>
            <RN.TouchableOpacity style={[s.pb15]} onPress={() => this.setState({ showEditRecoverPopup: false })}>
              <RN.Text style={[s.f_pn, s.f4, s.tc, s.blueDark]}>Done</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </Popup>
      </ScreenContainer>
    )
  }
}

type ExerciseViewProps = {
  onEditType: () => void
  onRemove: () => void
  exercise: Exercise
  index: number
}

@MobxReact.observer
class ExerciseView extends React.Component<ExerciseViewProps> {
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

  onRemove = () => {
    const { onRemove } = this.props
    RN.Animated
      .timing(this.animatedValue, {
        toValue: 200,
        duration: 200
      })
      .start(onRemove)
  }

  renderKindAmount = () => {
    const { exercise: e } = this.props
    switch (e.type.kind) {
      case 'distance':
        return (
          <NumberEdit
            units="m"
            enablesReturnKeyAutomatically
            underlineColorAndroid={colors.t}
            maxLength={5}
            placeholder="500m"
            selectionColor={colors.blue_20}
            placeholderTextColor={colors.greyLighter}
            value={e.type.meters === 0 ? '' : String(e.type.meters)}
            onChangeText={value => {
              const numValue = parseInt(value)
              e.setType({ kind: 'distance', meters: isNaN(numValue) || value === '' ? 0 : numValue })
              e.save()
            }}
            keyboardType="numeric"
            style={[s.m0, s.p0, s.f_pn, s.fw3, s.f2, s.ass, s.blueDark, s.tc, { letterSpacing: -0.5 }]}
          />
        )
      case 'time':
        return (
          <NumberEdit
            units="s"
            enablesReturnKeyAutomatically
            underlineColorAndroid={colors.t}
            maxLength={5}
            placeholder="120s"
            selectionColor={colors.blue_20}
            placeholderTextColor={colors.greyLighter}
            value={e.type.seconds === 0 ? '' : String(e.type.seconds)}
            onChangeText={value => {
              const numValue = parseInt(value)
              e.setType({ kind: 'time', seconds: isNaN(numValue) || value === '' ? 0 : numValue })
              e.save()
            }}
            keyboardType="numeric"
            style={[s.m0, s.p0, s.f_pn, s.fw3, s.f2, s.ass, s.blueDark, s.tc, { letterSpacing: -0.5 }]}
          />
        )
      case 'repetitions':
        return (
          <NumberEdit
            units=""
            enablesReturnKeyAutomatically
            underlineColorAndroid={colors.t}
            maxLength={5}
            placeholder="12"
            selectionColor={colors.blue_20}
            placeholderTextColor={colors.greyLighter}
            value={e.type.count === 0 ? '' : String(e.type.count)}
            onChangeText={value => {
              const numValue = parseInt(value)
              e.setType({ kind: 'repetitions', count: isNaN(numValue) || value === '' ? 0 : numValue })
              e.save()
            }}
            keyboardType="numeric"
            style={[s.m0, s.p0, s.f_pn, s.fw3, s.f2, s.ass, s.blueDark, s.tc, { letterSpacing: -0.5 }]}
          />
        )
      default:
        return Util.shouldNeverHappen(e.type)
    }
  }

  render() {
    const { exercise, index, onEditType } = this.props
    return (
      <RN.Animated.View
        style={[
          s.bw1,
          s.bg_white,
          s.b_greyLighter,
          shadows.sm,
          s.mb025,
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
        <RN.View style={[s.ph15, s.pv125]}>
          <RN.Text style={[s.f_pn, s.f3, s.fw3, s.black, s.lh175, s.pr05, s.bg_t, { letterSpacing: -0.5 }]}>
            {exercise.title}
          </RN.Text>
          <RN.Text style={[s.f_pn, s.f6, s.fw3, s.grey, { letterSpacing: -0.5 }]}>
            {[...exercise.primaryMuscles, ...exercise.secondaryMuscles].map(m => m.title).join(', ')}
          </RN.Text>
          <RN.TouchableOpacity style={[s.absolute, s.r0, s.t0, s.p075]} onPress={this.onRemove}>
            <Icon name="trash" style={[s.blueDark, s.f5]} />
          </RN.TouchableOpacity>
        </RN.View>
        <RN.View style={[s.flx_row, s.btw1, s.b_greyLighter]}>
          <RN.View style={[s.aic, s.flx_i, s.brw1, s.b_greyLighter, s.pv1]}>
            <RN.TouchableOpacity style={[s.mv025]} onPress={onEditType}>
              <RN.Text style={[s.f_pn, s.fw7, s.f7, s.blueDark, s.tc, { letterSpacing: 1.5 }]}>
                {exercise.type.kind.toUpperCase()}
              </RN.Text>
            </RN.TouchableOpacity>

            {this.renderKindAmount()}
          </RN.View>
          <RN.View style={[s.aic, s.flx_i, s.pv1]}>
            <RN.Text style={[s.f_pn, s.fw7, s.f7, s.mv025, s.grey, s.tc, { letterSpacing: 1.5 }]}>WEIGHT</RN.Text>
            <NumberEdit
              units="kg"
              enablesReturnKeyAutomatically
              underlineColorAndroid={colors.t}
              maxLength={7}
              placeholder="0kg"
              selectionColor={colors.blue_20}
              placeholderTextColor={colors.greyLighter}
              value={exercise.weight === 0 ? '' : String(exercise.weight)}
              onChangeText={value => {
                const numValue = parseInt(value)
                if (isNaN(numValue) || value === '') exercise.setWeight(0)
                else exercise.setWeight(numValue)
                exercise.save()
              }}
              keyboardType="numeric"
              style={[s.m0, s.p0, s.f_pn, s.fw3, s.f2, s.ass, s.blueDark, s.tc, { letterSpacing: -0.5 }]}
            />
          </RN.View>
        </RN.View>

        {index !== 0 && (
          <LinearGradient
            style={[s.h1, s.br05, s.ph075, s.aic, s.jcc, s.absolute, s.asc, { top: -(sizes['1'] + sizes['025']) / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.blueDark, colors.blueBright]}
          >
            <RN.Text style={[s.f_pn, s.fs05, s.fw7, s.bg_t, s.tc, s.white, { letterSpacing: 1.5 }]}>THEN</RN.Text>
          </LinearGradient>
        )}
      </RN.Animated.View>
    )
  }
}

type NumberEditProps = {
  units: string
} & RN.TextInputProperties

type NumberEditState = {
  isEditing: boolean
}

class NumberEdit extends React.Component<NumberEditProps, NumberEditState> {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  render() {
    const { units, style, value, ...otherProps } = this.props

    if (this.state.isEditing)
      return (
        <RN.TextInput
          value={value}
          style={style}
          autoFocus
          onEndEditing={() => this.setState({ isEditing: false })}
          onBlur={() => this.setState({ isEditing: false })}
          onSubmitEditing={() => this.setState({ isEditing: false })}
          blurOnSubmit
          {...otherProps}
        />
      )

    return (
      <RN.TouchableOpacity style={s.flx_row} onPress={() => this.setState({ isEditing: true })}>
        <RN.Text style={[style, value === '' ? { color: this.props.placeholderTextColor } : null]}>
          {value === '' ? this.props.placeholder : value + units}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }
}
