// import * as Model from './Models'
import { Set, FinishedTraining } from './store/dataStore'
// Generic

export type RouteWithoutProps<Path> = {
  path: Path
  props?: undefined
}

export type RouteWithProps<RoutePath, RouteProps> = {
  path: RoutePath
  props: RouteProps
}

//

type InitialRoutePath = '/'
type WelcomeRoutePath = '/welcome'
type SelectExerciseRoutePath = '/selectexercise'
type SetRoutePath = '/set'
// type LoginRoutePath = '/login'
// type SignupRoutePath = '/signup'
// type CarsListRoutePath = '/carsList'
// type CarRoutePath = '/car'
// type CarDamageRoutePath = '/carDamage'

// export type CarRouteProps = {
//   car: Car
// }

export type SelectExerciseRouteProps = {
  set: Set
}

export type SetRouteProps = {
  set: Set
}

type InitialRoute = RouteWithoutProps<InitialRoutePath>
type WelcomeRoute = RouteWithoutProps<WelcomeRoutePath>
type SelectExerciseRoute = RouteWithProps<SelectExerciseRoutePath, SelectExerciseRouteProps>
type SetRoute = RouteWithProps<SetRoutePath, SetRouteProps>
// type LoginRoute = RouteWithoutProps<LoginRoutePath>
// type SignupRoute = RouteWithoutProps<SignupRoutePath>
// type CarsListRoute = RouteWithoutProps<CarsListRoutePath>
// type CarRoute = RouteWithProps<CarRoutePath, CarRouteProps>
// type CarDamageRoute = RouteWithProps<CarDamageRoutePath, CarDamageRouteProps>

export type Route = InitialRoute | WelcomeRoute | SelectExerciseRoute | SetRoute //| LoginRoute | SignupRoute | CarsListRoute | CarRoute | CarDamageRoute
export type RoutePath = InitialRoutePath | WelcomeRoutePath | SelectExerciseRoutePath | SetRoutePath
// | LoginRoutePath
// | SignupRoutePath
// | CarsListRoutePath
// | CarRoutePath
// | CarDamageRoutePath
