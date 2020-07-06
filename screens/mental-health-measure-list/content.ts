const GHQImage = require('./assets/ghq.jpeg');
const PSSImage = require('./assets/pss.jpg');
const AnxietyImage = require('./assets/anxiety.jpeg');

export const measureList = [{
  title: 'মানসিক অবস্থা যাচাইকরণ',
  description: 'এখানে ১২টি প্রশ্ন আছে যেগুলো উত্তর দেওয়ার মাধ্যমে আপনি আপনার মানসিক অবস্থা (সাধারণ, মাঝামাঝি, তীব্র মাত্রা) সম্পর্কে একটি ধারণা পাবেন।',
  image: GHQImage,
  testRoute: 'GHQMeasure',
  historyRoute: '',
}, {
  title: 'মানসিক চাপ নির্ণয়',
  description: 'এখানে ১০টি প্রশ্নবিশিষ্ট একটি স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার মানসিক চাপ পরিমাপ করতে পারেন।',
  image: PSSImage,
  testRoute: 'PSSMeasure',
  historyRoute: 'PSSHistory',
}, {
  title: 'দুশ্চিন্তা নির্ণয়',
  description: 'এখানে ১০টি প্রশ্নবিশিষ্ট একটি স্কেল রয়েছে যার মাধ্যমে খুব সহজেই আপনি আপনার দুশ্চিন্তা পরিমাপ করতে পারেন।',
  image: AnxietyImage,
  testRoute: 'AnxietyScaleMeasure',
  historyRoute: 'AnxietyScaleHistory',
}];
