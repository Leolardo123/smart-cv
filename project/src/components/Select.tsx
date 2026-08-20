import React from "react";
import { cl } from "../utils/merge-styles";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  customCss?: string;
}

export default function Select({
  value,
  onChange,
  options,
  customCss,
}: SelectProps) {
  return (
    <select
      className={cl(
        "bg-(--tone-2) text-tone1 border border-(--tone-3) p-2 rounded uppercase",
        customCss,
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
