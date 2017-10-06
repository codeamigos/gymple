import * as Mobx from 'mobx'

export default class DataStore {
  @Mobx.observable
  fetching: {
    background: number
    foreground: number
  } = {
    background: 0,
    foreground: 0
  }

  @Mobx.action
  startFetching(options = { inBackground: false }) {
    if (options.inBackground) {
      this.fetching.background = this.fetching.background + 1
    } else {
      this.fetching.foreground = this.fetching.foreground + 1
    }
  }

  @Mobx.action
  stopFetching(options = { inBackground: false }) {
    if (options.inBackground) {
      this.fetching.background = this.fetching.background > 0 ? this.fetching.background - 1 : this.fetching.background
    } else {
      this.fetching.foreground = this.fetching.foreground > 0 ? this.fetching.foreground - 1 : this.fetching.foreground
    }
  }

  @Mobx.computed
  get isFetching() {
    return this.fetching.foreground > 0 || this.fetching.background > 0
  }
}
