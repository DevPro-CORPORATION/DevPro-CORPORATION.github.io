# Autonomous Decision Log
## Decision: CDN-based WebGL Execution
*   **Reason:** Node.js/npm is missing from the environment, blocking standard module bundling.
*   **Impact:** Allows continuous engineering and browser verification without a build step.
*   **Can be Changed Later:** Yes. Once Node is installed, the import path can be updated to `node_modules`.
