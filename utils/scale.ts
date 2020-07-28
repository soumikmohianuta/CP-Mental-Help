import { SCALE_NAME } from "./constants";

export const GHQ_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 4,
  },
  {
    name: "মাঝামাঝি",
    maxRange: 9,
  },
  {
    name: "তীব্র",
    maxRange: 12,
  },
];

export const PSS_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 13,
  },
  {
    name: "মাঝামাঝি",
    maxRange: 26,
  },
  {
    name: "তীব্র",
    maxRange: 40,
  },
];

export const ANXIETY_SCALE_LEVEL = [
  {
    name: "সাধারণ",
    maxRange: 54,
  },
  {
    name: "মাঝামাঝি",
    maxRange: 66,
  },
  {
    name: "তীব্র",
    maxRange: 77,
  },
  {
    name: "অত্যধিক",
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
