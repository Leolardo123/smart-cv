import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/profileService";
import RichTextEditor from "../../components/RichTextEditor";
import { t } from "../../i18n";

export default function ProfileCreate() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(t("nameRequired"));
      return;
    }
    const p = create({ name, title, email, notes });
    navigate(`/profiles/${p.id}`);
  }

  return (
    <section>
      <h2>
        {t("create")} {t("profile")}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("name")}</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>{t("titleLabel")}</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>{t("email")}</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>{t("notes")}</label>
          <RichTextEditor value={notes} onChange={setNotes} />
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{t("create")}</button>
      </form>
    </section>
  );
}
