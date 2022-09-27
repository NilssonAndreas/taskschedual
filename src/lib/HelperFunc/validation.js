/**
 * Validates task information
 * @param  {array} taskInformation
 */
export function validateTask(taskInformation) {
    let validationErrors = {
        description: false,
        startDate: false,
        deadline: false,
        estimatedDuration: false,
        selected: false,
      };
   
    if (taskInformation.description == null || taskInformation.description == "") {
        validationErrors.description = true
    }

    if (taskInformation.startTime == null || taskInformation.startTime == "") {
        validationErrors.startDate = true
    }

    if (taskInformation.selected == null) {
        validationErrors.selected = true
    }

    if (taskInformation.deadline == null || taskInformation.deadline < taskInformation.startTime || taskInformation.deadline == "") {
        validationErrors.deadline = true
    }

    if (taskInformation.estimatedDuration <= 0) {
        validationErrors.estimatedDuration = true
    }
    return validationErrors;
}