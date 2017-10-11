import * as Mobx from 'mobx'
import * as Model from '../models'
import * as Util from '../utils'
import { stores } from './index'
import * as ExerciseData from '../ExercisesData'

export default class DataStore {
  @Mobx.observable
  fetching: {
    background: number
    foreground: number
  } = {
    background: 0,
    foreground: 0
  }
  @Mobx.observable muscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable exercises: Mobx.IObservableArray<Exercise> = Mobx.observable([])

  constructor() {
    this.replaceMuscles(ExerciseData.muscles.map(muscle => new Muscle(muscle)))
    this.replaceExercises(ExerciseData.exercises.map(exercise => new Exercise(exercise)))
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

  @Mobx.action
  replaceMuscles(muscles: Muscle[]) {
    this.muscles.replace(muscles)
  }

  @Mobx.action
  replaceExercises(exercises: Exercise[]) {
    this.exercises.replace(exercises)
  }

  @Mobx.computed
  get isFetching() {
    return this.fetching.foreground > 0 || this.fetching.background > 0
  }
}

class GenericTraining {
  @Mobx.observable title: string = ''

  @Mobx.action
  setTitle(title: string) {
    this.title = title
  }
}

export class FinishedTraining extends GenericTraining {
  kind: 'FinishedTraining' = 'FinishedTraining'
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable startedAt: Date = new Date()
  @Mobx.observable finishedAt: Date = new Date()
  @Mobx.observable completedSets: Mobx.IObservableArray<Set> = Mobx.observable([])

  constructor(data: Model.FinishedTraining) {
    super()
    this.setTitle(data.title)
    this.setStartedAt(data.startedAt)
    this.setFinishedAt(data.finishedAt)
    this.replacecompletedSetsSets(data.completedSets.map(set => new Set(set)))
  }

  @Mobx.action
  setStartedAt(date: Date) {
    this.startedAt = date
  }

  @Mobx.action
  setFinishedAt(date: Date) {
    this.finishedAt = date
  }

  @Mobx.action
  replacecompletedSetsSets(exercises: Set[]) {
    this.completedSets.replace(exercises)
  }
}

class Set {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable attempsAmount: number = 1
  @Mobx.observable recoverSec: number = 60
  @Mobx.observable exercises: Mobx.IObservableArray<Exercise> = Mobx.observable([])
  constructor(data: Model.RemoteDataSet) {
    this.id = data.id
    this.setAttempsAmount(data.attemptsAmount)
    this.setRecoverSec(data.recoverSec)
    this.replaceExercises(data.exercises.map(e => new Exercise(e)))
  }

  @Mobx.action
  setAttempsAmount(amount: number) {
    if (amount > 0) this.attempsAmount = amount
    else this.attempsAmount = 0
  }

  @Mobx.action
  setRecoverSec(seconds: number) {
    if (seconds > 0) this.recoverSec = seconds
    else this.recoverSec = 0
  }

  @Mobx.action
  replaceExercises(exercises: Exercise[]) {
    this.exercises.replace(exercises)
  }
}

class Exercise {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable imgSrc: string = ''
  @Mobx.observable weight: number = 0
  @Mobx.observable title: string = ''
  @Mobx.observable type: Model.ExerciseType = { kind: 'repetitions', count: 10 }
  @Mobx.observable primaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable secondaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])

  constructor(data: Model.RemoteDataExercise) {
    this.id = data.id
    this.setTitle(data.title)
    this.setWeight(data.weight)
    this.setImgSrc(data.imgSrc)
    this.setType(data.type)
    data.primaryMusclesIds.map(id => {
      const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
      if (relatedMuscle) this.pushPrimaryMuscle(relatedMuscle)
    })
    data.secondaryMusclesIds.map(id => {
      const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
      if (relatedMuscle) this.pushSecondaryMuscle(relatedMuscle)
    })
  }

  @Mobx.action
  setTitle(title: string) {
    this.title = title
  }
  @Mobx.action
  setWeight(weight: number) {
    this.weight = weight
  }

  @Mobx.action
  setImgSrc(source: string) {
    this.imgSrc = source
  }

  @Mobx.action
  setType(type: Model.ExerciseType) {
    this.type = type
  }

  @Mobx.action
  replacePrimaryMuscles(muscles: Muscle[]) {
    this.primaryMuscles.replace(muscles)
  }

  @Mobx.action
  replaceSecondaryMuscles(muscles: Muscle[]) {
    this.secondaryMuscles.replace(muscles)
  }

  @Mobx.action
  pushPrimaryMuscle(muscle: Muscle) {
    this.primaryMuscles.push(muscle)
  }

  @Mobx.action
  pushSecondaryMuscle(muscle: Muscle) {
    this.secondaryMuscles.push(muscle)
  }
}

class Muscle {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable title: string = ''
  @Mobx.observable bodyPart: 'upper' | 'lower' = 'upper'

  constructor(data: Model.RemoteDataMuscle) {
    this.id = data.id
    this.title = data.title
    this.bodyPart = data.bodyPart
  }
}
