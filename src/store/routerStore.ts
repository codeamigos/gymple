import * as Mobx from 'mobx'
import * as History from 'history'

import { Route } from '../routes'

type LocationDescriptor = {
  route: Route
} & History.LocationDescriptorObject

type Location = {
  route: Route
} & History.Location

export default class RouterStore {
  @Mobx.observable location: Location

  history: History.History = History.createMemoryHistory()

  constructor() {
    this.push = this.push.bind(this)
    this.replace = this.replace.bind(this)
    this.go = this.go.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goForward = this.goForward.bind(this)
  }

  @Mobx.action
  _updateLocation(updatedLocation: Location) {
    this.location = updatedLocation
  }

  @Mobx.computed
  get activeRouteProps() {
    if (!this.location) return console.error('location is not defined activeRouteProps')
    if (!this.location.route) return console.error('Location.route is not defined activeRouteProps')
    return this.location.route.props
  }

  private createHistoryLocation = (location: LocationDescriptor) => {
    return {
      ...location,
      pathname: location.route.path
    }
  }

  /*
   * History methods
   */
  push(location: LocationDescriptor) {
    this.history.push(this.createHistoryLocation(location))
  }
  replace(location: LocationDescriptor) {
    this.history.replace(this.createHistoryLocation(location))
  }
  go(n: number) {
    this.history.go(n)
  }
  goBack() {
    this.history.goBack()
  }
  goForward() {
    this.history.goForward()
  }
}

export interface SynchronizedHistory extends History {
  subscribe: (listener: History.LocationListener) => History.UnregisterCallback
  unsubscribe?: History.UnregisterCallback
}

export const syncHistoryWithStore = (history: History.History, store: RouterStore): SynchronizedHistory => {
  // Initialise store
  store.history = history

  // Handle update from history object
  const handleLocationChange = (location: Location) => {
    store._updateLocation(location)
  }

  const unsubscribeFromHistory = history.listen(handleLocationChange)
  handleLocationChange(history.location as any)

  const subscribe = (listener: History.LocationListener) => {
    const onStoreChange = () => {
      const rawLocation = { ...store.location, route: undefined }
      listener(rawLocation, history.action)
    }

    // Listen for changes to location state in store
    const unsubscribeFromStore = Mobx.observe(store, 'location', onStoreChange)

    listener(store.location, history.action)

    return () => {
      unsubscribeFromStore()
    }
  }
  const unsubscribe = () => unsubscribeFromHistory()

  const returnHistory: any = history

  returnHistory.subscribe = subscribe
  returnHistory.unsubscribe = unsubscribe

  return returnHistory
}
