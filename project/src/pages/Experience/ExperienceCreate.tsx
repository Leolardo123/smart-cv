import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/experienceService";
import RichTextEditor from "../../components/RichTextEditor";
import { t } from "../../i18n";

export default function ExperienceCreate(){
  const [title,setTitle]=useState(''); const [company,setCompany]=useState(''); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const [description,setDescription]=useState('');
  const [error,setError]=useState('');
  const nav = useNavigate();
  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!title.trim()){ setError('Title is required'); return; }
    const p = create({ title, company, start, end, description });
    nav(`/experiences/${p.id}`);
  }
  return (
    <section>
      <h2>{t('addExperience')}</h2>
      
      <form onSubmit={submit}>
        <div><label>{t('titleLabel') || 'Title'}</label><input value={title} onChange={e=>setTitle(e.currentTarget.value)} /></div>
        <div><label>{t('company') || 'Company'}</label><input value={company} onChange={e=>setCompany(e.currentTarget.value)} /></div>
        <div className="field-row"><div><label>{t('start') || 'Start'}</label><input type="date" value={start} onChange={e=>setStart(e.currentTarget.value)} /></div>
        <div><label>{t('end') || 'End'}</label><input type="date" value={end} onChange={e=>setEnd(e.currentTarget.value)} /></div></div>
        <div><label>{t('description') || 'Description'}</label><RichTextEditor value={description} onChange={setDescription} /></div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  );
}
