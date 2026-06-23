import type { Metadata } from "next";
import type { ReactNode } from "react";
import { themeToCssString } from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

export const metadata: Metadata = {
  title: "Orka Güvenlik — Ev ve İşyeri Güvenlik Sistemleri",
  description:
    "Alarm sistemleri, akıllı kameralar ve 7/24 izleme merkeziyle eviniz güvende. Ücretsiz keşif için bize ulaşın.",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const theme = await ocsm.public.getTheme();

  return (
    <html lang="tr">
      <head>
        {/* Theme variables, editable from the OCSM panel. */}
        <style dangerouslySetInnerHTML={{ __html: themeToCssString(theme) }} />
      </head>
      <body
        style={{
          margin: 0,
          background: "var(--ocsm-bg)",
          color: "var(--ocsm-text)",
          fontFamily: "var(--ocsm-font)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
