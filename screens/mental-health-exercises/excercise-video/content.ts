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
      image: require('../../scales/assets/ghq.jpeg')
    },
    {
      name: 'মানসিক চাপ নির্ণয়',
      route: 'PSSMeasure',
      iconName:'cancel',
      image: require('../../scales/assets/pss.jpg')
    },
    {
      name: 'দুশ্চিন্তা নির্ণয়',
      route: 'AnxietyScaleMeasure',
      iconName:'cancel',
      image: require('../../scales/assets/anxiety.jpeg')
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
  