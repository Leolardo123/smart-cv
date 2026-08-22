import { useState } from 'react';
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface ExperienceItem {
  title: string;
  company: string;
}

export default function ExperienceList() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    { title: 'PLACEHOLDER', company: 'PLACEHOLDER' },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("experiences")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current='experiences' />
        <div className="w-full space-y-3">
          {experiences.map((experience) => (
            <ListingItem
              key={experience.title}
              title={experience.title}
              subtitle={experience.company}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
