import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlockRenderer,
  normalizeBlocks,
  OcsmContent,
} from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await ocsm.getDocument("pages", slug);
  if (!page) notFound();

  const blocks = normalizeBlocks(page.frontmatter.blocks);
  const title =
    typeof page.frontmatter.title === "string" ? page.frontmatter.title : slug;

  return (
    <main>
      {blocks.length > 0 ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <div
          style={{
            maxWidth: "var(--ocsm-max-width)",
            margin: "0 auto",
            padding: "56px 24px",
          }}
        >
          <h1 style={{ fontFamily: "var(--ocsm-font-heading)" }}>{title}</h1>
          <article style={{ lineHeight: 1.7 }}>
            <OcsmContent source={page.body} />
          </article>
        </div>
      )}
      <div
        style={{
          maxWidth: "var(--ocsm-max-width)",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <Link href="/" style={{ color: "var(--ocsm-primary)" }}>
          ← Ana sayfa
        </Link>
      </div>
    </main>
  );
}
