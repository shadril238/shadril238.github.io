# Shadril Hassan Shifat — Academic Portfolio

A static academic portfolio for Shadril Hassan Shifat, built with Jekyll (rendered by GitHub Pages), semantic HTML, responsive CSS, and a little vanilla JavaScript.

Live site: [shadril238.github.io](https://shadril238.github.io)

## Pages

- `index.html` — About, availability, selected publications, recent news
- `publications.html` — Publications
- `experience.html` — Work experience, education, honors, and technical skills
- `projects.html` — Selected projects
- `open-source.html` — Merged open-source contributions
- `news.html` — News archive (the homepage shows the latest three)
- `blogs.html` — Blog index with category filters; planned notes appear under “Coming soon”
- `_layouts/post.html` — Blog post page (table of contents, code copy buttons, optional math and diagrams)
- `feed.xml` — Atom feed of blog posts
- `404.html`, `sitemap.xml`, `robots.txt`
- `skills.html`, `blog-post.html` — redirects kept so old links still work

## Editing content

Most updates are data-only edits in `_data/`:

- `_data/news.yml` — news entries (`date: YYYY-MM-DD`); the homepage shows the newest three
- `_data/publications.yml` — publications; `selected: true` puts one on the homepage
- `_data/open_source.yml` — merged pull requests per project
- `_data/planned_notes.yml` — planned blog notes (“Coming soon” on the Blogs page)
- `_data/navigation.yml` — the main menu
- `_config.yml` — name, email, CV path, and profile links

Shared markup lives in `_layouts/default.html` (head, SEO/social tags, header, footer) and `_includes/` (icons, news and publication rows). CSS/JS cache-busting is automatic.

**CV:** the menu and homepage link to `assets/cv.pdf`. Add the file at that path.

## Writing a blog post

1. Copy `_drafts/post-template.md` to `_posts/YYYY-MM-DD-your-slug.md` (for example `_posts/2026-12-01-bangla-math-reasoning.md`).
2. Fill in the front matter and write in Markdown. The post is published at `/blogs/your-slug/`.
3. Push to `main`. The post appears on the Blogs page, in `feed.xml`, and in the sitemap.

Front matter fields:

| Field | Purpose |
| --- | --- |
| `title` | Post title |
| `description` | One-line summary under the title, in the list, and in link previews |
| `category` | Filter group on the Blogs page, e.g. `Research`, `Engineering`, `Open Source` |
| `tags` | Small labels shown with the post |
| `math: true` | Loads KaTeX; write math as `$$...$$` (inline or on its own lines) |
| `mermaid: true` | Renders ```` ```mermaid ```` code blocks as diagrams |
| `updated` | Optional “Updated” date |

The table of contents is built from `##` and `###` headings. Code blocks get highlighting, a language label, and a copy button.

Files in `_drafts/` are never published. Preview them with `jekyll serve --drafts`. When a planned note becomes a post, remove it from `_data/planned_notes.yml`.

## Visitor analytics

The site uses [GoatCounter](https://www.goatcounter.com/): no cookies, no personal data, so no consent banner is needed. The script loads only in production builds; set `goatcounter` in `_config.yml` to your site code (empty disables it).

- Dashboard: `https://<code>.goatcounter.com` (visits, referrers, countries, pages)
- Custom events: `cv-download` and `email-click`
- To stop counting your own visits, open `https://shadril238.github.io/#toggle-goatcounter` once in each browser you use.

## Local preview

Requires Ruby 3.x (for example `brew install ruby`), then:

```bash
gem install jekyll -v 3.10.0 kramdown-parser-gfm webrick
jekyll serve
```

Open [http://localhost:4000](http://localhost:4000). A plain static server will not render the Liquid templates.

## Deployment

GitHub Pages builds the `main` branch with Jekyll and deploys it to [shadril238.github.io](https://shadril238.github.io).

## License

Site code is available under the MIT License. Written content and images are © Shadril Hassan Shifat, all rights reserved.
