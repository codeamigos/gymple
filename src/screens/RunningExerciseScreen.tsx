import * as React from 'react'
import * as RN from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import * as Model from '../Model'
import Popup from '../components/Popup'
import { s, sizes, colors } from 'react-native-better-styles'

interface ActiveExerciseProps {
  onClose: () => void
  onUpdate: (exercise: Model.Exercise) => void
  onDone: () => void
  exercise: Model.Exercise
}

interface ActiveExerciseState {
  isRest: boolean
  currentAttemptIndex: number
  isAtteptSettingsPopupVisible: boolean
  timer: number
}

export default class RunningExercise extends React.PureComponent<ActiveExerciseProps, ActiveExerciseState> {
  constructor(props: ActiveExerciseProps) {
    super(props)
    this.state = {
      isRest: false,
      isAtteptSettingsPopupVisible: false,
      currentAttemptIndex: 0,
      timer: 0
    }
  }

  interval: number | null = null

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ timer: this.state.timer + 1 }), 1000)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  componentDidUpdate(_: ActiveExerciseProps, prevState: ActiveExerciseState) {
    const { isRest, timer, isAtteptSettingsPopupVisible } = this.state
    const { exercise } = this.props
    if (
      !isAtteptSettingsPopupVisible &&
      isRest &&
      exercise.restSeconds - timer <= 0 &&
      exercise.restSeconds - prevState.timer > 0
    )
      RN.Vibration.vibrate(50, true)
    else if (!isRest) RN.Vibration.cancel()
  }

  handleNextAttempt = () =>
    this.setState({
      currentAttemptIndex: this.state.currentAttemptIndex + 1,
      isRest: false,
      timer: 0,
      isAtteptSettingsPopupVisible: false
    })

  handleRest = () => this.setState({ isRest: true, timer: 0, isAtteptSettingsPopupVisible: true })

  updateAttemptAndCloseModal = (_attempt: Model.Attempt) => {
    this.setState({ isAtteptSettingsPopupVisible: false })
  }

  renderTimer = () => {
    const { timer, isRest } = this.state
    const { exercise: { restSeconds } } = this.props
    if (!isRest) {
      return secondsToMinutes(timer)
    }
    return restSeconds - timer > 0 ? secondsToMinutes(restSeconds - timer) : secondsToMinutes(0)
  }

  render() {
    const { onClose, onDone, exercise } = this.props
    const { currentAttemptIndex, isRest, isAtteptSettingsPopupVisible } = this.state

    const exerciseAttempts: Model.Attempt[] = [exercise.attempts.first, ...exercise.attempts.other]
    const currentAttempt = exerciseAttempts[currentAttemptIndex]

    if (!currentAttempt) {
      throw new Error('Current attempt is not defined in ActiveExercise.')
    }

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar barStyle="light-content" translucent={true} backgroundColor={colors.t} />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
          <RN.TouchableOpacity onPress={onClose}>
            <Icon name="md-arrow-back" size={sizes[175]} color={colors.white} />
          </RN.TouchableOpacity>
          <RN.Text style={[s.white, s.fw3, s.f2, s.mv05, s.lh2]}>
            {exercise.title}
          </RN.Text>
          <RN.Text style={[s.white, s.f5, s.mb05]}>
            {exercise.targetMuscles.map(({ title }) => title).join(', ')}
          </RN.Text>
          {isRest
            ? <RN.View style={[s.flx_row, s.mv1]}>
                <RN.View style={s.mr1}>
                  <RN.Text style={[s.white, s.f6, s.b]}>Rest for</RN.Text>
                  <RN.Text style={[s.white, s.fw3, s.f4]}>
                    {exercise.restSeconds} seconds
                  </RN.Text>
                </RN.View>
              </RN.View>
            : <RN.View style={[s.flx_row, s.mv1]}>
                <RN.View style={s.mr2}>
                  <RN.Text style={[s.white, s.f6, s.b]}>Attempt</RN.Text>
                  <RN.Text style={[s.white, s.fw3, s.f4]}>
                    {currentAttemptIndex + 1} of {exerciseAttempts.length}
                  </RN.Text>
                </RN.View>
                <RN.View style={s.mr2}>
                  <RN.Text style={[s.white, s.f6, s.b]}>Repeats</RN.Text>
                  <RN.Text style={[s.white, s.fw3, s.f4]}>
                    {currentAttempt.repetitions}
                  </RN.Text>
                </RN.View>
                <RN.View>
                  <RN.Text style={[s.white, s.f6, s.b]}>Weight</RN.Text>
                  <RN.Text style={[s.white, s.fw3, s.f4]}>
                    {currentAttempt.weight}kg
                  </RN.Text>
                </RN.View>
              </RN.View>}
          <RN.Text style={[s.f1, s.fw2, s.white]}>
            {this.renderTimer()}
          </RN.Text>
          {currentAttemptIndex < exerciseAttempts.length - 1
            ? !isRest
              ? <RN.TouchableOpacity
                  style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
                  onPress={this.handleRest}
                >
                  <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Done with it</RN.Text>
                </RN.TouchableOpacity>
              : <RN.TouchableOpacity
                  style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
                  onPress={this.handleNextAttempt}
                >
                  <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Start next Attempt</RN.Text>
                </RN.TouchableOpacity>
            : <RN.TouchableOpacity style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]} onPress={onDone}>
                <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Complete Exercise</RN.Text>
              </RN.TouchableOpacity>}
        </RN.View>
        <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pl125]}>
          <RN.ScrollView style={s.flx_i}>
            <RN.Text style={[s.fw6, s.f7, s.white_30, s.pv1]}>UPCOMING</RN.Text>
            {exerciseAttempts
              .filter((_, i) => i >= currentAttemptIndex)
              .map((attempt, i, arr) =>
                <AttemptListItem
                  attempt={attempt}
                  key={i}
                  num={currentAttemptIndex + i + 1}
                  restSeconds={(i === 0 && isRest) || i === arr.length - 1 ? 0 : exercise.restSeconds}
                  isActive={i === 0}
                />
              )}
          </RN.ScrollView>
        </RN.View>
        <Popup style={s.bg_black_30} isExpanded={isAtteptSettingsPopupVisible}>
          <RN.View style={[s.flx_i, s.jcc, s.aic, s.ph3]}>
            <AttemptEditor attempt={currentAttempt} onDone={this.updateAttemptAndCloseModal} />
          </RN.View>
        </Popup>
      </RN.View>
    )
  }
}

interface AttemptListItemProps {
  attempt: Model.Attempt
  restSeconds: number | null
  num: number
  isActive: boolean
}

const AttemptListItem = ({ attempt, num, restSeconds, isActive }: AttemptListItemProps) =>
  <RN.View>
    {!isActive &&
      <RN.View style={[s.flx_row, s.jcsb, s.pr05, s.aic, s.pv1, s.b_white_10, s.ass, restSeconds ? s.bbw1 : undefined]}>
        <RN.View style={s.flx_i}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t]}>
            Attempt {num}
          </RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.aife]}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t, s.tr]}>
            {attempt.repetitions}
            <RN.Text style={[s.f6, s.fw4, s.white_30]}> REPS</RN.Text> {attempt.weight}
            <RN.Text style={[s.f6, s.fw4, s.white_30]}> KG</RN.Text>
          </RN.Text>
        </RN.View>
      </RN.View>}
    {!!restSeconds &&
      <RN.View style={[s.flx_row, s.jcsb, s.pr05, s.aic, s.pv1, s.bbw1, s.b_white_10, s.ass]}>
        <RN.View style={s.flx_i}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t]}>Rest</RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.aife]}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t, s.tr]}>
            {restSeconds}
            <RN.Text style={[s.f6, s.fw4, s.white_30]}> SEC</RN.Text>
          </RN.Text>
        </RN.View>
      </RN.View>}
  </RN.View>

interface AttemptEditorProps {
  attempt: Model.Attempt
  onDone: (attempt: Model.Attempt) => void
}

interface AttemptEditorState {
  attempt: Model.Attempt
}

class AttemptEditor extends React.PureComponent<AttemptEditorProps, AttemptEditorState> {
  constructor(props: AttemptEditorProps) {
    super(props)
    this.state = {
      attempt: props.attempt
    }
  }

  onChangeWeight = (weight: number) =>
    this.setState({
      attempt: {
        weight,
        repetitions: this.state.attempt.repetitions
      }
    })

  onChangeRepetitions = (repetitions: number) =>
    this.setState({
      attempt: {
        weight: this.state.attempt.weight,
        repetitions
      }
    })

  onClose = () => this.props.onDone(this.state.attempt)

  render() {
    const { attempt } = this.state
    return (
      <RN.View style={[s.bg_white, s.br0125, s.ass, s.pa2, s.jcc, s.aic]}>
        <RN.Text style={[s.fw3, s.f4, s.bg_t]}>
          {attempt.weight} x {attempt.repetitions}
        </RN.Text>
        <RN.TouchableOpacity
          style={[s.asfs, s.bg_green, s.br0125, s.h325, s.jcc, s.ph3, s.mv075]}
          onPress={this.onClose}
        >
          <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Done</RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    )
  }
}

const secondsToMinutes = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60))
  const sec = String(seconds % 60)

  const ss = sec.length < 2 ? '0' + sec : sec
  const mm = min.length < 2 ? '0' + min : min
  return mm + ':' + ss
}
