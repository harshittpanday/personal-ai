export interface TextChunk {
  index: number;
  content: string;
  start: number;
  end: number;
}

interface ChunkOptions {
  chunkSize?: number;
  overlap?: number;
}

const DEFAULT_CHUNK_SIZE = 1000;
const DEFAULT_OVERLAP = 200;

export function chunkText(
  text: string,
  options: ChunkOptions = {}
): TextChunk[] {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const overlap = options.overlap ?? DEFAULT_OVERLAP;

  if (!text.trim()) {
    return [];
  }

  const normalized = normalize(text);

  const chunks: TextChunk[] = [];

  let start = 0;
  let index = 0;

  while (start < normalized.length) {
    let end = Math.min(start + chunkSize, normalized.length);

    if (end < normalized.length) {
      const sentenceBreak = normalized.lastIndexOf(".", end);

      if (sentenceBreak > start + chunkSize * 0.6) {
        end = sentenceBreak + 1;
      }
    }

    const content = normalized.slice(start, end).trim();

    if (content.length > 0) {
      chunks.push({
        index,
        content,
        start,
        end,
      });

      index++;
    }

    if (end >= normalized.length) {
      break;
    }

    start = Math.max(0, end - overlap);
  }

  return chunks;
}

function normalize(text: string): string {
  return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}