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
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{t("skills")}</h2>
        <Link className="bg-tone1 text-white px-3 py-1 rounded" to="/skills/create">{t("addSkill")}</Link>
      </div>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-slate-400">{t("noItems")}</li>}
        {items.map((s) => (
          <li key={s.id} className="flex items-center justify-between bg-slate-800 p-3 rounded">
            <Link className="text-tone1 font-medium" to={`/skills/${s.id}`}>{s.name}</Link>
            <div className="flex items-center gap-2">
              <Link className="text-sm text-slate-300" to={`/skills/${s.id}/edit`}>{t("edit")}</Link>
              <button className="text-sm text-red-400" onClick={() => del(s.id)}>{t("delete")}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
