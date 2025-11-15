# Repository Guidelines

## Project Structure & Module Organization
Next.js App Router files live under `app/`; entity pages such as `app/animate`, `app/customer`, `app/product`, and `app/store` share scaffolding from `app/layout.tsx` and navigation from `app/navbar.tsx`. Shared UI primitives and dialogs live in `components/common`, while `components/crud` plus `hooks/useGenericCRUD.ts` provide the generic CRUD workflow used across entities. Supabase data access is centralized inside `services/supabase.service.ts`, reusable models under `types/`, and environment-aware helpers inside `lib/`. Keep `docs/architecture.md` aligned with structural changes and refresh the `supabase-*.sql` DDL scripts whenever schemas evolve.

## Build, Test, and Development Commands
Run `npm run dev` for the Turbopack dev server at http://localhost:3000. `npm run build` compiles a production bundle, while `npm start` serves the build output locally. `npm run lint` executes ESLint per `eslint.config.mjs`; resolve every warning before a pull request.

## Coding Style & Naming Conventions
Author TypeScript modules with two-space indentation, functional React components, and Tailwind utility classes kept inline. Components and files that export JSX use PascalCase (`components/common/Button.tsx`), hooks and helpers use camelCase, and shared types belong to `types/entities.ts` or `types/common.ts`. Keep prop names descriptive, colocate Supabase table metadata near the CRUD layer, and surface any browser-visible configuration through `process.env.NEXT_PUBLIC_*`. Run ESLint and the built-in type checker before pushing.

## Testing Guidelines
Automated tests are not yet committed, so at minimum manually verify each CRUD flow and rerun `npm run lint`. When adding coverage, use React Testing Library or Playwright, place specs next to the feature under a `__tests__` folder, and name them after the entity (`app/product/__tests__/product.spec.tsx`). Prioritize Supabase reads/writes, optimistic updates, and failure states, and document new test scripts in `package.json` for reuse.

## Commit & Pull Request Guidelines
The history favors Conventional Commits (`refactor: ...`, `feat(scope): ...`). Keep messages in the imperative mood and mention the slice of the app or schema you touched. Pull requests should explain the problem, outline the fix, include screenshots or terminal output for UI-facing work, confirm `npm run lint`, and call out new environment variables or SQL migrations.

## Supabase & Configuration Tips
`lib/supabase.ts` throws when `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` is missing, so define both in `.env.local` before running dev or build commands. Never commit credentials; instead update `SUPABASE_SETUP.md` or the SQL files with reproducible setup notes, and re-run the matching `supabase-*.sql` file whenever you evolve a table consumed by the CRUD forms.
