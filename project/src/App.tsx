import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { getActiveProfile } from "./services/profileService";
import { t, getLocale, setLocale, availableLocales } from "./i18n";
import ProfilesList from "./pages/Profile/ProfilesList";
import ProfileCreate from "./pages/Profile/ProfileCreate";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import ProfileDetail from "./pages/Profile/ProfileDetail";
import ExperiencesList from "./pages/Experience/ExperiencesList";
import ExperienceCreate from "./pages/Experience/ExperienceCreate";
import ExperienceEdit from "./pages/Experience/ExperienceEdit";
import ExperienceDetail from "./pages/Experience/ExperienceDetail";
import ProjectsList from "./pages/Project/ProjectsList";
import ProjectCreate from "./pages/Project/ProjectCreate";
import ProjectEdit from "./pages/Project/ProjectEdit";
import ProjectDetail from "./pages/Project/ProjectDetail";
import SkillsList from "./pages/Skill/SkillsList";
import SkillCreate from "./pages/Skill/SkillCreate";
import SkillEdit from "./pages/Skill/SkillEdit";
import SkillDetail from "./pages/Skill/SkillDetail";
import EducationList from "./pages/Education/EducationList";
import EducationCreate from "./pages/Education/EducationCreate";
import EducationEdit from "./pages/Education/EducationEdit";
import EducationDetail from "./pages/Education/EducationDetail";
import ResumesList from "./pages/Resume/ResumesList";
import ResumeCreate from "./pages/Resume/ResumeCreate";
import ResumeEdit from "./pages/Resume/ResumeEdit";
import ResumePreview from "./pages/Resume/ResumePreview";
import Button from "./components/Button";
// Jobs section removed (merged/omitted for now)

function App() {
  const [active, setActive] = React.useState(getActiveProfile());
  const [locale, setLocalState] = React.useState<string>(getLocale());
  const [navVisible, setNavVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    function onLocale() {
      setLocalState(getLocale());
    }
    window.addEventListener("localeChange", onLocale);
    return () => window.removeEventListener("localeChange", onLocale);
  }, []);

  React.useEffect(() => {
    function onChange() {
      setActive(getActiveProfile());
    }
    window.addEventListener("activeProfileChange", onChange);
    return () => window.removeEventListener("activeProfileChange", onChange);
  }, []);



  return (
    <BrowserRouter>
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <Button
          customCss={`md:hidden block ${navVisible ? "bg-tone1 text-white border-tone1" : ""}`}
          onClick={() => setNavVisible(!navVisible)}
        >
          <span>☰</span>
        </Button>
        <div className={`${navVisible ? "block" : "hidden"} md:flex flex-row gap-4 items-center w-full md:w-auto`}>
          <nav className="flex flex-wrap gap-4">
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/profiles">{t("profile")}</Link>
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/experiences">{t("experiences")}</Link>
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/projects">{t("projects")}</Link>
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/skills">{t("skills")}</Link>
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/education">{t("education")}</Link>
            <Link className="text-tone1 font-semibold border border-tone1 px-3 py-1 rounded" to="/resumes">{t("resume")}</Link>
          </nav>
          <div className="ml-auto">
            <select
              className="bg-slate-800 text-tone1 border border-slate-700 p-2 rounded uppercase"
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
            >
              {availableLocales().map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="truncate max-w-xs text-slate-100 mt-2 md:mt-0">
          {active ? (
            <span>
              {t("profileLabel")} {active.name}
            </span>
          ) : (
            <span>{t("selectedProfileNone")}</span>
          )}
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/profiles" replace />} />
          <Route path="/profiles" element={<ProfilesList />} />
          <Route path="/profiles/create" element={<ProfileCreate />} />
          <Route path="/profiles/:id/edit" element={<ProfileEdit />} />
          <Route path="/profiles/:id" element={<ProfileDetail />} />

          <Route path="/experiences" element={<ExperiencesList />} />
          <Route path="/experiences/create" element={<ExperienceCreate />} />
          <Route path="/experiences/:id/edit" element={<ExperienceEdit />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />

          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          <Route path="/skills" element={<SkillsList />} />
          <Route path="/skills/create" element={<SkillCreate />} />
          <Route path="/skills/:id/edit" element={<SkillEdit />} />
          <Route path="/skills/:id" element={<SkillDetail />} />

          <Route path="/education" element={<EducationList />} />
          <Route path="/education/create" element={<EducationCreate />} />
          <Route path="/education/:id/edit" element={<EducationEdit />} />
          <Route path="/education/:id" element={<EducationDetail />} />

          <Route path="/resumes" element={<ResumesList />} />
          <Route path="/resumes/create" element={<ResumeCreate />} />
          <Route path="/resumes/:id/edit" element={<ResumeEdit />} />
          <Route path="/resumes/:id/preview" element={<ResumePreview />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
