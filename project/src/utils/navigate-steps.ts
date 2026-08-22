export function getNextStep<T extends string>(
  currentStep: T,
  navigationSteps: readonly T[],
): string {
  const currentIndex = navigationSteps.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === navigationSteps.length - 1) {
    return "";
  }
  return "/" + navigationSteps[currentIndex + 1];
}

export function getPreviousStep<T extends string>(
  currentStep: T,
  navigationSteps: readonly T[],
): string {
  const currentIndex = navigationSteps.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === 0) {
    return "";
  }
  return "/" + navigationSteps[currentIndex - 1];
}
