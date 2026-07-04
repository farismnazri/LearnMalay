import type { LocalizedText } from "./engine";

export const ARAH_JALAN_LOCATION_IDS = [
  "hospital",
  "kedai",
  "klinik",
  "masjid",
  "pasar",
  "sekolah",
  "stesenBas",
  "taman",
  "balaiPolis",
] as const;

export type ArahJalanLocationId = (typeof ARAH_JALAN_LOCATION_IDS)[number];

export type ArahJalanLocation = {
  id: ArahJalanLocationId;
  label: LocalizedText;
  imageSrc: `/assets/minigames/arah-jalan/${string}.webp`;
};

export const ARAH_JALAN_LOCATION_CATALOG: Record<ArahJalanLocationId, ArahJalanLocation> = {
  hospital: {
    id: "hospital",
    label: { ms: "hospital", en: "hospital", es: "hospital" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_hospital.webp",
  },
  kedai: {
    id: "kedai",
    label: { ms: "kedai", en: "shop", es: "tienda" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_kedai.webp",
  },
  klinik: {
    id: "klinik",
    label: { ms: "klinik", en: "clinic", es: "clínica" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_klinik.webp",
  },
  masjid: {
    id: "masjid",
    label: { ms: "masjid", en: "mosque", es: "mezquita" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_masjid.webp",
  },
  pasar: {
    id: "pasar",
    label: { ms: "pasar", en: "market", es: "mercado" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_pasar.webp",
  },
  sekolah: {
    id: "sekolah",
    label: { ms: "sekolah", en: "school", es: "escuela" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_sekolah.webp",
  },
  stesenBas: {
    id: "stesenBas",
    label: { ms: "stesen bas", en: "bus station", es: "estación de autobuses" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_stesenBas.webp",
  },
  taman: {
    id: "taman",
    label: { ms: "taman", en: "park", es: "parque" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_taman.webp",
  },
  balaiPolis: {
    id: "balaiPolis",
    label: { ms: "balai polis", en: "police station", es: "comisaría" },
    imageSrc: "/assets/minigames/arah-jalan/arahJalan_balaiPolis.webp",
  },
};
