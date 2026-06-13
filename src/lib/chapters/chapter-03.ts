import type { ChapterContent } from "./types";
export const chapter03: ChapterContent = {
  id: 3,
  revision: 3,
  title: { ms: "Kaunter", en: "Counter", es: "Mostrador" },


pages: [
    // Page 1 (KAUNTER + Jenis Kaunter di Malaysia)
// Page 1: JENIS KAUNTER DI MALAYSIA
{
  id: "p1-jenis-kaunter",
  kind: "iconRows",
  title: {
    ms: "Jenis Kaunter di Malaysia",
    en: "Types of counters in Malaysia",
    es: "Tipos de mostradores en Malasia",
  },
  rows: [
    {
      id: "r-kaunter-perpustakaan",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Perpustakaan.webp",
      iconAlt: {
        ms: "Ikon kaunter perpustakaan",
        en: "Library counter icon",
        es: "Icono del mostrador de biblioteca",
      },
      name: { ms: "Kaunter perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" },
      description: {
        ms: "Untuk meminjam dan memulangkan buku",
        en: "To borrow and return books",
        es: "Para pedir prestados y devolver libros",
      },
    },
    {
      id: "r-kaunter-pertanyaan",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Pertanyaan.webp",
      iconAlt: {
        ms: "Ikon kaunter pertanyaan",
        en: "Information counter icon",
        es: "Icono del mostrador de información",
      },
      name: { ms: "Kaunter pertanyaan", en: "Information counter", es: "Mostrador de información" },
      description: {
        ms: "Untuk bertanya tentang sesuatu yang berkaitan",
        en: "To ask about something related",
        es: "Para preguntar sobre algo relacionado",
      },
    },
    {
      id: "r-kaunter-tiket-bas",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Bas.webp",
      iconAlt: {
        ms: "Ikon kaunter tiket bas",
        en: "Bus ticket counter icon",
        es: "Icono del mostrador de boletos de autobús",
      },
      name: { ms: "Kaunter tiket bas", en: "Bus ticket counter", es: "Mostrador de boletos de autobús" },
      description: { ms: "Untuk membeli tiket bas", en: "To buy bus tickets", es: "Para comprar boletos de autobús" },
    },
    {
      id: "r-kaunter-pembayaran",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Bayar.webp",
      iconAlt: {
        ms: "Ikon kaunter pembayaran",
        en: "Payment counter icon",
        es: "Icono del mostrador de pagos",
      },
      name: { ms: "Kaunter pembayaran", en: "Payment counter", es: "Mostrador de pagos" },
      description: { ms: "Untuk membuat pembayaran", en: "To make a payment", es: "Para realizar un pago" },
    },
    {
      id: "r-kaunter-pos",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Pos.webp",
      iconAlt: {
        ms: "Ikon kaunter pos",
        en: "Post office counter icon",
        es: "Icono del mostrador de correos",
      },
      name: { ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" },
      description: {
        ms: "Untuk sebarang urusan pos dan pembayaran bil",
        en: "For postal matters and bill payments",
        es: "Para trámites postales y pago de facturas",
      },
    },
    {
      id: "r-kaunter-ubat-farmasi",
      iconSrc: "/assets/chapters/ch3/ch3_Icon_Farmasi.webp",
      iconAlt: {
        ms: "Ikon kaunter ubat atau farmasi",
        en: "Medicine or pharmacy counter icon",
        es: "Icono del mostrador de medicamentos o farmacia",
      },
      name: { ms: "Kaunter ubat/farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" },
      description: {
        ms: "Untuk sebarang urusan klinikal",
        en: "For clinical matters",
        es: "Para trámites clínicos",
      },
    },
  ],
},

///page 2
{
  id: "p2-perbualan-di-kaunter",
  kind: "table",
  title: {
    ms: "Perbualan di Kaunter",
    en: "Conversation at the counter",
    es: "Conversación en el mostrador",
  },
  columns: [
    { key: "jenis", label: { ms: "Jenis", en: "Type", es: "Tipo" } },
    { key: "pelanggan", label: { ms: "Pelanggan", en: "Customer", es: "Cliente" } },
    { key: "jurukaunter", label: { ms: "Jurukaunter", en: "Counter staff", es: "Personal del mostrador" } },
  ],
  rows: [
    {
      id: "r-ucapan-sapaan",
      cells: {
        jenis: [{ ms: "Ucapan sapaan", en: "Greeting", es: "Saludo" }],
        pelanggan: [
          { ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
          { ms: "Selamat tengah hari", en: "Good afternoon (midday)", es: "Buenas tardes (mediodía)" },
          { ms: "Selamat petang", en: "Good evening", es: "Buenas tardes/noche" },
          { ms: "Assalamualaikum", en: "Assalamualaikum", es: "Assalamualaikum" },
        ],
        jurukaunter: [
          { ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
          { ms: "Selamat tengah hari", en: "Good afternoon (midday)", es: "Buenas tardes (mediodía)" },
          { ms: "Selamat petang", en: "Good evening", es: "Buenas tardes/noche" },
          { ms: "Waalaikumsalam", en: "Waalaikumsalam", es: "Waalaikumsalam" },
        ],
      },
    },
    {
      id: "r-gelaran-sesuai",
      cells: {
        jenis: [{ ms: "Gunakan gelaran yang sesuai", en: "Use an appropriate title", es: "Usa un trato apropiado" }],
        pelanggan: [
          { ms: "Saya", en: "I", es: "Yo" },
          { ms: "Encik", en: "Mr. (sir)", es: "Señor" },
          { ms: "Puan", en: "Mrs./Ms. (madam)", es: "Señora" },
        ],
        jurukaunter: [
          { ms: "Saya", en: "I", es: "Yo" },
          { ms: "Encik", en: "Mr. (sir)", es: "Señor" },
          { ms: "Puan", en: "Mrs./Ms. (madam)", es: "Señora" },
        ],
      },
    },
    {
      id: "r-memulakan-urusan",
      cells: {
        jenis: [{ ms: "Memulakan urusan", en: "Starting the request", es: "Iniciar el trámite" }],
        pelanggan: [
          { ms: "Saya ingin ____________", en: "I would like to ____________", es: "Quisiera ____________" },
        ],
        jurukaunter: [
          {
            ms: "(Bersesuaian dengan permintaan pelanggan)",
            en: "(Responds according to the customer’s request)",
            es: "(Responde según la solicitud del cliente)",
          },
        ],
      },
    },
    {
      id: "r-pertanyaan-jika-ada",
      cells: {
        jenis: [{ ms: "Pertanyaan (jika ada)", en: "Question (if any)", es: "Pregunta (si hay)" }],
        pelanggan: [{ ms: "Bolehkah saya ____________?", en: "May I ____________?", es: "¿Puedo ____________?" }],
        jurukaunter: [{ ms: "Boleh.", en: "Yes, you may.", es: "Sí." }],
      },
    },
    {
      id: "r-ucapan-penghargaan",
      cells: {
        jenis: [{ ms: "Ucapan penghargaan", en: "Appreciation", es: "Agradecimiento" }],
        pelanggan: [{ ms: "Terima kasih.", en: "Thank you.", es: "Gracias." }],
        jurukaunter: [{ ms: "Sama-sama.", en: "You're welcome.", es: "De nada." }],
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
    ms: "Situasi 3.1 Bertanya lokasi tandas",
    en: "Situation 3.1 Asking where the toilet is",
    es: "Situación 3.1 Preguntar dónde está el baño",
  },
  context: {
    ms: "Latar tempat: Di kaunter pertanyaan sebuah pusat membeli-belah",
    en: "Setting: At a shopping mall information counter",
    es: "Lugar: En el mostrador de información de un centro comercial",
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
        ms: "Selamat pagi. Tumpang tanya, tandas di mana?",
        en: "Good morning. Excuse me, where is the toilet?",
        es: "Buenos días. Disculpe, ¿dónde está el baño?",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Selamat pagi. Tandas di tingkat satu, dekat lif.",
        en: "Good morning. The toilet is on the first floor, near the lift.",
        es: "Buenos días. El baño está en el primer piso, cerca del ascensor.",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Baik. Selepas keluar lif, saya perlu belok ke mana?",
        en: "Alright. After getting out of the lift, where should I turn?",
        es: "Bien. Después de salir del ascensor, ¿hacia dónde debo girar?",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Belok kiri. Tandas di sebelah surau.",
        en: "Turn left. The toilet is next to the prayer room.",
        es: "Gire a la izquierda. El baño está al lado de la sala de oración.",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Oh, dekat surau. Jauh tak dari sini?",
        en: "Oh, near the prayer room. Is it far from here?",
        es: "Ah, cerca de la sala de oración. ¿Está lejos de aquí?",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Tak jauh. Naik lif, kemudian jalan terus sedikit.",
        en: "Not far. Take the lift, then walk straight a little.",
        es: "No está lejos. Tome el ascensor y luego camine un poco recto.",
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
    ms: "Situasi 3.2 Membayar di restoran",
    en: "Situation 3.2 Paying at a restaurant",
    es: "Situación 3.2 Pagar en un restaurante",
  },
  context: {
    ms: "Latar tempat: Di kaunter pembayaran sebuah restoran",
    en: "Setting: At a restaurant payment counter",
    es: "Lugar: En el mostrador de pago de un restaurante",
  },
  participants: [
    {
      id: "me",
      name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" },
    },
    {
      id: "juruwang",
      name: { ms: "Juruwang", en: "Cashier", es: "Cajero/a" },
    },
  ],
  messages: [
    {
      id: "m1",
      from: "me",
      text: {
        ms: "Selamat petang. Saya nak bayar nasi lemak satu.",
        en: "Good evening. I want to pay for one nasi lemak.",
        es: "Buenas tardes. Quiero pagar un nasi lemak.",
      },
    },
    {
      id: "m2",
      from: "juruwang",
      text: {
        ms: "Baik. Jumlahnya RM4.50. Bayar tunai atau QR?",
        en: "Alright. The total is RM4.50. Cash or QR?",
        es: "Muy bien. El total es RM4.50. ¿Efectivo o QR?",
      },
    },
    {
      id: "m3",
      from: "me",
      text: {
        ms: "Tunai. Ini RM5.",
        en: "Cash. Here is RM5.",
        es: "En efectivo. Aquí tiene RM5.",
      },
    },
    {
      id: "m4",
      from: "juruwang",
      text: {
        ms: "Terima kasih. Ada 50 sen?",
        en: "Thank you. Do you have 50 sen?",
        es: "Gracias. ¿Tiene 50 sen?",
      },
    },
    {
      id: "m5",
      from: "me",
      text: {
        ms: "Tak ada. Baki 50 sen pun boleh.",
        en: "No. 50 sen change is fine too.",
        es: "No. El cambio de 50 sen está bien.",
      },
    },
    {
      id: "m6",
      from: "juruwang",
      text: {
        ms: "Baik. Ini baki 50 sen.",
        en: "Alright. Here is your 50 sen change.",
        es: "Muy bien. Aquí tiene sus 50 sen de cambio.",
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
    ms: "Susun semula huruf untuk membentuk nama enam jenis kaunter. Taip jawapan anda.",
    en: "Unscramble the letters to form the names of the six counter types. Type your answers.",
    es: "Ordena las letras para formar los nombres de los seis tipos de mostrador. Escribe tus respuestas.",
  },
  caseSensitive: false,
  items: [
    {
      id: "l1-1",
      n: 1,
      scrambled: "retunka naakatsuprep",
      answer: "kaunter perpustakaan",
      meaning: { ms: "Kaunter perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" },
    },
    {
      id: "l1-2",
      n: 2,
      scrambled: "retunka nayaantrep",
      answer: "kaunter pertanyaan",
      meaning: { ms: "Kaunter pertanyaan", en: "Information counter", es: "Mostrador de información" },
    },
    {
      id: "l1-3",
      n: 3,
      scrambled: "retunka tekit sab",
      answer: "kaunter tiket bas",
      meaning: { ms: "Kaunter tiket bas", en: "Bus ticket counter", es: "Mostrador de boletos de autobús" },
    },
    {
      id: "l1-4",
      n: 4,
      scrambled: "retunka narayabmep",
      answer: "kaunter pembayaran",
      meaning: { ms: "Kaunter pembayaran", en: "Payment counter", es: "Mostrador de pagos" },
    },
    {
      id: "l1-5",
      n: 5,
      scrambled: "retunka sop",
      answer: "kaunter pos",
      meaning: { ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" },
    },
    {
      id: "l1-6",
      n: 6,
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
    ms: "Tandakan lima jenis kaunter yang ditemui dalam kata bersilang di bawah.",
    en: "Find and mark the five types of counters hidden in the word search below.",
    es: "Encuentra y marca los cinco tipos de mostrador escondidos en la sopa de letras.",
  },
  grid: [
    "LGIMTHARSAREK",
    "EPAPUTKGERUNT",
    "SEKOLAMIKYADI",
    "DAGSINGNYABAK",
    "FARMASILMTADE",
    "KLHAIBELISNAT",
    "NURSILGKAYKPA",
    "PERPUSTAKAANP",
  ],
  targets: [
    {
      id: "perpustakaan",
      words: ["PERPUSTAKAAN"],
      label: { ms: "Perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" },
    },
    {
      id: "farmasi",
      words: ["FARMASI"],
      label: { ms: "Farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" },
    },
    {
      id: "bank",
      words: ["BANK"],
      label: { ms: "Bank", en: "Bank counter", es: "Mostrador de banco" },
    },
    {
      id: "pos",
      words: ["POS"],
      label: { ms: "Pos", en: "Post office counter", es: "Mostrador de correos" },
    },
    {
      id: "tiket-bas",
      words: ["TIKET", "BAS"], // user must find BOTH to complete this target
      label: { ms: "Tiket bas", en: "Bus ticket counter", es: "Mostrador de boletos de bus" },
    },
  ],
  allowDiagonal: true,
  allowReverse: true,
},


],
}
