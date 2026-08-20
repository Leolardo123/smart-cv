import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Profile } from "../../services/profileService";
import { t } from "../../i18n";

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!id) return;
    const p = getById(id) || null;
    setProfile(p);
  }, [id]);

  function handleDelete() {
    if (!id) return;
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    navigate("/profiles");
  }

  if (!profile) return <p className="text-slate-400">{t("notFound")}</p>;

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold">{profile.name}</h2>
      <p className="text-slate-400">{profile.title}</p>
      <p className="text-slate-400">{profile.email}</p>
      <div className="mt-3 bg-slate-800 p-4 rounded text-slate-100" dangerouslySetInnerHTML={{ __html: profile.notes || "" }} />
      <div className="flex gap-2 mt-3">
        <Link className="text-tone1" to={`/profiles/${profile.id}/edit`}>{t("edit")}</Link>
        <button className="text-red-400" onClick={handleDelete}>{t("delete")}</button>
      </div>
    </section>
  );
}
