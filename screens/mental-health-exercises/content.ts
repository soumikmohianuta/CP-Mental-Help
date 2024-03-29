export const resources = [
  {
    name: "চিন্তা ও আচরণ",
    type: "video",
    videoId: "eUc5pD9C2r0",
    content_id: 'thought_behave',
    iconName: 'cancel',
    order: 0,
  },
    {
    name: "কথা বলার কিছু ধরন",
    type: "video",
    videoId: "GP1qKfY5cU4",
    content_id: 'communication_skills',
    iconName: 'cancel',
    order: 1,
  },
  {
    name: "মানুষ যে কারনে তার পছন্দের আচরণ করে",
    type: "video",
    videoId: "FkEuVP3wNLo",
    content_id: 'health_belief_model',
    iconName: 'cancel',
    order: 2,
  },
    {
    name: "একজন করোনা বিজয়ীর ইন্টারভিউ ",
    type: "video",
    videoId: "2W6P5Sag63w",
    content_id: 'corona_surrounding',
    iconName: 'cancel',
    order: 3,
  },
      {
    name: "প্রিয়জনের মৃত্যুর পর নিজেকে সামলানোর উপায় ",
    type: "video",
    videoId: "MreOgt1-Z5w",
    content_id: 'grief_and_loss',
    iconName: 'cancel',
    order: 4,
  },
        {
    name: "সংকটপূর্ণ সময়ে নিজেকে সামলানোর কৌশল",
    type: "video",
    videoId: "wXqFhYjoTkE",
    content_id: 'mental_coping',
    iconName: 'cancel',
    order: 5,
  },
          {
    name: "দাম্পত্য সম্পর্ক উন্নয়ন ",
    type: "video",
    videoId: "LT1VpMtPHNo",
    content_id: 'couple_relation',
    iconName: 'cancel',
    order: 6,
  },
  {
    name: "রাগ নিয়ন্ত্রণের উপায় ",
    type: "video",
    videoId: "qbCIdHYakcg",
    content_id: 'anger_management',
    iconName: 'cancel',
    order: 7,
  },
    {
    name: "বাবা-মা ও সন্তানের সম্পর্ক উন্নয়ন ",
    type: "video",
    videoId: "9yDlLvrmCDw",
    content_id: 'parent_child_relation',
    iconName: 'cancel',
    order: 8,
  },
    {
    name: "আবেগীয় পরিবর্তনের তারতম্য ঠিক রাখার উপায় ",
    type: "video",
    videoId: "xFhKAs7BMLU",
    content_id: 'manage_up_downs',
    iconName: 'cancel',
    order: 9,
  },
      {
    name: "মাইন্ডফুলনেস - ১",
    type: "video",
    videoId: "Ch7deOySu94",
    content_id: 'mindfulness_1',
    iconName: 'cancel',
    order: 10,
  },
      {
    name: "মাইন্ডফুলনেস - ২ ",
    type: "video",
    videoId: "n0ylBFc3tMc",
    content_id: 'mindfulness_2',
    iconName: 'cancel',
    order: 11,
  },
      {
    name: "ঘুমের গুণগত মান বৃদ্ধি করার কৌশল",
    type: "video",
    videoId: "6auC-zErUpU",
    content_id: 'maximize_sleep',
    iconName: 'cancel',
    order: 12,
  },
      {
    name: "ব্রিদিং এক্সারসাইজ",
    type: "video",
    videoId: "WzkFqUbpen0",
    content_id: 'breath_excercise',
    iconName: 'cancel',
    order: 13,
  },
      {
    name: "মাংসপেশির শিথিলায়ন ",
    type: "video",
    videoId: "oRya-GgT2vU",
    content_id: 'pmr',
    iconName: 'cancel',
    order: 14,
  },
  
];

export const exerciseStatusToContentMap = {
  disabled: {
    title: 'অনুশীলনগুলো দেখতে আপনার মানসিক অবস্থার মূল্যায়ন এবং যে কোন একটি যাচাই সম্পন্ন করুন',
    buttonText: 'চলুন শুরু করি',
  },

  never: {
    title: 'আপনার মানসিক স্বাস্থ্য উন্নয়নের জন্য অনুশীলন শুরু করুন',
    buttonText: 'চলুন শুরু করি',
  },
  completed: {
    title: 'আপনি মানসিক স্বাস্থ্য উন্নয়নের জন্য অনুশীলনী শেষ করেছেন!',
    buttonText: 'পুনরায় শুরু করি',
  },
  inprogress: {
    title: 'আপনি মানসিক স্বাস্থ্য উন্নয়নের জন্য অনুশীলনীটি এখন করছেন',
    buttonText: 'চলুন দেখে আসি',
  }
}


export const MENTAL_HEALTH_JUDGE_SECTIONS = [
  {
    name: 'মানসিক অবস্থা যাচাইকরণ',
    route: 'GHQMeasure',
    iconName:'cancel',
    image: require('../scales/assets/ghq.jpeg')
  },
  {
    name: 'মানসিক চাপ নির্ণয়',
    route: 'PSSMeasure',
    iconName:'cancel',
    image: require('../scales/assets/pss.jpg')
  },
  {
    name: 'দুশ্চিন্তা নির্ণয়',
    route: 'AnxietyScaleMeasure',
    iconName:'cancel',
    image: require('../scales/assets/anxiety.jpeg')
  },
];

export const MENTAL_HEALTH_STATUS_TITLE = {
        notDone: {
          title: 'চলুন মূল্যায়ন করে আসি',
        },
      
        done: {
          title: 'চলুন পুনরায় মূল্যায়ন করে আসি',
        },
    }
