import * as React from 'react'
import * as RN from 'react-native'
import * as BS from 'react-native-better-styles'
import * as ReactRouterNative from 'react-router-native'
import * as MobxReact from 'mobx-react/native'
import * as ReactIntl from 'react-intl'

import strings from './localizations'
import Trans from './translation'

import 'intl'

const en = require('react-intl/locale-data/en')
const ru = require('react-intl/locale-data/ru')

Trans.loadTranslations(strings)
ReactIntl.addLocaleData([...en, ...ru])

window['trans'] = Trans
import { stores } from './store/index'

import { palette, multipliers, headings, fonts } from './stylesSettings'
import { AnimatedChildRoute, Route, Redirect } from './components/Router'

import screenWrapper from './components/ScreenWrapper'

import SetScreen from './screens/SetScreen'
import SelectExerciseScreen from './screens/SelectExerciseScreen'
import EditExerciseScreen from './screens/EditExerciseScreen'
import TrainingScreen from './screens/TrainingScreen'
import TrainingsListScreen from './screens/TrainingsListScreen'

const { width, height } = RN.Dimensions.get('window')

function calculateRemSize(width: number): number {
  if (width > 400) return 17
  else if (width > 370) return 15
  return 13
}

function getLocale() {
  if (RN.Platform.OS === 'android') {
    return RN.NativeModules.I18nManager.localeIdentifier.substring(0, 2)
  } else if (RN.Platform.OS === 'ios') {
    return RN.NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2)
  }
  return 'en'
}

// building better-styles
BS.build({
  remSize: calculateRemSize(width > height ? height : width),
  palette,
  multipliers,
  headings,
  fonts
})

// fill dataStore with initial data
stores.dataStore.generateInitialData()

@MobxReact.observer
class App extends React.Component<{}> {
  render() {
    return (
      <ReactIntl.IntlProvider locale={getLocale()} messages={Trans.translations[getLocale()]}>
        <MobxReact.Provider {...stores}>
          <ReactRouterNative.Router history={stores.routing.history}>
            <AnimatedChildRoute pathname={stores.routing.location.pathname}>
              <ReactRouterNative.Switch>
                <Route exact path="/" render={() => <Redirect to={{ path: '/trainingslist' }} />} />
                <Route exact path="/set" component={screenWrapper(SetScreen)} />
                <Route exact path="/selectexercise" component={screenWrapper(SelectExerciseScreen)} />
                <Route exact path="/editexercise" component={screenWrapper(EditExerciseScreen)} />
                <Route exact path="/training" component={screenWrapper(TrainingScreen)} />
                <Route exact path="/trainingslist" component={screenWrapper(TrainingsListScreen)} />
                {/* <Route exact path="/login" component={screenWrapper(LoginScreen)} />
              <Route exact path="/signup" component={screenWrapper(SignupScreen)} />
              <Route exact authRequired path="/carsList" component={screenWrapper(CarsListScreen)} />
              <Route exact authRequired path="/carDamage" component={screenWrapper(CarDamageScreen)} />
              <Route exact authRequired path="/car" component={screenWrapper(CarScreen)} /> */}
              </ReactRouterNative.Switch>
            </AnimatedChildRoute>
          </ReactRouterNative.Router>
        </MobxReact.Provider>
      </ReactIntl.IntlProvider>
    )
  }
}

RN.AppRegistry.registerComponent('Gymple', () => App)
