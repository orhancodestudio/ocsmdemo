import { defineOcsmConfig } from "@orhancodestudio/ocsm-core/config";

export default defineOcsmConfig({
  brand: {
    name: "Orka Güvenlik",
    description: "Ev ve işyeri güvenlik sistemleri · 7/24 izleme",
  },
  contentRoot: "content",
  collections: [
    { name: "posts", label: "Yazılar", directory: "posts", basePath: "blog" },
    { name: "pages", label: "Sayfalar", directory: "pages" },
  ],
});
