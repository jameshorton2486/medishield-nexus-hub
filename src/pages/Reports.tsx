
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download, 
  Filter,
  Calendar,
  FileText,
  Users,
  Building2,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  PieChart,
  LineChart,
  RefreshCw
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageTransition } from "@/components/ui/page-transition";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

interface ReportData {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  averageProcessingTime: number;
  totalDocuments: number;
  totalClients: number;
  totalProviders: number;
  recentActivity: Array<{
    id: string;
    type: 'request' | 'document' | 'client';
    description: string;
    timestamp: string;
    status: 'success' | 'pending' | 'error';
  }>;
  requestsByMonth: Array<{
    month: string;
    requests: number;
    completed: number;
  }>;
  documentsByCategory: Array<{
    category: string;
    count: number;
    color: string;
  }>;
  processingTimes: Array<{
    week: string;
    averageTime: number;
  }>;
}

const mockReportData: ReportData = {
  totalRequests: 1247,
  completedRequests: 1156,
  pendingRequests: 91,
  averageProcessingTime: 3.2,
  totalDocuments: 2394,
  totalClients: 156,
  totalProviders: 89,
  recentActivity: [
    {
      id: "1",
      type: "request",
      description: "Medical records request completed for Sarah Johnson",
      timestamp: "2024-01-16T10:30:00Z",
      status: "success"
    },
    {
      id: "2",
      type: "document",
      description: "Lab results uploaded for Michael Brown",
      timestamp: "2024-01-16T09:15:00Z",
      status: "success"
    },
    {
      id: "3",
      type: "client",
      description: "New client Emily Davis added to system",
      timestamp: "2024-01-16T08:45:00Z",
      status: "success"
    },
    {
      id: "4",
      type: "request",
      description: "Authorization pending for Robert Wilson",
      timestamp: "2024-01-16T08:00:00Z",
      status: "pending"
    }
  ],
  requestsByMonth: [
    { month: "Jul", requests: 98, completed: 92 },
    { month: "Aug", requests: 112, completed: 108 },
    { month: "Sep", requests: 127, completed: 119 },
    { month: "Oct", requests: 134, completed: 128 },
    { month: "Nov", requests: 156, completed: 149 },
    { month: "Dec", requests: 189, completed: 178 },
    { month: "Jan", requests: 431, completed: 382 }
  ],
  documentsByCategory: [
    { category: "Medical Records", count: 1456, color: "#3B82F6" },
    { category: "Lab Results", count: 567, color: "#10B981" },
    { category: "Imaging", count: 234, color: "#8B5CF6" },
    { category: "Billing", count: 89, color: "#F59E0B" },
    { category: "Authorization", count: 48, color: "#EF4444" }
  ],
  processingTimes: [
    { week: "Week 1", averageTime: 3.8 },
    { week: "Week 2", averageTime: 3.2 },
    { week: "Week 3", averageTime: 2.9 },
    { week: "Week 4", averageTime: 3.1 }
  ]
};

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setReportData(mockReportData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setReportData(mockReportData);
      setIsRefreshing(false);
      toast({
        title: "Reports Refreshed",
        description: "All report data has been updated with the latest information.",
      });
    }, 1000);
  };

  const handleExport = (format: string) => {
    toast({
      title: `Export ${format.toUpperCase()}`,
      description: `Exporting reports in ${format.toUpperCase()} format...`,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'document':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'client':
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-600" />;
      default:
        return <Clock className="h-3 w-3 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
        <LoadingSkeleton variant="page" />
      </PageTransition>
    );
  }

  if (!reportData) {
    return (
      <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load reports</h3>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Reports", isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Real-time insights into your firm's medical records activity</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport("pdf")}>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel")}>Export as Excel</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("csv")}>Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="requests">Requests</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{reportData.totalRequests.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">{Math.round((reportData.completedRequests / reportData.totalRequests) * 100)}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                <p className="text-2xl font-bold">{reportData.averageProcessingTime} days</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  -0.5 days improved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold">{reportData.totalClients}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8 new this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Requests by Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportData.requestsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3B82F6" name="Total Requests" />
                <Bar dataKey="completed" fill="#10B981" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Documents by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Tooltip />
                <RechartsPieChart data={reportData.documentsByCategory} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="count">
                  {reportData.documentsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {reportData.documentsByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.category}</span>
                  </div>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="h-5 w-5 mr-2" />
              Processing Time Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsLineChart data={reportData.processingTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="averageTime" stroke="#8B5CF6" strokeWidth={2} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <div className="flex items-center mt-1">
                      {getStatusIcon(activity.status)}
                      <span className="text-xs text-gray-500 ml-1">
                        {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                        {new Date(activity.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
};

export default Reports;
