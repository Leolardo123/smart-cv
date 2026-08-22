import { useState } from 'react';
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface ResumeItem {
  title: string;
  summary: string;
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<ResumeItem[]>([
    { title: 'PLACEHOLDER', summary: 'PLACEHOLDER' },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("resumes")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current='resumes' />
        <div className="w-full space-y-3">
          {resumes.map((resume) => (
            <ListingItem
              key={resume.title}
              title={resume.title}
              subtitle={resume.summary}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
