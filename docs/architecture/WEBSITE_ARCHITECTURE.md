# DevPro-CORP Website Architecture

## Current State
The project is currently a prototype consisting of an Astro frontend (`apps/web`), a WebGL engine (`engines/world`), and a generic public directory (`public`). Currently, there is no API integration, componentization, or build automation configured for GitHub Pages. Telemetry and UI components are mocked directly in static HTML/Astro files.

## Finalized Architecture
The DevPro-CORP website will be a highly scalable, static-first, cinematic web application built on Astro and deployed to GitHub Pages. It will leverage build-time data fetching to generate static pages, pulling project data directly from the DevPro-CORP GitHub organization, avoiding client-side rate limits while maintaining a free hosting model.

### Folder Structure
The architecture introduces three new data-driven content directories to the workspace:
*   `projects/` - Dedicated presentation assets and metadata supplementing GitHub repos.
*   `achievements/` - Independent showcases/slideshows for major company milestones.
*   `certificates/` - Independent repository of PDF/Image certificates.

The repository will be structured to support Astro Content Collections or dynamic routing to parse these directories automatically.

### GitHub Repository Discovery
*   **Mechanism:** Build-time execution.
*   **Source of Truth:** DevPro-CORPORATION GitHub Organization.
*   **Behavior:** A pre-build script or Astro `getStaticPaths` implementation will fetch the organization's repositories via the GitHub API. It will parse descriptions, languages, stats, and topics.
*   **Integration:** No manual duplication of repository data. The fetched data will merge with the local `projects/` assets at build time.

### Project Asset System
A dedicated local directory (`projects/`) for presentation assets that GitHub metadata cannot provide. 
*   **Structure:** Each project gets a subfolder matching the repository slug (e.g., `projects/aurora/`).
*   **Contents:** Can include `cover.webp`, `demo.mp4`, `screenshots/`, and a `project.json` for manual overrides (like specific display titles or categories).
*   **Requirement:** Every project card/page must generate a clear `Go to Repository` link directing users to the GitHub source.

### Achievement System
An independent system for standalone achievements, untethered from GitHub repos.
*   **Structure:** Located in `achievements/<Name>/`.
*   **Contents:** Presentations (`.pptx`), videos (`.mp4`), and image galleries.
*   **Behavior:** The Astro build process will iterate over this directory to auto-generate achievement showcases or slideshow views based purely on folder contents.

### Certificate System
A completely independent drop-in directory.
*   **Structure:** Located in `certificates/`.
*   **Behavior:** Any PDF or common image format dropped into this directory will be automatically detected during the build and exposed on a dedicated Certificates page or grid on the website.

### Build/Deployment Flow
Designed for free, automated static hosting.
1.  **Trigger:** Commit to `main` or scheduled dispatch.
2.  **GitHub Actions:** Bootstraps Node/Astro environment.
3.  **Data Fetch:** Build process pulls live data from GitHub API.
4.  **Static Build:** Astro (`astro build`) compiles all pages, projects, and achievements into static HTML/CSS/JS.
5.  **Deploy:** The generated static site is deployed to the `gh-pages` branch.

### Future Integration Points
*   **Google Cloud Storage:** Initially, all assets (videos, PDFs) live in the git repository. When asset sizes exceed GitHub's recommended repository limits, GCS will be introduced. The architecture allows `projects/` and `achievements/` to be synced from or substituted by GCS buckets via a build script, without changing the Astro frontend.
*   **Private DevPro-CORP API:** If live telemetry or advanced dynamic capabilities are required, a private backend can be introduced. The current SSG architecture allows easy swapping from build-time GitHub API fetching to client-side or server-side (SSR) fetching against a proprietary API.

### Important Engineering Decisions
*   **Build-time Data Fetching:** Chosen over client-side fetching to eliminate GitHub API rate limits for visitors and guarantee instant loading speeds (Zero Latency).
*   **Separation of Concerns:** Projects (Code/Repos), Achievements (Milestones), and Certificates (Accreditations) are deliberately decoupled into separate file-system structures to prevent domain bleeding.
*   **No Backend (Yet):** Adhering to the static-first philosophy minimizes hosting costs and security vectors during the initial rollout.

---

## Required Changes
To support this architecture, the following structural adjustments to the workspace are necessary:
1.  **Directory Creation:** Create `projects/`, `achievements/`, and `certificates/` directories at the workspace root (or inside `apps/web/src/content/` to leverage Astro Content Collections).
2.  **Astro Config:** Update `astro.config.mjs` to define the correct `base` path (repository name) for GitHub Pages compatibility.
3.  **CI/CD Pipeline:** Create `.github/workflows/deploy.yml` configured for Astro and GitHub Pages.

## Dependencies Required Later
*   `octokit` (or similar HTTP client) for build-time GitHub API interactions.
*   `astro/image` or Sharp for asset optimization of covers and screenshots.

## Open Questions
*   **Data Aggregation:** Should the `projects/`, `achievements/`, and `certificates/` directories live at the root of `dxp/`, or inside `dxp/apps/web/src/content/` to easily use Astro's native content collection API?
*   **Authentication:** Does the GitHub Action need a Personal Access Token (PAT) to read DevPro-CORPORATION repositories, or are they entirely public?

## Recommended Next Milestone
**Milestone 4 (Architecture Foundation & CI/CD)**
1.  Establish the `projects`, `achievements`, and `certificates` directory structures.
2.  Write the build-time GitHub repository discovery script.
3.  Configure the GitHub Actions deployment workflow for GitHub Pages.
