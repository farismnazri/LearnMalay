// src/lib/chapters/types.ts

export type UiLang = "ms" | "en" | "es";

export type TableImageCell = {
  kind: "image";
  src: string;
  alt: Translated;

  // optional sizing overrides (table-only)
  w?: number;        // passed to <Image width=...>
  h?: number;        // passed to <Image height=...>
  className?: string; // controls rendered size (Tailwind), e.g. "h-12 w-auto"
};

export type TableCellItem = Translated | TableImageCell;



export type Translated = {
  ms: string;
  en: string;
  es: string;
};

// Backwards/alt name (so you can use TrText or Translated interchangeably)
export type TrText = Translated;

// -------------------------
// Shared helpers
// -------------------------
export type DragOption = Translated & { id: string };

// -------------------------
// Intro section types
// -------------------------
export type ChapterSection =
  | {
      kind: "pairs";
      id: string;
      title: Translated;
      pairs: Array<{
        id: string;
        q: { id: string } & Translated;
        a: { id: string } & Translated;
      }>;
    }
  | {
      kind: "list";
      id: string;
      title: Translated;
      items: Array<{ id: string } & Translated>;
    };

export type ChapterIntroPage = {
  id: string;
  kind: "intro";
  sections: ChapterSection[];
};

// -------------------------
// Table page types
// -------------------------
export type ChapterTablePage = {
  id: string;
  kind: "table";
  title: Translated;
  columns: Array<{ key: string; label: Translated }>;
  rows: Array<{
    id: string;
    cells: Record<string, TableCellItem[]>;
  }>;
};


// -------------------------
// Chat page types
// -------------------------
export type ChapterChatPage = {
  id: string;
  kind: "chat";
  title: Translated;
  context?: Translated;
  participants: Array<{
    id: string; // "azman", "ayub", etc.
    name: Translated;
    avatarSrc?: string;
  }>;
  messages: Array<{
    id: string;
    from: string;
    text: Translated;
  }>;
};

// -------------------------
// DragFill types
// -------------------------
export type TextOrBlank =
  | { kind: "text"; text: Translated }
  | { kind: "blank"; before: Translated; after: Translated; correctOptionId: string };

export type DragQnaItem = {
  id: string;
  n: number;
  q: TextOrBlank;
  a: TextOrBlank;
};

export type DragFillPage = {
  id: string;
  kind: "dragfill";
  title: Translated;
  instructions: Translated;
  options: DragOption[];
  items: DragQnaItem[];
};

// -------------------------
// TypeIn (unscramble/type) types
// -------------------------
export type TypeInItem = {
  id: string;
  n: number;
  scrambled: string; // what user sees (e.g., "bnaag")
  answer: string; // correct Malay word (e.g., "abang")
  meaning?: Translated; // optional translation/explanation shown after checking
};

export type TypeInPage = {
  id: string;
  kind: "typein";
  title: Translated;
  instructions: Translated;
  items: TypeInItem[];
  caseSensitive?: boolean; // default false
};

// -------------------------
// Tick page types
// -------------------------
export type TickPage = {
  id: string;
  kind: "tick";
  title: Translated;
  instructions: Translated;
  items: Array<{
    id: string;
    correct: boolean;
    text: Translated;
    why: Translated;
  }>;
};

// -------------------------
// BoxDrag page types
// -------------------------
export type BoxDragLine = {
  x1: number; // percent 0..100
  y1: number; // percent 0..100
  x2: number; // percent 0..100
  y2: number; // percent 0..100
  arrow?: boolean;
};

export type BoxDragNode = {
  id: string;
  shape: "rect" | "oval";

  // Old preset positioning (basic tree can keep using this)
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight";

  // New explicit positioning (advanced tree should use this)
  xPct?: number; // percent 0..100
  yPct?: number; // percent 0..100

  fixedText?: Translated; // if present, not droppable
  correctOptionId?: string; // required if droppable
};

export type BoxDragPage = {
  id: string;
  kind: "boxdrag";
  title: Translated;
  instructions: Translated;
  options: DragOption[];
  nodes: BoxDragNode[];

  compact?: boolean;
  lines?: BoxDragLine[];
};

// -------------------------
// WordSearch page types
// -------------------------

/**
 * BACKWARDS COMPAT:
 * - If you used { word: "..." } it works.
 * - If you used { words: ["..",".."] } it also works.
 * - Optional label is allowed (so your UI can show a nicer display name)
 */
export type WordSearchTarget =
  | {
      id: string;
      word: string;
      label?: Translated;
      meaning?: Translated;
    }
  | {
      id: string;
      words: string[];
      label?: Translated;
      meaning?: Translated;
    };

export type WordSearchPage = {
  id: string;
  kind: "wordsearch";
  title: Translated;
  instructions: Translated;

  // Most common: string[] rows, e.g. ["LGIMTH...", "..."]
  // Also allowed: string[][] if you ever want to store per-cell arrays
  grid: string[] | string[][];

  targets: WordSearchTarget[];

  allowDiagonal?: boolean;
  allowReverse?: boolean;
};
export type FigurePage = {
  id: string;
  kind: "figure";
  title: Translated;
  imageSrc: string;     // e.g. "/assets/chapters/ch4/kompas.png"
  alt: Translated;
  caption?: Translated;
  maxWidthPx?: number;  // optional, for nicer layout
};

// -------------------------
// The ONE ChapterPage union
// -------------------------
export type ChapterPage =
  | { id: string; kind: "intro"; sections: ChapterSection[] }
  | { id: string; kind: "table"; title: Translated; columns: any[]; rows: any[] }
  | { id: string; kind: "chat"; title: Translated; context?: Translated; participants: any[]; messages: any[] }
  | { id: string; kind: "dragfill"; title: Translated; instructions: Translated; options: any[]; items: any[] }
  | {
      id: string;
      kind: "tick";
      title: Translated;
      instructions: Translated;
      items: Array<{ id: string; correct: boolean; text: Translated; why: Translated }>;
    }
  | {
      id: string;
      kind: "typein";
      title: Translated;
      instructions: Translated;
      caseSensitive?: boolean;
      items: Array<{
        id: string;
        n: number;
        scrambled: string;
        answer: string;
        meaning?: Translated;
      }>;
    }
  | BoxDragPage
  | WordSearchPage
  | FigurePage;


// -------------------------
// Chapter content
// -------------------------
export type ChapterContent = {
  id: number;
  title: Translated;
  pages: ChapterPage[];
};



