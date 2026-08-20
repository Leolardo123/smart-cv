import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getById, remove, Experience } from "../../services/experienceService";
import { t } from "../../i18n";

export default function ExperienceDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState<Experience | null>(null);
  
  useEffect(() => {
    if (!id) return;
    setItem(getById(id) || null);
  }, [id]);

  function del() {
    if (!id) return;
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    nav("/experiences");
  }

  if (!item) return <p className="muted">{t("noItems")}</p>;

  return (
    <section>
      <div className="card-header">
        <div>
          <h2>{item.title}</h2>
          <p className="muted">{item.company}</p>
        </div>
        <div className="card-meta">
          <p className="muted">
            {item.start || ""} — {item.end || ""}
          </p>
          <div className="actions">
            <Link to={`/experiences/${item.id}/edit`}>{t("edit")}</Link>
            <button className="secondary" onClick={del}>
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
      <div className="card-description">{item.description || ""}</div>
    </section>
  );
}
