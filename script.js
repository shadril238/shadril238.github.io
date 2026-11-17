function isDark() {
    return document.documentElement.classList.contains("dark-mode");
}

function hookThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }

    // Icons swap via CSS on .dark-mode; only the pressed state lives here.
    toggle.setAttribute("aria-pressed", String(isDark()));
    toggle.addEventListener("click", () => {
        const darkOn = document.documentElement.classList.toggle("dark-mode");
        try {
            localStorage.setItem("theme", darkOn ? "dark" : "light");
        } catch (error) {
            /* storage unavailable: theme applies to this page only */
        }
        toggle.setAttribute("aria-pressed", String(darkOn));
    });
}

function hookBlogFilters() {
    const rows = document.querySelectorAll("#blog-list [data-tags]");
    const buttons = document.querySelectorAll("[data-blog-filter]");
    if (!rows.length || !buttons.length) {
        return;
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const tag = button.dataset.blogFilter;
            buttons.forEach((candidate) => {
                const active = candidate === button;
                candidate.classList.toggle("active", active);
                candidate.setAttribute("aria-pressed", String(active));
            });
            rows.forEach((row) => {
                row.hidden = tag !== "All" && !row.dataset.tags.split("|").includes(tag);
            });
        });
    });
}

// Analytics events: CV downloads and email clicks (GoatCounter, if loaded).
function hookAnalyticsEvents() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");
        if (!link || !window.goatcounter || !window.goatcounter.count) {
            return;
        }
        const href = link.getAttribute("href");
        let path = null;
        if (/cv\.pdf$/i.test(href)) {
            path = "cv-download";
        } else if (href.startsWith("mailto:")) {
            path = "email-click";
        }
        if (path) {
            window.goatcounter.count({ path, title: link.textContent.trim() || path, event: true });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    hookThemeToggle();
    hookBlogFilters();
    hookAnalyticsEvents();
});
