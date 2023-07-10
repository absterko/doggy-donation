import React from "react";
import { useSelector } from "react-redux";

const stepsCache = {};

const StepDisplay = () => {
  const currentStep = useSelector((state) => state.stepper.currentStep);
  const LazyStep = stepsCache[currentStep]
    ? stepsCache[currentStep]
    : React.lazy(() => import(`./step${currentStep}`));

  if (!stepsCache[currentStep]) stepsCache[currentStep] = LazyStep;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyStep />
    </React.Suspense>
  );
};

export default StepDisplay;
