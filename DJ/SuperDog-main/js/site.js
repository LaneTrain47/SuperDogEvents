// events is an array that is set up with preset objects.
let events = [{
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "6/01/2017",
}, {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "6/01/2018",
}, {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "6/01/2019",
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "6/01/2017",
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "6/01/2018",
}, {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "6/01/2019",
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "6/01/2017",
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "6/01/2018",
}, {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "6/01/2019",
}, ];

// filtedEvent is a placeholder that holds events for future code
let filteredEvents = events;

// this is made so that the webpage can onload the functions as one whole wrapper function
function displayAllData() {
    displayDropDown();
    displayEvents();
    buildDropDown();
}

// saveEventData is a function that adds another object to the array
function saveEventData() {

    // this takes the current array in the local storage and sets it to currentEvents
    let currentEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;

    // this sets up a new object so you can put values to it
    let newObject = {};

    // this puts the name and city for the event and saved them as part of an object
    newObject["event"] = document.getElementById("newEventName").value;
    newObject["city"] = document.getElementById("newEventCity").value;

    // this sets the variable state as the name and not the value or the acronym 
    let state = document.getElementById("newEventState");
    newObject["state"] = state.options[state.selectedIndex].text;

    // this sets the attendance as an integer and not a string thats attached to the value
    newObject["attendance"] = parseInt(document.getElementById("newEventAttendance").value);

    // this takes the date and puts it in the same format as the others on the webpage
    let eventDate = document.getElementById("newEventDate").value;
    let eventDate2 = `${eventDate} 00:00`
    newObject["date"] = new Date(eventDate2).toLocaleDateString();

    // this pushes the object to the array and saves to the localStorage
    currentEvents.push(newObject);
    localStorage.setItem("eventsArray", JSON.stringify(currentEvents));

    // this runs the function that runs all the other display functions
    displayAllData();
}

// displays the events
function displayEvents() {

    // this sets the tableBody as the id of the table that is to be displayed
    let tableBody = document.getElementById("results");

    // this grabs the template in the html and sets it to a variable
    let templateRow = document.getElementById("sdTemplate");

    // this makes sure the tableBody is empty before putting things in
    tableBody.innerHTML = '';

    // this makes currentEvents equal the events stored in the localStorage and if there isn't anything
    // sets currentEvents to the global array
    let currentEvents = JSON.parse(localStorage.getItem("eventsArray"));
    if (currentEvents == null) {
        currentEvents = events;
    }

    // this runs through every element stored in the array
    for (let i = 0; i < currentEvents.length; i++) {

        // grabs the template
        let tableRow = document.importNode(templateRow.content, true);

        // grabs on the columns in the template
        let rowCols = tableRow.querySelectorAll("td");

        // sets a different value of a single object in different columns
        rowCols[0].textContent = currentEvents[i].event;
        rowCols[1].textContent = currentEvents[i].city;
        rowCols[2].textContent = currentEvents[i].state;
        rowCols[3].textContent = currentEvents[i].attendance;
        rowCols[4].textContent = currentEvents[i].date;

        tableBody.appendChild(tableRow);
    }
}

function displayDropDown() {

    // creates variables to be used and set to be compared to other attributes in the array
    let totalAttendance = 0;
    let leastAttended = filteredEvents[0].attendance;
    let mostAttended = filteredEvents[0].attendance;

    // for every element in the array, it goes through and checks 
    for (let i = 0; i < filteredEvents.length; i++) {

        // this adds every attendance value in the array to a total
        totalAttendance += filteredEvents[i].attendance;

        // this checks if the array value is bigger and smaller than the stored values
        if (filteredEvents[i].attendance >= mostAttended) {
            mostAttended = filteredEvents[i].attendance;
        } else {
            mostAttended = mostAttended;
        }
        if (filteredEvents[i].attendance <= leastAttended) {
            leastAttended = filteredEvents[i].attendance;
        } else {
            leastAttended = leastAttended;
        }
    }

    // this gives us the average using the total and divide it by the array length
    let averageAttendance = totalAttendance / filteredEvents.length;

    // this sets the values as strings back into the html
    document.getElementById("total").innerHTML = totalAttendance.toLocaleString();
    document.getElementById("most").innerHTML = mostAttended.toLocaleString();
    document.getElementById("least").innerHTML = leastAttended.toLocaleString();
    document.getElementById("average").innerHTML = averageAttendance.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }
    );
}

// this clears the localStorage and refreshes the page
function clearData() {
    localStorage.clear();
    location.reload();
}

// this checks through every city type and displays them on the webpage as a dropdown
function getEvents(cityType) {
    let city = cityType.getAttribute("data-string");
    let currentEvents = JSON.parse(localStorage.getItem("eventsArray")) || events;
    filteredEvents = currentEvents;

    // this changes the header and filters out the array based on the city type you chose
    document.getElementById("statsHeader").innerHTML = `Stats For ${city} Events`;
    if (city != "All") {
        filteredEvents = currentEvents.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        });
    }
    displayDropDown();
}

// this builds the dropdown menu
function buildDropDown() {

    let eventDD = document.getElementById("eventDropDown");
    eventDD.innerHTML = "";

    let template = document.getElementById("cityDD-template");

    curEvents = JSON.parse(localStorage.getItem("eventsArray"));
    if (curEvents == null) {
        curEvents = events;
    }

    // this goes through every event and pull out the city
    let distinctEvents = [...new Set(curEvents.map((events) => events.city))];
    let ddItemNode = document.importNode(template.content, true);

    // this pulls from the anchor element in the html and then sets the pick all option
    ddItem = ddItemNode.querySelector("a");
    ddItem.setAttribute("data-string", "All");
    ddItem.textContent = "All";
    eventDD.appendChild(ddItem);

    // this then goes through every distinct city and sets it in the dropdown list to be selected
    for (var i = 0; i < distinctEvents.length; i++) {
        ddItemNode = document.importNode(template.content, true);
        ddItem = ddItemNode.querySelector("a");
        ddItem.setAttribute("data-string", distinctEvents[i]);
        ddItem.textContent = distinctEvents[i];
        eventDD.appendChild(ddItem);
    }


}