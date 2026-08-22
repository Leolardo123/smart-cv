import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { t, getLocale, setLocale, availableLocales } from "./i18n";
import Button from "./components/Button";
import Select from "./components/Select";
import { Locale } from "./i18n/translations";
import Nav from "./components/Nav/Nav";
import ProfilesList from "./pages/profiles/ProfilesList";
import ExperienceList from "./pages/experiences/ExperienceList";
import ProjectList from "./pages/projects/ProjectList";
import SkillList from "./pages/skills/SkillList";
import EducationList from "./pages/education/EducationList";
import ResumeList from "./pages/resumes/ResumeList";
// Jobs section removed (merged/omitted for now)

function App() {
  const [locale, setLocalState] = React.useState<string>(getLocale());
  const [navVisible, setNavVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    function onLocale() {
      setLocalState(getLocale());
    }
    window.addEventListener("localeChange", onLocale);
    return () => window.removeEventListener("localeChange", onLocale);
  }, []);

  React.useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <header className="bg-slate-800 border-b border-slate-700 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <Button
          className={`md:hidden block ${navVisible ? "bg-tone1 text-white border-tone1" : ""}`}
          onClick={() => setNavVisible(!navVisible)}
        >
          <span>☰</span>
        </Button>
        <div
          className={`${navVisible ? "block" : "hidden"} md:flex flex-row gap-4 items-center w-full md:w-auto`}
        >
          <Nav />
          <div className="ml-auto">
            <Select
              value={locale}
              onChange={(value) => setLocale(value as Locale)}
              options={availableLocales()}
            />
          </div>
        </div>
        <div className="truncate max-w-xs text-slate-100 mt-2 md:mt-0">
          {true ? (
            <span>{t("profileLabel")} PLACEHOLDER</span>
          ) : (
            <span>{t("selectedProfileNone")}</span>
          )}
        </div>
      </header>
      <main className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/profiles" replace />} />
          <Route path="/profiles/*" element={<ProfilesList />} />
          <Route path="/experiences/*" element={<ExperienceList />} />
          <Route path="/projects/*" element={<ProjectList />} />
          <Route path="/skills/*" element={<SkillList />} />
          <Route path="/education/*" element={<EducationList />} />
          <Route path="/resumes/*" element={<ResumeList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
