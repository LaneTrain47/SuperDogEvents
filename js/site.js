let events = [{
        event: 'Games Done Quick',
        city: 'New York',
        state: 'New York',
        donations: 2425790,
        date: "01/06/2019"
    },
    {
        event: 'Games Done Quick',
        city: 'New York',
        state: 'New York',
        donations: 3039569,
        date: "06/23/2019"
    },
    {
        event: 'Games Done Quick',
        city: 'New York',
        state: 'New York',
        donations: 152595,
        date: "09/27/2019"
    },
    {
        event: 'Games Done Quick',
        city: 'San Diego',
        state: 'California',
        donations: 3164002,
        date: "01/05/2020"
    },
    {
        event: 'Games Done Quick',
        city: 'San Diego',
        state: 'California',
        donations: 403631,
        date: "04/17/2020"
    },
    {
        event: 'Games Done Quick',
        city: 'San Diego',
        state: 'California',
        donations: 2345785,
        date: "08/16/2020"
    },
    {
        event: 'Games Done Quick',
        city: 'Charlotte',
        state: 'North Carolina',
        donations: 2739612,
        date: "01/03/2021"
    },
    {
        event: 'Games Done Quick',
        city: 'Charlotte',
        state: 'North Carolina',
        donations: 2927667,
        date: "07/04/2021"
    },
];

//The default display for all events 
let filteredEvents = events;

//A dropdown of specific cities
function buildDropdown() {
    let eventDropdown = document.getElementById("eventDropdown");
    let distinctEvents = [...new Set(events.map(event => event.city))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";
    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDropdown.innerHTML = resultHTML;
}

function getEvents(element) {
    let city = element.getAttribute("data-string");
    filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != 'All') {
        filteredEvents = events.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        })
    }

    displayStats();
}

function displayStats() {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentDonations = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentDonations = filteredEvents[i].donations;
        total += currentDonations;

        if (most < currentDonations) {
            most = currentDonations;
        }

        if (least > currentDonations || least < 0) {
            least = currentDonations;
        }
    }

    average = total / filteredEvents.length;

    document.getElementById("donationTotal").innerHTML = total.toLocaleString();
    document.getElementById("donationAverage").innerHTML = total.toLocaleString();
    document.getElementById("donationHighest").innerHTML = total.toLocaleString();
    document.getElementById("donationLowest").innerHTML = total.toLocaleString(
        /*(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            })*/
    );

}