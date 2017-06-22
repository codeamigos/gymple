import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Exercise} from '../interfaces';

import bs from './../styles';
const {styles: s, sizes, colors} = bs;

interface ExerciseSettingsProps {
  onClose: () => void,
  onUpdate: (exercise: Exercise) => void,
  onDone: () => void,
  exercise: Exercise,
}

export default class ExerciseSettings extends React.PureComponent<ExerciseSettingsProps, void> {

  handleAddAttempt = () => {
    const {exercise, onUpdate} = this.props;
    const attempts = exercise.attempts.length >= 1
      ? exercise.attempts.concat(exercise.attempts[exercise.attempts.length - 1])
      : exercise.attempts.concat({weight: 30, repetitions: 12});
    onUpdate({
      ...exercise,
      attempts,
    });
  };

  handleRemoveAttempt = () => {
    const {exercise, onUpdate} = this.props;
    if (exercise.attempts.length >= 2) {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.slice(0, exercise.attempts.length - 1),
      });
    }
  };

  handleChangeOverallWeight = (weightString: string) => {
    const {exercise, onUpdate} = this.props;
    if (!isNaN(parseInt(weightString, 10)) && parseInt(weightString, 10) > 0) {
      const weight = parseInt(weightString, 10);
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, weight})),
      });
    }
    else {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, weight: 0})),
      });
    }
  };

  handleChangeOverallRepeats = (repeatsString: string) => {
    const {exercise, onUpdate} = this.props;
     if (!isNaN(parseInt(repeatsString, 10)) && parseInt(repeatsString, 10) > 0) {
      const repetitions = parseInt(repeatsString, 10);
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, repetitions})),
      });
    }
    else {
      onUpdate({
        ...exercise,
        attempts: exercise.attempts.map(attempt => ({...attempt, repetitions: 1})),
      });
    }
  };

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
  };

  render() {
    const {exercise, onClose, onDone} = this.props;
    const exerciseHasAttempts = exercise.attempts.length > 0;

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
                  disabled={exercise.attempts.length === 1}
                  style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                  <Icon name="md-remove" size={sizes[175]} color={exercise.attempts.length <= 1 ? colors.blueDark : colors.white} />
                </RN.TouchableOpacity>
                <RN.Text style={[s.f2, s.white, s.bg_t, s.b, s.tc, s.w3]}>{exercise.attempts.length}</RN.Text>
                <RN.TouchableOpacity
                  onPress={this.handleAddAttempt}
                  disabled={exercise.attempts.length === 99}
                  style={[s.bg_white_10, s.br2, s.w175, s.h175, s.aic]}>
                  <Icon name="md-add" size={sizes[175]} color={exercise.attempts.length >= 99 ? colors.blueDark : colors.white} />
                </RN.TouchableOpacity>
              </RN.View>
            </RN.View>
            {exerciseHasAttempts &&
            <RN.View>
              <RN.View style={[s.flx_row, s.jcsb, s.aic, s.mb15]}>
                <RN.Text style={[s.f3, s.white]}>Repeats</RN.Text>
                <RN.View style={[s.bg_black_10, s.ph075, s.h3, s.br025, s.w65]}>
                  <RN.TextInput
                    value={String(exercise.attempts[exercise.attempts.length - 1].repetitions || '')}
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
                    value={String(exercise.attempts[exercise.attempts.length - 1].weight || '')}
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
            }
          </RN.ScrollView>
          <RN.View>
            <RN.TouchableHighlight
              disabled={!exerciseHasAttempts}
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph4, s.mb075, !exerciseHasAttempts ? s.o_50 : null]}
              onPress={onDone}>
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>Done</RN.Text>
            </RN.TouchableHighlight>
          </RN.View>
        </RN.View>
      </RN.View>
    );
  }
};
