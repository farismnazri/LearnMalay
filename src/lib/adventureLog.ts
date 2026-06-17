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
    version: "0.11.5",
    date: "2026-06-17",
    headline: {
      ms: "Bab 1 kini membezakan Kita dan Kami dengan lebih jelas",
      en: "Chapter 1 now separates Kita and Kami more clearly",
      es: "El Capítulo 1 ahora separa Kita y Kami con más claridad",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Bab 1 kini memisahkan `Kita` dan `Kami` kepada dua kad kata ganti nama yang lebih jelas dengan karya WEBP baharu dan penerangan ringkas untuk pemula.",
          en: "Chapter 1 now separates `Kita` and `Kami` into two clearer pronoun cards with updated WEBP artwork and short beginner-friendly explanations.",
          es: "El Capítulo 1 ahora separa `Kita` y `Kami` en dos tarjetas de pronombres más claras, con arte WEBP actualizado y explicaciones breves para principiantes.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 1 dinaikkan daripada 5 kepada 6 supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Chapter 1 content revision was increased from 5 to 6 so returning learners can see the optional chapter update notice.",
          es: "La revisión de contenido del Capítulo 1 aumentó de 5 a 6 para que los usuarios anteriores vean el aviso opcional de actualización.",
        },
      ],
    },
  },
  {
    version: "0.11.4",
    date: "2026-06-16",
    headline: {
      ms: "Footer halaman utama kini lebih kemas dan seimbang",
      en: "The landing-page footer is now cleaner and better balanced",
      es: "El pie de la pagina principal ahora esta mas limpio y equilibrado",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Footer halaman utama kini meletakkan cip dua baris `Adventure Log` sejajar dengan bar pengakuan supaya susun atur iPad, telefon, dan desktop kelihatan lebih kemas.",
          en: "The landing-page footer now places the two-line `Adventure Log` chip alongside the acknowledgment bar so the iPad, phone, and desktop layout reads more cleanly.",
          es: "El pie de la pagina principal ahora coloca la ficha de dos lineas de `Adventure Log` junto a la barra de reconocimiento para que el diseno en iPad, movil y escritorio se vea mas limpio.",
        },
      ],
      fixed: [],
    },
  },
  {
    version: "0.11.3",
    date: "2026-06-16",
    headline: {
      ms: "Bab 3 kini lebih jelas untuk belajar nama kaunter dan ayat mudah",
      en: "Chapter 3 is now clearer for learning counter names and simple phrases",
      es: "El Capítulo 3 ahora es más claro para aprender nombres de mostradores y frases simples",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Bab 3 kini menggunakan susun atur kad yang lebih jelas untuk kaunter penting, pola ayat `Saya mahu...`, dan tiga dialog ringkas di kaunter pertanyaan, kaunter tiket, dan kaunter bayaran.",
          en: "Chapter 3 now uses a clearer card layout for the important counters, the `I want to...` sentence pattern, and three short chats at the information, ticket, and payment counters.",
          es: "El Capítulo 3 ahora usa un diseño de tarjetas más claro para los mostradores importantes, el patrón `Quiero...` y tres diálogos breves en los mostradores de información, boletos y pagos.",
        },
        {
          ms: "Latihan Bab 3 kini meliputi semua tujuh nama kaunter dengan susun huruf tanpa perkataan `kaunter` dan carian kata yang merangkumi semua kosa kata kaunter.",
          en: "Chapter 3 practice now covers all seven counter names with noun-only scrambles and a wordsearch that includes the full counter vocabulary.",
          es: "La práctica del Capítulo 3 ahora cubre los siete nombres de mostrador con anagramas solo del sustantivo y una sopa de letras con todo el vocabulario de mostradores.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 3 dinaikkan daripada 4 kepada 5 supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Chapter 3 content revision was increased from 4 to 5 so returning learners can see the optional chapter update notice.",
          es: "La revisión de contenido del Capítulo 3 aumentó de 4 a 5 para que los usuarios anteriores vean el aviso opcional de actualización.",
        },
      ],
    },
  },
  {
    version: "0.11.2",
    date: "2026-06-16",
    headline: {
      ms: "Bab Dunia 1 kini lebih fokus untuk ulang kaji awal",
      en: "World 1 chapters are now more focused for early review",
      es: "Los capítulos del Mundo 1 ahora están más enfocados para el repaso inicial",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Bab 1 halaman kata ganti nama kini memisahkan `Seorang` dan `Ramai`, termasuk panduan ringkas untuk `Kita`, `Kami`, `Kamu semua`, dan `Mereka`.",
          en: "Chapter 1's pronoun page now separates `Seorang` and `Ramai`, including short guidance for `Kita`, `Kami`, `Kamu semua`, and `Mereka`.",
          es: "La página de pronombres del Capítulo 1 ahora separa `Seorang` y `Ramai`, con una guía breve para `Kita`, `Kami`, `Kamu semua` y `Mereka`.",
        },
        {
          ms: "Bab 3 kini memberi tumpuan kepada tiga kaunter utama dengan kad gambar yang lebih padat, frasa kaunter yang mudah, dan latihan yang lebih fokus.",
          en: "Chapter 3 now focuses on three essential counters with tighter image cards, simpler counter phrases, and more focused practice.",
          es: "El Capítulo 3 ahora se centra en tres mostradores esenciales con tarjetas de imagen más compactas, frases más sencillas y práctica más enfocada.",
        },
        {
          ms: "Bab 4 kini menutup Dunia 1 dengan arahan jalan dan masa berjumpa yang lebih ringkas.",
          en: "Chapter 4 now closes World 1 with simpler route commands and meeting-time language.",
          es: "El Capítulo 4 ahora cierra el Mundo 1 con instrucciones de ruta y lenguaje para quedar más sencillos.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 1, Bab 3, dan Bab 4 dinaikkan supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Chapter 1, Chapter 3, and Chapter 4 content revisions were increased so returning learners can see the optional chapter update notices.",
          es: "Se aumentaron las revisiones de contenido de los Capítulos 1, 3 y 4 para que los usuarios anteriores vean los avisos opcionales de actualización.",
        },
        {
          ms: "Tajuk latihan kedua Bab 1 kini selaras dalam bahasa Melayu, Inggeris, dan Sepanyol.",
          en: "Chapter 1's second exercise title is now consistent across Malay, English, and Spanish.",
          es: "El título del segundo ejercicio del Capítulo 1 ahora es coherente en malayo, inglés y español.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Kawalan keselamatan Phase 2A untuk had kadar dan pertahanan mutasi asal-sama telah disahkan sebelum keluaran ini.",
        en: "Phase 2A security coverage for rate limits and same-origin mutation defenses was verified before this release.",
        es: "La cobertura de seguridad de la Fase 2A para límites de frecuencia y defensas de mutación de mismo origen se verificó antes de esta versión.",
      },
    ],
  },
  {
    version: "0.11.1",
    date: "2026-06-13",
    headline: {
      ms: "Dialog bab kini mengenali pelajar aktif dengan lebih konsisten",
      en: "Chapter conversations now recognize the active learner more consistently",
      es: "Los diálogos de los capítulos ahora reconocen al estudiante activo de forma más consistente",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Dialog bab kini memaparkan pelajar aktif di sebelah kanan dengan nama pengguna dan avatar profil pilihan, manakala penutur lain menggunakan Aku Aku.",
          en: "Chapter conversations now show the active learner on the right with their username and selected profile avatar, while other speakers use Aku Aku.",
          es: "Los diálogos de los capítulos ahora muestran al estudiante activo a la derecha con su nombre de usuario y avatar elegido, mientras los demás hablantes usan Aku Aku.",
        },
      ],
      fixed: [
        {
          ms: "Pemilikan penutur, rujukan nama pelajar dinamik, dan penjajaran gelembung mengikut konteks telah diperbetulkan untuk Bab 1 hingga 7 serta Bab 9 hingga 11.",
          en: "Speaker ownership, dynamic learner-name references, and contextual bubble alignment were corrected across Chapters 1–7 and 9–11.",
          es: "Se corrigieron la autoría de los hablantes, las referencias dinámicas al nombre del estudiante y la alineación contextual de las burbujas en los Capítulos 1–7 y 9–11.",
        },
        {
          ms: "Semakan kandungan bab yang terjejas dinaikkan supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Affected chapter content revisions were increased so returning users can see the optional chapter update notices.",
          es: "Se aumentaron las revisiones de contenido de los capítulos afectados para que los usuarios anteriores vean los avisos opcionales de actualización.",
        },
      ],
    },
  },
  {
    version: "0.11.0",
    date: "2026-06-13",
    headline: {
      ms: "Bab 4 kini mengajar masa dan arah jalan dengan latihan yang lebih praktikal",
      en: "Chapter 4 now teaches time and simple routes with more practical practice",
      es: "El Capitulo 4 ahora ensena tiempo y rutas sencillas con practica mas util",
    },
    highlights: {
      added: [
        {
          ms: "Menambah aktiviti padan gambar, latihan laluan Arah Jalan dalam pelajaran, dan aset WebP serta AVIF Bab 4 yang dioptimumkan untuk konsep masa dan arah.",
          en: "Added an image-match activity, an embedded Arah Jalan route-practice lesson, and optimized WebP and AVIF Chapter 4 assets for time and route concepts.",
          es: "Se agregaron una actividad de emparejar imagenes, una practica de ruta de Arah Jalan dentro de la leccion y recursos WebP y AVIF optimizados del Capitulo 4 para conceptos de tiempo y ruta.",
        },
      ],
      changed: [
        {
          ms: "Bab 4 dibina semula dengan asas masa yang lebih mudah, kad waktu harian, contoh ayat yang diserlahkan, dan aliran tanya arah yang lebih kemas.",
          en: "Chapter 4 was rebuilt around simpler time basics, times-of-day cards, highlighted sentence examples, and a cleaner asking-directions flow.",
          es: "El Capitulo 4 se reconstruyo con bases de tiempo mas simples, tarjetas de momentos del dia, ejemplos destacados y un flujo mas claro para pedir direcciones.",
        },
        {
          ms: "Objektif Aku-Aku Bab 4 dan perender pelajaran berkongsi turut dikemas kini supaya kad baharu dan latihan laluan berpagar sesuai dengan aliran pelajaran semasa.",
          en: "Chapter 4's Aku-Aku goals and the shared lesson renderer were updated so the new cards and gated route practice fit the current lesson flow.",
          es: "Los objetivos de Aku-Aku del Capitulo 4 y el renderizador compartido de lecciones se actualizaron para que las tarjetas nuevas y la practica de ruta con desbloqueo encajen en el flujo actual.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 4 dinaikkan daripada 1 kepada 2 supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Chapter 4's content revision was increased from 1 to 2 so returning users can see the optional chapter update notice.",
          es: "La revision de contenido del Capitulo 4 aumento de 1 a 2 para que los usuarios anteriores vean el aviso opcional de actualizacion.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Perender bab kini menyokong aktiviti padan gambar, teks jadual yang boleh diserlahkan, dan latihan laluan Arah Jalan berpagar untuk pelajaran.",
        en: "The chapter renderer now supports image-match activities, highlightable table text, and gated Arah Jalan lesson practice.",
        es: "El renderizador de capitulos ahora admite actividades de emparejar imagenes, texto de tabla resaltable y practica guiada de Arah Jalan con desbloqueo.",
      },
    ],
  },
  {
    version: "0.10.0",
    date: "2026-06-09",
    headline: {
      ms: "Bab 3 kini memperkenalkan kaunter dengan ikon dan dialog praktikal",
      en: "Chapter 3 now introduces counters with icons and practical dialogues",
      es: "El Capitulo 3 ahora presenta mostradores con iconos y dialogos practicos",
    },
    highlights: {
      added: [
        {
          ms: "Menambah susun atur baris ikon responsif dan aset WebP serta AVIF yang dioptimumkan untuk enam jenis kaunter dalam Bab 3.",
          en: "Added a responsive icon-row layout and optimized WebP and AVIF assets for the six Chapter 3 counter types.",
          es: "Se agregaron filas de iconos adaptables y recursos WebP y AVIF optimizados para los seis tipos de mostrador del Capitulo 3.",
        },
      ],
      changed: [
        {
          ms: "Bab 3 kini memfokuskan enam jenis kaunter sahaja, dengan Situasi 3.1 dan 3.2 yang praktikal serta Latihan 1 yang melatih nama kaunter.",
          en: "Chapter 3 now focuses on six counter types, with practical Situations 3.1 and 3.2 and an Exercise 1 focused on counter names.",
          es: "El Capitulo 3 ahora se centra en seis tipos de mostrador, con Situaciones 3.1 y 3.2 practicas y un Ejercicio 1 sobre sus nombres.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 3 dinaikkan daripada 1 kepada 2 supaya pengguna lama boleh melihat notis kemas kini bab pilihan.",
          en: "Chapter 3's content revision was increased from 1 to 2 so returning users can see the optional chapter update notice.",
          es: "La revision de contenido del Capitulo 3 aumento de 1 a 2 para que los usuarios anteriores vean el aviso opcional de actualizacion.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Skill keluaran kini memerlukan semakan kawalan revisi bab apabila kandungan bab berubah.",
        en: "The release skill now requires chapter revision-control checks when chapter content changes.",
        es: "La habilidad de lanzamiento ahora exige revisar el control de revisiones cuando cambia el contenido de un capitulo.",
      },
    ],
  },
  {
    version: "0.9.4",
    date: "2026-06-09",
    headline: {
      ms: "Bab 2 kini lebih jelas dan stabil untuk pelajaran keluarga",
      en: "Chapter 2 is now clearer and more stable for the family lesson",
      es: "El Capitulo 2 ahora es mas claro y estable para la leccion de la familia",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Bab 2 kini menggunakan label keluarga yang lebih jelas, latihan carta keluarga yang lebih fokus, dan dialog yang lebih kemas untuk pelajar baharu.",
          en: "Chapter 2 now uses clearer family labels, a more focused family-chart exercise, and tidier dialogue flow for new learners.",
          es: "El Capitulo 2 ahora usa etiquetas familiares mas claras, un ejercicio de cuadro familiar mas enfocado y dialogos mas ordenados para principiantes.",
        },
        {
          ms: "Gelembung chat kini boleh membezakan penutur keluarga sampingan seperti ibu dan bapa dengan label yang jelas serta gaya biru muda apabila diperlukan.",
          en: "Chat bubbles can now distinguish secondary family speakers like mother and father with clear labels and light-blue styling where needed.",
          es: "Las burbujas de chat ahora pueden distinguir a hablantes familiares secundarios como madre y padre con etiquetas claras y estilo azul claro cuando hace falta.",
        },
      ],
      fixed: [
        {
          ms: "Pepijat yang menyebabkan `/chapter/2` gagal apabila kad keluarga cuba memaparkan ahli keluarga yang hilang telah diperbaiki.",
          en: "The bug that caused `/chapter/2` to fail when the family card tried to render a missing family member has been fixed.",
          es: "Se corrigio el error que hacia fallar `/chapter/2` cuando la tarjeta familiar intentaba mostrar un miembro de la familia faltante.",
        },
        {
          ms: "Pemilikan dialog dan kedudukan gelembung untuk Azman, Ibu, Bapa, dan Muthu dalam Bab 2 kini dipaparkan dengan betul.",
          en: "Dialogue ownership and bubble placement for Azman, Mother, Father, and Muthu in Chapter 2 now render correctly.",
          es: "La autoria del dialogo y la posicion de las burbujas para Azman, Madre, Padre y Muthu en el Capitulo 2 ahora se muestran correctamente.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Perender chat berkongsi metadata sisi dan tona peserta secara minimum tanpa mengubah route, progress, atau tata letak bab yang lain.",
        en: "The shared chat renderer now supports minimal participant side and tone metadata without changing routes, progress, or unrelated chapter layouts.",
        es: "El renderizador compartido de chat ahora admite metadatos minimos de lado y tono por participante sin cambiar rutas, progreso ni disenos ajenos de capitulos.",
      },
    ],
  },
  {
    version: "0.9.3",
    date: "2026-06-06",
    headline: {
      ms: "Semakan keluaran kini mengesan tag Git yang hilang",
      en: "Release checks now detect missing Git tags",
      es: "Las verificaciones de lanzamiento ahora detectan etiquetas Git faltantes",
    },
    highlights: {
      added: [
        {
          ms: "Semakan release drift kini memastikan setiap versi keluaran dalam changelog mempunyai tag Git `vX.Y.Z` beranotasi.",
          en: "The release drift check now ensures every released changelog version has an annotated `vX.Y.Z` Git tag.",
          es: "La verificacion de release drift ahora garantiza que cada version publicada en el changelog tenga una etiqueta Git anotada `vX.Y.Z`.",
        },
      ],
      changed: [],
      fixed: [],
    },
    technicalNotes: [
      {
        ms: "Semakan gagal dengan senarai jelas untuk tag yang hilang dan tag lightweight, tanpa mencipta atau menolak tag secara automatik.",
        en: "The check fails with clear lists of missing and lightweight tags without creating or pushing tags automatically.",
        es: "La verificacion falla con listas claras de etiquetas faltantes y ligeras sin crear ni enviar etiquetas automaticamente.",
      },
    ],
  },
  {
    version: "0.9.2",
    date: "2026-06-06",
    headline: {
      ms: "Petunjuk `Jumpa lagi` dalam Bab 1 kini lebih jelas",
      en: "Chapter 1's `Jumpa lagi` hint is now clearer",
      es: "La pista de `Jumpa lagi` en el Capitulo 1 ahora es mas clara",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Petunjuk bagi frasa `Jumpa lagi` kini menerangkan bahawa ia digunakan apabila anda menjangka akan berjumpa semula.",
          en: "The `Jumpa lagi` phrase hint now explains that it is used when you expect to meet again.",
          es: "La pista de la frase `Jumpa lagi` ahora explica que se usa cuando esperas volver a encontrarte con alguien.",
        },
      ],
      fixed: [
        {
          ms: "Semakan kandungan Bab 1 dinaikkan supaya pengguna lama boleh melihat lencana kemas kini pilihan pada peta.",
          en: "Chapter 1's content revision was bumped so returning users can see the optional update badge on the map.",
          es: "La revision de contenido del Capitulo 1 subio para que los usuarios anteriores vean la insignia opcional de actualizacion en el mapa.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Struktur pelajaran, bilangan halaman, renderer, logik buka kunci, dan tingkah laku minigame kekal tidak berubah.",
        en: "Lesson structure, page count, renderer behavior, unlock logic, and minigame behavior remain unchanged.",
        es: "La estructura de la leccion, el numero de paginas, el renderizador, la logica de desbloqueo y el comportamiento de minijuegos no cambiaron.",
      },
    ],
  },
  {
    version: "0.9.1",
    date: "2026-06-06",
    headline: {
      ms: "Aset papan kayu kini lebih ringan dan lebih bersih pada skrin utama",
      en: "Wood plank assets now load lighter and render cleaner on key screens",
      es: "Los tablones de madera ahora cargan mas ligero y se ven mas limpios en pantallas clave",
    },
    highlights: {
      added: [],
      changed: [
        {
          ms: "Aset sempadan papan kayu yang dikemas kini dieksport semula sebagai fail WebP yang lebih ringan untuk halaman landing dan user.",
          en: "Updated wood plank border assets were re-exported as lighter WebP files for the landing and user pages.",
          es: "Los bordes de tablones actualizados se reexportaron como archivos WebP mas ligeros para las paginas landing y user.",
        },
      ],
      fixed: [
        {
          ms: "Bayang segi empat yang tidak diingini di bawah panel papan kayu landing dan user telah dibuang tanpa mengubah logik pengguna atau progress.",
          en: "Unwanted rectangular shadows under the landing and user plank panels were removed without changing user or progress logic.",
          es: "Se eliminaron las sombras rectangulares no deseadas bajo los paneles de tablones de landing y user sin cambiar la logica de usuario ni progreso.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "`woodplank.webp` kekal dalam set aset aktif walaupun belum dirujuk oleh mana-mana route semasa.",
        en: "`woodplank.webp` remains in the active asset set even though no current route references it yet.",
        es: "`woodplank.webp` permanece en el conjunto activo aunque ninguna ruta actual lo referencia todavia.",
      },
    ],
  },
  {
    version: "0.9.0",
    date: "2026-06-06",
    headline: {
      ms: "Bab yang dikemas kini kini ditanda secara pilihan pada peta",
      en: "Updated chapters now have optional notices on the map",
      es: "Los capitulos actualizados ahora tienen avisos opcionales en el mapa",
    },
    highlights: {
      added: [
        {
          ms: "Menambah lencana kemas kini yang mesra untuk bab siap yang mempunyai kandungan baharu.",
          en: "Added friendly update badges for completed chapters that have newer content.",
          es: "Se agregaron insignias amigables para capitulos completados con contenido nuevo.",
        },
      ],
      changed: [
        {
          ms: "Pengguna boleh mengulang kaji bab yang dikemas kini tanpa kehilangan kemajuan, skor, atau akses bab.",
          en: "Users can review updated chapters without losing progress, scores, or chapter access.",
          es: "Los usuarios pueden repasar capitulos actualizados sin perder progreso, puntuaciones ni acceso.",
        },
      ],
      fixed: [
        {
          ms: "Lencana hanya hilang selepas bab dikemas kini ditamatkan semula, bukan apabila dibuka atau lencana disentuh.",
          en: "Badges clear only after the updated chapter is completed again, not when it is opened or the badge is tapped.",
          es: "Las insignias solo desaparecen tras completar de nuevo el capitulo actualizado, no al abrirlo o tocar la insignia.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Semakan kandungan bab disimpan berasingan daripada progress dan logik buka kunci.",
        en: "Chapter content revisions are stored separately from progress and unlock logic.",
        es: "Las revisiones de contenido se guardan separadas del progreso y la logica de desbloqueo.",
      },
    ],
  },
  {
    version: "0.8.2",
    date: "2026-06-06",
    headline: {
      ms: "Pelajaran keluarga Bab 2 kini lebih visual dan ringkas",
      en: "Chapter 2's family lesson is now more visual and focused",
      es: "La leccion familiar del Capitulo 2 ahora es mas visual y directa",
    },
    highlights: {
      added: [
        {
          ms: "Menambah artwork keluarga WebP dan kad ahli keluarga dengan label Bahasa Melayu, Inggeris, dan Sepanyol.",
          en: "Added optimized WebP family artwork and family-member cards with Malay, English, and Spanish labels.",
          es: "Se agregaron ilustraciones familiares WebP optimizadas y tarjetas con etiquetas en malayo, ingles y espanol.",
        },
      ],
      changed: [
        {
          ms: "Menyusun semula halaman keluarga asas kepada gambar keluarga dan empat baris kad kosa kata yang mudah dibaca.",
          en: "Reorganized the core-family page into a family portrait and four clear rows of vocabulary cards.",
          es: "Se reorganizo la pagina de familia basica con un retrato familiar y cuatro filas claras de tarjetas de vocabulario.",
        },
        {
          ms: "Meringkaskan Bab 2 kepada satu intro Aku-Aku dan tujuh halaman pelajaran.",
          en: "Streamlined Chapter 2 to one Aku-Aku intro and seven lesson pages.",
          es: "Se simplifico el Capitulo 2 a una introduccion de Aku-Aku y siete paginas de leccion.",
        },
      ],
      fixed: [
        {
          ms: "Mengekalkan penomboran halaman, navigasi, progress, dan tamat bab selaras dengan aliran Bab 2 yang lebih pendek.",
          en: "Kept page numbering, navigation, progress, and chapter completion aligned with the shorter Chapter 2 flow.",
          es: "Se mantuvieron alineados la numeracion, la navegacion, el progreso y la finalizacion con el flujo mas corto del Capitulo 2.",
        },
      ],
    },
    technicalNotes: [
      {
        ms: "Menambah jenis halaman keluarga khusus dan perender kandungan terhad tanpa mengubah UI bab global.",
        en: "Added a focused family-page type and content renderer without changing the global chapter UI.",
        es: "Se agrego un tipo de pagina familiar y un renderizador enfocado sin cambiar la interfaz global de capitulos.",
      },
    ],
  },
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
