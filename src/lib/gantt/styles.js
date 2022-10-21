export function cssStyles() {
  const CELL_HEIGHT = 25;
  const outlineColor = "#e9eaeb";

  return `

    h1 {
      font-size: 1.5rem;
    }
    fieldset {
        border:none;
        padding: 0.5rem;
    }
    fieldset label {
      margin-right: 10px;
    }
    #date > label:nth-child(3) {
      margin-left: 10px;
    }
    #gantt-container {
      padding: 1rem;
    }
    #gantt-grid-container {
        display: grid;
        grid-template-columns: 150px 1fr;
        outline: 2px solid ${outlineColor};
    }
    #gantt-grid-container, #settings > fieldset,
    #add-task, #add-task-duration  {
      border-radius: 5px;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
    }
    #gantt-grid-container__time {
      display: grid;
      overflow-x: auto;
      padding-bottom: 2.5rem;
    }
    .gantt-task-row {
        outline: 0.5px solid ${outlineColor};
        text-align: center;
        height: ${CELL_HEIGHT}px;
        // expand across whole grid
        grid-column: 1/-1;
        width: 100%;
        border: none;
    }

    .gantt-task-row input {
      width: 127px;
      border: none;
      outline: none;
      background: none;
    }
   
    #gantt-grid-container__tasks .gantt-task-row {
      padding: 2px 0;
      
    }
    .gantt-time-period {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(30px, 1fr);
        text-align: center;
        height: ${CELL_HEIGHT}px;
    }
    .gantt-time-period span {
      margin: auto;
      
    }
    .gantt-time-period-cell-container {
      grid-column: 1/-1;
      display: grid;
      gap: 5px;
    }
    .gantt-time-period-cell {
      position: relative;
      outline: 0.5px solid ${outlineColor};
      
    }
    
    .day {
      color: #bbb;
    }
    #settings {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-bottom: 0.5rem;
    }
    .taskDuration {
      position: absolute;
      height: ${CELL_HEIGHT}px;
      z-index: 1;
      background: blue;
      border-radius: 5px;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
      
    }
    
    .tracker-period {
      padding: 1rem;
      display: flex; 
      flex-direction: row;
      justify-content: center;
      ;
    }
    .botcontainer {
      padding-bottom: 20px;
    }
  `;
}