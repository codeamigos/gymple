import * as React from 'react'
import * as RN from 'react-native'
import * as H from 'history'
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
  history: H.History
  children: React.ReactNode
  animationCallback?: () => void
}

interface AnimatedChildRouteState {
  isAnimation: boolean
  prevChildren: React.ReactNode | null
  prevPath: string | null
  anim: RN.Animated.Value
}

export class AnimatedChildRoute extends React.PureComponent<AnimatedChildRouteProps, AnimatedChildRouteState> {
  constructor(props: AnimatedChildRouteProps) {
    super(props)
    this.state = {
      isAnimation: false,
      anim: new RN.Animated.Value(100),
      prevChildren: null,
      prevPath: null
    }
  }

  componentWillReceiveProps(nextProps: AnimatedChildRouteProps) {
    const { animationCallback } = this.props
    const { prevPath, isAnimation } = this.state

    if (!isAnimation)
      if (prevPath !== nextProps.history.location.pathname) {
        this.state.anim.setValue(0)
        this.setState(
          {
            isAnimation: true,
            prevChildren: this.props.children
          },
          () => {
            RN.Animated
              .timing(this.state.anim, {
                easing: RN.Easing.quad,
                toValue: 100,
                duration: 400
              })
              .start(() => {
                this.setState(
                  {
                    prevChildren: null,
                    prevPath: nextProps.history.location.pathname,
                    isAnimation: false
                  },
                  () => !!animationCallback && animationCallback()
                )
              })
          }
        )
      }
  }

  render() {
    const { anim } = this.state
    const { children } = this.props

    return (
      <RN.Animated.View style={{ flex: 1, opacity: anim.interpolate({ inputRange: [0, 100], outputRange: [0, 1] }) }}>
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
