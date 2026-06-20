import { BlockRenderer, normalizeBlocks } from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

export default async function HomePage() {
  const home = await ocsm.public.getDocument("pages", "home");
  const blocks = home ? normalizeBlocks(home.frontmatter.blocks) : [];

  if (blocks.length === 0) {
    return (
      <main
        style={{
          maxWidth: "var(--ocsm-max-width)",
          margin: "0 auto",
          padding: "64px 24px",
        }}
      >
        <h1>{ocsm.config.brand.name}</h1>
        <p style={{ color: "var(--ocsm-muted)" }}>
          Anasayfa içeriği için panelde “home” sayfasını oluşturun.
        </p>
      </main>
    );
  }

  return <BlockRenderer blocks={blocks} />;
}
