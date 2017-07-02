import * as React from 'react';
import * as RN from 'react-native';
import * as t from 'io-ts';

import Training from './training';
import {shouldNeverHappen, decode} from '../utils';
import {
  FinishedTraining,
  OngoingTraining,
  NotStartedTraining,
  TFinishedTraining,
  TOngoingTraining,
  TNotStartedTraining,
} from '../interfaces';

import {s, colors} from './../styles';

interface TrainingsListState {
  currentTraining: OngoingTraining | NotStartedTraining | null,
  finishedTrainings: FinishedTraining[],
}

export default class TrainingsList extends React.PureComponent<void, TrainingsListState> {
  constructor() {
    super();
    this.state = {
      currentTraining: null,
      finishedTrainings: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const storedStateJSON = await RN.AsyncStorage.getItem('@Gymple:State');
      if (storedStateJSON !== null){
        decode(
          JSON.parse(storedStateJSON),
          t.interface({
            currentTraining: t.union([TOngoingTraining, TNotStartedTraining, t.null]),
            finishedTrainings: t.array(TFinishedTraining),
          }),
        )
        .then(state => this.setState(state))
        .catch(async () => {
          try {
            await RN.AsyncStorage.setItem('@Gymple:State', '');
          }
          catch (error) {
            throw new Error(error);
          }
        });
      }
    }
    catch (error) {
      throw new Error(error);
    }
  }

  storeData = async () => {
    try {
      await RN.AsyncStorage.setItem('@Gymple:State', JSON.stringify(this.state));
    }
    catch (error) {
      throw new Error(error);
    }
  }

  startNewTraining = () => {
    this.setState({
      currentTraining: {
        kind: 'NotStartedTraining',
        title: 'New training',
        plannedExercises: [],
      },
    }, () => this.storeData());
  }

  updateCurrentTraining = (currentTraining: OngoingTraining | NotStartedTraining) => {
    this.setState({
      currentTraining,
    }, () => this.storeData());
  }

  finishTraining = () => {
    const {currentTraining} = this.state;
    if (currentTraining) {
      switch (currentTraining.kind) {
        case 'OngoingTraining':
          const finishedTraining: FinishedTraining = {
            kind: 'FinishedTraining',
            title: currentTraining.title,
            startedAt: currentTraining.startedAt,
            finishedAt: new Date(),
            completedExercises: currentTraining.completedExercises,
          };
          this.setState({
            currentTraining: null,
            finishedTrainings: finishedTraining.completedExercises.length > 0 ? [finishedTraining, ...this.state.finishedTrainings] : this.state.finishedTrainings,
          }, () => this.storeData());
          break;
        case 'NotStartedTraining':
          this.setState({
            currentTraining: null,
          }, () => this.storeData());
          break;
        default: shouldNeverHappen(currentTraining);
      }
    }
  }

  render() {
    const {currentTraining} = this.state;

    if (currentTraining) {
      return <Training training={currentTraining} onFinish={this.finishTraining} onUpdate={this.updateCurrentTraining} />;
    }

    return (
      <RN.View style={[s.flx_i, s.pv4, s.jcc, s.aic, s.bg_blue]}>
        <RN.StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={colors.t} />
        <RN.TouchableOpacity
          style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
          onPress={this.startNewTraining}
        >
          <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
            Start New Training
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    );
  }
}
