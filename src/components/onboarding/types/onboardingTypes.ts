
export interface FirmData {
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
  agreements: {
    termsOfService: boolean;
    privacyPolicy: boolean;
    businessAssociate: boolean;
  };
}

export interface StepProps {
  firmData: FirmData;
  updateFirmData: (field: keyof FirmData, value: any) => void;
  validationErrors: Record<string, string>;
}
