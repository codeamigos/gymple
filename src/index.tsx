import * as React from 'react';
import * as RN from 'react-native';


interface Exercise {
  title: string,
  restSeconds: number,
  attempts: [{
    weight: number,
    repititions: number,
  }],
}

type Training = NotStartedTraining | OngoingTraining | FinishedTraining;

interface NotStartedTraining {
  title: string,
  plannedExercises: [Exercise],
}

interface OngoingTraining {
  title: string,
  startedAt: Date,
  plannedExercises: [Exercise],
  currentExerciseIndex: number | null,
  completedExercises: [Exercise],
}

interface FinishedTraining {
  title: string,
  startedAt: Date,
  finishedAt: Date,
  completedExercises: [Exercise],
}

interface Profile {
  active: NotStartedTraining | OngoingTraining | null,
  history: [FinishedTraining],
}

class Test extends React.Component<void, void> {
  render() {
    return (
      <RN.View style={styles.container}>
        <RN.Text style={styles.welcome}>
          Welcome to React Native!
        </RN.Text>
        <RN.Text style={styles.instructions}>
          To get started, edit index.android.js
        </RN.Text>
        <RN.Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </RN.Text>
      </RN.View>
    );
  }
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  } as RN.ViewStyle,

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  } as RN.TextStyle,

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  } as RN.TextStyle,
});

RN.AppRegistry.registerComponent('Gymple', () => Test);
