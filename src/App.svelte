<!-- App.svelte -->
<script>
  import TaskAdder from "./lib/taskAdder.svelte";
  import TaskList from "./lib/taskList.svelte";
</script>

<div class="flex flex-col gap-x-5 lg:flex-row ">
  <div>
    <h1 >Form</h1>
    <div class="bg-gray-300 p-10 rounded border-4 border-black ">
    
      <!-- Form for adding Tasks -->
      <TaskAdder />
    </div>
  </div> 
  <div>
    <h1>List</h1>
    <div class="bg-gray-300 p-10 rounded border-4 border-black">
      <!-- List for showing tastsk -->
      <TaskList />
    </div>
  </div> 
</div>