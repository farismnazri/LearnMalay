// src/lib/chapters/types.ts

export type UiLang = "ms" | "en" | "es";

export type Translated = {
  ms: string;
  en: string;
  es: string;
};

export type DragOption = Translated & { id: string };

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
      items: Array<{
        id: string;
        correct: boolean;
        text: Translated;
        why: Translated;
      }>;
    };

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

// Generic table page (what you already switched to)
export type ChapterTablePage = {
  id: string;
  kind: "table";
  title: Translated;
  columns: Array<{ key: string; label: Translated }>;
  rows: Array<{
    id: string;
    cells: Record<string, Translated[]>;
  }>;
};

// NEW: chat page
export type ChapterChatPage = {
  id: string;
  kind: "chat";
  title: Translated;
  context?: Translated; // e.g., "Latar tempat..."
  participants: Array<{
    id: string; // e.g., "azman", "ayub"
    name: Translated;
    avatarSrc?: string; // e.g., "/assets/characters/bandicoot.png"
  }>;
  messages: Array<{
    id: string;
    from: string; // participant id
    text: Translated;
  }>;
};

export type ChapterIntroPage = {
  id: string;
  kind: "intro";
  sections: ChapterSection[];
};

// export type ChapterPage = ChapterIntroPage | ChapterTablePage | ChapterChatPage;

export type ChapterContent = {
  id: number;
  title: Translated;
  pages: ChapterPage[];
};

