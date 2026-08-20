import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove, Project } from "../../services/projectService";
import { t } from "../../i18n";

export default function ProjectsList() {
  const [items, setItems] = useState<Project[]>([]);

  useEffect(() => setItems(getAll()), []);

  function del(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    setItems(getAll());
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{t("projects")}</h2>
        <Link className="bg-tone1 text-white px-3 py-1 rounded" to="/projects/create">{t("addProject")}</Link>
      </div>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-slate-400">{t("noItems")}</li>}
        {items.map((p) => (
          <li key={p.id} className="flex items-center justify-between bg-slate-800 p-3 rounded">
            <Link className="text-tone1 font-medium" to={`/projects/${p.id}`}>{p.name}</Link>
            <div className="flex items-center gap-2">
              <Link className="text-sm text-slate-300" to={`/projects/${p.id}/edit`}>{t("edit")}</Link>
              <button className="text-sm text-red-400" onClick={() => del(p.id)}>{t("delete")}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
