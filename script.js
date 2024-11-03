// 🔧 HTML Elements
const ticketDetailsInput = document.getElementById("ticketDetails");
const calculateBtn = document.getElementById("calculateButton");
const resultDisplay = document.getElementById("result");
const titleInput = document.getElementById("title");
const escalationTimeInput = document.getElementById("esclate-time");
const closeTimeInput = document.getElementById("close-time");
const problemTypeInput = document.getElementById("problem-type");
const dataUsageInput = document.getElementById("gigabytes");
const amountDisplay = document.getElementById("amount");
const packageSelect = document.getElementById('package');
let srInfo = document.querySelector(".sr-info");
let dslnum = document.getElementById("service-number");
let csName = document.getElementById("customer-name")
let submitButton = document.querySelector(".sr-info button");
let irgbLink = document.getElementById("ir-gb-tl");
let TlSr = document.getElementById("Tech-conc-tl");
let tt = document.getElementById("T-T");
let ttAmonut = document.getElementById("ttAmount");

let title = ""
let onSpotGbSr = document.getElementById("Sr-on-spot");
let onSpotAmountSr = document.getElementById("Sr-on-spot-amount");
let iramount = document.getElementById("ir-amount");
let TlSrAmount = document.getElementById("tl-sr-amount");
let notElSatisfed = document.querySelectorAll(".not-el-satisfied");
let notElNotSatisfed = document.querySelectorAll(".not-el-not-satisfied");




let normalUsageDay = 0;

let ticketDetails = {
    transferDate: "",
    closedDate: "",
    isValid: true,
    script: "",
    diffTime: { seconds: 0, hours: 0 },
    gigabytes: 0,
    amount: 0,
    isCustomerProblem: false,
    allCloseCodes: [],
    usageChecked: false,
    outsidE:false,


};

// 📝 Data Packages
const dataPackages = [
    { name: 'Super speed 1- (140GB)', price: 160, gb: 140 },
    { name: 'Super speed 1- (200GB)', price: 225, gb: 200 },
    { name: 'Super speed 1- (250GB)', price: 280, gb: 250 },
    { name: 'Super speed 1-(400GB)', price: 440, gb: 400 },
    { name: 'Super speed 1- (600GB)', price: 650, gb: 600 },
    { name: 'Super 1 speed (1 TB)', price: 1050, gb: 1000 },
    { name: 'Super speed 2- (140GB)', price: 160, gb: 140 },
    { name: 'Super speed 2- (200GB)', price: 225, gb: 200 },
    { name: 'Super speed 2- (250GB)', price: 280, gb: 250 },
    { name: 'Super speed 2-(400GB)', price: 440, gb: 400 },
    { name: 'Super speed 2- (600GB)', price: 650, gb: 600 },
    { name: 'Super 2 speed (1 TB)', price: 1050, gb: 1000 },
    { name: 'Yearly - Super 1 (3000 GB)', price: 3220, gb: 3000 },
    { name: 'Yearly - Super 1 (4800 GB)', price: 5060, gb: 4800 },
    { name: 'Yearly - Super 1 (7200 GB)', price: 7150, gb: 7200 },
    { name: 'Yearly - Super 1 (12 TB)', price: 10500, gb: 12000 },
    { name: 'Yearly - Super 2 (3000 GB)', price: 3220, gb: 3000 },
    { name: 'Yearly - Super 2 (4800 GB)', price: 5060, gb: 4800 },
    { name: 'Yearly - Super 2 (7200 GB)', price: 7150, gb: 7200 },
    { name: 'Yearly - Super 2 (12 TB)', price: 10500, gb: 12000 },
    { name: 'Mega Speed 1- (250GB)', price: 410, gb: 250 },
    { name: 'Mega speed 1- (600GB)', price: 800, gb: 600 },
    { name: '​Mega 1 Speed (1 TB)', price: 1200, gb: 1000 },
    { name: 'Yearly - Mega 1 (12 TB)', price: 4715, gb: 12000 },
    { name: 'Ultra Speed 1- (250GB)', price: 8800, gb: 250 },
    { name: 'Ultra Speed 1- (600GB)', price: 12000, gb: 600 },
    { name: 'Yearly - Ultra 1 (3000 GB)', price: 540, gb: 3000 },
    { name: 'Yearly - Ultra 1 (7200 GB)', price: 950, gb: 7200 },
    { name: 'MAX speed 1', price: 6210, gb: 1000 },
    { name: 'Yearly - MAX 1 (12 TB)', price: 10450, gb: 12000 }
];

// help functions

function convertDateTime(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Format the date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    // Format the time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, '0') : '12'; // The hour '0' should be '12'

    // Construct the formatted date string
    return `${day}-${month}-${year}, ${hours}:${minutes} ${ampm}`;
}

// Example usage
const inputDate = "Fri Oct 18 2024 09:09:17 GMT+0300 (Eastern European Summer Time)";
const formattedDate = convertDateTime(inputDate);

// 🚀<------------------------------------------------------------------------Main Functions-------------------------------------------------------------------->🚀

// Display each package dynamically 

function displayAllPackages() {

    dataPackages.forEach(pkg => {

        const option = document.createElement('option');

        option.textContent = `${pkg.name} - ${pkg.price} EGP`;

        option.value = pkg.name;

        if (pkg.name.includes("Yearly")) {

            option.classList.add("year");
        }
        if (pkg.name.includes("Mega")) {

            option.classList.add("mega");
        }
        if (pkg.name.includes("Ultra")) {

            option.classList.add("ultra");
        }

        packageSelect.appendChild(option);
    });
}

// Get First Transfer Date Function
function getFirstTransferDate() {

    const ticketText = ticketDetailsInput.value;

    const escalationTimeRegex = /(\d{2}-\d{2}-\d{4}, \d{2}:\d{2} [APM]{2})/g;

    const targetBlock = "Transfered: IU Maintenance";

    const targetIndex = ticketText.indexOf(targetBlock);

    let lastEscalationDate = null;

    if (targetIndex !== -1) {
        const substringBeforeTarget = ticketText.substring(0, targetIndex).trim();

        const matches = [...substringBeforeTarget.matchAll(escalationTimeRegex)];

        if (matches.length > 0) {
            lastEscalationDate = matches[matches.length - 1][0];
        }
    } else {
        const escalationTimeMatch = escalationTimeRegex.exec(ticketText);

        if (escalationTimeMatch) {

            lastEscalationDate = escalationTimeMatch[0];
        }
        alert("No Transfer To IU found")
        window.location.reload()
    }

    ticketDetails.transferDate = lastEscalationDate;
}

// Get close code date
function getLastCloseCodeDate() {
    const closeCodePattern = /\bClose Code\s*\((\d+)\)/g;
    const closeCodes = [2, 86, 87, 8, 83, 84, 75, 74, 65, 17, 28, 96, 26, 29, 23, 4, 30, 7, 27, 73, 24];

    const closedCodeMatches = [...ticketDetailsInput.value.matchAll(closeCodePattern)];
    let filtered = [];

    // Filter out codes that are not in closeCodes
    for (const match of closedCodeMatches) {
        const code = parseInt(match[1], 10);
        if (!closeCodes.includes(code)) {
            filtered.push(match);
            ticketDetails.isCustomerProblem = false;
            ticketDetails.isValid = false;
        }
    }

    if (filtered.length === 0) {
        // No valid close codes, push the existing one
        if (closedCodeMatches.length > 0) {
            ticketDetails.isCustomerProblem = true;
            ticketDetails.isValid = false;
            filtered.push(closedCodeMatches[closedCodeMatches.length - 1]);
        } else {
            // No close codes at all, alert ticket still open
            ticketDetails.script = "ticket open";
        }
    }

    // Process the last valid close code
    if (filtered.length > 0) {
        const lastFilteredMatch = filtered[filtered.length - 1];
        const index = lastFilteredMatch.index;
        const wordsAfter = ticketDetailsInput.value.slice(index).split(/\s+/).slice(2, 12).join(' ');
        const dateRegex = /(\d{2})-(\d{2})-(\d{4}),\s*(\d{1,2}):(\d{2})\s*([AP]M)/;
        const dateMatch = dateRegex.exec(wordsAfter);
        ticketDetails.closedDate = dateMatch ? dateMatch[0] : null;
        ticketDetails.allCloseCodes = dateMatch;
    }
}

function getOutSideTedata() {
    const outsideTeDataPattern = /\boutside TEData\b/g;  // Pattern to find "outside TEData"
    const dateRegex = /(\d{2})-(\d{2})-(\d{4}),\s*(\d{1,2}):(\d{2})\s*([AP]M)/;  // Date format: DD-MM-YYYY, hh:mm AM/PM

    // Find all matches for "outside TEData"
    const matches = [...ticketDetailsInput.value.matchAll(outsideTeDataPattern)];
    let outsideTeDataDate = null;

    if (matches.length > 0) {
        // Get the last occurrence of "outside TEData"
        const lastMatch = matches[matches.length - 1];
        const index = lastMatch.index;

        // Slice the text after the last "outside TEData" and search for the date
        const wordsAfter = ticketDetailsInput.value.slice(index).split(/\s+/).slice(0, 20).join(' ');  // Adjust the range as needed
        const dateMatch = dateRegex.exec(wordsAfter);

        if (dateMatch) {
            // If a date is found, store it
            outsideTeDataDate = dateMatch[0];

        } else {
            return
        }
    } else {
        return
    }

    // Store the date in ticketDetails if found
    if (outsideTeDataDate) {
        ticketDetails.closedDate = outsideTeDataDate;
        ticketDetails.outsidE=true;

    }
}



// function to Format the date so machine can understand
function convertToDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
        return null; // or handle the error as needed
    }

    const [datePart, timePart] = dateString.split(', ');

    if (!datePart || !timePart) {
        return null; // or handle the error as needed
    }

    const [day, month, year] = datePart.split('-').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null; // or handle the error as needed
    }

    let [time, period] = timePart.split(' ');

    if (!time || !period) {
        return null; // or handle the error as needed
    }

    let [hours, minutes] = time.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes) || (period !== 'AM' && period !== 'PM')) {
        return null; // or handle the error as needed
    }

    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;

    const dateObj = new Date(formattedDate);

    if (isNaN(dateObj.getTime())) {
        return null; // or handle the error as needed
    }

    return dateObj;
}

function calculateHourDifference() {
    const startDate = new Date(convertToDate(ticketDetails.transferDate));
    const endDate = new Date(convertToDate(ticketDetails.closedDate));

    const diffInMilliseconds = endDate - startDate;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    ticketDetails.diffTime.seconds = diffInMilliseconds;
    ticketDetails.diffTime.hours = diffInHours;


}


// calculate the concession function
function calculateConcession() {
    let GBS = 0;
    let amount = 0;
    let normalUsageHours = normalUsageDay * 24
    // Convert milliseconds to hours and days
    const totalHours = (ticketDetails.diffTime.seconds / (1000 * 60 * 60)) - normalUsageHours
    const totalDays = Math.ceil(totalHours / 24);

    // Loop through dataPackages to find the selected package
    for (let i = 0; i < dataPackages.length; i++) {
        if (dataPackages[i].name === packageSelect.value) {
            if (ticketDetails.isCustomerProblem) {

                ticketDetails.isValid = false;
                ticketDetails.script = "customerProblem";
            }
            else if (totalHours < 12) {
                // Less than 12 hours
                ticketDetails.gigabytes = 0;
                ticketDetails.amount = 0;
                ticketDetails.isValid = false;
                ticketDetails.script = "lowTime";

            } else if (totalHours >= 12 && totalHours < 24) {
                // More than 12 hours but less than a day
                switch (dataPackages[i].gb) {
                    case 140:
                        GBS = 3;
                        break;
                    case 200:
                        GBS = 5;
                        break;
                    default:
                        GBS = 10;
                }
                ticketDetails.gigabytes = GBS;
                ticketDetails.amount = 0;
                ticketDetails.isValid = true;
                ticketDetails.script = "12hour-conc";

            } else if (totalHours >= 24) {
                // More than a day
                if (dataPackages[i].name.includes("Yearly")) {
                    amount = (dataPackages[i].price / 365) * totalDays;
                    GBS = (dataPackages[i].gb / 365) * totalDays;
                } else {
                    amount = (dataPackages[i].price / 30) * totalDays;
                    GBS = (dataPackages[i].gb / 30) * totalDays;
                }
                ticketDetails.gigabytes = GBS;
                ticketDetails.amount = amount;
                ticketDetails.isValid = true;
                ticketDetails.script = "normal conc";
            }

            break;
        }
    }
}
// Display Script

// Extract Words after Close Codes
function extractWordsAfterCloseCode(text) {
    const closeCodePattern = /\(\d+\):\s*(.*?)(?=\d{2}-\d{2}-\d{4},\s*\d{1,2}:\d{2}\s*[AP]M)/;
    const match = closeCodePattern.exec(text);
    return match ? match[1].trim() : "No details found";
}


// Define a function to update the display
function displayMessage() {
    let GBS = ticketDetails.gigabytes;
    function updateDisplay(message, showLeader = false, showTeam = false, showAgent = false, showNoConc = false) {
        dataUsageInput.innerHTML = message;
        document.querySelector(".Leader").style.display = showLeader ? "block" : "none";
        document.querySelector(".team").style.display = showTeam ? "block" : "none";
        document.querySelector(".agent").style.display = showAgent ? "block" : "none";
        document.querySelector(".no-conc").style.display = showNoConc ? "block" : "none";
    }

    // Handle customer problem case
    if (ticketDetails.script == "customerProblem") {
        updateDisplay(`<span class="action">Inform the customer in a friendly way that the problem wasn't on our side, so we can't compensate him/her</span>`,
            false,
            false,
            false,
            true);
    }
    else if (ticketDetails.script == "lowTime") {
        updateDisplay(`<span class="action"> Inform the customer in a friendly way that the problem didn't pass 12 hours, so we can't compensate him/her.</span>`,
            false,
            false,
            false,
            true);
    }
    else if (GBS <= 20) {
        updateDisplay(`<span class="action">Compensate the customer on the spot with</span></br> ${GBS.toFixed()} gigabytes + ${GBS.toFixed()} extra gigabytes for satisfaction.`,
            false,
            false,
            true,
            false);
    }

    else if (GBS > 20 && GBS <= 50) {
        updateDisplay(
            `<span class="action">Send To Tl With SLA 30 Minutes </span></br> ${GBS.toFixed()} gigabytes + ${GBS.toFixed()} extra gigabytes for satisfaction.`,
            true,
            false,
            false,
            false);
    }
    else if (GBS > 50 && GBS <= 100) {
        updateDisplay(
            `<span class="action">Open Concession TT With SLA 1 Hour</span> </br> ${GBS.toFixed()} gigabytes + ${GBS.toFixed()} extra gigabytes for satisfaction.`,
            false,
            true,
            false,
            false);
    }
    else {
        updateDisplay(
            `<span class="action">Open Concession TT With SLA 2 Hour</span> </br> ${GBS.toFixed()} gigabytes + ${GBS.toFixed()} extra gigabytes for satisfaction.`,
            false,
            true,
            false,
            false);
    }

}
// display text in case customer ask for amo
function displayAmountMessage() {
    let amount = ticketDetails.amount;
    let GBS = ticketDetails.gigabytes;

    function updateDisplay(message, showLeader = false, showTeam = false, showAgent = false, showNoConc = false) {
        amountDisplay.innerHTML = message;
        document.querySelector("#system-action-amount .Leader").style.display = showLeader ? "block" : "none";
        document.querySelector("#system-action-amount .team").style.display = showTeam ? "block" : "none";
        document.querySelector("#system-action-amount .agent").style.display = showAgent ? "block" : "none";
        document.querySelector("#system-action-amount .no-conc").style.display = showNoConc ? "block" : "none";
    }

    // Handle customer problem case
    if (ticketDetails.script == "customerProblem") {
        updateDisplay(`<span class="action">Inform the customer in a friendly way that the problem wasn't on our side, so we can't compensate him/her</span>`,
            false,
            false,
            false,
            true);
    }
    else if (ticketDetails.script == "lowTime") {
        updateDisplay(`<span class="action"> Inform the customer in a friendly way that the problem didn't pass 12 hours, so we can't compensate him/her.</span>`,
            false,
            false,
            false,
            true);
    }
    else if (amount == 0) {
        updateDisplay(`<span class="action">Inform the customer that it's not possible to provide a concession for the amount balance they can only receive gigabytes.</span>`,
            false,
            false,
            false,
            true);
    }

    else if (amount <= 12 && amount > 0) {
        updateDisplay(
            `<span class="action">Compensate the customer on the spot with</span></br> ${parseFloat(amount.toFixed(2))} EGP + ${GBS.toFixed()} extra gigabytes for satisfaction.</span>`,
            false,
            false,
            true,
            false);
    }
    else if (amount > 12 && amount <= 40) {
        updateDisplay(
            `<span class="action">Send To Tl With SLA 30 Minutes </span></br> ${parseFloat(amount.toFixed(2))} EGP + ${GBS.toFixed()} extra gigabytes for satisfaction.</span>`,
            true,
            false,
            false,
            false);
    }
    else if (amount > 40 && amount <= 80) {
        updateDisplay(
            `<span class="action">Open Concession TT With SLA 1 Hour</span> </br> ${parseFloat(amount.toFixed(2))} EGP + ${GBS.toFixed()} extra gigabytes for satisfaction.</span>`,
            false,
            true,
            false,
            false);
    }
    else {
        updateDisplay(
            `<span class="action">Open Concession TT With SLA 2 Hour</span> </br> ${parseFloat(amount.toFixed(2))} EGP + ${GBS.toFixed()} extra gigabytes for satisfaction.</span>`,
            false,
            true,
            false,
            false);
    }

}
function extractTicketTitle(text) {
    const titleRegex = /Ticket Info: Ticket Title is ([^\n]+)/;
    const titleMatch = titleRegex.exec(text);
    const ticketTitle = titleMatch ? titleMatch[1].trim() : "No ticket title found";
    return ticketTitle
}
let buttonClose = document.querySelector("#warnning-window button");

// display general ticket data function 
function displayGeneralData() {
    const openWinddow = document.getElementById("open-window");
    const message = document.querySelector("#open-window p");
    const button = document.querySelector("#open-window button");

    titleInput.innerHTML = `Ticket Title : ${extractTicketTitle(ticketDetailsInput.value)}`
    escalationTimeInput.innerHTML = `Ticket Esclated ON ${ticketDetails.transferDate}`;
    closeTimeInput.innerHTML = `Ticket Closed ON ${ticketDetails.closedDate}`;
    if(!ticketDetails.outsidE){
        problemTypeInput.innerHTML = extractWordsAfterCloseCode(ticketDetails.allCloseCodes.input);

    }
    else{
        problemTypeInput.innerHTML = " FCC ticket outside TEData"

    }

    title = extractTicketTitle(ticketDetailsInput.value);
    if (title.toLocaleLowerCase() == "voice down" || title.toLocaleLowerCase() == "voice only") {

        openWinddow.style.display = "block"
        message.innerText = "الشكوى دي خاصة بالحرارة بس متعوضوش عليها , شوف اللوجز لو فيه اي مشكلة خاصة بالداتا تقدر تنزل التعويض اللي ظاهرلك";

    }
    button.onclick = function () {
        openWinddow.style.display = "none"

    }


}


// Invoke packages display function ✊

window.addEventListener("load", displayAllPackages);







function checkTicketAge() {
    // Convert the ticket transfer date and current date to Date objects
    const closeDate = new Date(convertToDate(ticketDetails.closedDate));

    const currentDate = new Date();

    const diffInMilliseconds = currentDate - closeDate;

    const diffInMonths = diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44);


    // Check if the ticket is older than 3 months
    if (closeDate == "Thu Jan 01 1970 02:00:00 GMT+0200 (Eastern European Standard Time)" && ticketDetails.transferDate != null) {
        const openWinddow = document.getElementById("open-window");
        const message = document.querySelector("#open-window p");
        const button = document.querySelector("#open-window button");

        message.innerText = "This ticket is still open. Import the Excel sheet and calculate compensation up to the last day before normal usage. as per customer input ,DON'T forget to update on the open ticket";
        openWinddow.style.display = "block";
        ticketDetails.closedDate = "open";
        button.onclick = function () {
            openWinddow.style.display = "none";
            document.querySelector(".black-screen").style.display = "none";
            ticketDetails.closedDate = convertDateTime(currentDate);
            calculateHourDifference();
            calculateConcession();
            displayMessage();
            displayAmountMessage();
            displayGeneralData();
            document.querySelector("#problem-type").innerHTML = "Reason : Customer input";
            document.querySelector(".red-screen").style.display = "flex"



        }


        // Set the validity flag to false so no further compensation is processed
        ticketDetails.isValid = false;
        document.querySelector(".black-screen").style.display = "block"
    }
    else if (ticketDetails.transferDate == null) {
        const warnningWindow = document.getElementById("warnning-window");
        const message = document.querySelector("#warnning-window p");
        message.innerText = "Please Enter A valid Ticket";
        warnningWindow.style.display = "block";
        document.querySelector(".black-screen").style.display = "block";



        // Set the validity flag to false so no further compensation is processed
        ticketDetails.isValid = false;

    }
    else if (diffInMonths > 3) {
        // Show a warning message and prevent compensation
        const warnningWindow = document.getElementById("warnning-window");
        const message = document.querySelector("#warnning-window p");
        message.innerText = "This ticket is more than 3 months, don't compensate it.";
        warnningWindow.style.display = "block";
        console.log(diffInMonths)
        console.log(ticketDetails)


        // Set the validity flag to false so no further compensation is processed
        ticketDetails.isValid = false;
        document.querySelector(".black-screen").style.display = "block"
        return false;

    }


    return true;
}


// Fire the calculation process 🔥
function calculateConc() {
    let warnningWindow = document.getElementById("warnning-window");
    let message = document.querySelector("#warnning-window p");
    let button = document.querySelector("#warnning-window button");

    button.onclick = function () {
        window.location.reload()
    }


    getFirstTransferDate();
    getLastCloseCodeDate();
    getOutSideTedata();
    calculateHourDifference();
    calculateConcession();
    displayMessage();
    displayAmountMessage();
    displayGeneralData();


    localStorage.setItem("ticketInfo", JSON.stringify(ticketDetails));
    tt.innerHTML = title + " " + "TT";
    ttAmonut.innerHTML = title + " " + "TT";
    // validations
    if (ticketDetailsInput.value.trim() === "") {
        message.innerText = "No ticket details provided. Please enter the ticket details."
        warnningWindow.style.display = "block"
        document.querySelector(".black-screen").style.display = "block"
        return;
    }

    checkTicketAge()
    console.log(ticketDetails)


}
calculateBtn.onclick = calculateConc;
// check ticket
let ticketsAlreadyDone = JSON.parse(localStorage.getItem('ticketsAlreadyDone')) || [];
const Addbutton = document.getElementById("add-ticket");
const Checkbutton = document.getElementById("check");
const input = document.getElementById("ticketInput");
const TicketStatus = document.getElementById("ticket-stat");

input.addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
Addbutton.addEventListener('click', function () {
    const ticketValue = input.value.trim();

    if (ticketValue !== '') {
        const confirmAdd = confirm(`Are you sure you want to add ticket number ${ticketValue}?`);

        if (confirmAdd) {
            ticketsAlreadyDone.push(ticketValue);

            localStorage.setItem('ticketsAlreadyDone', JSON.stringify(ticketsAlreadyDone));

            input.value = '';

            // Refresh the page
            location.reload();
        }
    }
});
Checkbutton.addEventListener('click', function () {

    const storedTickets = JSON.parse(localStorage.getItem('ticketsAlreadyDone')) || [];
    const ticketValue = input.value.trim();

    if (ticketValue === '') {
        TicketStatus.textContent = 'Please enter a valid ticket number.';
        TicketStatus.className = 'red';
        return;
    }

    if (storedTickets.includes(ticketValue)) {
        TicketStatus.textContent = `Ticket ${ticketValue} Compensation has already been provided.`;
        TicketStatus.className = 'red';
    } else {
        TicketStatus.textContent = `Ticket ${ticketValue} Compensation has not been provided.`;
        TicketStatus.className = 'green';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
});



dataUsageInput.onclick = function () {
    let bytes = ticketDetails.gigabytes.toFixed() * Math.pow(1024, 3);



    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = bytes;
    document.body.appendChild(tempTextarea);

    tempTextarea.select();

    document.execCommand('copy');

    document.body.removeChild(tempTextarea);

    alert(` ${bytes} copied to clipboard!`);
};

amountDisplay.onclick = function () {
    const balance = ticketDetails.amount.toFixed(2)

    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = balance;
    document.body.appendChild(tempTextarea);

    tempTextarea.select();

    document.execCommand('copy');

    document.body.removeChild(tempTextarea);

    alert(` ${balance} copied to clipboard!`);
};

document.getElementById("close-sheet").onclick = function () {
    const closeSheetButton = document.getElementById("close-sheet");
    const customerUsage = document.querySelector(".customer-usage");

    if (customerUsage.style.display === "none" || customerUsage.style.display === "") {

        customerUsage.style.display = "block";

        closeSheetButton.innerText = "Close usage sheet";
    } else {
        customerUsage.style.display = "none";

        closeSheetButton.innerText = "Open usage sheet";
    }
};


// calc usage --------






// Calculate Excel sheet 

let customerUsage = [];
let downPeriod = [];
let startDate = "";
let endDate = "";
let usageMessage = document.querySelector(".usage-alert");
let usageMessageText = document.querySelector(".usage-alert p");
const containers = document.getElementById('usageContainer');
const buttonCloseSheet = document.getElementById("close-sheet");


function parseDate(dateString) {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    const [hours, minutes, seconds] = timePart.split(":");

    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
}

function convertDateFormat(dateString) {
    const [datePart, timePart] = dateString.split(", ");
    let [day, month, year] = datePart.split("-");
    let [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":");

    hours = period === "PM" && hours !== "12" ? String(Number(hours) + 12) : hours;
    hours = period === "AM" && hours === "12" ? "00" : hours;
    minutes = minutes.padStart(2, '0');
    month = String(Number(month)).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:00`;
}

// Validate ticket details
function validateTicketDetails() {
    if (!ticketDetails.transferDate || !ticketDetails.closedDate) {
        alert("Ticket details are missing or incomplete,Please Enter ticket then calculate it ");
        location.reload()
        return false;
    }
    return true;
}

function getDownPeriod(startDate, endDate) {
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    customerUsage.forEach(usage => {
        const startTime = parseDate(usage.startTime);
        const endTime = parseDate(usage.endTime);

        if ((startTime >= start && startTime <= end) ||
            (endTime >= start && endTime <= end) ||
            (startTime <= start && endTime >= end)) {
            downPeriod.push(usage);
        }
    });

    calculateDailyUsage();
}

function calculateDailyUsage() {
    let dailyUsage = {};
    let counter = 0;

    downPeriod.forEach(usage => {
        let date = usage.startTime.split(' ')[0];
        if (!dailyUsage[date]) {
            dailyUsage[date] = parseFloat(usage.usage);
        } else {
            dailyUsage[date] += parseFloat(usage.usage);
        }
    });

    for (let date in dailyUsage) {
        if (dailyUsage[date] >= 5) {
            counter++;
            normalUsageDay = counter;
        }
    }
}

document.getElementById('input').addEventListener('change', function (event) {
    // Validate ticket details before proceeding
    if (!validateTicketDetails()) {
        return; // Stop execution if validation fails
    }


    const inputFile = event.target.files[0];

    if (inputFile) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Process the sheet data
            jsonData.forEach((row) => {
                const startTime = row[4];
                const endTime = row[5];
                let usageInBytes = row[13];
                let usageInGB = (parseFloat(usageInBytes) / 1073741824).toFixed(2);

                customerUsage.push({
                    startTime: startTime,
                    endTime: endTime,
                    usage: usageInGB + " GB"
                });
            });

            // Convert the ticket transferDate and closedDate
            let ticketStartDate = ticketDetails.transferDate.replaceAll("-", "/").split(",")[0];
            let ticketEndDate = ticketDetails.closedDate.replaceAll("-", "/").split(",")[0];

            // Format the dates to match 'DD/MM/YYYY hh:mm:ss' as in customerUsage


            // Initialize flags to check if dates are found
            let hasStartDate = false;
            let hasEndDate = false;

            // Loop through customerUsage to find startDate and endDate
            for (let i = 0; i < customerUsage.length; i++) {
                if (customerUsage[i].startTime.includes(ticketStartDate)) {
                    hasStartDate = true;
                }
                if (customerUsage[i].endTime.includes(ticketEndDate)) {
                    console.log(ticketEndDate)
                    hasEndDate = true;

                }

                // If both dates are found, no need to continue looping
                if (hasStartDate && hasEndDate) {
                    break;
                }
            }


            // Continue processing if validation passed
            let convertedTransferDate = convertDateFormat(ticketDetails.transferDate);
            let convertedClosedDate = convertDateFormat(ticketDetails.closedDate);
            startDate = convertedTransferDate;
            endDate = convertedClosedDate;

            getDownPeriod(startDate, endDate);

            usageMessage.classList.add("activate");
            usageMessageText.innerHTML = `This customer has ${normalUsageDay} days of normal Usage`;

            calculateConc();

            customerUsage.forEach((data) => {
                containers.innerHTML += `
                    <p> 
                        <span>Start Time: ${data.startTime}</span>  
                        <span>End Time: ${data.endTime}</span>  
                        <span>Usage: ${data.usage}</span>
                    </p>`;
            });

            localStorage.setItem("usageDays", JSON.stringify({ checked: true, days: normalUsageDay }));
            document.querySelector(".red-screen").style.display = "none"
        };

        reader.readAsArrayBuffer(inputFile);
    }
});



document.querySelector(".close").onclick = function () {
    usageMessage.classList.remove("activate");
};

document.querySelector(".checkUsage").onclick = function () {
    document.querySelector(".customer-usage").style.display = "block";
    usageMessage.classList.remove("activate");
};

// SYSTEM ACTIONS------



// Override localStorage.setItem to detect changes
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
    const event = new Event('storageChange');
    originalSetItem.apply(this, arguments);
    window.dispatchEvent(event);  // Trigger the custom event
};

// Function to handle changes and update actions
let ticket = JSON.parse(localStorage.getItem("ticketInfo"));
let usage = JSON.parse(localStorage.getItem("usageDays"));
function handleStorageChange() {


    // Check if the ticket and usage data exist
    if (ticket && usage) {
        // On-spot GB
        onSpotGbSr.style.cursor = "pointer";
        onSpotGbSr.style.textDecoration = "underline";

        onSpotGbSr.onclick = function (e) {

            srInfo.style.display = "flex";
        };

        // On-spot Amount
        onSpotAmountSr.style.cursor = "pointer";
        onSpotAmountSr.style.textDecoration = "underline";

        let discAmount = `
        Technical concession on the spot.  
        Compensation value: ${ticket.amount.toFixed(2)}EGP.
        `;


    } else {
        // console.error('ticket or usage data is missing');
    }
}
// Listen for the custom 'storageChange' event when localStorage.setItem is called
window.addEventListener('storageChange', handleStorageChange);

// Also listen for the 'storage' event (fires when localStorage changes from another tab)
window.addEventListener('storage', handleStorageChange);

// Initial trigger when the page loads
handleStorageChange();





onSpotGbSr.addEventListener("click", function (event) {

    event.preventDefault();

    srInfo.style.display = "flex";

    submitButton.onclick = function () {
        if (dslnum.value === '') {
            alert("Service number cannot be empty.");
            return;
        }

        if (csName.value === '') {
            alert("Customer name cannot be empty.");
            return;
        }
        else {
            let disc = `
            Customer name : ${csName.value}
            Tech concession On Spot.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20On%20Spot-Approved&srTypeId=100034007&t=1717423538787&tabId=sr0.7921628620350436&topUrl=&custid=&BMEWebToken=&subsNumber=FBB${dslnum.value}&serviceTitle=Tech%20Concession%20On%20Spot-Approved&serviceInfoChar282=Tech%20Concession%20On%20Spot-Approved&serviceInfoChar276=1&serviceInfoChar107=2&serviceInfoChar111=1&serviceInfoChar272=0&serviceContent=${formattedDisc}`;
            window.open(link, "_blank");
            srInfo.style.display = "none";

        }

    }



});

irgbLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://10.19.44.2/ireport/agent_clm/bss_technical_concession_add.php#1", "_blank");

})

TlSr.addEventListener("click", function (e) {
    e.preventDefault();
    srInfo.style.display = "flex";
    submitButton.onclick = function () {
        if (dslnum.value === '') {
            alert("Service number cannot be empty.");
            return;
        }

        if (csName.value === '') {
            alert("Customer name cannot be empty.");
            return;
        }
        else {
            let disc = `
            Customer name : ${csName.value}
            Tech concession TL.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20concession%20TL&srTypeId=100034008&t=1687895753564&tabId=sr0.24941422325719587&topUrl=&custid=&BMEWebToken=&subsNumber=FBB${dslnum.value}&serviceTitle=Tech%20Concession%20TL&serviceInfoChar282=Tech%20Concession%20TL&serviceInfoChar276=1&serviceInfoChar107=2&serviceInfoChar111=1&serviceInfoChar272=0&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";

        }


    }
})

tt.addEventListener("click", function (e) {
    e.preventDefault();

    // Convert title to lowercase for comparison
    const lowerTitle = title.toLocaleLowerCase();

    if (lowerTitle == "data down" || lowerTitle === "data only" || lowerTitle === "dataonly") {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20Down&srTypeId=101003014&t=1609453422940&tabId=sr0.9439481307482367&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };

    } else if (lowerTitle == "voice and data down" || lowerTitle == "data and voice down") {


        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20and%20Voice%20Down&srTypeId=101003023&t=1609456556068&tabId=sr0.8837433209561568&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }

    else if (lowerTitle.includes("physical instability")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Physical%20instability&srTypeId=101003015&t=1609454285022&tabId=sr0.8731381329852798&topUrl=&custid=&subsNumber=FBB${dslnum}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }


    else if (lowerTitle.includes("wcap") || lowerTitle.includes("wrong card and port")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20WCAP&srTypeId=101003020&t=1609455631738&tabId=sr0.783829620566824&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }


    else if (lowerTitle.includes("blq") || lowerTitle.includes("bad line quality")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.gigabytes.toFixed(2)}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20BLQ&srTypeId=101003024&t=1609456556111&tabId=sr0.5156700718787727&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }

    else {
        if (lowerTitle == "data down" || lowerTitle === "data only" || lowerTitle === "dataonly") {

            srInfo.style.display = "flex";

            submitButton.onclick = function () {
                if (dslnum.value === '') {
                    alert("Service number cannot be empty.");
                    return;
                }

                if (csName.value === '') {
                    alert("Customer name cannot be empty.");
                    return;
                }

                // Construct the description
                let disc = `
                Customer name : ${csName.value}
                Tech concession TT.
                Compensation value: ${ticketDetails.gigabytes.toFixed()}GB + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
               Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

                let formattedDisc = disc
                    .replace(/\n\s*/g, '%0A%20')
                    .replace(/\s+/g, '%20');

                let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20Down&srTypeId=101003014&t=1609453422940&tabId=sr0.9439481307482367&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

                window.open(link, "_blank");
                srInfo.style.display = "none";
            };
        }
        else{
            return null
        }
    }
});




// System Action Amount

onSpotAmountSr.addEventListener("click", function (e) {
    e.preventDefault()
    srInfo.style.display = "flex";
    submitButton.onclick = function () {
        if (dslnum.value === '') {
            alert("Service number cannot be empty.");
            return;
        }

        if (csName.value === '') {
            alert("Customer name cannot be empty.");
            return;
        }
        else {
            let disc = `
            Customer name : ${csName.value}
            Tech concession on spot.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20On%20Spot-Approved&srTypeId=100034007&t=1717423538787&tabId=sr0.7921628620350436&topUrl=&custid=&BMEWebToken=&subsNumber=FBB${dslnum.value}&serviceTitle=Tech%20Concession%20On%20Spot-Approved&serviceInfoChar282=Tech%20Concession%20On%20Spot-Approved&serviceInfoChar276=1&serviceInfoChar107=2&serviceInfoChar111=1&serviceInfoChar272=0&serviceContent=${formattedDisc}`;
            window.open(link, "_blank");
            srInfo.style.display = "none";

        }

    }

})

iramount.addEventListener("click", function (e) {
    e.preventDefault()
    window.open("https://10.19.44.2/ireport/agent_clm/bss_technical_concession_add.php#1", "_blank");

})




TlSrAmount.addEventListener("click", function (e) {

    e.preventDefault();
    srInfo.style.display = "flex";
    submitButton.onclick = function () {
        if (dslnum.value === '') {
            alert("Service number cannot be empty.");
            return;
        }

        if (csName.value === '') {
            alert("Customer name cannot be empty.");
            return;
        }
        else {
            let disc = `
            Customer name : ${csName.value}
            Tech concession TL.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20concession%20TL&srTypeId=100034008&t=1687895753564&tabId=sr0.24941422325719587&topUrl=&custid=&BMEWebToken=&subsNumber=FBB${dslnum.value}&serviceTitle=Tech%20Concession%20TL&serviceInfoChar282=Tech%20Concession%20TL&serviceInfoChar276=1&serviceInfoChar107=2&serviceInfoChar111=1&serviceInfoChar272=0&serviceContent=${formattedDisc}`
            window.open(link, "_blank");

        }
        srInfo.style.display = "none";


    }



})



ttAmonut.addEventListener("click", function (e) {
    e.preventDefault();

    // Convert title to lowercase for comparison
    const lowerTitle = title.toLocaleLowerCase();

    if (lowerTitle == "data down" || lowerTitle === "data only" || lowerTitle === "dataonly") {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20Down&srTypeId=101003014&t=1609453422940&tabId=sr0.9439481307482367&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };

    } else if (lowerTitle == "voice and data down" || lowerTitle == "data and voice down") {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20and%20Voice%20Down&srTypeId=101003023&t=1609456556068&tabId=sr0.8837433209561568&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }

    else if (lowerTitle.includes("physical instability")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Physical%20instability&srTypeId=101003015&t=1609454285022&tabId=sr0.8731381329852798&topUrl=&custid=&subsNumber=FBB${dslnum}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }


    else if (lowerTitle.includes("wcap") || lowerTitle.includes("wrong card and port")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20WCAP&srTypeId=101003020&t=1609455631738&tabId=sr0.783829620566824&topUrl=&custid=&subsNumber=FBB${dslnum}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }


    else if (lowerTitle.includes("blq") || lowerTitle.includes("bad line quality")) {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20BLQ&srTypeId=101003024&t=1609456556111&tabId=sr0.5156700718787727&topUrl=&custid=&subsNumber=FBB${dslnum}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }
    else {

        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            // Construct the description
            let disc = `
            Customer name : ${csName.value}
            Tech concession TT.
            Compensation value: ${ticketDetails.amount.toFixed(2)}EGP + ${ticketDetails.gigabytes.toFixed()}GB extra satisfaction.
           Concession period from ${ticketDetails.transferDate} To ${ticket.closedDate} ${normalUsageDay} days normal usage`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20Data%20Down&srTypeId=101003014&t=1609453422940&tabId=sr0.9439481307482367&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        };
    }
});
notElSatisfed.forEach(function (element) {
    element.addEventListener("click", function (e) {
        e.preventDefault();
        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            let disc = `
            Customer name : ${csName.value}
            Not eligible for concession.`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Tech%20Concession%20BLQ&srTypeId=101003024&t=1609456556111&tabId=sr0.5156700718787727&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=2&serviceInfoChar107=1&serviceInfoChar110=2&serviceTitle=Technical%20Concession&serviceInfoChar282=Technical%20Concession&serviceInfoChar272=&serviceContent=${formattedDisc}`;

            window.open(link, "_blank");
            srInfo.style.display = "none";
        }
    });
});

notElNotSatisfed.forEach(function (element) {
    element.addEventListener("click", function (e) {
        e.preventDefault();
        srInfo.style.display = "flex";

        submitButton.onclick = function () {
            if (dslnum.value === '') {
                alert("Service number cannot be empty.");
                return;
            }

            if (csName.value === '') {
                alert("Customer name cannot be empty.");
                return;
            }

            let disc = `
            Customer name : ${csName.value}
            Not eligible for concession.`;

            let formattedDisc = disc
                .replace(/\n\s*/g, '%0A%20')
                .replace(/\s+/g, '%20');

            let link = `https://bss.te.eg:12900/csp/sr/business.action?BMEBusiness=srNewSrPage&srTypeName=Technical%20Concession&srTypeId=099019002&t=1596388992819&tabId=sr0.15433972869953416&topUrl=&custid=&subsNumber=FBB${dslnum.value}&serviceInfoChar276=1&serviceInfoChar278=1&serviceInfoChar107=3&serviceInfoChar112=2&serviceTitle=Concession%20Problem&serviceInfoChar282=Concession%20Problem&serviceInfoChar272=0&serviceContent=${formattedDisc}`
            window.open(link, "_blank");
            srInfo.style.display = "none";
        }
    });
});
document.querySelector(".area-container img").onclick = function () {

    window.location.reload();

}

let Outagebutton = document.getElementById("outage-button");

// outage----------------------------------------




function calculateHourDifferenceOutage(start, end) {
    const startDate = start
    const endDate = end

    const diffInMilliseconds = endDate - startDate;
    console.log(diffInMilliseconds, startDate)
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

    ticketDetails.diffTime.seconds = diffInMilliseconds;
    ticketDetails.diffTime.hours = diffInHours;
    console.log(ticketDetails)


}


Outagebutton.onclick = function () {
    const regex = /\b\d{4}-\d{2}-\d{2} \d{1,2}:\d{2} (AM|PM)\b/g;
    const dates = ticketDetailsInput.value.match(regex);
    const parsedDates = dates.map(dateStr => new Date(dateStr));
    const earliestDate = new Date(Math.min(...parsedDates));
    const latestDate = new Date(Math.max(...parsedDates));

    function formatDate(date) {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        let minutes = String(date.getMinutes()).padStart(2, '0');
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24h to 12h format
        return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    }
    ticketDetails.transferDate = formatDate(earliestDate);
    ticketDetails.closedDate = formatDate(latestDate);
    calculateHourDifferenceOutage(earliestDate, latestDate);
    calculateConcession();
    
    displayMessage();
    displayAmountMessage();
    displayGeneralData();
    titleInput.innerHTML = "Outage";
    document.querySelector("span#problem-type").innerHTML = "Outage";
    document.querySelector(".system-action-container").style.display="none"

if(ticketDetails.diffTime.hours>=48){
    alert("This is more than a 48-hour outage; the concession will be done automatically.");
    window.location.reload()

}   

}


dslnum.addEventListener("input", function () {
    dslnum.value = dslnum.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    
    if (dslnum.value.startsWith('0')) {
        dslnum.value = dslnum.value.slice(1);
    }
});
