import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById, update } from "../../services/profileService";
import RichTextEditor from "../../components/RichTextEditor";
import { t } from "../../i18n";

export default function ProfileEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const p = getById(id);
    if (!p) return;
    setName(p.name || "");
    setTitle(p.title || "");
    setEmail(p.email || "");
    setNotes(p.notes || "");
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    if (!name.trim()) { setError('Name is required'); return; }
    update(id, { name, title, email, notes });
    navigate(`/profiles/${id}`);
  }

  return (
    <section>
      <h2>{t('edit')} {t('profile')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('name')}</label>
          <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </div>
        <div>
          <label>{t('titleLabel')}</label>
          <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </div>
        <div>
          <label>{t('email')}</label>
          <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label>{t('notes')}</label>
          <RichTextEditor value={notes} onChange={setNotes} />
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t('save')}</button>
      </form>
    </section>
  );
}
