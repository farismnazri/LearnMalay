export type ChapterSummary = {
  id: number;
  revision: number;
  title: {
    ms: string;
  };
};

export const CHAPTER_SUMMARIES: readonly ChapterSummary[] = [
  { id: 1, revision: 7, title: { ms: "Sapaan" } },
  { id: 2, revision: 4, title: { ms: "Keluarga" } },
  { id: 3, revision: 5, title: { ms: "Kaunter" } },
  { id: 4, revision: 5, title: { ms: "Masa\n& Arah Jalan" } },
  { id: 5, revision: 5, title: { ms: "Nombor, Angka & Alamat" } },
  { id: 6, revision: 3, title: { ms: "Alam Sekitar & Cuaca" } },
  { id: 7, revision: 2, title: { ms: "Makanan & Kuih-muih" } },
  { id: 8, revision: 2, title: { ms: "Perayaan di Malaysia" } },
  { id: 9, revision: 4, title: { ms: "Pekerjaan di Sekitar Kita" } },
  { id: 10, revision: 2, title: { ms: "Permainan Tradisional" } },
  { id: 11, revision: 2, title: { ms: "Cuti-Cuti Umum di Malaysia" } },
];
