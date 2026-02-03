import type { ChapterContent } from "./types";

export const chapter02: ChapterContent = {
  id: 2,
  title: { ms: "Keluarga", en: "Family", es: "Familia" },

  pages: [
    // -------------------------
    // Page 1: Learning outcomes (from BM2 page 1)
    // -------------------------
    {
      id: "p1-hasil",
      kind: "intro",
      sections: [
        {
          kind: "list",
          id: "hasil-pembelajaran",
          title: {
            ms: "Hasilnya, anda akan dapat belajar mengenai:",
            en: "By the end, you will be able to learn about:",
            es: "Al final, podrás aprender sobre:",
          },
          items: [
            {
              id: "hasil-1",
              ms: "Panggilan atau gelaran dalam keluarga",
              en: "Family terms and titles (how to address relatives)",
              es: "Términos y títulos familiares (cómo dirigirte a tus familiares)",
            },
            {
              id: "hasil-2",
              ms: "Cara memperkenalkan ahli keluarga",
              en: "How to introduce family members",
              es: "Cómo presentar a miembros de tu familia",
            },
            {
              id: "hasil-3",
              ms: "Perbualan sesama ahli keluarga",
              en: "Simple conversations with/among family members",
              es: "Conversaciones sencillas con/entre familiares",
            },
          ],
        },
      ],
    },

    // -------------------------
    // Page 2: Keluarga Asas (from BM2 page 3)
    // -------------------------
    {
      id: "p2-asas",
      kind: "table",
      title: {
        ms: "Keluarga asas",
        en: "Core family",
        es: "Familia básica",
      },
      columns: [
        { key: "ahli", label: { ms: "Ahli", en: "Member", es: "Miembro" } },
        { key: "panggilan", label: { ms: "Panggilan", en: "How you address them", es: "Cómo se le dice" } },
      ],
      rows: [
        {
          id: "r-bapa",
          cells: {
            ahli: [{ ms: "bapa", en: "father", es: "padre" }],
            panggilan: [
              { ms: "ayah", en: "dad", es: "papá" },
              { ms: "bapak", en: "dad", es: "papá" },
              { ms: "abah", en: "dad", es: "papá" },
            ],
          },
        },
        {
          id: "r-ibu",
          cells: {
            ahli: [{ ms: "ibu", en: "mother", es: "madre" }],
            panggilan: [
              { ms: "ibu", en: "mom", es: "mamá" },
              { ms: "emak", en: "mom", es: "mamá" },
              { ms: "mak", en: "mom", es: "mamá" },
              { ms: "mama", en: "mom", es: "mamá" },
            ],
          },
        },
        {
          id: "r-anak",
          cells: {
            ahli: [{ ms: "anak", en: "child / children", es: "hijo/a / hijos" }],
            panggilan: [
              { ms: "kakak", en: "older sister", es: "hermana mayor" },
              { ms: "abang", en: "older brother", es: "hermano mayor" },
              { ms: "adik", en: "younger sibling", es: "hermano/a menor" },
            ],
          },
        },
      ],
    },

    // -------------------------
    // Page 3: Keluarga Majmuk (from BM2 page 3)
    // -------------------------
    {
      id: "p3-majmuk",
      kind: "table",
      title: {
        ms: "Keluarga majmuk",
        en: "Extended family",
        es: "Familia extendida",
      },
      columns: [
        { key: "lelaki", label: { ms: "Moyang lelaki", en: "Male relatives", es: "Parientes (masculino)" } },
        { key: "perempuan", label: { ms: "Moyang perempuan", en: "Female relatives", es: "Parientes (femenino)" } },
      ],
      rows: [
        { id: "m1", cells: { lelaki: [{ ms: "Datuk", en: "Grandfather", es: "Abuelo" }], perempuan: [{ ms: "Nenek", en: "Grandmother", es: "Abuela" }] } },
        { id: "m2", cells: { lelaki: [{ ms: "Datuk saudara", en: "Great-uncle", es: "Tío abuelo" }], perempuan: [{ ms: "Nenek saudara", en: "Great-aunt", es: "Tía abuela" }] } },
        { id: "m3", cells: { lelaki: [{ ms: "Bapa", en: "Father", es: "Padre" }], perempuan: [{ ms: "ibu", en: "Mother", es: "Madre" }] } },
        { id: "m4", cells: { lelaki: [{ ms: "Bapa saudara", en: "Uncle", es: "Tío" }], perempuan: [{ ms: "Ibu saudara", en: "Aunt", es: "Tía" }] } },
        { id: "m5", cells: { lelaki: [{ ms: "Abang", en: "Older brother", es: "Hermano mayor" }], perempuan: [{ ms: "Kakak", en: "Older sister", es: "Hermana mayor" }] } },
        { id: "m6", cells: { lelaki: [{ ms: "Adik lelaki", en: "Younger brother", es: "Hermano menor" }], perempuan: [{ ms: "Adik perempuan", en: "Younger sister", es: "Hermana menor" }] } },
        { id: "m7", cells: { lelaki: [{ ms: "Sepupu lelaki", en: "Male cousin", es: "Primo" }], perempuan: [{ ms: "Sepupu perempuan", en: "Female cousin", es: "Prima" }] } },
        { id: "m8", cells: { lelaki: [{ ms: "Anak lelaki", en: "Son", es: "Hijo" }], perempuan: [{ ms: "Anak perempuan", en: "Daughter", es: "Hija" }] } },
        { id: "m9", cells: { lelaki: [{ ms: "Anak saudara lelaki", en: "Nephew", es: "Sobrino" }], perempuan: [{ ms: "Anak saudara perempuan", en: "Niece", es: "Sobrina" }] } },
        { id: "m10", cells: { lelaki: [{ ms: "Cucu lelaki", en: "Grandson", es: "Nieto" }], perempuan: [{ ms: "Cucu perempuan", en: "Granddaughter", es: "Nieta" }] } },
        { id: "m11", cells: { lelaki: [{ ms: "Cucu saudara lelaki", en: "Grandnephew", es: "Sobrino nieto" }], perempuan: [{ ms: "Cucu saudara perempuan", en: "Grandniece", es: "Sobrina nieta" }] } },
        { id: "m12", cells: { lelaki: [{ ms: "Menantu lelaki", en: "Son-in-law", es: "Yerno" }], perempuan: [{ ms: "Menantu perempuan", en: "Daughter-in-law", es: "Nuera" }] } },
        { id: "m13", cells: { lelaki: [{ ms: "Abang ipar", en: "Brother-in-law", es: "Cuñado" }], perempuan: [{ ms: "Kakak ipar", en: "Sister-in-law", es: "Cuñada" }] } },
        {
          id: "m14",
          cells: {
            lelaki: [{ ms: "Adik ipar lelaki", en: "Younger brother-in-law", es: "Cuñado (más joven)" }],
            perempuan: [{ ms: "Adik ipar perempuan", en: "Younger sister-in-law", es: "Cuñada (más joven)" }],
          },
        },
      ],
    },

    // -------------------------
    // Page 4: Chat — introducing family
    // -------------------------
{
  id: "p5-situasi-2-1",
  kind: "chat",
  title: {
    ms: "Situasi 2.1 Cerita Keluarga Saya (Formal)",
    en: "Situation 2.1 Talking about my family (Formal)",
    es: "Situación 2.1 Hablar de mi familia (Formal)",
  },
  context: {
    ms: "Latar tempat: Di sebuah rumah",
    en: "Setting: At a house",
    es: "Lugar: En una casa",
  },
  participants: [
    {
      id: "ayub", // keep this id for your UI
      name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    {
      id: "s21-m1",
      from: "ayub",
      text: {
        ms: "Assalamualaikum.",
        en: "Assalamualaikum.",
        es: "Assalamualaikum.",
      },
    },
    {
      id: "s21-m2",
      from: "azman",
      text: {
        ms: "Waalaikumussalam, Mad.",
        en: "Waalaikumussalam, Mad.",
        es: "Waalaikumussalam, Mad.",
      },
    },
    {
      id: "s21-m3",
      from: "ayub",
      text: {
        ms: "Daripada mana ni?",
        en: "Where have you been?",
        es: "¿De dónde vienes?",
      },
    },
    {
      id: "s21-m4",
      from: "azman",
      text: {
        ms: "Baru balik dari kampung.",
        en: "I just came back from my hometown (kampung).",
        es: "Acabo de volver del pueblo (kampung).",
      },
    },
    {
      id: "s21-m5",
      from: "ayub",
      text: {
        ms: "Oh, baru balik dari kampung. Bagaimana keadaan keluarga awak di kampung?",
        en: "Oh, you just came back from your hometown. How is your family there?",
        es: "Ah, acabas de volver del pueblo. ¿Cómo está tu familia allá?",
      },
    },
    {
      id: "s21-m6",
      from: "azman",
      text: {
        ms: "Dekat kampung, alhamdulillah. Semua sihat.",
        en: "Back home, alhamdulillah. Everyone is well.",
        es: "Allá en casa, alhamdulillah. Todos están bien.",
      },
    },
    {
      id: "s21-m7",
      from: "ayub",
      text: {
        ms: "Siapa keluarga awak yang tinggal di kampung?",
        en: "Which of your family members live in the village?",
        es: "¿Qué familiares tuyos viven en el pueblo?",
      },
    },
    {
      id: "s21-m8",
      from: "azman",
      text: {
        ms: "Oh, yang tinggal di kampung ada atuk saya, nenek, mak ayah saya, dan adik beradik sayalah.",
        en: "In the village, my atuk (grandfather), nenek (grandmother), my parents, and my siblings live there.",
        es: "En el pueblo viven mi atuk (abuelo), mi nenek (abuela), mis padres y mis hermanos.",
      },
    },
    {
      id: "s21-m9",
      from: "ayub",
      text: {
        ms: "Berapa orang adik-beradik awak?",
        en: "How many siblings do you have?",
        es: "¿Cuántos hermanos tienes?",
      },
    },
    {
      id: "s21-m10",
      from: "azman",
      text: {
        ms:
          "Oh, adik-beradik saya ada lima orang. Saya, abang, kakak, dua orang lagi adik lelaki dan adik perempuan.",
        en:
          "I have five siblings: me, an older brother, an older sister, and two more younger siblings (a younger brother and a younger sister).",
        es:
          "Somos cinco hermanos: yo, un hermano mayor, una hermana mayor y dos hermanos menores (un hermano menor y una hermana menor).",
      },
    },
    {
      id: "s21-m11",
      from: "ayub",
      text: {
        ms: "Wah! Ramainya adik-beradik awak.",
        en: "Wow! You have so many siblings.",
        es: "¡Wow! Tienes muchos hermanos.",
      },
    },
  ],
},



    //"Situasi 2.2 Memperkenalkan Keluarga saya (Tidak Formal)"

{
  id: "p6-situasi-2-2",
  kind: "chat",
  title: {
    ms: "Situasi 2.2 Memperkenalkan Keluarga saya (Tidak Formal)",
    en: "Situation 2.2 Introducing my family (Informal)",
    es: "Situación 2.2 Presentar a mi familia (Informal)",
  },
  context: {
    ms: "Latar tempat: Di sebuah rumah",
    en: "Setting: At a house",
    es: "Lugar: En una casa",
  },
  participants: [
    {
      id: "ayub", // keep this id for your UI
      name: { ms: "Hassan", en: "Hassan", es: "Hassan" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    {
      id: "s22-m1",
      from: "azman",
      text: {
        ms: "Assalamualaikum, Hassan.",
        en: "Assalamualaikum, Hassan.",
        es: "Assalamualaikum, Hassan.",
      },
    },
    {
      id: "s22-m2",
      from: "ayub",
      text: {
        ms: "Ibu: Waalaikummussalam, Azman.",
        en: "Mother: Waalaikummussalam, Azman.",
        es: "Mamá: Waalaikummussalam, Azman.",
      },
    },
    {
      id: "s22-m3",
      from: "azman",
      text: {
        ms: "Silakan masuk.\nTerima kasihlah kerana sudi datang.",
        en: "Please come in.\nThank you for coming.",
        es: "Pasa, por favor.\nGracias por venir.",
      },
    },
    {
      id: "s22-m4",
      from: "ayub",
      text: {
        ms: "Ibu: Terima kasih juga kerana jemput saya.",
        en: "Mother: Thank you too for inviting me.",
        es: "Mamá: Gracias también por invitarme.",
      },
    },
    {
      id: "s22-m5",
      from: "azman",
      text: {
        ms: "Kenalkan ini isteri saya, Fatimah.",
        en: "Let me introduce my wife, Fatimah.",
        es: "Te presento a mi esposa, Fátimah.",
      },
    },
    {
      id: "s22-m6",
      from: "ayub",
      text: {
        ms: "Ibu: Oh, Fatimah.",
        en: "Mother: Oh, Fatimah.",
        es: "Mamá: Oh, Fátimah.",
      },
    },
    {
      id: "s22-m7",
      from: "azman",
      text: {
        ms: "Ya, Fatimah.",
        en: "Yes, Fatimah.",
        es: "Sí, Fátimah.",
      },
    },
    {
      id: "s22-m8",
      from: "ayub",
      text: {
        ms: "Ini kakak saya, kak Wati.",
        en: "This is my older sister, Kak Wati.",
        es: "Esta es mi hermana mayor, Kak Wati.",
      },
    },
    {
      id: "s22-m9",
      from: "azman",
      text: {
        ms: "Oh, ini kakak.",
        en: "Oh, this is your older sister.",
        es: "Ah, esta es tu hermana mayor.",
      },
    },
    {
      id: "s22-m10",
      from: "ayub",
      text: {
        ms: "Ya, kakak saya. Silalah. Jemput duduk.\nIni adik saya, Syada.",
        en: "Yes, my older sister. Please. Have a seat.\nThis is my younger sibling, Syada.",
        es: "Sí, mi hermana mayor. Adelante. Siéntate, por favor.\nEste/a es mi hermano/a menor, Syada.",
      },
    },
    {
      id: "s22-m11",
      from: "azman",
      text: {
        ms: "Oh, ini adik.",
        en: "Oh, this is your younger sibling.",
        es: "Ah, este/a es tu hermano/a menor.",
      },
    },
    {
      id: "s22-m12",
      from: "ayub",
      text: {
        ms: "Ya, adik saya. Itu bapa saya.",
        en: "Yes, my younger sibling. That is my father.",
        es: "Sí, mi hermano/a menor. Ese es mi padre.",
      },
    },
    {
      id: "s22-m13",
      from: "azman",
      text: {
        ms: "Assalamualaikum, pak cik.",
        en: "Assalamualaikum, Uncle.",
        es: "Assalamualaikum, tío.",
      },
    },
    {
      id: "s22-m14",
      from: "ayub",
      text: {
        ms: "Bapa Hassan: Waalaikumussalam, jemput makan.",
        en: "Hassan’s father: Waalaikumussalam, please eat.",
        es: "El papá de Hassan: Waalaikumussalam, pase a comer.",
      },
    },
    {
      id: "s22-m15",
      from: "azman",
      text: {
        ms: "Baiklah.",
        en: "Alright.",
        es: "De acuerdo.",
      },
    },
    {
      id: "s22-m16",
      from: "ayub",
      text: {
        ms: "Itu abang saya, abang Man.",
        en: "That is my older brother, Abang Man.",
        es: "Ese es mi hermano mayor, Abang Man.",
      },
    },
    {
      id: "s22-m17",
      from: "azman",
      text: {
        ms: "Eh, bang.\nSaya tak nampak pula mak awak. Mak awak\ndekat mana?",
        en: "Hey, bro.\nI don’t see your mum. Where is she?",
        es: "Eh, bro.\nNo veo a tu mamá. ¿Dónde está?",
      },
    },
    {
      id: "s22-m18",
      from: "ayub",
      text: {
        ms: "Oh, mak saya dekat dapur.\nJemputlah makan.",
        en: "Oh, my mum is in the kitchen.\nPlease, eat.",
        es: "Oh, mi mamá está en la cocina.\nPor favor, come.",
      },
    },
    {
      id: "s22-m19",
      from: "azman",
      text: {
        ms: "Terima kasih.",
        en: "Thank you.",
        es: "Gracias.",
      },
    },
  ],
},

///Situasi 2.3 Perbualan dengan ibu (Gelaran dalam Keluarga)

{
  id: "p7-situasi-2-3",
  kind: "chat",
  title: {
    ms: "Situasi 2.3 Perbualan dengan ibu (Gelaran dalam Keluarga)",
    en: "Situation 2.3 Conversation with mother (Family titles)",
    es: "Situación 2.3 Conversación con mamá (Títulos familiares)",
  },
  context: {
    ms: "Latar tempat: Kawasan dapur di rumah",
    en: "Setting: In the kitchen at home",
    es: "Lugar: En la cocina de casa",
  },
  participants: [
    {
      id: "ayub", // keep this id for your UI
      name: { ms: "Ibu", en: "Mother", es: "Mamá" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    {
      id: "s23-m1",
      from: "azman",
      text: {
        ms: "Mak masak apa hari ni?",
        en: "Mum, what are you cooking today?",
        es: "Mamá, ¿qué estás cocinando hoy?",
      },
    },
    {
      id: "s23-m2",
      from: "ayub",
      text: {
        ms: "Mak masak nasi goreng.",
        en: "I’m cooking fried rice.",
        es: "Estoy cocinando arroz frito.",
      },
    },
    {
      id: "s23-m3",
      from: "azman",
      text: {
        ms: "Nasi goreng? Banyaknya mak masak.",
        en: "Fried rice? You’re making a lot, Mum.",
        es: "¿Arroz frito? Estás cocinando muchísimo, mamá.",
      },
    },
    {
      id: "s23-m4",
      from: "ayub",
      text: {
        ms: "Hari ini, atuk dan nenek sarapan di rumah.\nAbang long dan kak ngah pun ada sekali.",
        en: "Today, atuk and nenek are having breakfast at home.\nAbang Long and Kak Ngah are here too.",
        es: "Hoy, atuk y nenek van a desayunar en casa.\nAbang Long y Kak Ngah también están aquí.",
      },
    },
    {
      id: "s23-m5",
      from: "azman",
      text: {
        ms: "Oh, ye ke?",
        en: "Oh, really?",
        es: "¿Ah, sí?",
      },
    },
    {
      id: "s23-m6",
      from: "ayub",
      text: {
        ms: "Man, tolong mak buatkan air teh.",
        en: "Man, help Mum make some tea.",
        es: "Man, ayúdale a mamá a preparar té.",
      },
    },
    {
      id: "s23-m7",
      from: "azman",
      text: {
        ms: "Ya la mak, nanti Man buatkan.",
        en: "Alright Mum, I’ll make it in a bit.",
        es: "Sí, mamá, ahora lo hago en un momento.",
      },
    },
    {
      id: "s23-m8",
      from: "ayub",
      text: {
        ms: "Terima kasih, Man. Nanti Man panggil ayah,\n" +
            "atuk, nenek, abang long dan kak ngah untuk\n" +
            "sarapan sekali, ya.",
        en: "Thank you, Man. Later, call Dad,\n" +
            "atuk, nenek, Abang Long, and Kak Ngah\n" +
            "to have breakfast together, okay?",
        es: "Gracias, Man. Luego llama a Papá,\n" +
            "a atuk, a nenek, a Abang Long y a Kak Ngah\n" +
            "para desayunar juntos, ¿sí?",
      },
    },
    {
      id: "s23-m9",
      from: "azman",
      text: {
        ms: "Nantilah Man panggilkan. Man pergi buat air\ndulu.",
        en: "I’ll call them. I’m going to make the tea first.",
        es: "Ya los llamaré. Voy a preparar el té primero.",
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
    ms: "Susun semula huruf di bawah menjadi perkataan yang betul. Taip jawapan anda.",
    en: "Unscramble the letters into the correct word. Type your answer.",
    es: "Reordena las letras para formar la palabra correcta. Escribe tu respuesta.",
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
      meaning: { ms: "adik", en: "younger sibling", es: "hermano/a menor" },
    },
  ],
},


    /// Latihan 2: Seret dan Isi Tempat Kosong (Family member introduction)
{
  id: "p-latihan-2",
  kind: "boxdrag",
  title: { ms: "Latihan 2", en: "Exercise 2", es: "Ejercicio 2" },
  instructions: {
    ms: "Lengkapkan carta organisasi keluarga di bawah dengan betul.",
    en: "Complete the family tree correctly.",
    es: "Completa el árbol familiar correctamente.",
  },
  options: [
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },
    { id: "abang", ms: "abang", en: "older brother", es: "hermano mayor" },
    { id: "adik", ms: "adik", en: "younger sibling", es: "hermano/a menor" },
    { id: "kakak", ms: "kakak", en: "older sister", es: "hermana mayor" },
  ],
  nodes: [
    {
      id: "n-bapa",
      shape: "rect",
      position: "topLeft",
      fixedText: { ms: "bapa", en: "father", es: "padre" },
    },
    {
      id: "n-ibu",
      shape: "oval",
      position: "topRight",
      correctOptionId: "ibu",
    },
    {
      id: "n-abang",
      shape: "oval",
      position: "bottomLeft",
      correctOptionId: "abang",
    },
    {
      id: "n-adik",
      shape: "rect",
      position: "bottomCenter",
      correctOptionId: "adik",
    },
    {
      id: "n-kakak",
      shape: "oval",
      position: "bottomRight",
      correctOptionId: "kakak",
    },
  ],
},

///latihan 2 (advanced)
{
  id: "p-latihan-2-advanced",
  kind: "boxdrag",
  title: { ms: "Latihan 2 (Lanjutan)", en: "Exercise 2 (Advanced)", es: "Ejercicio 2 (Avanzado)" },
  instructions: {
    ms: "Lengkapkan carta keluarga (lanjutan) dengan betul.",
    en: "Complete the advanced family tree correctly.",
    es: "Completa correctamente el árbol familiar avanzado.",
  },

  compact: true,

  options: [
    { id: "bapa", ms: "bapa", en: "father", es: "padre" },
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },

    { id: "abang", ms: "abang", en: "older brother", es: "hermano mayor" },
    { id: "kakak", ms: "kakak", en: "older sister", es: "hermana mayor" },
    { id: "adik", ms: "adik", en: "younger sibling", es: "hermano/a menor" },
    { id: "saya", ms: "saya", en: "me / I", es: "yo" },

    { id: "kakak-ipar", ms: "kakak ipar", en: "sister-in-law (brother’s wife)", es: "cuñada (esposa de mi hermano)" },
    { id: "abang-ipar", ms: "abang-ipar", en: "brother-in-law (sister’s husband)", es: "cuñado (esposo de mi hermana)" },

    { id: "anak-perempuan-abang", ms: "anak perempuan abang", en: "my brother’s daughter", es: "la hija de mi hermano" },
    { id: "anak-lelaki-kakak", ms: "anak lelaki kakak", en: "my sister’s son", es: "el hijo de mi hermana" },
  ],

  // Nodes: percent-based positions so we can fit 10 items
  nodes: [
    // Layer 1
    { id: "n-bapa", shape: "rect", xPct: 42, yPct: 15, correctOptionId: "bapa" },
    { id: "n-ibu", shape: "oval", xPct: 58, yPct: 15, correctOptionId: "ibu" },

    // Layer 2 (order you asked)
    // Layer 2 (6 nodes)
    { id: "n-kipar", shape: "oval", xPct: 10, yPct: 54, correctOptionId: "kakak-ipar" },
    { id: "n-abang", shape: "rect", xPct: 26, yPct: 54, correctOptionId: "abang" },
    { id: "n-adik",  shape: "rect", xPct: 42, yPct: 54, correctOptionId: "adik" },
    { id: "n-saya",  shape: "rect", xPct: 58, yPct: 54, correctOptionId: "saya" },
    { id: "n-kakak", shape: "oval", xPct: 74, yPct: 54, correctOptionId: "kakak" },
    { id: "n-suami", shape: "rect", xPct: 90, yPct: 54, correctOptionId: "abang-ipar" },


    // Layer 3
    { id: "n-anak-abang", shape: "oval", xPct: 20, yPct: 85, correctOptionId: "anak-perempuan-abang" },
    { id: "n-anak-kakak", shape: "rect", xPct: 80, yPct: 85, correctOptionId: "anak-lelaki-kakak" },
  ],

  // Connector lines (percent coords, rendered into SVG viewBox)
  lines: [
    // bapa—ibu spouse line
    { x1: 42, y1: 15, x2: 58, y2: 15 },

    // trunk down from parents
    { x1: 50, y1: 15, x2: 50, y2: 30 },
    { x1: 26, y1: 30, x2: 74, y2: 30 },

    // arrows to children (abang, adik, saya, kakak) — NOT to spouses
    { x1: 26, y1: 30, x2: 26, y2: 45, arrow: true },
    { x1: 42, y1: 30, x2: 42, y2: 45, arrow: true },
    { x1: 56, y1: 30, x2: 56, y2: 45, arrow: true },
    { x1: 74, y1: 30, x2: 74, y2: 45, arrow: true },

    { x1: 10, y1: 54, x2: 26, y2: 54 }, // kakak ipar — abang
    { x1: 74, y1: 54, x2: 90, y2: 54 }, // kakak — suami kakak
    { x1: 18, y1: 54, x2: 18, y2: 78, arrow: true }, // child of abang couple
    { x1: 82, y1: 54, x2: 82, y2: 78, arrow: true }, // child of kakak couple

  ],
},


  ],
};
