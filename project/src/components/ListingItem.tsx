import React from "react";
import Button from "./Button";
import { t } from "../i18n";

interface ListingTableProps {
  title: string;
  subtitle?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ListingItem({
  title,
  subtitle,
  onDelete,
  onEdit,
}: ListingTableProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-slate-700 bg-(--tone-2) p-3 shadow-sm">
      <div className="flex min-w-0 flex-col">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs font-semibold text-slate-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {onEdit && (
          <Button className="w-auto" onClick={onEdit}>
            {t("edit")}
          </Button>
        )}
        {onDelete && (
          <Button className="w-auto" onClick={onDelete}>
            {t("delete")}
          </Button>
        )}
      </div>
    </div>
  );
}
