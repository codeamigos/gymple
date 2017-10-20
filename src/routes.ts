// import * as Model from './Models'
import { Set, ExerciseTemplate, Training } from './store/dataStore'

export type RouteWithoutProps<Path> = {
  path: Path
  props?: undefined
}

export type RouteWithProps<RoutePath, RouteProps> = {
  path: RoutePath
  props: RouteProps
}

type InitialRoutePath = '/'
type WelcomeRoutePath = '/welcome'
type SelectExerciseRoutePath = '/selectexercise'
type EditExerciseRoutePath = '/editexercise'
type SetRoutePath = '/set'
type TrainingRoutePath = '/training'

export type SelectExerciseRouteProps = {
  set: Set
}

export type EditExerciseRouteProps = {
  setToAdd?: Set
  exerciseTemplate: ExerciseTemplate
}

export type SetRouteProps = {
  trainingToAdd?: Training
  set: Set
}

export type TrainingRouteProps = {
  training: Training
}

type InitialRoute = RouteWithoutProps<InitialRoutePath>
type WelcomeRoute = RouteWithoutProps<WelcomeRoutePath>
type SelectExerciseRoute = RouteWithProps<SelectExerciseRoutePath, SelectExerciseRouteProps>
type EditExerciseRoute = RouteWithProps<EditExerciseRoutePath, EditExerciseRouteProps>
type SetRoute = RouteWithProps<SetRoutePath, SetRouteProps>
type TrainingRoute = RouteWithProps<TrainingRoutePath, TrainingRouteProps>

export type Route = InitialRoute | WelcomeRoute | SelectExerciseRoute | EditExerciseRoute | SetRoute | TrainingRoute
export type RoutePath =
  | InitialRoutePath
  | WelcomeRoutePath
  | SelectExerciseRoutePath
  | SetRoutePath
  | TrainingRoutePath
  | EditExerciseRoutePath
