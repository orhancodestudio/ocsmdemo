import { defineOcsmConfig } from "@orhancodestudio/ocsm-core/config";

export default defineOcsmConfig({
  brand: {
    name: "ACME Kurumsal",
    description: "Dijital dönüşüm ve yazılım çözümleri",
  },
  contentRoot: "content",
  collections: [
    { name: "posts", label: "Yazılar", directory: "posts", basePath: "blog" },
    { name: "pages", label: "Sayfalar", directory: "pages" },
  ],
});
