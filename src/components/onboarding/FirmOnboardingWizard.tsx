
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Building, Users, Settings, Shield } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import { useToast } from '@/hooks/use-toast';

interface FirmData {
  firmName: string;
  subdomain: string;
  address: string;
  phone: string;
  email: string;
  primaryContact: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
  userCount: string;
  specialties: string[];
}

const FirmOnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
    specialties: []
  });
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for firm setup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Firm Onboarded Successfully!",
        description: `${firmData.firmName} has been set up with subdomain: ${firmData.subdomain}.medrecordsapp.com`,
      });
      
      console.log('Firm onboarding completed:', firmData);
    } catch (error) {
      toast({
        title: "Onboarding Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFirmData = (field: keyof FirmData, value: string | string[]) => {
    setFirmData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Firm Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firmName">Law Firm Name *</Label>
                <Input
                  id="firmName"
                  value={firmData.firmName}
                  onChange={(e) => updateFirmData('firmName', e.target.value)}
                  placeholder="e.g., Smith & Associates Law"
                />
              </div>
              
              <div>
                <Label htmlFor="subdomain">Subdomain *</Label>
                <div className="flex items-center">
                  <Input
                    id="subdomain"
                    value={firmData.subdomain}
                    onChange={(e) => updateFirmData('subdomain', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="smithlaw"
                    className="rounded-r-none"
                  />
                  <span className="bg-gray-100 border border-l-0 px-3 py-2 text-sm text-gray-600 rounded-r">
                    .medrecordsapp.com
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Textarea
                id="address"
                value={firmData.address}
                onChange={(e) => updateFirmData('address', e.target.value)}
                placeholder="123 Main Street, Suite 100, City, State 12345"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={firmData.phone}
                  onChange={(e) => updateFirmData('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Firm Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={firmData.email}
                  onChange={(e) => updateFirmData('email', e.target.value)}
                  placeholder="info@smithlaw.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Administrator Setup</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminFirstName">Admin First Name *</Label>
                <Input
                  id="adminFirstName"
                  value={firmData.adminFirstName}
                  onChange={(e) => updateFirmData('adminFirstName', e.target.value)}
                  placeholder="John"
                />
              </div>
              
              <div>
                <Label htmlFor="adminLastName">Admin Last Name *</Label>
                <Input
                  id="adminLastName"
                  value={firmData.adminLastName}
                  onChange={(e) => updateFirmData('adminLastName', e.target.value)}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="adminEmail">Admin Email Address *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={firmData.adminEmail}
                onChange={(e) => updateFirmData('adminEmail', e.target.value)}
                placeholder="admin@smithlaw.com"
              />
              <p className="text-sm text-gray-600 mt-1">This person will receive login credentials and have full system access.</p>
            </div>

            <div>
              <Label htmlFor="userCount">Expected Number of Users</Label>
              <Select value={firmData.userCount} onValueChange={(value) => updateFirmData('userCount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 users</SelectItem>
                  <SelectItem value="6-10">6-10 users</SelectItem>
                  <SelectItem value="11-25">11-25 users</SelectItem>
                  <SelectItem value="26-50">26-50 users</SelectItem>
                  <SelectItem value="50+">50+ users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Configuration</h3>
            </div>

            <div>
              <Label>Practice Areas (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  'Personal Injury',
                  'Medical Malpractice',
                  'Workers Compensation',
                  'Auto Accidents',
                  'Slip & Fall',
                  'Product Liability',
                  'Wrongful Death',
                  'General Litigation'
                ].map((specialty) => (
                  <label key={specialty} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={firmData.specialties.includes(specialty)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFirmData('specialties', [...firmData.specialties, specialty]);
                        } else {
                          updateFirmData('specialties', firmData.specialties.filter(s => s !== specialty));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">What happens next?</h4>
              <ul className="text-sm space-y-1">
                <li>• Your firm subdomain will be created</li>
                <li>• Administrator account will be set up</li>
                <li>• Welcome email with login instructions will be sent</li>
                <li>• You'll have access to upload client data and start using the system</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Legal & Compliance</h3>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Required Agreements</h4>
                <div className="space-y-2">
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm">
                      I have read and agree to the <a href="#" className="text-primary underline">Terms of Service</a>
                    </span>
                  </label>
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm">
                      I have read and understand the <a href="#" className="text-primary underline">Privacy Policy</a>
                    </span>
                  </label>
                  <label className="flex items-start space-x-2">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm">
                      I agree to the <a href="#" className="text-primary underline">Business Associate Agreement (BAA)</a> for HIPAA compliance
                    </span>
                  </label>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">HIPAA Compliance Ready</h4>
                </div>
                <p className="text-sm text-green-700">
                  Your platform is configured with all necessary security measures for HIPAA compliance,
                  including encryption, audit logging, and access controls.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">New Law Firm Onboarding</CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="min-h-[400px]">
            {renderStep()}
          </div>
          
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <LoadingButton
              onClick={handleNext}
              loading={isLoading}
              loadingText="Setting up firm..."
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Next Step'}
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirmOnboardingWizard;
