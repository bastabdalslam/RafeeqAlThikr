
export interface Athkar {
  id: string;
  arabic: string;
  translation: string;
  transliteration?: string;
  count?: number;
  reference?: string;
}

export interface AthkarCategory {
  id: string;
  title: string;
  titleArabic: string;
  icon: string;
  color: string;
  athkar: Athkar[];
}

export const athkarCategories: AthkarCategory[] = [
  {
    id: 'morning',
    title: 'Morning Athkar',
    titleArabic: 'أذكار الصباح',
    icon: 'weather-partly-cloudy',
    color: ' #F5DF99',
    athkar: [
      {
        id: 'morning_1',
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'We have entered a new day and with it all the dominion which belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him is the praise, and He is Able to do all things.',
        transliteration: 'Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadir',
        count: 1,
        reference: 'Muslim 4:2088'
      },
      {
        id: 'morning_2',
        arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
        translation: 'O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection.',
        transliteration: 'Allahumma bika asbahna, wabika amsayna, wabika nahya, wabika namutu, wa ilaykan-nushur',
        count: 1,
        reference: 'At-Tirmidhi 5:466'
      },
      {
        id: 'morning_3',
        arabic: 'أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
        translation: 'We have entered a new day upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace be upon him), and the faith of our father Ibrahim, who was upright and a Muslim, and was not of those who associate others with Allah.',
        transliteration: 'Asbahna \'ala fitratil-Islam, wa \'ala kalimatil-ikhlas, wa \'ala dini nabiyyina Muhammad, wa \'ala millati abina Ibrahim, hanifan musliman, wama kana minal-mushrikin',
        count: 1,
        reference: 'Ahmad 3:406, 407'
      },
      {
        id: 'morning_4',
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
        translation: 'Glory is to Allah and praise is to Him.',
        transliteration: 'Subhanallahi wa bihamdihi',
        count: 100,
        reference: 'Muslim 4:2071'
      },
      {
        id: 'morning_5',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'None has the right to be worshipped but Allah alone, Who has no partner. To Him belongs the dominion and to Him belongs all praise, and He is Able to do all things.',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadir',
        count: 10,
        reference: 'Al-Bukhari 4:95'
      }
    ]
  },
  {
    id: 'evening',
    title: 'Evening Athkar',
    titleArabic: 'أذكار المساء',
    icon: 'weather-night-partly-cloudy',
    color: '#6B5B95',
    athkar: [
      {
        id: 'evening_1',
        arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'We have entered the evening and with it all the dominion which belongs to Allah. Praise is to Allah. None has the right to be worshipped but Allah alone, Who has no partner. To Allah belongs the dominion, and to Him is the praise, and He is Able to do all things.',
        transliteration: 'Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadir',
        count: 1,
        reference: 'Muslim 4:2088'
      },
      {
        id: 'evening_2',
        arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
        translation: 'O Allah, by You we enter the evening and by You we enter the morning, by You we live and by You we die, and to You is the final return.',
        transliteration: 'Allahumma bika amsayna, wabika asbahna, wabika nahya, wabika namutu, wa ilaykal-masir',
        count: 1,
        reference: 'At-Tirmidhi 5:466'
      },
      {
        id: 'evening_3',
        arabic: 'أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ، حَنِيفًا مُسْلِمًا، وَمَا كَانَ مِنَ الْمُشْرِكِينَ',
        translation: 'We have entered the evening upon the natural religion of Islam, the word of sincere devotion, the religion of our Prophet Muhammad (peace be upon him), and the faith of our father Ibrahim, who was upright and a Muslim, and was not of those who associate others with Allah.',
        transliteration: 'Amsayna \'ala fitratil-Islam, wa \'ala kalimatil-ikhlas, wa \'ala dini nabiyyina Muhammad, wa \'ala millati abina Ibrahim, hanifan musliman, wama kana minal-mushrikin',
        count: 1,
        reference: 'Ahmad 3:406, 407'
      }
    ]
  },
  {
    id: 'sleep',
    title: 'Before Sleep',
    titleArabic: 'أذكار النوم',
    icon: 'bed-outline',
    color: '#4A5568',
    athkar: [
      {
        id: 'sleep_1',
        arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
        translation: 'In Your name, O Allah, I die and I live.',
        transliteration: 'Bismika Allahumma amutu wa ahya',
        count: 1,
        reference: 'Al-Bukhari 7:71'
      },
      {
        id: 'sleep_2',
        arabic: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ',
        translation: 'O Allah, You have created my soul and You take it back. Unto You is its death and its life. If You give it life then protect it, and if You cause it to die then forgive it. O Allah, I ask You for well-being.',
        transliteration: 'Allahumma innaka khalaqta nafsi wa anta tawaffaha, laka mamatuha wa mahyaha, in ahyaytaha fahfazha, wa in amattaha faghfir laha. Allahumma inni as\'alukal-\'afiyah',
        count: 1,
        reference: 'Muslim 4:2083'
      },
      {
        id: 'sleep_3',
        arabic: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
        translation: 'O Allah, protect me from Your punishment on the Day You resurrect Your slaves.',
        transliteration: 'Allahumma qini \'adhabaka yawma tab\'athu \'ibadak',
        count: 3,
        reference: 'Abu Dawud 4:311'
      },
      {
        id: 'sleep_4',
        arabic: 'سُبْحَانَ اللَّهِ',
        translation: 'Glory is to Allah.',
        transliteration: 'Subhanallah',
        count: 33,
        reference: 'Al-Bukhari, Muslim'
      },
      {
        id: 'sleep_5',
        arabic: 'الْحَمْدُ لِلَّهِ',
        translation: 'Praise is to Allah.',
        transliteration: 'Alhamdulillah',
        count: 33,
        reference: 'Al-Bukhari, Muslim'
      },
      {
        id: 'sleep_6',
        arabic: 'اللَّهُ أَكْبَرُ',
        translation: 'Allah is the Greatest.',
        transliteration: 'Allahu Akbar',
        count: 34,
        reference: 'Al-Bukhari, Muslim'
      }
    ]
  },
  {
    id: 'prayer',
    title: 'After Prayer',
    titleArabic: 'أذكار بعد الصلاة',
    icon: 'weather-night',
    color: '#48BB78',
    athkar: [
      {
        id: 'prayer_1',
        arabic: 'أَسْتَغْفِرُ اللَّهَ',
        translation: 'I seek the forgiveness of Allah.',
        transliteration: 'Astaghfirullah',
        count: 3,
        reference: 'Muslim 1:414'
      },
      {
        id: 'prayer_2',
        arabic: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        translation: 'O Allah, You are Peace and from You comes peace. Blessed are You, O Owner of majesty and honor.',
        transliteration: 'Allahumma antas-salam, wa minkas-salam, tabarakta ya dhal-jalali wal-ikram',
        count: 1,
        reference: 'Muslim 1:414'
      },
      {
        id: 'prayer_3',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        translation: 'None has the right to be worshipped but Allah alone, Who has no partner. To Him belongs the dominion and to Him belongs all praise, and He is Able to do all things.',
        transliteration: 'La ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadir',
        count: 1,
        reference: 'Muslim 1:415'
      },
      {
        id: 'prayer_4',
        arabic: 'سُبْحَانَ اللَّهِ',
        translation: 'Glory is to Allah.',
        transliteration: 'Subhanallah',
        count: 33,
        reference: 'Muslim 1:418'
      },
      {
        id: 'prayer_5',
        arabic: 'الْحَمْدُ لِلَّهِ',
        translation: 'Praise is to Allah.',
        transliteration: 'Alhamdulillah',
        count: 33,
        reference: 'Muslim 1:418'
      },
      {
        id: 'prayer_6',
        arabic: 'اللَّهُ أَكْبَرُ',
        translation: 'Allah is the Greatest.',
        transliteration: 'Allahu Akbar',
        count: 34,
        reference: 'Muslim 1:418'
      }
    ]
  },
  {
    id: 'travel',
    title: 'Travel Dua',
    titleArabic: 'دعاء السفر',
    icon: 'airplane',
    color: '#4299E1',
    athkar: [
      {
        id: 'travel_1',
        arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
        translation: 'Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning.',
        transliteration: 'Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun',
        count: 1,
        reference: 'Abu Dawud 3:34, At-Tirmidhi 5:501'
      },
      {
        id: 'travel_2',
        arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ',
        translation: 'O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You. O Allah, lighten this journey for us and make its distance easy for us.',
        transliteration: 'Allahumma inna nas\'aluka fi safarina hadhal-birra wat-taqwa, wa minal-\'amali ma tarda. Allahumma hawwin \'alayna safarana hadha, watwi \'anna bu\'dah',
        count: 1,
        reference: 'Muslim 2:978'
      }
    ]
  },
  {
    id: 'general',
    title: 'General Athkar',
    titleArabic: 'أذكار عامة',
    icon: 'octagram-outline',
    color: '#D4AF37',
    athkar: [
      {
        id: 'general_1',
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
        translation: 'There is no deity worthy of worship except Allah.',
        transliteration: 'La ilaha illallah',
        count: 1,
        reference: 'Various'
      },
      {
        id: 'general_2',
        arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
        translation: 'Glory is to Allah and praise is to Him. Glory is to Allah, the Most Great.',
        transliteration: 'Subhanallahi wa bihamdihi, subhanallahil-\'Azim',
        count: 1,
        reference: 'Al-Bukhari 7:168, Muslim 4:2072'
      },
      {
        id: 'general_3',
        arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
        translation: 'There is no power and no strength except with Allah.',
        transliteration: 'La hawla wa la quwwata illa billah',
        count: 1,
        reference: 'Al-Bukhari, Muslim'
      },
      {
        id: 'general_4',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
        translation: 'Allah is sufficient for me. There is no deity worthy of worship except Him. In Him I place my trust, and He is the Lord of the Mighty Throne.',
        transliteration: 'Hasbiyallahu la ilaha illa huwa, \'alayhi tawakkaltu, wa huwa rabbul-\'arshil-\'azim',
        count: 7,
        reference: 'Abu Dawud 4:321'
      }
    ]
  }
];

export const dailyDuas = [
  {
    id: 'dua_1',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    translation: 'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.',
    transliteration: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhaban-nar',
    reference: 'Quran 2:201'
  },
  {
    id: 'dua_2',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    translation: 'My Lord, expand for me my breast and ease for me my task.',
    transliteration: 'Rabbi ishrah li sadri wa yassir li amri',
    reference: 'Quran 20:25-26'
  },
  {
    id: 'dua_3',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ',
    translation: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
    transliteration: 'Rabbana la tuzigh quloobana ba\'da idh hadaytana wa hab lana min ladunka rahmah, innaka antal-Wahhab',
    reference: 'Quran 3:8'
  }
];

export const hadithOfTheDay = [
  {
    id: 'hadith_1',
    arabic: 'مَنْ قَالَ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ',
    translation: 'Whoever says: "Glory is to Allah and praise is to Him" one hundred times a day, his sins will be forgiven even if they are like the foam of the sea.',
    transliteration: 'Man qala: Subhanallahi wa bihamdihi, fi yawmin mi\'ata marratin, huttat khatayahu wa in kanat mithla zabadil-bahr',
    reference: 'Al-Bukhari 7:168, Muslim 4:2071'
  },
  {
    id: 'hadith_2',
    arabic: 'الدُّعَاءُ هُوَ الْعِبَادَةُ',
    translation: 'Supplication is worship.',
    transliteration: 'Ad-du\'a\'u huwal-\'ibadah',
    reference: 'At-Tirmidhi, Abu Dawud'
  },
  {
    id: 'hadith_3',
    arabic: 'مَنْ قَالَ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، فِي يَوْمٍ مِائَةَ مَرَّةٍ، كَانَتْ لَهُ عَدْلَ عَشْرِ رِقَابٍ',
    translation: 'Whoever says: "None has the right to be worshipped but Allah alone, Who has no partner. To Him belongs the dominion and to Him belongs all praise, and He is Able to do all things" one hundred times a day, it will be for him an equivalent of freeing ten slaves.',
    transliteration: 'Man qala la ilaha illallahu wahdahu la sharika lah, lahul-mulku walahul-hamd, wahuwa \'ala kulli shay\'in qadir, fi yawmin mi\'ata marratin, kanat lahu \'adla \'ashri riqab',
    reference: 'Al-Bukhari 4:95, Muslim 4:2071'
  }
];
