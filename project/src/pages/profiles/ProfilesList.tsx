import React, { useState } from 'react'
import { t } from '../../i18n'
import NavigationPage from '../../components/NavigationPage';
import { navigateMainSteps } from '../../data/navigationsSteps';
import ListingItem from '../../components/ListingItem';

interface Profiles {
  name: string;
  role: string;
}

export default function ProfilesList() {
  const [profiles, setProfiles] = useState<Profiles[]>([
    { name: "PLACEHOLDER", role: "PLACEHOLDER" },
  ]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4 bg-(--tone1) p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{t("profile")}</h1>
        <NavigationPage navigationSteps={navigateMainSteps} current="profiles" />
        <div className="w-full space-y-3">
          {profiles?.map((p) => (
            <ListingItem
              key={p.name}
              title={p.name}
              subtitle={p.role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
