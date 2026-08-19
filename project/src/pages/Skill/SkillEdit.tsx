import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/skillService";
import { t } from "../../i18n";

export default function SkillEdit(){
  const { id } = useParams(); const nav = useNavigate();
  const [name,setName]=useState(''); const [level,setLevel]=useState(''); const [years,setYears]=useState<number|''>('');
  useEffect(()=>{ if(!id) return; const s = getById(id); if(!s) return; setName(s.name); setLevel(s.level||''); setYears(s.years||''); },[id]);
  function submit(e:React.FormEvent){ e.preventDefault(); if(!id) return; update(id,{name,level,years: typeof years==='number'?years:undefined}); nav(`/skills/${id}`); }
  return (
    <section>
      <h2>{t('edit')} {t('skills')}</h2>
      <form onSubmit={submit}>
        <div><label>{t('name')}</label><input value={name} onChange={e=>setName(e.currentTarget.value)} /></div>
        <div><label>{t('level')}</label><input value={level} onChange={e=>setLevel(e.currentTarget.value)} /></div>
        <div><label>{t('years')}</label><input value={years as any} onChange={e=>setYears(e.currentTarget.value?Number(e.currentTarget.value):'')} /></div>
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  )
}
