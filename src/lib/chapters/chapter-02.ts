import type { ChapterContent } from "./types";

export const chapter02: ChapterContent = {
  id: 2,
  revision: 4,
  title: { ms: "Keluarga", en: "Family", es: "Familia" },

  pages: [
    // -------------------------
    // Page 1: immediate family
    // -------------------------
    {
      id: "p2-asas",
      kind: "family",
      title: {
        ms: "Keluarga terdekat",
        en: "Close family",
        es: "Familia cercana",
      },
      familyImageSrc: "/assets/chapters/ch2/ch2-keluarga.webp",
      familyImageAlt: {
        ms: "Gambar keluarga terdekat",
        en: "Close family portrait",
        es: "Retrato de la familia cercana",
      },
      people: [
        {
          id: "datuk",
          label: { ms: "datuk", en: "grandfather", es: "abuelo" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-datuk.webp",
          imageAlt: {
            ms: "Datuk",
            en: "Grandfather",
            es: "Abuelo",
          },
        },
        {
          id: "nenek",
          label: { ms: "nenek", en: "grandmother", es: "abuela" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-nenek.webp",
          imageAlt: {
            ms: "Nenek",
            en: "Grandmother",
            es: "Abuela",
          },
        },
        {
          id: "bapa",
          label: { ms: "bapa", en: "father", es: "padre" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-bapa.webp",
          imageAlt: {
            ms: "Bapa",
            en: "Father",
            es: "Padre",
          },
          alternativeNames: ["ayah", "papa", "abah", "abi", "bapak"],
        },
        {
          id: "ibu",
          label: { ms: "ibu", en: "mother", es: "madre" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-ibu.webp",
          imageAlt: {
            ms: "Ibu",
            en: "Mother",
            es: "Madre",
          },
          alternativeNames: ["mak", "emak", "mama", "umi"],
        },
        {
          id: "abang",
          label: { ms: "abang", en: "older brother", es: "hermano mayor" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-abang.webp",
          imageAlt: {
            ms: "Abang",
            en: "Older brother",
            es: "Hermano mayor",
          },
        },
        {
          id: "kakak",
          label: { ms: "kakak", en: "older sister", es: "hermana mayor" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-kakak.webp",
          imageAlt: {
            ms: "Kakak",
            en: "Older sister",
            es: "Hermana mayor",
          },
        },
        {
          id: "saya",
          label: { ms: "adik", en: "younger sibling", es: "hermano o hermana menor" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-saya.webp",
          imageAlt: {
            ms: "Adik",
            en: "Younger sibling",
            es: "Hermano o hermana menor",
          },
        },
      ],
    },

    // -------------------------
    // Page 2: Chat — introducing family
    // -------------------------
{
  id: "p5-situasi-2-1",
  kind: "chat",
  youId: "me",
  title: {
        ms: "Situasi 2.1: Menunjukkan gambar keluarga",
        en: "Situation 2.1: Showing a family photo",
        es: "Situación 2.1: Mostrar una foto familiar",
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
      id: "ayub", // keep this id for your UI
      name: { ms: "Muthu", en: "Muthu", es: "Muthu" },
    },
  ],
  messages: [
    {
      id: "s21-m1",
      from: "ayub",
      text: {
        ms: "Hai, {currentUsername}. Ini keluarga awak?",
        en: "Hi, {currentUsername}. Is this your family?",
        es: "Hola, {currentUsername}. ¿Esta es tu familia?",
      },
    },
    {
      id: "s21-m2",
      from: "me",
      text: {
        ms: "Hai, Muthu. Ya, ini keluarga saya.",
        en: "Hi, Muthu. Yes, this is my family.",
        es: "Hola, Muthu. Sí, esta es mi familia.",
      },
    },
    {
      id: "s21-m3",
      from: "ayub",
      text: {
        ms: "Siapa ini?",
        en: "Who are these people?",
        es: "¿Quiénes son?",
      },
    },
    {
      id: "s21-m4",
      from: "me",
      text: {
        ms: "Ini ibu dan bapa saya.",
        en: "These are my mother and father.",
        es: "Son mi madre y mi padre.",
      },
    },
    {
      id: "s21-m5",
      from: "ayub",
      text: {
        ms: "Yang ini abang awak?",
        en: "Is this your older brother?",
        es: "¿Este es tu hermano mayor?",
      },
    },
    {
      id: "s21-m6",
      from: "me",
      text: {
        ms: "Ya, itu abang saya.",
        en: "Yes, that is my older brother.",
        es: "Sí, ese es mi hermano mayor.",
      },
    },
    {
      id: "s21-m7",
      from: "ayub",
      text: {
        ms: "Ini adik awak?",
        en: "Is this your younger sibling?",
        es: "¿Este es tu hermano menor?",
      },
    },
    {
      id: "s21-m8",
      from: "me",
      text: {
        ms: "Ya, ini adik saya.",
        en: "Yes, this is my younger sibling.",
        es: "Sí, este es mi hermano menor.",
      },
    },
  ],
},



    // Situation 2.2: introducing family

{
  id: "p6-situasi-2-2",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 2.2: Memperkenalkan keluarga",
    en: "Situation 2.2: Introducing family",
    es: "Situación 2.2: Presentar a la familia",
  },
  context: {
    ms: "Latar tempat: Di rumah Hassan",
    en: "Setting: At Hassan’s house",
    es: "Lugar: En la casa de Hassan",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "ayub", // keep this id for your UI
      name: { ms: "Hassan", en: "Hassan", es: "Hassan" },
    },
    {
      id: "ibu",
      name: { ms: "Ibu", en: "Mother", es: "Mamá" },
      tone: "aux",
    },
    {
      id: "bapa",
      name: { ms: "Bapa", en: "Father", es: "Papá" },
      tone: "aux",
    },
  ],
  messages: [
    {
      id: "s22-m1",
      from: "ayub",
      text: {
        ms: "Hai, {currentUsername}. Ini ibu saya.",
        en: "Hi, {currentUsername}. This is my mother.",
        es: "Hola, {currentUsername}. Esta es mi madre.",
      },
    },
    {
      id: "s22-m2",
      from: "ibu",
      text: {
        ms: "Hai, {currentUsername}.",
        en: "Hi, {currentUsername}.",
        es: "Hola, {currentUsername}.",
      },
    },
    {
      id: "s22-m3",
      from: "me",
      text: {
        ms: "Hai, mak cik.",
        en: "Hi, ma’am.",
        es: "Hola, señora.",
      },
    },
    {
      id: "s22-m4",
      from: "ayub",
      text: {
        ms: "Itu bapa saya.",
        en: "That is my father.",
        es: "Ese es mi padre.",
      },
    },
    {
      id: "s22-m5",
      from: "bapa",
      text: {
        ms: "Hai, {currentUsername}.",
        en: "Hi, {currentUsername}.",
        es: "Hola, {currentUsername}.",
      },
    },
    {
      id: "s22-m6",
      from: "me",
      text: {
        ms: "Hai, pak cik.",
        en: "Hi, sir.",
        es: "Hola, señor.",
      },
    },
    {
      id: "s22-m7",
      from: "ayub",
      text: {
        ms: "Ini kakak saya, Sara, dan adik saya, Lina.",
        en: "This is my older sister, Sara, and my younger sister, Lina.",
        es: "Esta es mi hermana mayor, Sara, y mi hermana menor, Lina.",
      },
    },
    {
      id: "s22-m8",
      from: "me",
      text: {
        ms: "Hai, Sara. Hai, Lina.",
        en: "Hi, Sara. Hi, Lina.",
        es: "Hola, Sara. Hola, Lina.",
      },
    },
  ],
},

// Situation 2.3: family names used at home

{
  id: "p7-situasi-2-3",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 2.3: Panggilan keluarga di rumah",
    en: "Situation 2.3: Family names used at home",
    es: "Situación 2.3: Nombres familiares usados en casa",
  },
  context: {
    ms: "Latar tempat: Di rumah {currentUsername}",
    en: "Setting: At {currentUsername}’s house",
    es: "Lugar: En la casa de {currentUsername}",
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
      id: "ayub", // keep this id for your UI
      name: { ms: "Ibu", en: "Mother", es: "Mamá" },
      tone: "aux",
      alignment: "learner-side",
    },
  ],
  messages: [
  {
    id: "s23-m1",
    from: "me",
    text: {
      ms: "Mak, ini kawan saya, Muthu.",
      en: "Mum, this is my friend, Muthu.",
      es: "Mamá, este es mi amigo Muthu.",
    },
  },
  {
    id: "s23-m2",
    from: "ayub",
    text: {
      ms: "Hai, Muthu.",
      en: "Hi, Muthu.",
      es: "Hola, Muthu.",
    },
  },
  {
    id: "s23-m3",
    from: "muthu",
    text: {
      ms: "Hai, mak cik.",
      en: "Hi, ma’am.",
      es: "Hola, señora.",
    },
  },
  {
    id: "s23-m4",
    from: "ayub",
    text: {
      ms: "{currentUsername}, ayah ada di ruang tamu.",
      en: "{currentUsername}, Dad is in the living room.",
      es: "{currentUsername}, papá está en la sala.",
    },
  },
  {
    id: "s23-m5",
    from: "muthu",
    text: {
      ms: "Awak panggil bapa awak “ayah”?",
      en: "Do you call your father ayah?",
      es: "¿Llamas ayah a tu padre?",
    },
  },
  {
    id: "s23-m6",
    from: "me",
    text: {
      ms: "Ya. Saya panggil bapa saya “ayah”.",
      en: "Yes. I call my father ayah.",
      es: "Sí. Llamo ayah a mi padre.",
    },
  },
  {
    id: "s23-m7",
    from: "muthu",
    text: {
      ms: "Dan awak panggil ibu awak “mak”?",
      en: "And do you call your mother mak?",
      es: "¿Y llamas mak a tu madre?",
    },
  },
  {
    id: "s23-m8",
    from: "me",
    text: {
      ms: "Ya. Di rumah, saya panggil ibu saya “mak”.",
      en: "Yes. At home, I call my mother mak.",
      es: "Sí. En casa, llamo mak a mi madre.",
    },
  },
],
},



    // -------------------------
    // Page 5: Dragfill exercise
    // -------------------------
    ///Latihan 1
    {
  id: "p-latihan-1",
  kind: "typein",
  title: { ms: "Latihan 1", en: "Exercise 1", es: "Ejercicio 1" },
  instructions: {
    ms: "Susun huruf menjadi perkataan keluarga yang betul. Taip jawapan.",
    en: "Unscramble the letters to make the correct family word. Type your answer.",
    es: "Ordena las letras para formar la palabra familiar correcta. Escribe la respuesta.",
  },
  caseSensitive: false,
  items: [
    {
      id: "l1-1",
      n: 1,
      scrambled: "bnaag",
      answer: "abang",
      meaning: { ms: "abang", en: "older brother", es: "hermano mayor" },
    },
    {
      id: "l1-2",
      n: 2,
      scrambled: "ubi",
      answer: "ibu",
      meaning: { ms: "ibu", en: "mother", es: "madre" },
    },
    {
      id: "l1-3",
      n: 3,
      scrambled: "apba",
      answer: "bapa",
      meaning: { ms: "bapa", en: "father", es: "padre" },
    },
    {
      id: "l1-4",
      n: 4,
      scrambled: "akkak",
      answer: "kakak",
      meaning: { ms: "kakak", en: "older sister", es: "hermana mayor" },
    },
    {
      id: "l1-5",
      n: 5,
      scrambled: "iakd",
      answer: "adik",
      meaning: { ms: "adik", en: "younger sibling", es: "hermano o hermana menor" },
    },
  ],
},


    /// Latihan 2: Seret dan Isi Tempat Kosong (Family member introduction)
{
  id: "p-latihan-2",
  kind: "boxdrag",
  title: { ms: "Latihan 2", en: "Exercise 2", es: "Ejercicio 2" },
  instructions: {
    ms: "Lengkapkan carta keluarga terdekat di bawah.",
    en: "Complete the immediate-family chart below.",
    es: "Completa el cuadro de la familia inmediata.",
  },
  showFamilyLegend: true,
  options: [
    { id: "saya", ms: "saya", en: "me / I", es: "yo" },
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },
    { id: "kakak", ms: "kakak", en: "older sister", es: "hermana mayor" },
  ],
  nodes: [
    {
      id: "n-bapa",
      shape: "rect",
      role: "male",
      position: "topLeft",
      fixedText: { ms: "bapa", en: "father", es: "padre" },
    },
    {
      id: "n-ibu",
      shape: "oval",
      role: "female",
      position: "topRight",
      correctOptionId: "ibu",
    },
    {
      id: "n-abang",
      shape: "rect",
      role: "male",
      position: "bottomLeft",
      fixedText: { ms: "abang", en: "older brother", es: "hermano mayor" },
    },
    {
      id: "n-saya",
      shape: "rect",
      role: "self",
      position: "bottomCenter",
      correctOptionId: "saya",
    },
    {
      id: "n-kakak",
      shape: "oval",
      role: "female",
      position: "bottomRight",
      correctOptionId: "kakak",
    },
  ],
},

/// Latihan 3: immediate-family recap
{
  id: "p-latihan-2-advanced",
  kind: "boxdrag",
  title: { ms: "Latihan 3", en: "Exercise 3", es: "Ejercicio 3" },
  instructions: {
    ms: "Lengkapkan carta keluarga dengan perkataan yang telah dipelajari.",
    en: "Complete the family chart with the words you have learned.",
    es: "Completa el cuadro familiar con las palabras que has aprendido.",
  },

  compact: true,
  showFamilyLegend: true,

  options: [
    { id: "saya", ms: "saya", en: "me / I", es: "yo" },
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },
    { id: "bapa", ms: "bapa", en: "father", es: "padre" },
    { id: "adik", ms: "adik", en: "younger sibling", es: "hermano o hermana menor" },
    { id: "kakak", ms: "kakak", en: "older sister", es: "hermana mayor" },
  ],

  // Nodes: percent-based positions for the immediate-family recap
  nodes: [
    // Layer 1
    { id: "n-bapa", shape: "rect", role: "male", xPct: 42, yPct: 15, correctOptionId: "bapa" },
    { id: "n-ibu", shape: "oval", role: "female", xPct: 58, yPct: 15, correctOptionId: "ibu" },

    // Layer 2
    {
      id: "n-abang",
      shape: "rect",
      role: "male",
      xPct: 20,
      yPct: 62,
      fixedText: { ms: "abang", en: "older brother", es: "hermano mayor" },
    },
    { id: "n-adik", shape: "rect", role: "male", xPct: 40, yPct: 62, correctOptionId: "adik" },
    { id: "n-saya", shape: "rect", role: "self", xPct: 60, yPct: 62, correctOptionId: "saya" },
    { id: "n-kakak", shape: "oval", role: "female", xPct: 80, yPct: 62, correctOptionId: "kakak" },
  ],

  // Connector lines (percent coords, rendered into SVG viewBox)
  lines: [
    // bapa—ibu spouse line
    { x1: 42, y1: 15, x2: 58, y2: 15 },

    // trunk down from parents
    { x1: 50, y1: 15, x2: 50, y2: 30 },
    { x1: 20, y1: 30, x2: 80, y2: 30 },

    // arrows to immediate-family children
    { x1: 20, y1: 30, x2: 20, y2: 52, arrow: true },
    { x1: 40, y1: 30, x2: 40, y2: 52, arrow: true },
    { x1: 60, y1: 30, x2: 60, y2: 52, arrow: true },
    { x1: 80, y1: 30, x2: 80, y2: 52, arrow: true },
  ],
},


  ],
};
