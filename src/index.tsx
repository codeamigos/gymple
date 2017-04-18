import * as React from 'react';
import * as RN from 'react-native';

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
