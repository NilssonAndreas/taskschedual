<!-- App.svelte -->
<script>
  import TaskAdder from "./lib/taskAdder.svelte";
  import TaskList from "./lib/taskList.svelte";
  import Archive from "./lib/archive.svelte";
  import TimelineCalendar from "./lib/timelineCalendar.svelte";
  import SpecificTaskCard from "./lib/specificTaskCard.svelte";
  import UpdateTask from "./lib/updateTask.svelte";
  import { Drawer, Button, Modal } from "flowbite-svelte";
  import { sineIn } from "svelte/easing";
  import { exportTasks, importTasks } from "./lib/HelperFunc/databseQuerys";
  let hideTaskForm = true;
  let hideSpecificTaskCard = true;
  let hideUpdateForm = true;
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
  let exportModal = false;
  let importModal = false;
  let files;
  let showArchive = false;
</script>

<!-- Container for top buttons -->
<div class="flex-auto p-3">
  <Button outline color="dark" on:click={() => (hideTaskForm = false)}>
    Add task</Button
  >
  <Button outline color="dark">schedule</Button>
  {#if showArchive}
    <Button outline color="dark" on:click={() => (showArchive = false)}
    >Tasks</Button
  >
  {:else}
    <Button outline color="dark" on:click={() => (showArchive = true)}
      >Archive</Button
    >
  {/if}

  <Button outline color="dark" on:click={() => (importModal = true)}
    >Import tasks</Button
  >
  <Button outline color="dark" on:click={() => (exportModal = true)}
    >Export tasks</Button
  >
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
  {#if showArchive}
    <Archive />
  {:else}
    <TaskList bind:hiddenTask={hideSpecificTaskCard} bind:currentTask={task} />
  {/if}

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
    bind:uppdateTaskForm={hideUpdateForm}
    bind:hideSpecificTaskCard
  />
</Drawer>

<!-- Drawer for update Task form -->
<Drawer
  placement="left"
  transitionType="fly"
  {transitionParams}
  bind:hidden={hideUpdateForm}
  id="sidebar7"
>
  <UpdateTask bind:uppdateTaskForm={hideUpdateForm} taskToUpdate={task} />
</Drawer>

<!-- Modal for confirm Export -->
<Modal
  bind:open={exportModal}
  size="xs"
  autoclose={false}
  placement="top-center"
>
  <h5>Are you sure you want to export your tasks?</h5>
  <div>
    <Button
      color="green"
      on:click={() => (exportTasks(), (exportModal = false))}>Confirm</Button
    >
    <Button color="red" on:click={() => (exportModal = false)}>Abort</Button>
  </div>
</Modal>

<Modal
  bind:open={importModal}
  size="xs"
  autoclose={false}
  placement="top-center"
>
  <h5>Chose file to import from.</h5>
  <input bind:files type="file" />
  <div>
    <Button
      color="green"
      on:click={() => (importTasks(files), (importModal = false))}
      >Confirm</Button
    >
    <Button color="red" on:click={() => (importModal = false)}>Abort</Button>
  </div>
</Modal>
