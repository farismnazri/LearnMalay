import type { ChapterContent } from "./types";
export const chapter03: ChapterContent = {
  id: 3,
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
        ms: "Selamat pagi, encik.",
        en: "Good morning, sir.",
        es: "Buenos días, señor.",
      },
    },
    {
      id: "m2",
      from: "pegawai",
      text: {
        ms: "Ya, selamat pagi. Silakan duduk.",
        en: "Yes, good morning. Please have a seat.",
        es: "Sí, buenos días. Por favor, siéntese.",
      },
    },
    {
      id: "m3",
      from: "azman",
      text: {
        ms: "Saya nak mendaftar untuk Kursus Bahasa Melayu.",
        en: "I want to register for a Malay language course.",
        es: "Quiero inscribirme en un curso de malayo.",
      },
    },
    {
      id: "m4",
      from: "pegawai",
      text: {
        ms: "Kursus Bahasa Melayu. Baik, sila isi borang ini dahulu.",
        en: "A Malay language course. Alright, please fill in this form first.",
        es: "Curso de malayo. Muy bien, por favor complete este formulario primero.",
      },
    },
    {
      id: "m5",
      from: "azman",
      text: {
        ms: "Encik, ini borang saya.",
        en: "Sir, here is my form.",
        es: "Señor, aquí está mi formulario.",
      },
    },
    {
      id: "m6",
      from: "pegawai",
      text: {
        ms: "Baik, pendaftaran anda sebagai pelajar sudah pun selesai.",
        en: "Alright, your registration as a student is now complete.",
        es: "Muy bien, su registro como estudiante ya está completo.",
      },
    },
    {
      id: "m7",
      from: "azman",
      text: {
        ms: "Terima kasih, encik.",
        en: "Thank you, sir.",
        es: "Gracias, señor.",
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
        ms: "Selamat petang, encik.",
        en: "Good evening, sir.",
        es: "Buenas tardes/noches, señor.",
      },
    },
    {
      id: "m2",
      from: "azman",
      text: {
        ms: "Selamat petang.",
        en: "Good evening.",
        es: "Buenas tardes/noches.",
      },
    },
    {
      id: "m3",
      from: "juruwang",
      text: {
        ms: "Ya, encik hendak makan di sini atau bungkus?",
        en: "So, would you like to eat here or take away?",
        es: "Entonces, ¿va a comer aquí o para llevar?",
      },
    },
    {
      id: "m4",
      from: "azman",
      text: {
        ms: "Bungkus.",
        en: "Take away.",
        es: "Para llevar.",
      },
    },
    {
      id: "m5",
      from: "juruwang",
      text: {
        ms: "Baiklah. Encik hendak memesan apa?",
        en: "Alright. What would you like to order?",
        es: "Muy bien. ¿Qué desea pedir?",
      },
    },
    {
      id: "m6",
      from: "azman",
      text: {
        ms: "Saya hendak memesan dua ketul ayam goreng, satu gelas air sirap, dan satu bungkus nasi putih.",
        en: "I’d like to order two pieces of fried chicken, a glass of syrup drink (air sirap), and one packet of white rice.",
        es: "Quisiera pedir dos piezas de pollo frito, un vaso de bebida de jarabe (air sirap) y un paquete de arroz blanco.",
      },
    },
    {
      id: "m7",
      from: "juruwang",
      text: {
        ms: "Baiklah. Ada apa-apa lagi yang encik ingin tambah?",
        en: "Alright. Would you like to add anything else?",
        es: "Muy bien. ¿Desea añadir algo más?",
      },
    },
    {
      id: "m8",
      from: "azman",
      text: {
        ms: "Tidak ada. Itu sahaja.",
        en: "No. That’s all.",
        es: "No. Eso es todo.",
      },
    },
    {
      id: "m9",
      from: "juruwang",
      text: {
        ms: "Jumlah semuanya RM11.00.",
        en: "The total is RM11.00.",
        es: "El total es RM11.00.",
      },
    },
    {
      id: "m10",
      from: "azman",
      text: {
        ms: "Ini wangnya.",
        en: "Here’s the money.",
        es: "Aquí tiene el dinero.",
      },
    },
    {
      id: "m11",
      from: "juruwang",
      text: {
        ms: "Ini resitnya. Encik boleh ambil makanan di sana.",
        en: "Here’s the receipt. You can collect your food over there.",
        es: "Aquí está el recibo. Puede recoger la comida allí.",
      },
    },
    {
      id: "m12",
      from: "azman",
      text: {
        ms: "Baiklah.",
        en: "Alright.",
        es: "De acuerdo.",
      },
    },
    {
      id: "m13",
      from: "azman",
      text: {
        ms: "...",
        en: "...",
        es: "...",
      },
    },
    {
      id: "m14",
      from: "jurukaunter",
      text: {
        ms: "Nombor 30.",
        en: "Number 30.",
        es: "Número 30.",
      },
    },
    {
      id: "m15",
      from: "azman",
      text: {
        ms: "Saya, encik.",
        en: "That’s me, sir.",
        es: "Soy yo, señor.",
      },
    },
    {
      id: "m16",
      from: "jurukaunter",
      text: {
        ms: "Ini makanan encik. Terima kasih dan sila datang lagi.",
        en: "Here is your food. Thank you, and please come again.",
        es: "Aquí está su comida. Gracias, y vuelva pronto.",
      },
    },
    {
      id: "m17",
      from: "azman",
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
      label: { ms: "Kaunter perpustakaan", en: "Library counter", es: "Mostrador de biblioteca" },
    },
    {
      id: "farmasi",
      words: ["FARMASI"],
      label: { ms: "Kaunter farmasi", en: "Pharmacy counter", es: "Mostrador de farmacia" },
    },
    {
      id: "bank",
      words: ["BANK"],
      label: { ms: "Kaunter bank", en: "Bank counter", es: "Mostrador de banco" },
    },
    {
      id: "pos",
      words: ["POS"],
      label: { ms: "Kaunter pos", en: "Post office counter", es: "Mostrador de correos" },
    },
    {
      id: "tiket-bas",
      words: ["TIKET", "BAS"], // user must find BOTH to complete this target
      label: { ms: "Kaunter tiket bas", en: "Bus ticket counter", es: "Mostrador de boletos de bus" },
    },
  ],
  allowDiagonal: true,
  allowReverse: true,
},


],
}