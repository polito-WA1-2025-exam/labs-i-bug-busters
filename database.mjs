import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Apri il database
const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database
});

// Creazione della tabella se non esiste
await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        allergies TEXT DEFAULT '',
        shoppingCart TEXT DEFAULT '',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

export default db;