function sortNewsDescending(items) {
    return [...items].sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));
}

function buildNewsItem(item) {
    const row = document.createElement("li");
    row.className = "entry-row";

    const date = document.createElement("p");
    date.className = "entry-time";
    date.textContent = item.date;

    const text = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.headline;
    text.appendChild(title);

    const body = document.createElement("p");
    body.className = "body-line";
    body.textContent = item.details;
    text.appendChild(body);

    if (item.link) {
        const meta = document.createElement("p");
        meta.className = "meta-line";

        const anchor = document.createElement("a");
        anchor.href = item.link;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        anchor.textContent = "View details →";

        meta.appendChild(anchor);
        text.appendChild(meta);
    }

    row.appendChild(date);
    row.appendChild(text);
    return row;
}

function renderNews(listNode, items) {
    const limit = Number.parseInt(listNode.dataset.limit || items.length, 10);
    const ordered = sortNewsDescending(items).slice(0, limit);
    ordered.forEach((item) => listNode.appendChild(buildNewsItem(item)));
}

function buildBlogItem(item) {
    const article = document.createElement("article");
    article.className = "blog-row";

    const title = document.createElement("h2");
    title.className = "blog-title";

    const titleLink = document.createElement("a");
    titleLink.href = `blog-post.html?post=${encodeURIComponent(item.slug)}`;
    titleLink.textContent = item.title;
    title.appendChild(titleLink);
    article.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "blog-meta";

    const status = document.createElement("span");
    status.textContent = item.status;
    meta.appendChild(status);

    item.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "blog-tag";
        chip.textContent = tag;
        meta.appendChild(chip);
    });

    const summary = document.createElement("p");
    summary.className = "blog-summary";
    summary.textContent = item.summary;

    article.appendChild(meta);
    article.appendChild(summary);
    return article;
}

function renderBlogs(listNode, items, activeTag) {
    const visibleItems = activeTag === "All"
        ? items
        : items.filter((item) => item.tags.includes(activeTag));

    listNode.replaceChildren();
    visibleItems.forEach((item) => listNode.appendChild(buildBlogItem(item)));
}

function hookBlogFilters() {
    const listNode = document.getElementById("blog-list");
    if (!listNode || typeof blogData === "undefined") {
        return;
    }

    const buttons = document.querySelectorAll("[data-blog-filter]");
    renderBlogs(listNode, blogData, "All");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((candidate) => {
                candidate.classList.remove("active");
                candidate.setAttribute("aria-pressed", "false");
            });
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");
            renderBlogs(listNode, blogData, button.dataset.blogFilter);
        });
    });
}

function renderBlogPost() {
    const article = document.getElementById("blog-post");
    if (!article || typeof blogData === "undefined") {
        return;
    }

    const slug = new URLSearchParams(window.location.search).get("post");
    const item = blogData.find((candidate) => candidate.slug === slug);

    if (!item) {
        document.title = "Blog Note Not Found | Shadril Hassan Shifat";
        const heading = document.createElement("h1");
        heading.className = "section-title";
        heading.textContent = "Blog note not found";

        const message = document.createElement("p");
        message.textContent = "This planned note does not exist or its link has changed.";

        article.appendChild(heading);
        article.appendChild(message);
        return;
    }

    document.title = `${item.title} | Shadril Hassan Shifat`;

    const heading = document.createElement("h1");
    heading.className = "section-title blog-post-title";
    heading.textContent = item.title;

    const meta = document.createElement("div");
    meta.className = "blog-meta";

    const status = document.createElement("span");
    status.textContent = item.status;
    meta.appendChild(status);

    item.tags.forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "blog-tag";
        chip.textContent = tag;
        meta.appendChild(chip);
    });

    const summary = document.createElement("p");
    summary.className = "blog-post-summary";
    summary.textContent = item.summary;

    const notice = document.createElement("p");
    notice.className = "draft-notice";
    notice.textContent = "This article is planned and has not been published yet. The complete note will appear here when it is ready.";

    article.appendChild(heading);
    article.appendChild(meta);
    article.appendChild(summary);
    article.appendChild(notice);
}

function setThemeIcon(toggle, darkOn) {
    const icon = toggle.querySelector("i");
    if (!icon) {
        return;
    }

    icon.classList.toggle("fa-sun", darkOn);
    icon.classList.toggle("fa-moon", !darkOn);
    toggle.setAttribute("aria-label", darkOn ? "Switch to light theme" : "Switch to dark theme");
}

function isDark() {
    return document.documentElement.classList.contains("dark-mode");
}

function hookThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) {
        return;
    }

    setThemeIcon(toggle, isDark());
    toggle.addEventListener("click", () => {
        const darkOn = document.documentElement.classList.toggle("dark-mode");
        try {
            localStorage.setItem("theme", darkOn ? "dark" : "light");
        } catch (error) {
            /* storage unavailable: theme applies to this page only */
        }
        setThemeIcon(toggle, darkOn);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    hookThemeToggle();

    if (typeof newsData !== "undefined") {
        document.querySelectorAll("[data-news-list]").forEach((listNode) => {
            renderNews(listNode, newsData);
        });
    }

    hookBlogFilters();
    renderBlogPost();
});
