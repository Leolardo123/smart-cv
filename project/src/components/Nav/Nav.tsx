import React from 'react'
import NavLink from './NavLink'
import { t } from '../../i18n'

const links = [
  { to: "/profiles", label: "profile" },
  { to: "/experiences", label: "experiences" },
  { to: "/projects", label: "projects" },
  { to: "/skills", label: "skills" },
  { to: "/education", label: "education" },
  { to: "/resumes", label: "resume" },
] as const

export type NavLink = typeof links[number]

export default function Nav() {
  return (
    <nav className="flex flex-wrap gap-4">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {t(link.label)}
        </NavLink>
      ))}
    </nav>
  );
}
