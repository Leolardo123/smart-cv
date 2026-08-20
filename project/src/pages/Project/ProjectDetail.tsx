import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Project } from "../../services/projectService";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

export default function ProjectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<Project | null>(null);
  
  useEffect(() => {
    if (!id) return;
    setItem(getById(id) || null);
  }, [id]);

  function del() {
    if (!id) return;
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    nav("/projects");
  }

  if (!item) return <p className="text-slate-400">{t("noItems")}</p>;

  const skills = getSkills();

  const techNames = (item.tags || [])
    .map((id) => skills.find((s) => s.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <section>
      <div className="flex items-start justify-between bg-slate-800 p-4 rounded">
        <div>
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-slate-400">{item.link}</p>
        </div>
        <div className="text-right">
          {techNames.length > 0 && (
            <p className="text-slate-400">{t("skills")}: {techNames.join(", ")}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Link className="text-sm text-slate-300" to={`/projects/${item.id}/edit`}>{t("edit")}</Link>
            <button className="text-red-400" onClick={del}>{t("delete")}</button>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-slate-800 p-4 rounded text-slate-100" dangerouslySetInnerHTML={{ __html: item.summary || "" }} />
    </section>
  );
}
