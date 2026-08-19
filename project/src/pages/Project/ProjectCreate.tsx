import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/projectService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

type SkillOption = { id: string; name: string };

export default function ProjectCreate(){
  const [name,setName]=useState(''); const [summary,setSummary]=useState(''); const [link,setLink]=useState('');
  const [tags,setTags]=useState<string[]>([]);
  const [error,setError]=useState('');
  const skills: SkillOption[] = getSkills();
  const nav = useNavigate();
  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!name.trim()){ setError('Project name is required'); return; }
    const p = create({ name, summary, link, tags });
    nav(`/projects/${p.id}`);
  }
  return (
    <section>
      <h2>{t('addProject')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('name')}</label><input value={name} onChange={e=>setName(e.currentTarget.value)} /></div>
        <div><label>{t('description')}</label><RichTextEditor value={summary} onChange={setSummary} /></div>
        <div>
          <label>{t('skills')} ({t('select')})</label>
          <select multiple value={tags} onChange={(e)=>{
            const selected = Array.from(e.currentTarget.selectedOptions).map(o=>o.value);
            setTags(selected);
          }}>
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
