import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/experienceService";
import RichTextEditor from "../../components/RichTextEditor";
import { t } from "../../i18n";

export default function ExperienceEdit(){
  const { id } = useParams(); const nav = useNavigate();
  const [title,setTitle]=useState(''); const [company,setCompany]=useState(''); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const [description,setDescription]=useState('');
  const [error,setError]=useState('');
  useEffect(()=>{ if(!id) return; const p = getById(id); if(!p) return; setTitle(p.title); setCompany(p.company||''); setStart(p.start||''); setEnd(p.end||''); setDescription(p.description||''); },[id]);
  function submit(e:React.FormEvent){ e.preventDefault(); if(!id) return; if(!title.trim()){ setError('Title is required'); return; } update(id,{title,company,start,end,description}); nav(`/experiences/${id}`); }
  return (
    <section>
      <h2>{t('edit')} {t('experiences')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('title')}</label><input value={title} onChange={e=>setTitle(e.currentTarget.value)} /></div>
        <div><label>{t('company')}</label><input value={company} onChange={e=>setCompany(e.currentTarget.value)} /></div>
        <div className="field-row"><div><label>{t('start')}</label><input type="date" value={start} onChange={e=>setStart(e.currentTarget.value)} /></div>
        <div><label>{t('end')}</label><input type="date" value={end} onChange={e=>setEnd(e.currentTarget.value)} /></div></div>
        <div><label>{t('description')}</label><RichTextEditor value={description} onChange={setDescription} /></div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  );
}
