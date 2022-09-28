<script>
  import { completeTask, deleteTask, updateProgress } from "./HelperFunc/databseQuerys";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Card,
    Button,
    Modal,
    Label,
    Input,
    Popover,
  } from "flowbite-svelte";
  export let task;
  export let uppdateTaskForm;
  export let hideSpecificTaskCard;
  let formModal = false;
  let deleteModal = false;
  let progressModal = false;
  let actualDurationModal = 0;
  let progressInHours = 0;
  let validationErrorOnComplete = false;
  let validationErrorOnProgress = false;

  async function completeTaskIfConfirmed(id) {
    if (actualDurationModal > 0) {
      validationErrorOnComplete = false;
      completeTask(id, actualDurationModal);
      hideSpecificTaskCard = true;
    } else {
      validationErrorOnComplete = true;
    }
  }

  async function addProgress() {
    if (progressInHours > 0) {
      validationErrorOnProgress = false;
      let duration = +task.elapsedtime + +progressInHours
      updateProgress(task.id, duration)
      hideSpecificTaskCard = true;
      task.elapsedTime = duration
    } else {
      validationErrorOnProgress = true;
    }
  }
</script>

<!-- Drop down Drawer for specific task card -->
<div class=" flex justify-center mb-5">
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
        <TableHeadCell>Elapsed time (Hours)</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        <TableBodyRow trClass="">
          <TableBodyCell>{task.startingtime}</TableBodyCell>
          <TableBodyCell>{task.deadline}</TableBodyCell>
          <TableBodyCell>{task.estimatedduration}</TableBodyCell>
          <TableBodyCell>{task.elapsedtime}</TableBodyCell>
          <TableBodyCell>{task.status}</TableBodyCell>
        </TableBodyRow>
      </TableBody>
    </Table>
  </Card>
</div>

<!-- Button for edeting task -->
<Button
  color="yellow"
  on:click={() => ((hideSpecificTaskCard = true), (uppdateTaskForm = false))}
>
  Edit
</Button>

<!-- Button for Complete -->
<Button color="green" on:click={() => (formModal = true)}>Complete</Button>

<!-- Button for Delete -->
<Button color="red" on:click={() => (deleteModal = true)}>Delete</Button>

<!-- Button for Adding progress -->
<Button color="blue" on:click={() => (progressModal = true)}
  >Add progress</Button
>

<!-- Popup for confirming complete task -->
<Modal
  bind:open={formModal}
  size="xs"
  autoclose={false}
  placement="bottom-center"
>
  <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
    How long did the task take?
  </h3>
  <Label class="space-y-2">
    <span>Actual Duration(Hours)</span>

    {#if validationErrorOnComplete}
      <Input
        type="number"
        color="red"
        placeholder="Enter duration"
        bind:value={actualDurationModal}
        id="number"
      />
      <Popover class="text-sm" triggeredBy="#number" placement="left">
        <div class="text-left">
          <li>Must be a number</li>
          <li>Value must be over 0</li>
        </div>
      </Popover>
    {:else}
      <Input
        type="number"
        bind:value={actualDurationModal}
        placeholder="Enter duration"
        required
        min="0"
      />
    {/if}
  </Label>
  <div>
    <Button color="green" on:click={() => completeTaskIfConfirmed(task.id)}
      >Complete</Button
    >
    <Button color="red" on:click={() => (formModal = false)}>Cancel</Button>
  </div>
</Modal>

<!-- Modal for confirming delete task -->
<Modal
  bind:open={deleteModal}
  size="xs"
  autoclose={false}
  placement="bottom-center"
>
  <h5>Are you sure you want to delete this task?</h5>
  <div>
    <Button
      color="green"
      on:click={() => (
        deleteTask(task.id),
        (deleteModal = false),
        (hideSpecificTaskCard = true)
      )}>Delete</Button
    >
    <Button color="red" on:click={() => (deleteModal = false)}>Cancel</Button>
  </div>
</Modal>

<!-- Modal for adding progress  -->
<Modal
  bind:open={progressModal}
  size="xs"
  autoclose={false}
  placement="bottom-center"
>
  <h5>How many hours do you want to add?</h5>
  {#if validationErrorOnProgress}
    <Input
      type="number"
      color="red"
      placeholder="Enter duration"
      bind:value={progressInHours}
      id="number"
    />
    <Popover class="text-sm" triggeredBy="#number" placement="left">
      <div class="text-left">
        <li>Must be a number</li>
        <li>Value must be over 0</li>
      </div>
    </Popover>
  {:else}
    <Input
      type="number"
      bind:value={progressInHours}
      placeholder="Enter duration"
      required
      min="0"
    />
  {/if}
  <div>
    <Button
      color="green"
      on:click={() => (addProgress())}
      >Add progress</Button
    >
    <Button color="red" on:click={() => (progressModal = false)}>Cancel</Button>
  </div>
</Modal>
