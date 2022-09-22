<!-- Adds task into db -->
<script>
  import { db } from "../db";
  import { formatDate } from "./HelperFunc/time";
  import { Label, Input, Select, Button, Helper } from "flowbite-svelte";

  let minTime = formatDate(new Date());
  let status;
  let description = null;
  let startTime = minTime;
  let deadline = null;
  let category = [
    { value: "Work", name: "Work" },
    { value: "School", name: "School" },
    { value: "Home", name: "Home" },
    { value: "Kids", name: "Kids" },
    { value: "Sport", name: "Sport" },
  ];
  let selected = null;
  const taskStatus = "Not started";
  let estimatedDuration;
  let visible = false;

  // Clear all tasks
  async function clearTasks() {
    try {
      await db.tasks.clear();
      status = "Tasks successfully cleared";
    } catch (error) {
      status = "Error while clearing tasks";
    }
  }

  // Add task into databse
  async function addTask() {
    try {
      const id = await db.tasks.add({
        description: description,
        category: selected,
        startingtime: startTime,
        deadline: deadline,
        estimatedduration: estimatedDuration,
        status: taskStatus,
      });

      status = `Task ${description} successfully added. Got id ${id}`;
      description = "";
      startTime = null;
      deadline = null;
      estimatedDuration = null;
    } catch (error) {
      status = `Failed to add ${description}: ${error}`;
    }
  }

  //Validate data from task form
  async function validateTask(description, startTime, deadline) {
    if (
      description == null ||
      description == "" ||
      startTime == null ||
      deadline == null ||
      category == null ||
      estimatedDuration <= 0
    ) {
      visible = true;
    } else {
      addTask();
      visible = false;
    }
  }
</script>

<div class="grid grid-cols-2 gap-4">
  <!-- Description -->
  <div class="mb-6">
    <Label for="description" class="block mb-2">Description</Label>
    <Input
      id="description"
      placeholder="Enter description"
      bind:value={description}
    />
  </div>

  <!-- Category -->
  <div class="mb-6">
    <Label
      >Select category
      <Select class="mt-2" items={category} bind:value={selected} />
    </Label>
  </div>

  <!-- Starting Time -->
  <div class="mt-6">
    <Label
      >Select Start time
      <Input id="StartTime" type="date" min={minTime} bind:value={startTime} />
    </Label>
  </div>
  <!-- Deadline -->
  <div class="mt-6">
    <Label
      >Select deadline
      <Input id="deadline" type="date" min={startTime} bind:value={deadline} />
    </Label>
  </div>

  <!-- Estimated duration -->
  <div class="mt-6 col-span-2">
    <Label for="Estimated Duration" class="block mb-2"
      >Estimated duration (hours)</Label
    >
    <Input
      id="Estimated Duration"
      placeholder="0"
      type="number"
      min="0"
      bind:value={estimatedDuration}
    />
  </div>

  <!-- Button for submit -->
  <div class="mt-6 col-span-2 ">
    <Button
      gradient
      color="purple"
      size="xl"
      on:click={() => validateTask(description, startTime, deadline)}
      >Add task
    </Button>
  </div>

  {#if visible}
    <div class="mt-6 col-span-2 ">
      <Helper class="mt-2" color="red"
        ><span class="font-bold text-xl">Error!</span> Some value is missing.</Helper
      >
    </div>
  {/if}
</div>
