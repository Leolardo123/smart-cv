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

  if (!profile) return <p className="muted">{t("notFound")}</p>;

  return (
    <section>
      <h2>{profile.name}</h2>
      <p className="muted">{profile.title}</p>
      <p className="muted">{profile.email}</p>
      <div dangerouslySetInnerHTML={{ __html: profile.notes || "" }} />
      <Link to={`/profiles/${profile.id}/edit`}>{t("edit")}</Link>
      <button
        className="secondary"
        style={{ marginLeft: 8 }}
        onClick={handleDelete}
      >
        {t("delete")}
      </button>
    </section>
  );
}
