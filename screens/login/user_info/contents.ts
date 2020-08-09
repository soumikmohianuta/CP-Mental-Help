export const SexCategory  = [
  {
    label: 'নারী',
    value: 'Female'
  },
  {
    label: 'পুরুষ',
    value: 'Male'
  },
  {
    label: 'অন্যান্য',
    value: 'Other'
  }
]
export const MaritalStatus = [
  {
    label: 'বিবাহিত',
    value: 'Married'
  },
  {
    label: 'অবিবাহিত',
    value: 'Unmarried'
  },
  {
    label: 'বিধবা/বিপত্নিক',
    value: 'Widowed'
  },
  {
    label: 'তালাকপ্রাপ্ত',
    value: 'Divorced'
  }
]

export const CurrentLocation = [
  {
    label: 'ঢাকা',
    value: 'Dhaka'
  },
  {
    label: 'বরিশাল',
    value: 'Barishal'
  },
  {
    label: 'খুলনা',
    value: 'Khulna'
  },
  {
    label: 'চট্টগ্রাম',
    value: 'Chittagong'
  },
  {
    label: 'রাজশাহী',
    value: 'Rajshahi'
  },
  {
    label: 'ময়মনসিংহ',
    value: 'Mymensing'
  },
  {
    label: 'সিলেট',
    value: 'Sylhet'
  },
  {
    label: 'রংপুর',
    value: 'Rangpur'
  },
  {
    label: 'অন্যান্য',
    value: 'Other'
  }
]






export const questions = [
  {
    question: 'লিঙ্গ',
    answers: SexCategory,
  },
  {
    question: 'বৈবাহিক অবস্থা',
    answers: MaritalStatus,
  },
  {
    question: 'আপনি বর্তমানে কোন বিভাগে অবস্থান করছেন?',
    answers: CurrentLocation,
  },
  {
    question: 'বয়স',
    answers: [],
  }
]


