import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Exercise, Attempt} from '../interfaces';

import {s, sizes, colors} from './../styles';

interface ActiveExerciseProps {
  onClose: () => void,
  onDone: () => void,
  exercise: Exercise,
}

interface ActiveExerciseState {
  isRest: boolean;
  currentAttemptIndex: number,
  timer: number,
}

export default class ActiveExercise extends React.PureComponent<ActiveExerciseProps, ActiveExerciseState> {
  constructor(props: ActiveExerciseProps) {
    super(props);
    this.state = {
      isRest: false,
      currentAttemptIndex: 0,
      timer: 0,
    };
  }

  interval: number = 0;

  componentWillMount() {
    this.interval = setInterval(() => this.setState({timer: this.state.timer + 1}), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {onClose, onDone, exercise} = this.props;
    const { currentAttemptIndex, timer} = this.state;

    const exerciseAttempts: Attempt[] = [exercise.attempts.first, ...exercise.attempts.other];
    const currentAttempt = exerciseAttempts[currentAttemptIndex];

    if (!currentAttempt) {
      throw new Error('Current attempt is not defined in ActiveExercise.');
    }

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={colors.t} />
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
          <RN.View style={s.flx_row}>
            <RN.View style={s.mr05}>
              <RN.Text style={[s.white, s.f6, s.b]}>
                Attempt
              </RN.Text>
              <RN.Text style={[s.white, s.fw3, s.f4]}>
                {currentAttemptIndex + 1} of {exerciseAttempts.length}
              </RN.Text>
            </RN.View>
            <RN.View style={s.mr05}>
              <RN.Text style={[s.white, s.f6, s.b]}>
                Repeats
              </RN.Text>
              <RN.Text style={[s.white, s.fw3, s.f4]}>
                {currentAttempt.repetitions}
              </RN.Text>
            </RN.View>
            <RN.View>
              <RN.Text style={[s.white, s.f6, s.b]}>
                Weight
              </RN.Text>
              <RN.Text style={[s.white, s.fw3, s.f4]}>
                {currentAttempt.weight}kg
              </RN.Text>
            </RN.View>
          </RN.View>
          <RN.Text style={[s.f1, s.fw2, s.white]}>
            {secondsToMinutes(timer)}
          </RN.Text>
          <RN.TouchableOpacity
            style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
            onPress={onDone}>
            <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
              Complete Exercise
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
        <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pb175, s.ph125]}>

        </RN.View>
    </RN.View>
    );
  }
}

const secondsToMinutes = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60));
  const sec = String(seconds % 60);

  const ss = sec.length < 2 ? '0' + sec : sec;
  const mm = min.length < 2 ? '0' + min : min;
  return mm + ':' + ss;
};
