export type WordCategory = "colors" | "food" | "places" | "verbs" | "greetings";

export type WordItem = {
  id: string;
  category: WordCategory;
  bm: string;
  en: string;
  es: string;
};

export const WORD_ITEMS: WordItem[] = [
  // Colors (10)
  { id: "col-1", category: "colors", bm: "merah", en: "red", es: "rojo" },
  { id: "col-2", category: "colors", bm: "biru", en: "blue", es: "azul" },
  { id: "col-3", category: "colors", bm: "hijau", en: "green", es: "verde" },
  { id: "col-4", category: "colors", bm: "kuning", en: "yellow", es: "amarillo" },
  { id: "col-5", category: "colors", bm: "hitam", en: "black", es: "negro" },
  { id: "col-6", category: "colors", bm: "putih", en: "white", es: "blanco" },
  { id: "col-7", category: "colors", bm: "coklat", en: "brown", es: "marrón" },
  { id: "col-8", category: "colors", bm: "oren", en: "orange", es: "naranja" },
  { id: "col-9", category: "colors", bm: "ungu", en: "purple", es: "morado" },
  { id: "col-10", category: "colors", bm: "kelabu", en: "grey", es: "gris" },

  // Food & drink (10)
  { id: "foo-1", category: "food", bm: "nasi", en: "rice", es: "arroz" },
  { id: "foo-2", category: "food", bm: "ayam", en: "chicken", es: "pollo" },
  { id: "foo-3", category: "food", bm: "ikan", en: "fish", es: "pescado" },
  { id: "foo-4", category: "food", bm: "roti", en: "bread", es: "pan" },
  { id: "foo-5", category: "food", bm: "sayur", en: "vegetables", es: "verduras" },
  { id: "foo-6", category: "food", bm: "buah", en: "fruit", es: "fruta" },
  { id: "foo-7", category: "food", bm: "air", en: "water", es: "agua" },
  { id: "foo-8", category: "food", bm: "kopi", en: "coffee", es: "café" },
  { id: "foo-9", category: "food", bm: "teh", en: "tea", es: "té" },
  { id: "foo-10", category: "food", bm: "gula", en: "sugar", es: "azúcar" },

  // Places (10)
  { id: "pla-1", category: "places", bm: "rumah", en: "house", es: "casa" },
  { id: "pla-2", category: "places", bm: "sekolah", en: "school", es: "escuela" },
  { id: "pla-3", category: "places", bm: "hospital", en: "hospital", es: "hospital" },
  { id: "pla-4", category: "places", bm: "klinik", en: "clinic", es: "clínica" },
  { id: "pla-5", category: "places", bm: "bank", en: "bank", es: "banco" },
  { id: "pla-6", category: "places", bm: "pejabat", en: "office", es: "oficina" },
  { id: "pla-7", category: "places", bm: "kedai", en: "shop", es: "tienda" },
  { id: "pla-8", category: "places", bm: "pasar", en: "market", es: "mercado" },
  { id: "pla-9", category: "places", bm: "stesen", en: "station", es: "estación" },
  { id: "pla-10", category: "places", bm: "tandas", en: "toilet", es: "baño" },

  // Verbs (10)
  { id: "ver-1", category: "verbs", bm: "makan", en: "eat", es: "comer" },
  { id: "ver-2", category: "verbs", bm: "minum", en: "drink", es: "beber" },
  { id: "ver-3", category: "verbs", bm: "pergi", en: "go", es: "ir" },
  { id: "ver-4", category: "verbs", bm: "datang", en: "come", es: "venir" },
  { id: "ver-5", category: "verbs", bm: "mahu", en: "want", es: "querer" },
  { id: "ver-6", category: "verbs", bm: "suka", en: "like", es: "gustar" },
  { id: "ver-7", category: "verbs", bm: "boleh", en: "can", es: "poder" },
  { id: "ver-8", category: "verbs", bm: "ada", en: "have / there is", es: "haber / tener" },
  { id: "ver-9", category: "verbs", bm: "bagi", en: "give", es: "dar" },
  { id: "ver-10", category: "verbs", bm: "buat", en: "do / make", es: "hacer" },

  // Greetings (10)
  { id: "gre-1", category: "greetings", bm: "hai", en: "hi", es: "hola" },
  { id: "gre-2", category: "greetings", bm: "selamat pagi", en: "good morning", es: "buenos días" },
  { id: "gre-3", category: "greetings", bm: "selamat petang", en: "good afternoon", es: "buenas tardes" },
  { id: "gre-4", category: "greetings", bm: "selamat malam", en: "good night", es: "buenas noches" },
  { id: "gre-5", category: "greetings", bm: "terima kasih", en: "thank you", es: "gracias" },
  { id: "gre-6", category: "greetings", bm: "sama-sama", en: "you're welcome", es: "de nada" },
  { id: "gre-7", category: "greetings", bm: "maaf", en: "sorry", es: "perdón" },
  { id: "gre-8", category: "greetings", bm: "tolong", en: "please / help", es: "por favor / ayuda" },
  { id: "gre-9", category: "greetings", bm: "jumpa lagi", en: "see you", es: "nos vemos" },
  { id: "gre-10", category: "greetings", bm: "apa khabar", en: "how are you", es: "¿cómo estás?" },
];

export const CATEGORY_LABELS: Record<WordCategory, { ms: string; en: string; es: string }> = {
  colors: { ms: "Warna", en: "Colors", es: "Colores" },
  food: { ms: "Makanan", en: "Food & Drink", es: "Comida y bebida" },
  places: { ms: "Tempat", en: "Places", es: "Lugares" },
  verbs: { ms: "Kata Kerja", en: "Verbs", es: "Verbos" },
  greetings: { ms: "Sapaan", en: "Greetings", es: "Saludos" },
};
