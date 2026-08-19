import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, remove, Education } from "../../services/educationService";
import { t } from "../../i18n";

export default function EducationList(){
  const [items,setItems]=useState<Education[]>([]);
  useEffect(()=> setItems(getAll()),[]);
  function del(id:string){ if(!confirm(t('confirmDelete'))) return; remove(id); setItems(getAll()); }
  return (
    <section>
      <h2>{t('education')}</h2>
      <Link to="/education/create">{t('addEducation')}</Link>
      <ul>{items.length===0 && <li className="muted">{t('noItems')}</li>}
        {items.map(e=> (<li key={e.id}><Link to={`/education/${e.id}`}>{e.school}</Link>
        <div className="actions"><Link to={`/education/${e.id}/edit`}>{t('edit')}</Link>
        <button className="secondary" onClick={()=>del(e.id)}>{t('delete')}</button></div></li>))}
      </ul>
    </section>
  )
}
