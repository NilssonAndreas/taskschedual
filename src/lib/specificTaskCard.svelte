<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Card,
    Button,
  } from "flowbite-svelte";
  export let task;
  export let uppdateTaskForm;
  export let hideSpecificTaskCard;

</script>

<!-- Drop down Drawer from edeting task status -->
<div class=" flex justify-center ">
<Card size="xl">
 
  <h5
    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center"
  >
    {task.description}
  </h5>
  <Table>
    <TableHead>
      <TableHeadCell>Start time</TableHeadCell>
      <TableHeadCell>Deadline</TableHeadCell>
      <TableHeadCell>Estimated duraion (Hours)</TableHeadCell>
      <TableHeadCell>Elapsed time</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      <TableBodyRow trClass="">
        <TableBodyCell>{task.startingtime}</TableBodyCell>
        <TableBodyCell>{task.deadline}</TableBodyCell>
        <TableBodyCell> {task.estimatedduration}</TableBodyCell>
        <TableBodyCell>PLACEHOLDER</TableBodyCell>
        <TableBodyCell>{task.status}</TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>

</Card>
</div>
<Button color= "yellow" on:click={() => ( hideSpecificTaskCard = true, uppdateTaskForm = false )}> Edit</Button>
<Button color= "green" on:click={() => ( hideSpecificTaskCard = true )}> Complete</Button>
<Button color= "red" on:click={() => ( hideSpecificTaskCard = true )}> Delete</Button>