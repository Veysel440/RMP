import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabaseSync("chroniccare.db");

export function migrate() {
    db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS vitals(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      value REAL NOT NULL,
      unit TEXT NOT NULL,
      taken_at TEXT NOT NULL,
      note TEXT
    );
  `);
}
migrate();
