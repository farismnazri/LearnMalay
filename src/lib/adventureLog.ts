import type { Translated } from "@/lib/chapters";

export type AdventureLogHighlights = {
  added: Translated[];
  changed: Translated[];
  fixed: Translated[];
};

export type AdventureLogEntry = {
  version: string;
  date: string; // YYYY-MM-DD
  headline: Translated;
  highlights: AdventureLogHighlights;
  technicalNotes?: Translated[];
};

export const ADVENTURE_LOG: AdventureLogEntry[] = [
  {
    version: "0.7.3",
    date: "2026-06-04",
    headline: {
      ms: "Bab 9 kini lengkap dengan artwork tukang masak untuk enam pekerjaan asas.",
      en: "Chapter 9 now includes the cook artwork, completing the six essential occupation images.",
      es: "El capitulo 9 ahora incluye el arte del cocinero y completa las seis imagenes de trabajos esenciales.",
    },
    highlights: {
      added: [
        {
          ms: "Menambah artwork tukang masak pada jadual pekerjaan Bab 9.",
          en: "Added the cook artwork to the Chapter 9 occupation table.",
          es: "Se agrego el arte del cocinero a la tabla de trabajos del capitulo 9.",
        },
      ],
      changed: [],
      fixed: [
        {
          ms: "Melengkapkan set gambar enam pekerjaan asas yang kelihatan dalam Bab 9.",
          en: "Completed the visible six-job artwork set for Chapter 9.",
          es: "Se completo el conjunto visible de seis imagenes de trabajos del capitulo 9.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Menambah artwork WebP tukang masak dan menyambungkannya kepada jadual pekerjaan Bab 9.",
        en: "Added the tukang masak WebP artwork and connected it to the Chapter 9 occupation table, completing the visible six-job artwork set.",
        es: "Se agrego el arte WebP de tukang masak y se conecto a la tabla de trabajos del capitulo 9, completando el conjunto visible de seis imagenes.",
      },
    ],
  },
  {
    version: "0.7.2",
    date: "2026-06-04",
    headline: {
      ms: "Bab 9 kini lebih mudah diikuti dengan pekerjaan asas, contoh Saya yang jelas, dan artwork pekerjaan baharu.",
      en: "Chapter 9 is easier to follow with essential jobs, clearer Saya examples, and new job artwork.",
      es: "El capitulo 9 ahora es mas facil de seguir con trabajos esenciales, ejemplos Saya mas claros y nuevo arte de trabajos.",
    },
    highlights: {
      added: [
        {
          ms: "Menambah artwork WebP baharu untuk pekerjaan Bab 9 yang sudah tersedia.",
          en: "Added new WebP artwork for the available Chapter 9 jobs.",
          es: "Se agrego nuevo arte WebP para los trabajos disponibles del capitulo 9.",
        },
      ],
      changed: [
        {
          ms: "Halaman pekerjaan Bab 9 kini fokus pada enam pekerjaan asas dengan contoh Saya yang lebih jelas.",
          en: "Chapter 9 is easier to follow: the occupations page now focuses on six essential jobs with clearer Saya examples and new job artwork.",
          es: "El capitulo 9 es mas facil de seguir: la pagina de trabajos ahora se enfoca en seis trabajos esenciales con ejemplos Saya mas claros y nuevo arte.",
        },
        {
          ms: "Contoh Bahasa Melayu, Inggeris, dan Sepanyol dikemas kini supaya lebih konsisten untuk pelajar baharu.",
          en: "Updated the Malay, English, and Spanish examples for better consistency for new learners.",
          es: "Se actualizaron los ejemplos en malayo, ingles y espanol para mayor consistencia para estudiantes nuevos.",
        },
      ],
      fixed: [
        {
          ms: "Menambah baik penjajaran jadual supaya teks pekerjaan lebih seimbang dengan gambar.",
          en: "Improved the occupation table alignment so text sits more naturally with the images.",
          es: "Se mejoro la alineacion de la tabla de trabajos para que el texto se vea mas natural junto a las imagenes.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Mengemas kini pekerjaan Bab 9 untuk memaparkan set teras sahaja, menambah aset WebP yang tersedia, menyembunyikan baris pekerjaan belum siap, membersihkan salinan Saya, dan mengemas penjajaran jadual.",
        en: "Updated Chapter 9 occupations to show the core job set only, added WebP artwork for available jobs, hid unfinished occupation rows, aligned the table layout, and refreshed Malay/English/Spanish examples for consistency.",
        es: "Se actualizaron los trabajos del capitulo 9 para mostrar solo el conjunto principal, agregar arte WebP disponible, ocultar filas sin terminar, alinear la tabla y refrescar los ejemplos en malayo, ingles y espanol.",
      },
      {
        ms: "Label versi UI terus dibaca daripada `package.json` melalui `src/lib/appVersion.ts`.",
        en: "The UI version label continues to read from `package.json` through `src/lib/appVersion.ts`.",
        es: "La etiqueta de version en la UI sigue leyendo desde `package.json` mediante `src/lib/appVersion.ts`.",
      },
    ],
  },
  {
    version: "0.7.1",
    date: "2026-05-30",
    headline: {
      ms: "Kemas kini visual minigame Arah Jalan pada hab minigame v0.7.1.",
      en: "Arah Jalan minigame hub visual update in v0.7.1.",
      es: "Actualizacion visual del minijuego Arah Jalan en el hub en v0.7.1.",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Mengemas kini artwork minigame Arah Jalan pada hab minigame untuk identiti visual yang lebih jelas.",
          en: "Updated Arah Jalan minigame artwork on the minigames hub for clearer visual identity.",
          es: "Se actualizo el arte de Arah Jalan en el hub de minijuegos para una identidad visual mas clara.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Tiada perubahan pada logik permainan, logik buka kunci, atau tingkah laku laluan dalam keluaran ini.",
        en: "No gameplay logic, unlock logic, or route behavior changes in this release.",
        es: "No hubo cambios de logica de juego, desbloqueo ni comportamiento de rutas en esta version.",
      },
    ],
  },
  {
    version: "0.7.0",
    date: "2026-05-29",
    headline: {
      ms: "Kemaskini kualiti salinan berbilang bahasa untuk bab dan penyelarasan nota keluaran v0.7.0.",
      en: "Multilingual chapter copy quality improvements and v0.7.0 release-note alignment.",
      es: "Mejoras de calidad del texto multilingue de capitulos y alineacion de notas de version v0.7.0.",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Menambah baik salinan bab merentas Bahasa Melayu, Inggeris, dan Sepanyol supaya lebih semula jadi dan konsisten.",
          en: "Improved chapter copy across Malay, English, and Spanish for better naturalness and consistency.",
          es: "Se mejoro el texto de capitulos en malayo, ingles y espanol para mayor naturalidad y consistencia.",
        },
        {
          ms: "Menambah baik konsistensi dialog bab dan teks bantuan AkuAku.",
          en: "Improved consistency in chapter dialogues and AkuAku helper text.",
          es: "Se mejoro la consistencia en los dialogos de capitulos y el texto de ayuda de AkuAku.",
        },
      ],
      fixed: [
        {
          ms: "Membetulkan aksen, tanda baca, dan drift aksen palsu dalam teks Sepanyol.",
          en: "Corrected Spanish accents, punctuation, and false accent drift in chapter text.",
          es: "Se corrigieron acentos, puntuacion y deriva de acentos falsos en el texto en espanol.",
        },
        {
          ms: "Menyelaraskan metadata keluaran supaya versi aplikasi kelihatan mempunyai mesej keluaran yang sepadan.",
          en: "Aligned release metadata so each visible app version has a corresponding release message.",
          es: "Se alinearon los metadatos de version para que cada version visible tenga su mensaje de lanzamiento.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Tiada perubahan pada logik permainan, logik buka kunci, atau tingkah laku laluan dalam keluaran ini.",
        en: "No gameplay logic, unlock logic, or route behavior changes in this release.",
        es: "No hubo cambios de logica de juego, desbloqueo ni comportamiento de rutas en esta version.",
      },
      {
        ms: "Skop keluaran v0.7.0 merangkumi `7d3da69` (pembaikan salinan) dan `a619238` (bump versi).",
        en: "v0.7.0 release scope includes `7d3da69` (copy fixes) and `a619238` (version bump).",
        es: "El alcance de v0.7.0 incluye `7d3da69` (correcciones de texto) y `a619238` (bump de version).",
      },
    ],
  },
  {
    version: "0.6.0",
    date: "2026-05-26",
    headline: {
      ms: "Pelancaran minigame Arah Jalan dan penyelarasan metadata keluaran v0.6.0.",
      en: "Arah Jalan minigame release and v0.6.0 release metadata alignment.",
      es: "Lanzamiento del minijuego Arah Jalan y alineacion de metadatos de la version v0.6.0.",
    },
    highlights: {
      added: [
        {
          ms: "Menambah minigame Arah Jalan sebagai MVP untuk latihan arah di peta.",
          en: "Added the Arah Jalan minigame MVP for direction practice on a fixed map.",
          es: "Se agrego el MVP del minijuego Arah Jalan para practicar direcciones en un mapa fijo.",
        },
      ],
      changed: [
        {
          ms: "Menaikkan versi aplikasi kepada v0.6.0 bersama aliran keluaran semasa.",
          en: "Bumped the app to v0.6.0 under the current release workflow.",
          es: "Se actualizo la app a v0.6.0 bajo el flujo de lanzamiento actual.",
        },
        {
          ms: "Menyelaras rekod keluaran supaya versi aplikasi, changelog, dan Adventure Log konsisten.",
          en: "Aligned release records so app version, changelog, and Adventure Log stay consistent.",
          es: "Se alinearon los registros para que version de app, changelog y Adventure Log sean consistentes.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Skop keluaran v0.6.0 merangkumi commit `03766f0` (fitur) dan `8db975e` (bump keluaran).",
        en: "v0.6.0 release scope includes commit `03766f0` (feature) and `8db975e` (release bump).",
        es: "El alcance de v0.6.0 incluye los commits `03766f0` (funcion) y `8db975e` (bump de version).",
      },
      {
        ms: "Label versi dalam UI terus dibaca daripada `package.json` melalui `src/lib/appVersion.ts`.",
        en: "UI version label continues to read from `package.json` via `src/lib/appVersion.ts`.",
        es: "La etiqueta de version en UI se sigue leyendo desde `package.json` via `src/lib/appVersion.ts`.",
      },
    ],
  },
  {
    version: "0.5.0",
    date: "2026-05-21",
    headline: {
      ms: "Pelancaran Adventure Log dan asas kemas kini awam.",
      en: "Adventure Log launch and public update foundations.",
      es: "Lanzamiento de Adventure Log y base para actualizaciones publicas.",
    },
    highlights: {
      added: [
        {
          ms: "Pelancaran Adventure Log dan asas kemas kini awam.",
          en: "Adventure Log launch and public update foundations.",
          es: "Lanzamiento de Adventure Log y base para actualizaciones publicas.",
        },
        {
          ms: "Menambah halaman baharu supaya pemain boleh lihat perubahan dalam Learn Malay.",
          en: "Added a new page where players can see what changed in Learn Malay.",
          es: "Se agrego una nueva pagina para que los jugadores vean lo que cambio en Learn Malay.",
        },
        {
          ms: "Menambah versi aplikasi yang kelihatan supaya kemas kini lebih mudah dikenal pasti.",
          en: "Added a visible app version so updates are easier to recognize.",
          es: "Se agrego una version visible de la app para reconocer mejor las actualizaciones.",
        },
      ],
      changed: [
        {
          ms: "Learn Malay kini menggunakan nombor versi yang lebih jelas supaya kemas kini lebih mudah dijejaki.",
          en: "Learn Malay now has clearer version numbers, so updates are easier to track.",
          es: "Learn Malay ahora tiene numeros de version mas claros, para seguir mejor las actualizaciones.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Memperkenalkan Semantic Versioning untuk Learn Malay (`MAJOR.MINOR.PATCH`).",
        en: "Introduced Semantic Versioning for Learn Malay (`MAJOR.MINOR.PATCH`).",
        es: "Se introdujo Semantic Versioning para Learn Malay (`MAJOR.MINOR.PATCH`).",
      },
      {
        ms: "Menambah model data nota keluaran dengan medan teks berbilang bahasa (`ms`, `en`, `es`).",
        en: "Added structured release-note data model with multilingual-ready text fields (`ms`, `en`, `es`).",
        es: "Se agrego un modelo de datos de notas de version con campos multilingues (`ms`, `en`, `es`).",
      },
      {
        ms: "Mewujudkan aliran keluaran yang mengikat versi aplikasi, changelog, dan tag Git.",
        en: "Established release workflow tying app version, changelog, and Git tags.",
        es: "Se establecio un flujo de lanzamiento que conecta la version de la app, el changelog y las etiquetas de Git.",
      },
    ],
  },
];

export const LATEST_ADVENTURE_LOG = ADVENTURE_LOG[0] ?? null;
