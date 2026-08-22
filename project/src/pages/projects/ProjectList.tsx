import { useState } from 'react';
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface ProjectItem {
  title: string;
  description: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectItem[]>([
    { title: 'PLACEHOLDER', description: 'PLACEHOLDER' },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("projects")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current='projects' />
        <div className="w-full space-y-3">
          {projects.map((project) => (
            <ListingItem
              key={project.title}
              title={project.title}
              subtitle={project.description}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
