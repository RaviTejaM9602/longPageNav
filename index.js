const sections = document.querySelectorAll('h2');
const navLinks = document.querySelectorAll('#sticky-nav a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Remove the "active" class from all nav links
            navLinks.forEach((link) => {
                link.style.backgroundColor = "";
            });

            // Find the corresponding nav link and add the "active" class
            const link = document.querySelector(`#sticky-nav a[href="#${entry.target.id}"]`);
            if (link) {
                link.style.backgroundColor = "green";

                // Update the title in the top of the navigation
                const sectionTitle = document.querySelector('#sticky-nav-title');
                if (sectionTitle) {
                    sectionTitle.textContent = entry.target.textContent.trim();
                }
            }
        }
    });
}, observerOptions);

sections.forEach((section) => {
    observer.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
    // Initially hide nav items
    document.getElementById("primary-nav").style.display = "flex";

    // Add click event listener to the "Show Content" button
    document.getElementById("show-content-btn").addEventListener("click", function (event) {
        toggleShowContent(event);
    });

    // Add scroll event listener to update progress bar and hide nav items
    window.addEventListener("scroll", function () {
        updateProgressBar();
        hideNavOnScroll();
    });
});

function toggleShowContent(event) {
    const primaryNav = document.getElementById("primary-nav");

    if (!primaryNav) return;

    // Toggle visibility of nav items
    primaryNav.style.display = primaryNav.style.display === "none" ? "flex" : "none";

    window.scroll(0,0);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollableHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
}

function hideNavOnScroll() {
    const showContentBtn = document.getElementById("show-content-btn");
    const primaryNav = document.getElementById("primary-nav");

    if (!showContentBtn || !primaryNav) return;

    // Check if show content button is not active, then hide nav items on scroll
    if (!showContentBtn.classList.contains("active")) {
        primaryNav.style.display = "none";
    }
}


