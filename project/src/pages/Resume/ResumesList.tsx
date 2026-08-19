import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAll, remove, Resume } from "../../services/resumeService";
import { t } from "../../i18n";

export default function ResumesList() {
  const [items, setItems] = useState<Resume[]>([]);
  const nav = useNavigate();

  useEffect(() => setItems(getAll()), []);

  function del(id: string) {
    if (!confirm(t('confirmDelete'))) return;
    remove(id);
    setItems(getAll());
  }

  return (
    <section>
      <h2>{t('resumes')}</h2>
      <Link to="/resumes/create">{t('createResume')}</Link>
      <ul>
        {items.length === 0 && <li className="muted">{t('noItems')}</li>}
        {items.map((r) => (
          <li key={r.id}>
            <Link to={`/resumes/${r.id}/preview`}>{r.name}</Link>
            <div className="actions">
              <Link to={`/resumes/${r.id}/edit`}>{t('edit')}</Link>
              <button className="secondary" onClick={() => del(r.id)}>
                {t('delete')}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
