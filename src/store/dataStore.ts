import * as RN from 'react-native'
import * as Mobx from 'mobx'
import * as t from 'io-ts'
import * as moment from 'moment'

import * as Model from '../models'
import * as Util from '../utils'
import { stores } from './index'
import * as ExerciseData from '../exerciseData'
import * as Const from '../constants'

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
  @Mobx.observable exerciseTemplates: Mobx.IObservableArray<ExerciseTemplate> = Mobx.observable([])
  @Mobx.observable finishedTrainings: Mobx.IObservableArray<FinishedTraining> = Mobx.observable([])

  async generateInitialData() {
    this.replaceMuscles(ExerciseData.muscles.map(muscle => new Muscle(muscle)))
    await this.fetchExercises()
    await this.fetchFinishedTrainings()
  }

  async fetchExercises() {
    this.startFetching()
    try {
      const exercisesJSON = await RN.AsyncStorage.getItem(Const.EXERCISES_STORAGE_KEY)
      if (exercisesJSON !== null) {
        const exerciseTemplates = await Util.decode(
          JSON.parse(exercisesJSON),
          t.array(Model.TRemoteDataExerciseTemplate)
        )
        this.replaceExerciseTemplates(exerciseTemplates.map(exercise => new ExerciseTemplate(exercise)))
      } else {
        await RN.AsyncStorage.setItem(Const.EXERCISES_STORAGE_KEY, JSON.stringify(ExerciseData.exerciseTeamplates))
        this.replaceExerciseTemplates(ExerciseData.exerciseTeamplates.map(exercise => new ExerciseTemplate(exercise)))
      }
    } catch (error) {
      await RN.AsyncStorage.removeItem(Const.EXERCISES_STORAGE_KEY)
      throw new Error(error)
    }
    this.stopFetching()
  }

  async fetchFinishedTrainings() {
    this.startFetching()
    try {
      const finishedTrainingsJSON = await RN.AsyncStorage.getItem(Const.FINISHED_TRAININGS_STORAGE_KEY)
      if (finishedTrainingsJSON !== null) {
        const exerciseTemplates = await Util.decode(
          JSON.parse(finishedTrainingsJSON),
          t.array(Model.TRemoteDataFinishedTraining)
        )
        this.replaceFinishedTrainings(exerciseTemplates.map(training => new FinishedTraining(training)))
      }
    } catch (error) {
      throw new Error(error)
    }
    this.stopFetching()
  }

  async saveFinishedTrainings() {
    stores.dataStore.startFetching({ inBackground: true })
    await RN.AsyncStorage.setItem(
      Const.FINISHED_TRAININGS_STORAGE_KEY,
      JSON.stringify(this.finishedTrainings.map(t => t.remoteDataModel))
    )
    stores.dataStore.stopFetching({ inBackground: true })
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
  replaceExerciseTemplates(exercises: ExerciseTemplate[]) {
    this.exerciseTemplates.replace(exercises)
  }

  @Mobx.action
  addExerciseTemplate(exercise: ExerciseTemplate) {
    this.exerciseTemplates.push(exercise)
  }

  @Mobx.action
  addFinishedTraining(training: FinishedTraining) {
    this.finishedTrainings.push(training)
    this.saveFinishedTrainings()
  }

  @Mobx.action
  replaceFinishedTrainings(trainings: FinishedTraining[]) {
    this.finishedTrainings.replace(trainings)
  }

  @Mobx.action
  removeFinishedTraining(training: FinishedTraining) {
    this.finishedTrainings.remove(training)
    this.saveFinishedTrainings()
  }

  @Mobx.computed
  get isFetching() {
    return this.fetching.foreground > 0 || this.fetching.background > 0
  }
}

class GenericTraining {
  @Mobx.observable title: string = 'Training on ' + moment().format('dddd')

  @Mobx.action
  setTitle(title: string) {
    this.title = title
  }

  async save() {
    await stores.dataStore.saveFinishedTrainings()
  }
}

export class FinishedTraining extends GenericTraining {
  kind: 'FinishedTraining' = 'FinishedTraining'
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable startedAt: Date = new Date()
  @Mobx.observable finishedAt: Date = new Date()
  @Mobx.observable completedSets: Mobx.IObservableArray<Set> = Mobx.observable([])

  constructor(data?: Model.RemoteDataFinishedTraining) {
    super()
    if (data) {
      this.id = data.id
      this.setTitle(data.title)
      this.setStartedAt(data.startedAt)
      this.setFinishedAt(data.finishedAt)
      this.replaceCompletedSets(data.completedSets.map(set => new Set(set)))
    }
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
  replaceCompletedSets(sets: Set[]) {
    sets.map(set => set.setRelatedTraining(this))
    this.completedSets.replace(sets)
  }

  @Mobx.action
  addCompletedSet(set: Set) {
    set.setRelatedTraining(this)
    this.completedSets.push(set)
  }

  @Mobx.action
  removeCompletedSet(set: Set) {
    set.setRelatedTraining(null)
    this.completedSets.remove(set)
  }

  @Mobx.action
  switchCompletedSetPosition(index1: number, index2: number) {
    const set1 = this.completedSets[index1]
    const set2 = this.completedSets[index2]
    if (set1 && set2) {
      this.replaceCompletedSets(this.completedSets.map((set, i) => (i === index1 ? set2 : i === index2 ? set1 : set)))
    }
  }

  @Mobx.computed
  get remoteDataModel(): Model.RemoteDataFinishedTraining {
    const { id, startedAt, title, finishedAt, completedSets } = this
    return {
      kind: 'FinishedTraining',
      title,
      id,
      startedAt,
      finishedAt,
      completedSets: completedSets.map(set => set.remoteDataModel)
    }
  }
}

export type Training = FinishedTraining

export class Set {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable attemptsAmount: number = 1
  @Mobx.observable recoverSec: number = 90
  @Mobx.observable exercises: Mobx.IObservableArray<Exercise> = Mobx.observable([])
  @Mobx.observable relatedTraining: Training | null = null
  constructor(data?: Model.RemoteDataSet) {
    if (data) {
      this.id = data.id
      this.setAttemptsAmount(data.attemptsAmount)
      this.setRecoverSec(data.recoverSec)
      this.replaceExercises(data.exercises.map(e => new Exercise(e)))
    }
  }

  async save() {
    if (this.relatedTraining) await this.relatedTraining.save()
  }

  @Mobx.action
  setRelatedTraining(training: Training | null) {
    this.relatedTraining = training
  }

  @Mobx.action
  setAttemptsAmount(amount: number) {
    if (amount > 0) this.attemptsAmount = amount
    else this.attemptsAmount = 0
  }

  @Mobx.action
  setRecoverSec(seconds: number) {
    if (seconds > 0) this.recoverSec = seconds
    else this.recoverSec = 0
  }

  @Mobx.action
  replaceExercises(exercises: Exercise[]) {
    exercises.map(exercise => exercise.setRelatedSet(this))
    this.exercises.replace(exercises)
  }

  @Mobx.action
  addExercise(exercise: Exercise) {
    exercise.setRelatedSet(this)
    this.exercises.push(exercise)
  }

  @Mobx.action
  removeExercise(exercise: Exercise) {
    exercise.setRelatedSet(null)
    this.exercises.remove(exercise)
  }

  @Mobx.computed
  get remoteDataModel(): Model.RemoteDataSet {
    const { id, attemptsAmount, recoverSec, exercises } = this
    return {
      id,
      attemptsAmount,
      recoverSec,
      exercises: exercises.map(e => e.remoteDataModel)
    }
  }
}

export class ExerciseTemplate {
  kind: 'exerciseTemplate' = 'exerciseTemplate'
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable imgSrc: string = ''
  @Mobx.observable title: string = ''
  @Mobx.observable primaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable secondaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable inventoryIds: Mobx.IObservableArray<string> = Mobx.observable([])

  constructor(data?: Model.RemoteDataExerciseTemplate) {
    if (data) {
      this.setTitle(data.title)
      this.setImgSrc(data.imgSrc)
      this.replaceInventoryIds(data.inventoryIds)
      this.updatePrimaryMusclesByIds(data.primaryMusclesIds)
      this.updateSecondaryMusclesByIds(data.secondaryMusclesIds)
    }
  }

  async save() {
    stores.dataStore.startFetching({ inBackground: true })
    const storedExercise = stores.dataStore.exerciseTemplates.find(e => e.id === this.id)
    if (!storedExercise) {
      stores.dataStore.addExerciseTemplate(this)
    }
    await RN.AsyncStorage.setItem(
      Const.EXERCISES_STORAGE_KEY,
      JSON.stringify(stores.dataStore.exerciseTemplates.map(e => e.remoteDataModel))
    )
    stores.dataStore.stopFetching({ inBackground: true })
  }

  @Mobx.action
  setTitle(title: string) {
    this.title = title
  }

  @Mobx.action
  setImgSrc(source: string) {
    this.imgSrc = source
  }

  @Mobx.action
  replaceInventoryIds(ids: string[]) {
    this.inventoryIds.replace(ids)
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

  @Mobx.action
  updatePrimaryMusclesByIds(ids: string[]) {
    this.replacePrimaryMuscles(
      ids.reduce((acc, id) => {
        const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
        return relatedMuscle ? [...acc, relatedMuscle] : acc
      }, [])
    )
  }

  @Mobx.action
  updateSecondaryMusclesByIds(ids: string[]) {
    this.replaceSecondaryMuscles(
      ids.reduce((acc, id) => {
        const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
        return relatedMuscle ? [...acc, relatedMuscle] : acc
      }, [])
    )
  }

  @Mobx.computed
  get remoteDataModel(): Model.RemoteDataExerciseTemplate {
    const { title, imgSrc, inventoryIds, primaryMuscles, secondaryMuscles } = this
    return {
      kind: 'exerciseTemplate',
      title,
      imgSrc,
      inventoryIds: inventoryIds.peek(),
      primaryMusclesIds: primaryMuscles.map(m => m.id),
      secondaryMusclesIds: secondaryMuscles.map(m => m.id)
    }
  }
}

export class Exercise {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable imgSrc: string = ''
  @Mobx.observable weight: number = 0
  @Mobx.observable title: string = ''
  @Mobx.observable type: Model.ExerciseType = { kind: 'repetitions', count: 10 }
  @Mobx.observable primaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable secondaryMuscles: Mobx.IObservableArray<Muscle> = Mobx.observable([])
  @Mobx.observable inventoryIds: Mobx.IObservableArray<string> = Mobx.observable([])
  @Mobx.observable realtedSet: Set | null = null

  constructor(data: Model.RemoteDataExercise | ExerciseTemplate) {
    switch (data.kind) {
      case 'exercise':
        this.id = data.id
        this.type = data.type
        this.weight = data.weight
        this.updatePrimaryMusclesByIds(data.primaryMusclesIds)
        this.updateSecondaryMusclesByIds(data.secondaryMusclesIds)
        break
      case 'exerciseTemplate':
        this.replacePrimaryMuscles(data.primaryMuscles)
        this.replaceSecondaryMuscles(data.secondaryMuscles)
        break
      default:
        Util.shouldNeverHappen(data)
    }
    this.setTitle(data.title)
    this.setImgSrc(data.imgSrc)
    this.replaceInventoryIds(data.inventoryIds)
  }

  async save() {
    if (this.realtedSet) await this.realtedSet.save()
  }

  @Mobx.action
  setTitle(title: string) {
    this.title = title
  }
  @Mobx.action
  setWeight(weight: number) {
    if (isNaN(weight)) this.weight = 0
    this.weight = weight
  }

  @Mobx.action
  setRelatedSet(set: Set | null) {
    this.realtedSet = set
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
  replaceInventoryIds(ids: string[]) {
    this.inventoryIds.replace(ids)
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

  @Mobx.action
  updatePrimaryMusclesByIds(ids: string[]) {
    this.replacePrimaryMuscles(
      ids.reduce((acc, id) => {
        const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
        return relatedMuscle ? [...acc, relatedMuscle] : acc
      }, [])
    )
  }

  @Mobx.action
  updateSecondaryMusclesByIds(ids: string[]) {
    this.replaceSecondaryMuscles(
      ids.reduce((acc, id) => {
        const relatedMuscle = stores.dataStore.muscles.find(m => m.id === id)
        return relatedMuscle ? [...acc, relatedMuscle] : acc
      }, [])
    )
  }

  @Mobx.computed
  get remoteDataModel(): Model.RemoteDataExercise {
    const { id, title, imgSrc, inventoryIds, primaryMuscles, secondaryMuscles, weight, type } = this
    return {
      kind: 'exercise',
      id,
      title,
      imgSrc,
      weight,
      type,
      inventoryIds: inventoryIds.peek(),
      primaryMusclesIds: primaryMuscles.map(m => m.id),
      secondaryMusclesIds: secondaryMuscles.map(m => m.id)
    }
  }
}

export class Muscle {
  @Mobx.observable id: string = Util.uuid()
  @Mobx.observable title: string = ''
  @Mobx.observable bodyPart: 'upper' | 'lower' = 'upper'

  constructor(data: Model.RemoteDataMuscle) {
    this.id = data.id
    this.title = data.title
    this.bodyPart = data.bodyPart
  }

  @Mobx.computed
  get remoteDataModel(): Model.RemoteDataMuscle {
    return Mobx.toJS(this)
  }
}
