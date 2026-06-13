import type { ChapterContent } from "./types";

export const chapter06: ChapterContent = {
  id: 6,
  revision: 2,
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
      youId: "me",
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
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" } },
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
      ],
      messages: [
        {
          id: "c6-61-m1",
          from: "azman",
          text: { ms: "{currentUsername}, awak nak balik kolej sekarang?", en: "{currentUsername}, are you going back to college now?", es: "{currentUsername}, ¿vas a volver al colegio ahora?" },
        },
        {
          id: "c6-61-m2",
          from: "me",
          text: { ms: "Ya, tapi langit mendung sangat.", en: "Yes, but the sky is very cloudy.", es: "Sí, pero el cielo está muy nublado." },
        },
        {
          id: "c6-61-m3",
          from: "azman",
          text: { ms: "Betul. Angin pun kuat, macam nak hujan.", en: "True. The wind is strong too, looks like rain.", es: "Cierto. El viento también está fuerte, parece que va a llover." },
        },
        {
          id: "c6-61-m4",
          from: "me",
          text: {
            ms: "Kalau hujan sekarang, susah saya nak jalan ke blok saya.",
            en: "If it rains now, it will be hard for me to walk to my block.",
            es: "Si llueve ahora, me sera dificil caminar a mi bloque.",
          },
        },
        {
          id: "c6-61-m5",
          from: "azman",
          text: {
            ms: "Kita tunggu di perhentian ini lima hingga sepuluh minit dulu.",
            en: "Let's wait at this bus stop for five to ten minutes first.",
            es: "Esperemos en esta parada de bus cinco a diez minutos primero.",
          },
        },
        {
          id: "c6-61-m6",
          from: "me",
          text: {
            ms: "Baik. Kalau hujan reda, kita terus jalan.",
            en: "Alright. If the rain eases, we continue walking.",
            es: "Bien. Si la lluvia baja, seguimos caminando.",
          },
        },
        {
          id: "c6-61-m7",
          from: "azman",
          text: {
            ms: "Eh, dah mula rintik-rintik.",
            en: "Oh, it's starting to drizzle.",
            es: "Eh, ya empezo a lloviznar.",
          },
        },
        {
          id: "c6-61-m8",
          from: "me",
          text: {
            ms: "Nasib baik kita tunggu tadi.",
            en: "Good thing we waited just now.",
            es: "Menos mal que esperamos hace un momento.",
          },
        },
        {
          id: "c6-61-m9",
          from: "azman",
          text: {
            ms: "Lepas hujan, cuaca biasanya lebih sejuk.",
            en: "After rain, the weather is usually cooler.",
            es: "Después de la lluvia, el clima normalmente es más fresco.",
          },
        },
        {
          id: "c6-61-m10",
          from: "me",
          text: {
            ms: "Ya, nyaman sikit. Bila hujan perlahan, kita gerak.",
            en: "Yes, it feels nicer. When the rain slows, we move.",
            es: "Sí, se siente mejor. Cuando la lluvia baje, nos movemos.",
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
      youId: "me",
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
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
        { id: "ahmad", name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" } },
      ],
      messages: [
        {
          id: "c6-62-m1",
          from: "me",
          text: {
            ms: "Cantik pemandangan di sini. Laut pun tenang hari ini.",
            en: "The view here is beautiful. The sea is calm today too.",
            es: "La vista aquí es hermosa. El mar también está tranquilo hoy.",
          },
        },
        {
          id: "c6-62-m2",
          from: "ahmad",
          text: {
            ms: "Betul. Angin pantai pun sejuk, sedap duduk lama.",
            en: "True. The beach breeze is cool, nice to sit here longer.",
            es: "Cierto. La brisa de la playa es fresca, da gusto quedarse más tiempo.",
          },
        },
        {
          id: "c6-62-m3",
          from: "me",
          text: {
            ms: "Jom duduk bawah pokok sekejap, panas tadi kuat juga.",
            en: "Let's sit under the tree for a while, it was quite hot earlier.",
            es: "Sentemonos un rato bajo el arbol, antes hacia bastante calor.",
          },
        },
        {
          id: "c6-62-m4",
          from: "ahmad",
          text: {
            ms: "Baik. Eh, ada botol plastik dekat tepi air.",
            en: "Alright. Hey, there is a plastic bottle near the water.",
            es: "Bien. Eh, hay una botella de plastico cerca del agua.",
          },
        },
        {
          id: "c6-62-m5",
          from: "me",
          text: {
            ms: "Kita kutip sama-sama. Biar pantai kekal bersih.",
            en: "Let's pick it up together. Let the beach stay clean.",
            es: "Recojamosla juntos. Qué la playa se mantenga limpia.",
          },
        },
        {
          id: "c6-62-m6",
          from: "ahmad",
          text: {
            ms: "Setuju. Lepas ini kita jalan sampai hujung pantai?",
            en: "Agreed. After this shall we walk to the end of the beach?",
            es: "De acuerdo. Después de esto, ¿caminamos hasta el final de la playa?",
          },
        },
        {
          id: "c6-62-m7",
          from: "me",
          text: {
            ms: "Boleh. Saya nak tengok matahari terbenam dari sana.",
            en: "Sure. I want to watch the sunset from there.",
            es: "Claro. Quiero ver el atardecer desde allí.",
          },
        },
        {
          id: "c6-62-m8",
          from: "ahmad",
          text: {
            ms: "Cantik waktu senja. Kadang-kadang nampak juga bot nelayan balik.",
            en: "Twilight is beautiful. Sometimes we can also see fishing boats returning.",
            es: "El atardecer es bonito. A veces también se ven barcos pesqueros regresando.",
          },
        },
        {
          id: "c6-62-m9",
          from: "me",
          text: {
            ms: "Seronok juga. Saya suka suasana pantai yang tenang macam ini.",
            en: "This is nice. I like calm beach vibes like this.",
            es: "Esto está bien. Me gusta el ambiente tranquilo de playa como este.",
          },
        },
        {
          id: "c6-62-m10",
          from: "ahmad",
          text: {
            ms: "Saya pun sama. Minggu depan kita datang lagi.",
            en: "Same here. Next week we come again.",
            es: "Yo también. La proxima semana venimos otra vez.",
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
