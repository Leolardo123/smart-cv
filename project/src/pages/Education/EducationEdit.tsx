import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/educationService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

export default function EducationEdit(){
  const { id } = useParams(); const nav = useNavigate();
  const [school,setSchool]=useState(''); const [degree,setDegree]=useState(''); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const [notes,setNotes]=useState('');
  const [skillsSelected,setSkillsSelected]=useState<string[]>([]);
  const [error,setError]=useState('');
  const skills = getSkills();
  useEffect(()=>{ if(!id) return; const e = getById(id); if(!e) return; setSchool(e.school); setDegree(e.degree||''); setStart(e.start||''); setEnd(e.end||''); setNotes(e.notes||''); setSkillsSelected(e.skills||[]); },[id]);
  function submit(e:React.FormEvent){ e.preventDefault(); if(!id) return; if(!school.trim()){ setError('School is required'); return;} update(id,{school,degree,start,end,notes, skills: skillsSelected}); nav(`/education/${id}`); }
  return (
    <section>
      <h2>{t('edit')} {t('education')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('school')}</label><input value={school} onChange={e=>setSchool(e.currentTarget.value)} /></div>
        <div><label>{t('degree')}</label><input value={degree} onChange={e=>setDegree(e.currentTarget.value)} /></div>
        <div className="field-row"><div><label>{t('start')}</label><input type="date" value={start} onChange={e=>setStart(e.currentTarget.value)} /></div>
        <div><label>{t('end')}</label><input type="date" value={end} onChange={e=>setEnd(e.currentTarget.value)} /></div></div>
        <div><label>{t('notes')}</label><RichTextEditor value={notes} onChange={setNotes} /></div>
        <div>
          <label>{t('relatedSkills')}</label>
          <select multiple value={skillsSelected} onChange={(e)=> setSkillsSelected(Array.from(e.currentTarget.selectedOptions).map(o=>o.value))}>
            {skills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  )
}
