import type {
  ArahJalanCommandId,
  ArahJalanGraph,
  LocalizedText,
} from "./engine";

export const ARAH_JALAN_COMMAND_LABELS: Record<ArahJalanCommandId, LocalizedText> = {
  "turn-left": {
    ms: "Belok kiri",
    en: "Turn left",
    es: "Gira a la izquierda",
  },
  "move-forward": {
    ms: "Jalan terus",
    en: "Go straight",
    es: "Sigue recto",
  },
  "turn-right": {
    ms: "Belok kanan",
    en: "Turn right",
    es: "Gira a la derecha",
  },
  "turn-back": {
    ms: "Pusing balik",
    en: "Turn back",
    es: "Date la vuelta",
  },
  arrive: {
    ms: "Sampai",
    en: "Arrived",
    es: "Llegué",
  },
};

export const ARAH_JALAN_COMMAND_ORDER: ArahJalanCommandId[] = [
  "turn-left",
  "move-forward",
  "turn-right",
  "turn-back",
  "arrive",
];

export const ARAH_JALAN_PLAY_HELPER: LocalizedText = {
  ms: "Bina arahan dalam Bahasa Melayu, kemudian tekan Run untuk jalankan laluan.",
  en: "Build Malay commands, then press Run to execute the route.",
  es: "Crea comandos en malayo y luego pulsa Run para ejecutar la ruta.",
};

export const ARAH_JALAN_MISSION_PREFIX: LocalizedText = {
  ms: "Pergi ke",
  en: "Go to",
  es: "Ve a",
};

export const ARAH_JALAN_EASY_MAP: ArahJalanGraph = {
  nodes: {
    hospital: {
      id: "hospital",
      label: { ms: "hospital", en: "hospital", es: "hospital" },
      x: 15,
      y: 16,
      isLandmark: true,
    },
    sekolah: {
      id: "sekolah",
      label: { ms: "sekolah", en: "school", es: "escuela" },
      x: 50,
      y: 16,
      isLandmark: true,
    },
    "balai-polis": {
      id: "balai-polis",
      label: { ms: "balai polis", en: "police station", es: "comisaría" },
      x: 85,
      y: 16,
      isLandmark: true,
    },
    klinik: {
      id: "klinik",
      label: { ms: "klinik", en: "clinic", es: "clínica" },
      x: 15,
      y: 44,
      isLandmark: true,
    },
    pasar: {
      id: "pasar",
      label: { ms: "pasar", en: "market", es: "mercado" },
      x: 50,
      y: 44,
      isLandmark: true,
    },
    kedai: {
      id: "kedai",
      label: { ms: "kedai", en: "shop", es: "tienda" },
      x: 85,
      y: 44,
      isLandmark: true,
    },
    "simpang-selatan-barat": {
      id: "simpang-selatan-barat",
      label: {
        ms: "simpang selatan barat",
        en: "southwest junction",
        es: "cruce suroeste",
      },
      x: 15,
      y: 74,
      isLandmark: false,
    },
    "stesen-bas": {
      id: "stesen-bas",
      label: { ms: "stesen bas", en: "bus station", es: "estación de autobuses" },
      x: 50,
      y: 74,
      isLandmark: true,
    },
    "simpang-selatan-timur": {
      id: "simpang-selatan-timur",
      label: {
        ms: "simpang selatan timur",
        en: "southeast junction",
        es: "cruce sureste",
      },
      x: 85,
      y: 74,
      isLandmark: false,
    },
  },
  connections: {
    hospital: { east: "sekolah", south: "klinik" },
    sekolah: { west: "hospital", east: "balai-polis", south: "pasar" },
    "balai-polis": { west: "sekolah", south: "kedai" },
    klinik: { north: "hospital", east: "pasar", south: "simpang-selatan-barat" },
    pasar: { north: "sekolah", west: "klinik", east: "kedai", south: "stesen-bas" },
    kedai: { north: "balai-polis", west: "pasar", south: "simpang-selatan-timur" },
    "simpang-selatan-barat": { north: "klinik", east: "stesen-bas" },
    "stesen-bas": {
      north: "pasar",
      west: "simpang-selatan-barat",
      east: "simpang-selatan-timur",
    },
    "simpang-selatan-timur": { north: "kedai", west: "stesen-bas" },
  },
  startNodeIds: [
    "hospital",
    "sekolah",
    "balai-polis",
    "klinik",
    "pasar",
    "kedai",
    "simpang-selatan-barat",
    "stesen-bas",
    "simpang-selatan-timur",
  ],
  destinationNodeIds: [
    "hospital",
    "klinik",
    "balai-polis",
    "sekolah",
    "kedai",
    "pasar",
    "stesen-bas",
  ],
};
