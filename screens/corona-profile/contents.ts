export const YesNoResponse = [
  {
    label: 'হ্যাঁ',
    value: 'Yes'
  },
  {
    label: 'না',
    value: 'No'
  }  
]


export const KindofTreatment = [
  {
    label: 'হ্যাঁ (ঔষধ চিকিৎসা)',
    value: 'Yes MT'
  },
  {
    label: 'হ্যাঁ (কাউন্সিলিং সেবা)',
    value: 'Yes CS'
  },
  {
    label: 'না',
    value: 'No'
  },  
]
  
  
  
  
  export const questions = [
    {
      question: 'করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার মধ্যে বিদ্যমান?',
      answers: YesNoResponse,
    },
    {
      question: 'করোনায় আক্রান্ত রোগীর লক্ষন (জ্বর, সর্দি, কাশি ইত্যাদি) আপনার কাছের মানুষদের মধ্যে বিদ্যমান?',
      answers: YesNoResponse,
    },
    {
      question: 'করোনা পরিস্থিতি উদ্ভুত হওয়ার পূর্বে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছিল?',
      answers: YesNoResponse,
    },
    {
      question: 'যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?',
      answers: KindofTreatment,
    },
    {
      question: 'করোনা পরিস্থিতি উদ্ভুত হওয়ার পরে/ এই পরিস্থিতির কারণে আপনার কি কোনও মানসিক স্বাস্থ্য সমস্যা দেখা দিয়েছে?',
      answers: YesNoResponse,
    },
    {
      question: 'যদি হ্যাঁ হয় তাহলে সেজন্য কি কোন চিকিৎসা নিয়েছিলেন?',
      answers: KindofTreatment,
    }

  ]
  
  
  