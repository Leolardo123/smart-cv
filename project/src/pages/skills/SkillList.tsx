import { useState } from 'react';
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface SkillItem {
  title: string;
  level: string;
}

export default function SkillList() {
  const [skills, setSkills] = useState<SkillItem[]>([
    { title: 'PLACEHOLDER', level: 'PLACEHOLDER' },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("skills")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current='skills' />
        <div className="w-full space-y-3">
          {skills.map((skill) => (
            <ListingItem
              key={skill.title}
              title={skill.title}
              subtitle={skill.level}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
