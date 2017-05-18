import * as React from 'react';
import * as RN from 'react-native';
import excerscisesData, {ExcerciseData} from './excercises';
import musclesData, {MuscleData} from './muscles';

// import * as ReactIntl from 'react-intl';
// import 'intl';

// import localizations from './localizations';

/*
const en = require('react-intl/locale-data/en');
const ru = require('react-intl/locale-data/ru');

ReactIntl.addLocaleData([...en, ...ru]);


interface Profile {
  active: NotStartedTraining | OngoingTraining | null,
  history: FinishedTraining[],
}

type Training = NotStartedTraining | OngoingTraining | FinishedTraining;
*/

interface NotStartedTraining {
  title: string,
  plannedExercises: Exercise[],
}

/*
interface OngoingTraining {
  title: string,
  startedAt: Date,
  plannedExercises: Exercise[],
  currentExerciseIndex: number | null,
  completedExercises: Exercise[],
}

interface FinishedTraining {
  title: string,
  startedAt: Date,
  finishedAt: Date,
  completedExercises: Exercise[],
}
*/

interface Exercise {
  title: string,
  restSeconds: number,
  attempts: Array<{
    weight: number,
    repititions: number,
  }>,
  targetMuscles: Muscle[]
}

interface Muscle {
  id: number,
  title: string,
}


interface TrainingScreenState {
  training: NotStartedTraining,
  isModalOpened: boolean,
}

class TrainingScreen extends React.PureComponent<void, TrainingScreenState> {
  constructor(props: void) {
    super(props);

    this.state = {
      training: {
        title: 'Untitled',
        plannedExercises: [],
      },
      isModalOpened: false,
    };
  }

  render() {
    const { training, isModalOpened } = this.state;

    const defaultExcercises = generateDefaultExcersices(excerscisesData, musclesData);

    return (
      <RN.ScrollView contentContainerStyle={trainingSceneStyles.screen}>
        <RN.View style={trainingSceneStyles.header}>
          <RN.Text style={trainingSceneStyles.title}>
            {training.title}
          </RN.Text>
          <RN.Text style={trainingSceneStyles.date}>
            Сегодня
          </RN.Text>
        </RN.View>
        {training.plannedExercises.map(exercise =>
          <RN.View key={exercise.title} style={trainingSceneStyles.exercise}>
            <RN.Text>
              {exercise.title}
            </RN.Text>
          </RN.View>,
        )}
        <RN.TouchableHighlight style={trainingSceneStyles.addBtn} onPress={() => this.setState({ isModalOpened: true })}>
          <RN.Text style={trainingSceneStyles.addBtnText}>
            Добавить упражнение
          </RN.Text>
        </RN.TouchableHighlight>
        <RN.Modal
          animationType="slide"
          transparent={false}
          visible={isModalOpened}
          onRequestClose={() => this.setState({ isModalOpened: false })}
        >
          <RN.View style={trainingSceneStyles.modal}>
            <RN.Text>Add exercise</RN.Text>
            <RN.TextInput style={trainingSceneStyles.availableExcerciseFilter} placeholder="Filter" />
            <RN.ScrollView style={trainingSceneStyles.availableExcerciseList}>
              {defaultExcercises.map(ecercise =>
                <RN.View key={ecercise.title}>
                  <RN.Text>{ecercise.title}</RN.Text>
                  <RN.Text>{ecercise.targetMuscles.join(', ')}</RN.Text>
                </RN.View>,
              )}
            </RN.ScrollView>
          </RN.View>
        </RN.Modal>
      </RN.ScrollView>
    );
  }
}

const trainingSceneStyles = RN.StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  } as RN.ViewStyle,

  header: {
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'grey',
  } as RN.ViewStyle,

  title: {
    fontSize: 20,
    color: 'purple',
  } as RN.TextStyle,

  date: {
    color: 'purple',
  } as RN.TextStyle,

  exercise: {} as RN.ViewStyle,

  addBtn: {
    alignItems: 'center',
    backgroundColor: 'purple',
    paddingVertical: 20,
    paddingHorizontal: 50,
  } as RN.ViewStyle,

  addBtnText: {
    color: 'white',
  } as RN.TextStyle,

  availableExcerciseList: {
    flex: 1,
  } as RN.ViewStyle,

  availableExcerciseFilter: {
    height: 44,
    alignContent: 'center',
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  } as RN.ViewStyle,

  modal: {
    flexGrow: 1,
    backgroundColor: 'blue',
  } as RN.ViewStyle,
});

function generateDefaultExcersices(
    excerscsesData: ExcerciseData[],
    musclesData: MuscleData[],
  ): Exercise[] {

 return excerscsesData.map(({title, targetMusclesIds, additionalMusclesIds}) => {
    const targetMuscles = [...targetMusclesIds, ...additionalMusclesIds]
      .reduce((acc, muscleId) => {
        const muscleData = musclesData.find(muscle => muscle.id === muscleId);
        if (muscleData) { return [...acc, muscleData]; }
        return acc;
      }, []);

    return {
      title,
      restSeconds: 90,
      attempts: [],
      targetMuscles,
    };
  });
}

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
