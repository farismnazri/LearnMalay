import type { ChapterContent } from "./types";

export const chapter01: ChapterContent = {
  id: 1,
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
              id: "selamat-tinggal",
              imageSrc: "/assets/chapters/ch1/ch1_s2_selamatTinggal.webp",
              imageAlt: {
                ms: "Komik Selamat tinggal",
                en: "Comic panel for Selamat tinggal",
                es: "Panel de comic para Selamat tinggal",
              },
              phrase: { ms: "Selamat tinggal", en: "Goodbye", es: "Adiós" },
              hint: { ms: "Apabila anda pergi dan orang lain tinggal.", en: "When you leave someone who stays behind.", es: "Cuando te vas y la otra persona se queda." },
            },
            {
              kind: "phrase",
              id: "selamat-jalan",
              imageSrc: "/assets/chapters/ch1/ch1_s2_selamatJalan.webp",
              imageAlt: {
                ms: "Komik Selamat jalan",
                en: "Comic panel for Selamat jalan",
                es: "Panel de comic para Selamat jalan",
              },
              phrase: { ms: "Selamat jalan", en: "Goodbye / Have a safe trip", es: "Que te vaya bien" },
              hint: { ms: "Untuk orang yang pergi.", en: "Said to someone who is leaving.", es: "Para alguien que se va." },
            },
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
              hint: { ms: "Apabila anda pergi dahulu.", en: "When you are leaving first.", es: "Cuando te vas primero." },
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
              hint: { ms: "Jumpa lagi.", en: "See you again.", es: "Nos vemos otra vez." },
            },
          ],
        },

        {
          kind: "comic",
          id: "penghargaan",
          title: {
            ms: "Sapaan penghargaan",
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
    // Page 2: pronoun comic lesson cards
    // -------------------------
    {
      id: "p2-pronouns",
      kind: "pronounCards",
      title: {
        ms: "Kata Ganti Nama Diri",
        en: "Personal Pronouns",
        es: "Pronombres personales",
      },
      helper: {
        ms: "Siapa yang bercakap? Siapa yang diajak bercakap? Siapa yang dibualkan?",
        en: "Who is speaking? Who is being spoken to? Who is being talked about?",
        es: "¿Quién habla? ¿A quién se le habla? ¿De quién se habla?",
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
                ms: "Saya / Aku",
                en: "Saya / Aku",
                es: "Saya / Aku",
              },
              description: {
                ms: "orang yang bercakap",
                en: "the person speaking",
                es: "la persona que habla",
              },
              imageSrc: "/assets/chapters/ch1/ch1_saya.webp",
              imageAlt: {
                ms: "Komik Saya dan Aku",
                en: "Comic for Saya and Aku",
                es: "Comic para Saya y Aku",
              },
              info: {
                ms: "aku = informal",
                en: "aku = informal",
                es: "aku = informal",
              },
              translation: {
                en: "I am Faris.",
                es: "Soy Faris.",
              },
            },
            {
              id: "awak-kau-anda",
              title: {
                ms: "Awak / Kau / Anda",
                en: "Awak / Kau / Anda",
                es: "Awak / Kau / Anda",
              },
              description: {
                ms: "orang yang diajak bercakap",
                en: "the person being spoken to",
                es: "la persona a quien se le habla",
              },
              imageSrc: "/assets/chapters/ch1/ch1_awak.webp",
              imageAlt: {
                ms: "Komik Awak, Kau dan Anda",
                en: "Comic for Awak, Kau and Anda",
                es: "Comic para Awak, Kau y Anda",
              },
              info: {
                ms: "kau = informal, anda = formal",
                en: "kau = informal, anda = formal",
                es: "kau = informal, anda = formal",
              },
              translation: {
                en: "Are you well?",
                es: "¿Estás bien?",
              },
            },
            {
              id: "dia-beliau",
              title: {
                ms: "Dia / Beliau",
                en: "Dia / Beliau",
                es: "Dia / Beliau",
              },
              description: {
                ms: "orang yang dibualkan",
                en: "the person being talked about",
                es: "la persona de quien se habla",
              },
              imageSrc: "/assets/chapters/ch1/ch1_dia.webp",
              imageAlt: {
                ms: "Komik Dia dan Beliau",
                en: "Comic for Dia and Beliau",
                es: "Comic para Dia y Beliau",
              },
              info: {
                ms: "beliau = formal / hormat",
                en: "beliau = formal / respectful",
                es: "beliau = formal / respetuoso",
              },
              translation: {
                en: "She is my friend.",
                es: "Ella es mi amiga.",
              },
            },
          ],
        },
        {
          id: "ramai",
          label: {
            ms: "Ramai",
            en: "Many people",
            es: "Muchas personas",
          },
          iconSrc: "/assets/chapters/ch1/ch1_ramai.webp",
          iconAlt: {
            ms: "Ikon ramai orang",
            en: "Many people icon",
            es: "Icono de varias personas",
          },
          cards: [
            {
              id: "kita-kami",
              title: {
                ms: "Kita / Kami",
                en: "Kita / Kami",
                es: "Kita / Kami",
              },
              description: {
                ms: "kumpulan sendiri",
                en: "our own group",
                es: "nuestro grupo",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kita.webp",
              imageAlt: {
                ms: "Komik Kita dan Kami",
                en: "Comic for Kita and Kami",
                es: "Comic para Kita y Kami",
              },
              info: {
                ms: "kita = termasuk pendengar, kami = tidak termasuk pendengar",
                en: "kita = includes the listener, kami = excludes the listener",
                es: "kita = incluye al oyente, kami = no incluye al oyente",
              },
              translation: {
                en: "We go now.",
                es: "Vamos ahora.",
              },
            },
            {
              id: "anda-semua-kamu-semua",
              title: {
                ms: "Anda semua / Kamu semua",
                en: "Anda semua / Kamu semua",
                es: "Anda semua / Kamu semua",
              },
              description: {
                ms: "ramai orang yang diajak bercakap",
                en: "many people being spoken to",
                es: "varias personas a quienes se les habla",
              },
              imageSrc: "/assets/chapters/ch1/ch1_kamu.webp",
              imageAlt: {
                ms: "Komik Anda semua dan Kamu semua",
                en: "Comic for Anda semua and Kamu semua",
                es: "Comic para Anda semua y Kamu semua",
              },
              translation: {
                en: "Do you all understand?",
                es: "¿Todos entienden?",
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
                ms: "ramai orang yang dibualkan",
                en: "many people being talked about",
                es: "varias personas de quienes se habla",
              },
              imageSrc: "/assets/chapters/ch1/ch1_mereka.webp",
              imageAlt: {
                ms: "Komik Mereka",
                en: "Comic for Mereka",
                es: "Comic para Mereka",
              },
              translation: {
                en: "They are at school.",
                es: "Ellos están en la escuela.",
              },
            },
          ],
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
    ms: "Situasi 1.1: Sapaan dengan orang yang lebih tua",
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
      id: "azman",
      name: { ms: "Azman", en: "Azman", es: "Azman" },
    },
    {
      id: "ayub",
      name: { ms: "Pak Cik Ayub", en: "Uncle Ayub", es: "Señor Ayub" },
      avatarSrc: "/assets/characters/Bandicoot_Profile.png",
    },
  ],
  messages: [
    {
      id: "m1",
      from: "azman",
      text: {
        ms: "Assalamualaikum, Pak Cik Ayub.",
        en: "Assalamualaikum, Uncle Ayub.",
        es: "Assalamualaikum, señor Ayub.",
      },
    },
    {
      id: "m2",
      from: "ayub",
      text: {
        ms: "Waalaikumussalam, Azman. Cari apa di kedai hari ini?",
        en: "Waalaikumussalam, Azman. What are you looking for today?",
        es: "Waalaikumussalam, Azman. ¿Qué estás buscando hoy?",
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
        ms: "Roti ada di rak depan. Susu ada di peti sejuk sana.",
        en: "The bread is on the front shelf. The milk is in the fridge over there.",
        es: "El pan está en el estante de adelante. La leche está en la nevera de allá.",
      },
    },
    {
      id: "m5",
      from: "azman",
      text: {
        ms: "Baik, terima kasih, Pak Cik.",
        en: "Alright, thank you, Uncle.",
        es: "Muy bien, gracias, señor.",
      },
    },
    {
      id: "m6",
      from: "ayub",
      text: {
        ms: "Sama-sama. Awak datang seorang hari ini?",
        en: "You’re welcome. Did you come alone today?",
        es: "De nada. ¿Viniste solo hoy?",
      },
    },
    {
      id: "m7",
      from: "azman",
      text: {
        ms: "Ya, saya datang seorang. Kawan saya tunggu di luar.",
        en: "Yes, I came alone. My friend is waiting outside.",
        es: "Sí, vine solo. Mi amigo me espera afuera.",
      },
    },
    {
      id: "m8",
      from: "ayub",
      text: {
        ms: "Baik. Selepas ambil barang, bayar di kaunter.",
        en: "Good. After you get your items, pay at this counter.",
        es: "Bien. Después de tomar tus cosas, paga en este mostrador.",
      },
    },
    {
      id: "m9",
      from: "azman",
      text: {
        ms: "Baik, Pak Cik. Saya ambil sekarang.",
        en: "Alright, Uncle. I’ll get them now.",
        es: "De acuerdo, señor. Las tomo ahora.",
      },
    },
    {
      id: "m10",
      from: "ayub",
      text: {
        ms: "Terima kasih, Azman. Jumpa lagi.",
        en: "Thank you, Azman. See you again.",
        es: "Gracias, Azman. Nos vemos.",
      },
    },
    {
      id: "m11",
      from: "azman",
      text: {
        ms: "Baik, Pak Cik. Jumpa lagi.",
        en: "Alright, Uncle. See you again.",
        es: "De acuerdo, señor. Nos vemos.",
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
    { id: "m1", from: "azman", text: { ms: "Selamat pagi, Muthu. Awal awak datang kedai buku.", en: "Good morning, Muthu. You came early to the bookstore.", es: "Buenos días, Muthu. Llegaste temprano a la librería." } },
    { id: "m2", from: "ayub",  text: { ms: "Selamat pagi, Azman. Ya, saya singgah beli pen.", en: "Good morning, Azman. Yes, I stopped by to buy a pen.", es: "Buenos días, Azman. Sí, pasé a comprar un bolígrafo." } },
    { id: "m3", from: "azman", text: { ms: "Saya pula mahu beli buku nota.", en: "I want to buy a notebook.", es: "Yo quiero comprar un cuaderno." } },
    { id: "m4", from: "ayub",  text: { ms: "Buku nota di rak kanan, dekat kaunter.", en: "The notebooks are on the right shelf, near the counter.", es: "Los cuadernos están en el estante de la derecha, cerca del mostrador." } },
    { id: "m5", from: "azman", text: { ms: "Terima kasih. Awak sudah pilih pen?", en: "Thank you. Have you chosen a pen?", es: "Gracias. ¿Ya elegiste el bolígrafo?" } },
    { id: "m6", from: "ayub",  text: { ms: "Belum. Saya tak pasti pen gel atau pen biasa.", en: "Not yet. I'm not sure whether to get a gel pen or a regular pen.", es: "Todavía no. No estoy seguro si comprar bolígrafo de gel o bolígrafo normal." } },
    { id: "m7", from: "azman", text: { ms: "Kalau tulis laju, pen gel lebih senang.", en: "If you write fast, a gel pen is easier.", es: "Si escribes rápido, un bolígrafo de gel es más cómodo." } },
    { id: "m8", from: "ayub",  text: { ms: "Betul juga. Saya ambil dua batang.", en: "That's true. I will take two pens.", es: "Es cierto. Tomaré dos bolígrafos." } },
    { id: "m9", from: "azman", text: { ms: "Bagus. Lepas bayar, kita terus ke kelas?", en: "Great. After paying, shall we go straight to class?", es: "Bien. Después de pagar, ¿vamos directo a clase?" } },
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
        { id: "selamat-pagi", ms: "Selamat pagi", en: "Good morning", es: "Buenos días" },
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
        a: { kind: "text", text: { ms: "Ya, saya sihat.", en: "Yes, I am well.", es: "Sí, estoy bien." } },
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
            text: { ms: "Sudah, saya sudah makan.", en: "Yes, I have eaten.", es: "Sí, ya comí." },
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
