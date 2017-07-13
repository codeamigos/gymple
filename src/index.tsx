// import * as React from 'react';
import * as React from 'react'
import * as RN from 'react-native'
import * as t from 'io-ts'
// import * as ReactRouter from 'react-router'
import * as ReactRouterNative from 'react-router-native'
import * as moment from 'moment'

import TrainingListScreen from './screens/TrainingListScreen'
import TrainingScreen from './screens/TrainingScreen'
import * as Util from './Util'
import * as Model from './Model'
import bs, { Palette, Multiplicators, Options } from './styles'

const palette: Palette = {
  greyDarkest: '#2e333d',
  greyDarker: '#434b55',
  greyDark: '#555b65',
  grey: '#8a949d',
  greyLight: '#d2dadd',
  greyLighter: '#e5eaee',
  greyLightest: '#fafafa',
  white: '#ffffff',
  black: '#000000',
  blueDark: '#2b55e4',
  blue: '#2c5cff',
  blueLight: '#587eff',
  red: '#ff2b71',
  orange: '#ff605e',
  yellow: '#fbcf00',
  green: '#0cddae',
  t: 'rgba(0,0,0,0)'
}

const headings: Multiplicators = {
  '7': 0.75,
  '6': 0.85,
  '5': 1,
  '4': 1.2,
  '3': 1.6,
  '2': 2,
  '1': 3.25
}

bs.build(
  {
    remSize: 15,
    palette,
    headings
  } as Options
)

interface AppState {
  editingTrainingIndex: number | null
  currentTraining: Model.OngoingTraining | Model.NotStartedTraining | Model.FinishedTraining | null
  finishedTrainings: Model.FinishedTraining[]
}

class App extends React.Component<{}, AppState> {
  constructor() {
    super()
    this.state = {
      editingTrainingIndex: null,
      currentTraining: null,
      finishedTrainings: []
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {
    this.storeData()
  }

  fetchData = async () => {
    try {
      const storedStateJSON = await RN.AsyncStorage.getItem('@Gymple:State')
      if (storedStateJSON !== null) {
        const state = await Util.decode(
          JSON.parse(storedStateJSON),
          t.interface({
            currentTraining: t.union([
              Model.TOngoingTraining,
              Model.TNotStartedTraining,
              Model.TFinishedTraining,
              t.null
            ]),
            finishedTrainings: t.array(Model.TFinishedTraining)
          })
        )
        this.setState(state)
      }
    } catch (error) {
      await RN.AsyncStorage.setItem('@Gymple:State', '')
      throw new Error(error)
    }
  }

  storeData = async () => {
    try {
      await RN.AsyncStorage.setItem('@Gymple:State', JSON.stringify(this.state))
    } catch (error) {
      throw new Error(error)
    }
  }

  startNewTraining = () => {
    this.setState({
      currentTraining: {
        kind: 'NotStartedTraining',
        title: 'Training on ' + moment().format('dddd'),
        plannedExercises: []
      },
      editingTrainingIndex: null
    })
  }

  restartFinishedTraining = (finishedTraining: Model.FinishedTraining) => {
    const notStartedTrainingFromFinished: Model.NotStartedTraining = {
      kind: 'NotStartedTraining',
      title: finishedTraining.title + ' copy',
      plannedExercises: finishedTraining.completedExercises
    }
    this.setState({
      currentTraining: notStartedTrainingFromFinished,
      editingTrainingIndex: null
    })
  }

  updateCurrentTraining = (
    currentTraining: Model.OngoingTraining | Model.NotStartedTraining | Model.FinishedTraining,
    editingTrainingIndex: number | null
  ) => {
    this.setState({
      currentTraining,
      editingTrainingIndex
    })
  }

  finishTraining = () => {
    const { currentTraining, finishedTrainings, editingTrainingIndex } = this.state
    if (currentTraining) {
      switch (currentTraining.kind) {
        case 'OngoingTraining':
          const newFinishedTraining: Model.FinishedTraining = {
            kind: 'FinishedTraining',
            title: currentTraining.title,
            startedAt: currentTraining.startedAt,
            finishedAt: new Date(),
            completedExercises: currentTraining.completedExercises
          }
          this.setState({
            currentTraining: null,
            finishedTrainings:
              newFinishedTraining.completedExercises.length > 0
                ? [newFinishedTraining, ...finishedTrainings]
                : finishedTrainings
          })
          break
        case 'FinishedTraining':
          this.setState({
            currentTraining: null,
            editingTrainingIndex: null,
            finishedTrainings:
              currentTraining.completedExercises.length > 0
                ? finishedTrainings.map((t, i) => (i === editingTrainingIndex ? currentTraining : t))
                : finishedTrainings.filter((_, i) => i !== editingTrainingIndex)
          })
          break
        case 'NotStartedTraining':
          this.setState({
            currentTraining: null
          })
          break
        default:
          Util.shouldNeverHappen(currentTraining)
      }
    }
  }

  removeFinishedTraining = (index: number) => {
    const { finishedTrainings } = this.state
    this.setState({
      finishedTrainings: finishedTrainings.filter((_, i) => i !== index)
    })
  }

  render() {
    const { currentTraining, finishedTrainings, editingTrainingIndex } = this.state
    return (
      <ReactRouterNative.NativeRouter>
        <ReactRouterNative.Switch>
          <ReactRouterNative.Route
            exact
            path="/"
            render={() =>
              <TrainingListScreen
                currentTraining={currentTraining}
                editingTrainingIndex={editingTrainingIndex}
                finishedTrainings={finishedTrainings}
                onStartNewTraining={this.startNewTraining}
                onUpdateCurrentTraining={this.updateCurrentTraining}
                onRemoveFinishedTraining={this.removeFinishedTraining}
              />}
          />
          <ReactRouterNative.Route
            exact
            path="/training"
            render={() => {
              return currentTraining
                ? <TrainingScreen
                    training={currentTraining}
                    onFinish={this.finishTraining}
                    onRestartFinished={this.restartFinishedTraining}
                    onUpdate={training => this.updateCurrentTraining(training, editingTrainingIndex)}
                  />
                : <ReactRouterNative.Redirect to="/" />
            }}
          />
        </ReactRouterNative.Switch>
      </ReactRouterNative.NativeRouter>
    )
  }
}

RN.AppRegistry.registerComponent('Gymple', () => App)
// import * as ReactIntl from 'react-intl';
// import 'intl';

// import localizations from './localizations';

/*
const en = require('react-intl/locale-data/en');
const ru = require('react-intl/locale-data/ru');

ReactIntl.addLocaleData([...en, ...ru]);

*/
