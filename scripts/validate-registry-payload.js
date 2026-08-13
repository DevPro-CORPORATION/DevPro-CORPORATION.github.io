const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schemaPath = path.resolve(__dirname, '../registry/schema/dxp.schema.json');
let schema;
try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
} catch (e) {
    console.error("❌ Failed to read schema file:", e.message);
    process.exit(1);
}

const ajv = new Ajv();
const validate = ajv.compile(schema);

function run() {
    const payloadStr = process.argv[2];
    if (!payloadStr) {
        console.error("❌ No payload provided.");
        process.exit(1);
    }
    
    let payload;
    try {
        payload = JSON.parse(payloadStr);
    } catch (e) {
        console.error("❌ Payload is not valid JSON.");
        process.exit(1);
    }

    const valid = validate(payload);
    if (!valid) {
        console.error("❌ Validation Failed:");
        console.error(ajv.errorsText(validate.errors));
        process.exit(1);
    }

    console.log("✅ Registry Payload Validated Successfully.");
    process.exit(0);
}

run();
