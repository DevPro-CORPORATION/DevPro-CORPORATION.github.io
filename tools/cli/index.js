#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log("\n🚀 DevPro Experience Platform (DXP) CLI\n");

const yamlPath = path.join(process.cwd(), '.dxp.yaml');

if (fs.existsSync(yamlPath)) {
  console.error("❌ .dxp.yaml already exists in this directory.");
  process.exit(1);
}

const template = `dxpVersion: 1.0.0
name: "My Project"
type: "application"
branding:
  primaryColor: "#00FFAA"
  realityCompatibility:
    - "reality-deep-space"
presentation:
  model3d: "assets/hero.glb"
`;

fs.writeFileSync(yamlPath, template);
console.log("✅ Successfully bootstrapped .dxp.yaml");
console.log("Run 'dxp validate' to verify your manifest against the registry schema.");
