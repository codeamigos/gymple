import * as React from 'react'
import * as RN from 'react-native'
import * as MobxReact from 'mobx-react/native'

import { shadows } from '../stylesSettings'
import { Notification, Alert } from '../store/uiStore'
import { stores } from '../store'
import { s, sizes, colors } from 'react-native-better-styles'

import * as Utils from '../utils'

type WrapperProps = {
  uiStore: typeof stores.uiStore
  routing: typeof stores.routing
  dataStore: typeof stores.dataStore
}

export default function wrapper(Component: React.ReactNode) {
  const RenderComponent = Component as any

  @MobxReact.inject('uiStore', 'dataStore', 'routing')
  @MobxReact.observer
  class Wrapper extends React.Component<WrapperProps> {
    renderLoader() {
      const { fetching } = this.props.dataStore

      if (fetching.foreground > 0) return <ForegroundLoader />
      if (fetching.background > 0) return <BackgroundLoader />
    }

    render() {
      const { notifications, alerts } = this.props.uiStore
      const { activeRouteProps } = this.props.routing
      return (
        <RN.View style={[s.flx_i]}>
          <RenderComponent {...activeRouteProps} />
          {this.renderLoader()}

          {notifications.length > 0 && (
            <RN.View style={[s.absolute, s.l0, s.r0, s.t0]}>
              {notifications.map(notification => (
                <NotificationView key={notification.id} notification={notification} />
              ))}
            </RN.View>
          )}
          {alerts.length > 0 && (
            <RN.View style={[s.absolute, s.absolute__fill, s.bg_black_40, s.jcc, s.aic]}>
              {alerts.map(alert => <AlertView key={alert.id} alert={alert} />)}
            </RN.View>
          )}
        </RN.View>
      )
    }
  }

  return Wrapper
}

class ForegroundLoader extends React.PureComponent<
  {},
  {
    animatedOpacity: RN.Animated.Value
  }
> {
  constructor() {
    super()
    this.state = {
      animatedOpacity: new RN.Animated.Value(0)
    }
  }

  componentDidMount() {
    RN.Animated
      .timing(this.state.animatedOpacity, {
        toValue: 1,
        duration: 300
      })
      .start()
  }

  render() {
    return (
      <RN.Animated.View
        style={[s.absolute, s.absolute__fill, s.bg_steel_80, s.jcc, { opacity: this.state.animatedOpacity }]}
      >
        <RN.ActivityIndicator animating={true} style={[s.asc, { height: 80 }]} color={colors.white} size="large" />
      </RN.Animated.View>
    )
  }
}

class BackgroundLoader extends React.Component<
  {},
  {
    animatedOpacity: RN.Animated.Value
  }
> {
  constructor() {
    super()
    this.state = {
      animatedOpacity: new RN.Animated.Value(0)
    }
  }

  componentDidMount() {
    RN.Animated
      .timing(this.state.animatedOpacity, {
        toValue: 1,
        duration: 300
      })
      .start()
  }

  render() {
    return (
      <RN.Animated.View
        style={[
          s.absolute,
          s.asfe,
          s.bg_white,
          s.jcc,
          s.br025,
          s.br__left,
          s.w2,
          s.h2,
          { top: sizes['125'] },
          { opacity: this.state.animatedOpacity }
        ]}
      >
        <RN.ActivityIndicator animating={true} style={[s.asc, { height: 20 }]} color={colors.steel} size="small" />
      </RN.Animated.View>
    )
  }
}

type NotificationViewProps = {
  notification: Notification
}

type NotificationViewState = {
  transformValue: RN.Animated.Value
}

export class NotificationView extends React.PureComponent<NotificationViewProps, NotificationViewState> {
  constructor(props: NotificationViewProps) {
    super(props)
    this.state = {
      transformValue: new RN.Animated.Value(-100)
    }
  }

  getNotificationColor = (notification: Notification) => {
    switch (notification.type) {
      case 'ERROR':
        return colors.red
      case 'SUCCESS':
        return colors.green
      default:
        return Utils.shouldNeverHappen(notification.type)
    }
  }

  componentDidMount() {
    this.state.transformValue.setValue(-100)

    RN.Animated
      .spring(this.state.transformValue, {
        toValue: 0,
        tension: 130,
        friction: 9
      })
      .start()
  }

  render() {
    const { notification } = this.props
    return (
      <RN.Animated.View
        style={[
          s.ph1,
          s.pt125,
          s.pb085,
          {
            backgroundColor: this.getNotificationColor(notification),
            transform: [{ translateY: this.state.transformValue }]
          }
        ]}
      >
        {!!notification.title && <RN.Text style={[s.bg_t, s.white, s.f_ps, s.fw6, s.f4]}>{notification.title}</RN.Text>}
        <RN.Text style={[s.bg_t, s.white, s.f_ps, s.f5]}>{notification.message}</RN.Text>
      </RN.Animated.View>
    )
  }
}

type AlertViewProps = {
  alert: Alert
}

type AlertViewState = {
  transformValue: RN.Animated.Value
}

export class AlertView extends React.PureComponent<AlertViewProps, AlertViewState> {
  constructor(props: AlertViewProps) {
    super(props)
    this.state = {
      transformValue: new RN.Animated.Value(100)
    }
  }

  componentDidMount() {
    RN.Animated
      .spring(this.state.transformValue, {
        toValue: 0,
        tension: 130,
        friction: 9
      })
      .start()
  }

  render() {
    const { alert } = this.props
    const { transformValue } = this.state
    return (
      <RN.Animated.View
        style={[
          s.bg_white,
          s.absolute,
          s.jcc,
          s.aic,
          s.b_black_10,
          s.bw1,
          shadows.sm,
          s.br025,
          s.mh3,
          s.pt1,
          s.pb025,
          {
            opacity: transformValue.interpolate({ inputRange: [0, 100], outputRange: [1, 0] }),
            transform: [{ translateY: transformValue }]
          }
        ]}
      >
        <RN.View style={[s.ph2, s.pv075]}>
          <RN.Text style={[s.f5, s.slateGrey, s.f_ps]}>{alert.title}</RN.Text>
          {alert.message && <RN.Text style={[s.f7, s.slateGrey, s.f_ps, s.mt05]}>{alert.message}</RN.Text>}
        </RN.View>
        <RN.View style={[s.flx_row, s.aic, s.jcc, s.ass]}>
          {alert.buttons.map(button => (
            <RN.TouchableOpacity
              key={button.label}
              style={[s.p05, s.flx_i]}
              onPress={() => alert.onPressButton(button.label)}
            >
              <RN.Text numberOfLines={1} style={[s.f5, s.deepSkyBlue, s.f_ps, s.tc, s.bg_t]}>
                {button.label}
              </RN.Text>
            </RN.TouchableOpacity>
          ))}
        </RN.View>
      </RN.Animated.View>
    )
  }
}
