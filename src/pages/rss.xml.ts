import { getEmDashCollection, getSiteSettings } from "emdash";

export async function GET({ site }: { site?: URL }) {
  const [{ entries }, settings] = await Promise.all([
    getEmDashCollection("posts", { orderBy: { published_at: "desc" }, limit: 20 }),
    getSiteSettings()
  ]);
  const base = site?.toString().replace(/\/$/, "") || "";
  const title = settings.title || "網路黑手的呢喃";
  const description = settings.tagline || "關於科技、開源、網路世界的不定期電子報";
  const items = entries.map((entry: any) => `
    <item>
      <title><![CDATA[${entry.data.title || entry.id}]]></title>
      <link>${base}/newsletter/${entry.id}</link>
      <guid>${base}/newsletter/${entry.id}</guid>
      ${entry.data.publishedAt ? `<pubDate>${entry.data.publishedAt.toUTCString()}</pubDate>` : ""}
      ${entry.data.excerpt ? `<description><![CDATA[${entry.data.excerpt}]]></description>` : ""}
    </item>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${title}]]></title>
    <description><![CDATA[${description}]]></description>
    <link>${base}/newsletter</link>
    ${items}
  </channel>
</rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
  });
}
