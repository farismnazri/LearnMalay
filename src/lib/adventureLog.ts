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
