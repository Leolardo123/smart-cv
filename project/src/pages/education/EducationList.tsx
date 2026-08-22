import { useState } from 'react';
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface EducationItem {
  title: string;
  school: string;
}

export default function EducationList() {
  const [education, setEducation] = useState<EducationItem[]>([
    { title: 'PLACEHOLDER', school: 'PLACEHOLDER' },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("education")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current='education' />
        <div className="w-full space-y-3">
          {education.map((entry) => (
            <ListingItem
              key={entry.title}
              title={entry.title}
              subtitle={entry.school}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
