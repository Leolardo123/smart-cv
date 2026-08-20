import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/projectService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

type SkillOption = { id: string; name: string };

export default function ProjectCreate() {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const skills: SkillOption[] = getSkills();
  const nav = useNavigate();
  
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    const p = create({ name, summary, link, tags });
    nav(`/projects/${p.id}`);
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{t("addProject")}</h2>
      <form onSubmit={submit} className="space-y-4 bg-slate-800 p-4 rounded">
        <div>
          <label className="block text-sm text-slate-300">{t("name")}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("description")}</label>
          <div className="mt-1"><RichTextEditor value={summary} onChange={setSummary} /></div>
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("skills")} ({t("select")})</label>
          <select multiple className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={tags} onChange={(e) => { const selected = Array.from(e.currentTarget.selectedOptions).map((o) => o.value); setTags(selected); }}>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("link") || "Link"}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={link} onChange={(e) => setLink(e.currentTarget.value)} />
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <button className="bg-tone1 text-white px-4 py-2 rounded" type="submit">{t("save")}</button>
        </div>
      </form>
    </section>
  );
}
