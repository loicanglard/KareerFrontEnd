# JSON Safety Guide

## Quick Reference for Developers

This guide provides best practices for safe JSON handling in the GenKareer/KareerV1 project.

---

## Import the Utilities

```typescript
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

## Common Scenarios

### 1. Parsing JSON Strings

❌ **NEVER DO THIS**:
```typescript
const data = JSON.parse(jsonString);  // Can crash!
```

✅ **ALWAYS DO THIS**:
```typescript
const data = safeJsonParse<MyType>(jsonString, defaultValue);
```

**Example**:
```typescript
// With fallback
const user = safeJsonParse<User>(userData, null);

// With default object
const settings = safeJsonParse<Settings>(settingsJson, {
  theme: 'light',
  language: 'en'
});
```

---

### 2. Stringifying Objects

❌ **AVOID**:
```typescript
const json = JSON.stringify(data);  // Can fail silently
```

✅ **PREFER**:
```typescript
const json = safeJsonStringify(data, '{}');
```

**Example**:
```typescript
// Stringify user object safely
const userJson = safeJsonStringify(user, '{}');

// With custom fallback
const configJson = safeJsonStringify(config, '{"default": true}');
```

---

### 3. Fetch API Responses

❌ **DANGEROUS**:
```typescript
const response = await fetch('/api/data');
const data = await response.json();  // Crashes on empty response!
```

✅ **SAFE**:
```typescript
const response = await fetch('/api/data');
const data = await safeResponseJson<ApiData>(response);

if (data) {
  // Use data safely
} else {
  // Handle null response (empty, non-JSON, etc.)
}
```

**What it handles**:
- ✅ Status codes 204, 205 (no content)
- ✅ Empty response bodies
- ✅ Non-JSON content-types
- ✅ Malformed JSON
- ✅ Network errors

---

### 4. localStorage with JSON

❌ **OLD WAY**:
```typescript
// Reading
const dataStr = localStorage.getItem('data');
const data = JSON.parse(dataStr);  // Crashes on null or invalid JSON

// Writing
localStorage.setItem('data', JSON.stringify(data));
```

✅ **NEW WAY**:
```typescript
// Reading
const data = getLocalStorageJson<DataType>('data', defaultValue);

// Writing
const success = setLocalStorageJson('data', data);
if (!success) {
  console.error('Failed to save data');
}
```

**Example**:
```typescript
interface UserPreferences {
  theme: string;
  notifications: boolean;
}

// Load preferences
const prefs = getLocalStorageJson<UserPreferences>('preferences', {
  theme: 'light',
  notifications: true
});

// Save preferences
const saved = setLocalStorageJson('preferences', prefs);
```

---

### 5. Validating JSON Before Parsing

```typescript
const userInput = document.getElementById('jsonInput').value;

if (isValidJson(userInput)) {
  const data = safeJsonParse(userInput);
  // Process valid JSON
} else {
  alert('Invalid JSON format');
}
```

---

## Type Safety with TypeScript

All safe functions support TypeScript generics:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Type-safe parsing
const user = safeJsonParse<User>(jsonString);
// user is User | null

// Type-safe response parsing
const users = await safeResponseJson<User[]>(response);
// users is User[] | null

// Type-safe localStorage
const user = getLocalStorageJson<User>('current_user');
// user is User | null
```

---

## Error Handling Patterns

### Pattern 1: Fallback Value

```typescript
const config = safeJsonParse<Config>(configJson, DEFAULT_CONFIG);
// Always has a valid value
```

### Pattern 2: Null Check

```typescript
const data = safeJsonParse<Data>(jsonString);
if (data === null) {
  console.error('Failed to parse data');
  return;
}
// Use data safely
```

### Pattern 3: Optional Chaining

```typescript
const user = safeJsonParse<User>(userData);
const userName = user?.name ?? 'Anonymous';
```

---

## Real-World Examples

### Example 1: API Call with Error Handling

```typescript
async function fetchUserProfile(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const user = await safeResponseJson<User>(response);

    if (!user) {
      throw new Error('Invalid response format');
    }

    return user;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}
```

### Example 2: Form Data Persistence

```typescript
function saveFormData(formId: string, data: any) {
  const key = `form_${formId}`;
  const success = setLocalStorageJson(key, data);

  if (!success) {
    console.error(`Failed to save form ${formId}`);
    // Maybe show user notification
  }

  return success;
}

function loadFormData(formId: string) {
  const key = `form_${formId}`;
  return getLocalStorageJson(key, {});  // Empty object as fallback
}
```

### Example 3: Configuration Management

```typescript
interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const DEFAULT_CONFIG: AppConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
};

function loadConfig(): AppConfig {
  // Try localStorage first
  const stored = getLocalStorageJson<AppConfig>('app_config');
  if (stored) return stored;

  // Try environment variable
  const envConfig = import.meta.env.VITE_CONFIG;
  if (envConfig) {
    const parsed = safeJsonParse<AppConfig>(envConfig);
    if (parsed) return parsed;
  }

  // Fall back to default
  return DEFAULT_CONFIG;
}

function saveConfig(config: AppConfig): void {
  setLocalStorageJson('app_config', config);
}
```

---

## Migration Guide

### Migrating Existing Code

**Step 1**: Find all `JSON.parse()` calls
```bash
grep -r "JSON.parse" src/
```

**Step 2**: Replace with `safeJsonParse()`
```typescript
// Before
const data = JSON.parse(str);

// After
const data = safeJsonParse(str, null);
```

**Step 3**: Find all `response.json()` calls
```bash
grep -r "response.json()" src/
```

**Step 4**: Replace with `safeResponseJson()`
```typescript
// Before
const data = await response.json();

// After
const data = await safeResponseJson(response);
```

**Step 5**: Update localStorage operations
```typescript
// Before
localStorage.setItem('data', JSON.stringify(data));
const data = JSON.parse(localStorage.getItem('data'));

// After
setLocalStorageJson('data', data);
const data = getLocalStorageJson('data', defaultValue);
```

---

## Testing JSON Safety

### Manual Testing

1. **Corrupted localStorage**
   ```javascript
   // In browser console
   localStorage.setItem('user_data', 'invalid{json}');
   // App should handle gracefully
   ```

2. **Empty responses**
   ```typescript
   // Mock empty response
   const response = new Response('', {
     status: 200,
     headers: { 'content-type': 'application/json' }
   });
   const data = await safeResponseJson(response);
   console.log(data);  // Should be null, no error
   ```

3. **Non-JSON responses**
   ```typescript
   const response = new Response('<!DOCTYPE html>', {
     status: 200,
     headers: { 'content-type': 'text/html' }
   });
   const data = await safeResponseJson(response);
   console.log(data);  // Should be null, no error
   ```

---

## Debugging JSON Issues

### Console Logging

All safe functions log errors automatically:

```typescript
const data = safeJsonParse(invalidJson);
// Console output:
// Error parsing JSON: SyntaxError: Unexpected token...
// Invalid JSON string: {invalid}
```

### Custom Error Handling

For critical operations, add extra logging:

```typescript
const data = safeJsonParse<CriticalData>(jsonString);
if (!data) {
  console.error('CRITICAL: Failed to parse data');
  console.error('Input:', jsonString);
  // Alert ops team, log to monitoring service, etc.
}
```

---

## Performance Considerations

### When to Use Safe Functions

✅ **Always use for**:
- User input
- localStorage/sessionStorage
- API responses
- External data sources
- Configuration files
- Any untrusted data

⚠️ **Optional for**:
- Known-good data (imported constants)
- Build-time generated data
- Hardcoded JSON literals

### Performance Impact

```typescript
// Safe parsing adds ~0.1ms overhead
console.time('safe');
safeJsonParse(data);
console.timeEnd('safe');  // ~0.12ms

console.time('unsafe');
JSON.parse(data);
console.timeEnd('unsafe');  // ~0.02ms

// Trade-off: 0.1ms vs potential crash = Worth it!
```

---

## Checklist for Code Reviews

### JSON Safety Checklist

- [ ] No naked `JSON.parse()` calls
- [ ] No naked `JSON.stringify()` calls
- [ ] All `response.json()` replaced with `safeResponseJson()`
- [ ] localStorage JSON operations use safe utilities
- [ ] Fallback values provided for critical data
- [ ] Errors logged with context
- [ ] TypeScript types specified
- [ ] Null checks or optional chaining used

---

## FAQ

### Q: Should I replace ALL JSON.parse() calls?

**A**: Not necessarily. If you're parsing hardcoded constants or build-time data, native `JSON.parse()` is fine. But for any user data, localStorage, or API responses, use safe utilities.

### Q: What if I need custom error handling?

**A**: The safe functions return `null` on error. You can check for null and handle it:

```typescript
const data = safeJsonParse<Data>(str);
if (!data) {
  // Custom error handling
  throw new CustomError('Failed to parse');
}
```

### Q: Can I use these functions with async operations?

**A**: Yes! `safeResponseJson` is already async. For others:

```typescript
async function loadData() {
  const str = await fetchJsonString();
  return safeJsonParse(str, defaultValue);
}
```

### Q: What about sessionStorage?

**A**: Use the same localStorage utilities:

```typescript
// Instead of localStorage, use sessionStorage
const data = safeJsonParse(sessionStorage.getItem('key'));
sessionStorage.setItem('key', safeJsonStringify(data));
```

---

## Support

For questions or issues:
1. Check this guide
2. Review `JSON_AUDIT_REPORT.md`
3. Examine `/src/lib/json-utils.ts` source code
4. Ask the development team

---

**Last Updated**: 2025-10-24
**Version**: 1.0
**Status**: Production Ready
