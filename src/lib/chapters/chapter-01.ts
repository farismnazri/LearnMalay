import type { ChapterContent } from "./types";

export const chapter01: ChapterContent = {
  id: 1,
  title: { ms: "Sapaan", en: "Greetings", es: "Saludos" },

  pages: [
    // -------------------------
    // Page 1: your existing sections
    // -------------------------
    {
      id: "p1-khabar",
      kind: "intro",
      sections: [
        {
          kind: "pairs",
          id: "khabar",
          title: {
            ms: "Pertanyaan khabar",
            en: "Asking how someone is",
            es: "Preguntar cómo está alguien",
          },
          pairs: [
            {
              id: "khabar-1",
              q: { id: "apa-khabar", ms: "Apa khabar?", en: "How are you?", es: "¿Cómo estás?" },
              a: { id: "khabar-baik", ms: "Khabar baik", en: "I’m good", es: "Estoy bien" },
            },
            {
              id: "khabar-2",
              q: { id: "sihat-q", ms: "Sihat?", en: "Are you well?", es: "¿Estás bien?" },
              a: { id: "sihat-a", ms: "Sihat", en: "I’m well", es: "Estoy bien" },
            },
          ],
        },

        {
          kind: "list",
          id: "berpisah",
          title: {
            ms: "Sapaan apabila berpisah",
            en: "When you are leaving",
            es: "Cuando te despides",
          },
          items: [
            { id: "selamat-tinggal", ms: "Selamat tinggal", en: "Goodbye (I’m staying)", es: "Adiós (yo me quedo)" },
            { id: "selamat-jalan", ms: "Selamat jalan", en: "Goodbye / Have a safe trip", es: "Que te vaya bien" },
            { id: "saya-pergi-dulu", ms: "Saya pergi dulu", en: "I’ll go first / I’m heading off", es: "Ya me voy / Me retiro" },
            { id: "jumpa-lagi", ms: "Jumpa lagi", en: "See you again", es: "Hasta luego" },
          ],
        },

        {
          kind: "list",
          id: "penghargaan",
          title: {
            ms: "Sapaan penghargaan",
            en: "Polite appreciation",
            es: "Agradecimiento",
          },
          items: [
            { id: "terima-kasih", ms: "Terima kasih", en: "Thank you", es: "Gracias" },
            { id: "sama-sama", ms: "Sama-sama", en: "You’re welcome", es: "De nada" },
          ],
        },
      ],
    },

    // -------------------------
    // Page 2: Pronouns table (same structure as Page 3)
    // -------------------------
    {
      id: "p2-pronouns",
      kind: "table",
      title: {
        ms: "Penggunaan kata ganti nama",
        en: "Using pronouns",
        es: "Uso de pronombres",
      },
      columns: [
        { key: "group", label: { ms: "Kumpulan", en: "Group", es: "Grupo" } },
        {
          key: "first",
          label: {
            ms: "Kata ganti nama diri pertama",
            en: "First-person pronouns",
            es: "Pronombres de primera persona",
          },
        },
        {
          key: "second",
          label: {
            ms: "Kata ganti nama diri kedua",
            en: "Second-person pronouns",
            es: "Pronombres de segunda persona",
          },
        },
        {
          key: "third",
          label: {
            ms: "Kata ganti nama diri ketiga",
            en: "Third-person pronouns",
            es: "Pronombres de tercera persona",
          },
        },
      ],
      rows: [
        {
          id: "r1-singular",
          cells: {
            group: [{ ms: "Tunggal/Seorang", en: "Singular / one person", es: "Singular / una persona" }],
            first: [
              { ms: "saya", en: "I (neutral/polite)", es: "Yo (neutral/formal)" },
              { ms: "aku", en: "I (informal)", es: "Yo (informal)" },
            ],
            second: [
              { ms: "awak", en: "you (casual)", es: "tú (casual)" },
              { ms: "kau", en: "you (informal)", es: "tú (informal)" },
              { ms: "anda", en: "you (formal)", es: "usted" },
            ],
            third: [
              { ms: "dia", en: "he/she", es: "él/ella" },
              { ms: "beliau", en: "he/she (honorific)", es: "él/ella (honorífico)" },
            ],
          },
        },
        {
          id: "r2-plural",
          cells: {
            group: [{ ms: "Jamak/Ramai", en: "Plural / many people", es: "Plural / varias personas" }],
            first: [
              { ms: "kita", en: "we (inclusive)", es: "nosotros (incl.)" },
              { ms: "kami", en: "we (exclusive)", es: "nosotros (excl.)" },
            ],
            second: [
              { ms: "anda semua", en: "you all (formal)", es: "ustedes (formal)" },
              { ms: "kamu semua", en: "you all (casual)", es: "ustedes (casual)" },
            ],
            third: [{ ms: "mereka", en: "they", es: "ellos/ellas" }],
          },
        },
      ],
    },

    // -------------------------
    // Page 3: Semakan Sebutan (the table you sent)
    // -------------------------
    {
      id: "p3-sebutan",
      kind: "table",
      title: {
        ms: "Semakan sebutan",
        en: "Speaking check",
        es: "Práctica de conversación",
      },
      columns: [
        { key: "group", label: { ms: "", en: "", es: "" } },
        { key: "greet", label: { ms: "Ucap sapaan", en: "Greeting", es: "Saludo" } },
        { key: "khabar", label: { ms: "Bertanya khabar", en: "Ask how they are", es: "Preguntar cómo está" } },
        { key: "makan", label: { ms: "Pertanyaan makan", en: "Ask about eating", es: "Preguntar por comida" } },
        { key: "end", label: { ms: "Akhiri perbualan", en: "End the conversation", es: "Terminar la conversación" } },
      ],
      rows: [
        {
          id: "r-islam",
          cells: {
            group: [{ ms: "Orang Islam dan Orang Islam", en: "Muslim ↔ Muslim", es: "Musulmán ↔ Musulmán" }],
            greet: [
              { ms: "Assalamualaikum", en: "Assalamualaikum", es: "Assalamualaikum" },
              { ms: "Waalaikumsalam", en: "Waalaikumsalam", es: "Waalaikumsalam" },
            ],
            khabar: [
              { ms: "Apa khabar?", en: "How are you?", es: "¿Cómo estás?" },
              { ms: "Khabar baik.", en: "I’m good.", es: "Estoy bien." },
              { ms: "Awak sihat?", en: "Are you well?", es: "¿Estás bien?" },
              { ms: "Saya sihat.", en: "I’m well.", es: "Estoy bien." },
              { ms: "Saya kurang sihat.", en: "I’m not feeling well.", es: "No me siento bien." },
            ],
            makan: [
              { ms: "Awak sudah makan?", en: "Have you eaten?", es: "¿Ya comiste?" },
              { ms: "Saya sudah makan tadi.", en: "I already ate earlier.", es: "Ya comí hace rato." },
              { ms: "Saya belum makan.", en: "I haven’t eaten yet.", es: "Todavía no he comido." },
            ],
            end: [
              { ms: "Saya pergi dulu.", en: "I’m going now.", es: "Ya me voy." },
              { ms: "Jumpa lagi.", en: "See you again.", es: "Nos vemos." },
              { ms: "Selamat tinggal.", en: "Goodbye.", es: "Adiós." },
            ],
          },
        },

        {
          id: "r-umum",
          cells: {
            group: [{ ms: "Umum", en: "General", es: "General" }],
            greet: [
              { ms: "Hai", en: "Hi", es: "Hola" },
              { ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
              { ms: "Selamat tengahari", en: "Good afternoon", es: "Buenas tardes" },
              { ms: "Selamat petang", en: "Good evening", es: "Buenas tardes/noche" },
              { ms: "Selamat malam", en: "Good night", es: "Buenas noches" },
            ],
            khabar: [
              { ms: "Apa khabar?", en: "How are you?", es: "¿Cómo estás?" },
              { ms: "Khabar baik.", en: "I’m good.", es: "Estoy bien." },
              { ms: "Awak sihat?", en: "Are you well?", es: "¿Estás bien?" },
              { ms: "Saya sihat.", en: "I’m well.", es: "Estoy bien." },
              { ms: "Saya kurang sihat.", en: "I’m not feeling well.", es: "No me siento bien." },
            ],
            makan: [
              { ms: "Awak sudah makan?", en: "Have you eaten?", es: "¿Ya comiste?" },
              { ms: "Saya sudah makan tadi.", en: "I already ate earlier.", es: "Ya comí hace rato." },
              { ms: "Saya belum makan.", en: "I haven’t eaten yet.", es: "Todavía no he comido." },
            ],
            end: [
              { ms: "Saya pergi dulu.", en: "I’m going now.", es: "Ya me voy." },
              { ms: "Jumpa lagi.", en: "See you again.", es: "Nos vemos." },
              { ms: "Selamat tinggal.", en: "Goodbye.", es: "Adiós." },
            ],
          },
        },
      ],
    },

    {
      id: "p3-situasi-1-1",
      kind: "chat",
      title: {
        ms: "Situasi 1.1 Sapaan dengan orang lebih tua",
        en: "Situation 1.1 Greeting an older person",
        es: "Situación 1.1 Saludar a una persona mayor",
      },
      context: {
        ms: "Latar tempat: Di sebuah kedai makan",
        en: "Setting: At a food shop",
        es: "Lugar: En una tienda/restaurante",
      },
      participants: [
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
        },
        {
          id: "ayub",
          name: { ms: "Pak Cik Ayub", en: "Uncle Ayub", es: "Tío Ayub" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "azman",
          text: {
            ms: "Assalamualaikum, pak cik Ayub.",
            en: "Assalamualaikum, Uncle Ayub.",
            es: "Assalamualaikum, tio Ayub.",
          },
        },
        {
          id: "m2",
          from: "ayub",
          text: {
            ms: "Waalaikumussalam, Azman. Cari apa di kedai?",
            en: "Waalaikumussalam, Azman. What are you looking for in the shop?",
            es: "Waalaikumussalam, Azman. Que buscas en la tienda?",
          },
        },
        {
          id: "m3",
          from: "azman",
          text: {
            ms: "Saya cari roti dan susu.",
            en: "I am looking for bread and milk.",
            es: "Estoy buscando pan y leche.",
          },
        },
        {
          id: "m4",
          from: "ayub",
          text: {
            ms: "Roti di rak depan. Susu di peti sejuk sana.",
            en: "The bread is on the front shelf. The milk is in that fridge.",
            es: "El pan esta en el estante de delante. La leche esta en esa nevera.",
          },
        },
        {
          id: "m5",
          from: "azman",
          text: {
            ms: "Baik, terima kasih, pak cik.",
            en: "Alright, thank you, Uncle.",
            es: "Muy bien, gracias, tio.",
          },
        },
        {
          id: "m6",
          from: "ayub",
          text: {
            ms: "Sama-sama. Awak datang seorang hari ini?",
            en: "You are welcome. Did you come alone today?",
            es: "De nada. Viniste solo hoy?",
          },
        },
        {
          id: "m7",
          from: "azman",
          text: {
            ms: "Ya, saya datang seorang. Kawan saya tunggu di luar.",
            en: "Yes, I came alone. My friend is waiting outside.",
            es: "Si, vine solo. Mi amigo espera afuera.",
          },
        },
        {
          id: "m8",
          from: "ayub",
          text: {
            ms: "Baik. Lepas ambil barang, bayar di kaunter ini.",
            en: "Good. After taking your items, pay at this counter.",
            es: "Bien. Despues de tomar tus cosas, paga en este mostrador.",
          },
        },
        {
          id: "m9",
          from: "azman",
          text: {
            ms: "Baik, pak cik. Saya ambil sekarang.",
            en: "Alright, Uncle. I will take them now.",
            es: "De acuerdo, tio. Los tomo ahora.",
          },
        },
        {
          id: "m10",
          from: "ayub",
          text: {
            ms: "Terima kasih, Azman. Jumpa lagi.",
            en: "Thank you, Azman. See you again.",
            es: "Gracias, Azman. Nos vemos otra vez.",
          },
        },
        {
          id: "m11",
          from: "azman",
          text: {
            ms: "Baik, pak cik. Jumpa lagi.",
            en: "Alright, Uncle. See you again.",
            es: "De acuerdo, tio. Nos vemos otra vez.",
          },
        },
      ],
    },

    {
  id: "p-next-chat-muthu",
  kind: "chat",
  title: {
    ms: "Situasi 1.3 Sapaan antara rakan sebaya berlainan bangsa",
    en: "Situation 1.3 Greeting a friend of a different ethnicity",
    es: "Situación 1.3 Saludar a un amigo de otra etnia",
  },
  context: {
    ms: "Latar tempat: Sekitar Universiti",
    en: "Setting: Around the university",
    es: "Lugar: Alrededor de la universidad",
  },
  participants: [
    {
      id: "azman",
      name: { ms: "Azman", en: "Azman", es: "Azman" },
    },
    {
      id: "ayub", // ✅ keep the same id your UI expects (bandicoot)
      name: { ms: "Muthu", en: "Muthu", es: "Muthu" }, // display name
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    { id: "m1", from: "azman", text: { ms: "Selamat pagi, Muthu. Awal awak datang kedai buku.", en: "Good morning, Muthu. You came early to the bookstore.", es: "Buenos dias, Muthu. Llegaste temprano a la libreria." } },
    { id: "m2", from: "ayub",  text: { ms: "Selamat pagi, Azman. Ya, saya singgah beli pen.", en: "Good morning, Azman. Yes, I stopped by to buy a pen.", es: "Buenos dias, Azman. Si, pase a comprar un boligrafo." } },
    { id: "m3", from: "azman", text: { ms: "Saya pula mahu beli buku nota.", en: "I want to buy a notebook.", es: "Yo quiero comprar un cuaderno." } },
    { id: "m4", from: "ayub",  text: { ms: "Buku nota di rak kanan, dekat kaunter.", en: "The notebooks are on the right shelf, near the counter.", es: "Los cuadernos estan en el estante de la derecha, cerca del mostrador." } },
    { id: "m5", from: "azman", text: { ms: "Terima kasih. Awak sudah pilih pen?", en: "Thank you. Have you chosen a pen?", es: "Gracias. Ya elegiste el boligrafo?" } },
    { id: "m6", from: "ayub",  text: { ms: "Belum. Saya tak pasti pen gel atau pen biasa.", en: "Not yet. I'm not sure whether to get a gel pen or a regular pen.", es: "Todavia no. No estoy seguro si comprar boligrafo de gel o boligrafo normal." } },
    { id: "m7", from: "azman", text: { ms: "Kalau tulis laju, pen gel lebih senang.", en: "If you write fast, a gel pen is easier.", es: "Si escribes rapido, un boligrafo de gel es mas comodo." } },
    { id: "m8", from: "ayub",  text: { ms: "Betul juga. Saya ambil dua batang.", en: "That's true. I will take two pens.", es: "Es cierto. Tomare dos boligrafos." } },
    { id: "m9", from: "azman", text: { ms: "Bagus. Lepas bayar, kita terus ke kelas?", en: "Great. After paying, shall we go straight to class?", es: "Bien. Despues de pagar, vamos directo a clase?" } },
    { id: "m10", from: "ayub", text: { ms: "Boleh. Kelas mula pukul sembilan.", en: "Sure. Class starts at nine o'clock.", es: "Claro. La clase empieza a las nueve." } },
    { id: "m11", from: "azman", text: { ms: "Okey, jom ke kaunter.", en: "Okay, let's go to the counter.", es: "Vale, vamos al mostrador." } },
    { id: "m12", from: "ayub", text: { ms: "Jom.", en: "Let's go.", es: "Vamos." } },
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
        { id: "selamat-pagi", ms: "Selamat pagi", en: "Good morning", es: "Buenos dias" },
        { id: "khabar-baik", ms: "khabar baik", en: "doing well", es: "bien" },
        { id: "nama", ms: "Nama", en: "Name", es: "Nombre" },
        { id: "sihat", ms: "sihat", en: "well / healthy", es: "bien / saludable" },
        { id: "makan", ms: "makan", en: "eat / eaten", es: "comer / comido" },
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
        a: { kind: "text", text: { ms: "Selamat pagi, Faris.", en: "Good morning, Faris.", es: "Buenos dias, Faris." } },
        },
        {
        id: "lat1-q2",
        n: 2,
        q: { kind: "text", text: { ms: "Apa khabar, Aina?", en: "How are you, Aina?", es: "Como estas, Aina?" } },
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
            after: { ms: " saya Faris.", en: " is Faris.", es: " soy Faris." },
            correctOptionId: "nama",
        },
        a: { kind: "text", text: { ms: "Nama saya Aina.", en: "My name is Aina.", es: "Mi nombre es Aina." } },
        },
        {
        id: "lat1-q4",
        n: 4,
        q: {
            kind: "blank",
            before: { ms: "Awak ", en: "Are you ", es: "Estas " },
            after: { ms: " hari ini?", en: " today?", es: " hoy?" },
            correctOptionId: "sihat",
        },
        a: { kind: "text", text: { ms: "Ya, saya sihat.", en: "Yes, I am well.", es: "Si, estoy bien." } },
        },
        {
        id: "lat1-q5",
        n: 5,
        q: {
            kind: "blank",
            before: { ms: "Awak sudah ", en: "Have you ", es: "Ya has " },
            after: { ms: "?", en: "?", es: "?" },
            correctOptionId: "makan",
        },
        a: {
            kind: "text",
            text: { ms: "Sudah, saya sudah makan.", en: "Yes, I have eaten.", es: "Si, ya comi." },
        },
        },
    ],
    },

    {
  id: "p-latihan-3",
  kind: "tick",
  title: { ms: "Latihan 3", en: "Exercise 3", es: "Ejercicio 3" },
  instructions: {
    ms: "Tandakan (✓) untuk penggunaan kata sapaan yang bagus.",
    en: "Tick (✓) the sentences that use greetings appropriately.",
    es: "Marca (✓) las frases que usan saludos de manera adecuada.",
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
    text: { ms: "Esok saya hendak ke sekolah.", en: "Tomorrow I want to go to school.", es: "Mañana quiero ir a la escuela." },
    why: {
      ms: "Ayat ini bukan sapaan. Ini hanya kenyataan tentang rancangan esok.",
      en: "This is not a greeting. It’s just a statement about tomorrow’s plan.",
      es: "Esto no es un saludo. Es una frase sobre un plan para mañana.",
    },
  },
  {
    id: "l3-3",
    correct: true,
    text: {
      ms: "Selamat pagi. Boleh saya tanya sesuatu?",
      en: "Good morning. May I ask something?",
      es: "Buenos días. ¿Puedo preguntar algo?",
    },
    why: {
      ms: "Ada sapaan yang betul (‘Selamat pagi’) sebelum bertanya soalan.",
      en: "It includes a proper greeting (‘Good morning’) before asking a question.",
      es: "Incluye un saludo correcto (‘Buenos días’) antes de hacer una pregunta.",
    },
  },
  {
    id: "l3-4",
    correct: true,
    text: {
      ms: "Hai. Nama saya Mariam. Apa nama awak?",
      en: "Hi. My name is Mariam. What’s your name?",
      es: "Hola. Me llamo Mariam. ¿Cómo te llamas?",
    },
    why: {
      ms: "Ini sapaan yang sesuai: bermula dengan ‘Hai’ dan memperkenalkan diri.",
      en: "This is an appropriate greeting: it starts with ‘Hi’ and introduces oneself.",
      es: "Es un saludo apropiado: empieza con ‘Hola’ y se presenta.",
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
      ms: "Siti, kenalkan ini kawan saya, Seri.",
      en: "Siti, let me introduce my friend, Seri.",
      es: "Siti, te presento a mi amiga, Seri.",
    },
    why: {
      ms: "Ayat ini ialah ayat perkenalan (introduce orang lain), bukan kata sapaan seperti ‘Hai/ Selamat pagi’.",
      en: "This is an introduction sentence (introducing someone), not a greeting like ‘Hi/Good morning’.",
      es: "Es una frase de presentación, no un saludo como ‘Hola/Buenos días’.",
    },
  },
  {
    id: "l3-7",
    correct: false,
    text: { ms: "Seronok bertemu awak.", en: "Nice to meet you.", es: "Mucho gusto." },
    why: {
      ms: "Ini lebih kepada ungkapan selepas berkenalan, bukan pembuka sapaan utama.",
      en: "This is usually said after meeting someone, not as the main opening greeting.",
      es: "Normalmente se dice después de presentarse, no como saludo inicial principal.",
    },
  },
  {
    id: "l3-8",
    correct: false,
    text: { ms: "Jom jumpa hari Isnin ini!", en: "Let’s meet this Monday!", es: "¡Nos vemos este lunes!" },
    why: {
      ms: "Ini ajakan/ rancangan, bukan kata sapaan atau bertanya khabar.",
      en: "This is an invitation/plan, not a greeting or wellbeing question.",
      es: "Es una invitación/plan, no un saludo ni una pregunta de cortesía.",
    },
  },
  {
    id: "l3-9",
    correct: true,
    text: { ms: "Selamat tinggal. Jumpa lagi.", en: "Goodbye. See you again.", es: "Adiós. Hasta luego." },
    why: {
      ms: "Ini kata sapaan apabila berpisah (ucapan penutup perbualan).",
      en: "This is a leave-taking greeting (closing a conversation).",
      es: "Es una despedida (cierre de una conversación).",
    },
  },
  {
    id: "l3-10",
    correct: true,
    text: { ms: "Awak sudah makan?", en: "Have you eaten?", es: "¿Ya comiste?" },
    why: {
      ms: "Soalan ini biasa digunakan sebagai sapaan sosial dalam BM (bertanya makan).",
      en: "This is a common social greeting in Malay (asking if someone has eaten).",
      es: "Es una pregunta social común en malayo (preguntar si ya comió).",
    },
  },
  ],
},

  ],
};
