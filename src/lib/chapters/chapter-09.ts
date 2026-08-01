import type { ChapterContent, ChapterTablePage } from "./types";

const occupationImageClassName = "w-full h-auto max-h-40 object-contain rounded-xl";

const occupationRows = [
  {
    id: "c9-row-guru",
    cells: {
      perkara: [{ ms: "Guru", en: "Teacher", es: "Docente" }],
      butiran: [
        {
          ms: "Guru mengajar murid di sekolah.",
          en: "A teacher teaches students at school.",
          es: "Un docente enseña a los alumnos en la escuela.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_cikgu.webp",
          alt: { ms: "guru mengajar", en: "teacher teaching", es: "docente enseñando" },
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
      perkara: [{ ms: "Doktor", en: "Doctor", es: "Médico o médica" }],
      butiran: [
        {
          ms: "Doktor merawat pesakit.",
          en: "A doctor treats patients.",
          es: "Un médico o una médica atiende a los pacientes.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_doktor.webp",
          alt: { ms: "doktor merawat pesakit", en: "doctor treating patients", es: "médico atendiendo a pacientes" },
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
      perkara: [{ ms: "Tukang masak", en: "Cook", es: "Cocinero o cocinera" }],
      butiran: [
        {
          ms: "Tukang masak memasak makanan.",
          en: "A cook prepares food.",
          es: "Un cocinero o una cocinera prepara comida.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_tukangMasak.webp",
          alt: { ms: "tukang masak menyediakan kari", en: "cook preparing curry", es: "cocinero preparando un curry" },
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
      perkara: [{ ms: "Petani", en: "Farmer", es: "Agricultor o agricultora" }],
      butiran: [
        {
          ms: "Petani menanam sayur di kebun.",
          en: "A farmer grows vegetables on a farm.",
          es: "Un agricultor o una agricultora cultiva verduras en una granja.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_petani.webp",
          alt: { ms: "petani di kebun sayur", en: "farmer in a vegetable garden", es: "agricultor en un huerto" },
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
      perkara: [{ ms: "Anggota polis", en: "Police officer", es: "Agente de policía" }],
      butiran: [
        {
          ms: "Anggota polis membantu orang awam.",
          en: "A police officer helps the public.",
          es: "Un agente de policía ayuda al público.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_polis.webp",
          alt: { ms: "polis membuat rondaan", en: "police officer patrolling", es: "agente de policía patrullando" },
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
      perkara: [{ ms: "Anggota bomba", en: "Firefighter", es: "Bombero o bombera" }],
      butiran: [
        {
          ms: "Anggota bomba memadamkan api.",
          en: "A firefighter puts out fires.",
          es: "Un bombero o una bombera apaga incendios.",
        },
      ],
      gambar: [
        {
          kind: "image",
          src: "/assets/chapters/ch9/ch9_bomba.webp",
          alt: { ms: "bomba memadam api", en: "firefighter putting out a fire", es: "bombero apagando un incendio" },
          w: 640,
          h: 360,
          className: occupationImageClassName,
        },
      ],
    },
  },
] satisfies ChapterTablePage["rows"];

export const chapter09: ChapterContent = {
  id: 9,
  revision: 4,
  title: {
    ms: "Pekerjaan di Sekitar Kita",
    en: "Jobs Around Us",
    es: "Trabajos a nuestro alrededor",
  },
  pages: [
    {
      id: "c9-p1-kenali-pekerjaan",
      kind: "intro",
      sections: [
        {
          kind: "list",
          id: "c9-p1-pekerjaan-tambahan",
          title: {
            ms: "KENALI PEKERJAAN INI",
            en: "GET TO KNOW THESE JOBS",
            es: "CONOCE ESTOS TRABAJOS",
          },
          items: [
            {
              id: "c9-occupation-askar",
              ms: "Askar menjaga keselamatan negara.",
              en: "A soldier protects the country.",
              es: "Un soldado protege el país.",
              cardLabel: { ms: "Askar", en: "Soldier", es: "Soldado" },
            },
            {
              id: "c9-occupation-nelayan",
              ms: "Nelayan menangkap ikan di laut.",
              en: "A fisher catches fish at sea.",
              es: "Un pescador pesca en el mar.",
              cardLabel: { ms: "Nelayan", en: "Fisher", es: "Pescador" },
            },
            {
              id: "c9-occupation-pelakon",
              ms: "Pelakon berlakon dalam drama atau filem.",
              en: "An actor performs in dramas or films.",
              es: "Un actor o una actriz actúa en dramas o películas.",
              cardLabel: { ms: "Pelakon", en: "Actor", es: "Actor o actriz" },
            },
          ],
        },
      ],
    },
    {
      id: "c9-p3-jenis-pekerjaan",
      kind: "table",
      title: {
        ms: "Kenali pekerjaan dan tugas mudahnya dengan merujuk kepada gambar.",
        en: "Learn about jobs and their simple duties by looking at the pictures.",
        es: "Conoce los trabajos y sus tareas sencillas observando las imágenes.",
      },
      columns: [
        { key: "perkara", label: { ms: "Pekerjaan", en: "Job", es: "Trabajo" } },
        { key: "butiran", label: { ms: "Tugas", en: "Duty", es: "Tarea" } },
        { key: "gambar", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
      ],
      rows: occupationRows,
    },
    {
      id: "c9-p4-chat-askar",
      kind: "chat",
      youId: "me",
      title: {
        ms: "Situasi 9.1: Bertanya tentang pekerjaan",
        en: "Situation 9.1: Asking about jobs",
        es: "Situación 9.1: Preguntar sobre trabajos",
      },
      context: {
        ms: "Latar tempat: sebuah sekolah",
        en: "Setting: a school",
        es: "Lugar: una escuela",
      },
      participants: [
        {
          id: "cikgu",
          name: { ms: "Cikgu", en: "Teacher", es: "Docente" },
        },
        { id: "me", name: { ms: "{currentUsername}", en: "{currentUsername}", es: "{currentUsername}" } },
      ],
      messages: [
        {
          id: "c9-chat1-m1",
          from: "cikgu",
          text: {
            ms: "Hari ini kita bercakap tentang pekerjaan. Apakah cita-cita awak?",
            en: "Today we are talking about jobs. What job would you like to do?",
            es: "Hoy hablamos de trabajos. ¿Qué trabajo te gustaría tener?",
          },
        },
        {
          id: "c9-chat1-m2",
          from: "me",
          text: { ms: "Saya mahu menjadi askar, cikgu.", en: "I want to be a soldier, teacher.", es: "Quiero ser soldado, profe." },
        },
        {
          id: "c9-chat1-m3",
          from: "cikgu",
          text: { ms: "Apakah tugas seorang askar?", en: "What does a soldier do?", es: "¿Qué hace un soldado?" },
        },
        {
          id: "c9-chat1-m4",
          from: "me",
          text: {
            ms: "Askar menjaga keselamatan negara.",
            en: "A soldier protects the country.",
            es: "Un soldado protege el país.",
          },
        },
        {
          id: "c9-chat1-m5",
          from: "cikgu",
          text: { ms: "Bagus. Apakah pekerjaan ayah awak?", en: "Good. What is your father's job?", es: "Bien. ¿En qué trabaja tu padre?" },
        },
        {
          id: "c9-chat1-m6",
          from: "me",
          text: { ms: "Ayah saya seorang anggota polis.", en: "My father is a police officer.", es: "Mi padre es agente de policía." },
        },
        {
          id: "c9-chat1-m7",
          from: "cikgu",
          text: { ms: "Apakah tugas anggota polis?", en: "What does a police officer do?", es: "¿Qué hace un agente de policía?" },
        },
        {
          id: "c9-chat1-m8",
          from: "me",
          text: {
            ms: "Anggota polis membantu orang awam.",
            en: "A police officer helps the public.",
            es: "Un agente de policía ayuda al público.",
          },
        },
        {
          id: "c9-chat1-m9",
          from: "cikgu",
          text: { ms: "Bagus. Apakah pekerjaan ibu awak?", en: "Good. What is your mother's job?", es: "Bien. ¿En qué trabaja tu madre?" },
        },
        {
          id: "c9-chat1-m10",
          from: "me",
          text: {
            ms: "Ibu saya seorang doktor. Doktor merawat pesakit.",
            en: "My mother is a doctor. A doctor treats patients.",
            es: "Mi madre es médica. Una médica atiende a los pacientes.",
          },
        },
      ],
    },
    {
      id: "c9-p5-chat-guru",
      kind: "chat",
      youId: "me",
      title: {
        ms: "Situasi 9.2: Berbual tentang pekerjaan di kelas",
        en: "Situation 9.2: Talking about jobs in class",
        es: "Situación 9.2: Hablar de trabajos en clase",
      },
      context: {
        ms: "Latar tempat: Anda ({currentUsername}) ialah guru di sebuah bilik darjah.",
        en: "Setting: You ({currentUsername}) are the teacher in a classroom.",
        es: "Lugar: Tú ({currentUsername}) eres el docente en un aula.",
      },
      participants: [
        { id: "ketua", name: { ms: "Ketua kelas", en: "Class monitor", es: "Representante de la clase" } },
        { id: "murid", name: { ms: "Semua murid", en: "All students", es: "Todos los alumnos" } },
        {
          id: "me",
          name: { ms: "Cikgu {currentUsername}", en: "Teacher {currentUsername}", es: "Docente {currentUsername}" },
        },
        { id: "finah", name: { ms: "Finah", en: "Finah", es: "Finah" } },
      ],
      messages: [
        { id: "c9-chat2-m1", from: "ketua", text: { ms: "Selamat pagi, cikgu.", en: "Good morning, teacher.", es: "Buenos días, profe." } },
        { id: "c9-chat2-m2", from: "murid", text: { ms: "Selamat pagi, cikgu.", en: "Good morning, teacher.", es: "Buenos días, profe." } },
        {
          id: "c9-chat2-m3",
          from: "me",
          text: {
            ms: "Selamat pagi. Hari ini kita bercakap tentang pekerjaan dan tugasnya.",
            en: "Good morning. Today we are talking about jobs and their duties.",
            es: "Buenos días. Hoy hablamos de trabajos y sus tareas.",
          },
        },
        {
          id: "c9-chat2-m4",
          from: "me",
          text: { ms: "Finah, apakah pekerjaan ibu awak?", en: "Finah, what is your mother's job?", es: "Finah, ¿en qué trabaja tu madre?" },
        },
        {
          id: "c9-chat2-m5",
          from: "finah",
          text: { ms: "Ibu saya seorang doktor.", en: "My mother is a doctor.", es: "Mi madre es médica." },
        },
        {
          id: "c9-chat2-m6",
          from: "me",
          text: { ms: "Apakah tugas seorang doktor?", en: "What does a doctor do?", es: "¿Qué hace un médico o una médica?" },
        },
        {
          id: "c9-chat2-m7",
          from: "finah",
          text: { ms: "Doktor merawat pesakit.", en: "A doctor treats patients.", es: "Un médico o una médica atiende a los pacientes." },
        },
        {
          id: "c9-chat2-m8",
          from: "me",
          text: { ms: "Betul. Semua murid, apakah tugas seorang guru?", en: "Correct. Students, what does a teacher do?", es: "Correcto. Alumnos, ¿qué hace un docente?" },
        },
        {
          id: "c9-chat2-m9",
          from: "murid",
          text: { ms: "Guru mengajar murid di sekolah.", en: "A teacher teaches students at school.", es: "Un docente enseña a los alumnos en la escuela." },
        },
        {
          id: "c9-chat2-m10",
          from: "me",
          text: {
            ms: "Bagus. Sekarang kamu boleh bertanya tentang pekerjaan dan tugasnya.",
            en: "Good. Now you can ask about jobs and their duties.",
            es: "Muy bien. Ahora pueden preguntar sobre trabajos y sus tareas.",
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
        ms: "Cari dan tandakan tujuh perkataan pekerjaan dalam petak huruf. Tiada perkataan serong atau terbalik.",
        en: "Find and mark the seven job words in the grid. There are no diagonal or backwards words.",
        es: "Busca y marca las siete palabras de trabajos en la cuadrícula. No hay palabras en diagonal ni al revés.",
      },
      size: 12,
      autoGenerate: true,
      allowDiagonal: false,
      allowReverse: false,
      targets: [
        { id: "ws-guru", word: "GURU", label: { ms: "guru", en: "teacher", es: "docente" } },
        { id: "ws-doktor", word: "DOKTOR", label: { ms: "doktor", en: "doctor", es: "médico/a" } },
        { id: "ws-polis", word: "POLIS", label: { ms: "polis", en: "police officer", es: "agente de policía" } },
        { id: "ws-askar", word: "ASKAR", label: { ms: "askar", en: "soldier", es: "soldado" } },
        { id: "ws-petani", word: "PETANI", label: { ms: "petani", en: "farmer", es: "agricultor/a" } },
        { id: "ws-nelayan", word: "NELAYAN", label: { ms: "nelayan", en: "fisher", es: "pescador" } },
        { id: "ws-pelakon", word: "PELAKON", label: { ms: "pelakon", en: "actor", es: "actor o actriz" } },
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
            en: "A __________ treats patients.",
            es: "__________ atiende a los pacientes.",
          },
        },
        {
          id: "c9-cw-2",
          n: 2,
          dir: "across",
          row: 3,
          col: 0,
          answer: "PELAKON",
          revealed: [2, 3, 4, 6],
          clue: {
            ms: "Abangnya seorang ________ kerana muncul dalam drama atau filem.",
            en: "Her older brother is an __________ because he appears in dramas or films.",
            es: "Su hermano mayor es __________ porque aparece en dramas o películas.",
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
            ms: "__________ menangkap pencuri.",
            en: "A __________ catches thieves.",
            es: "__________ atrapa a los ladrones.",
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
            ms: "Seorang __________ bekerja di kebun.",
            en: "A __________ works on a farm.",
            es: "__________ trabaja en una granja.",
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
            ms: "Seorang __________ mengajar murid di sekolah.",
            en: "A __________ teaches students at school.",
            es: "__________ enseña a los alumnos en la escuela.",
          },
        },
      ],
    },
  ],
};
