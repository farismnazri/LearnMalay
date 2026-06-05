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
    version: "0.8.1",
    date: "2026-06-06",
    headline: {
      ms: "Baseline versi roadmap kini disegerakkan dan diperiksa secara automatik",
      en: "The roadmap version baseline is now synced and checked automatically",
      es: "La linea base de version del roadmap ahora se sincroniza y se revisa automaticamente",
    },
    highlights: {
      added: [
        {
          ms: "Menambah semakan `check:release-drift` yang ringan untuk mengesan drift antara `package.json`, changelog, Adventure Log, dan baseline versi roadmap.",
          en: "Added a lightweight `check:release-drift` check to catch drift between `package.json`, the changelog, the Adventure Log, and the roadmap version baseline.",
          es: "Se agrego una verificacion ligera `check:release-drift` para detectar drift entre `package.json`, el changelog, el Adventure Log y la linea base de version del roadmap.",
        },
      ],
      changed: [
        {
          ms: "Baseline versi semasa dalam roadmap kini sepadan semula dengan versi keluaran kanonik dalam `package.json`.",
          en: "The roadmap current-version baseline is now aligned again with the canonical release version in `package.json`.",
          es: "La linea base de version actual del roadmap vuelve a estar alineada con la version canonica de `package.json`.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Semakan drift ini gagal jika keluaran terbaharu dalam `CHANGELOG.md`, entri teratas `src/lib/adventureLog.ts`, atau baseline `ROADMAP.md` tidak sepadan dengan `package.json`.",
        en: "The drift check now fails when the latest `CHANGELOG.md` release, the top `src/lib/adventureLog.ts` entry, or the `ROADMAP.md` baseline does not match `package.json`.",
        es: "La verificacion ahora falla cuando la ultima version de `CHANGELOG.md`, la entrada superior de `src/lib/adventureLog.ts` o la linea base de `ROADMAP.md` no coincide con `package.json`.",
      },
    ],
  },
  {
    version: "0.8.0",
    date: "2026-06-05",
    headline: {
      ms: "Nama pengguna akaun baharu kini disemak dengan lebih selamat",
      en: "New account usernames now have safer checks",
      es: "Los nombres de usuario nuevos ahora tienen controles más seguros",
    },
    highlights: {
      added: [
        {
          ms: "Menambah semakan nama pengguna yang lebih selamat untuk akaun baharu supaya nama yang tidak sesuai ditolak dengan mesej mesra.",
          en: "Added safer username checks for new accounts so inappropriate names are rejected with friendly feedback.",
          es: "Se agregaron controles más seguros para nombres de usuario nuevos, con mensajes amables cuando un nombre no está permitido.",
        },
      ],
      changed: [],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Semakan baharu dikongsi antara halaman user dan API cipta akaun, termasuk liputan perkataan tidak sesuai dalam Bahasa Melayu tanpa mengubah login, sesi, progress, atau akaun admin/demo.",
        en: "The new checks are shared by the user page and create-account API, including stronger Malay inappropriate-word coverage without changing login, sessions, progress, or admin/demo accounts.",
        es: "Los controles nuevos se comparten entre la página de usuario y la API para crear cuentas, con mejor cobertura de palabras inapropiadas en malayo sin cambiar login, sesiones, progreso ni cuentas admin/demo.",
      },
    ],
  },
  {
    version: "0.7.7",
    date: "2026-06-05",
    headline: {
      ms: "Latar halaman utama kini lebih tenang dan mudah dibaca",
      en: "Page backgrounds now load faster and read more clearly",
      es: "Las paginas principales ahora usan un fondo mas tranquilo y legible",
    },
    highlights: {
      added: [
        {
          ms: "Menambah versi AVIF dan WebP yang dioptimumkan untuk latar halaman landing, user, Adventure Log, dan latar dunia bersama.",
          en: "Added optimized AVIF and WebP versions for the landing, user, Adventure Log, and shared world backgrounds.",
          es: "Se agregaron versiones AVIF y WebP optimizadas para los fondos de landing, user, Adventure Log y mundo compartido.",
        },
      ],
      changed: [
        {
          ms: "Latar halaman landing, user, dan Adventure Log dikemas kini dengan suasana hutan yang lebih tenang untuk bacaan yang lebih jelas.",
          en: "Updated the landing, user, and Adventure Log backgrounds with a calmer jungle-framed scene for better readability.",
          es: "Se actualizaron los fondos de landing, user y Adventure Log con una escena de jungla mas tranquila para mejorar la legibilidad.",
        },
        {
          ms: "Latar dunia bersama telah diganti dengan artwork baharu dan fallback JPEG progresif untuk mengekalkan sokongan pelayar lama.",
          en: "Replaced the shared world background with new artwork and a progressive JPEG fallback for older browser support.",
          es: "Se reemplazo el fondo de mundo compartido con arte nuevo y un fallback JPEG progresivo para navegadores antiguos.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Menambah override latar khusus untuk tiga halaman tersebut tanpa mengubah latar bab, map, minigame, atau logik sesi.",
        en: "Added a scoped background override for those three pages without changing chapter, map, minigame, or session behavior.",
        es: "Se agrego un override de fondo limitado a esas tres paginas sin cambiar capitulos, mapa, minijuegos ni logica de sesion.",
      },
    ],
  },
  {
    version: "0.7.6",
    date: "2026-06-05",
    headline: {
      ms: "Bab 1 kini lebih ringkas dengan enam halaman",
      en: "Chapter 1 is now cleaner with six pages",
      es: "El capítulo 1 ahora es más limpio con seis páginas",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Halaman semakan `Semakan sebutan` yang berulang telah dikeluarkan daripada Bab 1 untuk menjadikan aliran pelajaran lebih padat.",
          en: "The redundant `Semakan sebutan` review page was removed from Chapter 1 to keep the lesson flow tighter.",
          es: "Se eliminó de Chapter 1 la página de repaso redundante `Semakan sebutan` para que el flujo de la lección sea más compacto.",
        },
        {
          ms: "Bab 1 kini bergerak dari halaman 1 hingga 6 tanpa menjejaskan susunan halaman lain, navigasi, atau logik tamat bab.",
          en: "Chapter 1 now runs from page 1 to 6 without affecting the remaining page order, navigation, or end-of-chapter logic.",
          es: "Chapter 1 ahora va de la página 1 a la 6 sin afectar el orden de las páginas restantes, la navegación ni la lógica de fin de capítulo.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Mengeluarkan satu entri halaman daripada data `chapter01.pages` dan menyegerakkan metadata keluaran kepada versi 0.7.6.",
        en: "Removed one page entry from `chapter01.pages` and synchronized the release metadata to version 0.7.6.",
        es: "Se eliminó una entrada de página de `chapter01.pages` y se sincronizaron los metadatos de la versión 0.7.6.",
      },
    ],
  },
  {
    version: "0.7.5",
    date: "2026-06-05",
    headline: {
      ms: "Kad kata ganti nama Bab 1 kini lebih visual",
      en: "Chapter 1 pronoun cards are now fully visual",
      es: "Las tarjetas de pronombres del capítulo 1 ahora son más visuales",
    },
    highlights: {
      added: [
        {
          ms: "Menambah artwork WebP baharu untuk kad kata ganti nama seorang dan ramai dalam Bab 1.",
          en: "Added new WebP artwork for the singular and plural pronoun cards in Chapter 1.",
          es: "Se agregaron nuevos recursos WebP para las tarjetas de pronombres singulares y plurales del capítulo 1.",
        },
      ],
      changed: [
        {
          ms: "Halaman 2 Bab 1 kini menggunakan kad komik untuk Saya / Aku, Awak / Kau / Anda, Dia / Beliau, Kita / Kami, Anda semua / Kamu semua, dan Mereka, dengan teks BM/EN/ES yang lengkap.",
          en: "Chapter 1 page 2 now uses comic cards for Saya / Aku, Awak / Kau / Anda, Dia / Beliau, Kita / Kami, Anda semua / Kamu semua, and Mereka, with complete BM/EN/ES text switching.",
          es: "La página 2 del capítulo 1 ahora usa tarjetas tipo cómic para Saya / Aku, Awak / Kau / Anda, Dia / Beliau, Kita / Kami, Anda semua / Kamu semua y Mereka, con cambio completo de texto BM/EN/ES.",
        },
        {
          ms: "Kad pelajaran kini menggunakan avatar profil aktif pada tajuk utama dan mengekalkan susun atur komik yang konsisten dengan halaman 1.",
          en: "The lesson card now uses the active profile avatar in the main title and keeps the comic layout consistent with page 1.",
          es: "La tarjeta de la lección ahora usa el avatar de perfil activo en el título principal y mantiene un diseño de cómic consistente con la página 1.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Menambah jenis halaman khusus untuk kad kata ganti nama, menyambungkannya pada perender bab, dan menyegerakkan metadata keluaran kepada versi 0.7.5.",
        en: "Added a dedicated pronoun-card page type, wired it into the chapter renderer, and synchronized the release metadata to version 0.7.5.",
        es: "Se agregó un tipo de página dedicado para tarjetas de pronombres, se conectó al renderizador del capítulo y se sincronizaron los metadatos de la versión 0.7.5.",
      },
    ],
  },
  {
    version: "0.7.4",
    date: "2026-06-05",
    headline: {
      ms: "Bab 1 kini menggunakan artwork komik akhir untuk sapaan, perpisahan, dan penghargaan.",
      en: "Chapter 1 now uses final comic-style artwork for greetings, goodbye phrases, and thank-you exchanges.",
      es: "El capitulo 1 ahora usa arte comic final para saludos, despedidas y agradecimientos.",
    },
    highlights: {
      added: [
        {
          ms: "Menambah aset WebP akhir untuk panel komik dan ikon Bab 1.",
          en: "Added final WebP assets for the Chapter 1 comic panels and section icons.",
          es: "Se agregaron recursos WebP finales para los paneles comicos e iconos del capitulo 1.",
        },
      ],
      changed: [
        {
          ms: "Pembukaan Bab 1 kini memaparkan panel komik untuk pertanyaan khabar, sapaan perpisahan, dan ucapan terima kasih.",
          en: "The Chapter 1 opener now shows comic panels for asking how someone is, goodbye phrases, and thank-you exchanges.",
          es: "El inicio del capitulo 1 ahora muestra paneles comic para preguntar como esta alguien, despedidas y agradecimientos.",
        },
        {
          ms: "Susun atur komik dikemas supaya panel perpisahan seimbang dalam grid dua lajur dan panel penghargaan sejajar dengan saiz panel sapaan.",
          en: "Refined the comic layout so goodbye panels sit in a balanced two-column grid and the appreciation panel matches the greeting panel size.",
          es: "Se ajusto el diseno comic para que las despedidas queden en una cuadricula equilibrada de dos columnas y el panel de agradecimiento coincida con el tamano de los saludos.",
        },
      ],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Menggantikan placeholder panel dan ikon Bab 1 dengan aset WebP yang dioptimumkan serta mengekalkan teks bantuan ringkas untuk penggunaan frasa perpisahan.",
        en: "Replaced the Chapter 1 placeholder panels and icons with optimized WebP assets while preserving short usage captions for goodbye phrases.",
        es: "Se reemplazaron los placeholders de paneles e iconos del capitulo 1 con recursos WebP optimizados y se conservaron textos breves de uso para las despedidas.",
      },
    ],
  },
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
