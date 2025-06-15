
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { validateStep } from '../validation/stepValidation';
import { FirmData } from '../types/onboardingTypes';

export const useOnboardingWizard = () => {
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

  const handleNext = async (stepConfig: any[]) => {
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

  const canProceed = () => {
    if (currentStep === 4) {
      return firmData.agreements.termsOfService && 
             firmData.agreements.privacyPolicy && 
             firmData.agreements.businessAssociate;
    }
    return true;
  };

  return {
    currentStep,
    isLoading,
    validationErrors,
    firmData,
    totalSteps,
    updateFirmData,
    handleNext,
    handleBack,
    canProceed
  };
};
