export const resources = [
  {
    name: "একজন করোনা বিজয়ীর ইন্টারভিউ",
    type: "audio",
    videoId: "i8FTMKbdb0Y",
    content_id: 'corona_interview',
    order: 0,
  },
  {
    name: "মহামারীর সময়ে মানসিক প্রস্তুতি",
    type: "audio",
    videoId: "",
    content_id: 'pandemic_preparation',
    order: 1,
  },
  {
    name: "চিন্তার প্রভাব",
    type: "audio",
    videoId: "",
    content_id: 'thought_behaviour',
    order: 2,
  },
  {
    name: "দাম্পত্য সম্পর্ক",
    type: "audio",
    videoId: "",
    content_id: 'couple_relationship',
    order: 3,
  },
  {
    name: "রাগ নিয়ন্ত্রণ",
    type: "audio",
    videoId: "",
    content_id: 'anger_management',
    order: 4,
  },
  {
    name: "ব্রিদিং এক্সারসাইজ",
    type: "audio",
    videoId: "",
    content_id: 'breathing',
    order: 5,
  },
  {
    name: "অভিভাবক-সন্তানের সম্পর্ক",
    type: "audio",
    videoId: "",
    content_id: 'parent_child_relationship',
    order: 6,
  },
  {
    name: "কথা বলার কিছু ধরন",
    type: "audio",
    videoId: "",
    content_id: 'communication_skill',
    order: 7,
  },
  {
    name: "আবেগ নিয়ন্ত্রণ",
    type: "audio",
    videoId: "",
    content_id: 'emotion_management',
    order: 8,
  },
  {
    name: "মাইন্ডফুলনেস",
    type: "audio",
    videoId: "",
    content_id: 'mindfulness',
    order: 9,
  },
  {
    name: "প্রিয়জনের মৃত্যুর পর নিজেকে মানসিক ভাবে ঠিক রাখার উপায়",
    type: "audio",
    videoId: "",
    content_id: 'experiencing_grief_loss',
    order: 10,
  },
  {
    name: "ঘুমের গুণগত মান বৃদ্ধি করার কৌশল",
    type: "audio",
    videoId: "",
    content_id: 'maximizing_sleep',
    order: 11,
  },
  {
    name: "মাংসপেশির শিথিলায়ন",
    type: "audio",
    videoId: "",
    content_id: 'pmr',
    order: 12,
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
    iconName:'cancel'
  },
  {
    name: 'মানসিক চাপ নির্ণয়',
    route: 'PSSMeasure',
    iconName:'cancel'
  },
  {
    name: 'দুশ্চিন্তা নির্ণয়',
    route: 'AnxietyScaleMeasure',
    iconName:'cancel'
  },
];

export const MENTAL_HEALTH_STATUS_TITLE = {
        notDone: {
          title: 'চলুন মানসিক স্বাস্থ্যের মূল্যায়ন করে আসি',
        },
      
        done: {
          title: 'চলুন পুনরায় মানসিক স্বাস্থ্যের মূল্যায়ন করে আসি',
        },
    }
