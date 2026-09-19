import type { ChapterContent } from "./types";

export const chapter01: ChapterContent = {
  id: 1,
  revision: 8,
  title: { ms: "Sapaan", en: "Greetings", es: "Saludos" },

  pages: [
    // -------------------------
    // Page 1: comic-style greeting sections
    // -------------------------
    {
      id: "p1-khabar",
      kind: "intro",
      sections: [
        {
          kind: "comic",
          id: "khabar",
          title: {
            ms: "Pertanyaan khabar",
            en: "Asking how someone is",
            es: "Preguntar cómo está alguien",
          },
          iconSlot: {
            label: { ms: "HELLO", en: "HELLO", es: "HOLA" },
            variant: "hello",
            imageSrc: "/assets/chapters/ch1/ch1_greeting.webp",
            imageAlt: {
              ms: "Ikon bersalaman untuk sapaan",
              en: "Handshake icon for greetings",
              es: "Icono de apreton de manos para saludos",
            },
          },
          panels: [
            {
              kind: "conversation",
              id: "khabar-1",
              imageSrc: "/assets/chapters/ch1/ch1_s1_khabar.webp",
              imageAlt: {
                ms: "Komik Apa khabar dan Khabar baik",
                en: "Comic panel for Apa khabar and Khabar baik",
                es: "Panel de comic para Apa khabar y Khabar baik",
              },
              bubbles: [
                {
                  id: "apa-khabar",
                  side: "left",
                  text: { ms: "Apa khabar?", en: "How are you?", es: "¿Cómo estás?" },
                },
                {
                  id: "khabar-baik",
                  side: "right",
                  text: { ms: "Khabar baik.", en: "I’m good.", es: "Estoy bien." },
                },
              ],
            },
            {
              kind: "conversation",
              id: "khabar-2",
              imageSrc: "/assets/chapters/ch1/ch1_s1_sihat.webp",
              imageAlt: {
                ms: "Komik Sihat dan Sihat",
                en: "Comic panel for Sihat and Sihat",
                es: "Panel de comic para Sihat y Sihat",
              },
              bubbles: [
                {
                  id: "sihat-q",
                  side: "left",
                  text: { ms: "Sihat?", en: "Are you well?", es: "¿Estás bien?" },
                },
                {
                  id: "sihat-a",
                  side: "right",
                  text: { ms: "Sihat.", en: "I’m well.", es: "Estoy bien." },
                },
              ],
            },
          ],
        },

        {
          kind: "comic",
          id: "berpisah",
          title: {
            ms: "Sapaan apabila berpisah",
            en: "When you are leaving",
            es: "Cuando te despides",
          },
          iconSlot: {
            label: { ms: "BYE", en: "BYE", es: "ADIOS" },
            variant: "bye",
            imageSrc: "/assets/chapters/ch1/ch1_goodbye.webp",
            imageAlt: {
              ms: "Ikon tangan melambai untuk perpisahan",
              en: "Waving hand icon for goodbyes",
              es: "Icono de mano saludando para despedidas",
            },
          },
          panels: [
            {
              kind: "phrase",
              id: "saya-pergi-dulu",
              imageSrc: "/assets/chapters/ch1/ch1_s2_pergiDulu.webp",
              imageAlt: {
                ms: "Komik Saya pergi dulu",
                en: "Comic panel for Saya pergi dulu",
                es: "Panel de comic para Saya pergi dulu",
              },
              phrase: { ms: "Saya pergi dulu", en: "I’ll go first / I’m heading off", es: "Ya me voy / Me retiro" },
              hint: { ms: "Gunakan ketika mahu beredar.", en: "Use this when you are leaving.", es: "Úsalo cuando te vas." },
            },
            {
              kind: "phrase",
              id: "jumpa-lagi",
              imageSrc: "/assets/chapters/ch1/ch1_s2_jumpaLagi.webp",
              imageAlt: {
                ms: "Komik Jumpa lagi",
                en: "Comic panel for Jumpa lagi",
                es: "Panel de comic para Jumpa lagi",
              },
              phrase: { ms: "Jumpa lagi", en: "See you again", es: "Hasta luego" },
              hint: {
                ms: "Gunakan jika akan berjumpa lagi.",
                en: "Use this when you expect to meet again.",
                es: "Úsalo cuando esperas volver a encontrarte con esa persona.",
              },
            },
          ],
        },

        {
          kind: "comic",
          id: "penghargaan",
          title: {
            ms: "Ucapan penghargaan",
            en: "Polite appreciation",
            es: "Agradecimiento",
          },
          iconSlot: {
            label: { ms: "THANKS", en: "THANKS", es: "GRACIAS" },
            variant: "thanks",
            imageSrc: "/assets/chapters/ch1/ch1_thankYou.webp",
            imageAlt: {
              ms: "Ikon hati untuk penghargaan",
              en: "Heart icon for appreciation",
              es: "Icono de corazon para agradecimiento",
            },
          },
          panels: [
            {
              kind: "conversation",
              id: "terima-kasih-sama-sama",
              imageSrc: "/assets/chapters/ch1/ch1_s3_terimaKasih.webp",
              imageAlt: {
                ms: "Komik Terima kasih dan Sama-sama",
                en: "Comic panel for Terima kasih and Sama-sama",
                es: "Panel de comic para Terima kasih y Sama-sama",
              },
              bubbles: [
                {
                  id: "terima-kasih",
                  side: "left",
                  text: { ms: "Terima kasih", en: "Thank you", es: "Gracias" },
                },
                {
                  id: "sama-sama",
                  side: "right",
                  text: { ms: "Sama-sama", en: "You’re welcome", es: "De nada" },
                },
              ],
            },
          ],
        },
      ],
    },

    // -------------------------
    // Page 2: pronouns for one person and groups
    // -------------------------
    {
      id: "p2-pronouns",
      kind: "pronounCards",
      title: {
        ms: "Kata ganti nama",
        en: "Pronouns",
        es: "Pronombres",
      },
      helper: {
        ms: "Seorang untuk satu orang. Lebih daripada seorang untuk kumpulan orang.",
        en: "Use these words for one person or for a group of people.",
        es: "Usa estas palabras para una persona o para un grupo de personas.",
      },
      sections: [
        {
          id: "seorang",
          label: {
            ms: "Seorang",
            en: "One person",
            es: "Una persona",
          },
          iconSrc: "/assets/chapters/ch1/ch1_seorang.webp",
          iconAlt: {
            ms: "Ikon seorang",
            en: "One person icon",
            es: "Icono de una persona",
          },
          cards: [
            {
              id: "saya-aku",
              title: {
                ms: "Saya",
                en: "Saya",
                es: "Saya",
              },
              description: {
                ms: "untuk diri sendiri",
                en: "for yourself",
                es: "para uno mismo",
              },
              imageSrc: "/assets/chapters/ch1/ch1_saya.webp",
              imageAlt: {
                ms: "Komik Saya",
                en: "Comic for Saya",
                es: "Cómic para Saya",
              },
              info: {
                ms: "Saya Faris.",
                en: "Saya Faris.",
                es: "Saya Faris.",
              },
              translation: {
                en: "I am Faris.",
                es: "Soy Faris.",
              },
            },
            {
              id: "awak-kau-anda",
              title: {
                ms: "Awak",
                en: "Awak",
                es: "Awak",
              },
              description: {
                ms: "untuk orang yang diajak bercakap",
                en: "for the person you are speaking to",
                es: "para la persona con quien hablas",
              },
              imageSrc: "/assets/chapters/ch1/ch1_awak.webp",
              imageAlt: {
                ms: "Komik Awak",
                en: "Comic for Awak",
                es: "Cómic para Awak",
              },
              info: {
                ms: "Awak sihat?",
                en: "Awak sihat?",
                es: "Awak sihat?",
              },
              translation: {
                en: "Are you well?",
                es: "¿Estás bien?",
              },
            },
            {
              id: "dia-beliau",
              title: {
                ms: "Dia",
                en: "Dia",
                es: "Dia",
              },
              description: {
                ms: "untuk seorang orang lain; boleh lelaki atau perempuan",
                en: "for one other person; it can mean he or she",
                es: "para otra persona; puede significar él o ella",
              },
              imageSrc: "/assets/chapters/ch1/ch1_dia.webp",
              imageAlt: {
                ms: "Komik Dia",
                en: "Comic for Dia",
                es: "Cómic para Dia",
              },
              info: {
                ms: "Dia kawan saya.",
                en: "Dia kawan saya.",
                es: "Dia kawan saya.",
              },
              translation: {
                en: "He or she is my friend.",
                es: "Es mi amigo o amiga.",
              },
            },
          ],
        },
        {
          id: "ramai",
          label: {
            ms: "Lebih daripada seorang",
            en: "A group of people",
            es: "Un grupo de personas",
          },
          iconSrc: "/assets/chapters/ch1/ch1_ramai.webp",
          iconAlt: {
            ms: "Ikon ramai orang",
            en: "Group of people icon",
            es: "Icono de un grupo de personas",
          },
          cards: [
            {
              id: "kita",
              title: {
                ms: "Kita",
                en: "Kita",
                es: "Kita",
              },
              description: {
                ms: "saya + awak / kamu semua; awak termasuk",
                en: "the speaker + the listener(s); the listener is included",
                es: "quien habla + quien escucha; quien escucha está incluido",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kita.webp",
              imageAlt: {
                ms: "Komik Kita",
                en: "Comic for Kita",
                es: "Cómic para Kita",
              },
              info: {
                ms: "Kita pergi sekarang.",
                en: "Kita pergi sekarang.",
                es: "Kita pergi sekarang.",
              },
              translation: {
                en: "We're going now.",
                es: "Vamos ahora.",
              },
            },
            {
              id: "kami",
              title: {
                ms: "Kami",
                en: "Kami",
                es: "Kami",
              },
              description: {
                ms: "saya + orang lain; awak tidak termasuk",
                en: "the speaker + other people; the listener is not included",
                es: "quien habla + otras personas; quien escucha no está incluido",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kami.webp",
              imageAlt: {
                ms: "Komik Kami",
                en: "Comic for Kami",
                es: "Cómic para Kami",
              },
              info: {
                ms: "Kami pergi sekarang.",
                en: "Kami pergi sekarang.",
                es: "Kami pergi sekarang.",
              },
              translation: {
                en: "We're going now.",
                es: "Vamos ahora.",
              },
            },
            {
              id: "kamu-semua",
              title: {
                ms: "Kamu semua",
                en: "Kamu semua",
                es: "Kamu semua",
              },
              description: {
                ms: "untuk kumpulan orang yang diajak bercakap",
                en: "for a group of people you are speaking to",
                es: "para un grupo de personas con quienes hablas",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kamu.webp",
              imageAlt: {
                ms: "Komik Kamu semua",
                en: "Comic for Kamu semua",
                es: "Cómic para Kamu semua",
              },
              info: {
                ms: "Kamu semua faham?",
                en: "Kamu semua faham?",
                es: "Kamu semua faham?",
              },
              translation: {
                en: "Do all of you understand?",
                es: "¿Todos entienden?",
              },
            },
            {
              id: "mereka",
              title: {
                ms: "Mereka",
                en: "Mereka",
                es: "Mereka",
              },
              description: {
                ms: "untuk kumpulan orang lain",
                en: "for a group of other people",
                es: "para un grupo de otras personas",
              },
              imageSrc: "/assets/chapters/ch1/ch1_mereka.webp",
              imageAlt: {
                ms: "Komik Mereka",
                en: "Comic for Mereka",
                es: "Cómic para Mereka",
              },
              info: {
                ms: "Mereka di sekolah.",
                en: "Mereka di sekolah.",
                es: "Mereka di sekolah.",
              },
              translation: {
                en: "They are at school.",
                es: "Están en la escuela.",
              },
            },
          ],
        },
      ],
    },

    {
  id: "p3-situasi-1-1",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 1.1: Bertegur sapa dengan orang yang lebih tua",
    en: "Situation 1.1: Greeting an older person",
    es: "Situación 1.1: Saludar a una persona mayor",
  },
  context: {
    ms: "Latar tempat: Di sebuah kedai runcit",
    en: "Setting: At a small grocery shop",
    es: "Lugar: En una pequeña tienda de comestibles",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "ayub",
      name: { ms: "Pak Cik Ayub", en: "Uncle Ayub", es: "Señor Ayub" },
    },
  ],
  messages: [
    {
      id: "m1",
      from: "me",
      text: {
        ms: "Selamat pagi, Pak Cik Ayub.",
        en: "Good morning, Uncle Ayub.",
        es: "Buenos días, señor Ayub.",
      },
    },
    {
      id: "m2",
      from: "ayub",
      text: {
        ms: "Selamat pagi, {currentUsername}.",
        en: "Good morning, {currentUsername}.",
        es: "Buenos días, {currentUsername}.",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Apa khabar?",
        en: "How are you?",
        es: "¿Cómo está?",
      },
    },
    {
      id: "m4",
      from: "ayub",
      text: {
        ms: "Khabar baik. Awak pula?",
        en: "I’m good. And you?",
        es: "Estoy bien. ¿Y tú?",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Khabar baik juga.",
        en: "I'm good too.",
        es: "Yo también estoy bien.",
      },
    },
    {
      id: "m6",
      from: "ayub",
      text: {
        ms: "Bagus.",
        en: "That's good.",
        es: "Qué bien.",
      },
    },
    {
      id: "m7",
      from: "me",
      text: {
        ms: "Saya pergi dulu.",
        en: "I’m heading off.",
        es: "Ya me voy.",
      },
    },
    {
      id: "m8",
      from: "ayub",
      text: {
        ms: "Baik. Jumpa lagi.",
        en: "Alright. See you again.",
        es: "Muy bien. Hasta luego.",
      },
    },
  ],
},

    {
  id: "p-next-chat-muthu",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 1.2: Berkenalan dengan rakan baharu",
    en: "Situation 1.2: Meeting a new friend",
    es: "Situación 1.2: Conocer a un nuevo amigo",
  },
  context: {
    ms: "Latar tempat: Di universiti",
    en: "Setting: At the university",
    es: "Lugar: En la universidad",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "muthu",
      name: { ms: "Muthu", en: "Muthu", es: "Muthu" },
    },
    {
      id: "aina",
      name: { ms: "Aina", en: "Aina", es: "Aina" },
    },
  ],
  messages: [
    { id: "m1", from: "me", text: { ms: "Hai. Saya {currentUsername}.", en: "Hi. I’m {currentUsername}.", es: "Hola. Soy {currentUsername}." } },
    { id: "m2", from: "muthu", text: { ms: "Hai. Awak {currentUsername}?", en: "Hi. Are you {currentUsername}?", es: "Hola. ¿Eres {currentUsername}?" } },
    { id: "m3", from: "me", text: { ms: "Ya. Awak Muthu?", en: "Yes. Are you Muthu?", es: "Sí. ¿Eres Muthu?" } },
    { id: "m4", from: "muthu", text: { ms: "Ya, saya Muthu. Dia kawan saya, Aina.", en: "Yes, I'm Muthu. She is my friend, Aina.", es: "Sí, soy Muthu. Ella es mi amiga, Aina." } },
    { id: "m5", from: "aina", text: { ms: "Hai, {currentUsername}.", en: "Hi, {currentUsername}.", es: "Hola, {currentUsername}." } },
    { id: "m6", from: "me", text: { ms: "Hai, Aina.", en: "Hi, Aina.", es: "Hola, Aina." } },
    { id: "m7", from: "muthu", text: { ms: "Kita pergi sekarang?", en: "Shall we go now?", es: "¿Vamos ahora?" } },
    { id: "m8", from: "me", text: { ms: "Ya, kita pergi sekarang.", en: "Yes, we're going now.", es: "Sí, vamos ahora." } },
  ],
},

    {
    id: "p-latihan-pronoun",
    kind: "dragfill",
    title: { ms: "Latihan 1: Kata ganti nama", en: "Exercise 1: Pronouns", es: "Ejercicio 1: Pronombres" },
    instructions: {
      ms: "Seret kata ganti nama yang sesuai ke tempat kosong.",
      en: "Drag the pronoun that fits each blank.",
      es: "Arrastra el pronombre que corresponde a cada espacio.",
    },
    options: [
      { id: "pronoun-saya", ms: "Saya", en: "I", es: "Yo" },
      { id: "pronoun-awak", ms: "Awak", en: "you", es: "tú" },
      { id: "pronoun-dia", ms: "Dia", en: "he / she", es: "él / ella" },
      { id: "pronoun-kita", ms: "Kita", en: "we (including you)", es: "nosotros/as (incluyéndote)" },
      { id: "pronoun-kami", ms: "Kami", en: "we (not including you)", es: "nosotros/as (sin incluirte)" },
      { id: "pronoun-kamu-semua", ms: "Kamu semua", en: "all of you", es: "todos ustedes" },
      { id: "pronoun-mereka", ms: "Mereka", en: "they", es: "ellos / ellas" },
    ],
    items: [
      {
        id: "pronoun-1",
        n: 1,
        q: { kind: "text", text: { ms: "Bercakap tentang diri sendiri", en: "Talking about yourself", es: "Hablando de ti" } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " Farah.", en: " Farah.", es: " Farah." }, correctOptionId: "pronoun-saya" },
      },
      {
        id: "pronoun-2",
        n: 2,
        q: { kind: "text", text: { ms: "Bercakap kepada Muthu", en: "Talking to Muthu", es: "Hablando con Muthu" } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " sihat, Muthu?", en: " well, Muthu?", es: " bien, Muthu?" }, correctOptionId: "pronoun-awak" },
      },
      {
        id: "pronoun-3",
        n: 3,
        q: { kind: "text", text: { ms: "Aina kawan saya.", en: "Aina is my friend.", es: "Aina es mi amiga." } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " kawan saya.", en: " is my friend.", es: " es mi amiga." }, correctOptionId: "pronoun-dia" },
      },
      {
        id: "pronoun-4",
        n: 4,
        q: { kind: "text", text: { ms: "Saya dan awak pergi sekarang.", en: "You and I are going now.", es: "Tú y yo vamos ahora." } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " pergi sekarang.", en: " are going now.", es: " vamos ahora." }, correctOptionId: "pronoun-kita" },
      },
      {
        id: "pronoun-5",
        n: 5,
        q: { kind: "text", text: { ms: "Saya dan Aina pergi sekarang. Awak tunggu di sini.", en: "Aina and I are going now. You are waiting here.", es: "Aina y yo vamos ahora. Tú esperas aquí." } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " pergi sekarang.", en: " are going now.", es: " vamos ahora." }, correctOptionId: "pronoun-kami" },
      },
      {
        id: "pronoun-6",
        n: 6,
        q: { kind: "text", text: { ms: "Cikgu Aina bercakap kepada tiga pelajar.", en: "Teacher Aina is speaking to three students.", es: "La profesora Aina habla con tres estudiantes." } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " faham?", en: " understand?", es: " entienden?" }, correctOptionId: "pronoun-kamu-semua" },
      },
      {
        id: "pronoun-7",
        n: 7,
        q: { kind: "text", text: { ms: "Muthu dan Aina di universiti.", en: "Muthu and Aina are at the university.", es: "Muthu y Aina están en la universidad." } },
        a: { kind: "blank", before: { ms: "", en: "", es: "" }, after: { ms: " di universiti.", en: " are at the university.", es: " están en la universidad." }, correctOptionId: "pronoun-mereka" },
      },
    ],
    },

    {
  id: "p-latihan-1",
  kind: "dragfill",
    title: { ms: "Latihan 2: Sapaan", en: "Exercise 2: Greetings", es: "Ejercicio 2: Saludos" },
    instructions: {
        ms: "Seret kad jawapan ke tempat kosong yang betul.",
        en: "Drag the answer cards into the correct blanks.",
        es: "Arrastra las tarjetas de respuesta al espacio correcto.",
    },
    options: [
        { id: "selamat-pagi", ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
        { id: "khabar-baik", ms: "Khabar baik", en: "doing well", es: "bien" },
        { id: "saya", ms: "Saya", en: "I am", es: "Soy" },
        { id: "sihat", ms: "sihat", en: "well", es: "bien" },
        { id: "sama-sama", ms: "Sama-sama", en: "You’re welcome", es: "De nada" },
    ],
    items: [
        {
        id: "lat1-q1",
        n: 1,
        q: {
            kind: "blank",
            before: { ms: "", en: "", es: "" },
            after: { ms: ", Cikgu Aina.", en: ", Teacher Aina.", es: ", Profesora Aina." },
            correctOptionId: "selamat-pagi",
        },
        a: { kind: "text", text: { ms: "Selamat pagi, Cikgu Aina.", en: "Good morning, Teacher Aina.", es: "Buenos días, profesora Aina." } },
        },
        {
        id: "lat1-q2",
        n: 2,
        q: { kind: "text", text: { ms: "Apa khabar, Aina?", en: "How are you, Aina?", es: "¿Cómo estás, Aina?" } },
        a: {
            kind: "blank",
            before: { ms: "", en: "", es: "" },
            after: { ms: ", terima kasih.", en: ", thank you.", es: ", gracias." },
            correctOptionId: "khabar-baik",
        },
        },
        {
        id: "lat1-q3",
        n: 3,
        q: {
            kind: "blank",
            before: { ms: "", en: "", es: "" },
            after: { ms: " Mariam.", en: " Mariam.", es: " Mariam." },
            correctOptionId: "saya",
        },
        a: { kind: "text", text: { ms: "Saya Aina.", en: "I’m Aina.", es: "Soy Aina." } },
        },
        {
        id: "lat1-q4",
        n: 4,
        q: {
            kind: "blank",
            before: { ms: "Awak ", en: "Are you ", es: "¿Estás " },
            after: { ms: " hari ini?", en: " today?", es: " hoy?" },
            correctOptionId: "sihat",
        },
        a: { kind: "text", text: { ms: "Ya, saya sihat.", en: "Yes, I am well.", es: "Sí, estoy bien." } },
        },
        {
        id: "lat1-q5",
        n: 5,
        q: {
            kind: "text",
            text: { ms: "Terima kasih.", en: "Thank you.", es: "Gracias." },
        },
        a: {
            kind: "blank",
            before: { ms: "", en: "", es: "" },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "sama-sama",
        },
        },
    ],
    },

    {
  id: "p-latihan-3",
  kind: "tick",
  title: { ms: "Latihan 3: Sapaan dan perpisahan", en: "Exercise 3: Greetings and goodbyes", es: "Ejercicio 3: Saludos y despedidas" },
  instructions: {
    ms: "Tandakan (✓) ayat yang sesuai untuk menyapa atau berpisah.",
    en: "Tick (✓) the sentences suitable for greeting or saying goodbye.",
    es: "Marca (✓) las frases adecuadas para saludar o despedirse.",
  },
  items: [
  {
    id: "l3-1",
    correct: true,
    text: { ms: "Hai. Apa khabar?", en: "Hi. How are you?", es: "Hola. ¿Cómo estás?" },
    why: {
      ms: "Ini kata sapaan yang sesuai: bermula dengan ‘Hai’ dan bertanya khabar.",
      en: "This is a proper greeting: it starts with ‘Hi’ and asks how someone is.",
      es: "Es un saludo adecuado: empieza con ‘Hola’ y pregunta cómo está la persona.",
    },
  },
  {
    id: "l3-2",
    correct: false,
    text: { ms: "Dia kawan saya.", en: "He or she is my friend.", es: "Es mi amigo o amiga." },
    why: {
      ms: "Ayat ini memperkenalkan orang lain, bukan sapaan atau perpisahan.",
      en: "This introduces another person; it is not a greeting or goodbye.",
      es: "Esta frase presenta a otra persona; no es un saludo ni una despedida.",
    },
  },
  {
    id: "l3-3",
    correct: true,
    text: {
      ms: "Selamat pagi. Apa khabar?",
      en: "Good morning. How are you?",
      es: "Buenos días. ¿Cómo estás?",
    },
    why: {
      ms: "‘Selamat pagi’ dan ‘Apa khabar?’ sesuai digunakan ketika menyapa.",
      en: "‘Good morning’ and ‘How are you?’ are suitable greeting phrases.",
      es: "‘Buenos días’ y ‘¿Cómo estás?’ son frases adecuadas para saludar.",
    },
  },
  {
    id: "l3-4",
    correct: true,
    text: {
      ms: "Hai. Saya Mariam.",
      en: "Hi. I’m Mariam.",
      es: "Hola. Soy Mariam.",
    },
    why: {
      ms: "Ini sapaan ringkas yang diikuti dengan perkenalan diri.",
      en: "This is a short greeting followed by a simple introduction.",
      es: "Es un saludo breve seguido de una presentación sencilla.",
    },
  },
  {
    id: "l3-5",
    correct: true,
    text: { ms: "Awak sihat?", en: "Are you well?", es: "¿Estás bien?" },
    why: {
      ms: "Soalan ini digunakan untuk bertanya khabar/kesihatan, sesuai dalam sapaan.",
      en: "This is used to ask about someone’s wellbeing, which fits greeting language.",
      es: "Se usa para preguntar por el estado de salud, apropiado en un saludo.",
    },
  },
  {
    id: "l3-6",
    correct: false,
    text: {
      ms: "Saya Mariam.",
      en: "I’m Mariam.",
      es: "Soy Mariam.",
    },
    why: {
      ms: "Ayat ini memperkenalkan diri tetapi tidak menyapa atau berpisah.",
      en: "This introduces the speaker but does not greet or say goodbye.",
      es: "Esta frase presenta a la persona, pero no saluda ni se despide.",
    },
  },
  {
    id: "l3-7",
    correct: false,
    text: { ms: "Terima kasih.", en: "Thank you.", es: "Gracias." },
    why: {
      ms: "Ini ungkapan penghargaan, bukan sapaan atau perpisahan.",
      en: "This expresses appreciation; it is not a greeting or goodbye.",
      es: "Esta frase expresa agradecimiento; no es un saludo ni una despedida.",
    },
  },
  {
    id: "l3-8",
    correct: false,
    text: { ms: "Khabar baik.", en: "I’m good.", es: "Estoy bien." },
    why: {
      ms: "Ini jawapan kepada pertanyaan khabar, bukan sapaan atau perpisahan.",
      en: "This answers a wellbeing question; it is not a greeting or goodbye.",
      es: "Esta frase responde a una pregunta sobre el estado de ánimo; no es un saludo ni una despedida.",
    },
  },
  {
    id: "l3-9",
    correct: true,
    text: { ms: "Saya pergi dulu. Jumpa lagi.", en: "I’m heading off. See you again.", es: "Ya me voy. Hasta luego." },
    why: {
      ms: "Ini ungkapan yang sesuai apabila berpisah.",
      en: "These phrases are suitable when saying goodbye.",
      es: "Estas frases son adecuadas para despedirse.",
    },
  },
  {
    id: "l3-10",
    correct: false,
    text: { ms: "Sama-sama.", en: "You’re welcome.", es: "De nada." },
    why: {
      ms: "Ini jawapan kepada ‘Terima kasih’, bukan sapaan atau perpisahan.",
      en: "This answers ‘Thank you’; it is not a greeting or goodbye.",
      es: "Esta frase responde a ‘Gracias’; no es un saludo ni una despedida.",
    },
  },
  ],
},

  ],
};
