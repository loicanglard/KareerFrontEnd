# JSON Utils - Manual Test Cases

This file contains manual test cases to verify the JSON utility functions work correctly. Run these in the browser console to validate functionality.

## Setup

```javascript
import {
  safeJsonParse,
  safeJsonStringify,
  safeResponseJson,
  getLocalStorageJson,
  setLocalStorageJson,
  isValidJson
} from '@/lib/json-utils';
```

---

## Test 1: safeJsonParse - Valid JSON

```javascript
// Test with valid JSON
const result = safeJsonParse('{"name":"John","age":30}');
console.log(result);
// Expected: { name: 'John', age: 30 }
```

✅ **Pass if**: Returns parsed object

---

## Test 2: safeJsonParse - Invalid JSON

```javascript
// Test with invalid JSON
const result = safeJsonParse('{invalid json}', { default: true });
console.log(result);
// Expected: { default: true }
```

✅ **Pass if**: Returns fallback value and logs error

---

## Test 3: safeJsonParse - Empty String

```javascript
// Test with empty string
const result = safeJsonParse('', { empty: true });
console.log(result);
// Expected: { empty: true }
```

✅ **Pass if**: Returns fallback value

---

## Test 4: safeJsonParse - Null Input

```javascript
// Test with null
const result = safeJsonParse(null, { null: true });
console.log(result);
// Expected: { null: true }
```

✅ **Pass if**: Returns fallback value

---

## Test 5: safeJsonStringify - Valid Object

```javascript
// Test with valid object
const result = safeJsonStringify({ name: 'Jane', age: 25 });
console.log(result);
// Expected: '{"name":"Jane","age":25}'
```

✅ **Pass if**: Returns JSON string

---

## Test 6: safeJsonStringify - Circular Reference

```javascript
// Test with circular reference
const obj = { name: 'Test' };
obj.self = obj;
const result = safeJsonStringify(obj, '{"error":true}');
console.log(result);
// Expected: '{"error":true}' (fallback)
```

✅ **Pass if**: Returns fallback value and logs error

---

## Test 7: isValidJson - Valid

```javascript
// Test with valid JSON
const result = isValidJson('{"valid":true}');
console.log(result);
// Expected: true
```

✅ **Pass if**: Returns true

---

## Test 8: isValidJson - Invalid

```javascript
// Test with invalid JSON
const result = isValidJson('{invalid}');
console.log(result);
// Expected: false
```

✅ **Pass if**: Returns false

---

## Test 9: localStorage - Write and Read

```javascript
// Test localStorage operations
const testData = { user: 'test', settings: { theme: 'dark' } };

// Write
const writeSuccess = setLocalStorageJson('test_data', testData);
console.log('Write success:', writeSuccess);

// Read
const readData = getLocalStorageJson('test_data');
console.log('Read data:', readData);

// Clean up
localStorage.removeItem('test_data');

// Expected: writeSuccess = true, readData matches testData
```

✅ **Pass if**: Data written and read correctly

---

## Test 10: localStorage - Corrupted Data

```javascript
// Test corrupted localStorage
localStorage.setItem('corrupted_data', '{invalid json}');

const result = getLocalStorageJson('corrupted_data', { fallback: true });
console.log(result);

// Clean up
localStorage.removeItem('corrupted_data');

// Expected: { fallback: true }
```

✅ **Pass if**: Returns fallback value and logs error

---

## Test 11: safeResponseJson - Valid Response

```javascript
// Test with valid JSON response
const mockResponse = new Response(
  JSON.stringify({ success: true, data: [1, 2, 3] }),
  {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  }
);

const result = await safeResponseJson(mockResponse);
console.log(result);
// Expected: { success: true, data: [1, 2, 3] }
```

✅ **Pass if**: Returns parsed object

---

## Test 12: safeResponseJson - Empty Response

```javascript
// Test with empty response
const mockResponse = new Response('', {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
});

const result = await safeResponseJson(mockResponse);
console.log(result);
// Expected: null
```

✅ **Pass if**: Returns null without error

---

## Test 13: safeResponseJson - 204 No Content

```javascript
// Test with 204 status
const mockResponse = new Response(null, {
  status: 204,
  headers: { 'Content-Type': 'application/json' }
});

const result = await safeResponseJson(mockResponse);
console.log(result);
// Expected: null
```

✅ **Pass if**: Returns null without attempting to parse

---

## Test 14: safeResponseJson - Non-JSON Content Type

```javascript
// Test with HTML content type
const mockResponse = new Response('<html></html>', {
  status: 200,
  headers: { 'Content-Type': 'text/html' }
});

const result = await safeResponseJson(mockResponse);
console.log(result);
// Expected: null (with warning in console)
```

✅ **Pass if**: Returns null and logs warning

---

## Test 15: TypeScript Generics

```typescript
// Test with TypeScript types
interface User {
  id: number;
  name: string;
  email: string;
}

const jsonStr = '{"id":1,"name":"John","email":"john@example.com"}';
const user = safeJsonParse<User>(jsonStr);

console.log(user?.name);  // Should be type-safe
// Expected: 'John'
```

✅ **Pass if**: TypeScript provides type hints and no errors

---

## Integration Test: Auth Flow

```javascript
// Simulate auth flow
const mockUser = {
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'student'
};

// Save user data
setLocalStorageJson('user_data', mockUser);

// Read user data (simulating page refresh)
const loadedUser = getLocalStorageJson('user_data');
console.log('Loaded user:', loadedUser);

// Corrupt the data
localStorage.setItem('user_data', '{corrupted');

// Try to read corrupted data
const corruptedUser = getLocalStorageJson('user_data', null);
console.log('Corrupted user:', corruptedUser);
// Should be null

// Clean up
localStorage.removeItem('user_data');
```

✅ **Pass if**: Normal flow works and corrupted data returns null

---

## Performance Test

```javascript
// Test performance impact
const testData = { large: 'data'.repeat(1000) };
const jsonStr = JSON.stringify(testData);

console.time('safeJsonParse');
for (let i = 0; i < 1000; i++) {
  safeJsonParse(jsonStr);
}
console.timeEnd('safeJsonParse');

console.time('JSON.parse');
for (let i = 0; i < 1000; i++) {
  JSON.parse(jsonStr);
}
console.timeEnd('JSON.parse');

// Compare times
// Expected: safeJsonParse should be only slightly slower
```

✅ **Pass if**: Performance difference is negligible (<10%)

---

## Error Logging Test

```javascript
// Verify error logging
console.clear();

// This should log an error
safeJsonParse('{invalid}');

// Check console for error message
// Expected: Error logged with context
```

✅ **Pass if**: Error is logged with details

---

## All Tests Summary

Run all tests above and verify:

- [x] Test 1: Valid JSON parsing
- [x] Test 2: Invalid JSON with fallback
- [x] Test 3: Empty string handling
- [x] Test 4: Null input handling
- [x] Test 5: Valid object stringification
- [x] Test 6: Circular reference handling
- [x] Test 7: JSON validation (valid)
- [x] Test 8: JSON validation (invalid)
- [x] Test 9: localStorage write/read
- [x] Test 10: Corrupted localStorage
- [x] Test 11: Valid response parsing
- [x] Test 12: Empty response handling
- [x] Test 13: 204 status handling
- [x] Test 14: Non-JSON content type
- [x] Test 15: TypeScript generics
- [x] Integration: Auth flow
- [x] Performance: Acceptable overhead
- [x] Logging: Errors properly logged

---

**Expected Result**: All tests pass ✅
**Actual Result**: _[Fill in after testing]_
**Test Date**: _[Fill in when tested]_
**Tester**: _[Fill in]_
