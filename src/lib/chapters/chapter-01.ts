import type { ChapterContent } from "./types";

export const chapter01: ChapterContent = {
  id: 1,
  revision: 6,
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
        ms: "Seorang ialah satu orang. Ramai ialah lebih daripada satu orang.",
        en: "Seorang means one person. Ramai means more than one person.",
        es: "Seorang significa una persona. Ramai significa más de una persona.",
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
                es: "para ti",
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
                ms: "untuk orang lain",
                en: "for talking about another person",
                es: "para hablar de otra persona",
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
                en: "This person is my friend.",
                es: "Esta persona es mi amiga.",
              },
            },
          ],
        },
        {
          id: "ramai",
          label: {
            ms: "Ramai",
            en: "More than one person",
            es: "Más de una persona",
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
                ms: "saya + awak / kamu semua",
                en: "me + you / all of you",
                es: "yo + tú / ustedes",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kita.webp",
              imageAlt: {
                ms: "Komik Kita",
                en: "Comic for Kita",
                es: "Cómic para Kita",
              },
              info: {
                ms: "Kita digunakan apabila orang yang mendengar termasuk dalam kumpulan.",
                en: "Use kita when the listener is included in the group.",
                es: "Usa kita cuando quien escucha está incluido en el grupo.",
              },
              translation: {
                en: "We/us, including you.",
                es: "Nosotros/as, incluyéndote.",
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
                ms: "saya + orang lain, bukan awak",
                en: "me + other people, not you",
                es: "yo + otras personas, no tú",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kami.webp",
              imageAlt: {
                ms: "Komik Kami",
                en: "Comic for Kami",
                es: "Cómic para Kami",
              },
              info: {
                ms: "Kami digunakan apabila orang yang mendengar tidak termasuk dalam kumpulan.",
                en: "Use kami when the listener is not included in the group.",
                es: "Usa kami cuando quien escucha no está incluido en el grupo.",
              },
              translation: {
                en: "We/us, not including you.",
                es: "Nosotros/as, sin incluirte.",
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
                ms: "awak + orang lain",
                en: "you + other people",
                es: "tú + otras personas",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kamu.webp",
              imageAlt: {
                ms: "Komik Kamu semua",
                en: "Comic for Kamu semua",
                es: "Cómic para Kamu semua",
              },
              info: {
                ms: "Kamu semua sihat?",
                en: "Kamu semua sihat?",
                es: "Kamu semua sihat?",
              },
              translation: {
                en: "Are all of you well?",
                es: "¿Están todos bien?",
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
                ms: "orang lain",
                en: "other people",
                es: "otras personas",
              },
              imageSrc: "/assets/chapters/ch1/ch1_mereka.webp",
              imageAlt: {
                ms: "Komik Mereka",
                en: "Comic for Mereka",
                es: "Cómic para Mereka",
              },
              info: {
                ms: "Mereka kawan saya.",
                en: "Mereka kawan saya.",
                es: "Mereka kawan saya.",
              },
              translation: {
                en: "They are my friends.",
                es: "Son mis amigos.",
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
        ms: "Khabar baik, terima kasih.",
        en: "I’m good, thank you.",
        es: "Estoy bien, gracias.",
      },
    },
    {
      id: "m6",
      from: "ayub",
      text: {
        ms: "Sama-sama.",
        en: "You’re welcome.",
        es: "De nada.",
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
      id: "ayub",
      name: { ms: "Muthu", en: "Muthu", es: "Muthu" },
    },
  ],
  messages: [
    { id: "m1", from: "me", text: { ms: "Hai. Saya {currentUsername}.", en: "Hi. I’m {currentUsername}.", es: "Hola. Soy {currentUsername}." } },
    { id: "m2", from: "ayub", text: { ms: "Hai, {currentUsername}. Saya Muthu.", en: "Hi, {currentUsername}. I’m Muthu.", es: "Hola, {currentUsername}. Soy Muthu." } },
    { id: "m3", from: "me", text: { ms: "Apa khabar, Muthu?", en: "How are you, Muthu?", es: "¿Cómo estás, Muthu?" } },
    { id: "m4", from: "ayub", text: { ms: "Khabar baik. Awak?", en: "I’m good. And you?", es: "Estoy bien. ¿Y tú?" } },
    { id: "m5", from: "me", text: { ms: "Khabar baik, terima kasih.", en: "I’m good, thank you.", es: "Estoy bien, gracias." } },
    { id: "m6", from: "ayub", text: { ms: "Sama-sama.", en: "You’re welcome.", es: "De nada." } },
    { id: "m7", from: "me", text: { ms: "Jumpa lagi, Muthu.", en: "See you again, Muthu.", es: "Hasta luego, Muthu." } },
    { id: "m8", from: "ayub", text: { ms: "Jumpa lagi, {currentUsername}.", en: "See you again, {currentUsername}.", es: "Hasta luego, {currentUsername}." } },
  ],
},

    {
    id: "p-latihan-1",
    kind: "dragfill",
    title: { ms: "Latihan 1", en: "Exercise 1", es: "Ejercicio 1" },
    instructions: {
        ms: "Seret kad jawapan ke tempat kosong yang betul.",
        en: "Drag the answer cards into the correct blanks.",
        es: "Arrastra las tarjetas de respuesta al espacio correcto.",
    },
    options: [
        { id: "selamat-pagi", ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
        { id: "khabar-baik", ms: "khabar baik", en: "doing well", es: "bien" },
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
        a: { kind: "text", text: { ms: "Selamat pagi, Faris.", en: "Good morning, Faris.", es: "Buenos días, Faris." } },
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
            after: { ms: " Faris.", en: " Faris.", es: " Faris." },
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
  title: { ms: "Latihan 2", en: "Exercise 2", es: "Ejercicio 2" },
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
    text: { ms: "Dia kawan saya.", en: "He is my friend.", es: "Él es mi amigo." },
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
      ms: "Saya Faris.",
      en: "I’m Faris.",
      es: "Soy Faris.",
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
