// import * as React from 'react';
import * as React from 'react'
import * as RN from 'react-native'
import * as t from 'io-ts'
// import * as ReactRouter from 'react-router'
import * as ReactRouterNative from 'react-router-native'
import * as ReactRouter from 'react-router'
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
  anim: RN.Animated.Value
  animating: boolean
}

class App extends React.Component<ReactRouter.RouteComponentProps<{ isExact: boolean }>, AppState> {
  constructor() {
    super()
    this.state = {
      editingTrainingIndex: null,
      currentTraining: null,
      finishedTrainings: [],
      anim: new RN.Animated.Value(1),
      animating: false
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
    const { currentTraining, finishedTrainings } = this.state
    try {
      await RN.AsyncStorage.setItem(
        '@Gymple:State',
        JSON.stringify({
          currentTraining,
          finishedTrainings
        })
      )
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
      <AnimatedChildRoute anim={this.state.anim} atParent={this.props.match.isExact} animating={this.state.animating}>
        <ReactRouterNative.Switch location={this.props.location}>
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
            render={() =>
              currentTraining !== null
                ? <TrainingScreen
                    training={currentTraining}
                    onFinish={this.finishTraining}
                    onRestartFinished={this.restartFinishedTraining}
                    onUpdate={training => this.updateCurrentTraining(training, editingTrainingIndex)}
                  />
                : <ReactRouterNative.Redirect to="/" />}
          />
        </ReactRouterNative.Switch>
      </AnimatedChildRoute>
    )
  }
}

interface AnimatedChildRouteProps {
  children: React.ReactNode
  animating: boolean
  anim: RN.Animated.Value
  atParent: boolean
}

interface AnimatedChildRouteState {
  previousChildren: React.ReactNode | null
}

class AnimatedChildRoute extends React.Component<AnimatedChildRouteProps, AnimatedChildRouteState> {
  constructor(props: AnimatedChildRouteProps) {
    super(props)
    this.state = {
      // we're going to save the old children so we can render
      // it when it doesnt' actually match the location anymore
      previousChildren: null
    }
  }

  // componentWillReceiveProps(nextProps: AnimatedChildRouteProps) {
  //   // figure out what to do with the children
  //   const navigatingToParent = nextProps.atParent && !this.props.atParent
  //   const animationEnded = this.props.animating && !nextProps.animating

  //   if (navigatingToParent) {
  //     // we were rendering, but now we're heading back up to the parent,
  //     // so we need to save the children (har har) so we can render them
  //     // while the animation is playing
  //     this.setState({
  //       previousChildren: this.props.children
  //     })
  //   } else if (animationEnded) {
  //     // When we're done animating, we can get rid of the old children.
  //     this.setState({
  //       previousChildren: null
  //     })
  //   }
  // }

  render() {
    const { anim, children } = this.props
    const { previousChildren } = this.state
    return (
      <RN.Animated.View
        style={{
          bottom: 0,
          position: 'absolute',
          left: 0,
          right: 0,
          top: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0]
          }),
          opacity: anim.interpolate({
            inputRange: [0, 0.75],
            outputRange: [0, 1]
          })
        }}
      >
        {/* render the old ones if we have them */}
        {previousChildren || children}
      </RN.Animated.View>
    )
  }
}

const Routed = ReactRouter.withRouter(App) as any
class RoutedApp extends React.Component {
  render() {
    return (
      <ReactRouterNative.NativeRouter>
        <Routed />
      </ReactRouterNative.NativeRouter>
    )
  }
}

RN.AppRegistry.registerComponent('Gymple', () => RoutedApp)
// import * as ReactIntl from 'react-intl';
// import 'intl';

// import localizations from './localizations';

/*
const en = require('react-intl/locale-data/en');
const ru = require('react-intl/locale-data/ru');

ReactIntl.addLocaleData([...en, ...ru]);

*/
