import type { ChapterContent } from "./types";

export const chapter06: ChapterContent = {
  id: 6,
  title: { ms: "Alam Sekitar & Cuaca", en: "Environment & Weather", es: "Medioambiente y Clima" },
  pages: [
    {
      id: "c6-p1-alam-sekitar",
      kind: "table",
      title: { ms: "Alam Sekitar di Malaysia", en: "Environment in Malaysia", es: "Entorno en Malasia" },
      columns: [
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "nama", label: { ms: "Nama", en: "Name", es: "Nombre" } },
      ],
      rows: [
        {
          id: "c6-pantai",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Pantai.png",
                alt: { ms: "pantai", en: "beach", es: "playa" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "pantai", en: "beach", es: "playa" }],
          },
        },
        {
          id: "c6-pasir",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Pasir.png",
                alt: { ms: "pasir", en: "sand", es: "arena" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "pasir", en: "sand", es: "arena" }],
          },
        },
        {
          id: "c6-pokok-kelapa",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Pokok.png",
                alt: { ms: "pokok kelapa", en: "coconut tree", es: "palmera" },
                w: 720,
                h: 720,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "pokok kelapa", en: "coconut tree", es: "palmera" }],
          },
        },
        {
          id: "c6-hutan",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Hutan.png",
                alt: { ms: "hutan", en: "forest", es: "bosque" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "hutan", en: "forest", es: "bosque" }],
          },
        },
        {
          id: "c6-bukit",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Bukit.png",
                alt: { ms: "bukit", en: "hill", es: "colina" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "bukit", en: "hill", es: "colina" }],
          },
        },
        {
          id: "c6-sungai",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Sungai.png",
                alt: { ms: "sungai", en: "river", es: "río" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "sungai", en: "river", es: "río" }],
          },
        },
        {
          id: "c6-laut",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Laut.png",
                alt: { ms: "laut", en: "sea", es: "mar" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "laut", en: "sea", es: "mar" }],
          },
        },
        {
          id: "c6-air-terjun",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Air Terjun.png",
                alt: { ms: "air terjun", en: "waterfall", es: "cascada" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "air terjun", en: "waterfall", es: "cascada" }],
          },
        },
        {
          id: "c6-jalan-raya",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/JalanRaya.png",
                alt: { ms: "jalan raya", en: "road", es: "carretera" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "jalan raya", en: "road", es: "carretera" }],
          },
        },
      ],
    },

    {
      id: "c6-p2-cuaca",
      kind: "table",
      title: { ms: "Cuaca di Malaysia", en: "Weather in Malaysia", es: "Clima en Malasia" },
      columns: [
        { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
        { key: "nama", label: { ms: "Istilah", en: "Term", es: "Término" } },
      ],
      rows: [
        {
          id: "c6-cuaca-panas",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Panas.png",
                alt: { ms: "panas", en: "hot", es: "caluroso" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
            ],
            nama: [{ ms: "panas", en: "hot", es: "caluroso" }],
          },
        },
        {
          id: "c6-cuaca-mendung",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Mendung.png",
                alt: { ms: "mendung", en: "overcast", es: "nublado" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-56 object-cover rounded-xl",
              },
            ],
            nama: [{ ms: "mendung", en: "overcast", es: "nublado" }],
          },
        },
        {
          id: "c6-cuaca-hujan",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Hujan.png",
                alt: { ms: "hujan", en: "rain", es: "lluvia" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-56 object-cover rounded-xl",
              },
            ],
            nama: [{ ms: "hujan", en: "rain", es: "lluvia" }],
          },
        },
        {
          id: "c6-cuaca-berangin",
          cells: {
            img: [
              {
                kind: "image",
                src: "/assets/chapters/ch6/Berangin.png",
                alt: { ms: "berangin", en: "windy", es: "ventoso" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-56 object-cover rounded-xl",
              },
            ],
            nama: [{ ms: "berangin", en: "windy", es: "ventoso" }],
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 3: Chat — Cuaca di Malaysia
    // ------------------------------------------------------------
    {
      id: "c6-p3-chat-cuaca",
      kind: "chat",
      youId: "salina",
      title: {
        ms: "Situasi 6.1 Cuaca di Malaysia",
        en: "Situation 6.1 Weather in Malaysia",
        es: "Situación 6.1 Clima en Malasia",
      },
      context: {
        ms: "Latar tempat: Sebuah perhentian bas.",
        en: "Setting: A bus stop.",
        es: "Lugar: Una parada de autobús.",
      },
      participants: [
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" }, avatarSrc: "/assets/characters/Bandicoot_Profile.png" },
        { id: "salina", name: { ms: "Salina", en: "Salina", es: "Salina" } },
      ],
      messages: [
        {
          id: "c6-61-m1",
          from: "azman",
          text: { ms: "Awak.", en: "Hey.", es: "Oye." },
        },
        {
          id: "c6-61-m2",
          from: "salina",
          text: { ms: "Ya.", en: "Yes?", es: "¿Sí?" },
        },
        {
          id: "c6-61-m3",
          from: "azman",
          text: { ms: "Hendak pergi ke mana?", en: "Where are you headed?", es: "¿A dónde vas?" },
        },
        {
          id: "c6-61-m4",
          from: "salina",
          text: {
            ms: "Sebenarnya saya hendak balik ke kolej. Tetapi, panas sangat hari ini kan?",
            en: "Actually I’m going back to college. But it’s really hot today, right?",
            es: "Voy de vuelta al colegio. Pero hace mucho calor hoy, ¿no?",
          },
        },
        {
          id: "c6-61-m5",
          from: "azman",
          text: {
            ms: "Itulah pasal. Biasanya di Kuala Lumpur ini, tengah hari macam ini memang panas. Berbeza dengan di kampung.",
            en: "Exactly. Around noon in Kuala Lumpur it’s usually hot. Different from the village.",
            es: "Exacto. Al mediodía en Kuala Lumpur suele hacer calor. Diferente al pueblo.",
          },
        },
        {
          id: "c6-61-m6",
          from: "salina",
          text: {
            ms: "Betul tu. Agaknya bila hujan akan turun?",
            en: "True. I wonder when it will rain?",
            es: "Cierto. Me pregunto cuándo lloverá.",
          },
        },
        {
          id: "c6-61-m7",
          from: "azman",
          text: {
            ms: "Mana boleh agak macam itu tetapi hujan akan turun berpanjangan pada musim tengkujuh.",
            en: "Hard to guess, but rain will pour for long during the monsoon season.",
            es: "Difícil saber, pero llueve seguido en época de monzones.",
          },
        },
        {
          id: "c6-61-m8",
          from: "salina",
          text: {
            ms: "Oo, musim tengkujuh. Bila musim tengkujuh itu?",
            en: "Oh, the monsoon. When is that season?",
            es: "Ah, el monzón. ¿Cuándo es esa temporada?",
          },
        },
        {
          id: "c6-61-m9",
          from: "azman",
          text: {
            ms: "Selalunya dalam bulan November hingga bulan Mac.",
            en: "Usually from November to March.",
            es: "Normalmente de noviembre a marzo.",
          },
        },
        {
          id: "c6-61-m10",
          from: "salina",
          text: {
            ms: "Pagi tadi cuaca mendung. Ingatkan hujan, rupanya bukan.",
            en: "This morning it was overcast. I thought it would rain, but it didn’t.",
            es: "Esta mañana estaba nublado. Pensé que llovería, pero no.",
          },
        },
        {
          id: "c6-61-m11",
          from: "azman",
          text: {
            ms: "Mendung tidak semestinya hujan.",
            en: "Overcast doesn’t always mean rain.",
            es: "Nublado no siempre significa lluvia.",
          },
        },
        {
          id: "c6-61-m12",
          from: "salina",
          text: { ms: "Oo begitu.", en: "Oh, I see.", es: "Ah, ya veo." },
        },
        {
          id: "c6-61-m13",
          from: "azman",
          text: {
            ms: "Panas tidak mengapa, asalkan bukan kemarau.",
            en: "Heat is okay, as long as it’s not a drought.",
            es: "El calor está bien, mientras no sea sequía.",
          },
        },
        {
          id: "c6-61-m14",
          from: "salina",
          text: {
            ms: "Betul tu. Saya suka cuaca malam. Sejuk dan berangin.",
            en: "True. I like the night weather—cool and breezy.",
            es: "Cierto. Me gusta el clima de noche, fresco y con brisa.",
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 4: Chat — Bercuti di pantai
    // ------------------------------------------------------------
    {
      id: "c6-p4-chat-pantai",
      kind: "chat",
      youId: "azman",
      title: {
        ms: "Situasi 6.2 Bercuti di pantai",
        en: "Situation 6.2 Vacation at the beach",
        es: "Situación 6.2 Vacaciones en la playa",
      },
      context: {
        ms: "Latar tempat: Sebuah pantai.",
        en: "Setting: A beach.",
        es: "Lugar: Una playa.",
      },
      participants: [
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" }, avatarSrc: "/assets/characters/Bandicoot_Profile.png" },
        { id: "ahmad", name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" } },
      ],
      messages: [
        {
          id: "c6-62-m1",
          from: "azman",
          text: {
            ms: "Cantik bukan pemandangan di sini? Lautnya biru, pasir pantai pun putih bersih.",
            en: "Isn’t the view beautiful here? The sea is blue and the sand is white and clean.",
            es: "¿No es hermoso el paisaje aquí? El mar es azul y la arena es blanca y limpia.",
          },
        },
        {
          id: "c6-62-m2",
          from: "ahmad",
          text: {
            ms: "Betul tu. Cuba kau tengok suasana di sini. Semua orang kelihatan gembira.",
            en: "True. Look at the vibe here—everyone looks happy.",
            es: "Cierto. Mira el ambiente, todos se ven felices.",
          },
        },
        {
          id: "c6-62-m3",
          from: "azman",
          text: {
            ms: "Aku pun gembira datang ke sini sebab aku dapat melihat alam sekitar yang indah.",
            en: "I’m happy to be here too because I can enjoy the beautiful environment.",
            es: "También estoy feliz de estar aquí porque puedo disfrutar del hermoso entorno.",
          },
        },
        {
          id: "c6-62-m4",
          from: "ahmad",
          text: {
            ms: "Kau pernah mendaki bukit?",
            en: "Have you ever hiked a hill?",
            es: "¿Alguna vez subiste una colina?",
          },
        },
        {
          id: "c6-62-m5",
          from: "azman",
          text: {
            ms: "Belum pernah.",
            en: "Not yet.",
            es: "Todavía no.",
          },
        },
        {
          id: "c6-62-m6",
          from: "ahmad",
          text: {
            ms: "Baiklah. Kalau macam itu, minggu depan kita pergi ke Bukit Broga pula.",
            en: "Alright. Then next week let’s go to Bukit Broga.",
            es: "Bien. Entonces la próxima semana vamos al Bukit Broga.",
          },
        },
        {
          id: "c6-62-m7",
          from: "azman",
          text: {
            ms: "Apa yang menarik di bukit itu?",
            en: "What’s interesting there?",
            es: "¿Qué tiene de interesante esa colina?",
          },
        },
        {
          id: "c6-62-m8",
          from: "ahmad",
          text: {
            ms: "Kita akan dapat melihat pemandangan yang sangat indah dari atas bukit itu nanti. Kita akan melihat pokok-pokok, air terjun, bangunan yang tinggi, jalan raya dan banyak lagi.",
            en: "We’ll see a beautiful view from the top—trees, waterfalls, tall buildings, roads, and more.",
            es: "Veremos una vista preciosa desde arriba: árboles, cascadas, edificios altos, carreteras y mucho más.",
          },
        },
        {
          id: "c6-62-m9",
          from: "azman",
          text: {
            ms: "Seronoknya, tidak sabar aku tunggu minggu depan.",
            en: "Sounds fun, I can’t wait for next week.",
            es: "Qué emocionante, no puedo esperar a la próxima semana.",
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 5: Wordsearch (Alam & Cuaca)
    // ------------------------------------------------------------
    {
      id: "c6-p5-wordsearch",
      kind: "wordsearch",
      title: {
        ms: "Latihan: Cari Perkataan (Alam & Cuaca)",
        en: "Exercise: Find the words (Nature & Weather)",
        es: "Ejercicio: Busca las palabras (Naturaleza y Clima)",
      },
      instructions: {
        ms: "Cari 10 perkataan berkaitan alam sekitar dan cuaca.",
        en: "Find 10 words about environment and weather.",
        es: "Encuentra 10 palabras sobre entorno y clima.",
      },
      autoGenerate: true,
      size: 12,
      targets: [
        { id: "ws-pantai", word: "PANTAI", label: { ms: "pantai", en: "beach", es: "playa" } },
        { id: "ws-hutan", word: "HUTAN", label: { ms: "hutan", en: "forest", es: "bosque" } },
        { id: "ws-bukit", word: "BUKIT", label: { ms: "bukit", en: "hill", es: "colina" } },
        { id: "ws-sungai", word: "SUNGAI", label: { ms: "sungai", en: "river", es: "río" } },
        { id: "ws-laut", word: "LAUT", label: { ms: "laut", en: "sea", es: "mar" } },
        { id: "ws-panas", word: "PANAS", label: { ms: "panas", en: "hot", es: "caluroso" } },
        { id: "ws-hujan", word: "HUJAN", label: { ms: "hujan", en: "rain", es: "lluvia" } },
        { id: "ws-mendung", word: "MENDUNG", label: { ms: "mendung", en: "overcast", es: "nublado" } },
        { id: "ws-berangin", word: "BERANGIN", label: { ms: "berangin", en: "windy", es: "ventoso" } },
        { id: "ws-ribut", word: "RIBUT", label: { ms: "ribut", en: "storm", es: "tormenta" } },
      ],
      allowDiagonal: true,
      allowReverse: true,
    },
  ],
};
