import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/educationService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

type SkillOption = { id: string; name: string };

export default function EducationCreate() {
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [notes, setNotes] = useState("");
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const skills: SkillOption[] = getSkills();
  const nav = useNavigate();
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!school.trim()) {
      setError("School is required");
      return;
    }
    const r = create({
      school,
      degree,
      start,
      end,
      notes,
      skills: skillsSelected,
    });
    nav(`/education/${r.id}`);
  }
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{t("addEducation")}</h2>
      <form onSubmit={submit} className="space-y-4 bg-slate-800 p-4 rounded">
        <div>
          <label className="block text-sm text-slate-300">{t("school") || "School"}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={school} onChange={(e) => setSchool(e.currentTarget.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("degree") || "Degree"}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={degree} onChange={(e) => setDegree(e.currentTarget.value)} />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-slate-300">{t("start")}</label>
            <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" type="month" value={start} onChange={(e) => setStart(e.currentTarget.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-slate-300">{t("end")}</label>
            <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" type="month" value={end} onChange={(e) => setEnd(e.currentTarget.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("notes")}</label>
          <div className="mt-1"><RichTextEditor value={notes} onChange={setNotes} /></div>
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("relatedSkills") || "Related skills/technologies"}</label>
          <select multiple className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={skillsSelected} onChange={(e) => setSkillsSelected(Array.from(e.currentTarget.selectedOptions).map((o) => o.value))}>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <button className="bg-tone1 text-white px-4 py-2 rounded" type="submit">{t("save")}</button>
        </div>
      </form>
    </section>
  );
}
