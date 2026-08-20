import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create } from "../../services/skillService";
import { t } from "../../i18n";

export default function SkillCreate() {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [years, setYears] = useState<number | "">("");
  const nav = useNavigate();
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const s = create({
      name,
      level,
      years: typeof years === "number" ? years : undefined,
    });
    nav(`/skills/${s.id}`);
  }
  return (
    <section>
      <h2>{t("addSkill")}</h2>
      <form onSubmit={submit}>
        <div>
          <label>{t("name")}</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>{t("level") || "Level"}</label>
          <input
            value={level}
            onChange={(e) => setLevel(e.currentTarget.value)}
          />
        </div>
        <div>
          <label>{t("years") || "Years"}</label>
          <input
            value={years as any}
            onChange={(e) =>
              setYears(
                e.currentTarget.value ? Number(e.currentTarget.value) : "",
              )
            }
          />
        </div>
        <button type="submit">{t("save")}</button>
      </form>
    </section>
  );
}
