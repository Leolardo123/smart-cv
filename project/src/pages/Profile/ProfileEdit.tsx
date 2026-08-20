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
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    update(id, { name, title, email, notes });
    navigate(`/profiles/${id}`);
  }

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{t("edit")} {t("profile")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-800 p-4 rounded">
        <div>
          <label className="block text-sm text-slate-300">{t("name")}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("titleLabel")}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("email")}</label>
          <input className="w-full mt-1 p-2 rounded bg-slate-900 border border-slate-700 text-slate-100" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">{t("notes")}</label>
          <div className="mt-1"><RichTextEditor value={notes} onChange={setNotes} /></div>
        </div>
        {error && <div className="text-red-400">{error}</div>}
        <div>
          <button className="bg-tone1 text-white px-4 py-2 rounded" type="submit">{t("save")}</button>
        </div>
      </form>
    </section>
  );
}
