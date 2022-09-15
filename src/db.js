// Uses Dexie for easier handle
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  tasks: '++id, description', // Primary key and indexed props
});
