# JSON Safety - Quick Start

## 🚀 TL;DR

**Never use these again**:
- ❌ `JSON.parse()`
- ❌ `JSON.stringify()`
- ❌ `response.json()`

**Always use these instead**:
- ✅ `safeJsonParse()`
- ✅ `safeJsonStringify()`
- ✅ `safeResponseJson()`

---

## Import

```typescript
import {
  safeJsonParse,
  safeJsonStringify,
  safeResponseJson,
  getLocalStorageJson,
  setLocalStorageJson
} from '@/lib/json-utils';
```

---

## Common Patterns

### Parse JSON String
```typescript
const data = safeJsonParse<MyType>(jsonString, defaultValue);
```

### Stringify Object
```typescript
const json = safeJsonStringify(data);
```

### Fetch API
```typescript
const response = await fetch('/api/endpoint');
const data = await safeResponseJson<ApiType>(response);
```

### localStorage
```typescript
// Read
const data = getLocalStorageJson<Type>('key', defaultValue);

// Write
setLocalStorageJson('key', data);
```

---

## Why?

Prevents these errors:
- ❌ "Unexpected end of JSON input"
- ❌ "SyntaxError: Unexpected token"
- ❌ Application crashes from corrupted data

---

## Full Documentation

- **Complete Guide**: See `JSON_SAFETY_GUIDE.md`
- **Audit Report**: See `JSON_AUDIT_REPORT.md`
- **Test Cases**: See `src/lib/__tests__/json-utils.test.md`

---

## Questions?

1. Check `JSON_SAFETY_GUIDE.md` for examples
2. Look at `src/lib/json-utils.ts` for implementation
3. Ask the team

**That's it! Start using safe JSON today.** 🎉
