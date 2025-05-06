import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'data', 'statusstack.db');
const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

export default db;