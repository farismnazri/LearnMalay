import type { ChapterContent } from "./types";

export const chapter10: ChapterContent = {
  id: 10,
  title: {
    ms: "Permainan Tradisional",
    en: "Traditional Games",
    es: "Juegos Tradicionales",
  },
  pages: [
    {
      id: "c10-p1-screenshot",
      kind: "figure",
      title: {
        ms: "Permainan Tradisional",
        en: "Traditional Games",
        es: "Juegos Tradicionales",
      },
      imageSrc: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
      alt: {
        ms: "Lembaran kerja permainan tradisional",
        en: "Traditional games worksheet",
        es: "Hoja de trabajo de juegos tradicionales",
      },
      caption: {
        ms: "Rujuk gambar ini untuk pengenalan permainan tradisional di Malaysia.",
        en: "Use this image as a reference for traditional games in Malaysia.",
        es: "Usa esta imagen como referencia de los juegos tradicionales en Malasia.",
      },
      maxWidthPx: 1080,
    },
    {
      id: "c10-p2-chat-congkak",
      kind: "chat",
      youId: "azman",
      title: {
        ms: "Situasi 10.1 Memperkenalkan Permainan Tradisional Congkak",
        en: "Situation 10.1 Introducing the Traditional Game Congkak",
        es: "Situacion 10.1 Presentando el juego tradicional congkak",
      },
      context: {
        ms: "Latar tempat: Sebuah taman permainan",
        en: "Setting: At a playground",
        es: "Lugar: En un parque infantil",
      },
      participants: [
        {
          id: "ali",
          name: { ms: "Ali", en: "Ali", es: "Ali" },
        },
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c10-1-m1",
          from: "ali",
          text: {
            ms: "Azman, awak bawa papan congkak ke taman?",
            en: "Azman, did you bring a congkak board to the park?",
            es: "Azman, ¿trajiste un tablero de congkak al parque?",
          },
        },
        {
          id: "c10-1-m2",
          from: "azman",
          text: {
            ms: "Ya. Tadi saya main sementara tunggu kawan.",
            en: "Yes. I was playing while waiting for a friend.",
            es: "Sí. Estaba jugando mientras esperaba a un amigo.",
          },
        },
        {
          id: "c10-1-m3",
          from: "ali",
          text: {
            ms: "Boleh saya tengok dekat-dekat?",
            en: "Can I take a closer look?",
            es: "¿Puedo verlo de cerca?",
          },
        },
        {
          id: "c10-1-m4",
          from: "azman",
          text: {
            ms: "Boleh. Duduk sini, saya tunjuk cara pegang guli.",
            en: "Sure. Sit here, I'll show you how to hold the marbles.",
            es: "Claro. Siéntate aquí, te muestro como sujetar las canicas.",
          },
        },
        {
          id: "c10-1-m5",
          from: "ali",
          text: {
            ms: "Nampak seronok. Awak selalu main di taman ini?",
            en: "Looks fun. Do you often play at this park?",
            es: "Se ve divertido. ¿Juegas seguido en este parque?",
          },
        },
        {
          id: "c10-1-m6",
          from: "azman",
          text: {
            ms: "Selalu juga. Kadang-kadang kami bawa gasing atau wau kecil.",
            en: "Quite often. Sometimes we bring a spinning top or a small wau kite.",
            es: "Bastante seguido. A veces traemos un trompo o un wau pequeno.",
          },
        },
        {
          id: "c10-1-m7",
          from: "ali",
          text: {
            ms: "Oh, petang ini kita cuba congkak dulu.",
            en: "Oh, this evening let's try congkak first.",
            es: "Ah, esta tarde probemos congkak primero.",
          },
        },
        {
          id: "c10-1-m8",
          from: "azman",
          text: {
            ms: "Boleh. Lepas ini awak cuba satu pusingan.",
            en: "Sure. After this you can try one round.",
            es: "Claro. Después de esto puedes intentar una ronda.",
          },
        },
        {
          id: "c10-1-m9",
          from: "ali",
          text: {
            ms: "Baik, saya duduk di depan awak.",
            en: "Alright, I'll sit opposite you.",
            es: "Bien, me sentare enfrente de ti.",
          },
        },
        {
          id: "c10-1-m10",
          from: "azman",
          text: {
            ms: "Bagus. Jom mula.",
            en: "Good. Let's start.",
            es: "Bien. Empecemos.",
          },
        },
      ],
    },
    {
      id: "c10-p3-chat-cara-congkak",
      kind: "chat",
      youId: "azman",
      title: {
        ms: "Situasi 10.2 Cara Bermain Congkak",
        en: "Situation 10.2 How to Play Congkak",
        es: "Situacion 10.2 Como jugar congkak",
      },
      context: {
        ms: "Latar tempat: Di Sebuah pondok",
        en: "Setting: At a hut",
        es: "Lugar: En una choza",
      },
      participants: [
        {
          id: "ali",
          name: { ms: "Ali", en: "Ali", es: "Ali" },
        },
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c10-2-m1",
          from: "ali",
          text: {
            ms: "Saya sudah susun guli. Betul tak, Azman?",
            en: "I have arranged the marbles. Is it right, Azman?",
            es: "Ya acomodé las canicas. ¿Está bien, Azman?",
          },
        },
        {
          id: "c10-2-m2",
          from: "azman",
          text: {
            ms: "Hampir betul. Letak tujuh biji guli di setiap lubang rumah.",
            en: "Almost right. Put seven marbles in each house hole.",
            es: "Casi está bien. Pon siete canicas en cada agujero de casa.",
          },
        },
        {
          id: "c10-2-m3",
          from: "ali",
          text: {
            ms: "Baik. Ini lubang rumah saya?",
            en: "Alright. Is this my house hole?",
            es: "Bien. ¿Este es mi agujero de casa?",
          },
        },
        {
          id: "c10-2-m4",
          from: "azman",
          text: {
            ms: "Ya. Lubang besar di kanan ialah lubang ibu awak.",
            en: "Yes. The big hole on the right is your home store.",
            es: "Sí. El agujero grande a la derecha es tu deposito.",
          },
        },
        {
          id: "c10-2-m5",
          from: "ali",
          text: {
            ms: "Sekarang saya mula dari lubang ini?",
            en: "Now do I start from this hole?",
            es: "¿Ahora empiezo desde este agujero?",
          },
        },
        {
          id: "c10-2-m6",
          from: "azman",
          text: {
            ms: "Boleh. Ambil semua guli dan edarkan satu-satu.",
            en: "Yes. Take all the marbles and distribute them one by one.",
            es: "Sí. Toma todas las canicas y distribuyelas una por una.",
          },
        },
        {
          id: "c10-2-m7",
          from: "ali",
          text: {
            ms: "Saya masukkan satu guli di sini, kemudian di sini.",
            en: "I put one marble here, then here.",
            es: "Pongo una canica aquí, luego aquí.",
          },
        },
        {
          id: "c10-2-m8",
          from: "azman",
          text: {
            ms: "Bagus. Teruskan ikut arah ini.",
            en: "Good. Continue in this direction.",
            es: "Bien. Sigue en esta dirección.",
          },
        },
        {
          id: "c10-2-m9",
          from: "ali",
          text: {
            ms: "Eh, saya masukkan guli ke lubang ibu awak.",
            en: "Oh, I put a marble into your home store.",
            es: "Ah, puse una canica en tu deposito.",
          },
        },
        {
          id: "c10-2-m10",
          from: "azman",
          text: {
            ms: "Jangan. Langkau lubang ibu lawan. Masuk ke lubang ibu sendiri.",
            en: "Don't. Skip your opponent's home store. Put it into your own home store.",
            es: "No. Salta el deposito del rival. Ponla en tu propio deposito.",
          },
        },
        {
          id: "c10-2-m11",
          from: "ali",
          text: {
            ms: "Oh, faham. Saya cuba sekali lagi.",
            en: "Oh, I understand. I will try again.",
            es: "Ah, entiendo. Lo intento otra vez.",
          },
        },
        {
          id: "c10-2-m12",
          from: "azman",
          text: {
            ms: "Bagus. Giliran saya selepas guli awak habis.",
            en: "Good. It is my turn after your marbles run out.",
            es: "Bien. Es mi turno cuando se acaben tus canicas.",
          },
        },
      ],
    },
    {
      id: "c10-p4-chat-layang-layang",
      kind: "chat",
      youId: "azman",
      title: {
        ms: "Situasi 10.3 Memperkenalkan Permainan Tradisional Layang-layang",
        en: "Situation 10.3 Introducing the Traditional Game Kite-flying",
        es: "Situacion 10.3 Presentando el juego tradicional de cometas",
      },
      context: {
        ms: "Latar tempat: Di padang permainan",
        en: "Setting: At the playground field",
        es: "Lugar: En el campo de juego",
      },
      participants: [
        {
          id: "ahmad",
          name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" },
        },
        {
          id: "azman",
          name: { ms: "Azman", en: "Azman", es: "Azman" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c10-3-m1",
          from: "ahmad",
          text: {
            ms: "Angin kuat hari ini, Azman.",
            en: "The wind is strong today, Azman.",
            es: "El viento está fuerte hoy, Azman.",
          },
        },
        {
          id: "c10-3-m2",
          from: "azman",
          text: {
            ms: "Ya, sesuai untuk naikkan layang-layang.",
            en: "Yes, it is good for flying a kite.",
            es: "Sí, es bueno para volar una cometa.",
          },
        },
        {
          id: "c10-3-m3",
          from: "ahmad",
          text: {
            ms: "Saya pegang rangka ini?",
            en: "Do I hold this frame?",
            es: "¿Sostengo este marco?",
          },
        },
        {
          id: "c10-3-m4",
          from: "azman",
          text: {
            ms: "Ya, pegang rangka dengan dua tangan.",
            en: "Yes, hold the frame with two hands.",
            es: "Sí, sostén el marco con dos manos.",
          },
        },
        {
          id: "c10-3-m5",
          from: "ahmad",
          text: {
            ms: "Siapa pegang tali?",
            en: "Who holds the string?",
            es: "¿Quién sostiene el hilo?",
          },
        },
        {
          id: "c10-3-m6",
          from: "azman",
          text: {
            ms: "Saya pegang tali. Bila kita kira tiga, awak lepaskan.",
            en: "I hold the string. When we count to three, you let go.",
            es: "Yo sostengo el hilo. Cuando contemos hasta tres, sueltas.",
          },
        },
        {
          id: "c10-3-m7",
          from: "ahmad",
          text: {
            ms: "Baik. Saya berdiri di sini?",
            en: "Alright. Do I stand here?",
            es: "Bien. ¿Me paro aquí?",
          },
        },
        {
          id: "c10-3-m8",
          from: "azman",
          text: {
            ms: "Mundur sedikit. Angin datang dari depan.",
            en: "Step back a little. The wind is coming from the front.",
            es: "Retrocede un poco. El viento viene de frente.",
          },
        },
        {
          id: "c10-3-m9",
          from: "ahmad",
          text: {
            ms: "Satu, dua, tiga. Saya lepaskan!",
            en: "One, two, three. I let go!",
            es: "Uno, dos, tres. ¡Suelto!",
          },
        },
        {
          id: "c10-3-m10",
          from: "azman",
          text: {
            ms: "Tarik tali perlahan-lahan. Layang-layang sudah naik.",
            en: "Pull the string slowly. The kite is going up.",
            es: "Tira del hilo despacio. La cometa está subiendo.",
          },
        },
        {
          id: "c10-3-m11",
          from: "ahmad",
          text: {
            ms: "Wah, tinggi! Ekor layang-layang bergerak.",
            en: "Wow, it is high! The kite's tail is moving.",
            es: "¡Vaya, está alta! La cola de la cometa se mueve.",
          },
        },
        {
          id: "c10-3-m12",
          from: "azman",
          text: {
            ms: "Betul. Sekarang awak cuba pegang tali.",
            en: "Correct. Now you try holding the string.",
            es: "Correcto. Ahora intenta sostener el hilo.",
          },
        },
      ],
    },
    {
      id: "c10-p5-wordsearch-permainan",
      kind: "wordsearch",
      title: {
        ms: "Aktiviti: Cari Kata Permainan Tradisional",
        en: "Activity: Traditional Games Word Search",
        es: "Actividad: Sopa de letras de juegos tradicionales",
      },
      instructions: {
        ms: "Cari 7 perkataan yang dipelajari dalam bab ini.",
        en: "Find 7 words learned in this chapter.",
        es: "Busca 7 palabras aprendidas en este capitulo.",
      },
      size: 12,
      autoGenerate: true,
      allowDiagonal: false,
      allowReverse: false,
      targets: [
        { id: "c10-ws-congkak", word: "CONGKAK", label: { ms: "congkak", en: "congkak", es: "congkak" } },
        { id: "c10-ws-layang", word: "LAYANGLAYANG", label: { ms: "layang-layang", en: "kite", es: "cometa" } },
        { id: "c10-ws-wau", word: "WAU", label: { ms: "wau", en: "kite", es: "cometa" } },
        { id: "c10-ws-gasing", word: "GASING", label: { ms: "gasing", en: "spinning top", es: "trompo" } },
        { id: "c10-ws-damhaji", word: "DAMHAJI", label: { ms: "dam haji", en: "checkers", es: "damas" } },
        { id: "c10-ws-lompat", word: "LOMPATTALI", label: { ms: "lompat tali", en: "jump rope", es: "saltar la cuerda" } },
        { id: "c10-ws-seremban", word: "BATUSEREMBAN", label: { ms: "batu seremban", en: "five stones", es: "cinco piedras" } },
      ],
    },
    {
      id: "c10-p6-typein-latihan",
      kind: "typein",
      title: {
        ms: "Latihan 2",
        en: "Exercise 2",
        es: "Ejercicio 2",
      },
      instructions: {
        ms: "Nyatakan nama permainan berdasarkan gambar di bawah.",
        en: "State the name of the game based on the picture below.",
        es: "Escribe el nombre del juego segun la imagen de abajo.",
      },
      items: [
        {
          id: "c10-ty-1",
          n: 1,
          scrambled: "gambar 1",
          answer: "congkak",
          image: {
            src: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
            alt: "congkak",
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-40 object-contain rounded-xl",
          },
        },
        {
          id: "c10-ty-2",
          n: 2,
          scrambled: "gambar 2",
          answer: "layang-layang",
          image: {
            src: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
            alt: "layang-layang",
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-40 object-contain rounded-xl",
          },
        },
        {
          id: "c10-ty-3",
          n: 3,
          scrambled: "gambar 3",
          answer: "gasing",
          image: {
            src: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
            alt: "gasing",
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-40 object-contain rounded-xl",
          },
        },
        {
          id: "c10-ty-4",
          n: 4,
          scrambled: "gambar 4",
          answer: "dam-haji",
          image: {
            src: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
            alt: "dam-haji",
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-40 object-contain rounded-xl",
          },
        },
        {
          id: "c10-ty-5",
          n: 5,
          scrambled: "gambar 5",
          answer: "lompat tali",
          image: {
            src: "/assets/chapters/ch10/placeholder-permainan-tradisional.svg",
            alt: "lompat tali",
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-40 object-contain rounded-xl",
          },
        },
      ],
    },
  ],
};
