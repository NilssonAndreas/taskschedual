<!-- FriendList.svelte -->
<script>
    import { liveQuery } from "dexie";
    import { db } from "../db";
  
    let tasks = liveQuery(
      () => db.tasks.toArray()
    );
  
  </script>
  <ul>
    {#if $tasks}
      {#each $tasks as task (task.id)}
        <li>{task.description}</li>
      {/each}
    {/if}
  </ul>
  
  