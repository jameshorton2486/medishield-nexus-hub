
import { FirmData } from '../types/onboardingTypes';

export const validateStep = (step: number, firmData: FirmData): Record<string, string> => {
  const errors: Record<string, string> = {};

  switch (step) {
    case 1:
      if (!firmData.firmName.trim()) {
        errors.firmName = 'Firm name is required';
      }
      if (!firmData.subdomain.trim()) {
        errors.subdomain = 'Subdomain is required';
      } else if (!/^[a-z0-9-]+$/.test(firmData.subdomain)) {
        errors.subdomain = 'Subdomain can only contain lowercase letters, numbers, and hyphens';
      } else if (firmData.subdomain.length < 3) {
        errors.subdomain = 'Subdomain must be at least 3 characters long';
      }
      if (!firmData.address.trim()) {
        errors.address = 'Business address is required';
      }
      if (!firmData.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(firmData.phone)) {
        errors.phone = 'Phone number must be in format: (555) 123-4567';
      }
      if (!firmData.email.trim()) {
        errors.email = 'Firm email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(firmData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      break;

    case 2:
      if (!firmData.adminFirstName.trim()) {
        errors.adminFirstName = 'Admin first name is required';
      }
      if (!firmData.adminLastName.trim()) {
        errors.adminLastName = 'Admin last name is required';
      }
      if (!firmData.adminEmail.trim()) {
        errors.adminEmail = 'Admin email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(firmData.adminEmail)) {
        errors.adminEmail = 'Please enter a valid email address';
      }
      if (!firmData.userCount) {
        errors.userCount = 'Expected user count is required';
      }
      break;

    case 3:
      if (firmData.specialties.length === 0) {
        errors.specialties = 'Please select at least one practice area';
      }
      break;

    case 4:
      if (!firmData.agreements.termsOfService) {
        errors.termsOfService = 'You must agree to the Terms of Service';
      }
      if (!firmData.agreements.privacyPolicy) {
        errors.privacyPolicy = 'You must agree to the Privacy Policy';
      }
      if (!firmData.agreements.businessAssociate) {
        errors.businessAssociate = 'You must agree to the Business Associate Agreement';
      }
      break;
  }

  return errors;
};

export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length >= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  } else if (numbers.length >= 3) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  }
  return numbers;
};
