
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, Shield, Users, BookOpen, AlertTriangle } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const DocumentationHub = () => {
  const [activeSection, setActiveSection] = useState('user-guide');

  const downloadDocument = (docType: string) => {
    // In production, this would generate or download actual PDF files
    console.log(`Downloading ${docType} document`);
  };

  return (
    <PageTransition className="max-w-6xl mx-auto w-full mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: 'Documentation', isCurrentPage: true }
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Documentation Center</h1>
        <p className="text-gray-600">Complete guides and legal documents for your medical records platform</p>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            User Guide
          </TabsTrigger>
          <TabsTrigger value="admin-guide" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Admin Guide
          </TabsTrigger>
          <TabsTrigger value="legal-docs" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Legal Docs
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-guide">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 1: Login & Dashboard</h3>
                  <p className="text-sm text-gray-600 mb-3">Access your medical records platform and familiarize yourself with the dashboard.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Navigate to your firm's subdomain</li>
                    <li>• Enter your credentials provided by your administrator</li>
                    <li>• Review the dashboard metrics and quick actions</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 2: Add a New Client</h3>
                  <p className="text-sm text-gray-600 mb-3">Create client records with all necessary information.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Click "Clients" in the sidebar</li>
                    <li>• Select "Add New Client"</li>
                    <li>• Fill in personal information, injury details, and case type</li>
                    <li>• Upload signed authorization forms</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 3: Manage Medical Providers</h3>
                  <p className="text-sm text-gray-600 mb-3">Add and organize healthcare providers for record requests.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Navigate to "Providers" section</li>
                    <li>• Add provider contact information</li>
                    <li>• Link providers to specific clients</li>
                    <li>• Set preferred contact methods</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 4: Generate Record Requests</h3>
                  <p className="text-sm text-gray-600 mb-3">Create and send medical record requests efficiently.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Go to "Requests" page</li>
                    <li>• Select client and provider combination</li>
                    <li>• Generate request letter automatically</li>
                    <li>• Track request status and follow-ups</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 5: Upload & Manage Documents</h3>
                  <p className="text-sm text-gray-600 mb-3">Securely store and organize received medical records.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Access "Documents" section</li>
                    <li>• Upload files with proper categorization</li>
                    <li>• Link documents to specific requests</li>
                    <li>• Use search and filter features</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={() => downloadDocument('user-guide')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin-guide">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                System Administrator Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">User Management</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Navigate to Settings → Users</li>
                    <li>• Click "Invite User" to send email invitations</li>
                    <li>• Assign roles: Admin, Attorney, Paralegal, Staff</li>
                    <li>• Manage user permissions and access levels</li>
                    <li>• Deactivate users when needed</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Firm Settings</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Access Settings → Firm Profile</li>
                    <li>• Update firm name, address, and contact information</li>
                    <li>• Customize logo and brand colors</li>
                    <li>• Configure default document templates</li>
                    <li>• Set up notification preferences</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Audit Log Review</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Go to Settings → Audit Logs</li>
                    <li>• Filter by user, date range, or action type</li>
                    <li>• Review all create, update, delete actions</li>
                    <li>• Export logs for compliance reporting</li>
                    <li>• Monitor user activity patterns</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Data Management</h3>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Bulk import clients/providers via CSV</li>
                    <li>• Set up automated backup schedules</li>
                    <li>• Monitor storage usage and limits</li>
                    <li>• Configure data retention policies</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={() => downloadDocument('admin-guide')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Admin Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal-docs">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Legal Document Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">HIPAA Privacy Policy</h3>
                      <p className="text-sm text-gray-600">Comprehensive privacy policy compliant with HIPAA regulations</p>
                    </div>
                    <Button onClick={() => downloadDocument('privacy-policy')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Terms of Service</h3>
                      <p className="text-sm text-gray-600">General liability and usage terms for the platform</p>
                    </div>
                    <Button onClick={() => downloadDocument('terms-of-service')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Business Associate Agreement (BAA)</h3>
                      <p className="text-sm text-gray-600">Template for HIPAA-compliant business relationships</p>
                    </div>
                    <Button onClick={() => downloadDocument('baa-template')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Data Processing Agreement</h3>
                      <p className="text-sm text-gray-600">Agreement outlining data handling and processing procedures</p>
                    </div>
                    <Button onClick={() => downloadDocument('dpa')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Incident Response Plan</h3>
                      <p className="text-sm text-gray-600">Basic incident response procedures for security events</p>
                    </div>
                    <Button onClick={() => downloadDocument('incident-response')} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                HIPAA Compliance Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">✅ Technical Safeguards</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Data encryption at rest and in transit
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      User authentication and access controls
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Audit logging for all data access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Session timeout implementation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Secure file upload and storage
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">✅ Administrative Safeguards</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Role-based access control system
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      User training and documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Incident response procedures
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Regular security assessments
                    </li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">✅ Physical Safeguards</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Cloud infrastructure security (AWS/Supabase)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Data center compliance certifications
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Backup and disaster recovery plans
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={() => downloadDocument('compliance-checklist')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Compliance Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
};

export default DocumentationHub;
