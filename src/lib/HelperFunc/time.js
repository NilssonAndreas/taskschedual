// Helper functions for handeling dates and time

/**
 * add days to date
 * @param  {number} days
 * @param  {string} date
 */
export function addDays(days, date) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

/**
 * calculate timeperiod and save leftOverTime
 * @param  {number} duration
 * @param  {number} workHours
 */
export function calculateDaysAndRest(duration, workHours) {
    let daysAndRest = duration / workHours
    const wholeDays = Math.trunc(daysAndRest);
    const timeLeftOver = getDecimalNumber(daysAndRest);
    return { days: wholeDays, rest: timeLeftOver }
}



/**
 * Get Todays date as yyyy-mm-dd
 * @param  {Date} date
 */
export function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * Not in use Still small buggs
 * calculate duration / workdayHours return complete dates
 * @param  {number} workdayHours
 * @param  {array} taskArray
 */
// export function durationScheduel(taskArray, workdayHours) {
//     let scheduledTasks = []
//     let availableStartDate = new Date(taskArray[0].startingtime);
//     let leftOverTime = 0;
//     let counter = 0;
//     let rest = 0;
//     let extraDay = 0;
//     for (let i = 0; i < taskArray.length; i++) {


//         let itemDuration = taskArray[i].estimatedduration
//         if (rest > 0) {
//             itemDuration = rest
//             console.log(i, "rest > 0 ", rest)
//             rest = 0;
//         }
//         if (leftOverTime > 0) {
//             console.log(i, "KOLLA HÄR:: leftover: ", leftOverTime, "Duration: ",itemDuration)
//             rest = itemDuration - leftOverTime;
//             console.log("EFTER BLIR DET REST: ",rest)
//             leftOverTime = 0;
//             if (rest == 0) {
//                 console.log(i, "XXXXXXXXXXXXXXXXXXXXXXXXXX")
//                 counter++;
//                 let startDate = formatDate(availableStartDate)
//                 let endDate = new Date (startDate)
//                 let withinDeadline = checkIfWithinDeadline(endDate, taskArray[i].deadline)

//                 let data = {
//                     id: counter,
//                     start: new Date(startDate),
//                     end: endDate,
//                     task: counter,
//                     name: taskArray[i].description,
//                     valid: withinDeadline
//                 }

//                 console.log("rest: ",rest, "leftover: ",leftOverTime)
//                 availableStartDate = addDays(1, startDate )
//                 scheduledTasks.push(data)
//                 console.log(i, "INNE I LEFTOVER OCH REST = 0", availableStartDate, endDate)
//                 console.log(i, rest, leftOverTime, extraDay)
//                 extraDay = 0;
//                 continue;
//             } else {
//                 console.log(i, "INNE I  i- 1 OMloop")
//                 extraDay = 1;
//                 i -= 1;
//                 continue;
//             }

//         }

//         let timePeriod = calculateDaysAndRest(itemDuration, workdayHours)
//         let startDate = formatDate(availableStartDate)
//         let endDate; 
//         if (timePeriod.rest > 0) {

//             console.log(i, "Inne i rest > 0 ")
//             console.log(i, rest, timePeriod.rest)
//             leftOverTime = workdayHours * timePeriod.rest;
//             leftOverTime = workdayHours - leftOverTime;
//         }

//         console.log(i, timePeriod.days, "NY")
//         if ( timePeriod.days == 0) {
//            console.log(i, "INGA DAGAR ATT LÄGGA TILL")

//            if ( timePeriod.rest > 0 ) {
//             console.log(i, "INGA DAGAR MEN REST", timePeriod.rest, itemDuration)
//                 if ( extraDay > 0) {
//                     endDate = addDays(1, startDate)
//                     extraDay = 0;
//                 } else {
//                     endDate = new Date (startDate)
//                 }

//                 availableStartDate = endDate
//            } else {
//             console.log(i, "INGA DAGAR INGEN REST")
//                 endDate = addDays(1, startDate)
//                 availableStartDate = endDate
//            }

//         } else {
//             // HÄR ÄR VI OM VI LÄGGER TILL DAGAR
//             console.log(i, "DAGAR ATT LÄGGA TILL")
//             if ( timePeriod.rest > 0 ) {
//                 if ( timePeriod.days <= 1) {
//                     console.log(i, "NU ÄR JAG HÄR, kolla rest", timePeriod.rest)
//                     endDate = addDays(timePeriod.days + 1, startDate)
//                     availableStartDate = endDate
//                 } else {
//                     console.log(i, "STÖRRE ÄN 1 DAGAR", timePeriod.days)
//                     endDate = addDays(timePeriod.days, startDate)
//                     availableStartDate = endDate
//                 }

//            } else {
//             console.log(i, "NEJ DU ÄR HÄR", timePeriod.days, "DAGAR ATT LÄGGA TILL")
//                 if ( timePeriod.days <= 1) {
//                     endDate = new Date(startDate)
//                     availableStartDate = addDays(1, startDate)
//                 } else {

//                     endDate = addDays(timePeriod.days -1, startDate)
//                     console.log(i, "SISTA GÅNGEN NU SKA VARA EFTER NEJ DU ÄR HÄR")
//                     availableStartDate = addDays(1, formatDate(endDate) )
//                 }
//            }


//         }
//         console.log(i, "SLUTET: ", extraDay)
//         counter++;
//         let withinDeadline = checkIfWithinDeadline(endDate, taskArray[i].deadline)
//         let data = {
//             id: counter,
//             start: new Date(startDate),
//             end: endDate,
//             task: counter,
//             name: taskArray[i].description,
//             valid: withinDeadline
//         }

//         scheduledTasks.push(data);

//     }


//     return scheduledTasks;
// }

export function checkIfWithinDeadline(complete, deadline) {

    deadline = addDays(1, deadline)

    let valid = false;

    if (deadline > complete) {
        valid = true;
    }
    return valid
}

/**
 * simply shows all tasks in a timeline
 * @param  {array} taskArray
 * @param  {number} workdayHours
 */
export function simpleScheduler(taskArray, workdayHours) {
    let scheduledTasks = [
    ]
    let counter = 0;
    for (const item of taskArray) {
        
        let startTime = item.startingtime;
        
        let timePeriod = calculateDaysAndRest(item.estimatedduration, workdayHours)
        let days = timePeriod.days
        if ( timePeriod.rest > 0) {
            days += 1;
        };
        console.log(days)
        let completedAt;
        if ( days <= 1) {
            completedAt = new Date(startTime);
        } else {
            completedAt = addDays(days -1, startTime)
        }
        
        counter++;
        let beforeDeadline = checkIfWithinDeadline(completedAt, item.deadline)
        let data = {
            id: counter,
            start: new Date(startTime),
            end: completedAt,
            task: counter,
            name: item.description,
            valid: beforeDeadline,
            taskId: item.id
        }
        scheduledTasks.push(data);
    }

    return scheduledTasks;
}

/**
 * returns the decimal numbers of num
 * @param  {number} num
 */
function getDecimalNumber(num) {
    if (Number.isInteger(num)) {
        return 0;
    }

    const decimalStr = num.toString().split('.')[1];
    const finalStr = "0." + decimalStr;
    return Number(finalStr);
}