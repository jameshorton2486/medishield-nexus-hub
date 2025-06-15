
import React from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { StepProps } from '../types/onboardingTypes';

const practiceAreas = [
  'Personal Injury',
  'Medical Malpractice',
  'Workers Compensation',
  'Auto Accidents',
  'Slip & Fall',
  'Product Liability',
  'Wrongful Death',
  'General Litigation',
  'Family Law',
  'Criminal Defense',
  'Estate Planning',
  'Business Law'
];

export const ConfigurationStep: React.FC<StepProps> = ({ firmData, updateFirmData, validationErrors }) => {
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      updateFirmData('specialties', [...firmData.specialties, specialty]);
    } else {
      updateFirmData('specialties', firmData.specialties.filter(s => s !== specialty));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Configuration</h3>
        <p className="text-sm text-gray-600 ml-2">Customize your platform settings</p>
      </div>

      <div>
        <Label className="text-base font-medium">
          Practice Areas <span className="text-destructive">*</span>
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          Select all practice areas that apply to your firm. This helps optimize the platform for your specific needs.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {practiceAreas.map((specialty) => (
            <label 
              key={specialty} 
              className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={firmData.specialties.includes(specialty)}
                onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
              />
              <span className="text-sm font-medium">{specialty}</span>
            </label>
          ))}
        </div>
        
        {validationErrors.specialties && (
          <p className="text-sm text-destructive mt-2">{validationErrors.specialties}</p>
        )}
        
        <div className="mt-3 text-sm text-gray-600">
          Selected: {firmData.specialties.length} practice area{firmData.specialties.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-4 w-4 text-blue-600" />
          <h4 className="font-semibold text-blue-900">What happens next?</h4>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your firm subdomain will be created: <code className="bg-blue-100 px-1 rounded">{firmData.subdomain || '[subdomain]'}.medrecordsapp.com</code></li>
          <li>• Platform will be configured for your selected practice areas</li>
          <li>• Template documents and forms will be customized</li>
          <li>• Administrator account will be set up with full access</li>
          <li>• Welcome email with login instructions will be sent</li>
          <li>• You'll be able to start uploading client data immediately</li>
        </ul>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Platform Features Included:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>HIPAA-compliant document storage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Automated request letter generation</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Provider management system</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Real-time status tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>Advanced reporting & analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>24/7 technical support</span>
          </div>
        </div>
      </div>
    </div>
  );
};
