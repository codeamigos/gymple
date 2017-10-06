// import * as Model from './Models'

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
// type LoginRoutePath = '/login'
// type SignupRoutePath = '/signup'
// type CarsListRoutePath = '/carsList'
// type CarRoutePath = '/car'
// type CarDamageRoutePath = '/carDamage'

// export type CarRouteProps = {
//   car: Car
// }

// export type CarDamageRouteProps = {
//   exteriorItem: ExteriorItem
//   scheme: Model.CarSideScheme
// }

type InitialRoute = RouteWithoutProps<InitialRoutePath>
type WelcomeRoute = RouteWithoutProps<WelcomeRoutePath>
// type LoginRoute = RouteWithoutProps<LoginRoutePath>
// type SignupRoute = RouteWithoutProps<SignupRoutePath>
// type CarsListRoute = RouteWithoutProps<CarsListRoutePath>
// type CarRoute = RouteWithProps<CarRoutePath, CarRouteProps>
// type CarDamageRoute = RouteWithProps<CarDamageRoutePath, CarDamageRouteProps>

export type Route = InitialRoute | WelcomeRoute //| LoginRoute | SignupRoute | CarsListRoute | CarRoute | CarDamageRoute
export type RoutePath = InitialRoutePath | WelcomeRoutePath
// | LoginRoutePath
// | SignupRoutePath
// | CarsListRoutePath
// | CarRoutePath
// | CarDamageRoutePath
