import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {shouldNeverHappen} from '../utils';
import {ExerciseTemplate, Exercise} from '../interfaces';
import exerscisesData, {ExerciseData} from '../exercises';
import musclesData, {MuscleData} from '../muscles';

import bs from './../styles';
const {styles: s, sizes, colors} = bs;

interface ExerciseListProps {
  onClose: () => void,
  onSelect: (exercise: Exercise) => void,
}

interface ExerciseListState {
  filter: string | null,
  exercises: ExerciseTemplate[],
}

export default class ExerciseList extends React.PureComponent<ExerciseListProps, ExerciseListState> {
  constructor(props: ExerciseListProps) {
    super(props);
    this.state = {
      filter: null,
      exercises: generateDefaultExersices(exerscisesData, musclesData),
    };
  }

  handleSelect = (exerciseTemplate: ExerciseTemplate) => {
    this.props.onSelect(convertTemplateToGenericExercise(exerciseTemplate));
  }

  render() {
    const {filter, exercises} = this.state;
    const {onClose} = this.props;
    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.View style={[s.bg_blue, s.pt2, s.ph05, s.pb05]}>
          <RN.TouchableOpacity onPress={onClose}>
            <Icon name="md-close" size={sizes[175]} color={colors.white} style={s.ml075} />
          </RN.TouchableOpacity>
          <RN.View style={[s.mv05, s.bg_blueDark, s.ph075, s.h3, s.flx_row, s.br025]}>
            <RN.View style={[s.w2, s.jcc]} >
              <Icon name="ios-search" size={sizes[175]} color={colors.white_20} />
            </RN.View>
            <RN.TextInput
              underlineColorAndroid={colors.t}
              placeholderTextColor={colors.white_20}
              style={[s.bg_t, s.f4, s.flx_i, s.white, s.h3, s.jcc]}
              placeholder="Search through exercises"
              onChangeText={(text) => this.setState({ filter: text })}
            />
          </RN.View>
        </RN.View>
        <RN.ScrollView style={[s.flx_i]}>
          {exercises
            .filter(exercise => filter
              ? exercise.title.includes(filter)
              : true,
            )
            .map(exercise =>
              <RN.TouchableOpacity key={exercise.title} onPress={() => this.handleSelect(exercise)}>
                <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
                  <RN.View style={[s.flx_row, s.jcsb, s.aifs]}>
                    <RN.Text style={[s.f4, s.bg_t, s.blue, s.flx_i, s.mb025, s.lh125]}>
                      {exercise.title}
                    </RN.Text>
                    {/*{exercise.attempts.length > 0 &&
                      <RN.View style={[s.ml075, s.flx_row, s.aic, s.mt0125]}>
                        <RN.Text style={[s.f6, s.b]}>{exercise.attempts.length}</RN.Text>
                        <Icon name="md-close" color={colors.black_20} style={[s.f5, s.ph025]} />
                        <RN.Text style={[s.f6, s.b]}>{Math.round(exercise.attempts.reduce((acc, a) => acc + a.repetitions, 0) / exercise.attempts.length)}</RN.Text>
                        <Icon name="md-close" color={colors.black_20} style={[s.f5, s.ph025]} />
                        <RN.Text style={[s.f6, s.b]}>{Math.round(exercise.attempts.reduce((acc, a) => acc + a.weight, 0) / exercise.attempts.length)}kg</RN.Text>
                      </RN.View>
                    }*/}
                  </RN.View>
                  <RN.Text style={[s.f6]}>
                    {exercise.targetMuscles.map(({ title }) => title).join(', ')}
                  </RN.Text>
                </RN.View>
              </RN.TouchableOpacity>,
            )
          }
        </RN.ScrollView>
      </RN.View>
    );
  }
}

const generateDefaultExersices = (
    exerscsesData: ExerciseData[],
    musclesData: MuscleData[],
  ): ExerciseTemplate[] => {

  return exerscsesData.map(({title, targetMusclesIds, additionalMusclesIds}) => {
    const targetMuscles = [...targetMusclesIds, ...additionalMusclesIds]
      .reduce((acc, muscleId) => {
        const muscleData = musclesData.find(muscle => muscle.id === muscleId);
        if (muscleData) { return [...acc, muscleData]; }
        return acc;
      }, [] as MuscleData[]);

    return {
      kind: 'ExerciseTemplate',
      title,
      restSeconds: 90,
      targetMuscles,
    } as ExerciseTemplate;
  });
};


const convertTemplateToGenericExercise = (exercise: Exercise | ExerciseTemplate): Exercise => {
    switch (exercise.kind) {
      case 'Exercise': return exercise;
      case 'ExerciseTemplate': return {
          kind: 'Exercise',
          title: exercise.title,
          restSeconds: exercise.restSeconds,
          targetMuscles: exercise.targetMuscles,
          attempts: {
            first: {weight: 30, repetitions: 8},
            other: [],
          },
      };
      default: return shouldNeverHappen(exercise);
    }
  };
