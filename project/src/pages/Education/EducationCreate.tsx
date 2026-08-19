import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/educationService";
import RichTextEditor from "../../components/RichTextEditor";
import { getAll as getSkills } from "../../services/skillService";
import { t } from "../../i18n";

type SkillOption = { id: string; name: string };

export default function EducationCreate(){
  const [school,setSchool]=useState(''); const [degree,setDegree]=useState(''); const [start,setStart]=useState(''); const [end,setEnd]=useState(''); const [notes,setNotes]=useState('');
  const [skillsSelected,setSkillsSelected]=useState<string[]>([]);
  const [error,setError]=useState('');
  const skills: SkillOption[] = getSkills();
  const nav = useNavigate();
  function submit(e:React.FormEvent){
    e.preventDefault();
    if(!school.trim()){ setError('School is required'); return; }
    const r = create({ school, degree, start, end, notes, skills: skillsSelected });
    nav(`/education/${r.id}`);
  }
  return (
    <section>
      <h2>{t('addEducation')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('school') || 'School'}</label><input value={school} onChange={e=>setSchool(e.currentTarget.value)} /></div>
        <div><label>{t('degree') || 'Degree'}</label><input value={degree} onChange={e=>setDegree(e.currentTarget.value)} /></div>
        <div><label>{t('start')}</label><input type="date" value={start} onChange={e=>setStart(e.currentTarget.value)} /></div>
        <div><label>{t('end')}</label><input type="date" value={end} onChange={e=>setEnd(e.currentTarget.value)} /></div>
        <div><label>{t('notes')}</label><RichTextEditor value={notes} onChange={setNotes} /></div>
        <div>
          <label>{t('relatedSkills') || 'Related skills/technologies'}</label>
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
