import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Skill } from "../../services/skillService";
import { t } from "../../i18n";

export default function SkillDetail(){
  const { id } = useParams(); const nav = useNavigate();
  const [item,setItem]=useState<Skill|null>(null);
  useEffect(()=>{ if(!id) return; setItem(getById(id)||null); },[id]);
  function del(){ if(!id) return; if(!confirm(t('confirmDelete'))) return; remove(id); nav('/skills'); }
  if(!item) return <p className="muted">{t('noItems')}</p>
  return (
    <section>
      <h2>{item.name}</h2>
      <p className="muted">{item.level} • {item.years || ''} {t('years')}</p>
      <Link to={`/skills/${item.id}/edit`}>{t('edit')}</Link>
      <button className="secondary" onClick={del}>{t('delete')}</button>
    </section>
  );
}
