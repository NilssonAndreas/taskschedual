import { db } from "../../db";
import { exportDB } from "dexie-export-import";
/**
   * Add task into databse
   * @async
   * @param { array }taskInformation
   */
export async function addTask(taskInformation) {
    try {
        const id = await db.tasks.add({
            description: taskInformation.description,
            category: taskInformation.selected,
            startingtime: taskInformation.startTime,
            deadline: taskInformation.deadline,
            estimatedduration: taskInformation.estimatedDuration,
            status: taskInformation.taskStatus,
            elapsedtime: taskInformation.elapsedTime,
        });

    } catch (error) {
        console.log("Error while adding task");
    }
}

/**
 * Uppdates values for specific task
 * @async
 * @param  {array} task
 */
export async function updateTask(task) {
    try {
        await db.tasks.update(task.id, {
            description: task.description,
            category: task.selected,
            startingtime: task.startTime,
            deadline: task.deadline,
            estimatedduration: task.estimatedDuration,
            elapsedtime: task.elapsedTime,
        })
    } catch (error) {
        console.error(error)
    }
}

/**
 * Sets status to complete for specific task
 * @async
 * @param  {number} id
 * @param  {number} duration
 */
export async function completeTask(id, duration) {
    try {
        await db.tasks.update(id, { status: "Completed", actualduration: duration })
    } catch (error) {
        console.error(error)
    }
}

/**
 * @async
 * @param  {number} id
 */
export async function deleteTask(id) {
    try {
        await db.tasks.delete(id)
    } catch (error) {
        console.error(error)
    }
}

/**
 * updated actual time for tasks
 * @async
 * @param  {number} id
 * @param  {number} duration
 */
export async function updateProgress(id, duration) {
    try {
        await db.tasks.update(id, { elapsedtime: duration })
    } catch (error) {
        console.error(error)
    }
}

/**
 * Functio for importing database from json blob.
 * @async
 * @param  {Blob} importFile
 */
export async function importTasks(importFile) {
    try {
        await db.import(importFile[0], { overwriteValues: true });
    } catch (error) {
        alert("Error, non valid file")
    }

}

/**
 * function for exporting database as json blob
 * @async
 */
export async function exportTasks() {
    const blob = await exportDB(db, { prettyJson: true });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tasks.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url); 
}
