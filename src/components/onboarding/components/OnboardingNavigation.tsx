
import React from 'react';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';

interface OnboardingNavigationProps {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export const OnboardingNavigation: React.FC<OnboardingNavigationProps> = ({
  currentStep,
  totalSteps,
  isLoading,
  canProceed,
  onBack,
  onNext
}) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 1 || isLoading}
        className="px-6"
      >
        Back
      </Button>
      
      <div className="flex items-center gap-4">
        {currentStep < totalSteps && (
          <div className="text-sm text-gray-500">
            Press Enter to continue
          </div>
        )}
        <LoadingButton
          onClick={onNext}
          loading={isLoading}
          loadingText="Setting up firm..."
          disabled={!canProceed}
          className="px-8"
        >
          {currentStep === totalSteps ? 'Complete Setup' : 'Next Step'}
        </LoadingButton>
      </div>
    </div>
  );
};
