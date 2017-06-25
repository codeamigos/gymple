import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import ExerciseList from './exerciseList';
import ExerciseSettings from './exerciseSettings';
import RunningExercise from './runningExercise';
import {shouldNeverHappen} from '../utils';
import {Exercise, NotStartedTraining, OngoingTraining} from '../interfaces';

import bs from './../styles';
const {styles: s, sizes, colors} = bs;

console.log('from training', colors);

interface TrainingScreenState {
  training: NotStartedTraining | OngoingTraining,
  editingExercise: Exercise | null,
  isModalOpened: boolean,
  isScrollEnabled: boolean,
  editingExerciseIndex: number | null,
}

export default class TrainingScreen extends React.PureComponent<void, TrainingScreenState> {
  constructor(props: void) {
    super(props);

    this.state = {
      training: {
        kind: 'NotStartedTraining',
        title: 'New training',
        plannedExercises: [],
      },
      editingExerciseIndex: null,
      editingExercise: null,
      isModalOpened: true,
      isScrollEnabled: true,
    };
  }

  setEditingExercise = (editingExercise: Exercise, editingExerciseIndex: number | null = null) => {
    this.setState({
      editingExercise: {...editingExercise},
      editingExerciseIndex,
      isModalOpened: true,
    });
  }

  addExercise = (exercise: Exercise) => {
    const { training } = this.state;
    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.concat(exercise),
      },
      editingExercise: null,
      isModalOpened: false,
    });
  }

  updateExercise = (updatedExercise: Exercise, editingExerciseIndex: number) => {
    const { training } = this.state;
    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.map((exercise, i) => i === editingExerciseIndex ? updatedExercise : exercise),
      },
      editingExercise: null,
      editingExerciseIndex: null,
      isModalOpened: false,
    });
  }

  startTraining = () => {
    const {training} = this.state;
    this.setState({
      training: {
        kind: 'OngoingTraining',
        title: training.title,
        startedAt: new Date(),
        plannedExercises: training.plannedExercises,
        currentExerciseIndex: training.plannedExercises.length > 0 ? 0 : null,
        completedExercises: [],
      },
    });
  }

  startExercise = (currentExerciseIndex: number) => {
    const {training} = this.state;
    switch (training.kind) {
      case 'NotStartedTraining':
        break;
      case 'OngoingTraining':
        this.setState({
          training: {
            ...training,
            currentExerciseIndex,
          },
        });
        break;
      default: shouldNeverHappen(training);
    }
  }

  removeExercise = (index: number) => {
    const { training } = this.state;
    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.filter((_, i) => i !== index),
      },
    });
  }

  removeCompletedExercise = (index: number) => {
    const { training } = this.state;
    switch (training.kind) {
      case 'NotStartedTraining':
        break;
      case 'OngoingTraining':
        this.setState({
          training: {
            ...training,
            completedExercises: training.completedExercises.filter((_, i) => i !== index),
          },
        });
        break;
      default: shouldNeverHappen(training);
    }
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  renderNotStartedTraining = (training: NotStartedTraining): JSX.Element => {
    const {isModalOpened, isScrollEnabled, editingExercise, editingExerciseIndex } = this.state;

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t}
          />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb1]}>
          <RN.Text style={[s.white, s.fw3, s.f2, s.lh2]}>
            {training.title}
          </RN.Text>
        </RN.View>
        {training.plannedExercises.length > 0 ?
          <RN.View style={[s.flx_i, s.jcsb]}>
            <RN.ScrollView style={[s.flx_i]} scrollEnabled={isScrollEnabled}>
              {training.plannedExercises.map((exercise, i) =>
                <Swipeout
                  autoClose={true}
                  key={exercise.title + i}
                  backgroundColor={colors.t}
                  scroll={isAllow => this.allowScroll(isAllow)}
                  buttonWidth={sizes[5]}
                  right={[
                    {
                      onPress: () => this.setEditingExercise(exercise, i),
                      component: <RN.View style={[s.w5, s.bg_green, s.jcc, s.flx_i]}><Icon name="md-create" style={[s.white, s.f3, s.tc]} /></RN.View>,
                    },
                    {
                      onPress: () => this.removeExercise(i),
                      component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                    },
                  ]}
                >
                  <ExerciseListItem exercise={exercise} />
                </Swipeout>,
              )}
              <RN.TouchableOpacity
                style={[s.asc, s.h325, s.jcc, s.ph3]}
                onPress={() => this.setState({ isModalOpened: true })}
              >
                <RN.View style={[s.flx_row, s.flx_i, s.aic]}>
                  <Icon name="md-add" style={[s.green, s.f2, s.tc, s.mr05]} />
                  <RN.Text style={[s.f4, s.green, s.tc, s.b, s.jcc, s.aic]}>
                    Add Exercise
                  </RN.Text>
                </RN.View>
              </RN.TouchableOpacity>
            </RN.ScrollView>
            <RN.View style={s.pb175}>
              <RN.TouchableOpacity
                style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
                onPress={this.startTraining}
              >
                <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                  Start Training
                </RN.Text>
              </RN.TouchableOpacity>
            </RN.View>
          </RN.View>
          :
          <RN.View style={[s.flx_i, s.aic, s.jcc]}>
            <RN.Text style={[s.tc, s.f4, s.ph3, s.fw3, s.mb075, s.grey]}>There is no Exercises in your training yet</RN.Text>
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={() => this.setState({ isModalOpened: true })}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                Add First Exercise
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        }
        <RN.Modal
          animationType="slide"
          transparent={false}
          visible={isModalOpened}
          onRequestClose={() => this.setState({ isModalOpened: false })}
        >
          {editingExercise ?
            <ExerciseSettings
              onUpdate={(exercise: Exercise) => this.setState({editingExercise: exercise})}
              onClose={() => this.setState({ editingExercise: null, isModalOpened: editingExerciseIndex === null })}
              onDone={() => editingExerciseIndex !== null ? this.updateExercise(editingExercise, editingExerciseIndex) : this.addExercise(editingExercise)}
              exercise={editingExercise}
            />
            :
            <ExerciseList
              onSelect={this.setEditingExercise}
              onClose={() => this.setState({ isModalOpened: false })}
            />
          }
        </RN.Modal>
      </RN.View>
    );
  }

  renderOngoingTraining = (training: OngoingTraining): JSX.Element => {
    const { isScrollEnabled } = this.state;
    if (training.currentExerciseIndex === null) {
      return (
        <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
          <RN.StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={colors.t}
            />
          <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
            <RN.Text style={[s.white, s.fw3, s.f2, s.mb05, s.lh2]}>
              {training.title}
            </RN.Text>
            <RN.Text style={[s.white, s.f5, s.mb05]}>
              Today
            </RN.Text>
          </RN.View>
          <RN.ScrollView style={[s.flx_i]} scrollEnabled={isScrollEnabled}>
            {training.completedExercises.map((exercise, i) =>
              <Swipeout
                autoClose={true}
                key={exercise.title + i}
                backgroundColor={colors.t}
                scroll={isAllow => this.allowScroll(isAllow)}
                buttonWidth={sizes[5]}
                right={[
                  {
                    onPress: () => this.removeCompletedExercise(i),
                    component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                  },
                ]}
              >
                <RN.TouchableOpacity
                  onPress={() => this.startExercise(i)}
                  style={[s.ass, s.brw2, s.b_green]}>
                  <ExerciseListItem exercise={exercise} />
                </RN.TouchableOpacity>
              </Swipeout>,
            )}
            {training.plannedExercises.map((exercise, i) =>
              <Swipeout
                autoClose={true}
                key={exercise.title + i}
                backgroundColor={colors.t}
                scroll={isAllow => this.allowScroll(isAllow)}
                buttonWidth={sizes[5]}
                right={[
                  {
                    onPress: () => this.removeExercise(i),
                    component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                  },
                ]}
              >
                  <RN.TouchableOpacity
                    onPress={() => this.startExercise(i)}
                    style={[s.ass, s.brw2, s.b_green]}>
                    <ExerciseListItem exercise={exercise} />
                  </RN.TouchableOpacity>
              </Swipeout>,
            )}
          </RN.ScrollView>
        </RN.View>
      );
    }

    return <RunningExercise onClose={() => {}} onDone={() => {}} exercise={training.plannedExercises[training.currentExerciseIndex]} />;

  }


  render() {
    const {training} = this.state;
    switch (training.kind) {
      case 'NotStartedTraining': return this.renderNotStartedTraining(training);
      case 'OngoingTraining': return this.renderOngoingTraining(training);
      default:
        shouldNeverHappen(training);
        return null;
    }
  }
}

interface ExerciseListItemProps {
  exercise: Exercise,
}

const ExerciseListItem = ({exercise}: ExerciseListItemProps) => {
  return (
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
  );
};

