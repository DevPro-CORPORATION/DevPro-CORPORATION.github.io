# Milestone 4 Implementation Plan: Architecture Foundation & CI/CD

## Exact Implementation Plan
1. **Initialize Astro Content Collections (Metadata):** 
   - Scaffold the `apps/web/src/content/` directory.
   - Create subdirectories for `projects/`, `achievements/`, and `certificates/` to store strictly text-based metadata (Markdown/MDX).
   - Create `config.ts` to define Zod schemas for these collections.
2. **Initialize Static Assets Directory (Binaries):**
   - Create `apps/web/public/projects/`, `apps/web/public/achievements/`, and `apps/web/public/certificates/` to cleanly house binary assets (PPTX, PDF, MP4, images) outside of the content collections, preserving a clean metadata + filesystem asset architecture.
3. **Build-time GitHub Discovery:** 
   - Implement `src/utils/github.ts` using the native `fetch` API against `api.github.com/orgs/DevPro-CORPORATION/repos`. 
   - This utility will be invoked during the static build phase (`astro build`) inside Astro pages/components to fetch live repository data using the GitHub Actions `GITHUB_TOKEN`.
   - The fetched data will be merged with the local metadata from `src/content/` and assets from `public/`.
4. **Resolve Output Conflict & GitHub Pages Configuration:** 
   - Modify `apps/web/astro.config.mjs` to remove the `outDir: '../../public'` override. Astro must output to its default `dist/` directory so generated output does not conflict with tracked static prototype assets.
   - Create a GitHub Actions workflow (`.github/workflows/deploy.yml`) utilizing `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`.
5. **Refactoring the UI Layer:** 
   - Refactor the monolithic `index.astro` into modular Astro components.
   - **Crucial:** Preserve the existing World Engine prototype perfectly. Wrap the existing WebGL integration into a dedicated `<WorldEngineCanvas>` component to ensure the prototype is preserved and isolated from layout changes.

## Files to Create / Modify

**Files to Create:**
*   `apps/web/src/content/config.ts`
*   `apps/web/src/content/projects/`, `achievements/`, `certificates/` (Directories for Metadata)
*   `apps/web/public/projects/`, `achievements/`, `certificates/` (Directories for Binary Assets)
*   `apps/web/src/utils/github.ts`
*   `apps/web/src/components/WorldEngineCanvas.astro`
*   `.github/workflows/deploy.yml`

**Files to Modify:**
*   `apps/web/astro.config.mjs` (Remove `outDir: '../../public'`, add correct `base`/`site` pending verification)
*   `apps/web/src/pages/index.astro` (Refactor to use components)

## Dependency Changes
*   **Three.js:** The World Engine will continue using the `esm.sh` CDN import temporarily to strictly preserve the exact functioning prototype. **NPM bundling of Three.js is documented as a later cleanup task.**
*   No new dependencies required. The native `fetch` API and Astro's built-in `zod` will be utilized.

## GitHub Pages Configuration & Verified Repository Information
*   **Verification Status:** **FAILED**. I have audited the entire `dxp` workspace and local file system. There is NO local `.git` repository, `git` configuration, or environment variable present on this machine to verify the actual remote GitHub repository name or Pages deployment target. 
*   **Required Action:** Before I can write the correct `site` and `base` paths into `astro.config.mjs` and configure the deployment workflow, you must provide the verified GitHub repository name (e.g., `DevPro-CORPORATION.github.io` or `DevPro-CORPORATION/website`).

## GitHub API / Build-Time Data Flow
1. **Trigger:** `astro build` runs in GitHub Actions.
2. **Fetch:** `github.ts` uses the `GITHUB_TOKEN` to fetch repository metadata. The data refreshes exclusively when the site builds.
3. **Compile & Deploy:** Astro renders the static site into `dist/`. The Action deploys `dist/` to `gh-pages` (fully static, zero backend).

## Content Collection Architecture
*   **Metadata (`src/content/`)**: Stores `.md` files detailing descriptions, titles, or overrides. Maps 1:1 with repository slugs.
*   **Binary Assets (`public/`)**: Stores `.mp4`, `.pdf`, `.pptx`, `.webp` matching the slug structure of the metadata.

## Risks
*   **Path Resolution Breakage:** Changing the Astro `outDir` away from `../../public` means the root `public/demo.html` will no longer sit alongside Astro's output. Deployment workflows must be careful to deploy the Astro output directory correctly without losing necessary static assets.

## Verification Procedure
1.  Run `npm run build` locally in `apps/web` to ensure the Astro build compiles successfully to the `dist/` directory.
2.  Verify the World Engine continues to render "Deep Space" identically in the browser.
3.  Confirm the GitHub Action deploys successfully to the provided GitHub Pages target.
