<!-- App.svelte -->
<script>
  import TaskAdder from "./lib/taskAdder.svelte";
  import TaskList from "./lib/taskList.svelte";
  import TimelineCalendar from "./lib/timelineCalendar.svelte";
  import SpecificTaskCard from "./lib/specificTaskCard.svelte";
  import UpdateTask from "./lib/updateTask.svelte";
  import { Drawer, Button } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  let hideTaskForm = true;
  let hideSpecificTaskCard = true;
  let showUpdateForm = true;
  let task;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
  let transitionParamsTop = {
    y: -320,
    duration: 200,
    easing: sineIn,
  };
</script>

<!-- Container for top buttons -->
<div class="flex-auto p-3">
  <Button outline color="dark" on:click={() => (hideTaskForm = false)}>
    Add task</Button
  >
  <Button outline color="dark">schedule</Button>
  <Button outline color="dark">Archive</Button>
  <Button outline color="dark">Import tasks</Button>
  <Button outline color="dark">Export tasks</Button>
</div>

<!-- Drawer for TaskAdder -->
<Drawer
  class="bg-blue-300"
  transitionType="fly"
  {transitionParams}
  bind:hidden={hideTaskForm}
  id="taskForm"
>
  <TaskAdder />
</Drawer>

<!-- Main div containing Task List -->
<div class="bg-gray-200">
  <TaskList bind:hiddenTask={hideSpecificTaskCard} bind:currentTask={task} />

  <!-- <TimelineCalendar/> -->
</div>

<!-- Drawer for specific Task -->
<Drawer
  placement="top"
  width="w-full"
  transitionType="fly"
  transitionParams={transitionParamsTop}
  bind:hidden={hideSpecificTaskCard}
  id="sidebar7"
>
  <SpecificTaskCard
    {task}
    bind:uppdateTaskForm={showUpdateForm}
    bind:hideSpecificTaskCard
  />
</Drawer>

<!-- Drawer for update Task form -->
<Drawer
  placement="left"
  transitionType="fly"
  {transitionParams}
  bind:hidden={showUpdateForm}
  id="sidebar7"
>
  <UpdateTask taskToUpdate={task} />
</Drawer>
