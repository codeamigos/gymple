import * as t from 'io-ts'

export const DateFromString: t.Type<Date> = {
  _A: t._A,
  name: 'DateFromString',
  validate: (v, c) =>
    t.string.validate(v, c).chain(s => {
      const d = new Date(s)
      return isNaN(d.getTime()) ? t.failure<Date>(s, c) : t.success(d)
    })
}

export type RemoteData<T> =
  | {
      kind: 'NotFetched'
    }
  | {
      kind: 'IsFetching'
    }
  | {
      kind: 'ErrorFetching'
      error: Error
    }
  | { kind: 'Fetched'; data: T; fetchedAt: Date }

export const TRemoteDataMuscle = t.interface({
  id: t.string,
  title: t.string,
  bodyPart: t.union([t.literal('upper'), t.literal('lower')])
})
export type RemoteDataMuscle = t.TypeOf<typeof TRemoteDataMuscle>

export const TRemoteDataInventory = t.interface({
  id: t.string,
  title: t.string
})
export type RemoteDataInventory = t.TypeOf<typeof TRemoteDataInventory>

export const TExerciseType = t.union([
  t.interface({
    kind: t.literal('repetitions'),
    count: t.number
  }),
  t.interface({
    kind: t.literal('distance'),
    meters: t.number
  }),
  t.interface({
    kind: t.literal('time'),
    seconds: t.number
  })
])
export type ExerciseType = t.TypeOf<typeof TExerciseType>

export const TRemoteDataExercise = t.interface({
  kind: t.literal('exercise'),
  id: t.string,
  title: t.string,
  imgSrc: t.string,
  inventoryIds: t.array(t.string),
  primaryMusclesIds: t.array(t.string),
  secondaryMusclesIds: t.array(t.string),
  weight: t.number,
  type: TExerciseType
})
export type RemoteDataExercise = t.TypeOf<typeof TRemoteDataExercise>

export const TRemoteDataExerciseTemplate = t.interface({
  kind: t.literal('exerciseTemplate'),
  title: t.string,
  imgSrc: t.string,
  inventoryIds: t.array(t.string),
  primaryMusclesIds: t.array(t.string),
  secondaryMusclesIds: t.array(t.string)
})
export type RemoteDataExerciseTemplate = t.TypeOf<typeof TRemoteDataExerciseTemplate>

export const TRemoteDataSet = t.interface({
  id: t.string,
  attemptsAmount: t.number,
  recoverSec: t.number,
  exercises: t.array(TRemoteDataExercise)
})
export type RemoteDataSet = t.TypeOf<typeof TRemoteDataSet>

export const TFinishedTraining = t.interface({
  kind: t.literal('FinishedTraining'),
  title: t.string,
  startedAt: DateFromString,
  finishedAt: DateFromString,
  completedSets: t.array(TRemoteDataSet)
})
export type FinishedTraining = t.TypeOf<typeof TFinishedTraining>
