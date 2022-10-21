import { cssStyles } from "./styles";

export function createHtmlContentFragment() {
  const content = `
  <style>
    ${cssStyles()}
  </style>

  <div class="tracker-period">                 
     
    <div>
          <div id="settings">
                <fieldset id="select-from">
                    <legend>From</legend>
                        <select id="from-select-month" name="from-select-month"></select>
                        <select id="from-select-year" name="from-select-year"></select>
                    </fieldset>
                
                    <fieldset id="select-to">
                        <legend>To</legend>
                        <select id="to-select-month" name="to-select-month"></select>
                        <select id="to-select-year" name="to-select-year"></select>
                    </fieldset>
              </div>
          </div>
    </div>
     <div class="botcontainer">
     
           <div id="gantt-container">
           <div id="gantt-grid-container">
             <div id="gantt-grid-container__tasks"></div>
             <div id="gantt-grid-container__time"></div>
    <div/>
  </div>
  `;

  // turn the HTML string into a document fragment
  const contentFragment = document
    .createRange()
    .createContextualFragment(content);
  return contentFragment;
}