document.addEventListener("DOMContentLoaded", function () { 
    const menuMode = document.getElementById("menu-mode");
    const body = document.body;
    const menuDropdown = document.getElementById("menu-dropdown");
    const aboutContent = document.getElementById("about-content");
    const navigationButtons = document.querySelectorAll("#navigation button");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const cardContainer = $("#card-container"); // jQuery object for Slick

    // Detect system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Check for saved mode in local storage, else use system preference
    if (localStorage.getItem("darkMode") === "enabled" || 
        (!localStorage.getItem("darkMode") && prefersDark.matches)) {
        enableDarkMode();
    }

    // Listen for system preference changes
    prefersDark.addEventListener("change", (e) => {
        if (!localStorage.getItem("darkMode")) { // Only auto-change if user hasn't manually set a preference
            e.matches ? enableDarkMode() : disableDarkMode();
        }
    });

    // Toggle dark mode manually
    menuMode.addEventListener("click", function () {
        console.log("Dark mode button clicked!");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "disabled");
            disableDarkMode();
        } else {
            localStorage.setItem("darkMode", "enabled");
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add("dark-mode");
        menuDropdown.classList.add("dark-mode");
        aboutContent.classList.add("dark-mode");
        header.classList.add("dark-mode");
        footer.classList.add("dark-mode");
        navigationButtons.forEach(btn => btn.classList.add("dark-mode"));

        applyDarkModeToCards();
        refreshSlick();

        menuMode.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        menuDropdown.classList.remove("dark-mode");
        aboutContent.classList.remove("dark-mode");
        header.classList.remove("dark-mode");
        footer.classList.remove("dark-mode");
        navigationButtons.forEach(btn => btn.classList.remove("dark-mode"));

        removeDarkModeFromCards();
        refreshSlick();

        menuMode.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }

    function applyDarkModeToCards() {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.add("dark-mode");
        });
    }

    function removeDarkModeFromCards() {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("dark-mode");
        });
    }

    /*
    function refreshSlick() {
        // Reinitialize Slick after changing card styles
        setTimeout(() => {
            cardContainer.slick("setPosition"); // Fix position
        }, 100);
    } */

    function refreshSlick() {
    if (cardContainer.hasClass("slick-initialized")) {
        setTimeout(() => {
            cardContainer.slick("setPosition"); // Fix position
        }, 100);
    }
}


    // Observe dynamically added cards
    const observer = new MutationObserver(() => {
        if (localStorage.getItem("darkMode") === "enabled") {
            applyDarkModeToCards();
        }
        refreshSlick();
    });

    observer.observe(document.getElementById("card-container"), { childList: true });
});
