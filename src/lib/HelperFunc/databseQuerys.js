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

/**
 * function for adding categories
 * @async
 * @param  {string} categoryname
 */
export async function addCategory(categoryname) {
    try {
        const id = await db.categories.add({
            name: categoryname
        });

    } catch (error) {
        console.log("Error while adding category");
    }
}

/**
 * function for deleting categories
 * @async
 * @param  {string} name
 */
 export async function deleteCategory(name) {
    try {
        await db.categories.where("name").equals(name).delete()
    } catch (error) {
        console.error(error)
    }
}

 /**
* function for getting categories from db.
* @async
* @return  { array } category
*/
export async function getCategories() {
 let category = [
   { value: "Work", name: "Work" },
   { value: "School", name: "School" },
   { value: "Home", name: "Home" },
 ];
 await db.categories
   .where("name")
   .startsWithIgnoreCase("")
   .toArray(function (categories) {
     categories.forEach((element) => {
       const newItem = { value: element.name, name: element.name };
       category.push(newItem);
     });
   });
 return category;
}