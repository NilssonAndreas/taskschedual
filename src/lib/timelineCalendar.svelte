<script>

    import Scheduler from "./scheduler.svelte";
  
</script>

<div class="gantt">
  <!-- (A) FIRST ROW : DAYS -->
  <div class="head">Mon</div>
  <div class="head">Tue</div>
  <div class="head">Wed</div>
  <div class="head">Thur</div>
  <div class="head">Fri</div>
  <div class="head">Sat</div>
  <div class="head">Sun</div>

  <!-- (B) FOLLOWING : TASKS -->
  
  <div style="background: #ffdddd; grid-row: 2; grid-column: 1 / span 2">
    Ett
  </div>
  <div style="background: #d6ffd8; grid-row: 3; grid-column: 3 / span 3">
    Två
  </div>
  <div style="background: #e2e5ff; grid-row: 4; grid-column: 5 / span 3">
    Tre
  </div>

  <div style="background: #e2e5ff; grid-row: 5; grid-column: 1 / span 3">
      test
  </div>
</div>

<div>
    <Scheduler />
</div>
<style>
  .gantt {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    /* (A2) "TIMELINE" */
    background: repeating-linear-gradient(
      to right,
      #f2f2f2,
      #ddd 2px,
      #fff 2px,
      #fff 14.25%
    );
  }
  /* (B) CELLS */
  /* (B1) SHARED CELLS */
  .gantt div {
    padding: 10px;
  }

  /* (B2) HEADER CELLS */
  .gantt .head {
    text-align: center;
    font-weight: 700;
    color: #fff;
    background: #103a99;
  }
</style>
