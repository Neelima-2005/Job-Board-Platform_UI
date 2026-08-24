const searchBtn = document.getElementById("searchBtn");
const jobSearch = document.getElementById("jobSearch");
const locationSearch = document.getElementById("locationSearch");
const jobCards = Array.from(document.querySelectorAll(".job-card"));
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const clearFilters = document.getElementById("clearFilters");
const sortJobs = document.getElementById("sortJobs");

const jobTypeCheckboxes = document.querySelectorAll(".job-type");

// Search jobs
function searchJobs() {

    const searchText = jobSearch.value.toLowerCase().trim();
    const locationText = locationSearch.value.toLowerCase().trim();

    const selectedTypes = Array.from(jobTypeCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    let visibleJobs = [];

    jobCards.forEach(card => {

        const title = card.dataset.title.toLowerCase();
        const location = card.dataset.location.toLowerCase();
        const type = card.dataset.type;

        const matchesTitle =
            searchText === "" ||
            title.includes(searchText);

        const matchesLocation =
            locationText === "" ||
            location.includes(locationText);

        const matchesType =
            selectedTypes.length === 0 ||
            selectedTypes.includes(type);

        if (matchesTitle && matchesLocation && matchesType) {
            card.style.display = "flex";
            visibleJobs.push(card);
        } else {
            card.style.display = "none";
        }
    });

    resultCount.textContent =
        `${visibleJobs.length} ${visibleJobs.length === 1 ? "job" : "jobs"} found`;

    if (visibleJobs.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}


// Search button
searchBtn.addEventListener("click", searchJobs);


// Search when pressing Enter
jobSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchJobs();
    }
});

locationSearch.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchJobs();
    }
});


// Apply button
document.querySelectorAll(".apply-btn").forEach(button => {

    button.addEventListener("click", function() {

        const jobCard = this.closest(".job-card");
        const jobTitle = jobCard.dataset.title;

        alert(
            `Application started for "${jobTitle}".\n\nThank you for your interest!`
        );
    });

});


// Filter changes
jobTypeCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", searchJobs);
});


// Clear filters
clearFilters.addEventListener("click", function() {

    jobSearch.value = "";
    locationSearch.value = "";

    document.querySelectorAll(
        '.job-type, .experience, input[name="salary"]'
    ).forEach(input => {
        input.checked = false;
    });

    jobCards.forEach(card => {
        card.style.display = "flex";
    });

    resultCount.textContent = "6 jobs found";
    noResults.style.display = "none";
});


// Sort jobs
sortJobs.addEventListener("change", function() {

    const jobList = document.getElementById("jobList");

    let sortedCards = [...jobCards];

    if (this.value === "salary-high") {

        sortedCards.sort((a, b) => {
            return Number(b.dataset.salary) - Number(a.dataset.salary);
        });

    } else if (this.value === "salary-low") {

        sortedCards.sort((a, b) => {
            return Number(a.dataset.salary) - Number(b.dataset.salary);
        });
    }

    sortedCards.forEach(card => {
        jobList.appendChild(card);
    });

    searchJobs();
});


// Mobile menu
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", function() {

    const nav = document.querySelector(".nav nav");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
        nav.style.position = "absolute";
        nav.style.top = "76px";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.background = "white";
        nav.style.padding = "20px";
        nav.style.flexDirection = "column";
        nav.style.borderBottom = "1px solid #e5e7eb";
    }

});