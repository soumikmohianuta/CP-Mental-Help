export const helplines = [
    {
      title: 'নাসিরুল্লাহ সাইকথেরাপি ইউনিট',
      subtitle: 'ঢাকা বিশ্ববিদ্যালয়',
      contacts: [{
        number: '01715654538',
        availability: '',
        type: 'phone',
      }],
    },
    {
      title: 'জাতীয় মানসিক স্বাস্থ্য ইনস্টিউট ও হাসপাতাল',
      contacts: [{
        number: '01404000080',
        availability: 'সকাল ৮ টা থেকে ১০ টা',
        type: 'phone',
      },
      {
        number: '01404000081',
        availability: 'সকাল ৮ টা থেকে ১০ টা',
        type: 'phone',
      },
      {
        number: '01404000082',
        availability: 'সকাল ৮ টা থেকে ১০ টা (WhatsApp)',
        type: 'whatsapp',
      },
      {
        number: '01404000083',
        availability: 'সকাল ৮ টা থেকে ১০ টা (WhatsApp)',
        type: 'whatsapp',
      }],
    },
  ]




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

    
    
    
    export const questions = [
      {
        question: 'আপনি কি আত্মহত্যার কথা ভাবেন?',
        answers: YesNoResponse,
      },
      {
        question: 'আত্মহত্যার করার কোন পরিকল্পনা করেছিলেন?',
        answers: YesNoResponse,
      },
      {
        question: 'আগে কখনো আত্মহত্যা করার চেষ্টা করেছিলেন কি?',
        answers: YesNoResponse,
      }
  
    ]



    export const suicide_answers = [
      {  
        name:'any_though',
        answer: '',
        order:0
      },
      {  
        name:'any_plan',
        answer: '',
        order:1
      },
      {  
        name:'any_attempt',
        answer: '',
        order:2
      },]