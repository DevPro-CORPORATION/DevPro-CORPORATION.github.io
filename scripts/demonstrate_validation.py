import json
import jsonschema
from jsonschema import validate
import sys
import os

schema_path = os.path.join(os.path.dirname(__file__), '../registry/schema/dxp.schema.json')

with open(schema_path, 'r') as f:
    schema = json.load(f)

# Mock valid payload
valid_payload = {
    "dxpVersion": "1.0.0",
    "name": "Reality Core API",
    "type": "library",
    "branding": {
        "primaryColor": "#00FF00"
    }
}

# Mock invalid payload (missing required 'type')
invalid_payload = {
    "dxpVersion": "1.0.0",
    "name": "Broken App"
}

print("\n[ DXP Registry Validation Test ]")
print("Environment: Python jsonschema (Simulating Node AJV GitHub Action)\n")

print("--- Test 1: Valid Payload ---")
try:
    validate(instance=valid_payload, schema=schema)
    print("[PASS]: Valid payload accepted.")
except Exception as e:
    print("[FAIL]:", e)

print("\n--- Test 2: Invalid Payload (Missing 'type') ---")
try:
    validate(instance=invalid_payload, schema=schema)
    print("[FAIL]: Invalid payload was unexpectedly accepted.")
except jsonschema.exceptions.ValidationError as e:
    print(f"[PASS]: Caught invalid payload. Error: {e.message}")
