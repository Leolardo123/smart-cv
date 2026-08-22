export const navigateMainSteps = [
  "profiles",
  "experiences",
  "projects",
  "skills",
  "education",
  "resumes",
] as const;

export type NavigationMain = keyof typeof navigateMainSteps;