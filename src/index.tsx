import * as React from 'react';
import * as RN from 'react-native';
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
        plannedExercises: [
          { title: 'Жим лежа', restSeconds: 60, attempts: [] },
          { title: 'Присед', restSeconds: 60, attempts: [] },
        ],
      },
      isModalOpened: false,
    };
  }

  render() {
    const { training, isModalOpened } = this.state;

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
    backgroundColor: 'blue',
  } as RN.ViewStyle,
});


/*
const Navigator: any = StackNavigator({
  Training: { screen: TrainingScreen },
});

const { intl } = new ReactIntl
  .IntlProvider({ locale: 'en', messages: localizations.en }, {})
  .getChildContext();

class App extends React.Component<void, void> {
  render() {
    return (
      <Navigator screenProps={{ intl }} />
    );
  }
}
*/

RN.AppRegistry.registerComponent('Gymple', () => TrainingScreen);
