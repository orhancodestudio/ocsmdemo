import type { ReactNode } from "react";
import { BlockRenderer } from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

/**
 * Wraps every public page with the global header and footer sections (managed in
 * the page builder). Admin and login routes live outside this group, so they are
 * not affected.
 */
export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [header, footer] = await Promise.all([
    ocsm.public.getLayout("header"),
    ocsm.public.getLayout("footer"),
  ]);

  return (
    <>
      {header.length > 0 ? <BlockRenderer blocks={header} /> : null}
      {children}
      {footer.length > 0 ? <BlockRenderer blocks={footer} /> : null}
    </>
  );
}
