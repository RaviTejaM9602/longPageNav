const sections = document.querySelectorAll('h2');
const navLinks = document.querySelectorAll('#nav-overlay a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.style.backgroundColor = "";
            });

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


document.addEventListener('DOMContentLoaded', function () {
    const showContentBtn = document.getElementById('show-content-btn');
    const navOverlay = document.getElementById('nav-overlay');

    showContentBtn.addEventListener('click', function () {
        navOverlay.classList.toggle('show');
    });

    // Smooth scroll to section when a nav link is clicked
    document.querySelectorAll('#primary-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - document.getElementById('sticky-nav').offsetHeight,
                behavior: 'smooth'
            });

            navOverlay.classList.remove('show');
        });
    });

    window.addEventListener("scroll", function () {
        const scrollPercentage =
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.getElementById("progress-bar").style.width = scrollPercentage + "%";
    });

    // Scrollspy functionality to highlight the active section in the nav
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.all-section');
        let scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                document.querySelectorAll('#primary-nav a').forEach((navLink) => {
                    navLink.classList.remove('active');
                });

                const currentNavLink = document.querySelectorAll('#primary-nav a')[index];
                currentNavLink.classList.add('active');
            }
        });
    });

    function checkStickyNav() {
        let stickyNav = document.getElementById('sticky-nav');
        let viewportHeight = window.innerHeight;

        if (stickyNav.offsetHeight > viewportHeight / 2) {
            stickyNav.style.display = 'none';
        } else {
            stickyNav.style.display = 'flex';
        }
    }

    // Call the function on page load
    checkStickyNav();

    // Recalculate on window resize
    window.addEventListener('resize', checkStickyNav);
});





