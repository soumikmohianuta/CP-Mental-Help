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

export const excerCisePercentage = (list: any) => {
  if (!list) {
    return 0;
  }
  var totalCount=0;
  var successCount = 0;
  for (var key in list) {
    // check if the property/key is defined in the object itself, not in parent
    if (list[key]==1) {           
      successCount = successCount + 1;
    }
    totalCount = totalCount+1;
  }

  return Math.round((successCount/totalCount)*100);
}