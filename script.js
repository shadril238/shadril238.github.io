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

    // Toggle filters: select any number of categories; none selected shows all.
    const active = new Set();
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const tag = button.dataset.blogFilter;
            if (active.has(tag)) {
                active.delete(tag);
            } else {
                active.add(tag);
            }
            button.classList.toggle("active", active.has(tag));
            button.setAttribute("aria-pressed", String(active.has(tag)));
            rows.forEach((row) => {
                const tags = row.dataset.tags.split("|");
                row.hidden = active.size > 0 && !tags.some((t) => active.has(t));
            });
            // Hide a group (and its heading) when the filter leaves it empty.
            document.querySelectorAll("#blog-list .blog-list").forEach((list) => {
                const empty = !list.querySelector(".blog-row:not([hidden])");
                list.hidden = empty;
                const heading = list.previousElementSibling;
                if (heading && heading.classList.contains("blog-subhead")) {
                    heading.hidden = empty;
                }
            });
        });
    });
}

// Mobile menu: hamburger opens a dropdown; closes on link click, outside click, or Escape.
function hookNavToggle() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) {
        return;
    }
    const setOpen = (open) => {
        nav.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
    };
    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        setOpen(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setOpen(false);
        }
    });
    document.addEventListener("click", (event) => {
        if (nav.classList.contains("open") && !event.target.closest(".topbar")) {
            setOpen(false);
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            setOpen(false);
            toggle.focus();
        }
    });
}

// Click-to-enlarge for the profile photo and blog post images.
function hookLightbox() {
    const triggers = document.querySelectorAll("[data-lightbox], .post-body img");
    if (!triggers.length) {
        return;
    }

    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(dialog);
    const big = dialog.querySelector("img");

    const open = (img) => {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        dialog.setAttribute("aria-label", img.alt || "Enlarged image");
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        } else {
            window.open(big.src, "_blank", "noopener");
        }
    };

    triggers.forEach((trigger) => {
        const img = trigger.tagName === "IMG" ? trigger : trigger.querySelector("img");
        if (!img) {
            return;
        }
        if (trigger.tagName === "IMG") {
            trigger.classList.add("zoomable");
        }
        trigger.addEventListener("click", () => open(img));
    });

    dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
    // A click on the backdrop lands on the <dialog> itself, not on the image.
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}

// ---------- Blog posts ----------

// Table of contents from the post's h2/h3 headings, with the current section highlighted.
function buildPostToc() {
    const body = document.getElementById("post-body");
    const list = document.getElementById("post-toc-list");
    if (!body || !list) {
        return;
    }
    const headings = Array.from(body.querySelectorAll("h2[id], h3[id]"));
    if (headings.length < 2) {
        return;
    }

    const links = new Map();
    headings.forEach((heading) => {
        const item = document.createElement("li");
        item.className = heading.tagName === "H3" ? "toc-sub" : "";
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        item.appendChild(link);
        list.appendChild(item);
        links.set(heading.id, link);
    });
    list.closest(".post-toc").hidden = false;
    list.closest(".post-shell").classList.add("has-toc");

    if (!("IntersectionObserver" in window)) {
        return;
    }
    let current = null;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                current = entry.target.id;
            }
        });
        links.forEach((link, id) => link.classList.toggle("active", id === current));
    }, { rootMargin: "-80px 0px -70% 0px" });
    headings.forEach((heading) => observer.observe(heading));
}

// Language label and copy button on highlighted code blocks.
function enhanceCodeBlocks() {
    document.querySelectorAll(".post-body div.highlighter-rouge").forEach((block) => {
        const code = block.querySelector("pre code");
        if (!code) {
            return;
        }
        const langClass = Array.from(block.classList).find((name) => name.startsWith("language-"));
        const lang = langClass ? langClass.slice("language-".length) : "";

        const bar = document.createElement("div");
        bar.className = "code-bar";
        const label = document.createElement("span");
        label.textContent = lang === "plaintext" ? "text" : lang;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "code-copy";
        button.textContent = "Copy";
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(code.innerText);
                button.textContent = "Copied";
            } catch (error) {
                button.textContent = "Press Ctrl+C";
            }
            setTimeout(() => {
                button.textContent = "Copy";
            }, 1600);
        });
        bar.append(label, button);
        block.prepend(bar);
    });
}

// KaTeX (posts with `math: true`) and Mermaid (posts with `mermaid: true`).
function renderPostExtras() {
    const body = document.getElementById("post-body");
    if (!body) {
        return;
    }
    if (window.renderMathInElement) {
        window.renderMathInElement(body, {
            delimiters: [
                { left: "\\[", right: "\\]", display: true },
                { left: "\\(", right: "\\)", display: false }
            ],
            throwOnError: false
        });
    }
    if (window.mermaid) {
        const blocks = body.querySelectorAll("pre > code.language-mermaid");
        blocks.forEach((code) => {
            const diagram = document.createElement("div");
            diagram.className = "mermaid";
            diagram.textContent = code.textContent;
            code.parentElement.replaceWith(diagram);
        });
        window.mermaid.initialize({ startOnLoad: false, theme: isDark() ? "dark" : "default" });
        window.mermaid.run({ nodes: body.querySelectorAll(".mermaid") });
    }
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
    hookNavToggle();
    hookBlogFilters();
    hookLightbox();
    hookAnalyticsEvents();
    buildPostToc();
    enhanceCodeBlocks();
    renderPostExtras();
});
