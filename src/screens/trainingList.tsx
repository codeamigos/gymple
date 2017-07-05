import * as React from 'react';
import * as RN from 'react-native';
import * as t from 'io-ts';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

import Training from './training';
import {shouldNeverHappen, decode} from '../utils';
import * as I from '../interfaces';

import {s, colors, sizes} from './../styles';

interface TrainingsListState {
  currentTraining: I.OngoingTraining | I.NotStartedTraining | I.FinishedTraining | null,
  finishedTrainings: I.FinishedTraining[],
  isScrollEnabled: boolean,
}

export default class TrainingsList extends React.PureComponent<void, TrainingsListState> {
  constructor() {
    super();
    this.state = {
      currentTraining: null,
      finishedTrainings: [],
      isScrollEnabled: true,
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
            currentTraining: t.union([I.TOngoingTraining, I.TNotStartedTraining, I.TNotStartedTraining, t.null]),
            finishedTrainings: t.array(I.TFinishedTraining),
            isScrollEnabled: t.boolean,
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

  restartFinishedTraining = (finishedTraining: I.FinishedTraining) => {
    const notStartedTrainingFromFinished: I.NotStartedTraining = {
        kind: 'NotStartedTraining',
        title: finishedTraining.title,
        plannedExercises: finishedTraining.completedExercises,
    };
    this.setState({
      currentTraining: notStartedTrainingFromFinished,
    }, () => this.storeData());
  }

  viewFinishedTraining = (finishedTrainingIndex: number) => {
    const {finishedTrainings} = this.state;
    const training: I.FinishedTraining = finishedTrainings[finishedTrainingIndex];
    if (!training) {
      throw new Error('Trying to access not existing Finished Training');
    }
    else {
      this.setState({
        currentTraining: training,
        finishedTrainings: finishedTrainings.filter((_, i) => i !== finishedTrainingIndex),
      }, () => this.storeData());
    }
  }

  updateCurrentTraining = (currentTraining: I.OngoingTraining | I.NotStartedTraining | I.FinishedTraining) => {
    this.setState({
      currentTraining,
    }, () => this.storeData());
  }

  finishTraining = () => {
    const {currentTraining} = this.state;
    if (currentTraining) {
      switch (currentTraining.kind) {
        case 'OngoingTraining':
          const finishedTraining: I.FinishedTraining = {
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
        case 'FinishedTraining':
          this.setState({
            currentTraining: null,
            finishedTrainings: currentTraining.completedExercises.length > 0 ? [currentTraining, ...this.state.finishedTrainings] : this.state.finishedTrainings,
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

  removeFinishedTraining = (index: number) => {
    const {finishedTrainings} = this.state;
    this.setState({
      finishedTrainings: finishedTrainings.filter((_, i) => i !== index),
    }, () => this.storeData());
  }

  allowScroll = (isScrollEnabled: boolean) => {
    this.setState({isScrollEnabled});
  }

  render() {
    const {currentTraining, finishedTrainings, isScrollEnabled} = this.state;

    if (currentTraining) {
      return <Training
        training={currentTraining}
        onFinish={this.finishTraining}
        onRestartFinished={this.restartFinishedTraining}
        onUpdate={this.updateCurrentTraining} />;
    }

    if (finishedTrainings.length === 0) {
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

    return (
      <RN.View style={[s.flx_i, s.jcsb, s.bg_greyLightest]}>
        <RN.StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={colors.t}
          />
        <RN.View style={[s.bg_blue, s.pt2, s.ph125, s.pb1]}>
          <RN.Text style={[s.white, s.fw3, s.f4, s.mt05]}>
            My Trainigs
          </RN.Text>
        </RN.View>
        <RN.View style={[s.flx_i, s.jcsb]}>
          <RN.ScrollView style={[s.flx_i]} scrollEnabled={isScrollEnabled}>
            {finishedTrainings.map((training, i) =>
              <Swipeout
                autoClose={true}
                key={String(training.finishedAt)}
                backgroundColor={colors.t}
                scroll={isAllow => this.allowScroll(isAllow)}
                buttonWidth={sizes[5]}
                right={[
                  {
                    onPress: () => this.removeFinishedTraining(i),
                    component: <RN.View style={[s.w5, s.bg_orange, s.jcc, s.flx_i]}><Icon name="md-trash" style={[s.white, s.f3, s.tc]} /></RN.View>,
                  },
                ]}
              >
                <RN.TouchableOpacity onPress ={() => this.viewFinishedTraining(i)}>
                  <TrainingsListItem training={training} />
                </RN.TouchableOpacity>
              </Swipeout>,
            )}
          </RN.ScrollView>
          <RN.View style={s.pb175}>
            <RN.TouchableOpacity
              style={[s.asc, s.bg_green, s.br2, s.h325, s.jcc, s.ph3, s.mt075]}
              onPress={this.startNewTraining}
            >
              <RN.Text style={[s.f4, s.white, s.tc, s.b]}>
                Start New Training
              </RN.Text>
            </RN.TouchableOpacity>
          </RN.View>
        </RN.View>
      </RN.View>
    );
  }
}

const TrainingsListItem = ({training}: {training: I.FinishedTraining}) => {
  return (
    <RN.View style={[s.pv1, s.bbw1, s.b_black_5, s.pr1, s.ml125]}>
      <RN.View style={[s.flx_row, s.jcsb, s.aifs]}>
        <RN.Text style={[s.f3, s.fw2, s.bg_t, s.blue, s.flx_i, s.mb025]}>
          {training.title}
        </RN.Text>
      </RN.View>
      <RN.Text style={[s.f6, s.black_50, s.fw3]}>
        {training.finishedAt.toDateString()}
      </RN.Text>
    </RN.View>
  );
};
