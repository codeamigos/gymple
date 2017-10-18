import * as React from 'react'
import * as RN from 'react-native'
// import { s, colors } from 'react-native-better-styles'
import * as MobxReact from 'mobx-react/native'
import * as ReactRouterNative from 'react-router-native'
import * as ReactRouter from 'react-router'

import * as Routes from '../routes'

import { stores } from '../store'
/*

  This component export overrided Link, Redirect, Route ReactRouterNative
  components with our RoutePath type as to/path prop

*/

interface AnimatedChildRouteProps {
  children: React.ReactNode
  pathname: string
  animationCallback?: () => void
}

interface AnimatedChildRouteState {
  prevPath: string | null
}

export class AnimatedChildRoute extends React.Component<AnimatedChildRouteProps, AnimatedChildRouteState> {
  constructor() {
    super()
    this.state = {
      prevPath: null
    }
  }

  _anim: RN.Animated.Value = new RN.Animated.Value(0)

  componentDidMount() {
    this.startAnimation(this.props.pathname)
  }

  componentWillReceiveProps(nextProps: AnimatedChildRouteProps) {
    const { prevPath } = this.state
    if (prevPath !== nextProps.pathname) {
      this.startAnimation(nextProps.pathname)
    }
  }

  startAnimation = (prevPath: string) => {
    const { animationCallback } = this.props
    this._anim.setValue(0)
    RN.Animated
      .timing(this._anim, {
        toValue: 100,
        duration: 400
      })
      .start(() => {
        this.setState(
          {
            prevPath
          },
          () => !!animationCallback && animationCallback()
        )
      })
  }

  render() {
    const { children } = this.props
    // return <RN.View style={{ flex: 1 }}>{children}</RN.View>
    return (
      <RN.Animated.View
        style={{
          flex: 1,
          opacity: this._anim.interpolate({ inputRange: [0, 100], outputRange: [0, 1] }),
          transform: [
            {
              scale: this._anim.interpolate({ inputRange: [0, 100], outputRange: [0.97, 1] })
            }
          ]
        }}
      >
        {children}
      </RN.Animated.View>
    )
  }
}

export interface LinkProps {
  to: Routes.Route
  routing?: typeof stores.routing
  style?: RN.StyleProp<RN.ViewStyle>
}

@MobxReact.inject('routing')
@MobxReact.observer
export class Link extends React.Component<LinkProps> {
  render() {
    const { to, children, routing, style } = this.props
    return (
      <RN.TouchableOpacity onPress={() => routing && routing.push({ route: to })} style={style}>
        {children}
      </RN.TouchableOpacity>
    )
  }
}

export interface RedirectProps {
  to: Routes.Route
  routing?: typeof stores.routing
}

@MobxReact.inject('routing')
@MobxReact.observer
export class Redirect extends React.Component<RedirectProps> {
  componentDidMount() {
    const { routing, to } = this.props
    if (routing) {
      routing.push({ route: to })
    }
  }
  render() {
    return null
  }
}

export interface RouteProps {
  authRequired?: boolean
  dataStore?: typeof stores.dataStore
  path: Routes.RoutePath
}

@MobxReact.inject('dataStore')
@MobxReact.observer
export class Route extends React.Component<RouteProps & ReactRouter.RouteProps> {
  render() {
    const { path, authRequired, dataStore, ...otherprops } = this.props

    if (!authRequired /* || (dataStore && dataStore.user.kind === 'LoggedInUser') */)
      return <ReactRouterNative.Route path={path} {...otherprops} />
    return <Redirect to={{ path: '/welcome' }} />
  }
}
