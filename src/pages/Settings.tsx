
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PageTransition } from '@/components/ui/page-transition';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { 
  Settings as SettingsIcon,
  User,
  Building,
  Shield,
  Bell,
  Key,
  Users,
  FileText,
  Mail,
  Phone,
  MapPin,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const { toast } = useToast();

  // Form states
  const [firmSettings, setFirmSettings] = useState({
    name: 'Johnson & Associates Law Firm',
    address: '123 Legal Street, Suite 400',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90210',
    phone: '(555) 123-4567',
    email: 'contact@johnsonlaw.com',
    website: 'www.johnsonlaw.com',
    logo: ''
  });

  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@johnsonlaw.com',
    phone: '(555) 987-6543',
    role: 'attorney',
    department: 'Personal Injury'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    requestUpdates: true,
    documentAlerts: true,
    securityAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    ipRestriction: false,
    passwordExpiry: '90'
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "API Key Generated",
      description: "New API key has been generated successfully.",
    });
  };

  return (
    <PageTransition className="max-w-6xl mx-auto mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: 'Settings', isCurrentPage: true }
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account, firm settings, and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="firm" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Firm
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userProfile.firstName}
                    onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userProfile.lastName}
                    onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={userProfile.phone}
                    onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={userProfile.role} onValueChange={(value) => setUserProfile({...userProfile, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="attorney">Attorney</SelectItem>
                      <SelectItem value="paralegal">Paralegal</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={userProfile.department}
                    onChange={(e) => setUserProfile({...userProfile, department: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Profile')} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Firm Settings */}
        <TabsContent value="firm">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Firm Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="firmName">Firm Name</Label>
                  <Input
                    id="firmName"
                    value={firmSettings.name}
                    onChange={(e) => setFirmSettings({...firmSettings, name: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={firmSettings.address}
                    onChange={(e) => setFirmSettings({...firmSettings, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={firmSettings.city}
                    onChange={(e) => setFirmSettings({...firmSettings, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={firmSettings.state}
                    onChange={(e) => setFirmSettings({...firmSettings, state: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={firmSettings.zipCode}
                    onChange={(e) => setFirmSettings({...firmSettings, zipCode: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="firmPhone">Phone</Label>
                  <Input
                    id="firmPhone"
                    value={firmSettings.phone}
                    onChange={(e) => setFirmSettings({...firmSettings, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="firmEmail">Email</Label>
                  <Input
                    id="firmEmail"
                    type="email"
                    value={firmSettings.email}
                    onChange={(e) => setFirmSettings({...firmSettings, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={firmSettings.website}
                    onChange={(e) => setFirmSettings({...firmSettings, website: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Firm')} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Firm Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive browser push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly activity summaries</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Request Updates</Label>
                    <p className="text-sm text-gray-600">Get notified when request status changes</p>
                  </div>
                  <Switch
                    checked={notifications.requestUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, requestUpdates: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Document Alerts</Label>
                    <p className="text-sm text-gray-600">Notifications for new documents</p>
                  </div>
                  <Switch
                    checked={notifications.documentAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, documentAlerts: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-gray-600">Important security notifications</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, securityAlerts: checked})}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Notifications')} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select 
                      value={securitySettings.sessionTimeout} 
                      onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Select 
                      value={securitySettings.passwordExpiry} 
                      onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiry: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Address Restriction</Label>
                    <p className="text-sm text-gray-600">Limit access to specific IP addresses</p>
                  </div>
                  <Switch
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, ipRestriction: checked})}
                  />
                </div>
              </div>
              <Button onClick={() => handleSave('Security')} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mock user list */}
                {[
                  { name: 'John Doe', email: 'john.doe@firm.com', role: 'Attorney', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane.smith@firm.com', role: 'Paralegal', status: 'Active' },
                  { name: 'Mike Johnson', email: 'mike.johnson@firm.com', role: 'Staff', status: 'Pending' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      <Badge variant="outline">{user.role}</Badge>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>API Key</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value="sk-proj-abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleGenerateApiKey}>
                    Generate New
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Use this API key to integrate with external systems
                </p>
              </div>
              
              <div>
                <Label>Webhook URL</Label>
                <Input
                  placeholder="https://your-domain.com/webhook"
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Receive real-time notifications for events
                </p>
              </div>

              <div>
                <Label>Rate Limiting</Label>
                <Select defaultValue="1000">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/hour</SelectItem>
                    <SelectItem value="500">500 requests/hour</SelectItem>
                    <SelectItem value="1000">1,000 requests/hour</SelectItem>
                    <SelectItem value="5000">5,000 requests/hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('API')} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
};

export default Settings;
