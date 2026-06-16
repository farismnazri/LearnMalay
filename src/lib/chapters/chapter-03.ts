import type { ChapterContent } from "./types";
export const chapter03: ChapterContent = {
  id: 3,
  revision: 5,
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
        ms: "Kaunter penting",
        en: "Important counters",
        es: "Mostradores importantes",
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
          id: "r-kaunter-tiket",
          ms: "Kaunter tiket — untuk membeli tiket",
          en: "Ticket counter — to buy tickets",
          es: "Mostrador de boletos — para comprar boletos",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Bas.webp",
          imageAlt: {
            ms: "Ikon kaunter tiket",
            en: "Ticket counter icon",
            es: "Icono del mostrador de boletos",
          },
        },
        {
          id: "r-kaunter-bayaran",
          ms: "Kaunter bayaran — untuk membuat bayaran",
          en: "Payment counter — to make a payment",
          es: "Mostrador de pagos — para hacer un pago",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Bayar.webp",
          imageAlt: {
            ms: "Ikon kaunter bayaran",
            en: "Payment counter icon",
            es: "Icono del mostrador de pagos",
          },
        },
      ],
    },
    {
      kind: "list",
      id: "kaunter-tambahan",
      title: {
        ms: "Kaunter tambahan",
        en: "Additional counters",
        es: "Mostradores adicionales",
      },
      columns: 2,
      listDisplay: "compactImageList",
      items: [
        {
          id: "r-kaunter-ubat-farmasi",
          ms: "Kaunter farmasi — untuk bertanya tentang ubat",
          en: "Pharmacy counter — to ask about medicine",
          es: "Mostrador de farmacia — para preguntar sobre medicamentos",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Farmasi.webp",
          imageAlt: {
            ms: "Ikon kaunter farmasi",
            en: "Pharmacy counter icon",
            es: "Icono del mostrador de farmacia",
          },
        },
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
          id: "r-kaunter-pos",
          ms: "Kaunter pos — untuk menghantar surat atau bungkusan",
          en: "Post office counter — to send letters or parcels",
          es: "Mostrador de correos — para enviar cartas o paquetes",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Pos.webp",
          imageAlt: {
            ms: "Ikon kaunter pos",
            en: "Post office counter icon",
            es: "Icono del mostrador de correos",
          },
        },
        {
          id: "r-kaunter-pendaftaran",
          ms: "Kaunter pendaftaran — untuk mendaftar nama atau temu janji",
          en: "Registration counter — to register your name or an appointment",
          es: "Mostrador de registro — para registrar tu nombre o una cita",
          imageSrc: "/assets/chapters/ch3/ch3_Icon_Pendaftaran.webp",
          imageAlt: {
            ms: "Ikon kaunter pendaftaran",
            en: "Registration counter icon",
            es: "Icono del mostrador de registro",
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
    ms: "Apa yang awak mahu buat?",
    en: "What do you want to do?",
    es: "¿Qué quieres hacer?",
  },
  leadCard: {
    heading: {
      ms: "Pola ayat",
      en: "Sentence pattern",
      es: "Patrón de oración",
    },
    body: {
      ms: "Gunakan “Saya mahu...” di kaunter.",
      en: "Use “I want to...” at the counter.",
      es: "Usa “Quiero...” en el mostrador.",
    },
  },
  columns: [
    { key: "icon", label: { ms: "Ikon", en: "Icon", es: "Icono" } },
    { key: "counter", label: { ms: "Kaunter", en: "Counter", es: "Mostrador" } },
    { key: "sentence", label: { ms: "Ayat", en: "Sentence", es: "Frase" } },
  ],
  rows: [
    {
      id: "r-kaunter-pertanyaan-bantuan",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Pertanyaan.webp",
            alt: {
              ms: "Ikon kaunter pertanyaan",
              en: "Information counter icon",
              es: "Icono del mostrador de información",
            },
          },
        ],
        counter: [{ ms: "Kaunter pertanyaan", en: "Information counter", es: "Mostrador de información" }],
        sentence: [
          {
            ms: "Saya mahu minta bantuan.",
            en: "I want to ask for help.",
            es: "Quiero pedir ayuda.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-bayaran-bayar",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Bayar.webp",
            alt: {
              ms: "Ikon kaunter bayaran",
              en: "Payment counter icon",
              es: "Icono del mostrador de pagos",
            },
          },
        ],
        counter: [{ ms: "Kaunter bayaran", en: "Payment counter", es: "Mostrador de pagos" }],
        sentence: [
          {
            ms: "Saya mahu bayar.",
            en: "I want to pay.",
            es: "Quiero pagar.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-tiket-beli",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Bas.webp",
            alt: {
              ms: "Ikon kaunter tiket",
              en: "Ticket counter icon",
              es: "Icono del mostrador de boletos",
            },
          },
        ],
        counter: [{ ms: "Kaunter tiket", en: "Ticket counter", es: "Mostrador de boletos" }],
        sentence: [
          {
            ms: "Saya mahu beli tiket.",
            en: "I want to buy a ticket.",
            es: "Quiero comprar un boleto.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-pendaftaran-daftar",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Pendaftaran.webp",
            alt: {
              ms: "Ikon kaunter pendaftaran",
              en: "Registration counter icon",
              es: "Icono del mostrador de registro",
            },
          },
        ],
        counter: [{ ms: "Kaunter pendaftaran", en: "Registration counter", es: "Mostrador de registro" }],
        sentence: [
          {
            ms: "Saya mahu daftar nama.",
            en: "I want to register my name.",
            es: "Quiero registrar mi nombre.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-pos-hantar",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Pos.webp",
            alt: {
              ms: "Ikon kaunter pos",
              en: "Post office counter icon",
              es: "Icono del mostrador de correos",
            },
          },
        ],
        counter: [{ ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" }],
        sentence: [
          {
            ms: "Saya mahu hantar bungkusan.",
            en: "I want to send a parcel.",
            es: "Quiero enviar un paquete.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-perpustakaan-pinjam",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Perpustakaan.webp",
            alt: {
              ms: "Ikon kaunter perpustakaan",
              en: "Library counter icon",
              es: "Icono del mostrador de biblioteca",
            },
          },
        ],
        counter: [{ ms: "Kaunter perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" }],
        sentence: [
          {
            ms: "Saya mahu pinjam buku.",
            en: "I want to borrow a book.",
            es: "Quiero pedir prestado un libro.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
        ],
      },
    },
    {
      id: "r-kaunter-farmasi-beli",
      cells: {
        icon: [
          {
            kind: "image",
            src: "/assets/chapters/ch3/ch3_Icon_Farmasi.webp",
            alt: {
              ms: "Ikon kaunter farmasi",
              en: "Pharmacy counter icon",
              es: "Icono del mostrador de farmacia",
            },
          },
        ],
        counter: [{ ms: "Kaunter farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" }],
        sentence: [
          {
            ms: "Saya mahu beli plaster.",
            en: "I want to buy a plaster.",
            es: "Quiero comprar una curita.",
            highlight: { ms: "Saya mahu", en: "I want to", es: "Quiero" },
          },
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
    ms: "Situasi 3.1 Di kaunter pertanyaan",
    en: "Situation 3.1 At the information counter",
    es: "Situación 3.1 En el mostrador de información",
  },
  context: {
    ms: "Latar tempat: Di kaunter pertanyaan",
    en: "Setting: At the information counter",
    es: "Lugar: En el mostrador de información",
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
        ms: "Maaf, boleh saya tanya?",
        en: "Excuse me, may I ask a question?",
        es: "Disculpe, ¿puedo hacer una pregunta?",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Boleh, silakan.",
        en: "Yes, go ahead.",
        es: "Sí, adelante.",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Kaunter tiket di mana?",
        en: "Where is the ticket counter?",
        es: "¿Dónde está el mostrador de boletos?",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Kaunter tiket di sana.",
        en: "The ticket counter is over there.",
        es: "El mostrador de boletos está allí.",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Di sebelah mana?",
        en: "Which side is it on?",
        es: "¿En qué lado está?",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Di sebelah kanan.",
        en: "On the right side.",
        es: "En el lado derecho.",
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
    ms: "Situasi 3.2 Di kaunter tiket",
    en: "Situation 3.2 At the ticket counter",
    es: "Situación 3.2 En el mostrador de boletos",
  },
  context: {
    ms: "Latar tempat: Di kaunter tiket",
    en: "Setting: At the ticket counter",
    es: "Lugar: En el mostrador de boletos",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "pegawai",
      name: { ms: "Petugas kaunter", en: "Counter staff", es: "Personal del mostrador" },
    },
  ],
  messages: [
    {
      id: "m1",
      from: "me",
      text: {
        ms: "Selamat pagi. Saya mahu beli tiket.",
        en: "Good morning. I want to buy a ticket.",
        es: "Buenos días. Quiero comprar un boleto.",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Selamat pagi. Tiket ke mana?",
        en: "Good morning. A ticket to where?",
        es: "Buenos días. ¿Un boleto para dónde?",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Ke Kajang.",
        en: "To Kajang.",
        es: "A Kajang.",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Satu tiket?",
        en: "One ticket?",
        es: "¿Un boleto?",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Ya, satu tiket.",
        en: "Yes, one ticket.",
        es: "Sí, un boleto.",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Baik. Harganya RM3.",
        en: "Alright. It costs RM3.",
        es: "Bien. Cuesta RM3.",
      },
    },
    {
      id: "m7",
      from: "me",
      text: {
        ms: "Baik. Ini RM3.",
        en: "Alright. Here is RM3.",
        es: "Bien. Aquí tiene RM3.",
      },
    },
    {
      id: "m8",
      from: "pegawai",
      text: {
        ms: "Terima kasih.",
        en: "Thank you.",
        es: "Gracias.",
      },
    },
  ],
},

///page 5 chat

{
  id: "p5-situasi-3-3",
  kind: "chat",
  youId: "me",
  title: {
    ms: "Situasi 3.3 Di kaunter bayaran",
    en: "Situation 3.3 At the payment counter",
    es: "Situación 3.3 En el mostrador de pagos",
  },
  context: {
    ms: "Latar tempat: Di kaunter bayaran",
    en: "Setting: At the payment counter",
    es: "Lugar: En el mostrador de pagos",
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
        ms: "Maaf, saya mahu bayar.",
        en: "Excuse me, I want to pay.",
        es: "Disculpe, quiero pagar.",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Baik. Bayar untuk apa?",
        en: "Alright. What are you paying for?",
        es: "Bien. ¿Para qué va a pagar?",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Untuk buku ini.",
        en: "For this book.",
        es: "Por este libro.",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Baik. Harganya RM10.",
        en: "Alright. It costs RM10.",
        es: "Bien. Cuesta RM10.",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Boleh bayar tunai?",
        en: "Can I pay in cash?",
        es: "¿Puedo pagar en efectivo?",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Boleh.",
        en: "Yes, you can.",
        es: "Sí, puede.",
      },
    },
    {
      id: "m7",
      from: "me",
      text: {
        ms: "Ini RM10. Terima kasih.",
        en: "Here is RM10. Thank you.",
        es: "Aquí tiene RM10. Gracias.",
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

///latuhan 1

{
  id: "p-latihan-1",
  kind: "typein",
  title: { ms: "Latihan 1", en: "Exercise 1", es: "Ejercicio 1" },
  instructions: {
    ms: "Susun semula huruf untuk membentuk nama kaunter. Taip jawapan anda.",
    en: "Unscramble the letters to form the counter names. Type your answers.",
    es: "Ordena las letras para formar los nombres de los mostradores. Escribe tus respuestas.",
  },
  caseSensitive: false,
  items: [
    {
      id: "l1-1",
      n: 1,
      scrambled: "naayantrep",
      answer: "pertanyaan",
      meaning: { ms: "Pertanyaan", en: "Information", es: "Información" },
    },
    {
      id: "l1-2",
      n: 2,
      scrambled: "nabayara",
      answer: "bayaran",
      meaning: { ms: "Bayaran", en: "Payment", es: "Pago" },
    },
    {
      id: "l1-3",
      n: 3,
      scrambled: "kiett",
      answer: "tiket",
      meaning: { ms: "Tiket", en: "Ticket", es: "Boleto" },
    },
    {
      id: "l1-4",
      n: 4,
      scrambled: "natadfarpne",
      answer: "pendaftaran",
      meaning: { ms: "Pendaftaran", en: "Registration", es: "Registro" },
    },
    {
      id: "l1-5",
      n: 5,
      scrambled: "sop",
      answer: "pos",
      meaning: { ms: "Pos", en: "Post", es: "Correo" },
    },
    {
      id: "l1-6",
      n: 6,
      scrambled: "kaatrupsuepan",
      answer: "perpustakaan",
      meaning: { ms: "Perpustakaan", en: "Library", es: "Biblioteca" },
    },
    {
      id: "l1-7",
      n: 7,
      scrambled: "sfamaira",
      answer: "farmasi",
      meaning: { ms: "Farmasi", en: "Pharmacy", es: "Farmacia" },
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
    ms: "Cari tujuh nama kaunter yang sudah dipelajari.",
    en: "Find the seven counter names you learned.",
    es: "Encuentra los siete nombres de mostrador que aprendiste.",
  },
  autoGenerate: true,
  size: 14,
  targets: [
    {
      id: "pertanyaan",
      words: ["PERTANYAAN"],
      label: { ms: "Pertanyaan", en: "Information", es: "Información" },
    },
    {
      id: "bayaran",
      words: ["BAYARAN"],
      label: { ms: "Bayaran", en: "Payment", es: "Pago" },
    },
    {
      id: "tiket",
      words: ["TIKET"],
      label: { ms: "Tiket", en: "Ticket", es: "Boleto" },
    },
    {
      id: "pendaftaran",
      words: ["PENDAFTARAN"],
      label: { ms: "Pendaftaran", en: "Registration", es: "Registro" },
    },
    {
      id: "pos",
      words: ["POS"],
      label: { ms: "Pos", en: "Post", es: "Correo" },
    },
    {
      id: "perpustakaan",
      words: ["PERPUSTAKAAN"],
      label: { ms: "Perpustakaan", en: "Library", es: "Biblioteca" },
    },
    {
      id: "farmasi",
      words: ["FARMASI"],
      label: { ms: "Farmasi", en: "Pharmacy", es: "Farmacia" },
    },
  ],
  allowDiagonal: true,
  allowReverse: true,
},


],
}
