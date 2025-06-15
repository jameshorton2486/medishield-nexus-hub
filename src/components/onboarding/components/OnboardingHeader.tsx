
import React from 'react';
import { Building, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepConfig: Array<{
    number: number;
    title: string;
    icon: React.ComponentType<any>;
  }>;
}

export const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  stepConfig
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg p-6">
      <h1 className="text-2xl font-bold text-card-foreground flex items-center gap-2 mb-4">
        <Building className="h-6 w-6 text-primary" />
        New Law Firm Onboarding
      </h1>
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep} of {totalSteps}: {stepConfig[currentStep - 1].title}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full h-2" />
        
        {/* Step indicators */}
        <div className="flex justify-between mt-4">
          {stepConfig.map((step) => (
            <div
              key={step.number}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                currentStep === step.number 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : currentStep > step.number 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-500'
              }`}
            >
              {currentStep > step.number ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <step.icon className="h-4 w-4" />
              )}
              <span className="text-sm font-medium hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
