<!-- FriendList.svelte -->
<script>
  import { liveQuery } from "dexie";
  import { db } from "../db";
  import { sineIn } from "svelte/easing";
  import { dateDiffInDays } from "./HelperFunc/time";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Button,
    Drawer,
    CloseButton,
    Card,
  } from "flowbite-svelte";

  let searchTerm = "";
  let currentTask;
  let currentDiff;
  $: tasks = liveQuery(() =>
    db.tasks
      .where("description")
      .startsWithIgnoreCase(searchTerm)
      .and((item) => item.status !== "completed")
      .sortBy("deadline")
  );

  let hiddenTask = true;
  let transitionParamsTop = {
    y: -320,
    duration: 200,
    easing: sineIn,
  };

  // Get information about single task
  async function handleTaskById(task) {
    try {
      hiddenTask = false;
      currentTask = task;
      currentDiff = dateDiffInDays(task.startingtime, task.deadline);
      console.log(task.id);
    } catch (error) {
      console.log("Error Error");
    }
  }
</script>

<!-- Loop entries from database -->
<Table>
  <TableSearch
    placeholder="Search by description"
    color="purple"
    hoverable={true}
    bind:inputValue={searchTerm}
  >
    <TableHead>
      <TableHeadCell>Description</TableHeadCell>
      <TableHeadCell>category</TableHeadCell>
      <TableHeadCell>Deadline</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Edit</TableHeadCell>
    </TableHead>

    <TableBody class="divide-y">
      {#each $tasks || [] as task (task.id)}
        <TableBodyRow trClass="">
          <TableBodyCell>{task.description}</TableBodyCell>
          <TableBodyCell>{task.category}</TableBodyCell>
          <TableBodyCell>{task.deadline}</TableBodyCell>
          <TableBodyCell>{task.status}</TableBodyCell>
          <TableBodyCell
            ><Button
              size="xs"
              outline
              gradient
              color="purpleToPink"
              on:click={() => handleTaskById(task)}>Edit</Button
            ></TableBodyCell
          >
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>
</Table>

<!-- Drop down Drawer from edeting task status -->
<Drawer
  placement="top"
  width="w-full"
  transitionType="fly"
  transitionParams={transitionParamsTop}
  bind:hidden={hiddenTask}
  id="sidebar7"
>
  <Card size="xl">
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
    >
      {currentTask.description}
    </h5>
    <Table>
      <TableHead>
        <TableHeadCell>Start time</TableHeadCell>
        <TableHeadCell>Deadline</TableHeadCell>
        <TableHeadCell>Estimated duraion (Hours)</TableHeadCell>
        <TableHeadCell>Actual duraion</TableHeadCell>
        <TableHeadCell>Elapsed time (days)</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        <TableBodyRow trClass="">
          <TableBodyCell>{currentTask.startingtime}</TableBodyCell>
          <TableBodyCell>{currentTask.deadline}</TableBodyCell>
          <TableBodyCell>{currentTask.estimatedduration}</TableBodyCell>
          <TableBodyCell>PLACEHOLDER</TableBodyCell>
          {#if dateDiffInDays(currentTask.startingtime, new Date()) > 0}
            <TableBodyCell
              >{dateDiffInDays(
                currentTask.startingtime,
                new Date()
              )}</TableBodyCell
            >
          {:else}
            <TableBodyCell>0</TableBodyCell>
          {/if}
          <TableBodyCell>{currentTask.status}</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  </Card>

  <Button color="light" href="/">Edit status</Button>
  <CloseButton
    on:click={() => (hiddenTask = true)}
    class="mb-4 dark:text-white"
  />
</Drawer>
