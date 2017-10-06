import * as History from 'history'
import * as Mobx from 'mobx'
// import * as MobxReactRouter from 'mobx-react-router'

import RouterStore, { syncHistoryWithStore } from './routerStore'
import UiStore from './uiStore'
import DataStore from './dataStore'

const memoryHistory = History.createMemoryHistory()
const routingStore = new RouterStore()
const dataStore = new DataStore()
const uiStore = new UiStore()
export const history = syncHistoryWithStore(memoryHistory, routingStore) // hack to accept only our pathnames

Mobx.useStrict(true)

export const stores = {
  dataStore,
  routing: routingStore,
  uiStore
}

// window['store'] = stores
// window['mobx'] = Mobx

export default stores
