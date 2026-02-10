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
        ms: "Latar tempat: Di sebuah pondok",
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
          id: "c10-1-m1",
          from: "ali",
          text: {
            ms: "Azman.",
            en: "Azman.",
            es: "Azman.",
          },
        },
        {
          id: "c10-1-m2",
          from: "azman",
          text: {
            ms: "Eh, Ali.",
            en: "Hey, Ali.",
            es: "Eh, Ali.",
          },
        },
        {
          id: "c10-1-m3",
          from: "ali",
          text: {
            ms: "Awak sedang bermain permainan apa?",
            en: "What game are you playing?",
            es: "Que juego estas jugando?",
          },
        },
        {
          id: "c10-1-m4",
          from: "azman",
          text: {
            ms: "Saya sedang bermain congkak. Permainan ini merupakan permainan tradisional.",
            en: "I am playing congkak. This game is a traditional game.",
            es: "Estoy jugando congkak. Este juego es un juego tradicional.",
          },
        },
        {
          id: "c10-1-m5",
          from: "ali",
          text: {
            ms: "Oo, begitu. Apa lagi permainan tradisional selain congkak?",
            en: "Oh, I see. What other traditional games are there besides congkak?",
            es: "Oh, ya veo. Que otros juegos tradicionales hay ademas de congkak?",
          },
        },
        {
          id: "c10-1-m6",
          from: "azman",
          text: {
            ms: "Selain congkak, terdapat permainan seperti dam haji, wau, layang-layang, batu seremban, gasing, guli dan banyak lagi.",
            en: "Besides congkak, there are games such as dam haji, wau, kites, batu seremban, gasing, marbles and many more.",
            es: "Ademas de congkak, hay juegos como dam haji, wau, cometa, batu seremban, gasing, canicas y muchos mas.",
          },
        },
        {
          id: "c10-1-m7",
          from: "ali",
          text: {
            ms: "Wah! Menariknya. Awak selalu bermain permainan ini pada waktu bila?",
            en: "Wow, interesting. When do you usually play this game?",
            es: "Guau, que interesante. Cuando sueles jugar este juego?",
          },
        },
        {
          id: "c10-1-m8",
          from: "azman",
          text: {
            ms: "Saya selalu bermain pada waktu lapang, tidak kira pagi, petang atau malam.",
            en: "I always play during free time, whether morning, evening, or night.",
            es: "Siempre juego en mi tiempo libre, por la manana, la tarde o la noche.",
          },
        },
        {
          id: "c10-1-m9",
          from: "ali",
          text: {
            ms: "Oo, begitu. Nanti boleh saya bermain sekali.",
            en: "Oh, I see. Later can I play together too.",
            es: "Oh, ya veo. Luego puedo jugar contigo tambien.",
          },
        },
        {
          id: "c10-1-m10",
          from: "azman",
          text: {
            ms: "Boleh, sudah tentu.",
            en: "Sure, of course.",
            es: "Claro, por supuesto.",
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
            ms: "Boleh awak ajar saya cara bermain congkak?",
            en: "Can you teach me how to play congkak?",
            es: "Puedes ensenarme como jugar congkak?",
          },
        },
        {
          id: "c10-2-m2",
          from: "azman",
          text: {
            ms: "Boleh, apa salahnya. Permainan congkak ini menggunakan guli dan papan congkak.",
            en: "Sure, why not. This congkak game uses marbles and a congkak board.",
            es: "Claro, por que no. Este juego de congkak usa canicas y un tablero de congkak.",
          },
        },
        {
          id: "c10-2-m3",
          from: "ali",
          text: {
            ms: "Oo... Berapakah biji guli yang diperlukan untuk bermain permainan ini?",
            en: "Oh... How many marbles are needed to play this game?",
            es: "Oh... Cuantas canicas se necesitan para jugar este juego?",
          },
        },
        {
          id: "c10-2-m4",
          from: "azman",
          text: {
            ms: "Sebanyak 98 biji guli diperlukan untuk bermain permainan ini.",
            en: "A total of 98 marbles are needed to play this game.",
            es: "Se necesitan 98 canicas para jugar este juego.",
          },
        },
        {
          id: "c10-2-m5",
          from: "ali",
          text: {
            ms: "Apakah lubang-lubang yang ada pada papan congkak?",
            en: "What are the holes on the congkak board?",
            es: "Cuales son los agujeros que hay en el tablero de congkak?",
          },
        },
        {
          id: "c10-2-m6",
          from: "azman",
          text: {
            ms: "Lubang-lubang ini yang perlu dimasukkan guli. Terdapat 14 lubang rumah untuk 2 kampung dan 2 lubang ibu.",
            en: "These are the holes where marbles are placed. There are 14 house holes for 2 villages and 2 mother holes.",
            es: "Estos son los agujeros donde se colocan las canicas. Hay 14 agujeros de casa para 2 kampung y 2 agujeros ibu.",
          },
        },
        {
          id: "c10-2-m7",
          from: "ali",
          text: {
            ms: "Berapa orang pemain diperlukan untuk bermain permainan ini?",
            en: "How many players are needed to play this game?",
            es: "Cuantos jugadores se necesitan para jugar este juego?",
          },
        },
        {
          id: "c10-2-m8",
          from: "azman",
          text: {
            ms: "Permainan congkak memerlukan hanya dua orang pemain sahaja.",
            en: "The congkak game requires only two players.",
            es: "El juego de congkak solo requiere dos jugadores.",
          },
        },
        {
          id: "c10-2-m9",
          from: "ali",
          text: {
            ms: "Jadi, bagaimanakah cara bermain congkak?",
            en: "So, how do we play congkak?",
            es: "Entonces, como se juega congkak?",
          },
        },
        {
          id: "c10-2-m10",
          from: "azman",
          text: {
            ms: "Begini, setiap pemain perlu mengambil guli dari mana-mana lubang rumah dan memasukkannya ke dalam lubang ibu masing-masing secara berturutan. Pemain yang memiliki guli yang paling banyak dalam lubang ibu adalah pemenang.",
            en: "Like this, each player takes marbles from any house hole and places them into their own mother hole in sequence. The player with the most marbles in the mother hole is the winner.",
            es: "Asi, cada jugador toma canicas de cualquier agujero de casa y las coloca en su agujero ibu por turno. El jugador con mas canicas en el agujero ibu es el ganador.",
          },
        },
        {
          id: "c10-2-m11",
          from: "ali",
          text: {
            ms: "Oo, menarik. Boleh saya bermain?",
            en: "Oh, interesting. Can I play?",
            es: "Oh, interesante. Puedo jugar?",
          },
        },
        {
          id: "c10-2-m12",
          from: "azman",
          text: {
            ms: "Boleh. Marilah bermain.",
            en: "Sure. Let's play.",
            es: "Claro. Vamos a jugar.",
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
            ms: "Azman...",
            en: "Azman...",
            es: "Azman...",
          },
        },
        {
          id: "c10-3-m2",
          from: "azman",
          text: {
            ms: "Eh, Ahmad.",
            en: "Hey, Ahmad.",
            es: "Eh, Ahmad.",
          },
        },
        {
          id: "c10-3-m3",
          from: "ahmad",
          text: {
            ms: "Awak sedang bermain permainan apa?",
            en: "What game are you playing?",
            es: "Que juego estas jugando?",
          },
        },
        {
          id: "c10-3-m4",
          from: "azman",
          text: {
            ms: "Saya sedang bermain layang-layang.",
            en: "I am playing with a kite.",
            es: "Estoy jugando con una cometa.",
          },
        },
        {
          id: "c10-3-m5",
          from: "ahmad",
          text: {
            ms: "Layang-layang?",
            en: "A kite?",
            es: "Una cometa?",
          },
        },
        {
          id: "c10-3-m6",
          from: "azman",
          text: {
            ms: "Layang-layang merupakan permainan tradisional yang diperbuat daripada kayu sebagai rangka dan kertas ataupun plastik untuk membuat badannya.",
            en: "A kite is a traditional game made using wood as the frame and paper or plastic for the body.",
            es: "La cometa es un juego tradicional hecho con madera como estructura y papel o plastico para su cuerpo.",
          },
        },
        {
          id: "c10-3-m7",
          from: "ahmad",
          text: {
            ms: "Wah! Cantiknya layang-layang awak.",
            en: "Wow! Your kite is beautiful.",
            es: "Guau. Tu cometa es muy bonita.",
          },
        },
        {
          id: "c10-3-m8",
          from: "azman",
          text: {
            ms: "Betul! Setiap layang-layang mempunyai pelbagai bentuk dan corak yang menarik seperti layang-layang saya mempunyai ekor.",
            en: "That's right. Every kite has various interesting shapes and patterns, like mine which has a tail.",
            es: "Asi es. Cada cometa tiene formas y patrones interesantes, como la mia que tiene cola.",
          },
        },
        {
          id: "c10-3-m9",
          from: "ahmad",
          text: {
            ms: "Bagaimanakah cara bermain layang-layang?",
            en: "How do we play kite-flying?",
            es: "Como se juega con cometa?",
          },
        },
        {
          id: "c10-3-m10",
          from: "azman",
          text: {
            ms: "Layang-layang memerlukan dua orang pemain dan dimainkan di kawasan yang luas.",
            en: "Kite-flying needs two players and is played in a wide open area.",
            es: "El juego de cometa requiere dos jugadores y se juega en un area amplia.",
          },
        },
        {
          id: "c10-3-m11",
          from: "ahmad",
          text: {
            ms: "Kenapa memerlukan dua orang pemain?",
            en: "Why does it need two players?",
            es: "Por que se necesitan dos jugadores?",
          },
        },
        {
          id: "c10-3-m12",
          from: "azman",
          text: {
            ms: "Seorang akan memegang layang-layang dan seorang lagi akan memegang tali. Apabila angin bertiup, tali akan ditarik melawan arus angin sehingga layang-layang terbang ke udara.",
            en: "One person holds the kite and another holds the string. When the wind blows, the string is pulled against the wind so the kite rises into the sky.",
            es: "Una persona sostiene la cometa y otra sostiene el hilo. Cuando sopla el viento, se tira del hilo contra el viento hasta que la cometa vuele al cielo.",
          },
        },
        {
          id: "c10-3-m13",
          from: "ahmad",
          text: {
            ms: "Oo, begitu. Bolehkah saya bermain bersama awak?",
            en: "Oh, I see. Can I play together with you?",
            es: "Oh, ya veo. Puedo jugar contigo?",
          },
        },
        {
          id: "c10-3-m14",
          from: "azman",
          text: {
            ms: "Boleh, sudah tentu. Marilah.",
            en: "Sure, of course. Let's go.",
            es: "Claro, por supuesto. Vamos.",
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
