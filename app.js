/* ══════════════════════════════════════════════════════════════════════
   51Talk Studio — app.js
   Saudi Arabia Edition — Ultra-Modern Reactive Logic & Zero-Blank PDF
══════════════════════════════════════════════════════════════════════ */

"use strict";

// ──────────────────────────────────────────────────────────────────────
// 1. DATA TAXONOMY & DEFINITIONS
// ──────────────────────────────────────────────────────────────────────

const LEVELS_TAXONOMY = [
  { id: -1, label: 'Level S', cefr: 'Pre-A1', name: 'Starter', units: 4 },
  { id:  0, label: 'Level 0', cefr: 'Pre-A1', name: 'Pre-Found.', units: 4 },
  { id:  1, label: 'Level 1', cefr: 'A1.1',   name: 'Beginner', units: 6 },
  { id:  2, label: 'Level 2', cefr: 'A1.2',   name: 'Elementary', units: 6 },
  { id:  3, label: 'Level 3', cefr: 'A2.1',   name: 'Pre-Inter.', units: 8 },
  { id:  4, label: 'Level 4', cefr: 'A2.2',   name: 'Intermediate', units: 8 },
  { id:  5, label: 'Level 5', cefr: 'B1.1',   name: 'Upper-Int.', units: 8 },
  { id:  6, label: 'Level 6', cefr: 'B1.2',   name: 'B1 Plus', units: 8 },
  { id:  7, label: 'Level 7', cefr: 'B2.1',   name: 'Advanced', units: 8 },
  { id:  8, label: 'Level 8', cefr: 'B2.2',   name: 'Upper-Adv.', units: 8 },
  { id:  9, label: 'Level 9', cefr: 'C1',     name: 'Proficiency', units: 8 }
];

const CURRICULA_DATABASE = {
  'curr-core': {
    icon: '🌍',
    title: 'المنهج الأساسي (51Talk ME / Oxford CEJ)',
    title_en: 'Core Curriculum (51Talk ME / Oxford CEJ)',
    short: 'Core Curriculum (Oxford)',
    short_en: 'Core Oxford Curriculum',
    desc: 'منهج أكسفورد المصمم حصرياً للشرق الأوسط بنظام حلقة 8 حصص لكل وحدة (L1-L8) يغطي المفردات والتراكيب والمحادثة والصوتيات والقراءة مع المراجعة الكبرى Carnival.',
    desc_en: 'Proprietary Oxford curriculum tailored for the Middle East with an 8-lesson closed unit loop (L1-L8) integrating vocabulary, dialogue, phonics, reading, and Carnival Review.',
    badge: 'العمود الفقري',
    badge_en: 'Core Backbone'
  },
  'curr-nce': {
    icon: '📖',
    title: 'New Concept English (NCE)',
    title_en: 'New Concept English (NCE Academic Series)',
    short: 'NCE Academic',
    short_en: 'NCE Academic Series',
    desc: 'السلسلة البريطانية الأكثر شهرة عالمياً للتمكن من البناء اللغوي الرصين، القراءة التحليلية المعمقة، والاستعداد للامتحانات التنافسية المتقدمة.',
    desc_en: 'World-renowned British academic series focused on syntactic mastery, rigorous textual analysis, and preparation for competitive school examinations.',
    badge: 'تفوق أكاديمي',
    badge_en: 'Academic Excellence'
  },
  'curr-phonics': {
    icon: '🔤',
    title: 'الصوتيات المتقدمة (Phonics & Early Reading)',
    title_en: 'Advanced Phonics & Independent Decoding',
    short: 'Phonics & Decoding',
    short_en: 'Phonics & Early Reading',
    desc: 'تدريب صوتي يربط بين نطق الحروف وتهجئتها باستقلالية تامة، مما يمكّن الطفل من نطق وقراءة أي كلمة إنجليزية جديدة فور رؤيتها.',
    desc_en: 'Systematic phonemic awareness training that connects graphemes to phonemes, empowering students to decode and read unfamiliar words independently.',
    badge: 'أساس القراءة',
    badge_en: 'Reading Foundation'
  },
  'curr-oral': {
    icon: '🗣️',
    title: 'المحادثة والطلاقة الشفهية (Practical Oral & Free Talk)',
    title_en: 'Oral Fluency & Spontaneous Free Talk',
    short: 'Oral & Free Talk',
    short_en: 'Oral & Spontaneous Speech',
    desc: 'جلسات نقاش حرة في مواقف واقعية من الحياة اليومية لكسر حاجز الخوف وتنمية الثقة التعبيرية الفورية والتواصل التلقائي.',
    desc_en: 'Real-world conversational scenarios designed to break communicative hesitation, instill expressive confidence, and foster spontaneous English dialogue.',
    badge: 'كسر الخجل',
    badge_en: 'Confidence Booster'
  },
  'curr-grammar': {
    icon: '⚙️',
    title: 'إتقان القواعد وبناء الجمل (Grammar Mastery)',
    title_en: 'Grammar Mastery & Sentence Architecture',
    short: 'Grammar Mastery',
    short_en: 'Functional Grammar',
    desc: 'معالجة أخطاء الأزمنة وترتيب الجملة وبناء تراكيب لغوية صحيحة بطريقة وظيفية ممتعة بعيداً عن أسلوب الحفظ التلقيني الجاف.',
    desc_en: 'Functional grammar and structural drills eliminating tense errors and syntactic misplacement through contextual interactive practice.',
    badge: 'دقة التعبير',
    badge_en: 'Precision & Accuracy'
  },
  'curr-wecan': {
    icon: '🇸🇦',
    title: 'We Can! — دعم المنهج السعودي الرسمي',
    title_en: 'We Can! — Saudi Ministry Curriculum Support',
    short: 'We Can! (KSA)',
    short_en: 'KSA School Alignment',
    desc: 'مواءمة مباشرة لحصص الطالب مع سلسلة "We Can" المعتمدة في وزارة التعليم بالمملكة، لضمان تصدر الطالب لأعلى الدرجات المدرسية.',
    desc_en: 'Direct strategic alignment with the Saudi Ministry of Education English curriculum (We Can series), securing top academic GPA and test scores.',
    badge: 'توافق وزاري',
    badge_en: 'Ministry Aligned'
  },
  'curr-ielts': {
    icon: '🏆',
    title: 'التحضير لاختبار الآيلتس (IELTS Speaking Prep)',
    title_en: 'IELTS Speaking & Academic Exam Prep',
    short: 'IELTS Prep',
    short_en: 'IELTS Speaking',
    desc: 'إعداد مكثف للطلاب الأكبر سناً الراغبين في اجتياز اختبارات الكفاءة اللغوية والحصول على درجات استثنائية للقبول الجامعي والابتعاث.',
    desc_en: 'Intensive interview training for older students targeting high band scores for international university admissions and scholarship programs.',
    badge: 'B1+ فما فوق',
    badge_en: 'B1+ Mastery'
  }
};

const ADDONS_DATABASE = {
  'at-writing': {
    icon: '✍️',
    title: 'كتاب تحسين الكتابة',
    title_en: 'Creative Writing Workbook',
    desc: 'كراسة تفاعلية لتطوير مهارات الإملاء وتركيب الجمل والخط الإنجليزي الأنيق',
    desc_en: 'Interactive workbook for syntax formation, spelling retention, and elegant handwriting.'
  },
  'at-grl': {
    icon: '📖',
    title: 'مكتبة GRL الرقمية',
    title_en: 'GRL Digital Leveled Library',
    desc: 'أكثر من 1,000 قصة تفاعلية مصنفة عالمياً تزيد حصيلة الطفل اللغوية باستمرار',
    desc_en: 'Access to 1,000+ leveled interactive readers expanding lexical vocabulary daily.'
  },
  'at-treasure': {
    icon: '💎',
    title: 'كتاب كنز الكلمات المصور',
    title_en: 'Visual Vocabulary Treasure Book',
    desc: 'معجم بصري ملون يحتوي على أكثر من 500 مفردة أساسية مع تطبيقات سياقية',
    desc_en: 'Full-color illustrated lexicon with 500+ core words and contextual usage models.'
  },
  'at-ai': {
    icon: '🤖',
    title: '36 حصة AI محاكاة تفاعلية',
    title_en: '36 Interactive AI Simulation Lessons',
    desc: 'جلسات تدريب ذكية تمكّن الطفل من التحدث والممارسة مع روبوت 51Talk في أي وقت',
    desc_en: 'On-demand conversational speaking simulations with 51Talk AI bot anytime.'
  },
  'at-report': {
    icon: '📊',
    title: 'تقرير AI الخماسي الدوري',
    title_en: 'Periodic 5-Dimension AI Analytics',
    desc: 'تحليل يقيس 5 أبعاد حيوية: الطلاقة، الثقة، سرعة الاستجابة، التفاعل، والنطق',
    desc_en: 'Bi-weekly benchmark assessing fluency, response speed, interaction, confidence, and pronunciation.'
  },
  'at-cert': {
    icon: '🎓',
    title: 'شهادة إتمام المستوى (CEFR)',
    title_en: 'Official CEFR Completion Certificate',
    desc: 'شهادة رسمية معتمدة دولياً تصدر باسم الطالب عند اجتياز كل مستوى دراسي',
    desc_en: 'Internationally authenticated certificate issued in student name upon level graduation.'
  }
};

const ECOSYSTEM_DATABASE = {
  'eco-podcast': {
    id: 'eco-podcast',
    number: 1,
    title: 'English Podcast',
    title_en: 'English Podcast',
    subtitle: 'يحسن مهارة الاستماع والفهم والنطق',
    subtitle_en: 'Enhances Listening, Comprehension & Pronunciation',
    tagline: 'Listen • Understand • Speak • Grow',
    tagline_en: 'Listen • Understand • Speak • Grow',
    color: '#ec4899',
    icon: '🎧',
    useCases: [
      'الاستماع إلى القصص والمحادثات المشوقة',
      'التعلم العملي من مواقف حياتية حقيقية',
      'تحسين مخارج النطق الصوتي وبناء الثقة بالنفس',
      'محتوى ترفيهي هادف ومناسب لمختلف المراحل العمرية',
      'متاح ومحمول للاستماع في أي مكان وفي أي وقت'
    ],
    useCases_en: [
      'Active listening to engaging stories & dialogues',
      'Authentic contextual learning from real life',
      'Improving pronunciation & building confidence',
      'Fun, age-appropriate educational content',
      'Accessible anywhere, anytime on any device'
    ],
    worldConnection: [
      'تطبيق ما يتعلمه الطفل في المدرسة وتصدر الدرجات',
      'التواصل بثقة كاملة في مواقف الحياة اليومية',
      'بناء صداقات جديدة والتواصل مع الأقران',
      'تنمية استقلالية الطفل وشخصيته الواثقة'
    ],
    worldConnection_en: [
      'Applying lessons directly to school activities',
      'Confident communication in daily life',
      'Building new international friendships',
      'Fostering self-reliance & independence'
    ],
    valueProvided: [
      'تحسين شامل وفوري لمهارات اللغة الإنجليزية',
      'محتوى ممتع وتفاعلي مستخلص من مواقف حقيقية'
    ],
    valueProvided_en: [
      'Comprehensive enhancement of English skills',
      'Engaging interactive content from real-world contexts'
    ]
  },
  'eco-ai': {
    id: 'eco-ai',
    number: 2,
    title: 'AI Conversation Classes',
    title_en: 'AI Conversation Classes',
    subtitle: 'تطوير مهارة التحدث والتواصل في مواقف حقيقية',
    subtitle_en: 'Conversational Fluency & Spoken Dialogue Practice',
    tagline: 'Can I have a pizza, please? • What\'s your name?',
    tagline_en: 'Can I have a pizza, please? • What\'s your name?',
    color: '#0284c7',
    icon: '🤖',
    useCases: [
      'التحدث عن مواضيع ومجالات مختلفة بكل ثقة وأريحية',
      'طرح الأسئلة واستقبال الردود الفورية بشكل طبيعي',
      'التدرب على محاكاة محادثات حية من صميم الحياة اليومية',
      'محتوى ذكي تفاعلي مدعوم بأحدث خوارزميات الذكاء الاصطناعي'
    ],
    useCases_en: [
      'Speaking confidently across diverse topics',
      'Natural question-and-answer interaction',
      'Real-world daily conversational simulations',
      'Interactive adaptive AI-driven content'
    ],
    worldConnection: [
      'التعامل بمرونة مع مواقف حقيقية بسهولة ويسر',
      'التواصل التلقائي في السفر الدولي، المطاعم، والمتاجر',
      'تمكين الطفل من التعبير عن نفسه وأفكاره ومشاعره',
      'بناء جسور صداقة وثيقة مع أصدقاء من ثقافات متعددة'
    ],
    worldConnection_en: [
      'Effortless navigation of real-world scenarios',
      'Confident English for travel, dining & shopping',
      'Expressing personal ideas, opinions & feelings',
      'Connecting with peers from multicultural backgrounds'
    ],
    valueProvided: [
      'تعزيز مهارة التحدث بطلاقة وثقة مطلقة',
      'التواصل السلس وبناء ردود فعل لغوية سريعة'
    ],
    valueProvided_en: [
      'Boosting spoken confidence & courage',
      'Fluent, spontaneous communication across contexts'
    ]
  },
  'eco-iur': {
    id: 'eco-iur',
    number: 3,
    title: 'IUR Recorded Classes for Revision',
    title_en: 'IUR Recorded Classes for Revision',
    subtitle: 'مراجعة وتثبيت المحتوى والمعارف الأساسية',
    subtitle_en: 'Class Recordings for Spaced Review & Retention',
    tagline: 'Review • Practice • Remember • Use',
    tagline_en: 'Review • Practice • Remember • Use',
    color: '#f59e0b',
    icon: '▶️',
    useCases: [
      'مشاهدة الدروس المسجلة بدقة عالية في أي وقت يناسب الطالب',
      'مراجعة وتكرار ما تم تعلمه مراراً وتكراراً لترسيخ الذاكرة',
      'تثبيت المفاهيم والتراكيب والقواعد الأساسية',
      'متاح لجميع الأنشطة والدروس والمحتوى الأكاديمي'
    ],
    useCases_en: [
      'On-demand playback of recorded lessons anytime',
      'Spaced repetition & iterative review',
      'Consolidating core concepts & grammar skills',
      'Universal access across all unit activities'
    ],
    worldConnection: [
      'تطبيق ما تعلمه الطالب في مواقف حياته اليومية المباشرة',
      'استيعاب أسرع وأعلى للأنشطة والواجبات المدرسية',
      'بناء أساس أكاديمي صلب ومتين للمستقبل'
    ],
    worldConnection_en: [
      'Applying acquired knowledge to daily situations',
      'Enhanced performance in school English assignments',
      'Building an unshakeable academic foundation for the future'
    ],
    valueProvided: [
      'مراجعة تعليمية فعالة وممتدة المفعول لمدة طويلة',
      'فهم أعمق للمحتوى وتصحيح التلقائي للأخطاء',
      'دعم مستمر وموثوق لرحلة التعلم في كل مرحلة'
    ],
    valueProvided_en: [
      'Long-term memory retention & effortless recall',
      'Deeper comprehension of complex language patterns',
      'Continuous pedagogical support along the journey'
    ]
  },
  'eco-grl': {
    id: 'eco-grl',
    number: 4,
    title: 'GRL Digital Leveled Library',
    title_en: 'GRL Leveled Digital Library',
    subtitle: 'بيئة تعليمية شاملة للممارسة المستمرة وتنمية الشغف',
    subtitle_en: 'Comprehensive Leveled Reading for Lifelong Literacy',
    tagline: 'Stories • Videos • Games • Activities And More!',
    tagline_en: 'Stories • Videos • Games • Activities And More!',
    color: '#10b981',
    icon: '📚',
    useCases: [
      'مكتبة رقمية كبرى تضم أكثر من 1,000 قصة وكتاب مصنف عالمياً',
      'فيديوهات تعليمية ممتعة وأنشطة تفاعلية مشوقة',
      'ألعاب لغوية هادفة تحفز الاستمرار وحب التعلم',
      'ممارسة مستمرة ويومية للغة الإنجليزية دون ملل'
    ],
    useCases_en: [
      'Massive library of 1,000+ leveled books & readers',
      'Engaging interactive videos & multimedia tasks',
      'Educational gamified challenges',
      'Joyful, habitual daily English practice'
    ],
    worldConnection: [
      'التعرف على ثقافات وشعوب العالم المختلفة وتوسيع الأفق',
      'توسيع المعرفة العامة وزيادة المخزون اللغوي والمفردات',
      'تنمية عادة القراءة الذاتية والشغف بالتعلم المستمر مدى الحياة',
      'بناء مهارات التفكير النقدي والإبداع وحل المشكلات'
    ],
    worldConnection_en: [
      'Discovering diverse global cultures & worldviews',
      'Expanding general knowledge & lexical repertoire',
      'Developing lifelong reading habits & literacy',
      'Nurturing critical thinking & creative expression'
    ],
    valueProvided: [
      'بيئة تعليمية آمنة، محفزة، وشاملة لكل ما يحتاجه الطفل',
      'محتوى متجدد ومتنوع يناسب كافة اهتمامات وميول الطلاب',
      'تنمية متسارعة للمهارات اللغوية والمعرفية الحيوية'
    ],
    valueProvided_en: [
      'Safe, inspiring & holistic educational sanctuary',
      'Diverse content tailored to individual interests',
      'Rapid development of essential linguistic & cognitive abilities'
    ]
  }
};

const CONSULTANCY_PRESETS = {
  starter: {
    name: 'محمد عبدالله الغامدي',
    age: 6,
    school: 'حكومية (Saudi Public)',
    currLvl: -1,
    targetLvl: 2,
    freq: 3,
    curricula: ['curr-core', 'curr-phonics', 'curr-oral'],
    addons: ['at-writing', 'at-grl', 'at-treasure', 'at-ai', 'at-report', 'at-cert'],
    advisorName: 'أ. صابر حسين (Saber Hussien)',
    advisorTitle: 'كبير المستشارين الأكاديميين — 51Talk KSA',
    advisorContact: '+966 50 123 4567',
    notes: 'الطالب في مرحلة التأسيس الأولى. التركيز الكامل على الصوتيات ومخارج الحروف والمفردات البسيطة. يُنصح بجلسات قصيرة منتظمة مع تشجيع الوالدين في التطبيق المنزلي.'
  },
  academic: {
    name: 'عبدالرحمن سعد الزهراني',
    age: 11,
    school: 'حكومية (Saudi Public)',
    currLvl: 1,
    targetLvl: 4,
    freq: 3,
    curricula: ['curr-core', 'curr-nce', 'curr-wecan', 'curr-grammar'],
    addons: ['at-writing', 'at-grl', 'at-treasure', 'at-ai', 'at-report', 'at-cert'],
    advisorName: 'أ. صابر حسين (Saber Hussien)',
    advisorTitle: 'كبير المستشارين الأكاديميين — 51Talk KSA',
    advisorContact: '+966 50 123 4567',
    notes: 'الهدف الاستراتيجي هو التفوق المدرسي التام. التوافق المباشر مع منهج We Can الوزاري مع التوسع عبر NCE يضمن تفوق الطالب في اختبارات مادة الإنجليزي وبناء أساس قوي.'
  },
  fluency: {
    name: 'نورة خالد الشهراني',
    age: 13,
    school: 'أهلية (Private)',
    currLvl: 2,
    targetLvl: 5,
    freq: 4,
    curricula: ['curr-core', 'curr-oral', 'curr-grammar'],
    addons: ['at-grl', 'at-ai', 'at-report', 'at-cert'],
    advisorName: 'أ. سارة المنصور (Sara Al-Mansoor)',
    advisorTitle: 'مستشارة التطوير والطلاقة الشفهية — 51Talk KSA',
    advisorContact: '+966 55 987 6543',
    notes: 'الطالبة تعاني من بعض التردد في التحدث أمام الآخرين. خطة الـ 4 حصص الأسبوعية بالتركيز على الـ Free Talk ستحقق قفزة نوعية في الثقة التعبيرية خلال 90 يوماً.'
  },
  mastery: {
    name: 'فيصل طارق القرشي',
    age: 16,
    school: 'عالمية (International)',
    currLvl: 3,
    targetLvl: 7,
    freq: 5,
    curricula: ['curr-core', 'curr-nce', 'curr-oral', 'curr-grammar', 'curr-ielts'],
    addons: ['at-writing', 'at-grl', 'at-treasure', 'at-ai', 'at-report', 'at-cert'],
    advisorName: 'د. خالد العمري (Dr. Khaled Al-Omari)',
    advisorTitle: 'رئيس وحدة التأهيل الدولي والابتعاث — 51Talk KSA',
    advisorContact: '+966 54 321 0987',
    notes: 'خطة إعداد مكثفة موجهة لاختبار IELTS والقبول بالجامعات المرموقة. التركيز على الكتابة الأكاديمية والطلاقة التنافسية في الحوار وفق معايير B2+ المعتمدة.'
  }
};

// ──────────────────────────────────────────────────────────────────────
// 2. CENTRAL REACTIVE STATE
// ──────────────────────────────────────────────────────────────────────

let state = {
  lang:           'ar', // 'ar' (Arabic 🇸🇦) or 'en' (English 🌐)
  name:           'ريان فهد القحطاني',
  age:            9,
  school:         'حكومية (Saudi Public)',
  currLvl:        -1,
  targetLvl:      3,
  freq:           3,
  theme:          'theme-51talk',
  curricula:      new Set(['curr-core', 'curr-phonics', 'curr-oral']),
  addons:         new Set(['at-writing', 'at-grl', 'at-treasure', 'at-ai', 'at-report', 'at-cert']),
  ecosystem:      new Set(['eco-podcast', 'eco-ai', 'eco-iur', 'eco-grl']),
  showEcoPoster:  false,
  advisorName:    'أ. صابر حسين (Saber Hussien)',
  advisorTitle:   'كبير المستشارين الأكاديميين — 51Talk KSA',
  advisorContact: '+966 50 123 4567',
  notes:          'يُنصح بالتركيز التام على إتمام جلسة التحضير المسبق (Preview) لمدة 5 دقائق قبل كل حصة لكسر حاجز الخوف، وتخصيص 15 دقيقة يومياً للقراءة الممتعة في مكتبة GRL لبناء مخزون لغوي عميق واستثنائي.'
};

// ──────────────────────────────────────────────────────────────────────
// 3. UTILITY FUNCTIONS
// ──────────────────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);

function getLevelObj(id) {
  return LEVELS_TAXONOMY.find(lvl => lvl.id === id);
}

function calculateRoadmapDetails(currId, targetId, freq) {
  if (targetId <= currId) return null;
  const currIndex = LEVELS_TAXONOMY.findIndex(l => l.id === currId);
  const targetIndex = LEVELS_TAXONOMY.findIndex(l => l.id === targetId);
  if (currIndex === -1 || targetIndex === -1 || targetIndex <= currIndex) return null;

  // Exact number of levels traversed
  const numLevels = targetIndex - currIndex;

  // Requirement 1: Each level = 144 additional lessons
  const totalLessons = numLevels * 144;

  // Requirement 4: Expected duration averages 6 to 8 months per level
  const minMonths = numLevels * 6;
  const maxMonths = numLevels * 8;

  // Units: 12 units per level (12 lessons each = 144 lessons per level)
  const totalUnits = numLevels * 12;
  const minWeeks = Math.ceil(totalLessons / (freq || 3));
  const maxWeeks = Math.ceil(minWeeks * 1.15);

  return {
    numLevels,
    totalUnits,
    totalLessons,
    minWeeks,
    maxWeeks,
    minMonths,
    maxMonths
  };
}

function getFormattedDate(lang) {
  if (lang === 'en') {
    return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getReferenceCode() {
  return '51T-SA-' + Math.floor(1000 + Math.random() * 9000);
}

// ──────────────────────────────────────────────────────────────────────
// 4. RENDERING ENGINE (STUDIO & LIVE A4 SHEET)
// ──────────────────────────────────────────────────────────────────────

function renderStudio() {
  const { lang, name, age, school, currLvl, targetLvl, freq, advisorName, advisorTitle, advisorContact, notes } = state;
  const isEn = lang === 'en';

  // 1. TOP METRICS RIBBON
  const currObj = getLevelObj(currLvl);
  const targetObj = getLevelObj(targetLvl);
  const currName = currObj ? (currObj.id === -1 ? 'Level S' : `Level ${currObj.id}`) : '—';
  const targetName = targetObj ? (targetObj.id === -1 ? 'Level S' : `Level ${targetObj.id}`) : '—';
  const targetCefr = targetObj ? `(${targetObj.cefr})` : '';

  $('metric-path').textContent = `${currName} ➔ ${targetName} ${targetCefr}`;

  const stats = calculateRoadmapDetails(currLvl, targetLvl, freq);
  if (stats) {
    if (isEn) {
      $('metric-duration').textContent = `${stats.minMonths} – ${stats.maxMonths} Months (${stats.numLevels} Levels × 6-8 mos)`;
      $('metric-lessons').textContent = `${stats.totalLessons} Lessons (+144 / level)`;
      $('calc-badge-text').textContent = `Certified Model Plan: ${stats.minMonths} – ${stats.maxMonths} Months (${stats.totalLessons} Lessons at 144 lessons/level)`;
    } else {
      $('metric-duration').textContent = `${stats.minMonths} – ${stats.maxMonths} شهراً (${stats.numLevels} مستويات × 6-8 شهور)`;
      $('metric-lessons').textContent = `${stats.totalLessons} حصة (+144 لكل مستوى)`;
      $('calc-badge-text').textContent = `خطة نموذجية معتمدة: ${stats.minMonths} – ${stats.maxMonths} شهراً (${stats.totalLessons} حصة بمعدل 144 حصة إضافية لكل مستوى)`;
    }
  } else {
    $('metric-duration').textContent = isEn ? 'Please set levels' : 'يرجى ضبط المستويات';
    $('metric-lessons').textContent = '—';
    $('calc-badge-text').textContent = isEn ? 'Please select a target level higher than current' : 'يرجى اختيار مستوى مستهدف أعلى من المستوى الحالي';
  }

  $('metric-advisor').textContent = advisorName || (isEn ? 'Certified Advisor' : 'المستشار المعتمد');

  // 2. DOCUMENT HEADER & METAS
  $('doc-render-date').textContent = `📅 ${getFormattedDate(lang)}`;
  $('doc-render-ref').textContent = isEn ? `REF: ${getReferenceCode()}` : `رقم الاعتماد: ${getReferenceCode()}`;

  // 3. STUDENT PROFILE HERO
  if ($('doc-avatar-char')) {
    const firstChar = (name && name.trim().length > 0) ? name.trim()[0] : '؟';
    $('doc-avatar-char').textContent = firstChar;
  }
  $('doc-student-name').textContent = name || (isEn ? 'Our Star Student' : 'طالبنا المتميز');
  $('doc-student-age').textContent = isEn ? `Age: ${age} Years` : `العمر: ${age} سنوات`;
  $('doc-student-school').textContent = isEn ? `School: ${school}` : `المدرسة: ${school}`;
  $('doc-student-freq').textContent = isEn ? `Recommended: ${freq} Lessons / Week` : `الوتيرة الموصى بها: ${freq} حصص / أسبوع`;

  $('doc-from-level').querySelector('.node-lvl-text').textContent = currName;
  $('doc-to-level').querySelector('.node-lvl-text').textContent = targetName;

  // Arrow from smaller to larger!
  const journeyArrow = $('doc-journey-arrow');
  if (journeyArrow) {
    // In RTL: Start on right, Target on left -> Arrow points LEFT (◀)
    // In LTR: Start on left, Target on right -> Arrow points RIGHT (▶)
    journeyArrow.textContent = isEn ? '▶' : '◀';
  }

  if (stats) {
    $('doc-eta-text').textContent = isEn 
      ? `Estimated Duration: ${stats.minMonths} – ${stats.maxMonths} Months (${stats.totalLessons} Lessons)`
      : `المدة المتوقعة: ${stats.minMonths} – ${stats.maxMonths} شهراً تقريباً (${stats.totalLessons} حصة)`;
  } else {
    $('doc-eta-text').textContent = isEn ? 'Duration: Please define target milestone' : 'المدة: يرجى تحديد الهدف الأكاديمي';
  }

  // 4. ROADMAP MATRIX
  renderRoadmapMatrix();

  // 5. CURRICULA LIST (MODULAR 3D CARDS)
  renderCurriculaList();

  // 6. ADDONS GRID (MODULAR 3D CARDS)
  renderAddonsGrid();

  // 7. 360° SELF-LEARNING ECOSYSTEM (4 PILLARS)
  renderEcosystemCards();

  // 7. ADVISOR OFFICIAL DIRECTIVES & ENDORSEMENT
  $('doc-notes-text').textContent = notes || (isEn ? 'No additional directives recorded.' : 'لا توجد توجيهات إضافية مسجلة.');
  $('doc-advisor-name-val').textContent = advisorName || (isEn ? 'Academic Advisor' : 'المستشار الأكاديمي');
  $('doc-advisor-title-val').textContent = advisorTitle || '51Talk KSA';
  $('doc-advisor-contact-val').textContent = advisorContact 
    ? (isEn ? `📱 Direct Contact: ${advisorContact}` : `📱 للتواصل المباشر: ${advisorContact}`) 
    : (isEn ? '📱 Contact: via official 51Talk platform' : '📱 للتواصل: عبر منصة 51Talk الرسمية');

  // Extract English/Latin part of advisor name for cursive signature if available
  const latinMatch = advisorName.match(/[a-zA-Z\s]+/);
  $('doc-sig-cursive').textContent = latinMatch ? latinMatch[0].trim() : advisorName;
  $('doc-sig-date').textContent = isEn ? `Officially Certified: ${getFormattedDate('en')}` : `معتمد رسمياً: ${getFormattedDate('ar')}`;
}

function renderRoadmapMatrix() {
  const container = $('doc-roadmap-container');
  container.innerHTML = '';

  const { currLvl, targetLvl, lang } = state;
  const isEn = lang === 'en';

  LEVELS_TAXONOMY.forEach(lvl => {
    const node = document.createElement('div');
    node.className = 'doc-rm-node';

    const isCurrent = lvl.id === currLvl;
    const isTarget  = lvl.id === targetLvl;
    const isBetween = lvl.id > currLvl && lvl.id < targetLvl;
    const isPast    = lvl.id < currLvl;
    const isFuture  = lvl.id > targetLvl;

    if (isCurrent) node.classList.add('current');
    else if (isTarget) node.classList.add('target');
    else if (isBetween) node.classList.add('upcoming');
    else if (isPast) node.classList.add('past');
    else if (isFuture) node.classList.add('outside');

    let badgeHtml = '';
    if (isCurrent) badgeHtml = `<span class="rm-active-pill">${isEn ? '📍 Start' : '📍 البداية'}</span>`;
    if (isTarget)  badgeHtml = `<span class="rm-active-pill" style="background:#7c3aed;">${isEn ? '🎯 Target' : '🎯 الهدف'}</span>`;

    const lvlDisplay = lvl.id === -1 ? 'S' : lvl.id;

    node.innerHTML = `
      ${badgeHtml}
      <div class="rm-node-lvl">L${lvlDisplay}</div>
      <div class="rm-node-cefr">${lvl.cefr}</div>
      <div class="rm-node-label">${lvl.name}</div>
    `;

    container.appendChild(node);
  });
}

function renderCurriculaList() {
  const container = $('doc-curricula-container');
  container.innerHTML = '';
  const isEn = state.lang === 'en';

  if (state.curricula.size === 0) {
    container.innerHTML = `<p style="color:#64748b;font-size:0.75rem;padding:8px;">${isEn ? 'No curricula selected yet.' : 'لم يتم اختيار أي منهج دراسي بعد.'}</p>`;
    return;
  }

  state.curricula.forEach(currKey => {
    const item = CURRICULA_DATABASE[currKey];
    if (!item) return;

    const title = isEn && item.title_en ? item.title_en : item.title;
    const desc = isEn && item.desc_en ? item.desc_en : item.desc;
    const badge = isEn && item.badge_en ? item.badge_en : item.badge;

    const card = document.createElement('div');
    card.className = 'doc-curr-card-3d';
    card.innerHTML = `
      <div class="card-3d-head">
        <div class="curr-icon-3d-box">${item.icon}</div>
        <div class="curr-title-box">
          <h4 class="curr-title-text">${title}</h4>
          <span class="curr-badge-pill">${badge}</span>
        </div>
      </div>
      <p class="curr-desc-text">${desc}</p>
      <div class="curr-features-tags">
        <span class="curr-feat-tag">✓ ${isEn ? '1-on-1 LIVE Teacher' : 'معلم دولي معتمد 1-on-1'}</span>
        <span class="curr-feat-tag">✓ ${isEn ? 'CEFR Level Alignment' : 'مواءمة الإطار الأوروبي CEFR'}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderAddonsGrid() {
  const container = $('doc-addons-container');
  container.innerHTML = '';
  const isEn = state.lang === 'en';

  if (state.addons.size === 0) {
    container.innerHTML = `<p style="color:#64748b;font-size:0.75rem;grid-column:1/-1;padding:8px;">${isEn ? 'No supplementary addons included.' : 'لم يتم تضمين أي ميزات إضافية.'}</p>`;
    return;
  }

  state.addons.forEach(addonKey => {
    const item = ADDONS_DATABASE[addonKey];
    if (!item) return;

    const title = isEn && item.title_en ? item.title_en : item.title;
    const desc = isEn && item.desc_en ? item.desc_en : item.desc;

    const card = document.createElement('div');
    card.className = 'doc-addon-pill-3d';
    card.innerHTML = `
      <div class="addon-3d-icon-circle">${item.icon}</div>
      <div class="addon-3d-text-wrap">
        <strong class="addon-3d-title">${title}</strong>
        <p class="addon-3d-desc">${desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderEcosystemCards() {
  const container = $('doc-ecosystem-container');
  if (!container) return;
  container.innerHTML = '';
  const isEn = state.lang === 'en';

  if (!state.ecosystem || state.ecosystem.size === 0) {
    container.innerHTML = `<p style="color:#64748b;font-size:0.75rem;grid-column:1/-1;padding:8px;">${isEn ? 'No ecosystem pillars active.' : 'لم يتم تفعيل أي من ركائز المنظومة بعد.'}</p>`;
    return;
  }

  const keys = ['eco-podcast', 'eco-ai', 'eco-iur', 'eco-grl'];
  keys.forEach(key => {
    if (!state.ecosystem.has(key)) return;
    const item = ECOSYSTEM_DATABASE[key];
    if (!item) return;

    const title = isEn && item.title_en ? item.title_en : item.title;
    const subtitle = isEn && item.subtitle_en ? item.subtitle_en : item.subtitle;
    const tagline = isEn && item.tagline_en ? item.tagline_en : item.tagline;
    const useCases = isEn && item.useCases_en ? item.useCases_en : item.useCases;
    const worldConn = isEn && item.worldConnection_en ? item.worldConnection_en : item.worldConnection;
    const valueProv = isEn && item.valueProvided_en ? item.valueProvided_en : item.valueProvided;

    const card = document.createElement('div');
    card.className = `eco-card-3d eco-${key}`;
    card.style.setProperty('--eco-accent', item.color);

    const useCasesList = useCases.map(u => `<li><span class="chk-icon" style="color:${item.color}">✔</span> <span>${u}</span></li>`).join('');
    const worldConnList = worldConn.map(w => `<li><span class="chk-icon" style="color:${item.color}">🌍</span> <span>${w}</span></li>`).join('');
    const valueProvList = valueProv.map(v => `<li><span class="chk-icon" style="color:${item.color}">⭐</span> <span>${v}</span></li>`).join('');

    card.innerHTML = `
      <div class="eco-card-top-header">
        <div class="eco-num-disc" style="background:${item.color};">${item.number}</div>
        <div class="eco-title-wrap">
          <div class="eco-name-row">
            <span class="eco-ico">${item.icon}</span>
            <h4 class="eco-title-txt">${title}</h4>
          </div>
          <p class="eco-sub-txt">${subtitle}</p>
        </div>
      </div>

      <div class="eco-tagline-badge" style="border-color:${item.color}40; background:${item.color}15;">
        <span style="color:${item.color}; font-weight:700;">${tagline}</span>
      </div>

      <div class="eco-blocks-stack">
        <!-- 1. What will they use it for? -->
        <div class="eco-mini-block use-block">
          <div class="mini-block-head">
            <span class="mini-icon">🎧</span>
            <strong>${isEn ? 'How to Use?' : 'ماذا سيستخدمه؟'}</strong>
          </div>
          <ul class="eco-bullets-list">
            ${useCasesList}
          </ul>
        </div>

        <!-- 2. Real world connection -->
        <div class="eco-mini-block world-block">
          <div class="mini-block-head">
            <span class="mini-icon">🌐</span>
            <strong>${isEn ? 'Real-World Connection' : 'كيف يرتبط بالعالم الخارجي؟'}</strong>
          </div>
          <ul class="eco-bullets-list">
            ${worldConnList}
          </ul>
        </div>

        <!-- 3. Value provided -->
        <div class="eco-mini-block value-block">
          <div class="mini-block-head">
            <span class="mini-icon">🏆</span>
            <strong>${isEn ? 'Delivered Value' : 'القيمة التي يقدمها'}</strong>
          </div>
          <ul class="eco-bullets-list">
            ${valueProvList}
          </ul>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function syncEcoCheckbox(input, cardId, ecoKey) {
  const card = $(cardId);
  if (input.checked) {
    if (card) card.classList.add('checked');
    state.ecosystem.add(ecoKey);
  } else {
    if (card) card.classList.remove('checked');
    state.ecosystem.delete(ecoKey);
  }
  renderStudio();
}

function toggleEcoPoster(show) {
  state.showEcoPoster = typeof show === 'boolean' ? show : !state.showEcoPoster;
  const box = $('doc-eco-poster-box');
  if (box) {
    box.style.display = state.showEcoPoster ? 'block' : 'none';
  }
}

function openEcosystemModal() {
  const modal = $('eco-infographic-modal');
  if (modal) modal.classList.add('show');
}

function closeEcosystemModal() {
  const modal = $('eco-infographic-modal');
  if (modal) modal.classList.remove('show');
}

// ──────────────────────────────────────────────────────────────────────
// 5. BILINGUAL LANGUAGE ENGINE (ARABIC / ENGLISH - USER REQUIREMENT 2)
// ──────────────────────────────────────────────────────────────────────

function setLanguage(lang) {
  state.lang = lang;
  const isEn = lang === 'en';

  // 1. Header toggle buttons
  const btnAr = $('btn-lang-ar');
  const btnEn = $('btn-lang-en');
  if (btnAr) btnAr.classList.toggle('active', !isEn);
  if (btnEn) btnEn.classList.toggle('active', isEn);

  // 2. Document direction & font classes
  const doc = $('study-plan-doc');
  if (doc) {
    doc.setAttribute('dir', isEn ? 'ltr' : 'rtl');
    doc.classList.toggle('doc-lang-en', isEn);
    doc.classList.toggle('doc-lang-ar', !isEn);
  }

  // 3. Arrow direction from smaller to larger!
  const journeyArrow = $('doc-journey-arrow');
  if (journeyArrow) {
    journeyArrow.textContent = isEn ? '▶' : '◀';
  }

  // 4. Update texts throughout the document
  updateDocumentLanguageContent(isEn);

  // 5. Re-render dynamic elements
  renderStudio();
}

function updateDocumentLanguageContent(isEn) {
  // Brand Heading
  const mainHeading = document.querySelector('.doc-main-heading');
  if (mainHeading) {
    mainHeading.textContent = isEn 
      ? 'Individual Educational Development Plan' 
      : 'الخطة الدراسية الفردية لتطوير اللغة الإنجليزية';
  }
  const subHeading = document.querySelector('.doc-sub-heading');
  if (subHeading) {
    subHeading.textContent = isEn 
      ? 'Kingdom of Saudi Arabia — CEFR Certified Standards 🇸🇦' 
      : 'Individual Educational Development Plan — Saudi Arabia 🇸🇦';
  }

  // Welcome caption
  const welcomeCap = document.querySelector('.doc-welcome-caption');
  if (welcomeCap) {
    welcomeCap.textContent = isEn 
      ? 'Customized Academic Progression Plan for:' 
      : 'الخطة التعليمية المخصصة للطالب المتميز:';
  }

  // Journey box labels
  if ($('lbl-journey-caption')) $('lbl-journey-caption').textContent = isEn ? 'Academic Progression Path' : 'مسار الارتقاء الأكاديمي';
  if ($('lbl-node-from')) $('lbl-node-from').textContent = isEn ? 'Start' : 'البداية';
  if ($('lbl-node-to')) $('lbl-node-to').textContent = isEn ? 'Target' : 'الهدف';

  // Motivational stamp
  const stampTitle = document.querySelector('.stamp-ribbon-text');
  if (stampTitle) stampTitle.textContent = isEn ? 'Future Leader 2030' : 'نخبة المستقبل 2030';

  // Motivational banner
  if ($('mot-banner-title')) {
    $('mot-banner-title').textContent = isEn 
      ? '🚀 The Journey to Global Fluency and Excellence Starts Today!' 
      : '🚀 الانطلاق نحو الطلاقة والتميز الدولي يبدأ من اليوم!';
  }
  if ($('mot-banner-p')) {
    $('mot-banner-p').textContent = isEn 
      ? 'With 1-on-1 certified international teachers, AI simulations, and continuous guidance, our students achieve fluency with confidence.' 
      : 'بالتكامل بين المعلم الأجنبي المتخصص، والذكاء الاصطناعي والمتابعة الأكاديمية المستمرة، سيصل الطالب لمستهدفه بثقة استثنائية.';
  }

  // Section 4: Roadmap Framed Header
  if ($('sec-title-roadmap')) $('sec-title-roadmap').textContent = isEn ? 'Academic Advancement Roadmap — CEFR Framework' : 'خارطة طريق التطور الأكاديمي — مستويات 51Talk المعتمدة';
  if ($('sec-sub-roadmap')) $('sec-sub-roadmap').textContent = isEn ? 'Progressive mastery of listening, speaking, reading, and phonemic decoding' : 'تدرج تصاعدي مدروس يضمن إتقان مهارات التحدث والاستماع وفق معايير CEFR';
  if ($('sec-tag-roadmap')) $('sec-tag-roadmap').textContent = isEn ? 'CEFR Framework' : 'معايير CEFR الدولية';

  // Section 5: Curricula Framed Header
  if ($('sec-title-curricula')) $('sec-title-curricula').textContent = isEn ? 'Approved Curricula & Educational Programs' : 'المناهج التعليمية المعتمدة في هذه الخطة الدراسية';
  if ($('sec-sub-curricula')) $('sec-sub-curricula').textContent = isEn ? 'World-class interactive pedagogical tracks designed for real-world fluency' : 'سلاسل تعليمية تفاعلية عالمية موجهة للتطبيق العملي وبناء الطلاقة';
  if ($('sec-tag-curricula')) $('sec-tag-curricula').textContent = isEn ? 'Accredited Programs' : 'مناهج معتمدة دولياً';

  // Section 6: Unit Loop Framed Header & Cells
  if ($('sec-title-unitloop')) $('sec-title-unitloop').textContent = isEn ? '8-Lesson Closed Unit Learning Cycle (Unit Loop)' : 'نظام الحلقة التعليمية المغلقة لكل وحدة دراسية (Unit Loop — 8 حصص)';
  if ($('sec-sub-unitloop')) $('sec-sub-unitloop').textContent = isEn ? 'Oxford cyclical methodology ensuring 100% mastery and retention' : 'منهجية أكسفورد التكرارية لضمان ترسيخ المفردات والقواعد بنسبة 100%';
  if ($('sec-tag-unitloop')) $('sec-tag-unitloop').textContent = isEn ? 'Oxford CEJ System' : 'Oxford CEJ System';

  if ($('loop-t-l1l2')) $('loop-t-l1l2').textContent = isEn ? 'Core Vocabulary & Structures' : 'المفردات والتراكيب اللغوية';
  if ($('loop-d-l1l2')) $('loop-d-l1l2').textContent = isEn ? 'Key lexical acquisition and foundational sentence pattern building' : 'اكتساب الكلمات المحورية وبناء القوالب اللغوية الأولى';

  if ($('loop-t-l3')) $('loop-t-l3').textContent = isEn ? 'Applied Dialogue & Conversation' : 'حوار ومحادثة تطبيقية (Dialogue)';
  if ($('loop-d-l3')) $('loop-d-l3').textContent = isEn ? 'Active review and conversational application of L1+L2 with teacher' : 'مراجعة وتوظيف L1+L2 في حوار حي مع المعلم';

  if ($('loop-t-l4')) $('loop-t-l4').textContent = isEn ? 'Phonics & Pronunciation' : 'الصوتيات ومخارج الحروف (Phonics)';
  if ($('loop-d-l4')) $('loop-d-l4').textContent = isEn ? 'Phonemic blending, segmenting, and independent word decoding' : 'تفكيك ودمج الأصوات والتهجئة السليمة للكلمات';

  if ($('loop-t-l5l6')) $('loop-t-l5l6').textContent = isEn ? 'Extended Lexicon & Advanced Structures' : 'توسيع المفردات والتراكيب (Structures)';
  if ($('loop-d-l5l6')) $('loop-d-l5l6').textContent = isEn ? 'Deeper linguistic repertoire and sophisticated grammatical patterns' : 'حزمة إضافية متقدمة لرفع الثراء والعمق اللغوي';

  if ($('loop-t-l7')) $('loop-t-l7').textContent = isEn ? 'Reading & Textual Comprehension' : 'القراءة والاستيعاب (Reading)';
  if ($('loop-d-l7')) $('loop-d-l7').textContent = isEn ? 'Integrated passage reading synthesizing L5+L6 for reading comprehension' : 'قراءة نص شامل يدمج L5+L6 وتطوير الفهم القرائي';

  if ($('loop-t-l8')) $('loop-t-l8').textContent = isEn ? 'Carnival Review & Mastery Festival 🎉' : 'المهرجان الكرنفالي للمراجعة الشاملة (Carnival Review 🎉)';
  if ($('loop-d-l8')) $('loop-d-l8').textContent = isEn ? 'Joyful gamified review synthesizing L1-L7 with 100% mastery checkpoint' : 'حصة تفاعلية مبهجة تراجع كل ما تعلمه الطالب من L1 إلى L7 مع ألعاب ومسابقات وقياس إتقان بنسبة 100%';

  // Section 7: 25-Min Cycle Framed Header & Steps
  if ($('sec-title-cycle')) $('sec-title-cycle').textContent = isEn ? '25-Minute High-Impact Lesson Protocol (1-on-1 LIVE)' : 'دورة كل حصة دراسية مع 51Talk (25 دقيقة تفاعلية كاملة)';
  if ($('sec-sub-cycle')) $('sec-sub-cycle').textContent = isEn ? '3-stage active learning protocol dedicating 100% of teacher time to student' : 'بروتوكول تدريب ثلاثي المراحل يركز 100% من وقت المعلم الأجنبي على الطالب وحده';
  if ($('sec-tag-cycle')) $('sec-tag-cycle').textContent = isEn ? '1-on-1 LIVE Protocol' : '1-on-1 LIVE Protocol';

  if ($('stage-t-1')) $('stage-t-1').textContent = isEn ? 'Smart Preview (5 Mins)' : 'التحضير المسبق (Preview)';
  if ($('stage-d-1')) $('stage-d-1').textContent = isEn ? '5 mins via mobile app to break hesitation and prime key vocabulary before class.' : '5 دقائق بالعربية عبر التطبيق الذكي لكسر الرهبة والتعرف المسبق على موضوع الحصة ومفرداتها.';

  if ($('stage-t-2')) $('stage-t-2').textContent = isEn ? '1-on-1 LIVE Lesson (25 Mins)' : 'الحصة المباشرة (1-on-1 LIVE)';
  if ($('stage-d-2')) $('stage-d-2').textContent = isEn ? '25 minutes of full 1-on-1 immersion with a certified international teacher.' : '25 دقيقة تفاعلية فردية كاملة مع معلم أجنبي دولي معتمد يركز 100% من وقته على الطالب وحده.';

  if ($('stage-t-3')) $('stage-t-3').textContent = isEn ? 'AI Review & Retention' : 'التعزيز والمراجعة (AI Review)';
  if ($('stage-d-3')) $('stage-d-3').textContent = isEn ? 'Adaptive AI exercises to consolidate learning and leveled reading from GRL.' : 'تمارين تكيفية بالذكاء الاصطناعي لترسيخ ما تعلمه الطالب، مع قراءة قصة موجهة من مكتبة GRL.';

  // Section 8: 360 Ecosystem Framed Header
  if ($('sec-title-ecosystem')) $('sec-title-ecosystem').textContent = isEn ? '360° Comprehensive Self-Learning Ecosystem' : 'منظومة التعلم الذاتي والبيئة التفاعلية الشاملة (360° Learning Ecosystem)';
  if ($('sec-sub-ecosystem')) $('sec-sub-ecosystem').textContent = isEn ? '4 integrated foundational pillars securing daily active practice and global horizons' : '4 ركائز متكاملة تضمن ممارسة يومية مستمرة وتفتح للطفل آفاقاً عالمية رحبة';
  if ($('sec-tag-ecosystem')) $('sec-tag-ecosystem').textContent = isEn ? 'English Opens a Bigger World!' : 'English يفتح لهم عالم أكبر!';
  if ($('lbl-eq-result')) $('lbl-eq-result').textContent = isEn ? '🎯 Confident Kids Speaking English in Real Life!' : '🎯 أطفال واثقين يستخدمون English في حياتهم!';
  if ($('tab-nav-eco')) $('tab-nav-eco').textContent = isEn ? '360° Ecosystem' : 'منظومة التعلم 360°';

  // Section 9: Value-Adds Framed Header
  if ($('sec-title-addons')) $('sec-title-addons').textContent = isEn ? 'Exclusive Complimentary Academic Supplements' : 'المميزات الحصرية والمواد التكميلية المرفقة مع الطالب';
  if ($('sec-sub-addons')) $('sec-sub-addons').textContent = isEn ? 'Comprehensive learning toolkit and AI analytics supporting home practice' : 'حزمة أدوات تعليمية وتقارير ذكاء اصطناعي لدعم نمو مهارات الطفل في المنزل';
  if ($('sec-tag-addons')) $('sec-tag-addons').textContent = isEn ? 'VIP Exclusive Kit' : 'VIP Exclusive Kit';

  // Section 10: Advisor Endorsement Framed Header
  if ($('sec-title-advisor')) $('sec-title-advisor').textContent = isEn ? 'Official Academic Directives & Advisor Endorsement' : 'توجيهات واعتماد المستشار التعليمي المشرف';
  if ($('sec-sub-advisor')) $('sec-sub-advisor').textContent = isEn ? 'Certified strategic guidance tailored for parents to maximize learning outcomes' : 'خطة إستراتيجية معتمدة وموجهة لولي الأمر لضمان تحقيق أعلى عائد تعليمي';
  if ($('sec-tag-advisor')) $('sec-tag-advisor').textContent = isEn ? 'Official Certification' : 'اعتماد أكاديمي رسمي';
}

// ──────────────────────────────────────────────────────────────────────
// 5. THEME SWITCHER LOGIC (USER REQUIREMENT 1)
// ──────────────────────────────────────────────────────────────────────

function changeDocumentTheme(btn, themeName) {
  document.querySelectorAll('.theme-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  const doc = $('study-plan-doc');
  if (doc) {
    // Remove old theme classes
    doc.classList.remove('theme-51talk', 'theme-saudi', 'theme-sunrise', 'theme-oxford');
    doc.classList.add(themeName);
    state.theme = themeName;
  }
}

// ──────────────────────────────────────────────────────────────────────
// 6. EVENT HANDLERS & INTERACTIONS
// ──────────────────────────────────────────────────────────────────────

function switchTab(btn, tabId) {
  document.querySelectorAll('.ctrl-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  const target = $(tabId);
  if (target) target.classList.add('active');
}

function selectSegment(btn, groupId, hiddenInputId) {
  const group = $(groupId);
  if (group) {
    group.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const hiddenInput = $(hiddenInputId);
  if (hiddenInput) {
    hiddenInput.value = btn.dataset.val;
  }
}

function selectLevelNode(type, node) {
  const gridId = type === 'curr' ? 'curr-lvl-grid' : 'target-lvl-grid';
  document.querySelectorAll(`#${gridId} .lvl-card`).forEach(c => {
    c.classList.remove('active');
    c.style.animation = '';
  });
  node.classList.add('active');

  // 3D tactile pop effect
  node.style.animation = 'metallicPop 0.35s ease-out';

  const lvlNum = parseInt(node.dataset.num, 10);
  const lvlObj = getLevelObj(lvlNum);

  if (type === 'curr') {
    state.currLvl = lvlNum;
    $('curr-tag-display').textContent = lvlObj ? `${lvlObj.label} (${lvlObj.name})` : '';
  } else {
    state.targetLvl = lvlNum;
    $('target-tag-display').textContent = lvlObj ? `${lvlObj.label} (${lvlObj.name})` : '';
  }

  renderStudio();
}

function recalcAll() {
  const freqVal = parseInt($('f-freq').value, 10) || 3;
  state.freq = freqVal;
  renderStudio();
}

function toggleCurriculumCard(card) {
  const id = card.dataset.id;
  if (state.curricula.has(id)) {
    state.curricula.delete(id);
    card.classList.remove('checked');
  } else {
    state.curricula.add(id);
    card.classList.add('checked');
  }
  renderStudio();
}

function syncAddonCheckbox(input, cardId, addonKey) {
  const card = $(cardId);
  if (input.checked) {
    state.addons.add(addonKey);
    if (card) card.classList.add('checked');
  } else {
    state.addons.delete(addonKey);
    if (card) card.classList.remove('checked');
  }
  renderStudio();
}

function applyConsultancyPreset(presetKey) {
  const p = CONSULTANCY_PRESETS[presetKey];
  if (!p) return;

  // 1. Text Inputs
  $('f-name').value = p.name;
  $('f-age').value = p.age;
  $('f-advisor-name').value = p.advisorName;
  $('f-advisor-title').value = p.advisorTitle;
  $('f-advisor-contact').value = p.advisorContact;
  $('f-notes').value = p.notes;

  // 2. School Segment
  document.querySelectorAll('#school-group .seg-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.val === p.school);
  });
  $('f-school').value = p.school;

  // 3. Freq Segment
  document.querySelectorAll('#freq-group .seg-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.val, 10) === p.freq);
  });
  $('f-freq').value = String(p.freq);

  // 4. Level grids
  document.querySelectorAll('#curr-lvl-grid .lvl-card').forEach(c => {
    c.classList.toggle('active', parseInt(c.dataset.num, 10) === p.currLvl);
  });
  document.querySelectorAll('#target-lvl-grid .lvl-card').forEach(c => {
    c.classList.toggle('active', parseInt(c.dataset.num, 10) === p.targetLvl);
  });

  const currObj = getLevelObj(p.currLvl);
  const targetObj = getLevelObj(p.targetLvl);
  if (currObj) $('curr-tag-display').textContent = `${currObj.label} (${currObj.name})`;
  if (targetObj) $('target-tag-display').textContent = `${targetObj.label} (${targetObj.name})`;

  // 5. Curricula
  state.curricula = new Set(p.curricula);
  document.querySelectorAll('.curriculum-interactive-card').forEach(c => {
    c.classList.toggle('checked', state.curricula.has(c.dataset.id));
  });

  // 6. Addons
  state.addons = new Set(p.addons);
  document.querySelectorAll('.addon-smart-card').forEach(c => {
    const inp = c.querySelector('input[type="checkbox"]');
    const addonId = c.id.replace('card-', '');
    const isChecked = state.addons.has(addonId);
    if (inp) inp.checked = isChecked;
    c.classList.toggle('checked', isChecked);
  });

  // Merge into state
  Object.assign(state, {
    name:           p.name,
    age:            p.age,
    school:         p.school,
    currLvl:        p.currLvl,
    targetLvl:      p.targetLvl,
    freq:           p.freq,
    advisorName:    p.advisorName,
    advisorTitle:   p.advisorTitle,
    advisorContact: p.advisorContact,
    notes:          p.notes
  });

  // Close modal and render
  $('presets-modal').style.display = 'none';
  renderStudio();
}

function handleModalBackdropClick(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.style.display = 'none';
  }
}

// ──────────────────────────────────────────────────────────────────────
// 7. SHARE MODAL LOGIC (FOR WORK COLLEAGUES - USER REQUIREMENT 3)
// ──────────────────────────────────────────────────────────────────────

function openShareModal() {
  const modal = $('share-modal');
  if (modal) modal.style.display = 'flex';
}

function handleShareModalBackdropClick(e) {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.style.display = 'none';
  }
}

function copyLinkValue(linkText) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(linkText).then(() => {
      alert('✅ تم نسخ رابط المنصة! يمكنك الآن إرساله لزملائك في العمل مباشرة.');
    }).catch(() => fallbackCopy(linkText));
  } else {
    fallbackCopy(linkText);
  }
}

// ──────────────────────────────────────────────────────────────────────
// 8. WHATSAPP SUMMARY GENERATOR
// ──────────────────────────────────────────────────────────────────────

function generateWhatsappExecutiveSummary() {
  const stats = calculateRoadmapDetails(state.currLvl, state.targetLvl, state.freq);
  const currObj = getLevelObj(state.currLvl);
  const targetObj = getLevelObj(state.targetLvl);
  const currName = currObj ? (currObj.id === -1 ? 'Level S (Starter)' : `Level ${currObj.id} (${currObj.cefr})`) : '—';
  const targetName = targetObj ? (targetObj.id === -1 ? 'Level S (Starter)' : `Level ${targetObj.id} (${targetObj.cefr})`) : '—';
  const timeDesc = stats ? `${stats.minMonths} – ${stats.maxMonths} شهراً (إجمالي ${stats.totalLessons} حصة — بمعدل 144 حصة و6 إلى 8 أشهر لكل مستوى)` : 'يُحدد لاحقاً';

  const curriculaList = [...state.curricula].map(k => `  ▫️ ${CURRICULA_DATABASE[k]?.short || k}`).join('\n');
  const addonsList = [...state.addons].map(k => `  ✅ ${ADDONS_DATABASE[k]?.title || k}`).join('\n');

  const text = `
🎓 *الخطة الدراسية الفردية لتطوير اللغة الإنجليزية | 51Talk السعودية 🇸🇦*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *اسم الطالب:* ${state.name}
🎂 *العمر:* ${state.age} سنوات
🏫 *المدرسة:* ${state.school}

🎯 *مسار الارتقاء الأكاديمي (معايير CEFR الدولية):*
  🔸 المستوى الحالي: *${currName}*
  🚀 المستوى المستهدف: *${targetName}*
  ⏱️ المدة الزمنية المقدرة: *${timeDesc}*
  📅 وتيرة التدريب الموصى بها: *${state.freq} حصص أسبوعياً*

📚 *المناهج المعتمدة في الخطة:*
${curriculaList}

✨ *المميزات الحصرية المرفقة مجاناً:*
${addonsList}

💡 *توجيهات المستشار الأكاديمي المشرف:*
  «${state.notes}»

━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💼 *المستشار الأكاديمي المعتمد:* ${state.advisorName}
💼 ${state.advisorTitle}
📱 ${state.advisorContact}
🌐 الموقع الرسمي: www.51talk.com | KSA
✨ *في 51Talk نبني مستقبلاً لغوياً استثنائياً لكل طفل سعودي.*
`.trim();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      alert('✅ تم نسخ ملخص الخطة الدراسية بنجاح! يمكنك الآن لصقه مباشرة في محادثة الواتساب.');
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  alert('✅ تم نسخ ملخص الخطة الدراسية بنجاح!');
}

// ──────────────────────────────────────────────────────────────────────
// 9. BULLETPROOF PDF ENGINE (USER REQUIREMENT 2: NEVER BLANK + ZERO GAP)
// ──────────────────────────────────────────────────────────────────────

async function exportPDF() {
  const originalDoc = $('study-plan-doc');
  if (!originalDoc) return;

  const sanitizedName = (state.name || 'study_plan').trim().replace(/[\s\/\\:*?"<>|]+/g, '_');
  const pdfFilename = `خطة_دراسية_51Talk_${sanitizedName}.pdf`;

  const btnHeader = $('btn-pdf');
  const btnToolbar = $('btn-quick-pdf');

  if (btnHeader) btnHeader.innerHTML = '⏳ جارٍ تجهيز وتحميل ملف الـ PDF...';
  if (btnToolbar) btnToolbar.innerHTML = '⏳ جارٍ التجهيز...';

  try {
    // 1. Temporarily ensure smooth positioning for capture
    const originalScrollY = window.scrollY;
    
    // Check if html2canvas and jsPDF are available
    if (typeof html2canvas === 'undefined' || !(window.jspdf || window.jsPDF)) {
      console.warn('html2canvas or jsPDF not loaded, triggering print dialog fallback');
      window.print();
      if (btnHeader) btnHeader.innerHTML = '<span class="btn-icon">📥</span><span>تحميل وثيقة PDF (متطابقة تماماً)</span>';
      if (btnToolbar) btnToolbar.innerHTML = '<span class="tool-icon">📥</span><span>تحميل PDF متساوي الأبعاد</span>';
      return;
    }

    // Ensure all web fonts (Cairo, Outfit) are 100% loaded before rendering canvas
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // 2. Call html2canvas directly with strict Arabic ligature normalization
    const canvas = await html2canvas(originalDoc, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        // Enforce normal letter-spacing across all cloned elements to prevent disconnected Arabic letters
        const docEl = clonedDoc.getElementById('study-plan-doc');
        if (docEl) {
          docEl.style.letterSpacing = 'normal';
          const allElems = docEl.querySelectorAll('*');
          allElems.forEach(el => {
            if (!el.classList.contains('seal-gold-text') && 
                !el.classList.contains('seal-ribbon') && 
                !el.classList.contains('footer-tagline')) {
              el.style.letterSpacing = 'normal';
            }
          });
        }
      }
    });

    console.log('PDF Canvas rendered successfully:', canvas.width, 'x', canvas.height);

    // 3. Convert to high-resolution JPEG
    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    // 4. Proportional dimensions matching exact content height
    const pdfWidthMm = 210;
    const pdfHeightMm = (canvas.height * pdfWidthMm) / canvas.width;

    // 5. Instantiate jsPDF (v2.5.1 umd)
    const JsPdfConstructor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : window.jsPDF;
    const pdf = new JsPdfConstructor({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidthMm, pdfHeightMm]
    });

    // 6. Draw image onto page with zero margin
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');

    // 7. Save file directly
    pdf.save(pdfFilename);

    if (btnHeader) btnHeader.innerHTML = '<span class="btn-icon">📥</span><span>تحميل وثيقة PDF (متطابقة تماماً)</span>';
    if (btnToolbar) btnToolbar.innerHTML = '<span class="tool-icon">📥</span><span>تحميل PDF متساوي الأبعاد</span>';

  } catch (err) {
    console.error('PDF Export Error:', err);
    if (btnHeader) btnHeader.innerHTML = '<span class="btn-icon">📥</span><span>تحميل وثيقة PDF (متطابقة تماماً)</span>';
    if (btnToolbar) btnToolbar.innerHTML = '<span class="tool-icon">📥</span><span>تحميل PDF متساوي الأبعاد</span>';
    // Reliable browser print dialog fallback
    window.print();
  }
}

// ──────────────────────────────────────────────────────────────────────
// 10. EVENT ATTACHMENTS & INITIALIZATION
// ──────────────────────────────────────────────────────────────────────

function attachEventListeners() {
  // Reactive text inputs
  $('f-name').addEventListener('input', e => { state.name = e.target.value; renderStudio(); });
  $('f-age').addEventListener('input', e => { state.age = parseInt(e.target.value, 10) || 0; renderStudio(); });

  $('f-advisor-name').addEventListener('input', e => { state.advisorName = e.target.value; renderStudio(); });
  $('f-advisor-title').addEventListener('input', e => { state.advisorTitle = e.target.value; renderStudio(); });
  $('f-advisor-contact').addEventListener('input', e => { state.advisorContact = e.target.value; renderStudio(); });
  $('f-notes').addEventListener('input', e => { state.notes = e.target.value; renderStudio(); });

  // School segment group
  document.querySelectorAll('#school-group .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.school = btn.dataset.val;
      renderStudio();
    });
  });

  // Action buttons
  $('btn-pdf').addEventListener('click', exportPDF);
  $('btn-whatsapp').addEventListener('click', generateWhatsappExecutiveSummary);
  $('btn-open-presets').addEventListener('click', () => {
    $('presets-modal').style.display = 'flex';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  attachEventListeners();

  // Populate state with initial inputs
  state.name           = $('f-name').value;
  state.age            = parseInt($('f-age').value, 10) || 9;
  state.school         = $('f-school').value;
  state.advisorName    = $('f-advisor-name').value;
  state.advisorTitle   = $('f-advisor-title').value;
  state.advisorContact = $('f-advisor-contact').value;
  state.notes          = $('f-notes').value;

  renderStudio();
});
