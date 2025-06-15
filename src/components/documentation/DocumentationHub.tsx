import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Shield, Users, BookOpen, AlertTriangle, Search, ExternalLink, Video, HelpCircle } from 'lucide-react';
import { PageTransition } from '@/components/ui/page-transition';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';

const DocumentationHub = () => {
  const [activeSection, setActiveSection] = useState('user-guide');
  const [searchTerm, setSearchTerm] = useState('');

  const downloadDocument = (docType: string) => {
    console.log(`Downloading ${docType} document`);
  };

  const faqItems = [
    {
      question: "How do I add a new client to the system?",
      answer: "Navigate to the Clients page, click 'Add New Client', fill in the required information including personal details, injury information, and case type. Don't forget to upload signed authorization forms."
    },
    {
      question: "What file formats are supported for document upload?",
      answer: "The system supports PDF, JPEG, JPG, PNG, TIFF, and ZIP files. Maximum file size is 50MB per upload."
    },
    {
      question: "How can I track the status of my medical record requests?",
      answer: "Go to the Requests page where you can see all your requests with their current status (Pending, Sent, Received, etc.). You can also set up notifications to be alerted when status changes."
    },
    {
      question: "Can I export reports to PDF or Excel?",
      answer: "Yes, all reports can be exported to PDF format, and data tables can be exported to Excel. Look for the Export button in the top-right corner of each report."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
    }
  ];

  const videoTutorials = [
    {
      title: "Getting Started with the Platform",
      duration: "5:30",
      thumbnail: "/placeholder.svg",
      description: "Complete walkthrough of the dashboard and main features"
    },
    {
      title: "Adding Clients and Providers",
      duration: "3:45",
      thumbnail: "/placeholder.svg",
      description: "Step-by-step guide to client and provider management"
    },
    {
      title: "Generating Medical Record Requests",
      duration: "4:20",
      thumbnail: "/placeholder.svg",
      description: "Learn how to create and send professional request letters"
    },
    {
      title: "Document Management Best Practices",
      duration: "6:15",
      thumbnail: "/placeholder.svg",
      description: "Organize and manage your documents efficiently"
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition className="max-w-6xl mx-auto w-full mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: 'Documentation', isCurrentPage: true }
        ]}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Documentation Center</h1>
        <p className="text-gray-600">Complete guides, legal documents, and support resources for your medical records platform</p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
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
          <TabsTrigger value="videos" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video Tutorials
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
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

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Step 6: Generate Reports</h3>
                  <p className="text-sm text-gray-600 mb-3">Create comprehensive reports for case management.</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Navigate to "Reports" section</li>
                    <li>• Choose from various report templates</li>
                    <li>• Filter by date range, client, or provider</li>
                    <li>• Export reports in PDF or Excel format</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button onClick={() => downloadDocument('user-guide')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF Guide
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Online
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

        {/* Video Tutorials Tab */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {videoTutorials.map((video, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{video.title}</h3>
                        <Badge variant="outline">{video.duration}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                      <Button size="sm" className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="border rounded-lg">
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">{item.question}</h3>
                      <p className="text-sm text-gray-600">{item.answer}</p>
                    </div>
                  </div>
                ))}
                {filteredFAQ.length === 0 && (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No FAQ items found matching your search.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Still need help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Contact Support</Button>
                  <Button variant="outline" size="sm">Schedule Training</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTransition>
  );
};

export default DocumentationHub;
