import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, remove, Resume } from "../../services/resumeService";
import { t } from "../../i18n";

export default function ResumesList() {
  const [items, setItems] = useState<Resume[]>([]);
  const nav = useNavigate();

  useEffect(() => setItems(getAll()), []);

  function del(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    setItems(getAll());
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{t("resumes")}</h2>
        <Link className="bg-tone1 text-white px-3 py-1 rounded" to="/resumes/create">{t("createResume")}</Link>
      </div>
      <ul className="space-y-3">
        {items.length === 0 && <li className="text-slate-400">{t("noItems")}</li>}
        {items.map((r) => (
          <li key={r.id} className="flex items-center justify-between bg-slate-800 p-3 rounded">
            <Link className="text-tone1 font-medium" to={`/resumes/${r.id}/preview`}>{r.name}</Link>
            <div className="flex items-center gap-2">
              <Link className="text-sm text-slate-300" to={`/resumes/${r.id}/edit`}>{t("edit")}</Link>
              <button className="text-sm text-red-400" onClick={() => del(r.id)}>{t("delete")}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
