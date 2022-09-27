<!-- Update task information -->
<script>
  import { formatDate } from "./HelperFunc/time";
  import { Label, Input, Select, Button, Helper } from "flowbite-svelte";
  import { validateTask } from "./HelperFunc/validation";
  import { addTask } from "./HelperFunc/databseQuerys";

  // Sets MinTime in form to todays date.
  let minTime = formatDate(new Date());

  export let taskToUpdate;
  let taskInformation = {
    description: taskToUpdate.description,
    startTime: minTime,
    deadline: taskToUpdate.deadline,
    estimatedDuration: taskToUpdate.estimatedDuration,
    selected: taskToUpdate.category,
    taskStatus: taskToUpdate.taskStatus,
  };

  // CURRENT CATEGORYS ( SHOULD LATER BE ADDED AS TABLE IN DB )
  let category = [
    { value: "Work", name: "Work" },
    { value: "School", name: "School" },
    { value: "Home", name: "Home" },
    { value: "Kids", name: "Kids" },
    { value: "Sport", name: "Sport" },
  ];

  // Keeps track of invalid values in form
  let validationErrors = {};

  /**
   *  add task to database if validated
   */
  function validateMyTask() {
    validationErrors = validateTask(taskInformation);
    let validated = Object.values(validationErrors).every(
      (value) => value === false
    );
    if (validated) {
      addTask(taskInformation);
      taskInformation = {
        description: null,
        startTime: minTime,
        deadline: null,
        estimatedDuration: null,
        selected: null,
        taskStatus: "Not started",
      };
    }
  }
</script>
<h5 class="underline font-bold mb-5">EDIT TASK</h5>
<div class="grid grid-cols-2 gap-4">
  
  <!-- Description -->
  <div class="mb-6">
    <Label for="description" class="block mb-2">Description</Label>
    <Input
      id="description"
      placeholder={taskToUpdate.description}
      bind:value={taskInformation.description}
    />
    {#if validationErrors["description"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Please enter a Description</Helper
      >
    {/if}
  </div>

  <!-- Category -->
  <div class="mb-6">
    <Label
      >Select category
      <Select
        class="mt-2"
        items={category}
        bind:value={taskInformation.selected}
      />
    </Label>
    {#if validationErrors["selected"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Choose category</Helper
      >
    {/if}
  </div>

  <!-- Starting Time -->
  <div class="mt-6">
    <Label
      >Select Start time
      <Input
        id="StartTime"
        type="date"
        placeholder={taskInformation.startTime}
        min={minTime}
        bind:value={taskInformation.startTime}
      />
    </Label>
    {#if validationErrors["startDate"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter Start time</Helper
      >
    {/if}
  </div>
  <!-- Deadline -->
  <div class="mt-6">
    <Label
      >Select Deadline
      <Input
        id="deadline"
        placeholder={taskToUpdate.deadline}
        type="date"
        min={taskInformation.startTime}
        bind:value={taskInformation.deadline}
      />
    </Label>
    {#if validationErrors["deadline"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter correct deadline</Helper
      >
    {/if}
  </div>

  <!-- Estimated duration -->
  <div class="mt-6 col-span-2">
 
    <Label for="Estimated Duration" class="block mb-2"
      >Estimated duration (hours)</Label
    >
    <Input
      id="Estimated Duration"
      placeholder={taskToUpdate.estimatedduration}
      type="number"
      min="0"
      bind:value={taskInformation.estimatedDuration}
    />
    {#if validationErrors["estimatedDuration"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter a Estimated duration</Helper
      >
    {/if}
  </div>

  <!-- Button for submit -->
  <div class="mt-6 col-span-2 ">
    <Button gradient color="purple" size="xl" on:click={() => validateMyTask()}
      >Edit Task 
    </Button>
  </div>
</div>
