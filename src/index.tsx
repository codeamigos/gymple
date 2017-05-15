import * as React from 'react';
import * as RN from 'react-native';
import * as ReactIntl from 'react-intl';
import { StackNavigator } from 'react-navigation';
import 'intl';

import localizations from './localizations';

const en = require('react-intl/locale-data/en');

ReactIntl.addLocaleData([...en]);


interface Exercise {
  title: string,
  restSeconds: number,
  attempts: {
    weight: number,
    repititions: number,
  }[],
}

/*
type Training = NotStartedTraining | OngoingTraining | FinishedTraining;

interface NotStartedTraining {
  title: string,
  plannedExercises: Exercise[],
}

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

interface Profile {
  active: NotStartedTraining | OngoingTraining | null,
  history: FinishedTraining[],
}
*/

interface TrainingScreenProps {
  navigation: any,
  screenProps: {
    intl: ReactIntl.InjectedIntl,
  },
}

interface TrainingScreneState {
  exercises: Exercise[],
}

class TrainingScrene extends React.Component<TrainingScreenProps, TrainingScreneState> {
  constructor() {
    super();

    this.state = {
      exercises: [
        { title: 'Жим лежа', restSeconds: 60, attempts: [] },
        { title: 'Присед', restSeconds: 60, attempts: [] }
      ],
    };
  }

  render() {
    const { intl } = this.props.screenProps;
    const { navigate } = this.props.navigation;
    const { exercises } = this.state;

    return (
      <RN.ScrollView contentContainerStyle={trainingSceneStyles.container}>
        <RN.View style={trainingSceneStyles.header}>
          <RN.Text style={trainingSceneStyles.title}>
            Тренировка
          </RN.Text>
          <RN.Text style={trainingSceneStyles.date}>
            {intl.formatMessage({ id: 'test' })}
          </RN.Text>
        </RN.View>
        {exercises.map(exercise =>
          <RN.View key={exercise.title} style={trainingSceneStyles.exercise}>
            <RN.Text>
              {exercise.title}
            </RN.Text>
          </RN.View>
        )}
        <RN.TouchableHighlight style={trainingSceneStyles.addBtn} onPress={() => navigate('AddExercise')}>
          <RN.Text style={trainingSceneStyles.addBtnText}>
            Добавить упражнение
          </RN.Text>
        </RN.TouchableHighlight>
      </RN.ScrollView>
    );
  }
}

const trainingSceneStyles = RN.StyleSheet.create({
  container: {
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
});


function AddExerciseScene() {
  return (
    <RN.View>
      <RN.Text>Add exercise</RN.Text>
    </RN.View>
  );
} 


const Navigator = StackNavigator({
  Training: { screen: TrainingScrene },
  AddExercise: { screen: AddExerciseScene },
});


function App() {
  return (
    <Navigator screenProps={{
      intl: new ReactIntl.IntlProvider({ locale: 'en', messages: localizations.en }, {}).getChildContext().intl
    }} />
  );
}

RN.AppRegistry.registerComponent('Gymple', () => App);
