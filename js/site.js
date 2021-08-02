let events = [{
        event: 'Awesome Games Done Quick',
        date: 'January 7-14',
        year: '2018',
        location: 'Herndon, VA',
        donations: 2295190.66
    },

    {
        event: 'Summer Games Done Quick',
        date: 'June 24-30',
        year: '2018',
        location: 'Minneapolis, MN',
        donations: 2168913.51
    },

    {
        event: 'Awesome Games Done Quick',
        date: 'January 6-12',
        year: '2019',
        location: 'Rockville, MD',
        donations: 2425790.50
    },

    {
        event: 'Summer Games Done Quick',
        date: 'June 23-29',
        year: '2019',
        location: 'Minneapolis, MN',
        donations: 3039596.07
    },

    {
        event: 'Awesome Games Done Quick',
        date: 'January 5-11',
        year: '2020',
        location: 'Orlando, FL',
        donations: 3164002.06
    },

    {
        event: 'Summer Games Done Quick',
        date: 'August 16-22',
        year: '2020',
        location: 'Virtual',
        donations: 2345785.57
    },

    {
        event: 'Awesome Games Done Quick',
        date: 'January 3-9',
        year: '2021',
        location: 'Virtual',
        donations: 2739612.05
    },

    {
        event: 'Summer Games Done Quick',
        date: 'July 4-10',
        year: '2021',
        location: 'Virtual',
        donations: 2927667.01
    },
];

//The default display for all events 
let filteredEvents = events;

//A dropdown of specific cities
function buildDropdown() {
    let eventDropdown = document.getElementById("eventDropdown");
    let distinctEvents = [...new Set(events.map(event => event.year))];
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";
    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDropdown.innerHTML = resultHTML;
}

function getEvents(element) {
    let year = element.getAttribute("data-string");
    filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${year} Events`;
    if (year != 'All') {
        filteredEvents = events.filter(function (item) {
            if (item.year == year) {
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
    document.getElementById("donationLowest").innerHTML = total.toLocaleString();

}