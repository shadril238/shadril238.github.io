document.addEventListener("DOMContentLoaded", () => {

    // ================== THEME TOGGLE ==================
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");

    // Default to 'light' if null or 'light'. Only be dark if explicitly 'dark'.
    if (savedTheme === "dark") {
        if (themeToggle) themeToggle.classList.add("fa-sun");
    } else {
        body.classList.add("light-theme");
        if (themeToggle) {
            themeToggle.classList.remove("fa-sun");
            themeToggle.classList.add("fa-moon");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("light-theme");

            if (body.classList.contains("light-theme")) {
                if (themeToggle.classList.contains("fa-sun")) {
                    themeToggle.classList.replace("fa-sun", "fa-moon");
                } else {
                    themeToggle.classList.add("fa-moon");
                }
                localStorage.setItem("theme", "light");
            } else {
                if (themeToggle.classList.contains("fa-moon")) {
                    themeToggle.classList.replace("fa-moon", "fa-sun");
                } else {
                    themeToggle.classList.add("fa-sun");
                }
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // ================== NAVBAR TOGGLE (MOBILE) ==================
    const navToggle = document.querySelector(".navbar-toggle");
    const navLinks = document.querySelector(".navbar-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    // ================== IMAGE MODAL (OPTIONAL) ==================
    const modal = document.getElementById("image-modal");
    const profileImg = document.getElementById("profile-image");
    const modalImg = document.getElementById("enlarged-image");
    const closeModal = document.getElementById("close-modal");

    if (profileImg && modal && modalImg) {
        profileImg.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = profileImg.src;
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // ================== DYNAMIC NEWS LOADING ==================
    const newsList = document.getElementById("news-list");

    if (newsList && typeof newsData !== 'undefined') {
        newsData.forEach(item => {
            const li = document.createElement("li");

            // Create date span
            const dateSpan = document.createElement("span");
            dateSpan.className = "news-date";
            dateSpan.textContent = item.date;

            // Create content span
            const contentSpan = document.createElement("span");
            contentSpan.className = "news-event";

            // Allow HTML content (for links/bold text) BUT handle plain text link if provided separately
            if (item.link && item.link !== "#") {
                contentSpan.innerHTML = `${item.content} <a href="${item.link}" target="_blank" style="margin-left:5px;"><i class="fas fa-external-link-alt" style="font-size: 0.8em;"></i></a>`;
            } else {
                contentSpan.innerHTML = item.content;
            }

            li.appendChild(dateSpan);
            li.appendChild(contentSpan);
            newsList.appendChild(li);
        });
    } else if (newsList) {
        newsList.innerHTML = "<li>No news data found.</li>";
    }
});
