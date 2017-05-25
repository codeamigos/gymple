import * as React from 'react';
import * as RN from 'react-native';

import s from './styles';
import excerscisesData, {ExcerciseData} from './excercises';
import musclesData, {MuscleData} from './muscles';

console.log(s);
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
  filter: string | null,
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
      filter: null,
    };
  }

  addExercise = (exercise: Exercise) => {
    const { training } = this.state;

    this.setState({
      training: {
        ...training,
        plannedExercises: training.plannedExercises.concat(exercise),
      },
      isModalOpened: false,
      filter: null,
    });
  }

  render() {
    const { training, isModalOpened, filter } = this.state;

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
            <RN.TextInput
              style={trainingSceneStyles.availableExerciseFilter}
              placeholder="Filter"
              onChangeText={(text) => this.setState({ filter: text })}
            />
            <RN.ScrollView style={trainingSceneStyles.availableExerciseList}>
              {defaultExcercises
                .filter(exercise =>
                  !training.plannedExercises
                    .find(ex => ex.title === exercise.title),
                )
                .filter(exercise => filter
                  ? exercise.title.includes(filter)
                  : true,
                )
                .map(exercise =>
                  <RN.TouchableOpacity
                    key={exercise.title}
                    style={trainingSceneStyles.availableExercise}
                    onPress={() => this.addExercise(exercise)}
                  >
                    <RN.Text style={trainingSceneStyles.availableExerciseTitle}>
                      {exercise.title}
                    </RN.Text>
                    <RN.Text style={trainingSceneStyles.availableExerciseMuscles}>
                      {exercise.targetMuscles.map(({ title }) => title).join(', ')}
                    </RN.Text>
                  </RN.TouchableOpacity>,
                )
              }
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

  modal: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 30,
  } as RN.ViewStyle,

  availableExerciseFilter: {
    height: 44,
    padding: 10,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'purple',
  } as RN.ViewStyle,

  availableExerciseList: {
    flex: 1,
    marginTop: 10,
  } as RN.ViewStyle,

  availableExercise: {
    justifyContent: 'center',
    paddingVertical: 5,
  } as RN.ViewStyle,

  availableExerciseTitle: {
    fontSize: 16,
  } as RN.TextStyle,

  availableExerciseMuscles: {
    marginTop: 5,
    fontSize: 12,
  } as RN.TextStyle,
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
      }, [] as MuscleData[]);

    return {
      title,
      restSeconds: 90,
      attempts: [],
      targetMuscles,
    };
  });
}

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
