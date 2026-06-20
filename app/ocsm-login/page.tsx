import { redirect } from "next/navigation";
import {
  authenticate,
  createSession,
  getSessionUser,
  setupFirstAdmin,
} from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";

export default async function OcsmLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSessionUser()) redirect("/ocsm-admin");

  const { error } = await searchParams;
  const isSetup = (await ocsm.users.count()) === 0;

  async function loginAction(formData: FormData): Promise<void> {
    "use server";
    const username = String(formData.get("username") ?? "");
    const password = String(formData.get("password") ?? "");
    const user = await authenticate(ocsm.users, ocsm.roles, username, password);
    if (!user) redirect("/ocsm-login?error=1");
    await createSession(user);
    redirect("/ocsm-admin");
  }

  async function setupAction(formData: FormData): Promise<void> {
    "use server";
    const username = String(formData.get("username") ?? "");
    const name = String(formData.get("name") ?? "");
    const password = String(formData.get("password") ?? "");
    const user = await setupFirstAdmin(ocsm.users, ocsm.roles, {
      username,
      name,
      password,
    });
    if (!user) redirect("/ocsm-login?error=1");
    await createSession(user);
    redirect("/ocsm-admin");
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>OCS Management</div>
        <h1 style={styles.title}>
          {isSetup ? "İlk yöneticiyi oluştur" : "Panele giriş"}
        </h1>
        <p style={styles.subtitle}>
          {isSetup
            ? "Henüz kullanıcı yok. Yönetici hesabını oluştur."
            : "Devam etmek için giriş yap."}
        </p>

        {error ? (
          <div style={styles.error}>
            {isSetup ? "Kurulum başarısız." : "Kullanıcı adı veya şifre hatalı."}
          </div>
        ) : null}

        <form action={isSetup ? setupAction : loginAction} style={styles.form}>
          {isSetup ? (
            <label style={styles.label}>
              Ad Soyad
              <input name="name" style={styles.input} required />
            </label>
          ) : null}
          <label style={styles.label}>
            Kullanıcı adı
            <input
              name="username"
              autoComplete="username"
              style={styles.input}
              required
            />
          </label>
          <label style={styles.label}>
            Şifre
            <input
              name="password"
              type="password"
              autoComplete={isSetup ? "new-password" : "current-password"}
              style={styles.input}
              required
            />
          </label>
          <button type="submit" style={styles.button}>
            {isSetup ? "Yöneticiyi oluştur" : "Giriş yap"}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b1220",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#fff",
    borderRadius: 14,
    padding: 32,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  brand: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#2563eb",
    marginBottom: 14,
  },
  title: { margin: "0 0 6px", fontSize: 22, color: "#0f172a" },
  subtitle: { margin: "0 0 20px", fontSize: 13.5, color: "#64748b" },
  error: {
    background: "#fef2f2",
    color: "#dc2626",
    padding: "10px 12px",
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 16,
  },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 12.5,
    fontWeight: 600,
    color: "#0f172a",
  },
  input: {
    padding: 11,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 400,
  },
  button: {
    marginTop: 6,
    background: "#2563eb",
    color: "#fff",
    padding: "11px 16px",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
} satisfies Record<string, React.CSSProperties>;
