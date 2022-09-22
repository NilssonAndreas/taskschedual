// Uses Dexie for easier handle
import Dexie from 'dexie';

export const db = new Dexie('taskDatabase');
db.version(1).stores({
  tasks: '++id, description, deadline, *categories, startingtime, estimatedduration, actualduration' // Primary key and indexed props
});
