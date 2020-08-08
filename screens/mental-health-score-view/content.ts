export const exerciseStatusToContentMap = {
  never: {
    title: 'আপনার মানসিক স্বাস্থ্য উন্নয়নের জন্য অনুশীলন এর প্রয়োজন',
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