
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { roleTestingHelper } from '@/utils/testingHelpers';
import { Shield, User, Eye, EyeOff } from 'lucide-react';

const FEATURES = [
  'clients',
  'providers', 
  'requests',
  'documents',
  'reports',
  'settings',
  'admin-panel'
];

const ROLES = [
  { value: 'admin', label: 'Administrator', color: 'bg-red-500' },
  { value: 'attorney', label: 'Attorney', color: 'bg-blue-500' },
  { value: 'paralegal', label: 'Paralegal', color: 'bg-green-500' },
  { value: 'staff', label: 'Staff', color: 'bg-gray-500' }
];

export default function RoleTestingPanel() {
  const [currentRole, setCurrentRole] = useState('admin');
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);

  const runRoleTest = (role: string, feature: string) => {
    const hasAccess = roleTestingHelper.simulateRoleAccess(role, feature);
    setTestResults(prev => ({
      ...prev,
      [`${role}-${feature}`]: hasAccess
    }));
    return hasAccess;
  };

  const runAllTests = () => {
    const results: Record<string, boolean> = {};
    ROLES.forEach(role => {
      FEATURES.forEach(feature => {
        const hasAccess = roleTestingHelper.simulateRoleAccess(role.value, feature);
        results[`${role.value}-${feature}`] = hasAccess;
      });
    });
    setTestResults(results);
  };

  const getAccessStatus = (role: string, feature: string) => {
    const key = `${role}-${feature}`;
    return testResults[key];
  };

  // Only show in development or when explicitly enabled
  if (process.env.NODE_ENV === 'production' && !isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <Shield className="w-4 h-4 mr-2" />
        Role Testing
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto z-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Role-Based Access Testing
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <EyeOff className="w-3 h-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={currentRole} onValueChange={setCurrentRole}>
            <SelectTrigger className="flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map(role => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${role.color}`} />
                    {role.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={runAllTests}>
            Test All
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Feature Access Matrix</h4>
          <div className="grid grid-cols-4 gap-1 text-xs">
            <div></div>
            {ROLES.map(role => (
              <div key={role.value} className="text-center font-medium">
                {role.value.charAt(0).toUpperCase()}
              </div>
            ))}
            
            {FEATURES.map(feature => (
              <React.Fragment key={feature}>
                <div className="font-medium capitalize text-right pr-2">
                  {feature}
                </div>
                {ROLES.map(role => {
                  const hasAccess = getAccessStatus(role.value, feature);
                  return (
                    <div key={`${role.value}-${feature}`} className="text-center">
                      <Badge
                        variant={hasAccess === true ? "default" : hasAccess === false ? "destructive" : "secondary"}
                        className="w-6 h-4 p-0 text-xs"
                        onClick={() => runRoleTest(role.value, feature)}
                      >
                        {hasAccess === true ? "✓" : hasAccess === false ? "✗" : "?"}
                      </Badge>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Click badges to test individual permissions. Green = allowed, Red = denied.
        </div>
      </CardContent>
    </Card>
  );
}
