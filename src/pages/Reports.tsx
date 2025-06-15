import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PageTransition } from '@/components/ui/page-transition';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  Users,
  FileText,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

const mockRequestVolumeData = [
  { month: 'Jan', requests: 1200, completed: 1000 },
  { month: 'Feb', requests: 1500, completed: 1200 },
  { month: 'Mar', requests: 1800, completed: 1500 },
  { month: 'Apr', requests: 2000, completed: 1700 },
  { month: 'May', requests: 2200, completed: 1900 },
  { month: 'Jun', requests: 2500, completed: 2200 },
];

const mockResponseTimeData = [
  { month: 'Jan', avgDays: 3.5 },
  { month: 'Feb', avgDays: 3.2 },
  { month: 'Mar', avgDays: 3.0 },
  { month: 'Apr', avgDays: 3.3 },
  { month: 'May', avgDays: 3.1 },
  { month: 'Jun', avgDays: 2.9 },
];

const mockStatusDistributionData = [
  { name: 'Pending', count: 300, color: '#facc15' },
  { name: 'Processing', count: 450, color: '#3b82f6' },
  { name: 'Completed', count: 1500, color: '#10b981' },
  { name: 'Rejected', count: 50, color: '#ef4444' },
];

const mockTopProviders = [
  { name: 'ABC Medical Group', location: 'Los Angeles, CA', requests: 320 },
  { name: 'XYZ Healthcare', location: 'New York, NY', requests: 280 },
  { name: 'PQR Clinic', location: 'Chicago, IL', requests: 250 },
  { name: 'LMN Hospital', location: 'Houston, TX', requests: 220 },
];

const mockRecentActivity = [
  { type: 'request', title: 'New Medical Record Request', description: 'A new medical record request was created for John Doe.', timestamp: '2024-07-15 10:30 AM' },
  { type: 'document', title: 'Document Uploaded', description: 'Uploaded a new document for Jane Smith.', timestamp: '2024-07-15 09:45 AM' },
  { type: 'alert', title: 'High Priority Alert', description: 'Potential HIPAA violation detected.', timestamp: '2024-07-14 05:20 PM' },
  { type: 'request', title: 'Medical Record Request Completed', description: 'Medical record request for Mike Johnson has been completed.', timestamp: '2024-07-14 02:00 PM' },
];

interface RequestVolume {
  month: string;
  requests: number;
  completed: number;
}

interface ResponseTime {
  month: string;
  avgDays: number;
}

interface StatusDistribution {
  name: string;
  count: number;
  color: string;
}

interface TopProvider {
  name: string;
  location: string;
  requests: number;
}

interface RecentActivityItem {
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

const requestVolumeData: RequestVolume[] = mockRequestVolumeData;
const responseTimeData: ResponseTime[] = mockResponseTimeData;
const statusDistributionData: StatusDistribution[] = mockStatusDistributionData;
const topProviders: TopProvider[] = mockTopProviders;
const recentActivity: RecentActivityItem[] = mockRecentActivity;

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const { toast } = useToast();

  const handleExportReport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting report as ${format.toUpperCase()}...`,
    });
  };

  return (
    <PageTransition className="max-w-7xl mx-auto mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: 'Reports', isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your medical records operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleExportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold">456</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold">3.2d</p>
                <p className="text-xs text-red-600">+0.3d from last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">94.7%</p>
                <p className="text-xs text-green-600">+2.1% from last month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Request Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Request Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={requestVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#3b82f6" />
                <Bar dataKey="completed" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Response Time Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgDays" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Request Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Request Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Providers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Medical Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProviders.map((provider, index) => (
                <div key={provider.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{provider.name}</p>
                      <p className="text-sm text-gray-600">{provider.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{provider.requests}</p>
                    <p className="text-sm text-gray-600">requests</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {activity.type === 'request' && <FileText className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'document' && <Download className="h-5 w-5 text-green-600" />}
                  {activity.type === 'alert' && <AlertCircle className="h-5 w-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
                <Badge variant={activity.type === 'alert' ? 'destructive' : 'default'}>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default Reports;
