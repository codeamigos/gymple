export interface NotStartedTraining {
  kind: 'NotStartedTraining',
  title: string,
  plannedExercises: Exercise[],
}

export interface OngoingTraining {
  kind: 'OngoingTraining',
  title: string,
  startedAt: Date,
  plannedExercises: Exercise[],
  currentExerciseIndex: number | null,
  completedExercises: Exercise[],
}

/*
interface Profile {
  active: NotStartedTraining | OngoingTraining | null,
  history: FinishedTraining[],
}

type Training = NotStartedTraining | OngoingTraining | FinishedTraining;
*/

/*
export interface FinishedTraining {
  title: string,
  startedAt: Date,
  finishedAt: Date,
  completedExercises: Exercise[],
}
*/

export interface Attempt {
  weight: number,
  repetitions: number,
}

export interface Exercise {
  kind: 'Exercise',
  title: string,
  restSeconds: number,
  attempts: {
    first: Attempt,
    other: Attempt[],
  },
  targetMuscles: Muscle[]
}

export interface ExerciseTemplate {
  kind: 'ExerciseTemplate',
  title: string,
  restSeconds: number,
  targetMuscles: Muscle[]
}

export interface Muscle {
  id: number,
  title: string,
}

export interface ExerciseListItemProps {
  exercise: Exercise,
}
