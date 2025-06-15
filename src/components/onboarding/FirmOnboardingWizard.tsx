
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Building, Users, Settings, Shield } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import { useToast } from '@/hooks/use-toast';
import { FirmInfoStep } from './steps/FirmInfoStep';
import { AdminSetupStep } from './steps/AdminSetupStep';
import { ConfigurationStep } from './steps/ConfigurationStep';
import { LegalComplianceStep } from './steps/LegalComplianceStep';
import { validateStep } from './validation/stepValidation';
import { FirmData } from './types/onboardingTypes';

const FirmOnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [firmData, setFirmData] = useState<FirmData>({
    firmName: '',
    subdomain: '',
    address: '',
    phone: '',
    email: '',
    primaryContact: '',
    adminEmail: '',
    adminFirstName: '',
    adminLastName: '',
    userCount: '',
    specialties: [],
    agreements: {
      termsOfService: false,
      privacyPolicy: false,
      businessAssociate: false
    }
  });
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const stepConfig = [
    { number: 1, title: 'Firm Information', icon: Building, component: FirmInfoStep },
    { number: 2, title: 'Administrator Setup', icon: Users, component: AdminSetupStep },
    { number: 3, title: 'Configuration', icon: Settings, component: ConfigurationStep },
    { number: 4, title: 'Legal & Compliance', icon: Shield, component: LegalComplianceStep }
  ];

  const handleNext = async () => {
    console.log('Attempting to move to next step, current step:', currentStep);
    
    // Validate current step
    const errors = validateStep(currentStep, firmData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast({
        title: "Validation Error",
        description: "Please fix the errors before continuing.",
        variant: "destructive",
      });
      return;
    }

    setValidationErrors({});

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Step Completed",
        description: `${stepConfig[currentStep - 1].title} completed successfully.`,
      });
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setValidationErrors({});
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for firm setup
      console.log('Starting firm onboarding process...', firmData);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Firm Onboarded Successfully!",
        description: `${firmData.firmName} has been set up with subdomain: ${firmData.subdomain}.medrecordsapp.com`,
      });
      
      // In a real app, you would redirect to the dashboard or login page
      console.log('Firm onboarding completed:', firmData);
      
      // Reset form for demo purposes
      setTimeout(() => {
        setCurrentStep(1);
        setFirmData({
          firmName: '',
          subdomain: '',
          address: '',
          phone: '',
          email: '',
          primaryContact: '',
          adminEmail: '',
          adminFirstName: '',
          adminLastName: '',
          userCount: '',
          specialties: [],
          agreements: {
            termsOfService: false,
            privacyPolicy: false,
            businessAssociate: false
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Onboarding Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFirmData = (field: keyof FirmData, value: any) => {
    setFirmData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

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

  const canProceed = () => {
    if (currentStep === 4) {
      return firmData.agreements.termsOfService && 
             firmData.agreements.privacyPolicy && 
             firmData.agreements.businessAssociate;
    }
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building className="h-6 w-6 text-primary" />
            New Law Firm Onboarding
          </CardTitle>
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
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="min-h-[500px]">
            {getCurrentStepComponent()}
          </div>
          
          <div className="flex justify-between items-center pt-8 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
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
                onClick={handleNext}
                loading={isLoading}
                loadingText="Setting up firm..."
                disabled={!canProceed()}
                className="px-8"
              >
                {currentStep === totalSteps ? 'Complete Setup' : 'Next Step'}
              </LoadingButton>
            </div>
          </div>
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
