import { SCALE_NAME } from "./constants";

export const GHQ_SCALE_LEVEL = [];

export const PSS_SCALE_LEVEL = [
  {
    name: "Low",
    maxRange: 13,
  },
  {
    name: "Moderate",
    maxRange: 26,
  },
  {
    name: "High Percieved",
    maxRange: 40,
  },
];

export const ANXIETY_SCALE_LEVEL = [
  {
    name: "Mild anxiety",
    maxRange: 54,
  },
  {
    name: "Moderate anxiety",
    maxRange: 66,
  },
  {
    name: "Severe anxiety",
    maxRange: 77,
  },
  {
    name: "Profound anxiety",
    maxRange: 135,
  },
];

export const SCALE_MAX_VALUE = {
  [SCALE_NAME.GHQ]: 12,
  [SCALE_NAME.PSS]: 40,
  [SCALE_NAME.ANXIETY]: 144,
};

export const scaleToLevelMap = {
  [SCALE_NAME.GHQ]: GHQ_SCALE_LEVEL,
  [SCALE_NAME.PSS]: PSS_SCALE_LEVEL,
  [SCALE_NAME.ANXIETY]: ANXIETY_SCALE_LEVEL,
};

export const getLevelByScore = (scale: string, score: number) => {
  const scaleLevel = scaleToLevelMap[scale].find(
    (sl: any) => score <= sl.maxRange
  );
  return scaleLevel && scaleLevel.name;
};
