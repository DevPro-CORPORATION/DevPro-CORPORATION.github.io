# Milestone 4 Deployment Readiness Audit

## 1. Astro Configuration
* **Status:** PASS
* **Details:** `astro.config.mjs` correctly specifies `site: 'https://devpro-corporation.github.io'` and `base: '/'`.

## 2. GitHub Pages Workflow
* **Status:** PASS
* **Details:** `.github/workflows/deploy.yml` correctly implements the official Astro Pages workflow, deploying from `apps/web/dist` on pushes to `main`.

## 3. Repository Name and Base Path
* **Status:** PASS
* **Details:** Target repository is a root-level organization/user page (`DevPro-CORPORATION.github.io`). Configuration matches expectations without a subpath override.

## 4. Build Output Directory
* **Status:** PASS
* **Details:** Astro builds to `dist/`, safely isolating generated output from tracked static prototype assets originally dumped in the workspace root.

## 5. Asset Paths
* **Status:** PASS
* **Details:** `public/projects/`, `achievements/`, and `certificates/` directories are securely configured to serve static binaries alongside the build.

## 6. WorldEngine Import Paths
* **Status:** FAIL
* **Blocker:** `WorldEngineCanvas.astro` imports `WorldEngine.js` which in turn imports `Three.js` via an absolute HTTPS URL (`https://esm.sh/three@0.160.0`). Vite/Rollup attempts to bundle this URL during `npm run build` and does not natively support external HTTP imports without explicit configuration, which will cause the CI build to fail with a Rollup unresolved module error.
* **Fix Required:** Add `vite: { build: { rollupOptions: { external: ['https://esm.sh/three@0.160.0'] } } }` to `astro.config.mjs` so the bundler treats the CDN URL as an external dependency at compile time.

## 7. GitHub API Build-Time Behavior
* **Status:** FAIL
* **Blocker:** `src/utils/github.ts` omits the `User-Agent` header in the `fetch` request. The GitHub REST API strictly requires a valid `User-Agent` header. Without it, the API rejects requests with a `403 Forbidden` error, which will halt the Astro build during data hydration.
* **Fix Required:** Add `'User-Agent': 'DevPro-DXP-Builder'` to the `headers` object in `src/utils/github.ts`.

## 8. Content/Asset Directories
* **Status:** PASS
* **Details:** Clean separation between markdown metadata (`src/content/`) and binary files (`public/`) is correctly mapped.

## 9. Deployment Blockers Summary
* **Are there obvious deployment blockers?** YES. The Rollup CDN resolution failure and the GitHub API `User-Agent` requirement will both independently cause the GitHub Actions CI build to crash before deployment.
* **Is the site safe to push to main?** NO.
* **Recommended next action:** Apply the identified fixes to `astro.config.mjs` (Vite externalized URLs) and `src/utils/github.ts` (User-Agent header). Once applied, the site will be fully deployment-ready.
