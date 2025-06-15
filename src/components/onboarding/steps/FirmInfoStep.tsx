
import React from 'react';
import { Building } from 'lucide-react';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StepProps } from '../types/onboardingTypes';
import { formatPhoneNumber } from '../validation/stepValidation';

export const FirmInfoStep: React.FC<StepProps> = ({ firmData, updateFirmData, validationErrors }) => {
  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    updateFirmData('subdomain', value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateFirmData('phone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Firm Information</h3>
        <p className="text-sm text-gray-600 ml-2">Tell us about your law firm</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EnhancedInput
          label="Law Firm Name"
          value={firmData.firmName}
          onChange={(e) => updateFirmData('firmName', e.target.value)}
          placeholder="e.g., Smith & Associates Law"
          error={validationErrors.firmName}
          required
        />
        
        <div>
          <Label htmlFor="subdomain">
            Subdomain <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center mt-2">
            <EnhancedInput
              id="subdomain"
              value={firmData.subdomain}
              onChange={handleSubdomainChange}
              placeholder="smithlaw"
              className="rounded-r-none border-r-0"
              error={validationErrors.subdomain}
            />
            <span className="bg-gray-100 border border-l-0 px-3 py-2 text-sm text-gray-600 rounded-r-md h-10 flex items-center">
              .medrecordsapp.com
            </span>
          </div>
          {validationErrors.subdomain && (
            <p className="text-sm text-destructive mt-1">{validationErrors.subdomain}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            This will be your unique URL for accessing the platform
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="address">
          Business Address <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="address"
          value={firmData.address}
          onChange={(e) => updateFirmData('address', e.target.value)}
          placeholder="123 Main Street, Suite 100, City, State 12345"
          rows={3}
          className={`mt-2 ${validationErrors.address ? 'border-destructive' : ''}`}
        />
        {validationErrors.address && (
          <p className="text-sm text-destructive mt-1">{validationErrors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EnhancedInput
          label="Phone Number"
          value={firmData.phone}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          error={validationErrors.phone}
          helperText="Format: (555) 123-4567"
          required
        />
        
        <EnhancedInput
          label="Firm Email"
          type="email"
          value={firmData.email}
          onChange={(e) => updateFirmData('email', e.target.value)}
          placeholder="info@smithlaw.com"
          error={validationErrors.email}
          helperText="Main contact email for your firm"
          required
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Why do we need this information?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Firm Name:</strong> Used for branding and identification</li>
          <li>• <strong>Subdomain:</strong> Your unique access URL</li>
          <li>• <strong>Address:</strong> Required for legal compliance and billing</li>
          <li>• <strong>Contact Info:</strong> For support and important notifications</li>
        </ul>
      </div>
    </div>
  );
};
