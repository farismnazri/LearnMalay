import { chapter07 } from "@/lib/chapters";
import type { ChapterTablePage, TableCellItem, TableImageCell, Translated } from "@/lib/chapters/types";

export type MakanApaItem = {
  id: string;
  imageSrc: string;
  name: Translated;
};

function isImageCell(item: TableCellItem): item is TableImageCell {
  return typeof item === "object" && item !== null && "kind" in item && (item as TableImageCell).kind === "image";
}

function isTranslated(item: TableCellItem): item is Translated {
  return (
    typeof item === "object" &&
    item !== null &&
    "ms" in item &&
    "en" in item &&
    "es" in item &&
    typeof (item as Translated).ms === "string" &&
    typeof (item as Translated).en === "string" &&
    typeof (item as Translated).es === "string"
  );
}

function collectChapter7FoodItems(): MakanApaItem[] {
  const seen = new Set<string>();
  const items: MakanApaItem[] = [];

  const pages = chapter07.pages.filter((page): page is ChapterTablePage => page.kind === "table");

  for (const page of pages) {
    for (const row of page.rows) {
      const imageCell = (row.cells.img ?? []).find(isImageCell);
      const nameCell = (row.cells.nama ?? []).find(isTranslated);
      if (!imageCell || !nameCell) continue;
      if (seen.has(row.id)) continue;

      seen.add(row.id);
      items.push({
        id: row.id,
        imageSrc: imageCell.src,
        name: nameCell,
      });
    }
  }

  return items;
}

export const MAKAN_APA_ITEMS: MakanApaItem[] = collectChapter7FoodItems();
