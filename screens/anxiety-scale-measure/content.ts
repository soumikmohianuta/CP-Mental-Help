const getAnswers = (weights: number[]) => [
  {
    label: 'একেবারেই হয় না',
    value: 1,
    weight: weights[0],
  },
  {
    label: 'খুব সামান্য',
    value: 2,
    weight: weights[1],
  },
  {
    label: 'মোটামুটি হয়',
    value: 3,
    weight: weights[2],
  },
  {
    label: 'বেশী হয়',
    value: 4,
    weight: weights[3],
  },
  {
    label: 'অনেক বেশী',
    value: 5,
    weight: weights[4],
  },
]

export const questions = [
  {
    question: 'আমার ঘনঘন শ্বাস পড়ে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার দমবন্ধবোধ হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার বুক ভার ভার লাগে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার বুক ধড়ফড় করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি বুকে ব্যাথা অনুভব করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার গা/হাত-পা শিরশির করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার হাত/পা কাঁপে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার হাত/পা অবশ লাগে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার হাত/পা জ্বালাপোড়া করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মাথা ঝিমঝিম করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মাথা ঘোরে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মাথা  ব্যাথা করে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মাথা থেকে গরম ভাব ওঠে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার গলা শুঁকিয়ে যায় ও পিপাসা লাগে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি অসুস্থ হয়ে যাবো এমন মনে হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি আমার স্বাস্থ্য নিয়ে চিন্তিত থাকি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি দুর্বলবোধ করি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার হজমে অসুবিধা হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার পেটে অস্বস্থি লাগে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার বমি বমি লাগে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার খুব ঘাম হয় (গরমের জন্য নয়)',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি আরাম করতে পারি না',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার সামাজিক পরিবেশে কথা বলতে অসুবিধা হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'এক বিষয় নিয়ে আমার বারবার চিন্তা হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার খুব খারাপ কিছু ঘটবে বলে আশংকা হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি প্রায়ই দুঃশ্চিন্তাগ্রস্থ থাকি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি প্রায়ই চমকে উঠি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি বিচলিত ও স্নত্রস্তবোধ করি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার আত্মনিয়ন্ত্রন হারাবার ভয় হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি এত নার্ভাস বা উত্তেজিত বোধ করি যে মনে হয় আমার সবকিছু এলোমেলো হয়ে যাচ্ছে',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি ধৈর্য ধরতে পারি না',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমি সিদ্ধান্তহীনতায় ভুগি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার আত্মবিশ্বাসের অভাববোধ হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'একটা বিষয়ের প্রতি মনোযোগ দিয়ে রাখা আমার জন্য বেশ কষ্টকর',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মনে হয় আমি এখনই মারা যাচ্ছি',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
  {
    question: 'আমার মৃত্যু ভয় হয়',
    answers: getAnswers([0, 1, 2, 3, 4]),
  },
]