
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { OnboardingHeader } from './components/OnboardingHeader';
import { OnboardingNavigation } from './components/OnboardingNavigation';
import { useOnboardingWizard } from './hooks/useOnboardingWizard';
import { stepConfig } from './config/stepConfig';

const FirmOnboardingWizard = () => {
  const {
    currentStep,
    isLoading,
    validationErrors,
    firmData,
    totalSteps,
    updateFirmData,
    handleNext,
    handleBack,
    canProceed
  } = useOnboardingWizard();

  const getCurrentStepComponent = () => {
    const StepComponent = stepConfig[currentStep - 1].component;
    return (
      <StepComponent
        firmData={firmData}
        updateFirmData={updateFirmData}
        validationErrors={validationErrors}
      />
    );
  };

  const handleNextStep = () => handleNext(stepConfig);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <OnboardingHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepConfig={stepConfig}
        />
        
        <CardContent className="p-8">
          <div className="min-h-[500px]">
            {getCurrentStepComponent()}
          </div>
          
          <OnboardingNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            isLoading={isLoading}
            canProceed={canProceed()}
            onBack={handleBack}
            onNext={handleNextStep}
          />
        </CardContent>
      </Card>
      
      {/* Help text */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Need help? Contact{" "}
        <a
          href="mailto:support@medrecordsapp.com"
          className="text-primary hover:underline font-medium"
        >
          support@medrecordsapp.com
        </a>
      </div>
    </div>
  );
};

export default FirmOnboardingWizard;
