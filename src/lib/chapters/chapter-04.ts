import type { ChapterContent } from "./types";

export const chapter04: ChapterContent = {
  id: 4,
  title: { ms: "Masa & Arah", en: "Time & Directions", es: "Tiempo y Direcciones" },

  pages: [

    // Page introduction

    {
      id: "c4-p1-masa",
      kind: "intro",
      sections: [
        // ----------------------------
        // MASA definition
        // ----------------------------
        {
          kind: "list",
          id: "c4-s1-def",
          title: { ms: "MASA", en: "TIME", es: "TIEMPO" },
          items: [
            {
              id: "c4-def-1",
              ms: "Masa = waktu, ketika",
              en: "Time = time, when",
              es: "Tiempo = tiempo, cuando",
            },
          ],
        },

        // ----------------------------
        // Tahun (as pairs so it looks like a table)
        // ----------------------------
        {
          kind: "pairs",
          id: "c4-s2-tahun",
          title: { ms: "Tahun", en: "Year", es: "Año" },
            pairs: [
            {
                id: "c4-year-2019",
                q: { id: "q-2019", ms: "Contoh: 2019", en: "Example: 2019", es: "Ejemplo: 2019" },
                a: {
                id: "a-2019",
                ms: "Tahun dua ribu sembilan belas",
                en: "Year two thousand nineteen",
                es: "Año dos mil diecinueve",
                },
            },

            {
                id: "c4-range-2009-2019",
                q: { id: "q-2009-2019", ms: "Selang masa: 2009 – 2019", en: "Time span: 2009 – 2019", es: "Intervalo: 2009 – 2019" },
                a: {
                id: "a-2009-2019",
                ms: "Sepuluh tahun = Satu dekad",
                en: "Ten years = One decade",
                es: "Diez años = Una década",
                },
            },

            {
                id: "c4-range-1919-2019",
                q: { id: "q-1919-2019", ms: "Selang masa: 1919 – 2019", en: "Time span: 1919 – 2019", es: "Intervalo: 1919 – 2019" },
                a: {
                id: "a-1919-2019",
                ms: "Seratus tahun = Satu abad",
                en: "One hundred years = One century",
                es: "Cien años = Un siglo",
                },
            },

            {
                id: "c4-range-1020-2020",
                q: { id: "q-1020-2020", ms: "Selang masa: 1020 – 2020", en: "Time span: 1020 – 2020", es: "Intervalo: 1020 – 2020" },
                a: {
                id: "a-1020-2020",
                ms: "Seribu tahun = Satu alaf",
                en: "One thousand years = One millennium",
                es: "Mil años = Un milenio",
                },
            },
            ],

        },

        // ----------------------------
        // Bulan (months)
        // ----------------------------
        {
          kind: "list",
          id: "c4-s3-bulan",
          title: { ms: "Bulan", en: "Months", es: "Meses" },
          items: [
            { id: "m1", ms: "1 Januari",   en: "1 January",   es: "1 Enero" },
            { id: "m2", ms: "2 Februari",  en: "2 February",  es: "2 Febrero" },
            { id: "m3", ms: "3 Mac",       en: "3 March",     es: "3 Marzo" },
            { id: "m4", ms: "4 April",     en: "4 April",     es: "4 Abril" },
            { id: "m5", ms: "5 Mei",       en: "5 May",       es: "5 Mayo" },
            { id: "m6", ms: "6 Jun",       en: "6 June",      es: "6 Junio" },
            { id: "m7", ms: "7 Julai",     en: "7 July",      es: "7 Julio" },
            { id: "m8", ms: "8 Ogos",      en: "8 August",    es: "8 Agosto" },
            { id: "m9", ms: "9 September",en: "9 September", es: "9 Septiembre" },
            { id: "m10", ms: "10 Oktober", en: "10 October",  es: "10 Octubre" },
            { id: "m11", ms: "11 November", en: "11 November", es: "11 Noviembre" },
            { id: "m12", ms: "12 Disember",  en: "12 December", es: "12 Diciembre" },
          ],
        },

        // ----------------------------
        // Hari (days)
        // ----------------------------
        {
          kind: "list",
          id: "c4-s4-hari",
          title: { ms: "Hari", en: "Days", es: "Días" },
          items: [
            { id: "d1", ms: "Isnin",  en: "Monday",    es: "Lunes" },
            { id: "d2", ms: "Selasa", en: "Tuesday",   es: "Martes" },
            { id: "d3", ms: "Rabu",   en: "Wednesday", es: "Miércoles" },
            { id: "d4", ms: "Khamis", en: "Thursday",  es: "Jueves" },
            { id: "d5", ms: "Jumaat", en: "Friday",    es: "Viernes" },
            { id: "d6", ms: "Sabtu",  en: "Saturday",  es: "Sábado" },
            { id: "d7", ms: "Ahad",   en: "Sunday",    es: "Domingo" },
            {
              id: "d8",
              ms: "7 Hari = 1 Minggu",
              en: "7 Days = 1 Week",
              es: "7 Días = 1 Semana",
            },
          ],
        },

        // ----------------------------
        // Masa conversions (as pairs)
        // ----------------------------
        {
          kind: "pairs",
          id: "c4-s5-convert",
          title: { ms: "Masa", en: "Time", es: "Tiempo" },
          pairs: [
            {
              id: "c4-conv-1",
              q: { id: "q-jam", ms: "1 JAM", en: "1 HOUR", es: "1 HORA" },
              a: { id: "a-minit", ms: "60 minit", en: "60 minutes", es: "60 minutos" },
            },
            {
              id: "c4-conv-2",
              q: { id: "q-minit", ms: "1 MINIT", en: "1 MINUTE", es: "1 MINUTO" },
              a: { id: "a-saat", ms: "60 saat", en: "60 seconds", es: "60 segundos" },
            },
          ],
        },
      ],
    },

    // Kata sendi masa

    {
  id: "p2-kata-sendi-nama-masa",
  kind: "intro",
  sections: [
    // --- SECTION: quick concept (ke/dari/pada) ---
    {
      kind: "list",
      id: "c4-sendi-concept",
      title: {
        ms: "Kata Sendi Nama & Masa",
        en: "Prepositions for place & time",
        es: "Preposiciones de lugar y tiempo",
      },
      items: [
        {
          id: "ks-ke",
          ms: "ke — arah / menuju",
          en: "ke — to / towards (direction)",
          es: "ke — hacia / a (dirección)",
        },
        {
          id: "ks-dari",
          ms: "dari — asal / sejak",
          en: "dari — from / since (starting point)",
          es: "dari — de / desde (origen)",
        },
        {
          id: "ks-pada",
          ms: "pada — pada masa / pada waktu",
          en: "pada — at / on (time reference)",
          es: "pada — en (referencia de tiempo)",
        },
      ],
    },

    // --- SECTION: KE examples ---
    {
      kind: "pairs",
      id: "c4-sendi-ke",
      title: { ms: "ke", en: "ke (to / until)", es: "ke (a / hasta)" },
      pairs: [
        {
          id: "ke-1",
          q: {
            id: "ke-q1",
            ms: "Kami bersama hingga ke hari ini.",
            en: "We are together until today.",
            es: "Estamos juntos hasta hoy.",
          },
          a: {
            id: "ke-a1",
            ms: "ke hari ini",
            en: "until today",
            es: "hasta hoy",
          },
        },
        {
          id: "ke-2",
          q: {
            id: "ke-q2",
            ms: "Panas hingga ke petang.",
            en: "It is hot until the evening.",
            es: "Hace calor hasta la tarde.",
          },
          a: {
            id: "ke-a2",
            ms: "ke petang",
            en: "until evening",
            es: "hasta la tarde",
          },
        },
        {
          id: "ke-3",
          q: {
            id: "ke-q3",
            ms: "Dari tahun ke tahun, kita masih di sini.",
            en: "Year after year, we are still here.",
            es: "Año tras año, todavía estamos aquí.",
          },
          a: {
            id: "ke-a3",
            ms: "tahun ke tahun",
            en: "year after year",
            es: "año tras año",
          },
        },
      ],
    },

    // --- SECTION: DARI examples ---
    {
      kind: "pairs",
      id: "c4-sendi-dari",
      title: { ms: "dari", en: "dari (from / since)", es: "dari (de / desde)" },
      pairs: [
        {
          id: "dari-1",
          q: {
            id: "dari-q1",
            ms: "Dari pagi saya di sini.",
            en: "I have been here since morning.",
            es: "Estoy aquí desde la mañana.",
          },
          a: {
            id: "dari-a1",
            ms: "dari pagi",
            en: "since morning",
            es: "desde la mañana",
          },
        },
        {
          id: "dari-2",
          q: {
            id: "dari-q2",
            ms: "Saya belum makan dari semalam.",
            en: "I haven't eaten since last night.",
            es: "No he comido desde anoche.",
          },
          a: {
            id: "dari-a2",
            ms: "dari semalam",
            en: "since last night",
            es: "desde anoche",
          },
        },
        {
          id: "dari-3",
          q: {
            id: "dari-q3",
            ms: "Saya tinggal di Kuala Lumpur dari bulan Januari.",
            en: "I have lived in Kuala Lumpur since January.",
            es: "Vivo en Kuala Lumpur desde enero.",
          },
          a: {
            id: "dari-a3",
            ms: "dari bulan Januari",
            en: "since January",
            es: "desde enero",
          },
        },
        {
          id: "dari-4",
          q: {
            id: "dari-q4",
            ms: "Kita semakin tua dari hari ke hari.",
            en: "We get older day by day.",
            es: "Envejecemos día a día.",
          },
          a: {
            id: "dari-a4",
            ms: "dari hari ke hari",
            en: "day by day",
            es: "día a día",
          },
        },
        {
          id: "dari-5",
          q: {
            id: "dari-q5",
            ms: "Dari pukul 5.30 petang saya sudah sampai.",
            en: "By 5:30 PM, I had already arrived. (since 5:30 PM / from 5:30 PM)",
            es: "Desde las 5:30 p. m., ya había llegado. (a partir de 5:30 p. m.)",
          },
          a: {
            id: "dari-a5",
            ms: "dari pukul 5.30 petang",
            en: "from/since 5:30 PM",
            es: "desde las 5:30 p. m.",
          },
        },
      ],
    },

    // --- SECTION: PADA examples ---
    {
      kind: "pairs",
      id: "c4-sendi-pada",
      title: { ms: "pada", en: "pada (at / on)", es: "pada (en)" },
      pairs: [
        {
          id: "pada-1",
          q: {
            id: "pada-q1",
            ms: "Saya pergi ke sekolah pada pukul 7.00 pagi.",
            en: "I go to school at 7:00 AM.",
            es: "Voy a la escuela a las 7:00 a. m.",
          },
          a: {
            id: "pada-a1",
            ms: "pada pukul 7.00 pagi",
            en: "at 7:00 AM",
            es: "a las 7:00 a. m.",
          },
        },
        {
          id: "pada-2",
          q: {
            id: "pada-q2",
            ms: "Emak pulang pada tahun lepas.",
            en: "Mother returned last year.",
            es: "Mamá regresó el año pasado.",
          },
          a: {
            id: "pada-a2",
            ms: "pada tahun lepas",
            en: "last year",
            es: "el año pasado",
          },
        },
        {
          id: "pada-3",
          q: {
            id: "pada-q3",
            ms: "Cuaca panas pada waktu tengahari.",
            en: "The weather is hot at noon.",
            es: "Hace calor al mediodía.",
          },
          a: {
            id: "pada-a3",
            ms: "pada waktu tengahari",
            en: "at noon",
            es: "al mediodía",
          },
        },
        {
          id: "pada-4",
          q: {
            id: "pada-q4",
            ms: "Pada 30 minit yang lepas, saya di sini.",
            en: "In the last 30 minutes, I have been here.",
            es: "En los últimos 30 minutos, he estado aquí.",
          },
          a: {
            id: "pada-a4",
            ms: "pada 30 minit yang lepas",
            en: "in the last 30 minutes",
            es: "en los últimos 30 minutos",
          },
        },
      ],
    },
  ],
},

// kata arah

{
  id: "p5-kata-arah-gambar",
  kind: "table",
  title: {
    ms: "Kata Arah",
    en: "Direction words",
    es: "Palabras de dirección",
  },
  columns: [
    { key: "img", label: { ms: "Gambar", en: "Image", es: "Imagen" } },
    { key: "word", label: { ms: "Perkataan", en: "Word", es: "Palabra" } },
  ],
  rows: [
    {
      id: "r-kanan",
      cells: {
        img: [
          {
            kind: "image",
            src: "/assets/chapters/ch4/kanan.png",
            alt: { ms: "kanan", en: "right", es: "derecha" },
            w: 420,
            h: 420,
            className: "w-full h-auto max-h-48 object-contain",
          },
        ],
        word: [{ ms: "kanan", en: "right", es: "derecha" }],
      },
    },
    {
      id: "r-kiri",
      cells: {
        img: [
          {
            kind: "image",
            src: "/assets/chapters/ch4/kiri.png",
            alt: { ms: "kiri", en: "left", es: "izquierda" },
            w: 420,
            h: 420,
            className: "w-full h-auto max-h-48 object-contain",
          },
        ],
        word: [{ ms: "kiri", en: "left", es: "izquierda" }],
      },
    },
    {
      id: "r-sini",
      cells: {
        img: [
          {
            kind: "image",
            src: "/assets/chapters/ch4/sini.png",
            alt: { ms: "sini", en: "here", es: "aquí" },
            w: 420,
            h: 420,
            className: "w-full h-auto max-h-48 object-contain",
          },
        ],
        word: [{ ms: "sini", en: "here", es: "aquí" }],
      },
    },
    {
      id: "r-sana",
      cells: {
        img: [
          {
            kind: "image",
            src: "/assets/chapters/ch4/sana.png",
            alt: { ms: "sana", en: "there", es: "allá" },
            w: 640,
            h: 360,
            className: "w-full h-auto max-h-48 object-contain",
          },
        ],
        word: [{ ms: "sana", en: "there", es: "allá" }],
      },
    },
  ],
},



    ///kompas

{
  id: "p6-kompas-arah",
  kind: "figure",
  title: {
    ms: "Kompas Arah",
    en: "Compass Directions",
    es: "Direcciones de la brújula",
  },
  imageSrc: "/assets/chapters/ch4/kompas.png",
  alt: {
    ms: "Gambar kompas arah: utara, selatan, timur, barat",
    en: "Compass diagram: north, south, east, west",
    es: "Diagrama de brújula: norte, sur, este, oeste",
  },
  caption: {
    ms: "Utara (atas), Selatan (bawah), Barat (kiri), Timur (kanan).",
    en: "North (top), South (bottom), West (left), East (right).",
    es: "Norte (arriba), Sur (abajo), Oeste (izquierda), Este (derecha).",
  },
  maxWidthPx: 720,
},



    // ------------------------------------------------------------
    // Page 1: TIME EXPRESSIONS (table)
    // ------------------------------------------------------------
    {
      id: "c4-p1-ungkapan-masa",
      kind: "table",
      title: {
        ms: "Ungkapan Masa dalam Bahasa Melayu",
        en: "Time expressions in Malay",
        es: "Expresiones de tiempo en malayo",
      },
      columns: [
        { key: "ungkapan", label: { ms: "Ungkapan", en: "Expression", es: "Expresión" } },
        { key: "maksud", label: { ms: "Maksud", en: "Meaning", es: "Significado" } },
      ],
      rows: [
        {
          id: "c4-r1-pukul",
          cells: {
            ungkapan: [{ ms: "Pukul 3", en: "3 o’clock", es: "Las 3" }],
            maksud: [
              { ms: "Untuk menyebut masa (jam).", en: "Used to tell the time (hour).", es: "Se usa para decir la hora." },
              { ms: "Contoh: Sekarang pukul 3.", en: "Example: It’s 3 o’clock now.", es: "Ejemplo: Ahora son las 3." },
            ],
          },
        },
        {
          id: "c4-r2-sekarang",
          cells: {
            ungkapan: [{ ms: "Sekarang", en: "Now", es: "Ahora" }],
            maksud: [{ ms: "Masa ini.", en: "At this moment.", es: "En este momento." }],
          },
        },
        {
          id: "c4-r3-hari-ini",
          cells: {
            ungkapan: [{ ms: "Hari ini", en: "Today", es: "Hoy" }],
            maksud: [{ ms: "Pada hari ini.", en: "On this day.", es: "En el día de hoy." }],
          },
        },
        {
          id: "c4-r4-esok",
          cells: {
            ungkapan: [{ ms: "Esok", en: "Tomorrow", es: "Mañana" }],
            maksud: [{ ms: "Hari selepas hari ini.", en: "The day after today.", es: "El día después de hoy." }],
          },
        },
        {
          id: "c4-r5-semalam",
          cells: {
            ungkapan: [{ ms: "Semalam", en: "Yesterday", es: "Ayer" }],
            maksud: [{ ms: "Hari sebelum hari ini.", en: "The day before today.", es: "El día antes de hoy." }],
          },
        },
        {
          id: "c4-r6-nanti",
          cells: {
            ungkapan: [{ ms: "Nanti", en: "Later", es: "Luego / más tarde" }],
            maksud: [{ ms: "Pada masa kemudian.", en: "At a later time.", es: "En otro momento más tarde." }],
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 2: DIFFERENT TIMES OF DAY (table with images)
    // ------------------------------------------------------------
    {
      id: "c4-p2-waktu-harian",
      kind: "table",
      title: {
        ms: "Waktu Pagi, Petang, dan Malam",
        en: "Morning, evening, and night",
        es: "Mañana, tarde y noche",
      },
      columns: [
        { key: "pagi", label: { ms: "Pagi", en: "Morning", es: "Mañana" } },
        { key: "tengahari", label: { ms: "Tengah hari", en: "Midday", es: "Mediodía" } },
        { key: "petang", label: { ms: "Petang", en: "Evening", es: "Tarde" } },
        { key: "malam", label: { ms: "Malam", en: "Night", es: "Noche" } },
      ],
      rows: [
        {
          id: "row-gambar-waktu",
          cells: {
            pagi: [
              {
                kind: "image",
                src: "/assets/chapters/ch4/pagi.png",
                alt: { ms: "Pagi", en: "Morning", es: "Mañana" },
                w: 320,
                h: 200,
                className: "w-full h-auto max-h-44 object-contain",
              },
            ],
            tengahari: [
              {
                kind: "image",
                src: "/assets/chapters/ch4/tengahhari.png",
                alt: { ms: "Tengah hari", en: "Midday", es: "Mediodía" },
                w: 320,
                h: 200,
                className: "w-full h-auto max-h-44 object-contain",
              },
            ],
            petang: [
              {
                kind: "image",
                src: "/assets/chapters/ch4/petang.png",
                alt: { ms: "Petang", en: "Evening", es: "Tarde" },
                w: 320,
                h: 200,
                className: "w-full h-auto max-h-44 object-contain",
              },
            ],
            malam: [
              {
                kind: "image",
                src: "/assets/chapters/ch4/malam.png",
                alt: { ms: "Malam", en: "Night", es: "Noche" },
                w: 320,
                h: 200,
                className: "w-full h-auto max-h-44 object-contain",
              },
            ],
          },
        },
        {
          id: "row-desc-waktu",
          cells: {
            pagi: [{ ms: "Pagi (±6:00–11:59)", en: "Morning (≈6:00–11:59)", es: "Mañana (≈6:00–11:59)" }],
            tengahari: [{ ms: "Tengah hari (±12:00–1:59)", en: "Midday (≈12:00–1:59)", es: "Mediodía (≈12:00–13:59)" }],
            petang: [{ ms: "Petang (±2:00–6:59)", en: "Evening (≈2:00–6:59)", es: "Tarde (≈14:00–18:59)" }],
            malam: [{ ms: "Malam (±7:00–5:59)", en: "Night (≈7:00–5:59)", es: "Noche (≈19:00–5:59)" }],
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 3: DRAGFILL (choose pagi/petang/malam)
    // ------------------------------------------------------------
    {
      id: "c4-p3-latihan-waktu",
      kind: "dragfill",
      title: {
        ms: "Latihan: Pilih Waktu yang Betul",
        en: "Exercise: Choose the correct time of day",
        es: "Ejercicio: Elige el momento del día correcto",
      },
      instructions: {
        ms: "Seret perkataan yang betul ke tempat kosong.",
        en: "Drag the correct word into the blank.",
        es: "Arrastra la palabra correcta al espacio en blanco.",
      },
      options: [
        { id: "opt-pagi", ms: "pagi", en: "morning", es: "mañana" },
        { id: "opt-petang", ms: "petang", en: "evening", es: "tarde" },
        { id: "opt-malam", ms: "malam", en: "night", es: "noche" },
      ],
      items: [
        {
          id: "c4-q1",
          n: 1,
          q: {
            kind: "blank",
            before: { ms: "Saya pergi kerja pada waktu", en: "I go to work in the", es: "Yo voy al trabajo en la" },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "opt-pagi",
          },
          a: {
            kind: "text",
            text: {
              ms: "Contoh: pukul 8 pagi",
              en: "Example: 8 a.m.",
              es: "Ejemplo: 8 a.m.",
            },
          },
        },
        {
          id: "c4-q2",
          n: 2,
          q: {
            kind: "blank",
            before: { ms: "Kami minum teh pada waktu", en: "We drink tea in the", es: "Tomamos té en la" },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "opt-petang",
          },
          a: {
            kind: "text",
            text: {
              ms: "Contoh: pukul 5 petang",
              en: "Example: 5 p.m.",
              es: "Ejemplo: 5 p.m.",
            },
          },
        },
        {
          id: "c4-q3",
          n: 3,
          q: {
            kind: "blank",
            before: { ms: "Saya tidur pada waktu", en: "I sleep at", es: "Yo duermo en la" },
            after: { ms: ".", en: ".", es: "." },
            correctOptionId: "opt-malam",
          },
          a: {
            kind: "text",
            text: {
              ms: "Contoh: pukul 11 malam",
              en: "Example: 11 p.m.",
              es: "Ejemplo: 11 p.m.",
            },
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 4: TYPEIN (unscramble)
    // ------------------------------------------------------------
    {
      id: "c4-p4-latihan-susun",
      kind: "typein",
      title: {
        ms: "Latihan: Susun Semula Huruf",
        en: "Exercise: Unscramble the letters",
        es: "Ejercicio: Ordena las letras",
      },
      instructions: {
        ms: "Susun semula huruf menjadi perkataan yang betul.",
        en: "Rearrange the letters to form the correct word.",
        es: "Reordena las letras para formar la palabra correcta.",
      },
      caseSensitive: false,
      items: [
        { id: "c4-t1", n: 1, scrambled: "igap", answer: "pagi", meaning: { ms: "pagi", en: "morning", es: "mañana" } },
        { id: "c4-t2", n: 2, scrambled: "gnatep", answer: "petang", meaning: { ms: "petang", en: "evening", es: "tarde" } },
        { id: "c4-t3", n: 3, scrambled: "mmaal", answer: "malam", meaning: { ms: "malam", en: "night", es: "noche" } },
        { id: "c4-t4", n: 4, scrambled: "gnaraeks", answer: "sekarang", meaning: { ms: "sekarang", en: "now", es: "ahora" } },
        { id: "c4-t5", n: 5, scrambled: "kose", answer: "esok", meaning: { ms: "esok", en: "tomorrow", es: "mañana (mañana día siguiente)" } },
      ],
    },

    // ------------------------------------------------------------
    // Page 5: CHAT (situasi masa di perhentian bas)
    // ------------------------------------------------------------
    {
      id: "c4-p5-chat-masa-arah",
      kind: "chat",
      title: {
        ms: "Situasi 4.1 Masa",
        en: "Situation 4.1 Time",
        es: "Situación 4.1 Tiempo",
      },
      context: {
        ms: "Latar tempat: Sebuah perhentian bas.",
        en: "Setting: A bus stop.",
        es: "Lugar: Una parada de autobús.",
      },
      participants: [
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" } },
        {
          id: "mohamad",
          name: { ms: "Mohamad", en: "Mohamad", es: "Mohamad" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c4-m1",
          from: "azman",
          text: {
            ms: "Maafkan saya encik, boleh saya tahu pukul berapa sekarang?",
            en: "Excuse me sir, may I know what time it is now?",
            es: "Disculpe señor, ¿puedo saber qué hora es ahora?",
          },
        },
        {
          id: "c4-m2",
          from: "mohamad",
          text: {
            ms: "Boleh. Sekarang pukul 7.45 pagi. Kenapa?",
            en: "Sure. It's 7:45 a.m. Why?",
            es: "Claro. Son las 7:45 de la mañana. ¿Por qué?",
          },
        },
        {
          id: "c4-m3",
          from: "azman",
          text: {
            ms: "Saya sebenarnya sudah terlewat untuk pergi ke kelas.",
            en: "I'm actually already late for class.",
            es: "De hecho ya llego tarde a clase.",
          },
        },
        {
          id: "c4-m4",
          from: "mohamad",
          text: {
            ms: "Pukul berapa kelas awak bermula?",
            en: "What time does your class start?",
            es: "¿A qué hora empieza tu clase?",
          },
        },
        {
          id: "c4-m5",
          from: "azman",
          text: {
            ms: "Kelas saya pukul 8.00 pagi. Sebenarnya saya terlewat bangun sebab semalam saya bermain futsal.",
            en: "My class is at 8:00 a.m. I woke up late because I played futsal last night.",
            es: "Mi clase es a las 8:00 a. m. Me desperté tarde porque anoche jugué fútbol sala.",
          },
        },
        {
          id: "c4-m6",
          from: "mohamad",
          text: {
            ms: "Oh, awak bermain futsal juga?",
            en: "Oh, you play futsal too?",
            es: "Ah, ¿también juegas fútbol sala?",
          },
        },
        {
          id: "c4-m7",
          from: "azman",
          text: {
            ms: "Ya, saya bermain futsal dua kali seminggu.",
            en: "Yes, I play futsal twice a week.",
            es: "Sí, juego fútbol sala dos veces por semana.",
          },
        },
        {
          id: "c4-m8",
          from: "mohamad",
          text: {
            ms: "Baguslah. Baik untuk kesihatan.",
            en: "That's great. Good for health.",
            es: "Qué bien. Es bueno para la salud.",
          },
        },
        {
          id: "c4-m9",
          from: "azman",
          text: {
            ms: "Eh, bas sudah sampai. Jom kita pergi.",
            en: "Oh, the bus has arrived. Let's go.",
            es: "Eh, el autobús ya llegó. Vamos.",
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 5b: CHAT (wayang)
    // ------------------------------------------------------------
    {
      id: "c4-p5b-chat-wayang",
      kind: "chat",
      title: {
        ms: "Situasi 4.2 Masa Menonton Wayang",
        en: "Situation 4.2 Movie Time",
        es: "Situación 4.2 Hora de cine",
      },
      context: {
        ms: "Latar tempat: Kaunter perkhidmatan azman di sebuah panggung wayang.",
        en: "Setting: Customer service counter at a cinema.",
        es: "Lugar: Mostrador de atención al cliente en un cine.",
      },
      participants: [
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" } },
        {
          id: "jurukaunter",
          name: { ms: "Jurukaunter", en: "Ticket clerk", es: "Taquillero" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c4-42-m1",
          from: "jurukaunter",
          text: {
            ms: "Selamat petang, encik.",
            en: "Good afternoon, sir.",
            es: "Buenas tardes, señor.",
          },
        },
        {
          id: "c4-42-m2",
          from: "azman",
          text: {
            ms: "Selamat petang.",
            en: "Good afternoon.",
            es: "Buenas tardes.",
          },
        },
        {
          id: "c4-42-m3",
          from: "jurukaunter",
          text: {
            ms: "Encik hendak menonton cerita apa?",
            en: "Which movie would you like to watch?",
            es: "¿Qué película le gustaría ver?",
          },
        },
        {
          id: "c4-42-m4",
          from: "azman",
          text: {
            ms: "Saya hendak menonton cerita “Dendam – Perjanjian Dua Alam”.",
            en: 'I want to watch the movie "Dendam – Perjanjian Dua Alam".',
            es: 'Quiero ver la película "Dendam – Perjanjian Dua Alam".',
          },
        },
        {
          id: "c4-42-m5",
          from: "jurukaunter",
          text: {
            ms: "Baik, tayangan untuk cerita itu ada pada pukul 10.00 pagi, 4.00 petang, dan 9.00 malam.\nEncik hendak membeli tiket pada pukul berapa?",
            en: "Alright, showtimes are at 10:00 a.m., 4:00 p.m., and 9:00 p.m.\nWhat time would you like to buy tickets for?",
            es: "Bien, las funciones son a las 10:00 a. m., 4:00 p. m. y 9:00 p. m.\n¿Para qué hora quiere comprar las entradas?",
          },
        },
        {
          id: "c4-42-m6",
          from: "azman",
          text: {
            ms: "Kalau macam itu, saya hendak menonton pada pukul 4 untuk dua orang. Berapa harganya?",
            en: "In that case, I'd like the 4 p.m. show for two people. How much is it?",
            es: "En ese caso, quiero la función de las 4 p. m. para dos personas. ¿Cuánto cuesta?",
          },
        },
        {
          id: "c4-42-m7",
          from: "jurukaunter",
          text: {
            ms: "Baik, satu tiket harganya RM12. Kalau untuk dua orang, harganya RM24.",
            en: "Sure, one ticket is RM12. For two people, it's RM24.",
            es: "Claro, un boleto cuesta RM12. Para dos personas son RM24.",
          },
        },
        {
          id: "c4-42-m8",
          from: "azman",
          text: {
            ms: "Oo, RM24 ya, ini wangnya.",
            en: "Oh, RM24, here is the cash.",
            es: "Ah, RM24, aquí está el dinero.",
          },
        },
        {
          id: "c4-42-m9",
          from: "jurukaunter",
          text: {
            ms: "Ini tiket encik untuk dua orang. Terima kasih.",
            en: "Here are your tickets for two. Thank you.",
            es: "Aquí están sus entradas para dos. Gracias.",
          },
        },
        {
          id: "c4-42-m10",
          from: "azman",
          text: {
            ms: "Sama-sama.",
            en: "You're welcome.",
            es: "De nada.",
          },
        },
        {
          id: "c4-42-m11",
          from: "jurukaunter",
          text: {
            ms: "Selamat menonton.",
            en: "Enjoy the movie.",
            es: "Disfrute la película.",
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 5c: CHAT (penunjuk arah jalan)
    // ------------------------------------------------------------
    {
      id: "c4-p5c-chat-arah",
      kind: "chat",
      title: {
        ms: "Situasi 4.3 Penunjuk Arah Jalan",
        en: "Situation 4.3 Giving Directions",
        es: "Situación 4.3 Dar indicaciones",
      },
      context: {
        ms: "Latar tempat: Tepi jalan raya.",
        en: "Setting: Roadside.",
        es: "Lugar: Al borde de la carretera.",
      },
      participants: [
        { id: "azman", name: { ms: "Azman", en: "Azman", es: "Azman" } },
        {
          id: "ahmad",
          name: { ms: "Ahmad", en: "Ahmad", es: "Ahmad" },
          avatarSrc: "/assets/characters/Bandicoot_Profile.png",
        },
      ],
      messages: [
        {
          id: "c4-43-m1",
          from: "ahmad",
          text: {
            ms: "Abang, boleh tumpang tanya? Di mana klinik kesihatan yang paling dekat ya?",
            en: "Sir, may I ask? Where is the nearest health clinic?",
            es: "Disculpe, ¿dónde está la clínica de salud más cercana?",
          },
        },
        {
          id: "c4-43-m2",
          from: "azman",
          text: {
            ms: "Oo, boleh. Tidak ada masalah. Klinik kesihatan yang paling dekat di sini kira-kira 500 meter.",
            en: "Sure, no problem. The nearest clinic from here is about 500 meters away.",
            es: "Claro, no hay problema. La clínica más cercana está a unos 500 metros de aquí.",
          },
        },
        {
          id: "c4-43-m3",
          from: "azman",
          text: {
            ms: "Awak jalan terus ikut jalan ini, kira-kira 200 meter awak belok ke kiri daripada simpang depan sana, lepas itu awak jalan terus lagi, dan awak akan nampak klinik kesihatan di sebelah kanan. Di situlah klinik itu.",
            en: "Walk straight along this road, about 200 meters turn left at the junction ahead, then keep going straight and you'll see the clinic on the right. That's the clinic.",
            es: "Sigue recto por esta calle, a unos 200 metros gira a la izquierda en la intersección, luego sigue recto y verás la clínica a la derecha. Ahí está la clínica.",
          },
        },
        {
          id: "c4-43-m4",
          from: "ahmad",
          text: {
            ms: "Terima kasih, abang.",
            en: "Thank you, sir.",
            es: "Gracias.",
          },
        },
        {
          id: "c4-43-m5",
          from: "azman",
          text: {
            ms: "Sama-sama. Hati-hati.",
            en: "You're welcome. Take care.",
            es: "De nada. Cuídate.",
          },
        },
        {
          id: "c4-43-m6",
          from: "ahmad",
          text: {
            ms: "Saya gerak dulu.",
            en: "I'll get going now.",
            es: "Me voy ya.",
          },
        },
        {
          id: "c4-43-m7",
          from: "azman",
          text: {
            ms: "Baik.",
            en: "Alright.",
            es: "De acuerdo.",
          },
        },
      ],
    },

    // ------------------------------------------------------------
    // Page 6: BOXDRAG (compass directions)
    // ------------------------------------------------------------
    {
      id: "c4-p6-boxdrag-kompas",
      kind: "boxdrag",
      title: {
        ms: "Latihan: Arah Kompas",
        en: "Exercise: Compass directions",
        es: "Ejercicio: Direcciones de la brújula",
      },
      instructions: {
        ms: "Seret perkataan ke tempat yang betul (utara/selatan/timur/barat).",
        en: "Drag the words to the correct place (north/south/east/west).",
        es: "Arrastra las palabras al lugar correcto (norte/sur/este/oeste).",
      },
      compact: true,
      options: [
        { id: "dir-utara", ms: "utara", en: "north", es: "norte" },
        { id: "dir-selatan", ms: "selatan", en: "south", es: "sur" },
        { id: "dir-timur", ms: "timur", en: "east", es: "este" },
        { id: "dir-barat", ms: "barat", en: "west", es: "oeste" },
      ],
      nodes: [
        {
          id: "center",
          shape: "oval",
          xPct: 50,
          yPct: 50,
          fixedText: {
            ms: "ANDA\nDI SINI",
            en: "YOU\nARE HERE",
            es: "TÚ\nESTÁS AQUÍ",
          },
        },
        { id: "top", shape: "rect", xPct: 50, yPct: 18, correctOptionId: "dir-utara" },
        { id: "right", shape: "rect", xPct: 82, yPct: 50, correctOptionId: "dir-timur" },
        { id: "bottom", shape: "rect", xPct: 50, yPct: 82, correctOptionId: "dir-selatan" },
        { id: "left", shape: "rect", xPct: 18, yPct: 50, correctOptionId: "dir-barat" },
      ],
      lines: [
        { x1: 50, y1: 50, x2: 50, y2: 18 },
        { x1: 50, y1: 50, x2: 82, y2: 50 },
        { x1: 50, y1: 50, x2: 50, y2: 82 },
        { x1: 50, y1: 50, x2: 18, y2: 50 },
      ],
    },

    // ------------------------------------------------------------
    // Page 7: WORDSEARCH (latihan kata)
    // ------------------------------------------------------------
    {
      id: "c4-p7-wordsearch",
      kind: "wordsearch",
      title: {
        ms: "Latihan: Kata Bersilang (Masa & Arah)",
        en: "Exercise: Word Search (Time & Directions)",
        es: "Ejercicio: Sopa de letras (Tiempo y Direcciones)",
      },
      instructions: {
        ms: "Cari dan tandakan perkataan yang tersembunyi.",
        en: "Find and mark the hidden words.",
        es: "Encuentra y marca las palabras escondidas.",
      },
      grid: [
        "PAXLOMISBTNP",
        "QARCUDYMLOVE",
        "HZGJFQWERKYT",
        "BLUIDOCVAIHA",
        "MEPQZLTSORGN",
        "RMALAMEWHIPG",
        "JFCQVNOZLSUX",
        "KREYAHBNDTGC",
        "PTONWGJKQVAM",
        "LIAUXMDEPANF",
        "GKZSRELCHOQY",
        "VBDWJIFPMCRK",
      ],
      targets: [
        {
          id: "ws-pagi",
          word: "PAGI",
          label: { ms: "Pagi", en: "Morning", es: "Mañana" },
          meaning: { ms: "pagi", en: "morning", es: "mañana" },
        },
        {
          id: "ws-petang",
          word: "PETANG",
          label: { ms: "Petang", en: "Evening", es: "Tarde" },
          meaning: { ms: "petang", en: "evening", es: "tarde" },
        },
        {
          id: "ws-malam",
          word: "MALAM",
          label: { ms: "Malam", en: "Night", es: "Noche" },
          meaning: { ms: "malam", en: "night", es: "noche" },
        },
        {
          id: "ws-kiri",
          word: "KIRI",
          label: { ms: "Kiri", en: "Left", es: "Izquierda" },
          meaning: { ms: "kiri", en: "left", es: "izquierda" },
        },
        {
          id: "ws-kanan",
          word: "KANAN",
          label: { ms: "Kanan", en: "Right", es: "Derecha" },
          meaning: { ms: "kanan", en: "right", es: "derecha" },
        },
        {
          id: "ws-depan",
          word: "DEPAN",
          label: { ms: "Depan", en: "Straight ahead / front", es: "Delante" },
          meaning: { ms: "depan", en: "front / ahead", es: "delante" },
        },
      ],
      allowDiagonal: true,
      allowReverse: true,
    },
  ],
};
