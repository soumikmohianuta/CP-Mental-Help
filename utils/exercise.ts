import { resources } from "../screens/mental-health-exercises/content";

export const EXERCISE_STATUS = {
  NEVER: 'never',
  IN_PROGRESS: 'inprogress',
  COMPLETED: 'completed',
}

export const getExerciseList = () => {
  return resources.reduce((acc, item) => {
    acc[item.content_id] = 0;
    return acc;
  }, {} as any);
};

export const isExcerciseTaken = (list: any) => {
  if (!list) {
    return EXERCISE_STATUS.NEVER;
  }
  return Object.keys(list).every((key) => list[key] === 1) ?
    EXERCISE_STATUS.COMPLETED : EXERCISE_STATUS.IN_PROGRESS;
}