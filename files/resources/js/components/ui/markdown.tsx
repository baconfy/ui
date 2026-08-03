import ReactMarkdown, { type Components } from 'react-markdown';

/**
 * Inline Markdown for strings that live inside an existing layout — a table
 * cell, a list row, a label.
 *
 * `react-markdown` produces block elements: `**Ana** replied` becomes
 * `<p><strong>Ana</strong> replied</p>`, and that paragraph breaks flex
 * alignment, `truncate` and `line-clamp`. Unwrapping `p` keeps the output as a
 * plain run of text.
 *
 * Raw HTML never renders: `react-markdown` ignores it unless `rehype-raw` is
 * added, which this deliberately does not do.
 */
const INLINE: Components = {
    p: ({ children }) => <>{children}</>,
    code: ({ children }) => <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">{children}</code>,
    // Anchors are flattened to their text: inline Markdown is used inside rows
    // that are already a single click target, and an anchor nested in a button
    // is invalid markup with an ambiguous destination.
    a: ({ children }) => <>{children}</>,
};

export function InlineMarkdown({ children }: { children: string }) {
    return <ReactMarkdown components={INLINE}>{children}</ReactMarkdown>;
}
