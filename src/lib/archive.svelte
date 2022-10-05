<!-- Lists all tasks that are not -->
<script>
  import { liveQuery } from "dexie";
  import { db } from "../db";
  import { deleteTask } from "./HelperFunc/databseQuerys";
  import {
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Button,
  } from "flowbite-svelte";
  export let currentTask = {};
  let searchTerm = "";

  $: completedTasks = liveQuery(() =>
    db.tasks
      .where("description")
      .startsWithIgnoreCase(searchTerm)
      .and((item) => item.status == "Completed")
      .sortBy("deadline")
  );

  export let hiddenTask = true;

</script>

<!-- Loop entries from database into table -->
<TableSearch
  placeholder="Search by description"
  color="purple"
  hoverable={true}
  bind:inputValue={searchTerm}
>
  <TableHead>
    <TableHeadCell>Description</TableHeadCell>
    <TableHeadCell>category</TableHeadCell>
    <TableHeadCell>Estimated time</TableHeadCell>
    <TableHeadCell>Actual time</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableHeadCell></TableHeadCell>
  </TableHead>

  <TableBody class="divide-y">
    {#each $completedTasks || [] as task (task.id)}
      <TableBodyRow trClass="">
        <TableBodyCell>{task.description}</TableBodyCell>
        <TableBodyCell>{task.category}</TableBodyCell>
        <TableBodyCell>{task.estimatedduration}</TableBodyCell>
        <TableBodyCell>{task.actualduration}</TableBodyCell>
        <TableBodyCell>{task.status}</TableBodyCell>
        <TableBodyCell
          ><Button
            size="xs"
            color="red"
            on:click={() => deleteTask(task.id)}>Delete</Button
          ></TableBodyCell
        >
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
