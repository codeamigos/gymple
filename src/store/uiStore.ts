import * as Mobx from 'mobx'

import * as Util from '../utils'
import { stores } from './index'

export type NotificationType = 'ERROR' | 'SUCCESS'

export type NotificationOptions = {
  message: string
  title?: string
  type?: NotificationType
  timeout?: number
  id?: string
}

export class Notification {
  @Mobx.observable message: string = ''
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable title?: string
  @Mobx.observable type: NotificationType = 'SUCCESS'

  timeout: number

  constructor(notificationOptions: NotificationOptions) {
    const options = {
      timeout: 5000,
      ...notificationOptions
    }
    this.update(options)
  }

  @Mobx.action
  update = (options: NotificationOptions) => {
    this.message = options.message
    this.title = options.title
    if (options.type) this.type = options.type
    if (options.id) this.id = options.id
    this.timeout = setTimeout(() => stores.uiStore.removeNotification(this), options.timeout)
  }
}

type AlertButton = {
  label: string
  onPress?: () => void
}

export type AlertOptions = {
  message?: string
  title: string
  buttons?: AlertButton[]
  id?: string
}

export class Alert {
  @Mobx.observable message?: string
  @Mobx.observable title: string = ''
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable buttons: Mobx.IObservableArray<AlertButton> = Mobx.observable([{ label: 'OK' }])

  constructor(options: AlertOptions) {
    this.title = options.title
    if (options.message) this.message = options.message
    if (options.id) this.id = options.id
    if (options.buttons && options.buttons.length > 0) this.buttons.replace(options.buttons)
  }

  @Mobx.action
  onPressButton = (buttonLabel: string) => {
    const relatedButton = this.buttons.find(b => b.label === buttonLabel)
    if (relatedButton && relatedButton.onPress) {
      relatedButton.onPress()
    }
    stores.uiStore.removeAlert(this)
  }
}

export default class uiStore {
  @Mobx.observable notifications: Mobx.IObservableArray<Notification> = Mobx.observable([])
  @Mobx.observable alerts: Mobx.IObservableArray<Alert> = Mobx.observable([])

  @Mobx.action
  public createNotification = (options: NotificationOptions) => {
    const notification = new Notification(options)
    this.notifications.push(notification)
  }

  @Mobx.action
  public removeNotification = (notification: Notification) => {
    this.notifications.remove(notification)
  }

  @Mobx.action
  public createAlert = (options: AlertOptions) => {
    const alert = new Alert(options)
    this.alerts.push(alert)
  }

  @Mobx.action
  public removeAlert = (alert: Alert) => {
    this.alerts.remove(alert)
  }
}
