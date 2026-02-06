import type { ChapterContent } from "./types";

export const chapter08: ChapterContent = {
  id: 8,
  title: {
    ms: "Perayaan di Malaysia",
    en: "Celebrations in Malaysia",
    es: "Celebraciones en Malasia",
  },
  pages: [
    {
      id: "c8-p1-perayaan-malaysia",
      kind: "intro",
      sections: [
        {
          kind: "list",
          id: "c8-p1-pengenalan",
          title: {
            ms: "PERAYAAN DI MALAYSIA",
            en: "CELEBRATIONS IN MALAYSIA",
            es: "CELEBRACIONES EN MALASIA",
          },
          items: [
            {
              id: "c8-intro-1",
              ms: "Maksud perayaan: Orang ramai meraikan hari tertentu untuk sambutan tertentu setiap tahun.",
              en: "Meaning of celebration: People celebrate specific days for specific observances every year.",
              es: "Significado de celebracion: La gente celebra dias especificos para conmemoraciones especificas cada ano.",
            },
            {
              id: "c8-intro-2",
              ms: "Di Malaysia, terdapat 3 kaum yang utama iaitu Melayu, Cina, dan India. Setiap kaum memiliki perayaan masing-masing.",
              en: "In Malaysia, there are three major communities: Malay, Chinese, and Indian. Each community has its own celebrations.",
              es: "En Malasia, hay tres comunidades principales: malaya, china e india. Cada comunidad tiene sus propias celebraciones.",
            },
          ],
        },
        {
          kind: "list",
          id: "c8-p1-kaum-perayaan",
          title: {
            ms: "PERAYAAN MENGIKUT KAUM DI MALAYSIA",
            en: "CELEBRATIONS BY COMMUNITY IN MALAYSIA",
            es: "CELEBRACIONES POR COMUNIDAD EN MALASIA",
          },
          items: [
            {
              id: "c8-kaum-melayu",
              ms: "Melayu: Hari Raya Aidilfitri, Hari Raya Aidiladha",
              en: "Malay: Hari Raya Aidilfitri, Hari Raya Aidiladha",
              es: "Malaya: Hari Raya Aidilfitri, Hari Raya Aidiladha",
            },
            {
              id: "c8-kaum-cina",
              ms: "Cina: Tahun Baru Cina",
              en: "Chinese: Chinese New Year",
              es: "China: Ano Nuevo Chino",
            },
            {
              id: "c8-kaum-india",
              ms: "India: Deepavali",
              en: "Indian: Deepavali",
              es: "India: Deepavali",
            },
          ],
        },
      ],
    },
    {
      id: "c8-p2-hari-raya-aidilfitri",
      kind: "table",
      title: {
        ms: "Hari Raya Aidilfitri / Hari Raya Puasa",
        en: "Hari Raya Aidilfitri / Eid al-Fitr",
        es: "Hari Raya Aidilfitri / Eid al-Fitr",
      },
      columns: [
        { key: "perkara", label: { ms: "Perkara", en: "Item", es: "Tema" } },
        { key: "butiran", label: { ms: "Butiran", en: "Details", es: "Detalles" } },
      ],
      rows: [
        {
          id: "c8-raya-disambut-pada",
          cells: {
            perkara: [{ ms: "Disambut pada", en: "Celebrated on", es: "Se celebra en" }],
            butiran: [
              { ms: "1 Syawal (bulan Islam)", en: "1 Syawal (Islamic month)", es: "1 Syawal (mes islamico)" },
              {
                ms: "Selepas sebulan berpuasa di bulan Ramadhan",
                en: "After one month of fasting in Ramadhan",
                es: "Despues de un mes de ayuno en Ramadhan",
              },
            ],
          },
        },
        {
          id: "c8-raya-diamalkan-oleh",
          cells: {
            perkara: [{ ms: "Diamalkan oleh", en: "Observed by", es: "Celebrado por" }],
            butiran: [
              { ms: "Kaum: Melayu", en: "Community: Malay", es: "Comunidad: malaya" },
              { ms: "Agama: Islam", en: "Religion: Islam", es: "Religion: islam" },
            ],
          },
        },
        {
          id: "c8-raya-sembahyang",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "sembahyang raya", en: "eid prayer", es: "oracion de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Sembahyang raya", en: "Eid prayer", es: "Oracion de Eid" },
            ],
          },
        },
        {
          id: "c8-raya-salam",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "salam raya", en: "eid greeting", es: "saludo de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Salam raya", en: "Eid greeting", es: "Saludo de Eid" },
            ],
          },
        },
        {
          id: "c8-raya-hias-rumah",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "hias rumah", en: "decorate house", es: "decorar la casa" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Hias rumah", en: "Decorate house", es: "Decorar la casa" },
            ],
          },
        },
        {
          id: "c8-raya-ziarah",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "ziarah raya", en: "eid visits", es: "visitas de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Ziarah raya", en: "Eid visits", es: "Visitas de Eid" },
            ],
          },
        },
        {
          id: "c8-raya-duit",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "duit raya", en: "eid packet", es: "sobre de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Duit raya", en: "Eid packet", es: "Sobre de Eid" },
            ],
          },
        },
        {
          id: "c8-raya-bunga-api",
          cells: {
            perkara: [{ ms: "Suasana", en: "Activities", es: "Actividades" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "bunga api", en: "fireworks", es: "fuegos artificiales" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Bunga api", en: "Fireworks", es: "Fuegos artificiales" },
            ],
          },
        },
        {
          id: "c8-raya-ucapan",
          cells: {
            perkara: [{ ms: "Ucapan", en: "Greeting", es: "Saludo" }],
            butiran: [
              { ms: "\"Selamat hari raya\"", en: "\"Happy Hari Raya\"", es: "\"Feliz Hari Raya\"" },
              { ms: "\"Salam Aidilfitri\"", en: "\"Aidilfitri greetings\"", es: "\"Saludos de Aidilfitri\"" },
            ],
          },
        },
      ],
    },
    {
      id: "c8-p3-hari-raya-aidiladha",
      kind: "table",
      title: {
        ms: "Hari Raya Aidiladha / Hari Raya Korban",
        en: "Hari Raya Aidiladha / Eid al-Adha",
        es: "Hari Raya Aidiladha / Eid al-Adha",
      },
      columns: [
        { key: "perkara", label: { ms: "Perkara", en: "Item", es: "Tema" } },
        { key: "butiran", label: { ms: "Butiran", en: "Details", es: "Detalles" } },
      ],
      rows: [
        {
          id: "c8-adha-disambut-pada",
          cells: {
            perkara: [{ ms: "Disambut pada", en: "Celebrated on", es: "Se celebra en" }],
            butiran: [{ ms: "10 Zulhijjah", en: "10 Zulhijjah", es: "10 Zulhijjah" }],
          },
        },
        {
          id: "c8-adha-diamalkan-oleh",
          cells: {
            perkara: [{ ms: "Diamalkan oleh", en: "Observed by", es: "Celebrado por" }],
            butiran: [
              { ms: "Kaum: Melayu", en: "Community: Malay", es: "Comunidad: malaya" },
              { ms: "Agama: Islam", en: "Religion: Islam", es: "Religion: islam" },
            ],
          },
        },
        {
          id: "c8-adha-sembahyang",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "sembahyang raya", en: "eid prayer", es: "oracion de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Sembahyang raya", en: "Eid prayer", es: "Oracion de Eid" },
            ],
          },
        },
        {
          id: "c8-adha-sembelih-lembu",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "sembelih lembu", en: "cattle sacrifice", es: "sacrificio de ganado" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Sembelih lembu", en: "Cattle sacrifice", es: "Sacrificio de ganado" },
            ],
          },
        },
        {
          id: "c8-adha-salam",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "salam raya", en: "eid greeting", es: "saludo de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Salam raya", en: "Eid greeting", es: "Saludo de Eid" },
            ],
          },
        },
        {
          id: "c8-adha-hias-rumah",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "hias rumah", en: "decorate house", es: "decorar la casa" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Hias rumah", en: "Decorate house", es: "Decorar la casa" },
            ],
          },
        },
        {
          id: "c8-adha-ziarah",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "ziarah raya", en: "eid visits", es: "visitas de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Ziarah raya", en: "Eid visits", es: "Visitas de Eid" },
            ],
          },
        },
        {
          id: "c8-adha-duit",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "duit raya", en: "eid packet", es: "sobre de eid" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Duit raya", en: "Eid packet", es: "Sobre de Eid" },
            ],
          },
        },
        {
          id: "c8-adha-bunga-api",
          cells: {
            perkara: [{ ms: "Suasana raya", en: "Festive activities", es: "Actividades festivas" }],
            butiran: [
              {
                kind: "image",
                src: "/assets/chapters/ch8/placeholder-hari-raya.svg",
                alt: { ms: "bunga api", en: "fireworks", es: "fuegos artificiales" },
                w: 720,
                h: 420,
                className: "w-full h-auto max-h-64 object-contain rounded-xl",
              },
              { ms: "Bunga api", en: "Fireworks", es: "Fuegos artificiales" },
            ],
          },
        },
        {
          id: "c8-adha-ucapan",
          cells: {
            perkara: [{ ms: "Ucapan", en: "Greeting", es: "Saludo" }],
            butiran: [
              { ms: "\"Selamat hari raya\"", en: "\"Happy Hari Raya\"", es: "\"Feliz Hari Raya\"" },
              { ms: "\"Salam Aidiladha\"", en: "\"Aidiladha greetings\"", es: "\"Saludos de Aidiladha\"" },
            ],
          },
        },
      ],
    },
  ],
};
