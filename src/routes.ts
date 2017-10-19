// import * as Model from './Models'
import { Set, Exercise } from './store/dataStore'

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

export type SelectExerciseRouteProps = {
  set: Set
}

export type EditExerciseRouteProps = {
  setToAdd?: Set
  exercise: Exercise
}

export type SetRouteProps = {
  set: Set
}

type InitialRoute = RouteWithoutProps<InitialRoutePath>
type WelcomeRoute = RouteWithoutProps<WelcomeRoutePath>
type SelectExerciseRoute = RouteWithProps<SelectExerciseRoutePath, SelectExerciseRouteProps>
type EditExerciseRoute = RouteWithProps<EditExerciseRoutePath, EditExerciseRouteProps>
type SetRoute = RouteWithProps<SetRoutePath, SetRouteProps>

export type Route = InitialRoute | WelcomeRoute | SelectExerciseRoute | EditExerciseRoute | SetRoute //| LoginRoute | SignupRoute | CarsListRoute | CarRoute | CarDamageRoute
export type RoutePath =
  | InitialRoutePath
  | WelcomeRoutePath
  | SelectExerciseRoutePath
  | SetRoutePath
  | EditExerciseRoutePath
