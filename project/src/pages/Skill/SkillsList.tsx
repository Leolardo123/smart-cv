import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove, Skill } from "../../services/skillService";
import { t } from "../../i18n";

export default function SkillsList() {
  const [items, setItems] = useState<Skill[]>([]);
  useEffect(() => setItems(getAll()), []);
  function del(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    setItems(getAll());
  }
  return (
    <section>
      <h2>{t("skills")}</h2>
      <Link to="/skills/create">{t("addSkill")}</Link>
      <ul>
        {items.length === 0 && <li className="muted">{t("noItems")}</li>}
        {items.map((s) => (
          <li key={s.id}>
            <Link to={`/skills/${s.id}`}>{s.name}</Link>
            <div className="actions">
              <Link to={`/skills/${s.id}/edit`}>{t("edit")}</Link>
              <button className="secondary" onClick={() => del(s.id)}>
                {t("delete")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
