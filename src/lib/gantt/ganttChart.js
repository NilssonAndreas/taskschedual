import { createHtmlContentFragment } from "./htmlContent";
import {
  monthDiff,
  dayDiff,
  getDaysInMonth,
  getDayOfWeek,
  createFormattedDateFromStr,
  createFormattedDateFromDate,
} from "./utils.js";
import { startTask } from "../HelperFunc/databseQuerys";

export function GanttChart(ganttChartElement, tasks, taskDurations) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const contentFragment = createHtmlContentFragment();

  // add date selector values (make current month selected)
  let monthOptionsHTMLStrArr = [];
  for (let i = 0; i < months.length; i++) {
    if (i == new Date().getMonth()){
      monthOptionsHTMLStrArr.push(`<option value="${i}" selected>${months[i]}</option>`);
    } else {
      monthOptionsHTMLStrArr.push(`<option value="${i}">${months[i]}</option>`);
    };
    
  }

  const currentYear = new Date().getFullYear()
  const endYear = currentYear + 4
  const years = [];
  for (let i = currentYear; i <= endYear; i++) {
    years.push(`<option value="${i}">${i}</option>`);
  }

  const fromSelectYear = contentFragment.querySelector("#from-select-year");
  const fromSelectMonth = contentFragment.querySelector("#from-select-month");
  const toSelectYear = contentFragment.querySelector("#to-select-year");
  const toSelectMonth = contentFragment.querySelector("#to-select-month");
 

  fromSelectMonth.innerHTML = `
      ${monthOptionsHTMLStrArr.join("")}
  `;
  fromSelectYear.innerHTML = `
      ${years.join("")}
  `;
  toSelectMonth.innerHTML = `
      ${monthOptionsHTMLStrArr.join("")}
  `;
  toSelectYear.innerHTML = `
      ${years.join("")}
  `;

  // create grid
  const containerTasks = contentFragment.querySelector(
    "#gantt-grid-container__tasks"
  );
  const containerTimePeriods = contentFragment.querySelector(
    "#gantt-grid-container__time"
  );

  function createGrid() {
    const startMonth = new Date(
      parseInt(fromSelectYear.value),
      parseInt(fromSelectMonth.value)
    );
    const endMonth = new Date(
      parseInt(toSelectYear.value),
      parseInt(toSelectMonth.value)
    );
    const numMonths = monthDiff(startMonth, endMonth) + 1;

    // clear first each time it is changed
    containerTasks.innerHTML = "";
    containerTimePeriods.innerHTML = "";

    createTaskRows();
    createMonthsRow(startMonth, numMonths);
    createDaysRow(startMonth, numMonths);
    createDaysOfTheWeekRow(startMonth, numMonths);
    createTaskRowsTimePeriods(startMonth, numMonths);
    addTaskDurations();
  }

  createGrid();

  ganttChartElement.appendChild(contentFragment);

  function createTaskRows() {
    const emptyRow = document.createElement("div");
    emptyRow.className = "gantt-task-row";
    // first 3 rows are empty
    for (let i = 0; i < 3; i++) {
      containerTasks.appendChild(emptyRow.cloneNode(true));
    }

    // add task select values
    let taskOptionsHTMLStrArr = [];

    tasks.forEach((task) => {
      const taskRowEl = document.createElement("div");
      taskRowEl.style.marginBottom ="5px"
      taskRowEl.id = task.id;
      taskRowEl.className = "gantt-task-row";
      const taskRowElInput = document.createElement("input");
      taskRowEl.appendChild(taskRowElInput);
      taskRowElInput.value = task.name;
      taskOptionsHTMLStrArr.push(
        `<option value="${task.id}">${task.name}</option>`
      );
      containerTasks.appendChild(taskRowEl);
    });
  }

  function createMonthsRow(startMonth, numMonths) {
    containerTimePeriods.style.gridTemplateColumns = `repeat(${numMonths}, 1fr)`;

    let month = new Date(startMonth);

    for (let i = 0; i < numMonths; i++) {
      const timePeriodEl = document.createElement("div");
      timePeriodEl.className = "gantt-time-period";
      // to center text vertically
      const timePeriodElSpan = document.createElement("span");
      timePeriodElSpan.innerHTML =
        months[month.getMonth()] + " " + month.getFullYear();
      timePeriodEl.appendChild(timePeriodElSpan);
      containerTimePeriods.appendChild(timePeriodEl);
      month.setMonth(month.getMonth() + 1);
    }
  }

  function createDaysRow(startMonth, numMonths) {
    let month = new Date(startMonth);

    for (let i = 0; i < numMonths; i++) {
      const timePeriodEl = document.createElement("div");
      timePeriodEl.className = "gantt-time-period";
      containerTimePeriods.appendChild(timePeriodEl);

      // add days as children
      const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);

      for (let i = 1; i <= numDays; i++) {
        let dayEl = document.createElement("div");
        dayEl.className = "gantt-time-period";
        const dayElSpan = document.createElement("span");
        dayElSpan.innerHTML = i;
        dayEl.appendChild(dayElSpan);
        timePeriodEl.appendChild(dayEl);
      }

      month.setMonth(month.getMonth() + 1);
    }
  }

  function createDaysOfTheWeekRow(startMonth, numMonths) {
    let month = new Date(startMonth);

    for (let i = 0; i < numMonths; i++) {
      const timePeriodEl = document.createElement("div");
      timePeriodEl.className = "gantt-time-period day";
      containerTimePeriods.appendChild(timePeriodEl);

      // add days of the week as children
      const currYear = month.getFullYear();
      const currMonth = month.getMonth() + 1;
      const numDays = getDaysInMonth(currYear, currMonth);

      for (let i = 1; i <= numDays; i++) {
        let dayEl = document.createElement("div");
        dayEl.className = "gantt-time-period";
        const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, i - 1);
        const dayElSpan = document.createElement("span");
        dayElSpan.innerHTML = dayOfTheWeek;
        dayEl.appendChild(dayElSpan);
        timePeriodEl.appendChild(dayEl);
      }

      month.setMonth(month.getMonth() + 1);
    }
  }

  function createTaskRowsTimePeriods(startMonth, numMonths) {
    const dayElContainer = document.createElement("div");
    dayElContainer.className = "gantt-time-period-cell-container";
    dayElContainer.style.gridTemplateColumns = `repeat(${numMonths}, 1fr)`;

    containerTimePeriods.appendChild(dayElContainer);

    tasks.forEach((task) => {
      let month = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const timePeriodEl = document.createElement("div");
        timePeriodEl.className = "gantt-time-period";
        dayElContainer.appendChild(timePeriodEl);

        const currYear = month.getFullYear();
        const currMonth = month.getMonth() + 1;

        const numDays = getDaysInMonth(currYear, currMonth);

        for (let i = 1; i <= numDays; i++) {
          let dayEl = document.createElement("div");
          dayEl.className = "gantt-time-period-cell";

          // color weekend cells differently
          const dayOfTheWeek = getDayOfWeek(currYear, currMonth - 1, i - 1);
          if (dayOfTheWeek === "S") {
            dayEl.style.backgroundColor = "#f7f7f7";
          }

          // add task and date data attributes
          const formattedDate = createFormattedDateFromStr(
            currYear,
            currMonth,
            i
          );
          dayEl.dataset.task = task.id;
          dayEl.dataset.date = formattedDate;
          

          timePeriodEl.appendChild(dayEl);
        }

        month.setMonth(month.getMonth() + 1);
      }
    });
  }

  function addTaskDurations() {
    taskDurations.forEach((taskDuration) => {
      const dateStr = createFormattedDateFromDate(taskDuration.start);
      // find gantt-time-period-cell start position
      const startCell = containerTimePeriods.querySelector(
        `div[data-task="${taskDuration.task}"][data-date="${dateStr}"]`
      );

      if (startCell) {
        // taskDuration bar is a child of start date position of specific task
        createTaskDurationEl(taskDuration, startCell);
      }
    });
  }


  // represent the task in grid
  function createTaskDurationEl(taskDuration, startCell) {
 
    const taskDurationEl = document.createElement("div");
    taskDurationEl.classList.add("taskDuration");
    taskDurationEl.id = taskDuration.id;

    const days = dayDiff(taskDuration.start, taskDuration.end);
    taskDurationEl.style.width = `calc(${days} * 100%)`;
    taskDurationEl.style.color = `white`;
    taskDurationEl.style.overflow = `hidden`;
    if ( taskDuration.valid == false) {
      taskDurationEl.style.background = 'red'
    };
    taskDurationEl.innerText = taskDuration.name

    if ( taskDuration.start < new Date()) {
      startTask(taskDuration.taskId)
    }


    // append at start pos
    startCell.appendChild(taskDurationEl);

    return days;
  }


  // re-create Grid if year / month selection changes
  fromSelectYear.addEventListener("change", createGrid);
  fromSelectMonth.addEventListener("change", createGrid);
  toSelectYear.addEventListener("change", createGrid);
  toSelectMonth.addEventListener("change", createGrid);



}