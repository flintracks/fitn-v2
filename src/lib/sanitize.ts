import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "strong", "em", "u", "s",
  "ul", "ol", "li",
  "img", "iframe",
  "a", "blockquote", "pre", "code",
  "div", "span",
];

const ALLOWED_ATTR = [
  "src", "alt", "href", "target", "rel",
  "style", "class", "width", "height",
  "allowfullscreen", "frameborder", "allow",
];

const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i;

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
    ALLOW_DATA_ATTR: false,
  });
}
