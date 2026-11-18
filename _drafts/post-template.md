---
# TEMPLATE — files in _drafts/ are never published.
# To publish a post: copy this file to _posts/YYYY-MM-DD-your-slug.md,
# write it, and push. It appears at /blogs/your-slug/.
# Preview drafts locally with: jekyll serve --drafts
title: "Post Template: Every Feature in One Place"
description: "One-sentence summary shown under the title, in the blog list, and in link previews."
category: Research        # Filter group on the Blogs page (e.g. Research, Engineering, Open Source)
tags: [LLM Reasoning, Example]
math: true                # Load KaTeX for $$...$$ math (omit when unused)
mermaid: true             # Load Mermaid for ```mermaid diagrams (omit when unused)
# updated: 2026-12-01     # Optional "Updated" date
---

Open with a short paragraph on what the reader will learn. The table of contents is built automatically from the `##` and `###` headings below.

## Code blocks

Fenced code blocks get syntax highlighting, a language label, and a copy button:

```python
def accuracy(preds, labels):
    """Fraction of predictions that match the labels."""
    correct = sum(p == y for p, y in zip(preds, labels))
    return correct / len(labels)
```

```bash
jekyll serve --drafts
```

Inline code such as `requirements.txt` stays on one line.

## Math

Inline math uses double dollar signs inside a sentence: the loss is $$\mathcal{L} = -\sum_i y_i \log p_i$$ over all classes.

Display math goes on its own lines:

$$
\text{softmax}(z)_i = \frac{e^{z_i}}{\sum_j e^{z_j}}
$$

### A subsection

Subsections appear indented in the table of contents.

## Diagrams

```mermaid
flowchart LR
    Q[Question] --> P[Planner] --> S[Searcher] --> V[Verifier] --> W[Writer]
```

## Tables and quotes

| Model | Accuracy |
| ----- | -------- |
| Baseline | 61.2% |
| Ours | 68.9% |

> A blockquote for a key takeaway.

## Conclusion

Close with the main result and links to code or papers.
