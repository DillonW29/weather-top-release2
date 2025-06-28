import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Set up file path and adapter
const file = './db.json';  // or './models/db.json' if you prefer nested location
const adapter = new JSONFile(file);
export const db = new Low(adapter);

// Initialize default structure if empty
await db.read();
db.data ||= { users: [], stations: [], reports: [] };
await db.write();
