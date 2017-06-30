import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import ExerciseList from './exerciseList';
import ExerciseSettings from './exerciseSettings';
import RunningExercise from './runningExercise';
import {shouldNeverHappen} from '../utils';
import {Exercise, NotStartedTraining, OngoingTraining} from '../interfaces';

import {colors, sizes, s} from './../styles';

interface TrainingScreenState {
  training: NotStartedTraining | OngoingTraining,
  editingExercise: Exercise | null,
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
    };
  }

  setEditingExercise = (editingExercise: Exercise | null, editingExerciseIndex: number | null) => {
    this.setState({
      editingExercise: editingExercise ? {...editingExercise} : null,
      editingExerciseIndex,
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

  startExercise = (currentExerciseIndex: number | null) => {
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

  restartExercise = (completedExerciseIndex: number) => {
    const {training} = this.state;
    switch (training.kind) {
      case 'NotStartedTraining':
        break;
      case 'OngoingTraining':
        const completedExercise = training.completedExercises[completedExerciseIndex];
        if (completedExercise) {
          this.setState({
            training: {
              ...training,
              plannedExercises: [completedExercise, ...training.plannedExercises],
              currentExerciseIndex: 0,
              completedExercises: training.completedExercises.filter((_, i) => i !== completedExerciseIndex),
            },
          });
        }
        else {
          throw new Error('Trying to complete non-existing exercise');
        }
        break;
      default: shouldNeverHappen(training);
    }
  }

  completeExercise = () => {
    const {training} = this.state;
    switch (training.kind) {
      case 'NotStartedTraining':
        break;
      case 'OngoingTraining':
        if (training.currentExerciseIndex !== null) {
          const completedExercise = training.plannedExercises[training.currentExerciseIndex];
          if (completedExercise) {
            this.setState({
              training: {
                ...training,
                plannedExercises: training.plannedExercises.filter((_, i) => i !== training.currentExerciseIndex),
                currentExerciseIndex: null,
                completedExercises: [...training.completedExercises, completedExercise],
              },
            });
          }
          else {
            throw new Error('Trying to complete non-existing exercise');
          }
        }
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

  render() {
    const {
      training,
      editingExerciseIndex,
      editingExercise,
    } = this.state;
    switch (training.kind) {
      case 'NotStartedTraining':
        return <NotstartedTrainingScreen
                training={training}
                editingExerciseIndex={editingExerciseIndex}
                editingExercise={editingExercise}
                onAddExercise={this.addExercise}
                onSetEditingExercise={this.setEditingExercise}
                onUpdateExercise={this.updateExercise}
                onRemoveExercise={this.removeExercise}
                onStartTraining={this.startTraining} />;
      case 'OngoingTraining':
        return <OngoingTrainingScreen
                training={training}
                onRemoveCompletedExercise={this.removeCompletedExercise}
                onCompleteExercise={this.completeExercise}
                onRemoveExercise={this.removeExercise}
                onRestartExercise={this.restartExercise}
                onStartExercise={this.startExercise}/>;
      default:
        shouldNeverHappen(training);
        return null;
    }
  }
}






const ExerciseListItem = ({exercise}: {exercise: Exercise}) => {
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





interface NotstartedTrainingScreenProps {
  training: NotStartedTraining,
  editingExercise: Exercise | null,
  editingExerciseIndex: number | null,
  onAddExercise: (exercise: Exercise) => void,
  onUpdateExercise: (exercise: Exercise, i: number) => void,
  onSetEditingExercise: (exercise: Exercise | null, i: number | null) => void,
  onRemoveExercise: (i: number) => void,
  onStartTraining: () => void,
}

interface NotstartedTrainingScreenState {
  isScrollEnabled: boolean,
  isModalOpened: boolean,
}


class NotstartedTrainingScreen extends React.PureComponent<NotstartedTrainingScreenProps, NotstartedTrainingScreenState> {

  constructor(props: NotstartedTrainingScreenProps) {
    super(props);
    this.state = {
      isModalOpened: false,
      isScrollEnabled: true,
    };
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  toggleModalOpen = (isModalOpened: boolean) => {
    this.setState({isModalOpened});
  }

  render() {
    const {
      training,
      editingExerciseIndex,
      editingExercise,
      onAddExercise,
      onSetEditingExercise,
      onUpdateExercise,
      onRemoveExercise,
      onStartTraining,
    } = this.props;

    const {
      isScrollEnabled,
      isModalOpened,
    } = this.state;

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
                      onPress: () => onRemoveExercise(i),
                      component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                    },
                  ]}
                >
                  <RN.TouchableOpacity onPress ={() => onSetEditingExercise(exercise, i)}>
                    <ExerciseListItem exercise={exercise} />
                  </RN.TouchableOpacity>
                </Swipeout>,
              )}
              <RN.TouchableOpacity
                style={[s.asc, s.h325, s.jcc, s.ph3]}
                onPress={() =>  this.toggleModalOpen(true)}
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
                onPress={onStartTraining}
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
              onPress={() =>  this.toggleModalOpen(true)}
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
          visible={isModalOpened || !!editingExercise}
          onRequestClose={() =>  {
            this.toggleModalOpen(false);
            onSetEditingExercise(null, null);
          }}>
          {editingExercise ?
            <ExerciseSettings
              onUpdate={(exercise: Exercise) => onSetEditingExercise(exercise, editingExerciseIndex)}
              onClose={() => onSetEditingExercise(null, null)}
              onDone={() => {
                if (editingExerciseIndex !== null) {
                  onUpdateExercise(editingExercise, editingExerciseIndex);
                }
                else {
                  onAddExercise(editingExercise);
                }
                this.toggleModalOpen(false);
              }}
              exercise={editingExercise}
            />
            :
            <ExerciseList
              onSelect={(exercise: Exercise) => onSetEditingExercise(exercise, null)}
              onClose={() => this.toggleModalOpen(false)}
            />
          }
        </RN.Modal>
      </RN.View>
    );
  }
}




interface OngoingTrainingScreenProps {
  training: OngoingTraining,
  onStartExercise: (i: number | null) => void,
  onRestartExercise: (i: number) => void,
  onRemoveExercise: (i: number) => void,
  onRemoveCompletedExercise: (i: number) => void,
  onCompleteExercise: () => void,
}

interface OngoingTrainingScreenState {
  isScrollEnabled: boolean,
  startCountDown: number,
}

class OngoingTrainingScreen extends React.PureComponent<OngoingTrainingScreenProps, OngoingTrainingScreenState> {

  interval: number;

  constructor(props: OngoingTrainingScreenProps) {
    super(props);
    this.state = {
      isScrollEnabled: true,
      startCountDown: props.training.currentExerciseIndex !== null ? 1 : 0,
    };

    if (props.training.currentExerciseIndex !== null) {
      setInterval(() => this.setState({startCountDown: this.state.startCountDown - 1}), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  render() {
    const {
      training,
      onRemoveCompletedExercise,
      onCompleteExercise,
      onStartExercise,
      onRestartExercise,
      onRemoveExercise,
    } = this.props;

    const { isScrollEnabled, startCountDown } = this.state;
    const currentExercise = training.currentExerciseIndex !== null && training.plannedExercises[training.currentExerciseIndex];

    if (training.currentExerciseIndex !== null && !currentExercise) {
      throw new Error('Trying to access not existing exercise');
    }

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t} />
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
                  onPress: () => onRemoveCompletedExercise(i),
                  component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                },
              ]}>
              <RN.TouchableOpacity
                onPress={() => onRestartExercise(i)}
                style={[s.ass, s.brw5, s.b_green]}>
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
                  onPress: () => onRemoveExercise(i),
                  component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                },
              ]}>
                <RN.TouchableOpacity
                  onPress={() => onStartExercise(i)}
                  style={[s.ass]}>
                  <ExerciseListItem exercise={exercise} />
                </RN.TouchableOpacity>
            </Swipeout>,
          )}
        </RN.ScrollView>
        <RN.Modal
          animationType="slide"
          transparent={false}
          visible={!!currentExercise}
          onRequestClose={() => onStartExercise(null)}>
            {startCountDown > 0 && currentExercise &&
              <RN.View style={[s.flx_i, s.jcc, s.bg_blue, s.aic, s.ph4]}>
                <RN.Text style={[s.fw3, s.f5, s.tc, s.white, s.mb1]}>Starting training in</RN.Text>
                <RN.Text style={[s.fw2, s.f1, s.tc, s.white]}>{startCountDown}</RN.Text>
                <RN.View style={[s.btw1, s.b_white_10, s.mt2, s.pt2]}>
                  <RN.Text style={[s.fw3, s.f6, s.white, s.tc, s.mb05]}>First exercise</RN.Text>
                  <RN.Text style={[s.fw3, s.f4, s.white, s.tc]}>{currentExercise.title}</RN.Text>
                </RN.View>
              </RN.View>
            }
            {startCountDown <= 0 && currentExercise &&
              <RunningExercise onClose={() => onStartExercise(null)} onDone={onCompleteExercise} exercise={currentExercise} />
            }
        </RN.Modal>
      </RN.View>
    );
  }
}
