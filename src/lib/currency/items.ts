// Malaysian Currency Denominations
export type CurrencyType = "note" | "coin";

export type CurrencyItem = {
  id: string;
  value: number; // in sen (100 sen = 1 ringgit)
  type: CurrencyType;
  imagePath: string;
  label: {
    ms: string;
    en: string;
    es: string;
  };
};

export const CURRENCY_ITEMS: CurrencyItem[] = [
  // Notes
  {
    id: "note-100",
    value: 10000, // RM100.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_100_Ringgit.webp",
    label: {
      ms: "RM100",
      en: "RM100",
      es: "RM100",
    },
  },
  {
    id: "note-50",
    value: 5000, // RM50.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Ringgit.webp",
    label: {
      ms: "RM50",
      en: "RM50",
      es: "RM50",
    },
  },
  {
    id: "note-20",
    value: 2000, // RM20.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Ringgit.webp",
    label: {
      ms: "RM20",
      en: "RM20",
      es: "RM20",
    },
  },
  {
    id: "note-10",
    value: 1000, // RM10.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_ringgit.webp",
    label: {
      ms: "RM10",
      en: "RM10",
      es: "RM10",
    },
  },
  {
    id: "note-5",
    value: 500, // RM5.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Ringgit.webp",
    label: {
      ms: "RM5",
      en: "RM5",
      es: "RM5",
    },
  },
  {
    id: "note-1",
    value: 100, // RM1.00
    type: "note",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_1_Ringgit.webp",
    label: {
      ms: "RM1",
      en: "RM1",
      es: "RM1",
    },
  },
  // Coins
  {
    id: "coin-50",
    value: 50, // 50 sen
    type: "coin",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_50_Sen.webp",
    label: {
      ms: "50 sen",
      en: "50 sen",
      es: "50 sen",
    },
  },
  {
    id: "coin-20",
    value: 20, // 20 sen
    type: "coin",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_20_Sen.webp",
    label: {
      ms: "20 sen",
      en: "20 sen",
      es: "20 sen",
    },
  },
  {
    id: "coin-10",
    value: 10, // 10 sen
    type: "coin",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_10_Sen.webp",
    label: {
      ms: "10 sen",
      en: "10 sen",
      es: "10 sen",
    },
  },
  {
    id: "coin-5",
    value: 5, // 5 sen
    type: "coin",
    imagePath: "/assets/chapters/ch5/Malaysian_Money_Front_Only_5_Sen.webp",
    label: {
      ms: "5 sen",
      en: "5 sen",
      es: "5 sen",
    },
  },
];

// Helper function to format currency
export function formatRM(sen: number): string {
  const ringgit = Math.floor(sen / 100);
  const cents = sen % 100;
  if (cents === 0) return `RM${ringgit}.00`;
  return `RM${ringgit}.${String(cents).padStart(2, "0")}`;
}

// Helper to parse RM string to sen
export function parseRM(str: string): number {
  const cleaned = str.replace(/[RM\s]/g, "");
  const parts = cleaned.split(".");
  const ringgit = parseInt(parts[0] || "0", 10);
  const cents = parseInt(parts[1] || "0", 10);
  return ringgit * 100 + cents;
}

// Difficulty configurations
export type DifficultyKey = "easy" | "medium" | "hard" | "ultra";

export type DifficultyConfig = {
  label: {
    ms: string;
    en: string;
    es: string;
  };
  availableDenominations: string[]; // currency item IDs
  priceRange: { min: number; max: number }; // in sen
  roundTo: number; // round prices to nearest X sen (5, 10, 50, 100)
  requiresChange: boolean;
};

export const DIFFICULTIES: Record<DifficultyKey, DifficultyConfig> = {
  easy: {
    label: {
      ms: "Mudah",
      en: "Easy",
      es: "Fácil",
    },
    availableDenominations: [
      "note-100",
      "note-50",
      "note-20",
      "note-10",
      "note-5",
      "note-1",
      "coin-50",
      "coin-20",
      "coin-10",
      "coin-5",
    ],
    priceRange: { min: 100, max: 2000 }, // RM1 - RM20
    roundTo: 50, // Round to nearest 50 sen
    requiresChange: false,
  },
  medium: {
    label: {
      ms: "Sederhana",
      en: "Medium",
      es: "Media",
    },
    availableDenominations: [
      "note-50",
      "note-20",
      "note-10",
      "note-5",
      "note-1",
      "coin-50",
      "coin-20",
      "coin-10",
      "coin-5",
    ],
    priceRange: { min: 150, max: 5000 }, // RM1.50 - RM50
    roundTo: 5, // Round to nearest 5 sen
    requiresChange: true,
  },
  hard: {
    label: {
      ms: "Sukar",
      en: "Hard",
      es: "Difícil",
    },
    availableDenominations: [
      "note-20",
      "note-10",
      "note-5",
      "coin-50",
      "coin-10",
    ],
    priceRange: { min: 355, max: 7500 }, // RM3.55 - RM75
    roundTo: 5, // Round to nearest 5 sen
    requiresChange: true,
  },
  ultra: {
    label: {
      ms: "Ultra",
      en: "Ultra",
      es: "Ultra",
    },
    availableDenominations: [
      "note-100",
      "note-50",
      "note-20",
      "note-10",
      "note-5",
      "note-1",
      "coin-50",
      "coin-20",
      "coin-10",
      "coin-5",
    ],
    priceRange: { min: 250, max: 9500 }, // RM2.50 - RM95.00
    roundTo: 5,
    requiresChange: true,
  },
};

// Sample items for purchase scenarios
export type ShopItem = {
  id: string;
  name: {
    ms: string;
    en: string;
    es: string;
  };
  priceRange: { min: number; max: number }; // in sen
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "nasi-lemak",
    name: {
      ms: "Nasi Lemak",
      en: "Nasi Lemak",
      es: "Nasi Lemak",
    },
    priceRange: { min: 250, max: 800 },
  },
  {
    id: "roti-canai",
    name: {
      ms: "Roti Canai",
      en: "Roti Canai",
      es: "Roti Canai",
    },
    priceRange: { min: 150, max: 400 },
  },
  {
    id: "teh-tarik",
    name: {
      ms: "Teh Tarik",
      en: "Teh Tarik (Milk Tea)",
      es: "Teh Tarik (Té con leche)",
    },
    priceRange: { min: 200, max: 350 },
  },
  {
    id: "milo-ais",
    name: {
      ms: "Milo Ais",
      en: "Iced Milo",
      es: "Milo Helado",
    },
    priceRange: { min: 250, max: 450 },
  },
  {
    id: "kopi",
    name: {
      ms: "Kopi",
      en: "Coffee",
      es: "Café",
    },
    priceRange: { min: 180, max: 320 },
  },
  {
    id: "mee-goreng",
    name: {
      ms: "Mee Goreng",
      en: "Fried Noodles",
      es: "Fideos Fritos",
    },
    priceRange: { min: 500, max: 1200 },
  },
  {
    id: "nasi-ayam",
    name: {
      ms: "Nasi Ayam",
      en: "Chicken Rice",
      es: "Arroz con Pollo",
    },
    priceRange: { min: 600, max: 1500 },
  },
  {
    id: "curry-puff",
    name: {
      ms: "Karipap",
      en: "Curry Puff",
      es: "Empanada de Curry",
    },
    priceRange: { min: 150, max: 300 },
  },
];
