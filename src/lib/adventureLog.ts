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
