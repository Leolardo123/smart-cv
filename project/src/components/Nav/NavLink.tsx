import React from 'react'
import { Link } from 'react-router-dom'
import { cl } from '../../utils/merge-styles';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  customCss?: string;
}

export default function NavLink({ to, children, customCss }: NavLinkProps) {
  return (
    <Link
      className={cl("expand text-tone1 font-semibold border border-tone1 px-3 py-1 rounded", customCss)}
      to={to}
    >
      {children}
    </Link>
  );
}