export type ShoppingDifficultyId = "easy" | "medium" | "hard";

export type ShoppingThemeId =
  | "buah-sayur"
  | "daging-laut"
  | "barangan-kering"
  | "peti-sejuk";

type Translated = {
  ms: string;
  en: string;
  es: string;
};

export type ShoppingTheme = {
  id: ShoppingThemeId;
  label: Translated;
  sceneSrc: string;
};

export type ShoppingItem = {
  id: string;
  themeId: ShoppingThemeId;
  label: Translated;
  iconSrc: string;
};

export const SHOPPING_THEMES: ShoppingTheme[] = [
  {
    id: "buah-sayur",
    label: {
      ms: "Buah & Sayur",
      en: "Fruits & Vegetables",
      es: "Frutas y Verduras",
    },
    sceneSrc: "/assets/minigames/misi_membeli/fruit_stall.webp",
  },
  {
    id: "daging-laut",
    label: {
      ms: "Daging & Makanan Laut",
      en: "Meat & Seafood",
      es: "Carne y Mariscos",
    },
    sceneSrc: "/assets/minigames/misi_membeli/meat_fish_scene.webp",
  },
  {
    id: "barangan-kering",
    label: {
      ms: "Barangan Kering",
      en: "Dry Goods",
      es: "Productos Secos",
    },
    sceneSrc: "/assets/minigames/misi_membeli/dry_goods.webp",
  },
  {
    id: "peti-sejuk",
    label: {
      ms: "Barangan Peti Sejuk",
      en: "Chilled Items",
      es: "Productos Refrigerados",
    },
    sceneSrc: "/assets/minigames/misi_membeli/fridge.webp",
  },
];

export const SHOPPING_ITEMS: ShoppingItem[] = [
  // Buah & Sayur
  {
    id: "epal",
    themeId: "buah-sayur",
    label: { ms: "Epal", en: "Apple", es: "Manzana" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Apple.webp",
  },
  {
    id: "pisang",
    themeId: "buah-sayur",
    label: { ms: "Pisang", en: "Banana", es: "Platano" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Banana.webp",
  },
  {
    id: "oren",
    themeId: "buah-sayur",
    label: { ms: "Oren", en: "Orange", es: "Naranja" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Orange.webp",
  },
  {
    id: "strawberi",
    themeId: "buah-sayur",
    label: { ms: "Strawberi", en: "Strawberry", es: "Fresa" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Strawberry.webp",
  },
  {
    id: "mangga",
    themeId: "buah-sayur",
    label: { ms: "Mangga", en: "Mango", es: "Mango" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Mango.webp",
  },
  {
    id: "tomato",
    themeId: "buah-sayur",
    label: { ms: "Tomato", en: "Tomato", es: "Tomate" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Tomato.webp",
  },
  {
    id: "timun",
    themeId: "buah-sayur",
    label: { ms: "Timun", en: "Cucumber", es: "Pepino" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Cucumber.webp",
  },
  {
    id: "kentang",
    themeId: "buah-sayur",
    label: { ms: "Kentang", en: "Potato", es: "Patata" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Potato.webp",
  },
  {
    id: "lobak-merah",
    themeId: "buah-sayur",
    label: { ms: "Lobak Merah", en: "Carrot", es: "Zanahoria" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Carrot.webp",
  },
  {
    id: "brokoli",
    themeId: "buah-sayur",
    label: { ms: "Brokoli", en: "Broccoli", es: "Brocoli" },
    iconSrc: "/assets/minigames/misi_membeli/icons/buah_sayur/Buah_Sayur_Brocolli.webp",
  },

  // Daging & Makanan Laut
  {
    id: "ayam",
    themeId: "daging-laut",
    label: { ms: "Ayam", en: "Chicken", es: "Pollo" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Chicken.webp",
  },
  {
    id: "daging-lembu",
    themeId: "daging-laut",
    label: { ms: "Daging Lembu", en: "Beef", es: "Carne de res" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Meat.webp",
  },
  {
    id: "daging-kambing",
    themeId: "daging-laut",
    label: { ms: "Daging Kambing", en: "Mutton", es: "Cordero" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Lamb.webp",
  },
  {
    id: "ikan-kembung",
    themeId: "daging-laut",
    label: { ms: "Ikan Kembung", en: "Mackerel", es: "Caballa" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Fish.webp",
  },
  {
    id: "udang",
    themeId: "daging-laut",
    label: { ms: "Udang", en: "Shrimp", es: "Camaron" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Shrimp.webp",
  },
  {
    id: "sotong",
    themeId: "daging-laut",
    label: { ms: "Sotong", en: "Squid", es: "Calamar" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Squid.webp",
  },
  {
    id: "kerang",
    themeId: "daging-laut",
    label: { ms: "Kerang", en: "Clams", es: "Almejas" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/1_Kerang.webp",
  },
  {
    id: "ketam",
    themeId: "daging-laut",
    label: { ms: "Ketam", en: "Crab", es: "Cangrejo" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/1_Crab.webp",
  },
  {
    id: "sosej-ayam",
    themeId: "daging-laut",
    label: { ms: "Sosej Ayam", en: "Chicken Sausage", es: "Salchicha de pollo" },
    iconSrc: "/assets/minigames/misi_membeli/icons/daging_laut/daging_mknnlaut_Sausage.webp",
  },

  // Barangan Kering
  {
    id: "pasta",
    themeId: "barangan-kering",
    label: { ms: "Pasta", en: "Pasta", es: "Pasta" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Pasta.webp",
  },
  {
    id: "mi-kering",
    themeId: "barangan-kering",
    label: { ms: "Mi Kering", en: "Dry Noodles", es: "Fideos secos" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Noodle Mee.webp",
  },
  {
    id: "beras",
    themeId: "barangan-kering",
    label: { ms: "Beras", en: "Rice", es: "Arroz" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Rice.webp",
  },
  {
    id: "tepung-gandum",
    themeId: "barangan-kering",
    label: { ms: "Tepung Gandum", en: "Flour", es: "Harina" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Flour.webp",
  },
  {
    id: "gula",
    themeId: "barangan-kering",
    label: { ms: "Gula", en: "Sugar", es: "Azucar" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Sugar.webp",
  },
  {
    id: "garam",
    themeId: "barangan-kering",
    label: { ms: "Garam", en: "Salt", es: "Sal" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Salt.webp",
  },
  {
    id: "oat",
    themeId: "barangan-kering",
    label: { ms: "Oat", en: "Oats", es: "Avena" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Oats.webp",
  },
  {
    id: "bijirin",
    themeId: "barangan-kering",
    label: { ms: "Bijirin", en: "Cereal", es: "Cereal" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/1_Cereal.webp",
  },
  {
    id: "kekacang-kering",
    themeId: "barangan-kering",
    label: { ms: "Kekacang Kering", en: "Dried Beans", es: "Legumbres secas" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Nuts.webp",
  },
  {
    id: "minyak-masak",
    themeId: "barangan-kering",
    label: { ms: "Minyak Masak", en: "Cooking Oil", es: "Aceite de cocina" },
    iconSrc: "/assets/minigames/misi_membeli/icons/barangan_kering/3_Oil.webp",
  },

  // Barangan Peti Sejuk
  {
    id: "susu",
    themeId: "peti-sejuk",
    label: { ms: "Susu", en: "Milk", es: "Leche" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Milk.webp",
  },
  {
    id: "telur",
    themeId: "peti-sejuk",
    label: { ms: "Telur", en: "Eggs", es: "Huevos" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Eggs.webp",
  },
  {
    id: "jus-oren",
    themeId: "peti-sejuk",
    label: { ms: "Jus Oren", en: "Orange Juice", es: "Zumo de naranja" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Juice.webp",
  },
  {
    id: "yogurt",
    themeId: "peti-sejuk",
    label: { ms: "Yogurt", en: "Yogurt", es: "Yogur" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Yogurt.webp",
  },
  {
    id: "keju",
    themeId: "peti-sejuk",
    label: { ms: "Keju", en: "Cheese", es: "Queso" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Cheese.webp",
  },
  {
    id: "mentega",
    themeId: "peti-sejuk",
    label: { ms: "Mentega", en: "Butter", es: "Mantequilla" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/1_Butter.webp",
  },
  {
    id: "marjerin",
    themeId: "peti-sejuk",
    label: { ms: "Marjerin", en: "Margarine", es: "Margarina" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/1_Margerine.webp",
  },
  {
    id: "krim-memasak",
    themeId: "peti-sejuk",
    label: { ms: "Krim Memasak", en: "Cooking Cream", es: "Crema para cocinar" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/4_Cream.webp",
  },
  {
    id: "susu-soya",
    themeId: "peti-sejuk",
    label: { ms: "Susu Soya", en: "Soy Milk", es: "Leche de soja" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/1_Soya_Milk.webp",
  },
  {
    id: "tauhu",
    themeId: "peti-sejuk",
    label: { ms: "Tauhu", en: "Tofu", es: "Tofu" },
    iconSrc: "/assets/minigames/misi_membeli/icons/peti_sejuk/1_Tofu.webp",
  },
];

export const SHOPPING_ITEMS_BY_THEME: Record<ShoppingThemeId, ShoppingItem[]> = {
  "buah-sayur": SHOPPING_ITEMS.filter((item) => item.themeId === "buah-sayur"),
  "daging-laut": SHOPPING_ITEMS.filter((item) => item.themeId === "daging-laut"),
  "barangan-kering": SHOPPING_ITEMS.filter((item) => item.themeId === "barangan-kering"),
  "peti-sejuk": SHOPPING_ITEMS.filter((item) => item.themeId === "peti-sejuk"),
};

export const SHOPPING_DIFFICULTIES: Record<
  ShoppingDifficultyId,
  {
    label: Translated;
    themeCount: number;
    targetCount: number;
    visibleCount: number;
  }
> = {
  easy: {
    label: { ms: "Mudah", en: "Easy", es: "Facil" },
    themeCount: 1,
    targetCount: 5,
    visibleCount: 8,
  },
  medium: {
    label: { ms: "Sederhana", en: "Medium", es: "Media" },
    themeCount: 2,
    targetCount: 7,
    visibleCount: 11,
  },
  hard: {
    label: { ms: "Sukar", en: "Hard", es: "Dificil" },
    themeCount: 4,
    targetCount: 10,
    visibleCount: 14,
  },
};
