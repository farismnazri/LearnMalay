export type UsernameSafetyReason = "blocked-substring" | "blocked-token";

export type UsernameSafetyResult =
  | { ok: true }
  | { ok: false; reason: UsernameSafetyReason };

export const USERNAME_SAFETY_REJECTION_MESSAGE = {
  ms: "Sila pilih nama lain. Nama ini tidak dibenarkan.",
  en: "Please choose another name. This name is not allowed.",
  es: "Por favor elige otro nombre. Este nombre no está permitido.",
};

const STRICT_SUBSTRING_TERMS = [
  "fuck",
  "fuk",
  "fck",
  "shit",
  "boob",
  "boobs",
  "boobies",
  "porn",
  "porno",
  "nude",
  "nudes",
  "penis",
  "vagina",
  "dildo",
  "hentai",
  "pussy",
  "asshole",
  "bitch",
  "bastard",
  "babi",
  "bodoh",
  "bangang",
  "sial",
  "celaka",
  "pukimak",
  "puki",
  "kimak",
  "cibai",
  "cibay",
  "cheebai",
  "lancau",
  "lancap",
  "tetek",
  "butoh",
  "butuh",
  "pantek",
  "pundek",
  "bogel",
  "lucah",
  "mierda",
  "joder",
  "gilipollas",
  "cojones",
  "pendejo",
  "pendeja",
  "tetas",
];

const TOKEN_TERMS = [
  "sex",
  "sexy",
  "anal",
  "cum",
  "slut",
  "whore",
  "dick",
  "cock",
  "cunt",
  "retard",
  "idiot",
  "stupid",
  "tolol",
  "puta",
  "puto",
  "culo",
  "pene",
  "cabron",
  "maricon",
  "verga",
];

type UsernameSafetyForms = {
  spaced: string[];
  squashed: string[];
  tokens: string[];
};

const SAFE_EXACT_SPACED_PHRASES = ["babi hutan", "babi hutan fan"];

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC");
}

function applyLeetMap(value: string, oneOrBang: "i" | "l"): string {
  return value.replace(/[0134578!@$]/g, (char) => {
    switch (char) {
      case "0":
        return "o";
      case "1":
      case "!":
        return oneOrBang;
      case "3":
        return "e";
      case "4":
      case "@":
        return "a";
      case "5":
      case "$":
        return "s";
      case "7":
        return "t";
      case "8":
        return "b";
      default:
        return char;
    }
  });
}

function collapseRepeats(value: string, maxRunLength: 1 | 2): string {
  const replacement = "$1".repeat(maxRunLength);
  return value.replace(/([a-z0-9])\1{1,}/g, replacement);
}

function alphaCore(token: string): string {
  return token.replace(/^[0-9]+|[0-9]+$/g, "");
}

function normalizeUsernameForms(username: string): UsernameSafetyForms {
  const base = stripDiacritics(username.trim().normalize("NFKC").toLowerCase());
  const mappedValues = new Set([base, applyLeetMap(base, "i"), applyLeetMap(base, "l")]);
  const spaced = new Set<string>();
  const squashed = new Set<string>();
  const tokens = new Set<string>();

  for (const mapped of mappedValues) {
    const spaceNormalized = mapped.replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
    const compact = spaceNormalized.replace(/\s+/g, "");

    for (const value of [spaceNormalized, collapseRepeats(spaceNormalized, 2), collapseRepeats(spaceNormalized, 1)]) {
      if (!value) continue;
      spaced.add(value);
      for (const token of value.split(" ")) {
        if (token) tokens.add(token);
      }
    }

    for (const value of [compact, collapseRepeats(compact, 2), collapseRepeats(compact, 1)]) {
      if (!value) continue;
      squashed.add(value);
      tokens.add(value);
    }
  }

  return {
    spaced: [...spaced],
    squashed: [...squashed],
    tokens: [...tokens],
  };
}

function hasStrictSubstringMatch(forms: UsernameSafetyForms): boolean {
  return [...forms.spaced, ...forms.squashed].some((value) =>
    STRICT_SUBSTRING_TERMS.some((term) => value.includes(term))
  );
}

function hasSafeExactPhraseMatch(forms: UsernameSafetyForms): boolean {
  return forms.spaced.some((value) => SAFE_EXACT_SPACED_PHRASES.includes(value));
}

function hasTokenMatch(forms: UsernameSafetyForms): boolean {
  return forms.tokens.some((token) => {
    const core = alphaCore(token);
    return TOKEN_TERMS.some((term) => token === term || core === term);
  });
}

export function validateUsernameSafety(username: string): UsernameSafetyResult {
  const forms = normalizeUsernameForms(username);

  if (hasSafeExactPhraseMatch(forms)) {
    return { ok: true };
  }

  if (hasStrictSubstringMatch(forms)) {
    return { ok: false, reason: "blocked-substring" };
  }

  if (hasTokenMatch(forms)) {
    return { ok: false, reason: "blocked-token" };
  }

  return { ok: true };
}
