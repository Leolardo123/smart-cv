import React from 'react'
import { cl } from '../utils/merge-styles';

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
}

export default function Button({ onClick, className, children }: ButtonProps) {
  return (
    <button
      className={cl("bg-slate-800 text-tone1 border border-slate-700 p-2 rounded w-full", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
