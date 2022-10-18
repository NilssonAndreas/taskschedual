// Uses Dexie for easier handle
import Dexie from 'dexie';

export const db = new Dexie('taskDatabase');
db.version(2).stores({
  tasks: '++id, description, deadline, category, startingtime, estimatedduration, actualduration, status, elapsedtime',
  categories: '++id, name' // Primary key and indexed props
});

