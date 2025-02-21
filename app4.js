document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const menuContainer = document.getElementById("menu-container");
    const menuDropdown = document.getElementById("menu-dropdown");
    const aboutMenu = document.getElementById("menu-about");
    const aboutContent = document.getElementById("about-content");
    const cardContainer = $("#card-container");
    const overlay = document.getElementById("overlay");
    
    /*
        // Toggle menu
        menuBtn.addEventListener("click", function () {
            menuDropdown.style.display = menuDropdown.style.display === "block" ? "none" : "block";
        });
    */


    // Toggle menu with overlay
    menuBtn.addEventListener("click", function () {
        const isVisible = menuDropdown.style.display === "block";
        menuDropdown.style.display = isVisible ? "none" : "block";
        overlay.style.display = isVisible ? "none" : "block";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.style.display = "none";
            overlay.style.display = "none";
        }
    });
    

    // Toggle About section
    aboutMenu.addEventListener("click", function () {
        aboutContent.classList.toggle("hidden");

        // Change the label text
        if (aboutContent.classList.contains("hidden")) {
            aboutMenu.innerHTML = '<i class="fa-solid fa-circle-info"></i> About <i class="fa-solid fa-chevron-right"></i>';
        } else {
            aboutMenu.innerHTML = '<i class="fa-solid fa-circle-info"></i> About <i class="fa-solid fa-chevron-down"></i>';
        }
    });



    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuContainer.contains(event.target)) {
            menuDropdown.style.display = "none";
        }
    });

    
    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.style.display = "none";
        }
    });

    
    // Load and shuffle paragraphs
    fetch("paragraphs.json")
        .then(response => response.json())
        .then(data => {
            const paragraphs = shuffleArray(data);
            renderCards(paragraphs);
        });

    /*
    function renderCards(paragraphs) {
        cardContainer.empty();
        paragraphs.forEach(paragraph => {
            cardContainer.append(`<div class="card"><h2>${paragraph.title}</h2><p>${paragraph.content}</p></div>`);
        });

        cardContainer.slick({ slidesToShow: 1, slidesToScroll: 1, arrows: true, prevArrow: $("#prev-btn"), nextArrow: $("#next-btn"), speed: 600 });
    }*/

    function renderCards(paragraphs) {
    cardContainer.empty();

    paragraphs.forEach(paragraph => {
        cardContainer.append(`<div class="card"><h2>${paragraph.title}</h2><p class="lcp-text">${paragraph.content}</p></div>`);
    });

    if (cardContainer.hasClass("slick-initialized")) {
        cardContainer.slick("unslick"); // Destroy previous instance
    }

    cardContainer.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $("#prev-btn"),
        nextArrow: $("#next-btn"),
        speed: 600
    });
}


    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

});
