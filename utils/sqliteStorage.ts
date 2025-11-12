import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('rafeeqalthikr.db');

// إنشاء الجدول داخل قاعدة البيانات
function initDatabase() {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS key_value_store (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT
      );`
    );
  });
}

// استدعاء التهيئة عند تحميل الملف
initDatabase();

// كائن التخزين المخصص
export const sqliteStorage = {
  // 📘 جلب قيمة حسب المفتاح
  getString: (key: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT value FROM key_value_store WHERE key = ?;',
          [key],
          (_, { rows }) => {
            if (rows.length > 0) {
              resolve(rows.item(0).value);
            } else {
              resolve(null);
            }
          },
          (_, error) => {
            console.error(`SQLite Error: Failed to get key "${key}"`, error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  // 📗 حفظ أو تعديل قيمة
  set: (key: string, value: string | boolean | number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const stringValue =
        typeof value === 'boolean' ? value.toString() : String(value);
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO key_value_store (key, value) VALUES (?, ?);',
          [key, stringValue],
          () => resolve(),
          (_, error) => {
            console.error(`SQLite Error: Failed to set key "${key}"`, error);
            reject(error);
            return false;
          }
        );
      });
    });
  },

  // 📕 حذف مفتاح
  delete: (key: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM key_value_store WHERE key = ?;',
          [key],
          () => resolve(),
          (_, error) => {
            console.error(`SQLite Error: Failed to delete key "${key}"`, error);
            reject(error);
            return false;
          }
        );
      });
    });
  },
};

// دالة مساعدة لتحويل القيم النصية إلى Boolean
export const getBooleanFromStorage = async (
  key: string
): Promise<boolean | undefined> => {
  const value = await sqliteStorage.getString(key);
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};
