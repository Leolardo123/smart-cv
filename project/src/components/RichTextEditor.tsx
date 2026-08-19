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
        suppressContentEditableWarning
        aria-label="Rich text editor"
      />
    </div>
  );
}
