import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Skill } from "../../services/skillService";
import { t } from "../../i18n";

export default function SkillDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<Skill | null>(null);
  useEffect(() => {
    if (!id) return;
    setItem(getById(id) || null);
  }, [id]);
  function del() {
    if (!id) return;
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    nav("/skills");
  }
  if (!item) return <p className="text-slate-400">{t("noItems")}</p>;
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">{item.name}</h2>
      <p className="text-slate-400">{item.level} • {item.years || ""} {t("years")}</p>
      <div className="flex gap-2 mt-3">
        <Link className="text-tone1" to={`/skills/${item.id}/edit`}>{t("edit")}</Link>
        <button className="text-red-400" onClick={del}>{t("delete")}</button>
      </div>
    </section>
  );
}
