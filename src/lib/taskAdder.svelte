<!-- Adds task into db -->
<script>

import { db } from "../db";
import TaskList from "./taskList.svelte";
  
    let status = "";
    let description = "";

    async function clearTasks() {
      try{
        await db.tasks.clear()
        status = "Tasks successfully cleared"
      } catch (error) {
        status = "Error while clearing tasks"
      }
     

    }
    async function addTask() {
      try {
  
        const id = await db.tasks.add({
            description: description,
        });
        
        status = `Task ${description} successfully added. Got id ${id}`;

        description = "";
      } catch (error) {
        status = `Failed to add ${description}: ${error}`;
      }
    }
  </script>
  <div>
    <p>{status}</p>
    <fieldset>
      <legend>Add new task</legend>
      <label>
        Description:
        <input
            type="text"
            bind:value={description} />
      </label>
      <br/>
      <button on:click={addTask}>Add Task</button>
      <button on:click={clearTasks}>Clear Task</button>
    </fieldset>
  </div>
  