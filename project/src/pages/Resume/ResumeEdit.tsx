import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/resumeService";
import { t } from "../../i18n";

const ALL_SECTIONS: { key: string; label: string }[] = [
  { key: "profile", label: t("profile") },
  { key: "experiences", label: t("experiences") },
  { key: "projects", label: t("projects") },
  { key: "skills", label: t("skills") },
  { key: "education", label: t("education") },
];

export default function ResumeEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [sections, setSections] = useState<string[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!id) return;
    const r = getById(id);
    if (!r) return;
    setName(r.name);
    setSections(r.sections || []);
  }, [id]);

  function onDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.setData("text/plain", String(index));
  }

  function onDrop(e: React.DragEvent, index: number) {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;
    const items = [...sections];
    const [moved] = items.splice(from, 1);
    items.splice(index, 0, moved);
    setSections(items);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function removeSection(key: string) {
    setSections((s) => s.filter((x) => x !== key));
  }

  function addSection(key: string) {
    setSections((s) => [...s, key]);
  }

  function save() {
    if (!id) return;
    update(id, { name, sections });
    alert(t("saved"));
  }

  function preview() {
    if (!id) return;
    update(id, { name, sections });
    nav(`/resumes/${id}/preview`);
  }

  const available = ALL_SECTIONS.filter((a) => !sections.includes(a.key));

  return (
    <section>
      <h2>{t('edit')} {t('resume')}</h2>
      <div>
        <label>{t('name')}</label>
        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
      </div>

      <h3>{t('sectionsReorder')}</h3>
      <ul>
        {sections.map((s, i) => (
          <li
            key={s}
            draggable
            onDragStart={(e) => onDragStart(e, i)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, i)}
          >
            <strong>{ALL_SECTIONS.find((x) => x.key === s)?.label || s}</strong>
            <div className="actions">
              <button className="secondary" onClick={() => removeSection(s)}>
                {t('remove')}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <label>{t('addSection')}</label>
        <select onChange={(e) => addSection(e.currentTarget.value)} defaultValue="">
          <option value="">{t('selectSection')}</option>
          {available.map((a) => (
            <option key={a.key} value={a.key}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button onClick={save}>{t('save')}</button>
        <button onClick={preview}>{t('previewExport')}</button>
      </div>
    </section>
  );
}
