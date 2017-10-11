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

export const TMuscle = t.interface({
  id: t.number,
  title: t.string
})
export type Muscle = t.TypeOf<typeof TMuscle>

export const TAttempt = t.interface({
  weight: t.number,
  repetitions: t.number
})
export type Attempt = t.TypeOf<typeof TAttempt>

export const TExercise = t.interface({
  kind: t.literal('Exercise'),
  title: t.string,
  restSeconds: t.number,
  attempts: t.interface({
    first: TAttempt,
    other: t.array(TAttempt)
  }),
  targetMuscles: t.array(TMuscle)
})
export type Exercise = t.TypeOf<typeof TExercise>

export const TExerciseTemplate = t.interface({
  kind: t.literal('ExerciseTemplate'),
  title: t.string,
  restSeconds: t.number,
  targetMuscles: t.array(TMuscle)
})
export type ExerciseTemplate = t.TypeOf<typeof TExerciseTemplate>

export const TNotStartedTraining = t.interface({
  kind: t.literal('NotStartedTraining'),
  title: t.string,
  plannedExercises: t.array(TExercise)
})
export type NotStartedTraining = t.TypeOf<typeof TNotStartedTraining>

export const TOngoingTraining = t.interface({
  kind: t.literal('OngoingTraining'),
  title: t.string,
  startedAt: DateFromString,
  plannedExercises: t.array(TExercise),
  currentExerciseIndex: t.union([t.number, t.null]),
  completedExercises: t.array(TExercise)
})
export type OngoingTraining = t.TypeOf<typeof TOngoingTraining>

export const TFinishedTraining = t.interface({
  kind: t.literal('FinishedTraining'),
  title: t.string,
  startedAt: DateFromString,
  finishedAt: DateFromString,
  completedExercises: t.array(TExercise)
})
export type FinishedTraining = t.TypeOf<typeof TFinishedTraining>
