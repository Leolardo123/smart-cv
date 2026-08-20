import React from 'react'

interface ButtonProps {
    onClick: () => void;
    customCss?: string;
    children: React.ReactNode;
}

export default function Button({ onClick, customCss, children }: ButtonProps) {
  return (
    <button
      className={`bg-slate-800 text-tone1 border border-slate-700 p-2 rounded w-full ${customCss || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
