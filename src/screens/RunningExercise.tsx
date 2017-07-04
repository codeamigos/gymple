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

export default class RunningExercise extends React.PureComponent<ActiveExerciseProps, ActiveExerciseState> {
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

  handleNextAttempt = () => this.setState({currentAttemptIndex: this.state.currentAttemptIndex + 1, isRest: false, timer: 0});

  handleRest = () => this.setState({isRest: true, timer: 0});

  renderTimer = () => {
    const {timer, isRest} = this.state;
    const {exercise: {restSeconds}} = this.props;
    if (!isRest) {
      return secondsToMinutes(timer);
    }
    return restSeconds - timer > 0 ? secondsToMinutes(restSeconds - timer) : secondsToMinutes(0);
  }

  render() {
    const {onClose, onDone, exercise} = this.props;
    const { currentAttemptIndex, isRest} = this.state;

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
          {isRest
          ?
            <RN.View style={[s.flx_row, s.mv1]}>
              <RN.View style={s.mr1}>
                <RN.Text style={[s.white, s.f6, s.b]}>
                  Rest for
                </RN.Text>
                <RN.Text style={[s.white, s.fw3, s.f4]}>
                  {exercise.restSeconds} seconds
                </RN.Text>
              </RN.View>
            </RN.View>
          :
            <RN.View style={[s.flx_row, s.mv1]}>
              <RN.View style={s.mr2}>
                <RN.Text style={[s.white, s.f6, s.b]}>
                  Attempt
                </RN.Text>
                <RN.Text style={[s.white, s.fw3, s.f4]}>
                  {currentAttemptIndex + 1} of {exerciseAttempts.length}
                </RN.Text>
              </RN.View>
              <RN.View style={s.mr2}>
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
          }
          <RN.Text style={[s.f1, s.fw2, s.white]}>
            {this.renderTimer()}
          </RN.Text>
          { currentAttemptIndex < exerciseAttempts.length - 1
            ?
              !isRest
              ?
                <RN.TouchableOpacity
                  style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
                  onPress={this.handleRest}>
                  <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                    Done with it
                  </RN.Text>
                </RN.TouchableOpacity>
              :
                <RN.TouchableOpacity
                  style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
                  onPress={this.handleNextAttempt}>
                  <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                    Start next Attempt
                  </RN.Text>
                </RN.TouchableOpacity>
            :
              <RN.TouchableOpacity
                style={[s.asfs, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mv075]}
                onPress={onDone}>
                <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                  Complete Exercise
                </RN.Text>
              </RN.TouchableOpacity>
          }
        </RN.View>
        <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pl125]}>
          <RN.ScrollView
            style={s.flx_i}>
            <RN.Text style={[s.fw6, s.f7, s.white_30, s.pv1]}>UPCOMING</RN.Text>
            {exerciseAttempts
              .filter((_, i) => i >= currentAttemptIndex)
              .map((attempt, i, arr) =>
              <AttemptListItem
                attempt={attempt}
                key={i}
                num={currentAttemptIndex + i + 1}
                restSeconds={ i === 0 && isRest || i === arr.length - 1 ? 0 : exercise.restSeconds}
                isActive={i === 0} />,
            )}
          </RN.ScrollView>
        </RN.View>
    </RN.View>
    );
  }
}

interface AttemptListItemProps {
  attempt: Attempt,
  restSeconds: number | null,
  num: number,
  isActive: boolean,
}

const AttemptListItem = ({attempt, num, restSeconds, isActive}: AttemptListItemProps) =>
  <RN.View>
    {!isActive &&
      <RN.View style={[s.flx_row, s.jcsb, s.pr05, s.aic, s.pv1, s.b_white_10, s.ass, restSeconds ? s.bbw1 : null]}>
        <RN.View style={s.flx_i}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t]}>Attempt {num}</RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.aife]}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t, s.tr]}>
            {attempt.repetitions}<RN.Text style={[s.f6, s.fw4, s.white_30]}> REPS</RN.Text>{' '}
            {attempt.weight}<RN.Text style={[s.f6, s.fw4, s.white_30]}> KG</RN.Text>
          </RN.Text>
        </RN.View>
      </RN.View>
    }
    {!!restSeconds &&
      <RN.View style={[s.flx_row, s.jcsb, s.pr05, s.aic, s.pv1, s.bbw1, s.b_white_10, s.ass]}>
        <RN.View style={s.flx_i}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t]}>Rest</RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.aife]}>
          <RN.Text style={[s.fw3, s.f3, s.white, s.bg_t, s.tr]}>
            {restSeconds}<RN.Text style={[s.f6, s.fw4, s.white_30]}> SEC</RN.Text>
          </RN.Text>
        </RN.View>
      </RN.View>
    }
  </RN.View>;

const secondsToMinutes = (seconds: number): string => {
  const min = String(Math.floor(seconds / 60));
  const sec = String(seconds % 60);

  const ss = sec.length < 2 ? '0' + sec : sec;
  const mm = min.length < 2 ? '0' + min : min;
  return mm + ':' + ss;
};
