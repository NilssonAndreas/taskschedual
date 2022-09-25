<!-- Adds task into db -->
<script>
  import { db } from "../db";
  import { formatDate } from "./HelperFunc/time";
  import { Label, Input, Select, Button, Helper } from "flowbite-svelte";

  // Sets MinTime in form to todays date.
  let minTime = formatDate(new Date());
  let description = null;
  let startTime = minTime;
  let deadline = null;
  let estimatedDuration;

  // CURRENT CATEGORYS ( SHOULD LATER BE ADDED AS TABLE IN DB )
  let category = [
    { value: "Work", name: "Work" },
    { value: "School", name: "School" },
    { value: "Home", name: "Home" },
    { value: "Kids", name: "Kids" },
    { value: "Sport", name: "Sport" },
  ];

  // Keeps track of invalid values in form
  let validationErrors = {
    description: false,
    startDate: false,
    deadline: false,
    estimatedDuration: false,
    selected: false,
  };

  // Value if category is selected
  let selected = null;
  const taskStatus = "Not started";

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

      description = "";
      startTime = minTime;
      deadline = null;
      estimatedDuration = null;
    } catch (error) {
      console.log("Error while adding task")
    }
  }

  //Takes array of strings
  // Sets value to true in validationError array
  function setValidationError(errorArray) {
    errorArray.forEach((name) => {
      validationErrors[name] = true;
    });
  }

  // Sets all values to false in ValidationError array
  function resetValidationError() {
    for (let [key, value] of Object.entries(validationErrors)) {
      validationErrors[key] = false;
    }
  }

  //Validate data from task form
  function validateTask() {
    resetValidationError();
    let isValid = true;
    let notValidarray = [];
    if (description == null || description == "") {
      isValid = false;
      notValidarray.push("description");
    }

    if (startTime == null) {
      isValid = false;
      notValidarray.push("startTime");
    }

    if (selected == null) {
      isValid = false;
      notValidarray.push("selected");
    }

    if (deadline == null || deadline < startTime) {
      isValid = false;
      notValidarray.push("deadline");
    }

    if (estimatedDuration <= 0) {
      isValid = false;
      notValidarray.push("estimatedDuration");
    }

    if (isValid == true) {
      resetValidationError();
      addTask();
    } else {
      setValidationError(notValidarray);
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
      <Select class="mt-2" items={category} bind:value={selected} />
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
      <Input id="StartTime" type="date" min={minTime} bind:value={startTime} />
    </Label>
    {#if validationErrors["startTime"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter Start time</Helper
      >
    {/if}
  </div>
  <!-- Deadline -->
  <div class="mt-6">
    <Label
      >Select deadline
      <Input id="deadline" type="date" min={startTime} bind:value={deadline} />
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
      placeholder="0"
      type="number"
      min="0"
      bind:value={estimatedDuration}
    />
    {#if validationErrors["estimatedDuration"]}
      <Helper class="mt-1" color="red"
        ><span class="font-bold text-sm">Error!</span> Enter a Estimated duration</Helper
      >
    {/if}
  </div>

  <!-- Button for submit -->
  <div class="mt-6 col-span-2 ">
    <Button gradient color="purple" size="xl" on:click={() => validateTask()}
      >Add task
    </Button>
  </div>
</div>
