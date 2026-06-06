import type { ChapterContent } from "./types";

export const chapter02: ChapterContent = {
  id: 2,
  title: { ms: "Keluarga", en: "Family", es: "Familia" },

  pages: [
    // -------------------------
    // Page 1: Keluarga Asas (from BM2 page 3)
    // -------------------------
    {
      id: "p2-asas",
      kind: "family",
      title: {
        ms: "Keluarga asas",
        en: "Core family",
        es: "Familia básica",
      },
      familyImageSrc: "/assets/chapters/ch2/ch2-keluarga.webp",
      familyImageAlt: {
        ms: "Gambar keluarga asas",
        en: "Core family portrait",
        es: "Retrato de la familia básica",
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
          alternativeNames: ["ayah", "abah", "papa"],
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
          alternativeNames: ["umi", "mak", "mama"],
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
          label: { ms: "saya", en: "me", es: "yo" },
          imageSrc: "/assets/chapters/ch2/ch2-keluarga-saya.webp",
          imageAlt: {
            ms: "Saya",
            en: "Me",
            es: "Yo",
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
  title: {
    ms: "Situasi 2.1: Berbual tentang keluarga saya",
    en: "Situation 2.1: Talking about my family",
    es: "Situación 2.1: Hablar de mi familia",
  },
  context: {
    ms: "Latar tempat: Di rumah",
    en: "Setting: At home",
    es: "Lugar: En casa",
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
        ms: "Assalamualaikum, Man. Tadi saya nampak awak buat panggilan video.",
        en: "Assalamualaikum, Man. I saw you on a video call earlier.",
        es: "Assalamualaikum, Man. Te vi en una videollamada hace un rato.",
      },
    },
    {
      id: "s21-m2",
      from: "azman",
      text: {
        ms: "Waalaikumussalam, Mad. Ya, saya telefon keluarga saya di kampung.",
        en: "Waalaikumussalam, Mad. Yes, I called my family back home.",
        es: "Waalaikumussalam, Mad. Sí, llamé a mi familia en mi pueblo.",
      },
    },
    {
      id: "s21-m3",
      from: "ayub",
      text: {
        ms: "Awak bercakap dengan siapa tadi?",
        en: "Who were you talking to?",
        es: "¿Con quién estabas hablando?",
      },
    },
    {
      id: "s21-m4",
      from: "azman",
      text: {
        ms: "Saya bercakap dengan ibu dan bapa saya.",
        en: "I was talking to my mother and father.",
        es: "Estaba hablando con mi mamá y mi papá.",
      },
    },
    {
      id: "s21-m5",
      from: "ayub",
      text: {
        ms: "Adik-beradik awak ada sekali?",
        en: "Were your siblings there too?",
        es: "¿También estaban tus hermanos?",
      },
    },
    {
      id: "s21-m6",
      from: "azman",
      text: {
        ms: "Ada. Adik perempuan saya pun ikut dalam panggilan itu.",
        en: "Yes. My younger sister was on the call too.",
        es: "Sí. Mi hermana menor también estaba en la llamada.",
      },
    },
    {
      id: "s21-m7",
      from: "ayub",
      text: {
        ms: "Semua sihat?",
        en: "Is everyone doing well?",
        es: "¿Todos están bien?",
      },
    },
    {
      id: "s21-m8",
      from: "azman",
      text: {
        ms: "Alhamdulillah, semua sihat. Ibu pesan supaya saya makan dengan baik.",
        en: "Alhamdulillah, everyone is well. My mother reminded me to eat properly.",
        es: "Alhamdulillah, todos están bien. Mi mamá me dijo que comiera bien.",
      },
    },
    {
      id: "s21-m9",
      from: "ayub",
      text: {
        ms: "Bagus. Hujung minggu ini awak balik kampung?",
        en: "That’s good. Are you going back to your hometown this weekend?",
        es: "Qué bien. ¿Vas a volver a tu pueblo este fin de semana?",
      },
    },
    {
      id: "s21-m10",
      from: "azman",
      text: {
        ms: "Belum lagi. Mungkin bulan depan saya balik jumpa ibu bapa saya.",
        en: "Not yet. Maybe next month I’ll go back to see my parents.",
        es: "Todavía no. Quizás el próximo mes vuelva para ver a mis padres.",
      },
    },
    {
      id: "s21-m11",
      from: "ayub",
      text: {
        ms: "Baiklah, kirim salam saya kepada keluarga awak.",
        en: "Alright, send my regards to your family.",
        es: "Está bien, mándale saludos a tu familia de mi parte.",
      },
    },
  ],
},



    //"Situasi 2.2 Memperkenalkan Keluarga saya (Tidak Formal)"

{
  id: "p6-situasi-2-2",
  kind: "chat",
  title: {
    ms: "Situasi 2.2: Memperkenalkan keluarga saya (tidak formal)",
    en: "Situation 2.2: Introducing my family (informal)",
    es: "Situación 2.2: Presentar a mi familia (informal)",
  },
  context: {
    ms: "Latar tempat: Di rumah Hassan",
    en: "Setting: At Hassan’s house",
    es: "Lugar: En la casa de Hassan",
  },
  participants: [
    {
      id: "azman",
      name: { ms: "Azman", en: "Azman", es: "Azman" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
    {
      id: "ayub", // keep this id for your UI
      name: { ms: "Hassan", en: "Hassan", es: "Hassan" },
    },
  ],
  messages: [
    {
      id: "s22-m1",
      from: "azman",
      text: {
        ms: "Assalamualaikum, Hassan. Saya datang nak buat kerja kumpulan.",
        en: "Assalamualaikum, Hassan. I came over to work on the group assignment.",
        es: "Assalamualaikum, Hassan. Vine para trabajar en el proyecto de grupo.",
      },
    },
    {
      id: "s22-m2",
      from: "ayub",
      text: {
        ms: "Waalaikumussalam, Azman. Jemput masuk.",
        en: "Waalaikumussalam, Azman. Come in.",
        es: "Waalaikumussalam, Azman. Pasa.",
      },
    },
    {
      id: "s22-m3",
      from: "azman",
      text: {
        ms: "Terima kasih. Wah, selesanya rumah awak.",
        en: "Thank you. Wow, your house feels so comfortable.",
        es: "Gracias. Qué cómoda se siente tu casa.",
      },
    },
    {
      id: "s22-m4",
      from: "ayub",
      text: {
        ms: "Terima kasih. Itu ibu saya. Ibu, ini kawan saya, Azman.",
        en: "Thank you. That’s my mother. Mom, this is my friend, Azman.",
        es: "Gracias. Esa es mi mamá. Mamá, este es mi amigo, Azman.",
      },
    },
    {
      id: "s22-m5",
      from: "azman",
      text: {
        ms: "Selamat berkenalan, mak cik.",
        en: "Nice to meet you, Auntie.",
        es: "Mucho gusto, señora.",
      },
    },
    {
      id: "s22-m6",
      from: "ayub",
      text: {
        ms: "Ibu saya sedang buat teh panas. Nanti kita minum sama-sama.",
        en: "My mother is making hot tea. We can have some together later.",
        es: "Mi mamá está preparando té caliente. Luego podemos tomar un poco juntos.",
      },
    },
    {
      id: "s22-m7",
      from: "azman",
      text: {
        ms: "Wah, patutlah bau teh itu wangi.",
        en: "Wow, no wonder the tea smells so good.",
        es: "Con razón huele tan bien el té.",
      },
    },
    {
      id: "s22-m8",
      from: "ayub",
      text: {
        ms: "Yang duduk di sebelah ibu saya itu adik saya, Lina.",
        en: "The one sitting next to my mother is my younger sister, Lina.",
        es: "La que está sentada al lado de mi mamá es mi hermana menor, Lina.",
      },
    },
    {
      id: "s22-m9",
      from: "azman",
      text: {
        ms: "Hai, Lina. Kamu sekolah rendah lagi?",
        en: "Hi, Lina. Are you still in primary school?",
        es: "Hola, Lina. ¿Todavía estás en primaria?",
      },
    },
    {
      id: "s22-m10",
      from: "ayub",
      text: {
        ms: "Ya, Lina Darjah Lima. Abang saya, Amir, pula ada di dapur.",
        en: "Yes, Lina is in Year Five. My older brother, Amir, is in the kitchen.",
        es: "Sí, Lina está en quinto grado. Mi hermano mayor, Amir, está en la cocina.",
      },
    },
    {
      id: "s22-m11",
      from: "azman",
      text: {
        ms: "Oh, ramai juga orang di rumah awak hari ini.",
        en: "Oh, there are quite a few people at your house today.",
        es: "Ah, hoy hay bastante gente en tu casa.",
      },
    },
    {
      id: "s22-m12",
      from: "ayub",
      text: {
        ms: "Ya. Hari ini keluarga kami makan bersama. Jom duduk dulu.",
        en: "Yes. Our family is having a meal together today. Come, let’s sit down first.",
        es: "Sí. Hoy mi familia va a comer junta. Ven, sentémonos primero.",
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
      ms: "Mak, ayah dah bangun?",
      en: "Mum, is Dad already up?",
      es: "Mamá, ¿papá ya se despertó?",
    },
  },
  {
    id: "s23-m2",
    from: "ayub",
    text: {
      ms: "Dah. Ayah baca surat khabar di ruang tamu.",
      en: "Yes. Dad is reading the newspaper in the living room.",
      es: "Sí. Papá está leyendo el periódico en la sala.",
    },
  },
  {
    id: "s23-m3",
    from: "azman",
    text: {
      ms: "Abang Long balik malam tadi, kan?",
      en: "Abang Long came back last night, right?",
      es: "Abang Long volvió anoche, ¿verdad?",
    },
  },
  {
    id: "s23-m4",
    from: "ayub",
    text: {
      ms: "Ya. Abang awak balik dengan isteri dan anaknya.",
      en: "Yes. Your older brother came back with his wife and child.",
      es: "Sí. Tu hermano mayor regreso con su esposa y su hijo.",
    },
  },
  {
    id: "s23-m5",
    from: "azman",
    text: {
      ms: "Bagus. Saya nak susun pinggan untuk ayah, abang, dan adik.",
      en: "Great. I want to arrange plates for Dad, my brother, and my younger sibling.",
      es: "Bien. Quiero preparar platos para papa, mi hermano y mi hermano menor.",
    },
  },
  {
    id: "s23-m6",
    from: "ayub",
    text: {
      ms: "Terima kasih, Man. Tolong panggil nenek sekali.",
      en: "Thank you, Man. Please call Grandma too.",
      es: "Gracias, Man. Por favor llama también a la abuela.",
    },
  },
  {
    id: "s23-m7",
    from: "azman",
    text: {
      ms: "Baik, mak. Nenek ada di bilik depan?",
      en: "Okay, Mum. Is Grandma in the front room?",
      es: "De acuerdo, mamá. ¿La abuela está en el cuarto de delante?",
    },
  },
  {
    id: "s23-m8",
    from: "ayub",
    text: {
      ms: "Ya, nenek rehat sekejap di situ.",
      en: "Yes, Grandma is resting there for a while.",
      es: "Sí, la abuela está descansando un rato allí.",
    },
  },
  {
    id: "s23-m9",
    from: "azman",
    text: {
      ms: "Lepas semua datang, kita sarapan sama-sama.",
      en: "After everyone comes, we will have breakfast together.",
      es: "Cuando todos lleguen, desayunaremos juntos.",
    },
  },
  {
    id: "s23-m10",
    from: "ayub",
    text: {
      ms: "Betul. Itu yang mak suka.",
      en: "That's right. That's what Mum likes.",
      es: "Correcto. Eso es lo que le gusta a mamá.",
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
  showFamilyLegend: true,
  options: [
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },
    { id: "abang", ms: "abang", en: "older brother", es: "hermano mayor" },
    { id: "saya", ms: "saya", en: "me / I", es: "yo" },
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
      correctOptionId: "abang",
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
  showFamilyLegend: true,

  options: [
    { id: "saya", ms: "saya", en: "me / I", es: "yo" },
    { id: "anak-lelaki-kakak", ms: "anak lelaki kakak", en: "my sister’s son", es: "el hijo de mi hermana" },
    { id: "ibu", ms: "ibu", en: "mother", es: "madre" },
    { id: "kakak-ipar", ms: "kakak ipar", en: "sister-in-law (brother’s wife)", es: "cuñada (esposa de mi hermano)" },
    { id: "abang", ms: "abang", en: "older brother", es: "hermano mayor" },
    { id: "anak-perempuan-abang", ms: "anak perempuan abang", en: "my brother’s daughter", es: "la hija de mi hermano" },
    { id: "bapa", ms: "bapa", en: "father", es: "padre" },
    { id: "adik", ms: "adik", en: "younger sibling", es: "hermano/a menor" },
    { id: "abang-ipar", ms: "abang-ipar", en: "brother-in-law (sister’s husband)", es: "cuñado (esposo de mi hermana)" },
    { id: "kakak", ms: "kakak", en: "older sister", es: "hermana mayor" },
  ],

  // Nodes: percent-based positions so we can fit 10 items
  nodes: [
    // Layer 1
    { id: "n-bapa", shape: "rect", role: "male", xPct: 42, yPct: 15, correctOptionId: "bapa" },
    { id: "n-ibu", shape: "oval", role: "female", xPct: 58, yPct: 15, correctOptionId: "ibu" },

    // Layer 2 (order you asked)
    // Layer 2 (6 nodes)
    { id: "n-kipar", shape: "oval", role: "female", xPct: 10, yPct: 54, correctOptionId: "kakak-ipar" },
    { id: "n-abang", shape: "rect", role: "male", xPct: 26, yPct: 54, correctOptionId: "abang" },
    { id: "n-adik",  shape: "rect", role: "male", xPct: 42, yPct: 54, correctOptionId: "adik" },
    { id: "n-saya",  shape: "rect", role: "self", xPct: 58, yPct: 54, correctOptionId: "saya" },
    { id: "n-kakak", shape: "oval", role: "female", xPct: 74, yPct: 54, correctOptionId: "kakak" },
    { id: "n-suami", shape: "rect", role: "male", xPct: 90, yPct: 54, correctOptionId: "abang-ipar" },


    // Layer 3
    { id: "n-anak-abang", shape: "oval", role: "female", xPct: 18, yPct: 84, correctOptionId: "anak-perempuan-abang" },
    { id: "n-anak-kakak", shape: "rect", role: "male", xPct: 82, yPct: 84, correctOptionId: "anak-lelaki-kakak" },
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
    { x1: 58, y1: 30, x2: 58, y2: 45, arrow: true },
    { x1: 74, y1: 30, x2: 74, y2: 45, arrow: true },

    { x1: 10, y1: 54, x2: 26, y2: 54 }, // kakak ipar — abang
    { x1: 74, y1: 54, x2: 90, y2: 54 }, // kakak — suami kakak
    { x1: 18, y1: 54, x2: 18, y2: 78, arrow: true }, // child of abang couple
    { x1: 82, y1: 54, x2: 82, y2: 78, arrow: true }, // child of kakak couple

  ],
},


  ],
};
