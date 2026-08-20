import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/resumeService";
import { t, getLocale } from "../../i18n";
import { getAll as getProfiles } from "../../services/profileService";
import { getAll as getExperiences } from "../../services/experienceService";
import { getAll as getProjects } from "../../services/projectService";
import { getAll as getSkills } from "../../services/skillService";
import { getAll as getEducation } from "../../services/educationService";

function buildHtml(title: string, bodyHtml: string) {
  const lang = getLocale() || "pt";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${title}</title>
  <style>
    html,body{height:100%;margin:0}
    body{font-family:Arial,Helvetica,sans-serif;padding:24px;background:#ffffff;color:#0f1724}
    h1{font-size:20px}
    h2{font-size:16px;margin:8px 0}
    .section{margin-bottom:16px}
  </style>
  </head><body>${bodyHtml}</body></html>`;
}

export default function ResumePreview() {
  const { id } = useParams();
  const [html, setHtml] = useState("<p>Loading...</p>");

  function buildPreviewHtml(): string {
    if (!id) return buildHtml("", `<p>${t("resumeNotFound")}</p>`);
    const r = getById(id);
    if (!r) return buildHtml("", `<p>${t("resumeNotFound")}</p>`);

    const profiles = getProfiles();
    const experiences = getExperiences();
    const projects = getProjects();
    const skills = getSkills();
    const education = getEducation();

    const parts: string[] = [];
    for (const s of r.sections) {
      if (s === "profile") {
        const p = profiles[0];
        if (p)
          parts.push(
            `<div class="section"><h1>${p.name}</h1><p>${p.title || ""}</p><p>${p.email || ""}</p></div>`,
          );
      }
      if (s === "experiences") {
        if (experiences.length) {
          parts.push(
            `<div class="section"><h2>${t("experiences")}</h2>${experiences
              .map(
                (e) =>
                  `<div><strong>${e.title}</strong> <em>${e.company || ""}</em><div>${e.start || ""} — ${e.end || ""}</div><div>${e.description || ""}</div></div>`,
              )
              .join("")}</div>`,
          );
        }
      }
      if (s === "projects") {
        if (projects.length) {
          parts.push(
            `<div class="section"><h2>${t("projects")}</h2>${projects
              .map(
                (p) =>
                  `<div><strong>${p.name}</strong><div>${p.link || ""}</div><div>${p.summary || ""}</div></div>`,
              )
              .join("")}</div>`,
          );
        }
      }
      if (s === "skills") {
        if (skills.length) {
          parts.push(
            `<div class="section"><h2>${t("skills")}</h2><div>${skills.map((s) => `<span>${s.name}</span>`).join(", ")}</div></div>`,
          );
        }
      }
      if (s === "education") {
        if (education.length) {
          parts.push(
            `<div class="section"><h2>${t("education")}</h2>${education
              .map(
                (e) =>
                  `<div><strong>${e.school}</strong><div>${e.degree || ""} • ${e.start || ""} — ${e.end || ""}</div><div>${e.notes || ""}</div></div>`,
              )
              .join("")}</div>`,
          );
        }
      }
    }

    return buildHtml(r.name, parts.join(""));
  }

  useEffect(() => {
    setHtml(buildPreviewHtml());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function exportPdf() {
    const out = buildPreviewHtml();
    // try to open a new window and write the content synchronously to avoid blockers
    const w = window.open("", "_blank", "width=900,height=1200");
    if (w) {
      w.document.open();
      w.document.write(out);
      w.document.close();
      // allow render then print
      setTimeout(() => {
        try {
          w.focus();
          w.print();
        } catch (e) {
          // ignore
        }
      }, 350);
      return;
    }

    // fallback: replace current content with preview and call print
    // set html to out so the page shows the latest preview and instruct user to press print
    setHtml(out);
    alert(t("popupBlocked"));
  }

  return (
    <section>
      <h2>
        {t("resume")} — {t("preview")}
      </h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={exportPdf}>{t("previewExport")}</button>
      </div>
      <div>
        <iframe
          title={t("preview")}
          srcDoc={html}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
}
