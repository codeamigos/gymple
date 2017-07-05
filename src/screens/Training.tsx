import * as React from 'react';
import * as RN from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import ExerciseList from './exerciseList';
import ExerciseSettings from './exerciseSettings';
import RunningExercise from './runningExercise';
import {shouldNeverHappen} from '../utils';
import * as I from '../interfaces';

import {colors, sizes, s} from './../styles';

interface TrainingScreenState {
  editingExercise: I.Exercise | null,
  editingExerciseIndex: number | null,
}

interface TrainingScreenProps {
  training: I.NotStartedTraining | I.OngoingTraining | I.FinishedTraining,
  onRestartFinished: (finishedTraining: I.FinishedTraining) => void,
  onFinish: () => void,
  onUpdate: (training: I.OngoingTraining | I.NotStartedTraining | I.FinishedTraining) => void,
}

export default class TrainingScreen extends React.PureComponent<TrainingScreenProps, TrainingScreenState> {
  constructor(props: TrainingScreenProps) {
    super(props);

    this.state = {
      editingExerciseIndex: null,
      editingExercise: null,
    };
  }

  setEditingExercise = (editingExercise: I.Exercise | null, editingExerciseIndex: number | null) => {
    this.setState({
      editingExercise: editingExercise ? {...editingExercise} : null,
      editingExerciseIndex,
    });
  }

  addExercise = (exercise: I.Exercise) => {
    const { onUpdate, training } = this.props;

    switch (training.kind) {
      case 'NotStartedTraining':
      case 'OngoingTraining':
        this.setState({
          editingExercise: null,
        });
        onUpdate({
          ...training,
          plannedExercises: training.plannedExercises.concat(exercise),
        });
        break;
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  updateExercise = (updatedExercise: I.Exercise, editingExerciseIndex: number) => {
    const { onUpdate, training } = this.props;

    switch (training.kind) {
      case 'NotStartedTraining':
      case 'OngoingTraining':
        this.setState({
          editingExercise: null,
          editingExerciseIndex: null,
        });
        onUpdate({
          ...training,
          plannedExercises: training.plannedExercises.map((exercise, i) => i === editingExerciseIndex ? updatedExercise : exercise),
        });
        break;
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  startTraining = () => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'NotStartedTraining':
      case 'OngoingTraining':
        onUpdate({
          kind: 'OngoingTraining',
          title: training.title,
          startedAt: new Date(),
          plannedExercises: training.plannedExercises,
          currentExerciseIndex: training.plannedExercises.length > 0 ? 0 : null,
          completedExercises: [],
        });
        break;
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  startExercise = (currentExerciseIndex: number | null) => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'OngoingTraining':
        onUpdate({
          ...training,
          currentExerciseIndex,
        });
        break;
      case 'NotStartedTraining':
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  restartExercise = (completedExerciseIndex: number) => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'OngoingTraining':
        const completedExercise = training.completedExercises[completedExerciseIndex];
        if (completedExercise) {
          onUpdate({
            ...training,
            plannedExercises: [completedExercise, ...training.plannedExercises],
            currentExerciseIndex: 0,
            completedExercises: training.completedExercises.filter((_, i) => i !== completedExerciseIndex),
          });
        }
        else {
          throw new Error('Trying to complete non-existing exercise');
        }
        break;
      case 'NotStartedTraining':
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  completeExercise = () => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'OngoingTraining':
        if (training.currentExerciseIndex !== null) {
          const completedExercise = training.plannedExercises[training.currentExerciseIndex];
          if (completedExercise) {
            onUpdate({
              ...training,
              plannedExercises: training.plannedExercises.filter((_, i) => i !== training.currentExerciseIndex),
              currentExerciseIndex: null,
              completedExercises: [...training.completedExercises, completedExercise],
            });
          }
          else {
            throw new Error('Trying to complete non-existing exercise');
          }
        }
        break;
      case 'NotStartedTraining':
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  removeExercise = (index: number) => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'NotStartedTraining':
      case 'OngoingTraining':
        onUpdate({
          ...training,
          plannedExercises: training.plannedExercises.filter((_, i) => i !== index),
        });
        break;
      case 'FinishedTraining':
        break;
      default: shouldNeverHappen(training);
    }
  }

  removeCompletedExercise = (index: number) => {
    const { onUpdate, training } = this.props;
    switch (training.kind) {
      case 'NotStartedTraining':
        break;
      case 'OngoingTraining':
      case 'FinishedTraining':
        onUpdate({
          ...training,
          completedExercises: training.completedExercises.filter((_, i) => i !== index),
        });
        break;
      default: shouldNeverHappen(training);
    }
  }

  render() {
    const {
      editingExerciseIndex,
      editingExercise,
    } = this.state;
    const {
      training,
      onFinish,
      onRestartFinished,
    } = this.props;
    switch (training.kind) {
      case 'NotStartedTraining':
        return <NotstartedTrainingScreen
                training={training}
                onFinish={onFinish}
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
                onFinish={onFinish}
                onRemoveCompletedExercise={this.removeCompletedExercise}
                onCompleteExercise={this.completeExercise}
                onRemoveExercise={this.removeExercise}
                onRestartExercise={this.restartExercise}
                onStartExercise={this.startExercise}/>;
      case 'FinishedTraining':
        return <FinishedTrainingScreen
                training={training}
                onFinish={onFinish}
                onRemoveCompletedExercise={this.removeCompletedExercise}
                onRestart={() => onRestartFinished(training)}/>;
      default:
        shouldNeverHappen(training);
        return null;
    }
  }
}





interface NotstartedTrainingScreenProps {
  training: I.NotStartedTraining,
  editingExercise: I.Exercise | null,
  editingExerciseIndex: number | null,
  onFinish: () => void,
  onAddExercise: (exercise: I.Exercise) => void,
  onUpdateExercise: (exercise: I.Exercise, i: number) => void,
  onSetEditingExercise: (exercise: I.Exercise | null, i: number | null) => void,
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
      onFinish,
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
          <RN.TouchableOpacity onPress={onFinish}>
            <Icon name="md-close" size={sizes[175]} color={colors.white} />
          </RN.TouchableOpacity>
          <RN.Text numberOfLines={2} style={[s.white, s.fw2, s.f2, s.lh2, s.mt05]}>
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
              onUpdate={(exercise: I.Exercise) => onSetEditingExercise(exercise, editingExerciseIndex)}
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
              onSelect={(exercise: I.Exercise) => onSetEditingExercise(exercise, null)}
              onClose={() => this.toggleModalOpen(false)}
            />
          }
        </RN.Modal>
      </RN.View>
    );
  }
}




interface FinishedTrainingScreenProps {
  training: I.FinishedTraining,
  onRestart: () => void,
  onRemoveCompletedExercise: (i: number) => void,
  onFinish: () => void,
}

interface FinishedTrainingScreenState {
  isScrollEnabled: boolean,
}

class FinishedTrainingScreen extends React.PureComponent<FinishedTrainingScreenProps, FinishedTrainingScreenState> {

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  state = {
    isScrollEnabled: false,
  };

  render() {
    const {
      training,
      onRemoveCompletedExercise,
      onRestart,
      onFinish,
    } = this.props;

    const {isScrollEnabled} = this.state;

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t} />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb05]}>
          <RN.TouchableOpacity onPress={onFinish}>
            <Icon name="md-close" size={sizes[175]} color={colors.white} />
          </RN.TouchableOpacity>
          <RN.Text numberOfLines={2} style={[s.white, s.fw2, s.f2, s.mv05, s.lh2]}>
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
              <CompletedExerciseListItem exercise={exercise} />
            </Swipeout>,
          )}
        </RN.ScrollView>
        <RN.View style={s.pb175}>
          <RN.TouchableOpacity
            style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
            onPress={onRestart}
          >
            <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
              Restart Training
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
    );
  }
}




interface OngoingTrainingScreenProps {
  training: I.OngoingTraining,
  onFinish: () => void,
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
      startCountDown: props.training.currentExerciseIndex !== null ? 3 : 0,
    };

    if (props.training.currentExerciseIndex !== null) {
      this.interval = setInterval(() => this.setState({startCountDown: this.state.startCountDown - 1}), 1000);
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
      onFinish,
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
          <RN.TouchableOpacity onPress={onFinish}>
            <Icon name="md-close" size={sizes[175]} color={colors.white} />
          </RN.TouchableOpacity>
          <RN.Text numberOfLines={2} style={[s.white, s.fw2, s.f2, s.mv05, s.lh2]}>
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
                <CompletedExerciseListItem exercise={exercise} />
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
        <RN.View style={s.pb175}>
          {training.plannedExercises.length > 0 ?
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={() => onStartExercise(0)}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                Start next Exercise
              </RN.Text>
            </RN.TouchableOpacity>
          :
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={onFinish}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                Finish Training
              </RN.Text>
            </RN.TouchableOpacity>
          }
        </RN.View>
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




const ExerciseListItem = ({exercise}: {exercise: I.Exercise}) => {
  return (
    <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
      <RN.Text style={[s.f4, s.fw2, s.bg_t, s.blue, s.flx_i, s.mb025, s.lh125]}>
        {exercise.title}
      </RN.Text>
      <RN.Text style={[s.f6, s.fw3]}>
        {exercise.targetMuscles.map(({ title }) => title).join(', ')}
      </RN.Text>
    </RN.View>
  );
};


const CompletedExerciseListItem = ({exercise}: {exercise: I.Exercise}) => {

  const attempts = [exercise.attempts.first, ...exercise.attempts.other];

  const repetitionsAvg = Math.round(attempts.reduce((acc, a) => acc + a.repetitions, 0) / attempts.length);

  return (
    <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
      <RN.Text style={[s.f4, s.fw2, s.bg_t, s.blue, s.flx_i, s.mb025, s.lh125]}>
        {exercise.title}
      </RN.Text>
      <RN.Text style={[s.f6, s.fw3]}>
        {exercise.targetMuscles.map(({ title }) => title).join(', ')}
      </RN.Text>
      <RN.View style={[s.mt05, s.flx_row, s.aic, s.mt0125]}>
        <RN.Text style={[s.f5, s.fw3]}>{attempts.length} <RN.Text style={[s.f7, s.black_40]}>{attempts.length > 1 ? 'ATTEMPTS' : 'ATTEMPT'}</RN.Text></RN.Text>
        <Icon name="ios-close" color={colors.black_20} style={[s.f5, s.ph025]} />
        <RN.Text style={[s.f5, s.fw3]}>{repetitionsAvg} <RN.Text style={[s.f7, s.black_40]}>{repetitionsAvg > 1 ? 'REPS' : 'REP'}</RN.Text></RN.Text>
        <Icon name="ios-close" color={colors.black_20} style={[s.f5, s.ph025]} />
        <RN.Text style={[s.f5, s.fw3]}>{Math.round(attempts.reduce((acc, a) => acc + a.weight, 0) / attempts.length)} <RN.Text style={[s.f7, s.black_40]}>KG</RN.Text></RN.Text>
      </RN.View>
    </RN.View>
  );
};
