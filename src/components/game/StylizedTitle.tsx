type StylizedTitleProps = {
  title: string;
  className?: string;
};

function normalizeTitle(title: string): string {
  return title.replace(/\s*\n+\s*/g, " ").replace(/\s{2,}/g, " ").trim();
}

function splitTitleLines(title: string): string[] {
  if (title.length < 28) return [title];

  const words = title.split(" ");
  const targetLineCount = title.length >= 52 ? 3 : 2;
  const targetLineLength = Math.ceil(title.length / targetLineCount);
  const lines: string[] = [];
  let currentLine: string[] = [];

  words.forEach((word, index) => {
    currentLine.push(word);

    const remainingWords = words.length - index - 1;
    const remainingLines = targetLineCount - lines.length - 1;
    const canBreak = remainingLines > 0 && remainingWords >= remainingLines;
    const minWordsForLine = lines.length === 0 ? 3 : 1;

    if (canBreak && currentLine.length >= minWordsForLine && currentLine.join(" ").length >= targetLineLength) {
      lines.push(currentLine.join(" "));
      currentLine = [];
    }
  });

  if (currentLine.length > 0) lines.push(currentLine.join(" "));
  return lines;
}

export default function StylizedTitle({ title, className }: StylizedTitleProps) {
  const normalizedTitle = normalizeTitle(title);
  const titleLines = splitTitleLines(normalizedTitle);
  const lengthClass =
    normalizedTitle.length >= 52
      ? "crash-chapter-title--very-long"
      : normalizedTitle.length >= 40
      ? "crash-chapter-title--long"
      : normalizedTitle.length >= 28
      ? "crash-chapter-title--medium"
      : "crash-chapter-title--short";

  return (
    <header className={["crash-chapter-header", className].filter(Boolean).join(" ")}>
      <h1 className={["crash-chapter-title", lengthClass].join(" ")} aria-label={normalizedTitle}>
        {titleLines.map((line, index) => (
          <span key={`${line}-${index}`} aria-hidden="true" className="crash-chapter-title-line" data-text={line}>
            <span className="crash-chapter-title-fill">{line}</span>
          </span>
        ))}
      </h1>
    </header>
  );
}
