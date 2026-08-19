import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Education } from "../../services/educationService";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

export default function EducationDetail(){
  const { id } = useParams(); const nav = useNavigate();
  const [item,setItem]=useState<Education|null>(null);
  useEffect(()=>{ if(!id) return; setItem(getById(id)||null); },[id]);
  function del(){ if(!id) return; if(!confirm(t('confirmDelete'))) return; remove(id); nav('/education'); }
  if(!item) return <p className="muted">{t('noItems')}</p>
  const skills = getSkills();
  const skillNames = (item.skills || []).map(id => skills.find(s => s.id === id)?.name).filter(Boolean) as string[];
  return (
    <section>
      <div className="card-header">
        <div>
          <h2>{item.school}</h2>
          <p className="muted">{item.degree}</p>
        </div>
        <div className="card-meta">
          <p className="muted">{item.start || ''} — {item.end || ''}</p>
          <div className="actions">
            <Link to={`/education/${item.id}/edit`}>{t('edit')}</Link>
            <button className="secondary" onClick={del}>{t('delete')}</button>
          </div>
        </div>
      </div>
      <div className="card-description" dangerouslySetInnerHTML={{ __html: item.notes || "" }} />
      {skillNames.length > 0 && <p className="muted">Skills: {skillNames.join(', ')}</p>}
    </section>
  );
}
