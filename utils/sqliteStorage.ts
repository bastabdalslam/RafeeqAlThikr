import { openDatabase } from 'expo-sqlite/next';

const db = openDatabase('rafeeqalthikr.db');

// Function to initialize the database table
async function initDatabase() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS key_value_store (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT
    );
  `);
}

// Initialize the database on module load
initDatabase();

// Custom storage object compatible with MMKV's basic interface (getString, set)
export const sqliteStorage = {
  /**
   * Retrieves a string value for a given key.
   * @param key The key to retrieve.
   * @returns The stored string value, or null if not found.
   */
  getString: async (key: string): Promise<string | null> => {
    try {
      const result = await db.getFirstAsync<{ value: string }>(
        'SELECT value FROM key_value_store WHERE key = ?',
        [key]
      );
      return result ? result.value : null;
    } catch (error) {
      console.error(`SQLite Error: Failed to get key "${key}"`, error);
      return null;
    }
  },

  /**
   * Sets a string value for a given key.
   * @param key The key to set.
   * @param value The string value to store.
   */
  set: async (key: string, value: string | boolean | number): Promise<void> => {
    const stringValue = typeof value === 'boolean' ? value.toString() : String(value);
    try {
      await db.runAsync(
        'INSERT OR REPLACE INTO key_value_store (key, value) VALUES (?, ?)',
        [key, stringValue]
      );
    } catch (error) {
      console.error(`SQLite Error: Failed to set key "${key}"`, error);
    }
  },

  /**
   * Deletes a key-value pair.
   * @param key The key to delete.
   */
  delete: async (key: string): Promise<void> => {
    try {
      await db.runAsync('DELETE FROM key_value_store WHERE key = ?', [key]);
    } catch (error) {
      console.error(`SQLite Error: Failed to delete key "${key}"`, error);
    }
  },
};

// Helper function to convert MMKV's getBoolean to use the new storage
// MMKV's getBoolean returns a boolean, while our getString returns a string or null.
export const getBooleanFromStorage = async (key: string): Promise<boolean | undefined> => {
  const value = await sqliteStorage.getString(key);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined; // MMKV returns undefined if key is not found
};
