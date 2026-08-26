import { extractPlainText, type PortableTextBlock } from "emdash";

export function getIssueNumber(entry: { id?: string; slug?: string; data?: { title?: string } }): string {
  const raw = entry.slug || entry.id || entry.data?.title || "";
  return raw.match(/(?:-|#)(\d+)(?:$|\b)/)?.[1] || "";
}

export function getIssueNumberValue(entry: { id?: string; slug?: string; data?: { title?: string } }): number {
  return Number(getIssueNumber(entry)) || 0;
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  const mon = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  return `${mon} ${d.getDate()}`;
}

export function formatDateFull(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).toUpperCase();
}

export function getTopTags(tags: Array<{ label?: string; slug?: string }>, max = 3) {
  return (tags || [])
    .filter((tag) => {
      const value = (tag.slug || tag.label || "").toLowerCase();
      return value !== "newsletter" && value !== "news";
    })
    .slice(0, max);
}

export function getReadingTime(blocks: PortableTextBlock[] | undefined): number {
  const text = extractPlainText(blocks || []);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
