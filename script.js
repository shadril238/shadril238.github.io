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

document.addEventListener("DOMContentLoaded", () => {
    hookThemeToggle();
    hookBlogFilters();
});
