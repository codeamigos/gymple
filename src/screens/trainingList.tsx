import * as React from 'react';
import * as RN from 'react-native';

import Training from './training';
import {shouldNeverHappen} from '../utils';
import {FinishedTraining, OngoingTraining, NotStartedTraining} from '../interfaces';

import {s, colors} from './../styles';

interface TrainingsListProps {
  finishedTrainings?: FinishedTraining[],
  currentTraining?: OngoingTraining | NotStartedTraining,
}

interface TrainingsListState {
  currentTraining: OngoingTraining | NotStartedTraining | null,
  finishedTrainings: FinishedTraining[],
}

export default class TrainingsList extends React.PureComponent<TrainingsListProps, TrainingsListState> {
  constructor(props: TrainingsListProps) {
    super(props);
    this.state = {
      currentTraining: this.props.currentTraining || null,
      finishedTrainings: this.props.finishedTrainings || [],
    };
  }

  startNewTraining = () => {
    this.setState({
      currentTraining: {
        kind: 'NotStartedTraining',
        title: 'New training',
        plannedExercises: [],
      },
    });
  }

  updateCurrentTraining = (currentTraining: OngoingTraining | NotStartedTraining) => {
    this.setState({
      currentTraining,
    });
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
          });
          break;
        case 'NotStartedTraining':
          this.setState({currentTraining: null});
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
