import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Exercise, Attempt} from '../interfaces';

import {s, sizes, colors} from './../styles';

interface ExerciseSettingsProps {
  onClose: () => void,
  onUpdate: (exercise: Exercise) => void,
  onDone: () => void,
  exercise: Exercise,
}

export default class ExerciseSettings extends React.PureComponent<ExerciseSettingsProps, void> {

  handleAddAttempt = () => {
    const {exercise, onUpdate} = this.props;
    onUpdate({
      ...exercise,
      attempts: {
        ...exercise.attempts,
        other: exercise.attempts.other.concat(exercise.attempts.first),
      },
    });
  }

  handleRemoveAttempt = () => {
    const {exercise, onUpdate} = this.props;
    onUpdate({
      ...exercise,
      attempts: {
        ...exercise.attempts,
        other: exercise.attempts.other.slice(0, exercise.attempts.other.length - 1),
      },
    });
  }

  handleChangeOverallWeight = (weightString: string) => {
    const {exercise, onUpdate} = this.props;
    let weight = 0;
    if (!isNaN(parseInt(weightString, 10)) && parseInt(weightString, 10) >= 0) {
      weight = parseInt(weightString, 10);
    }
    const attempt: Attempt = {
      ...exercise.attempts.first,
      weight,
    };
    onUpdate({
      ...exercise,
      attempts: {
        first: attempt,
        other: exercise.attempts.other.map(_ => attempt),
      },
    });
  }

  handleChangeOverallRepeats = (repeatsString: string) => {
    const {exercise, onUpdate} = this.props;
    let repetitions = 0;
    if (!isNaN(parseInt(repeatsString, 10)) && parseInt(repeatsString, 10) >= 0) {
      repetitions = parseInt(repeatsString, 10);
    }
    const attempt: Attempt = {
      ...exercise.attempts.first,
      repetitions,
    };
    onUpdate({
      ...exercise,
      attempts: {
        first: attempt,
        other: exercise.attempts.other.map(_ => attempt),
      },
    });
  }

  handleChangeRestSeconds = (restSecondsString: string) => {
    const {exercise, onUpdate} = this.props;
    if (!isNaN(parseInt(restSecondsString, 10)) && parseInt(restSecondsString, 10) > 0) {
      const restSeconds: number = parseInt(restSecondsString, 10);
      onUpdate({
        ...exercise,
        restSeconds,
      });
    }
    else {
      onUpdate({
        ...exercise,
        restSeconds: 0,
      });
    }
  }

  render() {
    const {onClose, onDone, exercise} = this.props;

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
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
        </RN.View>
        <RN.View style={[s.flx_i, s.bg_blueDark, s.jcsb, s.pb175, s.ph125]}>
          <RN.ScrollView contentContainerStyle={s.pt175} scrollEnabled={false }>
            <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
              <RN.Text style={[s.f3, s.white]}>Attempts</RN.Text>
              <RN.View style={[s.aic, s.flx_row]}>
                <RN.TouchableOpacity
                  onPress={this.handleRemoveAttempt}
                  disabled={exercise.attempts.other.length === 0}
                  style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                  <Icon name="md-remove" size={sizes[175]} color={exercise.attempts.other.length === 0 ? colors.blueDark : colors.white} />
                </RN.TouchableOpacity>
                <RN.Text style={[s.f2, s.white, s.bg_t, s.b, s.tc, s.w3]}>{exercise.attempts.other.length + 1}</RN.Text>
                <RN.TouchableOpacity
                  onPress={this.handleAddAttempt}
                  disabled={exercise.attempts.other.length === 99}
                  style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                  <Icon name="md-add" size={sizes[175]} color={exercise.attempts.other.length >= 99 ? colors.blueDark : colors.white} />
                </RN.TouchableOpacity>
              </RN.View>
            </RN.View>
            <RN.View>
            <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
              <RN.Text style={[s.f3, s.white]}>Repeats</RN.Text>
              <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
                <RN.TextInput
                  value={String(exercise.attempts.first.repetitions || '')}
                  keyboardType="numeric"
                  underlineColorAndroid={colors.t}
                  placeholderTextColor={colors.white_20}
                  style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
                  placeholder="12"
                  onChangeText={(repeatsString) => this.handleChangeOverallRepeats(repeatsString)}
                  onBlur={() => RN.Keyboard.dismiss()}
                />
              </RN.View>
            </RN.View>

            <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
              <RN.View style={[s.flx_row, s.aife]}>
                <RN.Text style={[s.f3, s.white]}>Weight</RN.Text>
                <RN.Text style={[s.f4, s.white_20]}>, kg</RN.Text>
              </RN.View>
              <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
                <RN.TextInput
                  value={String(exercise.attempts.first.weight || '')}
                  keyboardType="numeric"
                  underlineColorAndroid={colors.t}
                  placeholderTextColor={colors.white_20}
                  style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
                  placeholder="25"
                  onChangeText={(weightString) => this.handleChangeOverallWeight(weightString)}
                  onBlur={() => RN.Keyboard.dismiss()}
                />
              </RN.View>
            </RN.View>

            <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
              <RN.View style={[s.flx_row, s.aife]}>
                <RN.Text style={[s.f3, s.white]}>Rest</RN.Text>
                <RN.Text style={[s.f4, s.white_20]}>, sec</RN.Text>
              </RN.View>
              <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
                <RN.TextInput
                  value={String(exercise.restSeconds || '')}
                  keyboardType="numeric"
                  underlineColorAndroid={colors.t}
                  placeholderTextColor={colors.white_20}
                  style={[s.bg_t, s.f2, s.b, s.white, s.h3, s.tc]}
                  placeholder="60"
                  onChangeText={(restSecondsString) => this.handleChangeRestSeconds(restSecondsString)}
                  onBlur={() => RN.Keyboard.dismiss()}
                />
              </RN.View>
            </RN.View>

          </RN.View>
          </RN.ScrollView>
          <RN.View>
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph4, s.mb075]}
              onPress={onDone}>
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Done</RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </RN.View>
    );
  }
}
