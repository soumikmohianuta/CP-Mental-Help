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
      value: 'Yes (Medicinal Treatment)'
    },
    {
      label: 'হ্যাঁ (কাউন্সিলিং সেবা)',
      value: 'Yes (Counselling Service)'
    },
    {
      label: 'না',
      value: 'No'
    },  
  ]
  
  export const SexMapper  = new Map(
    [['Female', 'নারী'],
    ['Male', 'পুরুষ'],
    ['Other','অন্যান্য']])

  export const MaritalStatusMapper = new Map(
      [['Married', 'বিবাহিত'],
      ['Unmarried', 'অবিবাহিত'],
      ['Widowed', 'বিধবা/বিপত্নিক'], 
      ['Divorced', 'তালাকপ্রাপ্ত']])
  
  export const CurrentLocationMapper = new Map(
      [['Dhaka', 'ঢাকা'],
      ['Barishal', 'বরিশাল'],
      ['Khulna', 'খুলনা'],
      ['Chittagong', 'চট্টগ্রাম'],
      ['Rajshahi', 'রাজশাহী'],
      ['Mymensing', 'ময়মনসিংহ'],
      ['Sylhet', 'সিলেট'],
      ['Rangpur', 'রংপুর'],
      ['Other', 'অন্যান্য']])


    export const MENTAL_PROFILE_MAPPER = {
      CoronaProfile:0,
      PsychoticProfile:1,
      SuicidalIdeationProfile:2,
      DomesticViolenceProfile:3,
      ChildCareProfile:4

    }  

    export const MENTAL_HEALTH_PROFILE_SECTIONS = [
        {
          name: 'করোনা সম্পর্কিত তথ্য',
          route: 'CoronaProfile',
          iconName:'cancel',
          helpSections:[],
          order:0
        },
        {
          name: 'গুরুতর সমস্যা সম্পর্কিত তথ্য',
          route: 'PsychoticProfile',
          iconName:'cancel',
          helpSections:[0,3],
          order:1
        },
        {
          name: 'আত্মহত্যা পরিকল্পনা সম্পর্কিত তথ্য',
          route: 'SuicidalIdeationProfile',
          iconName:'cancel',
          helpSections:[0,3],
          order:2
        },
        {
          name: 'পারিবারিক সহিংসতা সম্পর্কিত তথ্য',
          route: 'DomesticViolenceProfile',
          iconName:'cancel',
          helpSections:[1,2],
          order:3
        },
        {
          name: 'সন্তান পালন সম্পর্কিত তথ্য',
          route: 'ChildCareProfile',
          iconName:'cancel',
          helpSections:[1,2],
          order:4
        },
      ];


      export const MENTAL_HEALTH_FOR_HELP = [
        {
          name: 'করোনা সম্পর্কীয়',
          route: 'CoronaProfile',
          iconName:'cancel',
          order:0
        },
        {
          name: 'গুরুতর সমস্যা সম্পর্কীয়',
          route: 'PsychoticProfile',
          iconName:'cancel',
          order:1
        },
        {
          name: 'আত্মহত্যা পরিকল্পনা সম্পর্কীয়',
          route: 'SuicidalIdeationProfile',
          iconName:'cancel',
          order:2
        },
        {
          name: 'ঘরোয়া সহিংসতা সম্পর্কীয়',
          route: 'DomesticViolenceProfile',
          iconName:'cancel',
          order:3
        },
        {
          name: 'সন্তান পালন সম্পর্কিত তথ্য',
          route: 'ChildCareProfile',
          iconName:'cancel',
          order:4
        },
      ];

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
          title: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয়',
          contacts: [{
            number: '109',
            availability: 'টোল ফ্রী',
            type: 'phone',
          }],
        },
        {
          title: 'আইন ও সালিশ কেন্দ্র হেল্পলাইন নাম্বার',
          contacts: [{
            number: '01724415677',
            availability: 'সকাল ৯ টা থেকে ৫ টা',
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