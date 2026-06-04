import type { ChapterContent, ChapterTablePage } from "./types";

const occupationImageClassName = "w-full h-auto max-h-40 object-contain rounded-xl";

const occupationRows = {
  visible: [
    {
      id: "c9-row-guru",
      cells: {
        perkara: [{ ms: "Saya seorang guru.", en: "I am a teacher.", es: "Soy maestro." }],
        butiran: [
          {
            ms: "Saya mengajar murid di sekolah.",
            en: "I teach students at school.",
            es: "Enseño a los estudiantes en la escuela.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/ch9_cikgu.webp",
            alt: { ms: "guru mengajar", en: "teacher teaching", es: "maestro enseñando" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-doktor",
      cells: {
        perkara: [{ ms: "Saya seorang doktor.", en: "I am a doctor.", es: "Soy doctor." }],
        butiran: [
          {
            ms: "Saya merawat pesakit.",
            en: "I treat patients.",
            es: "Atiendo a los pacientes.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/ch9_doktor.webp",
            alt: { ms: "doktor merawat pesakit", en: "doctor treating patients", es: "doctor atendiendo pacientes" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-tukang-masak",
      cells: {
        perkara: [{ ms: "Saya seorang tukang masak.", en: "I am a cook.", es: "Soy cocinero." }],
        butiran: [
          {
            ms: "Saya memasak makanan.",
            en: "I cook food.",
            es: "Cocino comida.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "tukang masak menyediakan kari", en: "cook preparing curry", es: "cocinero preparando curry" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-petani",
      cells: {
        perkara: [{ ms: "Saya seorang petani.", en: "I am a farmer.", es: "Soy agricultor." }],
        butiran: [
          {
            ms: "Saya menanam padi di sawah.",
            en: "I plant rice in the paddy field.",
            es: "Siembro arroz en el arrozal.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/ch9_petani.webp",
            alt: { ms: "petani di kebun", en: "farmer in the garden", es: "agricultor en el huerto" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-polis",
      cells: {
        perkara: [{ ms: "Saya seorang anggota polis.", en: "I am a police officer.", es: "Soy policía." }],
        butiran: [
          {
            ms: "Saya membantu orang awam.",
            en: "I help the public.",
            es: "Ayudo a la comunidad.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/ch9_polis.webp",
            alt: { ms: "polis membuat rondaan", en: "police officer patrolling", es: "policía patrullando" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-bomba",
      cells: {
        perkara: [{ ms: "Saya seorang anggota bomba.", en: "I am a firefighter.", es: "Soy bombero." }],
        butiran: [
          {
            ms: "Saya memadamkan api kecil.",
            en: "I put out a small fire.",
            es: "Apago un fuego pequeño.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/ch9_bomba.webp",
            alt: { ms: "bomba memadam api", en: "firefighter extinguishing flames", es: "bombero apagando fuego" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
  ],
  hidden: [
    {
      id: "c9-row-pelakon",
      cells: {
        perkara: [{ ms: "Día bekerja sebagai pelakon.", en: "He works as an actor.", es: "El trabaja como actor." }],
        butiran: [
          {
            ms: "Día berlakon dalam drama.",
            en: "He acts in dramas.",
            es: "El actua en dramas.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "pelakon berlakon", en: "actor performing", es: "actor actuando" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-arkitek",
      cells: {
        perkara: [{ ms: "Saya bekerja sebagai arkitek.", en: "I work as an architect.", es: "Trabajo como arquitecto." }],
        butiran: [
          {
            ms: "Saya mereka bangunan.",
            en: "I design buildings.",
            es: "Diseño edificios.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "arkitek mereka bangunan", en: "architect drawing buildings", es: "arquitecto diseñando edificios" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-penyanyi",
      cells: {
        perkara: [{ ms: "Profesion saya penyanyi.", en: "My profession is singer.", es: "Mi profesion es cantante." }],
        butiran: [
          {
            ms: "Saya menyanyi sebuah lagu di atas pentas.",
            en: "I sing a song on stage.",
            es: "Canto una canción en el escenario.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "penyanyi di pentas", en: "singer performing", es: "cantante actuando" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-askar",
      cells: {
        perkara: [{ ms: "Saya berkhidmat sebagai askar.", en: "I serve as a soldier.", es: "Sirvo como soldado." }],
        butiran: [
          {
            ms: "Saya menjaga keamanan negara.",
            en: "I guard the security of the country.",
            es: "Cuido la seguridad del país.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "askar berjaga", en: "soldiers standing guard", es: "soldados en vigilancia" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-nelayan",
      cells: {
        perkara: [{ ms: "Pak cik itu nelayan.", en: "That uncle is a fisherman.", es: "Ese tio es pescador." }],
        butiran: [
          {
            ms: "Saya menangkap ikan di laut.",
            en: "I catch fish at sea.",
            es: "Pesco peces en el mar.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "nelayan di laut", en: "fisherman at sea", es: "pescador en el mar" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
    {
      id: "c9-row-penjual",
      cells: {
        perkara: [{ ms: "Ibu saya penjual.", en: "My mother is a seller.", es: "Mi madre es vendedora." }],
        butiran: [
          {
            ms: "Saya menjual nasi.",
            en: "I sell rice.",
            es: "Vendo arroz.",
          },
        ],
        gambar: [
          {
            kind: "image",
            src: "/assets/chapters/ch9/placeholder-pekerjaan.svg",
            alt: { ms: "penjual menjual makanan", en: "vendor selling food", es: "vendedor vendiendo comida" },
            w: 640,
            h: 360,
            className: occupationImageClassName,
          },
        ],
      },
    },
  ],
} satisfies Record<"visible" | "hidden", ChapterTablePage["rows"]>;

export const chapter09: ChapterContent = {
  id: 9,
  title: {
    ms: "Pekerjaan di Sekitar Kita",
    en: "Jobs Around Us",
    es: "Trabajos a nuestro alrededor",
  },
  pages: [
    {
      id: "c9-p3-jenis-pekerjaan",
      kind: "table",
      title: {
        ms: "Sila baca dan faham ayat di bawah dengan merujuk kepada gambar tersebut.",
        en: "Read and understand the sentences below while looking at the pictures.",
        es: "Lee y comprende las oraciones de abajo mientras miras las imágenes.",
      },
      columns: [
        { key: "perkara", label: { ms: "Ayat", en: "Sentence", es: "Oración" } },
        { key: "butiran", label: { ms: "Kerja saya", en: "My work", es: "Mi trabajo" } },
        { key: "gambar", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
      ],
      rows: occupationRows.visible,
    },
    {
      id: "c9-p4-chat-askar",
      kind: "chat",
      youId: "amri",
      title: {
        ms: "Situasi 9.1 Cita-cita menjadi seorang askar",
        en: "Situation 9.1 Ambition to become a soldier",
        es: "Situación 9.1 Aspiración de ser soldado",
      },
      context: {
        ms: "Latar tempat: sebuah sekolah",
        en: "Setting: a school",
        es: "Lugar: una escuela",
      },
      participants: [
        {
          id: "cikgu",
          name: { ms: "Cikgu", en: "Teacher", es: "Profesora" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
        { id: "amri", name: { ms: "Amri", en: "Amri", es: "Amri" } },
      ],
      messages: [
        { id: "c9-chat1-m1", from: "cikgu", text: { ms: "Amri.", en: "Amri.", es: "Amri." } },
        {
          id: "c9-chat1-m2",
          from: "cikgu",
          text: {
            ms: "Apakah cita-cita awak?",
            en: "What is your ambition?",
            es: "¿Cuál es tu aspiración?",
          },
        },
        {
          id: "c9-chat1-m3",
          from: "amri",
          text: {
            ms: "Saya bercita-cita ingin menjadi seorang askar, cikgu.",
            en: "I aspire to become a soldier, teacher.",
            es: "Aspiro a ser soldado, profesora.",
          },
        },
        {
          id: "c9-chat1-m4",
          from: "cikgu",
          text: {
            ms: "Kenapa awak ingin menjadi seorang askar?",
            en: "Why do you want to become a soldier?",
            es: "¿Por qué quieres ser soldado?",
          },
        },
        {
          id: "c9-chat1-m5",
          from: "amri",
          text: {
            ms: "Saya ingin menjaga keamanan negara, cikgu.",
            en: "I want to protect the country's safety, teacher.",
            es: "Quiero cuidar la seguridad del país, profesora.",
          },
        },
        {
          id: "c9-chat1-m6",
          from: "cikgu",
          text: {
            ms: "Awak memang seorang yang sangat berani.",
            en: "You truly are a very brave person.",
            es: "Eres una persona muy valiente.",
          },
        },
        {
          id: "c9-chat1-m7",
          from: "amri",
          text: {
            ms: "Saya ingin menjadi berani seperti ayah saya, cikgu.",
            en: "I want to be brave like my father, teacher.",
            es: "Quiero ser valiente como mi padre, profesora.",
          },
        },
        {
          id: "c9-chat1-m8",
          from: "cikgu",
          text: {
            ms: "Apakah pekerjaan ayah awak?",
            en: "What is your father's job?",
            es: "¿Cuál es el trabajo de tu padre?",
          },
        },
        {
          id: "c9-chat1-m9",
          from: "amri",
          text: {
            ms: "Ayah saya seorang anggota polis.",
            en: "My father is a police officer.",
            es: "Mi padre es un policía.",
          },
        },
        {
          id: "c9-chat1-m10",
          from: "cikgu",
          text: {
            ms: "Baguslah. Semoga cita-cita awak tercapai.",
            en: "Good. May your ambition come true.",
            es: "Bien. Ojalá se cumpla tu aspiración.",
          },
        },
        {
          id: "c9-chat1-m11",
          from: "amri",
          text: {
            ms: "Terima kasih cikgu.",
            en: "Thank you, teacher.",
            es: "Gracias, profesora.",
          },
        },
        {
          id: "c9-chat1-m12",
          from: "cikgu",
          text: {
            ms: "Sama-sama.",
            en: "You're welcome.",
            es: "De nada.",
          },
        },
      ],
    },
    {
      id: "c9-p5-chat-guru",
      kind: "chat",
      youId: "cikgu",
      title: {
        ms: "Situasi 9.2 Pekerjaan Seorang Guru",
        en: "Situation 9.2 Work of a Teacher",
        es: "Situación 9.2 Trabajo de una maestra",
      },
      context: {
        ms: "Latar tempat: Sebuah bilik darjah",
        en: "Setting: A classroom",
        es: "Lugar: Un aula",
      },
      participants: [
        { id: "ketua", name: { ms: "Ketua kelas", en: "Class monitor", es: "Jefe de clase" } },
        { id: "murid", name: { ms: "Semua murid", en: "All students", es: "Todos los alumnos" } },
        {
          id: "cikgu",
          name: { ms: "Cikgu", en: "Teacher", es: "Maestra" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
        { id: "finah", name: { ms: "Finah", en: "Finah", es: "Finah" } },
      ],
      messages: [
        { id: "c9-chat2-m1", from: "ketua", text: { ms: "Selamat pagi, cikgu.", en: "Good morning, teacher.", es: "Buenos días, profesora." } },
        { id: "c9-chat2-m2", from: "murid", text: { ms: "Selamat pagi, cikgu.", en: "Good morning, teacher.", es: "Buenos días, profesora." } },
        {
          id: "c9-chat2-m3",
          from: "cikgu",
          text: {
            ms: "Selamat pagi. Hari ini kita buat aktiviti cari kata kerja.",
            en: "Good morning. Today we will do an activity to find action words.",
            es: "Buenos días. Hoy haremos una actividad para encontrar palabras de acción.",
          },
        },
        { id: "c9-chat2-m4", from: "murid", text: { ms: "Baik, cikgu.", en: "Okay, teacher.", es: "Está bien, profesora." } },
        {
          id: "c9-chat2-m5",
          from: "cikgu",
          text: {
            ms: "Dengar ayat ini: Aina menyusun buku di atas meja.",
            en: "Listen to this sentence: Aina arranges books on the table.",
            es: "Escuchen esta oración: Aina ordena libros sobre la mesa.",
          },
        },
        { id: "c9-chat2-m6", from: "murid", text: { ms: "Aina menyusun buku di atas meja.", en: "Aina arranges books on the table.", es: "Aina ordena libros sobre la mesa." } },
        {
          id: "c9-chat2-m7",
          from: "cikgu",
          text: {
            ms: "Bagus. Finah, mana satu kata kerja?",
            en: "Good. Finah, which one is the action word?",
            es: "Bien. Finah, ¿cuál es la palabra de acción?",
          },
        },
        {
          id: "c9-chat2-m8",
          from: "finah",
          text: {
            ms: "Kata kerja ialah menyusun.",
            en: "The action word is arranges.",
            es: "La palabra de acción es ordena.",
          },
        },
        {
          id: "c9-chat2-m9",
          from: "cikgu",
          text: {
            ms: "Betul. Menyusun ialah perbuatan.",
            en: "Correct. Arranging is an action.",
            es: "Correcto. Ordenar es una acción.",
          },
        },
        {
          id: "c9-chat2-m10",
          from: "cikgu",
          text: {
            ms: "Sekarang cuba ayat kedua: Amir melukis peta kecil.",
            en: "Now try the second sentence: Amir draws a small map.",
            es: "Ahora prueben la segunda oracion: Amir dibuja un mapa pequeno.",
          },
        },
        {
          id: "c9-chat2-m11",
          from: "murid",
          text: {
            ms: "Kata kerja ialah melukis.",
            en: "The action word is draws.",
            es: "La palabra de acción es dibuja.",
          },
        },
        {
          id: "c9-chat2-m12",
          from: "cikgu",
          text: {
            ms: "Bagus. Hari ini semua sudah pandai cari kata kerja.",
            en: "Good. Today everyone can find action words.",
            es: "Bien. Hoy todos ya saben encontrar palabras de acción.",
          },
        },
      ],
    },
    {
      id: "c9-p6-wordsearch-pekerjaan",
      kind: "wordsearch",
      title: {
        ms: "Aktiviti: Cari Kata Pekerjaan",
        en: "Activity: Job Word Search",
        es: "Actividad: Sopa de letras de trabajos",
      },
      instructions: {
        ms: "Cari dan tandakan 7 perkataan pekerjaan dalam petak huruf. Tiada garisan serong atau terbalik.",
        en: "Find and mark the 7 job words in the grid. No diagonal or backwards words.",
        es: "Busca y marca los 7 nombres de trabajos en la cuadrícula. Sin diagonales ni palabras al revés.",
      },
      size: 12,
      autoGenerate: true,
      allowDiagonal: false,
      allowReverse: false,
      targets: [
        { id: "ws-guru", word: "GURU", label: { ms: "guru", en: "teacher", es: "maestro" } },
        { id: "ws-doktor", word: "DOKTOR", label: { ms: "doktor", en: "doctor", es: "doctor" } },
        { id: "ws-polis", word: "POLIS", label: { ms: "polis", en: "police", es: "policía" } },
        { id: "ws-askar", word: "ASKAR", label: { ms: "askar", en: "soldier", es: "soldado" } },
        { id: "ws-petani", word: "PETANI", label: { ms: "petani", en: "farmer", es: "agricultor" } },
        { id: "ws-nelayan", word: "NELAYAN", label: { ms: "nelayan", en: "fisherman", es: "pescador" } },
        { id: "ws-pelakon", word: "PELAKON", label: { ms: "pelakon", en: "actor", es: "actor" } },
      ],
    },
    {
      id: "c9-p7-crossword-latihan2",
      kind: "crossword",
      title: {
        ms: "Latihan 2: Silang Kata Pekerjaan",
        en: "Exercise 2: Jobs Crossword",
        es: "Ejercicio 2: Crucigrama de trabajos",
      },
      instructions: {
        ms: "Lengkapkan silang kata di bawah dengan jawapan yang tepat.",
        en: "Complete the crossword below with the correct answers.",
        es: "Completa el crucigrama con las respuestas correctas.",
      },
      rows: 6,
      cols: 7,
      clues: [
        {
          id: "c9-cw-1",
          n: 1,
          dir: "across",
          row: 2,
          col: 0,
          answer: "DOKTOR",
          revealed: [0, 3, 5],
          clue: {
            ms: "__________ merawat pesakit.",
            en: "__________ treats patients.",
            es: "__________ atiende a los pacientes.",
          },
        },
        {
          id: "c9-cw-2",
          n: 2,
          dir: "across",
          row: 3,
          col: 0,
          answer: "PELAKUN",
          revealed: [2, 3, 4, 6],
          clue: {
            ms: "Abang dia seorang ________ kerana selalu muncul di kaca TV.",
            en: "Her elder brother is a ________ because he often appears on TV.",
            es: "Su hermano mayor es ________ porque aparece a menudo en la TV.",
          },
        },
        {
          id: "c9-cw-3",
          n: 3,
          dir: "across",
          row: 5,
          col: 0,
          answer: "POLIS",
          revealed: [0, 3, 4],
          clue: {
            ms: "__________ tangkap pencuri.",
            en: "__________ catches thieves.",
            es: "__________ atrapa ladrones.",
          },
        },
        {
          id: "c9-cw-4",
          n: 4,
          dir: "down",
          row: 0,
          col: 3,
          answer: "PETANI",
          revealed: [1, 2, 3, 5],
          clue: {
            ms: "Setiap pagi ayahnya pergi ke kebun.",
            en: "Every morning his father goes to the farm.",
            es: "Cada manana su padre va a la huerta.",
          },
        },
        {
          id: "c9-cw-5",
          n: 5,
          dir: "down",
          row: 0,
          col: 5,
          answer: "GURU",
          revealed: [0, 2],
          clue: {
            ms: "Tugasnya ialah mengajar.",
            en: "The duty is to teach.",
            es: "Su tarea es ensenar.",
          },
        },
      ],
    },
  ],
};
