import type { ChapterContent } from "./types";
export const chapter03: ChapterContent = {
  id: 3,
  revision: 4,
  title: { ms: "Kaunter", en: "Counter", es: "Mostrador" },


pages: [
    // Page 1 (KAUNTER + Jenis Kaunter di Malaysia)
// Page 1: JENIS KAUNTER DI MALAYSIA
{
  id: "p1-jenis-kaunter",
  kind: "intro",
  sections: [
    {
      kind: "list",
      id: "kaunter-utama",
      title: {
        ms: "Kaunter utama: gunakan dalam bab ini",
        en: "Essential counters: use these in this chapter",
        es: "Mostradores esenciales: úsalos en este capítulo",
      },
      columns: 2,
      listDisplay: "compactImageList",
      items: [
        {
          id: "r-kaunter-pertanyaan",
          ms: "Kaunter pertanyaan — untuk bertanya atau meminta bantuan",
          en: "Information counter — to ask a question or request help",
          es: "Mostrador de información — para preguntar o pedir ayuda",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Pertanyaan.webp",
          imageAlt: {
            ms: "Ikon kaunter pertanyaan",
            en: "Information counter icon",
            es: "Icono del mostrador de información",
          },
        },
        {
          id: "r-kaunter-pos",
          ms: "Kaunter pos — untuk menghantar surat atau bungkusan",
          en: "Post office counter — to send a letter or parcel",
          es: "Mostrador de correos — para enviar una carta o un paquete",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Pos.webp",
          imageAlt: {
            ms: "Ikon kaunter pos",
            en: "Post office counter icon",
            es: "Icono del mostrador de correos",
          },
        },
        {
          id: "r-kaunter-ubat-farmasi",
          ms: "Kaunter ubat/farmasi — untuk meminta bantuan tentang ubat",
          en: "Pharmacy counter — to ask for help with medicine",
          es: "Mostrador de farmacia — para pedir ayuda con medicamentos",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Farmasi.webp",
          imageAlt: {
            ms: "Ikon kaunter ubat atau farmasi",
            en: "Medicine or pharmacy counter icon",
            es: "Icono del mostrador de medicamentos o farmacia",
          },
        },
      ],
    },
    {
      kind: "list",
      id: "kaunter-tambahan",
      title: {
        ms: "Kaunter tambahan: kenal sahaja",
        en: "Extra counters: recognize these",
        es: "Mostradores adicionales: solo reconócelos",
      },
      columns: 2,
      listDisplay: "compactImageList",
      items: [
        {
          id: "r-kaunter-perpustakaan",
          ms: "Kaunter perpustakaan — untuk meminjam atau memulangkan buku",
          en: "Library counter — to borrow or return books",
          es: "Mostrador de biblioteca — para pedir prestados o devolver libros",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Perpustakaan.webp",
          imageAlt: {
            ms: "Ikon kaunter perpustakaan",
            en: "Library counter icon",
            es: "Icono del mostrador de biblioteca",
          },
        },
        {
          id: "r-kaunter-tiket",
          ms: "Kaunter tiket",
          en: "Ticket counter",
          es: "Mostrador de boletos",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Bas.webp",
          imageAlt: {
            ms: "Ikon kaunter tiket",
            en: "Ticket counter icon",
            es: "Icono del mostrador de boletos",
          },
        },
        {
          id: "r-kaunter-bayaran",
          ms: "Kaunter bayaran",
          en: "Payment counter",
          es: "Mostrador de pagos",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Bayar.webp",
          imageAlt: {
            ms: "Ikon kaunter bayaran",
            en: "Payment counter icon",
            es: "Icono del mostrador de pagos",
          },
        },
      ],
    },
  ],
},

///page 2
{
  id: "p2-perbualan-di-kaunter",
  kind: "table",
  title: {
    ms: "Frasa Berguna di Kaunter",
    en: "Useful Phrases at a Counter",
    es: "Frases Útiles en un Mostrador",
  },
  leadCard: {
    heading: {
      ms: "Gunakan frasa yang sesuai",
      en: "Choose a useful phrase",
      es: "Elige una frase útil",
    },
    body: {
      ms: "Mulakan dengan sopan, nyatakan apa yang mahu ditanya, kemudian ucap terima kasih.",
      en: "Start politely, say what you want to ask, then say thank you.",
      es: "Empieza con cortesía, di qué quieres preguntar y luego da las gracias.",
    },
  },
  columns: [
    { key: "jenis", label: { ms: "Kegunaan", en: "Use", es: "Uso" } },
    { key: "frasa", label: { ms: "Frasa berguna", en: "Useful phrases", es: "Frases útiles" } },
  ],
  rows: [
    {
      id: "r-ucapan-sapaan",
      cells: {
        jenis: [{ ms: "Mulakan dengan sopan", en: "Start politely", es: "Empieza con cortesía" }],
        frasa: [{ ms: "Maaf, saya mahu tanya.", en: "Excuse me, I would like to ask something.", es: "Disculpe, quisiera hacer una pregunta." }],
      },
    },
    {
      id: "r-gelaran-sesuai",
      cells: {
        jenis: [{ ms: "Minta izin untuk bertanya", en: "Ask permission to speak", es: "Pide permiso para preguntar" }],
        frasa: [{ ms: "Boleh saya tanya?", en: "May I ask a question?", es: "¿Puedo hacer una pregunta?" }],
      },
    },
    {
      id: "r-memulakan-urusan",
      cells: {
        jenis: [{ ms: "Nyatakan soalan atau keperluan", en: "State your question or need", es: "Expresa tu pregunta o necesidad" }],
        frasa: [
          { ms: "Saya mahu tanya tentang buku ini.", en: "I want to ask about this book.", es: "Quiero preguntar por este libro." },
          { ms: "Saya perlukan bantuan tentang ubat ini.", en: "I need help with this medicine.", es: "Necesito ayuda con este medicamento." },
        ],
      },
    },
    {
      id: "r-pertanyaan-jika-ada",
      cells: {
        jenis: [{ ms: "Jawapan petugas kaunter", en: "Counter staff responses", es: "Respuestas del personal" }],
        frasa: [
          { ms: "Boleh, silakan.", en: "Yes, go ahead.", es: "Sí, adelante." },
          { ms: "Ya, boleh saya bantu?", en: "Yes, how can I help?", es: "Sí, ¿en qué puedo ayudar?" },
          { ms: "Baik, apa yang awak mahu tanya?", en: "Alright, what would you like to ask?", es: "Bien, ¿qué quieres preguntar?" },
        ],
      },
    },
    {
      id: "r-ucapan-penghargaan",
      cells: {
        jenis: [{ ms: "Tutup dengan sopan", en: "Close politely", es: "Termina con cortesía" }],
        frasa: [
          { ms: "Terima kasih.", en: "Thank you.", es: "Gracias." },
          { ms: "Sama-sama.", en: "You're welcome.", es: "De nada." },
        ],
      },
    },
  ],
},

///page 3 chat

{
  id: "p3-situasi-3-1",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 3.1 Bertanya di perpustakaan",
    en: "Situation 3.1 Asking at the library",
    es: "Situación 3.1 Preguntar en la biblioteca",
  },
  context: {
    ms: "Latar tempat: Di kaunter perpustakaan",
    en: "Setting: At the library counter",
    es: "Lugar: En el mostrador de la biblioteca",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "pegawai",
      name: {
        ms: "Petugas kaunter",
        en: "Counter staff",
        es: "Personal del mostrador",
      },
    },
  ],
  messages: [
    {
      id: "m1",
      from: "me",
      text: {
        ms: "Selamat pagi. Boleh saya tanya?",
        en: "Good morning. May I ask a question?",
        es: "Buenos días. ¿Puedo hacer una pregunta?",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Selamat pagi. Boleh, silakan.",
        en: "Good morning. Yes, go ahead.",
        es: "Buenos días. Sí, adelante.",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Saya mahu tanya tentang buku ini.",
        en: "I want to ask about this book.",
        es: "Quiero preguntar por este libro.",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Baik. Awak mahu pinjam buku ini?",
        en: "Alright. Do you want to borrow this book?",
        es: "Bien. ¿Quiere pedir prestado este libro?",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Ya. Boleh saya pinjam?",
        en: "Yes. May I borrow it?",
        es: "Sí. ¿Puedo pedirlo prestado?",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Boleh. Berikan buku ini kepada saya.",
        en: "Yes. Give me the book.",
        es: "Sí. Déme el libro.",
      },
    },
    {
      id: "m7",
      from: "me",
      text: {
        ms: "Baik, terima kasih.",
        en: "Alright, thank you.",
        es: "Muy bien, gracias.",
      },
    },
    {
      id: "m8",
      from: "pegawai",
      text: {
        ms: "Sama-sama.",
        en: "You're welcome.",
        es: "De nada.",
      },
    },
  ],
},

///page 4 chat

{
  id: "p4-situasi-3-2",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 3.2 Meminta bantuan di farmasi",
    en: "Situation 3.2 Asking for help at a pharmacy",
    es: "Situación 3.2 Pedir ayuda en una farmacia",
  },
  context: {
    ms: "Latar tempat: Di kaunter farmasi",
    en: "Setting: At a pharmacy counter",
    es: "Lugar: En el mostrador de una farmacia",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "juruwang",
      name: { ms: "Petugas farmasi", en: "Pharmacy staff", es: "Personal de farmacia" },
    },
  ],
  messages: [
    {
      id: "m1",
      from: "me",
      text: {
        ms: "Maaf. Boleh saya tanya?",
        en: "Excuse me. May I ask a question?",
        es: "Disculpe. ¿Puedo hacer una pregunta?",
      },
    },
    {
      id: "m2",
      from: "juruwang",
      text: {
        ms: "Boleh. Silakan.",
        en: "Yes. Go ahead.",
        es: "Sí. Adelante.",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Saya perlukan ubat batuk.",
        en: "I need cough medicine.",
        es: "Necesito medicina para la tos.",
      },
    },
    {
      id: "m4",
      from: "juruwang",
      text: {
        ms: "Baik. Ubat untuk orang dewasa?",
        en: "Alright. Medicine for an adult?",
        es: "Bien. ¿Medicina para un adulto?",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Ya, untuk saya.",
        en: "Yes, for me.",
        es: "Sí, para mí.",
      },
    },
    {
      id: "m6",
      from: "juruwang",
      text: {
        ms: "Baik. Saya akan bantu.",
        en: "Alright. I will help.",
        es: "Bien. Le ayudaré.",
      },
    },
    {
      id: "m7",
      from: "me",
      text: {
        ms: "Terima kasih.",
        en: "Thank you.",
        es: "Gracias.",
      },
    },
    {
      id: "m8",
      from: "juruwang",
      text: {
        ms: "Sama-sama.",
        en: "You're welcome.",
        es: "De nada.",
      },
    },
  ],
},

///latuhan 1

{
  id: "p-latihan-1",
  kind: "typein",
  title: { ms: "Latihan 1", en: "Exercise 1", es: "Ejercicio 1" },
  instructions: {
    ms: "Susun semula huruf untuk membentuk nama tiga jenis kaunter utama. Taip jawapan anda.",
    en: "Unscramble the letters to form the names of the three essential counter types. Type your answers.",
    es: "Ordena las letras para formar los nombres de los tres tipos de mostrador principales. Escribe tus respuestas.",
  },
  caseSensitive: false,
  items: [
    {
      id: "l1-2",
      n: 1,
      scrambled: "retunka nayaantrep",
      answer: "kaunter pertanyaan",
      meaning: { ms: "Kaunter pertanyaan", en: "Information counter", es: "Mostrador de información" },
    },
    {
      id: "l1-5",
      n: 2,
      scrambled: "retunka sop",
      answer: "kaunter pos",
      meaning: { ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" },
    },
    {
      id: "l1-6",
      n: 3,
      scrambled: "retunka tabu/isamraf",
      answer: "kaunter ubat/farmasi",
      meaning: { ms: "Kaunter ubat/farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" },
    },
  ],
},

///wordsearch page
{
  id: "p-latihan-2-kata-bersilang",
  kind: "wordsearch",
  title: {
    ms: "Latihan 2: Kata Bersilang",
    en: "Exercise 2: Word Search",
    es: "Ejercicio 2: Sopa de letras",
  },
  instructions: {
    ms: "Cari tiga jenis kaunter utama yang sudah dipelajari.",
    en: "Find the three essential counter types you learned.",
    es: "Encuentra los tres tipos de mostrador principales que aprendiste.",
  },
  autoGenerate: true,
  size: 12,
  targets: [
    {
      id: "farmasi",
      words: ["FARMASI"],
      label: { ms: "Farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" },
    },
    {
      id: "pos",
      words: ["POS"],
      label: { ms: "Pos", en: "Post office counter", es: "Mostrador de correos" },
    },
    {
      id: "pertanyaan",
      words: ["PERTANYAAN"],
      label: { ms: "Pertanyaan", en: "Information counter", es: "Mostrador de información" },
    },
  ],
  allowDiagonal: true,
  allowReverse: true,
},


],
}
