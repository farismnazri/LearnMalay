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
          ms: "Memperkenalkan Semantic Versioning untuk Learn Malay (`MAJOR.MINOR.PATCH`).",
          en: "Introduced Semantic Versioning for Learn Malay (`MAJOR.MINOR.PATCH`).",
          es: "Se introdujo Semantic Versioning para Learn Malay (`MAJOR.MINOR.PATCH`).",
        },
        {
          ms: "Menambah halaman Adventure Log awam di `/updates`.",
          en: "Added public Adventure Log page at `/updates`.",
          es: "Se agrego la pagina publica de Adventure Log en `/updates`.",
        },
        {
          ms: "Menambah label versi dalam aplikasi yang memaut ke Adventure Log.",
          en: "Added visible in-app version label linked to Adventure Log.",
          es: "Se agrego una etiqueta visible de version en la app enlazada a Adventure Log.",
        },
        {
          ms: "Menambah model data nota keluaran dengan medan teks berbilang bahasa (`ms`, `en`, `es`).",
          en: "Added structured release-note data model with multilingual-ready text fields (`ms`, `en`, `es`).",
          es: "Se agrego un modelo de datos de notas de version con campos multilingues (`ms`, `en`, `es`).",
        },
      ],
      changed: [
        {
          ms: "Mewujudkan aliran keluaran yang mengikat versi aplikasi, changelog, dan tag Git.",
          en: "Established release workflow tying app version, changelog, and Git tags.",
          es: "Se establecio un flujo de lanzamiento que conecta la version de la app, el changelog y las etiquetas de Git.",
        },
      ],
      fixed: [],
    },
  },
];

export const LATEST_ADVENTURE_LOG = ADVENTURE_LOG[0] ?? null;
