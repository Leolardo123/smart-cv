import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { getNextStep, getPreviousStep } from "../utils/navigate-steps";
import { t } from "../i18n";
import { cl } from "../utils/merge-styles";

interface NavigationPageProps<T extends string> {
  current: T;
  navigationSteps: readonly T[];
  className?: string;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export default function NavigationPage<T extends string>({
  current,
  navigationSteps,
  hasNext = true,
  hasPrevious = true,
  className,
}: NavigationPageProps<T>) {
  const navigate = useNavigate();
  return (
    <div className={cl("flex", className)}>
      {hasPrevious && (
        <Button
          className="w-40"
          onClick={() => navigate(getPreviousStep(current, navigationSteps))}
        >
          {t("previous")}
        </Button>
      )}
      {hasNext && (
        <Button
          className="w-40"
          onClick={() => navigate(getNextStep(current, navigationSteps))}
        >
          {t("next")}
        </Button>
      )}
    </div>
  );
}
