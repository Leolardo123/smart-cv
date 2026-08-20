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
    <section>
      <h2>{t("projects")}</h2>
      <Link to="/projects/create">{t("addProject")}</Link>
      <ul>
        {items.length === 0 && <li className="muted">{t("noItems")}</li>}
        {items.map((p) => (
          <li key={p.id}>
            <Link to={`/projects/${p.id}`}>{p.name}</Link>
            <div className="actions">
              <Link to={`/projects/${p.id}/edit`}>{t("edit")}</Link>
              <button className="secondary" onClick={() => del(p.id)}>
                {t("delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
