import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/resumeService";
import { t } from "../../i18n";

const DEFAULT_SECTIONS = [
  "profile",
  "experiences",
  "projects",
  "skills",
  "education",
];

export default function ResumeCreate() {
  const [name, setName] = useState("");
  const nav = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return alert(t("missingName"));
    const r = create({ name, sections: DEFAULT_SECTIONS });
    nav(`/resumes/${r.id}/edit`);
  }

  return (
    <section>
      <h2>
        {t("create")} {t("resume")}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t("name")}</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <button type="submit">{t("create")}</button>
      </form>
    </section>
  );
}
