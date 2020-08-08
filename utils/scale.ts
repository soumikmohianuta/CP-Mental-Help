import { SCALE_NAME } from "./constants";

export const GHQ_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 4,
    label:'low'
  },
  {
    name: "মাঝামাঝি",
    maxRange: 9,
    label:'medium'
  },
  {
    name: "তীব্র",
    maxRange: 12,
    label:'high'
  },
];

export const PSS_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 13,
    label:'low'
  },
  {
    name: "মাঝামাঝি",
    maxRange: 26,
    label:'medium'
  },
  {
    name: "তীব্র",
    maxRange: 40,
    label:'high'
  },
];

export const ANXIETY_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 54,
    label:'low'
  },
  {
    name: "মাঝারি", 
    maxRange: 66,
    label:'medium'
  },
  {
    name: "তীব্র",
    maxRange: 135,
    label:'high'
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

export const isSevere = (scale: string, score: number) => {
  const scaleLevel = scaleToLevelMap[scale].find(
    (sl: any) => score <= sl.maxRange
  );
  var isSeverer = scaleLevel?.label =="high";
  return isSeverer;
};