import React, { useEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function exec(command: string, valueArg?: string) {
    document.execCommand(command, false, valueArg || "");
    emitChange();
  }

  function emitChange() {
    if (!ref.current) return;
    onChange(ref.current.innerHTML);
  }

  function sanitizeHtml(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;

    // unwrap <font> tags
    div.querySelectorAll("font").forEach((f) => {
      const span = document.createElement("span");
      span.innerHTML = f.innerHTML;
      f.replaceWith(span);
    });

    // remove any <style> or <link> blocks from pasted content
    div.querySelectorAll("style,link,meta").forEach((n) => n.remove());

    // walk elements and strip classes, ids, event handlers and inline styles
    const walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, null);
    const nodes: Element[] = [];
    while (walker.nextNode()) nodes.push(walker.currentNode as Element);

    nodes.forEach((el) => {
      // remove presentation attributes
      if (el.hasAttribute("color")) el.removeAttribute("color");
      if (el.hasAttribute("bgcolor")) el.removeAttribute("bgcolor");

      // remove classes and ids to avoid external CSS bleed
      if (el.hasAttribute("class")) el.removeAttribute("class");
      if (el.hasAttribute("id")) el.removeAttribute("id");

      // remove event handlers
      Array.from(el.attributes).forEach((attr) => {
        if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
      });

      // remove all inline styles to avoid color/background surprises
      if (el.hasAttribute("style")) el.removeAttribute("style");

      // keep only safe attributes: href for anchors
      if (el.tagName.toLowerCase() !== "a") {
        if (el.hasAttribute("href")) el.removeAttribute("href");
      }
    });

    return div.innerHTML;
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const clipboard = e.clipboardData;
    const html = clipboard.getData("text/html");
    const text = clipboard.getData("text/plain");
    if (html) {
      const clean = sanitizeHtml(html);
      document.execCommand("insertHTML", false, clean);
    } else if (text) {
      document.execCommand("insertText", false, text);
    }
    emitChange();
  }

  return (
    <div>
      <div className="rte-toolbar">
        <button type="button" onClick={() => exec("bold")}>B</button>
        <button type="button" onClick={() => exec("italic")}>I</button>
        <button type="button" onClick={() => exec("insertUnorderedList")}>• List</button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL:") || "";
            if (url) exec("createLink", url);
          }}
        >
          Link
        </button>
      </div>
      <div
        ref={ref}
        className="rte-editor"
        contentEditable
        onInput={emitChange}
        onPaste={handlePaste}
        suppressContentEditableWarning
        aria-label="Rich text editor"
      />
    </div>
  );
}
