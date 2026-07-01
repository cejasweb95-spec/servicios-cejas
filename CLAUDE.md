@AGENTS.md

## Claude Code Notes

- Treat `AGENTS.md` as the shared source of project rules for this repo.
- For `git push` / GitHub remotes: never rely on interactive auth; use `GIT_ACCESS_TOKEN` from `.env.local` via `npm run git:push` (see `AGENTS.md` → Git And Remote Operations and `.cursor/rules/git-github-noninteractive.mdc`).
- For broad project context, prefer the MDs under `docs/cliente/`.
- For implementation work, follow `docs/cliente/implementacion-fases/README.md` and `docs/cliente/implementacion-fases/CHECKLIST-MAESTRA.md`.
- For task-specific frontend, SEO, QA, i18n, or Supabase workflows, use the matching project skills under `.agents/skills/`.
