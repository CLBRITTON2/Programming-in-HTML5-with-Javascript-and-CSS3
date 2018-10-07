/// <reference path="../HtmlTemplate.js" />
/// <reference path="../LocalStarStorage.js" />
/// <reference path="../datetime.js" />

//TODO: Import objects/functions from the modules/classes.
import { LocalStarStorage } from "../LocalStarStorage.js";
import { ScheduleItem } from "../ScheduleItem.js";

// TODO: Create a ScheduleList class

// TODO: Refactor these variables into properties of the ScheduleList class.
//       Assign them in the "initialize" method from arguments

const element, localStarStorage;

// TODO: Refactor these functions into methods of the ScheduleList class.

async function startDownload() {
    // await response of fetch call
    let response = await fetch("/schedule/list")
    // transform body to json
    let data = await response.json();

    // checking response is ok
    if (response.ok) {
        downloadDone(data);
    } else {
        downloadFailed();
    }
}

function downloadDone(responseData) {
    addAll(responseData.schedule);
}

function downloadFailed() {
    alert("Could not retrieve schedule data at this time. Please try again later.");
}

function addAll(itemsArray) {
    itemsArray.forEach(add); // TODO: When refactoring this, add the `this` argument to `forEach`.
}

function add(itemData) {
    const item = new ScheduleItem(itemData, localStarStorage);
    element.appendChild(item.element);
}

// TODO: Replace the following code by creating a ScheduleList object 
//       and calling the startDownload method.
element = document.getElementById("schedule");
localStarStorage = new LocalStarStorage(localStorage);
startDownload();















































































































































































































