/**
 * JSON Utility Functions
 *
 * Safe JSON parsing and handling utilities to prevent
 * "Unexpected end of JSON input" and other JSON-related errors.
 */

/**
 * Safely parse JSON string with error handling
 *
 * @param jsonString - The JSON string to parse
 * @param fallback - Default value to return if parsing fails
 * @returns Parsed JSON object or fallback value
 */
export function safeJsonParse<T = any>(jsonString: string | null | undefined, fallback: T | null = null): T | null {
  if (!jsonString || jsonString.trim() === '') {
    return fallback;
  }

  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.error('Invalid JSON string:', jsonString);
    return fallback;
  }
}

/**
 * Safely stringify an object to JSON
 *
 * @param data - The data to stringify
 * @param fallback - Fallback string if stringification fails
 * @returns JSON string or fallback
 */
export function safeJsonStringify(data: any, fallback: string = '{}'): string {
  try {
    return JSON.stringify(data);
  } catch (error) {
    console.error('Error stringifying to JSON:', error);
    return fallback;
  }
}

/**
 * Safely parse a response body as JSON
 *
 * Checks response status and content-type before attempting to parse.
 * Prevents "Unexpected end of JSON input" errors from empty or non-JSON responses.
 *
 * @param response - Fetch API Response object
 * @returns Parsed JSON or null
 */
export async function safeResponseJson<T = any>(response: Response): Promise<T | null> {
  // Check if response has a body
  if (!response.body) {
    console.warn('Response has no body');
    return null;
  }

  // Don't attempt to parse empty responses (204, 205)
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  // Check content-type header
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    console.warn('Response is not JSON, content-type:', contentType);
    return null;
  }

  try {
    // Get the text first to handle empty bodies
    const text = await response.text();
    if (!text || text.trim() === '') {
      return null;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Error parsing response JSON:', error);
    return null;
  }
}

/**
 * Get item from localStorage and parse as JSON safely
 *
 * @param key - localStorage key
 * @param fallback - Default value if key doesn't exist or parsing fails
 * @returns Parsed value or fallback
 */
export function getLocalStorageJson<T = any>(key: string, fallback: T | null = null): T | null {
  try {
    const item = localStorage.getItem(key);
    return safeJsonParse<T>(item, fallback);
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

/**
 * Set item in localStorage as JSON safely
 *
 * @param key - localStorage key
 * @param value - Value to store
 * @returns true if successful, false otherwise
 */
export function setLocalStorageJson(key: string, value: any): boolean {
  try {
    const jsonString = safeJsonStringify(value);
    localStorage.setItem(key, jsonString);
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Validate if a string is valid JSON
 *
 * @param jsonString - String to validate
 * @returns true if valid JSON, false otherwise
 */
export function isValidJson(jsonString: string): boolean {
  if (!jsonString || jsonString.trim() === '') {
    return false;
  }

  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}
