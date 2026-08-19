import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/projectService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

export default function ProjectEdit(){
  const { id } = useParams(); const nav = useNavigate();
  const [name,setName]=useState(''); const [summary,setSummary]=useState(''); const [link,setLink]=useState('');
  const [tags,setTags]=useState<string[]>([]);
  const [error,setError]=useState('');
  const skills = getSkills();
  useEffect(()=>{ if(!id) return; const p = getById(id); if(!p) return; setName(p.name); setSummary(p.summary||''); setLink(p.link||''); setTags(p.tags||[]); },[id]);
  function submit(e:React.FormEvent){ e.preventDefault(); if(!id) return; if(!name.trim()){ setError('Project name is required'); return; } update(id,{name,summary,link,tags}); nav(`/projects/${id}`); }
  return (
    <section>
      <h2>{t('edit')} {t('projects')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('name')}</label><input value={name} onChange={e=>setName(e.currentTarget.value)} /></div>
        <div><label>{t('description')}</label><RichTextEditor value={summary} onChange={setSummary} /></div>
        <div>
          <label>{t('skills')} ({t('select')})</label>
          <select multiple value={tags} onChange={(e)=>{ const selected = Array.from(e.currentTarget.selectedOptions).map(o=>o.value); setTags(selected); }}>
            {skills.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div><label>{t('link') || 'Link'}</label><input value={link} onChange={e=>setLink(e.currentTarget.value)} /></div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  )
}
