// Helper functions for handeling dates and time

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
export function dateDiffInDays(dateA, dateB) {
    const test = new Date(dateA)
    const test2 = new Date(dateB)
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(test.getFullYear(), test.getMonth(), test.getDate());
  const utc2 = Date.UTC(test2.getFullYear(), test2.getMonth(), test2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

// Get todays date as yyyy-mm-dd
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
