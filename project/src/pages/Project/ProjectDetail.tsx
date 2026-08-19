import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Project } from "../../services/projectService";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

export default function ProjectDetail(){
  const { id } = useParams(); const nav = useNavigate();
  const [item,setItem]=useState<Project|null>(null);
  useEffect(()=>{ if(!id) return; setItem(getById(id)||null); },[id]);
  function del(){ if(!id) return; if(!confirm(t('confirmDelete'))) return; remove(id); nav('/projects'); }
  if(!item) return <p className="muted">{t('noItems')}</p>
  const skills = getSkills();
  const techNames = (item.tags || []).map(id => skills.find(s => s.id === id)?.name).filter(Boolean) as string[];
  return (
    <section>
      <div className="card-header">
        <div>
          <h2>{item.name}</h2>
          <p className="muted">{item.link}</p>
        </div>
        <div className="card-meta">
          {techNames.length > 0 && <p className="muted">{t('skills')}: {techNames.join(', ')}</p>}
          <div className="actions">
            <Link to={`/projects/${item.id}/edit`}>{t('edit')}</Link>
            <button className="secondary" onClick={del}>{t('delete')}</button>
          </div>
        </div>
      </div>
      <div className="card-description" dangerouslySetInnerHTML={{ __html: item.summary || "" }} />
    </section>
  );
}
