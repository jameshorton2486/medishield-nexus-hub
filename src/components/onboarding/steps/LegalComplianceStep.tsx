
import React from 'react';
import { Shield, CheckCircle, FileText, Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { StepProps } from '../types/onboardingTypes';

export const LegalComplianceStep: React.FC<StepProps> = ({ firmData, updateFirmData, validationErrors }) => {
  const handleAgreementChange = (agreement: keyof typeof firmData.agreements, checked: boolean) => {
    updateFirmData('agreements', {
      ...firmData.agreements,
      [agreement]: checked
    });
  };

  const agreements = [
    {
      key: 'termsOfService' as const,
      title: 'Terms of Service',
      description: 'Governing the use of our platform and services',
      required: true
    },
    {
      key: 'privacyPolicy' as const,
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your data',
      required: true
    },
    {
      key: 'businessAssociate' as const,
      title: 'Business Associate Agreement (BAA)',
      description: 'HIPAA compliance requirements for handling PHI',
      required: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Legal & Compliance</h3>
        <p className="text-sm text-gray-600 ml-2">Review and accept required agreements</p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-6 bg-white">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Required Agreements
          </h4>
          <div className="space-y-4">
            {agreements.map((agreement) => (
              <div key={agreement.key}>
                <label className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <Checkbox
                    checked={firmData.agreements[agreement.key]}
                    onCheckedChange={(checked) => handleAgreementChange(agreement.key, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{agreement.title}</span>
                      {agreement.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Required</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{agreement.description}</p>
                    <a href="#" className="text-primary underline text-sm hover:text-primary/80">
                      Read full document →
                    </a>
                  </div>
                </label>
                {validationErrors[agreement.key] && (
                  <p className="text-sm text-destructive mt-1 ml-6">{validationErrors[agreement.key]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-green-800">HIPAA Compliance Ready</h4>
          </div>
          <p className="text-sm text-green-700 mb-3">
            Your platform is configured with all necessary security measures for HIPAA compliance,
            including encryption, audit logging, and access controls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-700">
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              <span>End-to-end encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              <span>Audit logging</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              <span>Access controls</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              <span>Data backup & recovery</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Final Steps After Completion:</h4>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Your firm's subdomain will be activated within 5 minutes</li>
            <li>Administrator will receive login credentials via email</li>
            <li>Platform will be pre-configured with your selected practice areas</li>
            <li>Welcome call will be scheduled with our onboarding specialist</li>
            <li>You can begin uploading client data and sending requests immediately</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
