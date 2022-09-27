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
    db.tasks.update(task.id, {
      desciption: task.desciption,
      deadline: task.deadline,
      startingtime: task.startingtime,
      categories: task.categories,
      estimatedduration: task.estimatedduration,
      actualduration: task.actualduration
    }).then(function (updated) {
      if (updated)
        console.log(task.id, "updated");
      else
        console.log("Nothing was updated");
    });
  }