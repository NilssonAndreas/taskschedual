import { db } from "../../db";
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
            estimatedduration: task.estimatedDuration
        })
    } catch (error) {
        console.log(error)
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
        console.log(error)
    }
}


