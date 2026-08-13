# Risk Register
## Current Risks
1.  **Missing Build Environment:** Lack of `npm` prevents compiling Astro and running standard CI/CD checks locally. (Priority: High)
2.  **CDN Reliance:** `WorldEngine.js` fetches Three.js from `esm.sh`. (Priority: Medium)

## Resolved Risks
1.  **Validation Logic:** Proven via Python jsonschema script in Milestone 2.
2.  **FOUC:** Prevented via `hydrate.js`.
