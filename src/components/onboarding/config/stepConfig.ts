
import { Building, Users, Settings, Shield } from 'lucide-react';
import { FirmInfoStep } from '../steps/FirmInfoStep';
import { AdminSetupStep } from '../steps/AdminSetupStep';
import { ConfigurationStep } from '../steps/ConfigurationStep';
import { LegalComplianceStep } from '../steps/LegalComplianceStep';

export const stepConfig = [
  { number: 1, title: 'Firm Information', icon: Building, component: FirmInfoStep },
  { number: 2, title: 'Administrator Setup', icon: Users, component: AdminSetupStep },
  { number: 3, title: 'Configuration', icon: Settings, component: ConfigurationStep },
  { number: 4, title: 'Legal & Compliance', icon: Shield, component: LegalComplianceStep }
];
