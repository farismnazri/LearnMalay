import type { ChapterContent } from "./types";

export const chapter08: ChapterContent = {
  id: 8,
  revision: 1,
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
              ms: "Hari Raya Aidilfitri / Hari Raya Aidiladha",
              en: "Hari Raya Aidilfitri / Hari Raya Aidiladha",
              es: "Hari Raya Aidilfitri / Hari Raya Aidiladha",
              cardLabel: {
                ms: "Melayu",
                en: "Malay",
                es: "Malaya",
              },
              imageSrc: "/assets/chapters/ch8/chapter8_hari_raya_aidilfitri_bg.webp",
              imageAlt: {
                ms: "Sambutan Hari Raya Aidilfitri",
                en: "Hari Raya Aidilfitri celebration",
                es: "Celebracion de Hari Raya Aidilfitri",
              },
            },
            {
              id: "c8-kaum-cina",
              ms: "Tahun Baru Cina",
              en: "Chinese New Year",
              es: "Año Nuevo Chino",
              cardLabel: {
                ms: "Cina",
                en: "Chinese",
                es: "China",
              },
              imageSrc: "/assets/chapters/ch8/chapter8_tahun_baru_cina_bg.webp",
              imageAlt: {
                ms: "Sambutan Tahun Baru Cina",
                en: "Chinese New Year celebration",
                es: "Celebracion del Año Nuevo Chino",
              },
            },
            {
              id: "c8-kaum-india",
              ms: "Deepavali",
              en: "Deepavali",
              es: "Deepavali",
              cardLabel: {
                ms: "India",
                en: "Indian",
                es: "India",
              },
              imageSrc: "/assets/chapters/ch8/chapter8_deepavali_bg.webp",
              imageAlt: {
                ms: "Sambutan Deepavali",
                en: "Deepavali celebration",
                es: "Celebracion de Deepavali",
              },
            },
          ],
        },
      ],
    },
  ],
};
