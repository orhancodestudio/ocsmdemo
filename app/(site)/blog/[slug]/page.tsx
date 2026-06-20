import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BlockRenderer,
  normalizeBlocks,
  OcsmContent,
} from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

// Build the public blog statically from the committed files (no GitHub at build).
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await ocsm.public.listDocuments("posts");
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await ocsm.public.getDocument("posts", slug);
  if (!post) notFound();

  const blocks = normalizeBlocks(post.frontmatter.blocks);
  const title =
    typeof post.frontmatter.title === "string" ? post.frontmatter.title : slug;

  return (
    <main>
      <div style={backLinkBar}>
        <Link href="/" style={{ color: "var(--ocsm-primary)" }}>
          ← Geri
        </Link>
      </div>

      {blocks.length > 0 ? (
        <BlockRenderer blocks={blocks} />
      ) : (
        <div style={articleWrap}>
          <h1 style={{ fontFamily: "var(--ocsm-font-heading)" }}>{title}</h1>
          <article style={{ lineHeight: 1.7 }}>
            <OcsmContent source={post.body} />
          </article>
        </div>
      )}
    </main>
  );
}

const backLinkBar = {
  maxWidth: "var(--ocsm-max-width)",
  margin: "0 auto",
  padding: "24px",
} as const;

const articleWrap = {
  maxWidth: "var(--ocsm-max-width)",
  margin: "0 auto",
  padding: "0 24px 56px",
} as const;
