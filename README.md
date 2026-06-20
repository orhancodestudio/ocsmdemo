# OCS Management — Demo Site

A sample site powered by **OCS Management** (`@orhancodestudio/ocsm-core`) by
[Orhan Code Studio](https://orhancodestudio.com).

Content is managed from the in-app panel at **`/ocsm-admin`** and stored in this
repository (git-based CMS — no database).

## Local development

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3000
- Panel: http://localhost:3000/ocsm-admin
- Demo login: `admin` / `admin123`

In local dev, content/media are written to the filesystem (`content/`, `ocsm/`).

## Production (Vercel)

Set these Environment Variables on the Vercel project so the panel commits
changes back to this repository:

| Variable | Description |
| --- | --- |
| `OCSM_AUTH_SECRET` | Secret for signing sessions. `openssl rand -hex 32` |
| `OCSM_GITHUB_TOKEN` | GitHub token with Contents: Read & Write on this repo |
| `OCSM_GITHUB_REPO` | `owner/repo` (this repository) |
| `OCSM_GITHUB_BRANCH` | Target branch, e.g. `main` |

Every save in the panel becomes a commit to this repo, which triggers a redeploy.

© Orhan Code Studio
