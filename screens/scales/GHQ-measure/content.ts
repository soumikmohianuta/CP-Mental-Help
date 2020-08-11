const getAnswers = (weights: number[]) => [
  {
    label: 'মোটেই না',
    value: 1,
    weight: weights[0],
  },
  {
    label: 'কিছুটা',
    value: 2,
    weight: weights[1],
  },
  {
    label: 'বেশ খানিকটা',
    value: 3,
    weight: weights[2],
  },
  {
    label: 'সর্বাধিক পরিমাণ',
    value: 4,
    weight: weights[3],
  }
]

export const questions = [
  {
    question: 'ইদানিং আপনি যা করছেন তাতে কি মনোনিবেশ করতে পারছেন?',
    answers: getAnswers([1, 1, 0, 0]),
  },
  {
    question: 'ইদানিং দুশ্চিন্তায় আপনার নিদ্রায় অত্যন্ত ব্যাঘাত ঘটে কি?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'আপনি আজকাল প্রয়োজনীয় কাজে মনোযোগ দিতে পারেন কি?',
    answers: getAnswers([1, 1, 0, 0]),
  },
  {
    question: 'আপনি কি বর্তমানে কোন কিছু সম্পর্কে সিদ্ধান্ত গ্রহণ করতে সমর্থ?',
    answers: getAnswers([1, 1, 0, 0]),
  },
  {
    question: 'আপনি কি ইদানিং সর্বদা মানসিক চাপের মধ্যে থাকছেন?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'আপনার কি মনে হয় ইদানিং আপনার অসুবিধাগুলি দূর করতে সক্ষম হচ্ছেন না?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'আপনার দৈনন্দিন কাজগুলি উপভোগ করতে সক্ষম হচ্ছেন কি?',
    answers: getAnswers([1, 1, 0, 0]),
  },
  {
    question: 'আপনি কি ইদানিং আপনার সমস্যাগুলির মোকাবেলা করতে সক্ষম?',
    answers: getAnswers([1, 1, 0, 0]),
  },

  {
    question: 'আপনি কি ইদানিং অসুখী ও বিমর্ষ বোধ করছেন?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'বর্তমানে আপনি কি আত্মবিশ্বাস হারিয়ে ফেলেছেন বলে মনে করেন?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'ইদানিং আপনি কি নিজেকে একজন অযোগ্য ব্যক্তি হিসাবে গণ্য করেন?',
    answers: getAnswers([0, 0, 1, 1]),
  },
  {
    question: 'সবদিক বিবেচনা করে বর্তমানে আপনি কি নিজেকে মোটামুটিভাবে সুখী মনে করেন?',
    answers: getAnswers([1, 1, 0, 0]),
  }
]