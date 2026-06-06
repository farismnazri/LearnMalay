import type { ChapterContent } from "./types";
export const chapter03: ChapterContent = {
  id: 3,
  revision: 1,
  title: { ms: "Kaunter", en: "Counter", es: "Mostrador" },


pages: [
    // Page 1 (KAUNTER + Jenis Kaunter di Malaysia)
// Page 1: JENIS KAUNTER DI MALAYSIA (table)
{
  id: "p1-jenis-kaunter",
  kind: "table",
  title: {
    ms: "Jenis Kaunter di Malaysia",
    en: "Types of counters in Malaysia",
    es: "Tipos de mostradores en Malasia",
  },
  columns: [
    { key: "nama", label: { ms: "Nama Kaunter", en: "Counter name", es: "Nombre del mostrador" } },
    { key: "tujuan", label: { ms: "Tujuan", en: "Purpose", es: "Propósito" } },
  ],
  rows: [
    {
      id: "r-kaunter-pendaftaran",
      cells: {
        nama: [{ ms: "Kaunter pendaftaran", en: "Registration counter", es: "Mostrador de registro" }],
        tujuan: [
          { ms: "Untuk mendaftarkan sesuatu.", en: "To register something.", es: "Para registrar algo." },
          {
            ms: "Contoh: Kaunter pendaftaran universiti",
            en: "Example: university registration counter",
            es: "Ejemplo: registro de la universidad",
          },
        ],
      },
    },
    {
      id: "r-kaunter-perpustakaan",
      cells: {
        nama: [{ ms: "Kaunter perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" }],
        tujuan: [
          {
            ms: "Untuk meminjam dan memulangkan buku",
            en: "To borrow and return books",
            es: "Para pedir prestados y devolver libros",
          },
        ],
      },
    },
    {
      id: "r-kaunter-pertanyaan",
      cells: {
        nama: [{ ms: "Kaunter pertanyaan", en: "Information counter", es: "Mostrador de información" }],
        tujuan: [
          {
            ms: "Untuk bertanya tentang sesuatu yang berkaitan",
            en: "To ask about something related",
            es: "Para preguntar sobre algo relacionado",
          },
          {
            ms: "Contoh: Kaunter pertanyaan di pusat membeli-belah",
            en: "Example: information counter at a shopping mall",
            es: "Ejemplo: mostrador de información en un centro comercial",
          },
        ],
      },
    },
    {
      id: "r-kaunter-tiket-bas",
      cells: {
        nama: [{ ms: "Kaunter tiket bas", en: "Bus ticket counter", es: "Mostrador de boletos de autobús" }],
        tujuan: [{ ms: "Untuk membeli tiket bas", en: "To buy bus tickets", es: "Para comprar boletos de autobús" }],
      },
    },
    {
      id: "r-kaunter-pembayaran",
      cells: {
        nama: [{ ms: "Kaunter pembayaran", en: "Payment counter", es: "Mostrador de pagos" }],
        tujuan: [{ ms: "Untuk membuat pembayaran", en: "To make a payment", es: "Para realizar un pago" }],
      },
    },
    {
      id: "r-kaunter-bank",
      cells: {
        nama: [{ ms: "Kaunter bank", en: "Bank counter", es: "Mostrador del banco" }],
        tujuan: [{ ms: "Untuk urusan perbankan", en: "For banking matters", es: "Para trámites bancarios" }],
      },
    },
    {
      id: "r-kaunter-pos",
      cells: {
        nama: [{ ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" }],
        tujuan: [
          {
            ms: "Untuk sebarang urusan pos dan pembayaran bil",
            en: "For postal matters and bill payments",
            es: "Para trámites postales y pago de facturas",
          },
        ],
      },
    },
    {
      id: "r-kaunter-ubat-farmasi",
      cells: {
        nama: [{ ms: "Kaunter ubat/farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" }],
        tujuan: [
          {
            ms: "Untuk sebarang urusan klinikal",
            en: "For clinical matters",
            es: "Para trámites clínicos",
          },
        ],
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
  title: {
    ms: "Situasi 3.1 Urusan di kaunter pendaftaran Universiti",
    en: "Situation 3.1 At the university registration counter",
    es: "Situación 3.1 En el mostrador de registro de la universidad",
  },
  context: {
    ms: "Latar tempat: Di kaunter pendaftaran sebuah universiti",
    en: "Setting: At a university registration counter",
    es: "Lugar: En el mostrador de registro de una universidad",
  },
  participants: [
    {
      id: "azman",
      name: { ms: "Azman", en: "Azman", es: "Azman" },
    },
    {
      id: "pegawai",
      name: {
        ms: "Pegawai universiti",
        en: "University staff",
        es: "Personal de la universidad",
      },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
      // Optional: add an avatar later when you have it locally
      // avatarSrc: "/assets/characters/....png",
    },
  ],
  messages: [
    {
      id: "m1",
      from: "azman",
      text: {
        ms: "Selamat pagi, encik. Saya mahu daftar bengkel komunikasi Bahasa Melayu.",
        en: "Good morning, sir. I want to register for a Malay communication workshop.",
        es: "Buenos días, señor. Quiero registrarme en un taller de comunicación en malayo.",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Selamat pagi. Baik, silakan duduk. Awak pelajar baharu?",
        en: "Good morning. Alright, please sit. Are you a new student?",
        es: "Buenos días. Bien, por favor siéntate. ¿Eres estudiante nuevo?",
      },
    },
    {
      id: "m3",
      from: "azman",
      text: {
        ms: "Ya, saya pelajar baharu semester ini.",
        en: "Yes, I am a new student this semester.",
        es: "Sí, soy estudiante nuevo este semestre.",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Bagus. Sila isi borang pendaftaran ringkas ini dahulu.",
        en: "Good. Please fill in this short registration form first.",
        es: "Bien. Primero completa este formulario breve de registro.",
      },
    },
    {
      id: "m5",
      from: "azman",
      text: {
        ms: "Encik, ruang \"kod kursus\" perlu isi sekarang?",
        en: "Sir, do I need to fill in the 'course code' field now?",
        es: "Señor, ¿necesito llenar ahora el campo 'código del curso'?",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Ya. Kalau belum pasti, tulis \"akan diberi\".",
        en: "Yes. If you are not sure yet, write 'to be given'.",
        es: "Sí. Si aún no estas seguro, escribe 'se dara después'.",
      },
    },
    {
      id: "m7",
      from: "azman",
      text: {
        ms: "Baik, ini borang saya yang sudah lengkap.",
        en: "Alright, here is my completed form.",
        es: "Bien, aquí está mi formulario completo.",
      },
    },
    {
      id: "m8",
      from: "pegawai",
      text: {
        ms: "Terima kasih. Pendaftaran bengkel awak sudah selesai.",
        en: "Thank you. Your workshop registration is complete.",
        es: "Gracias. Tu registro del taller ya está completo.",
      },
    },
    {
      id: "m9",
      from: "azman",
      text: {
        ms: "Saya perlu bawa apa-apa pada hari pertama?",
        en: "Do I need to bring anything on the first day?",
        es: "¿Necesito traer algo el primer día?",
      },
    },
    {
      id: "m10",
      from: "pegawai",
      text: {
        ms: "Bawa kad pelajar sahaja. Jumpa Isnin pukul 10 pagi.",
        en: "Bring your student card only. See you Monday at 10 a.m.",
        es: "Trae solo tu tarjeta de estudiante. Nos vemos el lunes a las 10 a. m.",
      },
    },
  ],
},

///page 4 chat

{
  id: "p4-situasi-3-3",
  kind: "chat",
  title: {
    ms: "Situasi 3.3 Urusan di kaunter kedai makan",
    en: "Situation 3.3 At a food shop counter",
    es: "Situación 3.3 En el mostrador de comida",
  },
  context: {
    ms: "Latar tempat: Di kaunter kedai makan",
    en: "Setting: At a food shop counter",
    es: "Lugar: En el mostrador de una tienda/restaurante",
  },
  participants: [
    {
      id: "azman",
      name: { ms: "Azman", en: "Azman", es: "Azman" },
    },
    {
      id: "juruwang",
      name: { ms: "Juruwang", en: "Cashier", es: "Cajero/a" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
    {
      id: "jurukaunter",
      name: { ms: "Jurukaunter", en: "Counter staff", es: "Personal del mostrador" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    {
      id: "m1",
      from: "juruwang",
      text: {
        ms: "Selamat petang. Encik makan di sini atau bungkus?",
        en: "Good evening. Will you dine in or take away?",
        es: "Buenas tardes. ¿Va a comer aquí o para llevar?",
      },
    },
    {
      id: "m2",
      from: "azman",
      text: {
        ms: "Makan di sini.",
        en: "Dine in.",
        es: "Para comer aquí.",
      },
    },
    {
      id: "m3",
      from: "juruwang",
      text: {
        ms: "Baik. Encik hendak pesan apa?",
        en: "Alright. What would you like to order?",
        es: "Muy bien. ¿Qué desea pedir?",
      },
    },
    {
      id: "m4",
      from: "azman",
      text: {
        ms: "Satu nasi ayam dan satu teh ais kurang manis.",
        en: "One chicken rice and one iced tea with less sugar.",
        es: "Un arroz con pollo y un te helado con menos azucar.",
      },
    },
    {
      id: "m5",
      from: "juruwang",
      text: {
        ms: "Teh ais atau teh panas? Maaf, saya kurang jelas tadi.",
        en: "Iced tea or hot tea? Sorry, I did not hear clearly just now.",
        es: "Te helado o te caliente? Lo siento, no escuche bien hace un momento.",
      },
    },
    {
      id: "m6",
      from: "azman",
      text: {
        ms: "Teh ais, kurang manis.",
        en: "Iced tea, less sugar.",
        es: "Te helado, con menos azucar.",
      },
    },
    {
      id: "m7",
      from: "juruwang",
      text: {
        ms: "Baik. Jumlahnya RM9.00. Bayar tunai atau QR?",
        en: "Alright. The total is RM9.00. Cash or QR payment?",
        es: "Muy bien. El total es RM9.00. ¿Paga en efectivo o con QR?",
      },
    },
    {
      id: "m8",
      from: "azman",
      text: {
        ms: "QR. Ini, saya dah bayar.",
        en: "QR. Here, I have paid.",
        es: "QR. Aquí, ya pague.",
      },
    },
    {
      id: "m9",
      from: "juruwang",
      text: {
        ms: "Terima kasih. Simpan resit ini. Nombor giliran encik 18.",
        en: "Thank you. Keep this receipt. Your queue number is 18.",
        es: "Gracias. Guarde este recibo. Su número de turno es 18.",
      },
    },
    {
      id: "m10",
      from: "jurukaunter",
      text: {
        ms: "Nombor 18, nasi ayam dan teh ais kurang manis.",
        en: "Number 18, chicken rice and iced tea less sugar.",
        es: "Numero 18, arroz con pollo y te helado con menos azucar.",
      },
    },
    {
      id: "m11",
      from: "azman",
      text: {
        ms: "Ya, saya. Terima kasih.",
        en: "Yes, that's me. Thank you.",
        es: "Sí, soy yo. Gracias.",
      },
    },
    {
      id: "m12",
      from: "jurukaunter",
      text: {
        ms: "Sama-sama. Selamat menjamu selera.",
        en: "You're welcome. Enjoy your meal.",
        es: "De nada. Que disfrute su comida.",
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
    ms: "Susun semula huruf di bawah menjadi perkataan yang bermakna. Taip jawapan anda.",
    en: "Unscramble the letters below into meaningful words. Type your answers.",
    es: "Ordena las letras para formar palabras con sentido. Escribe tus respuestas.",
  },
  caseSensitive: false,
  items: [
    {
      id: "l1-1",
      n: 1,
      scrambled: "pnamji",
      answer: "pinjam",
      meaning: { ms: "pinjam", en: "borrow", es: "pedir prestado" },
    },
    {
      id: "l1-2",
      n: 2,
      scrambled: "kuub",
      answer: "buku",
      meaning: { ms: "buku", en: "book", es: "libro" },
    },
    {
      id: "l1-3",
      n: 3,
      scrambled: "atwle",
      answer: "lewat",
      meaning: { ms: "lewat", en: "late", es: "tarde" },
    },
    {
      id: "l1-4",
      n: 4,
      scrambled: "ddean",
      answer: "denda",
      meaning: { ms: "denda", en: "fine / penalty", es: "multa" },
    },
    {
      id: "l1-5",
      n: 5,
      scrambled: "iahr",
      answer: "hari",
      meaning: { ms: "hari", en: "day", es: "día" },
    },
    {
      id: "l1-6",
      n: 6,
      scrambled: "yanta",
      answer: "tanya",
      meaning: { ms: "tanya", en: "ask", es: "preguntar" },
    },
    {
      id: "l1-7",
      n: 7,
      scrambled: "nepsa",
      answer: "pesan",
      meaning: { ms: "pesan", en: "order", es: "pedir / ordenar" },
    },
    {
      id: "l1-8",
      n: 8,
      scrambled: "rimaet hiska",
      answer: "terima kasih",
      meaning: { ms: "terima kasih", en: "thank you", es: "gracias" },
    },
    {
      id: "l1-9",
      n: 9,
      scrambled: "ubnta",
      answer: "bantu",
      meaning: { ms: "bantu", en: "help", es: "ayudar" },
    },
    {
      id: "l1-10",
      n: 10,
      scrambled: "masa-masa",
      answer: "sama-sama",
      meaning: { ms: "sama-sama", en: "you're welcome", es: "de nada" },
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
