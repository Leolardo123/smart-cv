import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAll,
  remove,
  Profile,
  setActiveProfileId,
  getActiveProfileId,
} from "../../services/profileService";
import { t } from "../../i18n";

export default function ProfilesList() {
  const [items, setItems] = useState<Profile[]>([]);

  useEffect(() => {
    setItems(getAll());
  }, []);

  const [activeId, setActiveId] = React.useState<string | null>(
    getActiveProfileId(),
  );

  useEffect(() => {
    function onChange() {
      setActiveId(getActiveProfileId());
      setItems(getAll());
    }
    window.addEventListener("activeProfileChange", onChange);
    return () => window.removeEventListener("activeProfileChange", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDelete(id: string) {
    if (!confirm(t("confirmDelete"))) return;
    remove(id);
    setItems(getAll());
  }

  return (
    <section>
      <h2>{t("profile")}</h2>
      <Link to="/profiles/create">{t("createNewProfile")}</Link>
      <ul>
        {items.length === 0 && <li>{t("noItems")}</li>}
        {items.map((p) => (
          <li key={p.id} style={{ marginBottom: 6 }}>
            <Link
              to={`/profiles/${p.id}`}
              style={{ fontWeight: activeId === p.id ? "700" : undefined }}
            >
              {p.name || t("noName")}
            </Link>
            {p.title && <span> — {p.title}</span>}
            <span style={{ marginLeft: 8 }}>
              <Link to={`/profiles/${p.id}/edit`}>{t("edit")}</Link>
            </span>
            <button
              style={{ marginLeft: 8 }}
              onClick={() => setActiveProfileId(p.id)}
            >
              {t("select")}
            </button>
            <button
              style={{ marginLeft: 8 }}
              onClick={() => handleDelete(p.id)}
            >
              {t("delete")}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
