
import React from 'react';
import { Users, Mail, Shield } from 'lucide-react';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StepProps } from '../types/onboardingTypes';

export const AdminSetupStep: React.FC<StepProps> = ({ firmData, updateFirmData, validationErrors }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Administrator Setup</h3>
        <p className="text-sm text-gray-600 ml-2">Configure the primary administrator account</p>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-amber-600" />
          <h4 className="font-semibold text-amber-900">Important</h4>
        </div>
        <p className="text-sm text-amber-800">
          The administrator will have full access to all system features and will receive login credentials via email.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EnhancedInput
          label="Admin First Name"
          value={firmData.adminFirstName}
          onChange={(e) => updateFirmData('adminFirstName', e.target.value)}
          placeholder="John"
          error={validationErrors.adminFirstName}
          required
        />
        
        <EnhancedInput
          label="Admin Last Name"
          value={firmData.adminLastName}
          onChange={(e) => updateFirmData('adminLastName', e.target.value)}
          placeholder="Smith"
          error={validationErrors.adminLastName}
          required
        />
      </div>

      <EnhancedInput
        label="Admin Email Address"
        type="email"
        value={firmData.adminEmail}
        onChange={(e) => updateFirmData('adminEmail', e.target.value)}
        placeholder="admin@smithlaw.com"
        error={validationErrors.adminEmail}
        helperText="This person will receive login credentials and have full system access"
        required
      />

      <div>
        <Label htmlFor="userCount">
          Expected Number of Users <span className="text-destructive">*</span>
        </Label>
        <Select 
          value={firmData.userCount} 
          onValueChange={(value) => updateFirmData('userCount', value)}
        >
          <SelectTrigger className={`mt-2 ${validationErrors.userCount ? 'border-destructive' : ''}`}>
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
        {validationErrors.userCount && (
          <p className="text-sm text-destructive mt-1">{validationErrors.userCount}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          This helps us configure appropriate system resources
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="h-4 w-4 text-green-600" />
          <h4 className="font-semibold text-green-900">What happens next?</h4>
        </div>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• Administrator account will be created with the provided details</li>
          <li>• Welcome email with login instructions will be sent</li>
          <li>• Temporary password will be provided for first login</li>
          <li>• Admin can then invite additional users to the system</li>
        </ul>
      </div>
    </div>
  );
};
