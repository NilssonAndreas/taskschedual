<script>
  import { GanttChart } from "./gantt/ganttChart";
  import { db } from "../db";
  import { simpleScheduler } from "./HelperFunc/time";

  export let capacity = 0;
  /**
   * get tasks from database
   * @async
   */
  async function getTasks() {
    const tasks = await db.tasks
      .where("description")
      .startsWithIgnoreCase("")
      .and((item) => item.status !== "Completed")
      .sortBy("deadline");
    return tasks;
  }

  /**
   * create task arrays and build gantt chart
   * @async
   */
  async function createGantt() {
    const tasks = [];
    let taskDurations;
    let promise = getTasks();
    await promise.then((value) => {
      let counter = 1;
      for (const item of value) {
        tasks.push({ id: counter, name: item.description });
        counter++;
      }
      taskDurations = simpleScheduler(value, capacity);
      const ganttCharts = document.querySelectorAll("[role=gantt-chart]");
      ganttCharts.forEach((ganttChart) => {
        new GanttChart(ganttChart, tasks, taskDurations);
      });
    });
  }


  createGantt();

</script>

<div role="gantt-chart" />
