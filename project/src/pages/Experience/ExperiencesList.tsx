import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove, Experience } from "../../services/experienceService";
import { t } from "../../i18n";

export default function ExperiencesList() {
  const [items, setItems] = useState<Experience[]>([]);
  
  useEffect(() => setItems(getAll()), []);

  function del(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    setItems(getAll());
  }

  return (
    <section>
      <h2>{t("experiences")}</h2>
      <Link to="/experiences/create">{t("addExperience")}</Link>
      <ul>
        {items.length === 0 && <li className="muted">{t("noItems")}</li>}
        {items.map((i) => (
          <li key={i.id}>
            <Link to={`/experiences/${i.id}`}>{i.title}</Link>
            <div className="actions">
              <Link to={`/experiences/${i.id}/edit`}>{t("edit")}</Link>
              <button className="secondary" onClick={() => del(i.id)}>
                {t("delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
