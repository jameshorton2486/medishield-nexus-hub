
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  FileText,
  UploadCloud,
  BarChart2,
  Users,
  Clock,
  AlertCircle,
  TrendingUp,
  Download,
  Eye,
  Plus
} from "lucide-react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { LoadingButton } from "@/components/ui/loading-button";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageTransition } from "@/components/ui/page-transition";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { performanceMonitor } from "@/utils/testingHelpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { AddClientModal } from "@/components/clients/AddClientModal";

const userName = "John Doe";
const firmName = "Acme Health Firm";
const role = "admin";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [buttonStates, setButtonStates] = useState<Record<string, boolean>>({});
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    activeClients: 142,
    pendingRequests: 23,
    recordsThisMonth: 89,
    avgResponseTime: "2.3 days"
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const metricsData = [
    {
      label: "Active Clients",
      value: metrics.activeClients,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Pending Requests",
      value: metrics.pendingRequests,
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600"
    },
    {
      label: "Records This Month",
      value: metrics.recordsThisMonth,
      change: "+24%",
      trend: "up",
      icon: FileText,
      color: "text-green-600"
    },
    {
      label: "Avg Response Time",
      value: metrics.avgResponseTime,
      change: "-15%",
      trend: "down",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "request",
      message: "New medical record request submitted",
      client: "Sarah Johnson",
      timestamp: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      type: "document",
      message: "Medical records received",
      client: "Michael Brown",
      timestamp: "5 hours ago",
      status: "completed"
    },
    {
      id: 3,
      type: "client",
      message: "New client added to system",
      client: "Emily Davis",
      timestamp: "1 day ago",
      status: "active"
    },
    {
      id: 4,
      type: "alert",
      message: "Urgent: Missing signature on authorization",
      client: "Robert Wilson",
      timestamp: "2 days ago",
      status: "urgent"
    }
  ];

  useEffect(() => {
    performanceMonitor.startTiming('Dashboard-page-load');
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      performanceMonitor.endTiming('Dashboard-page-load');
    }, 1000);

    console.log('🔐 Current user role:', role);
    console.log('👤 Current user:', userName);
    
    return () => {
      clearTimeout(timer);
      performanceMonitor.endTiming('Dashboard-page-load');
    };
  }, []);

  const handleQuickAction = async (actionKey: string, actionName: string, callback?: () => void) => {
    setButtonStates(prev => ({ ...prev, [actionKey]: true }));
    performanceMonitor.startTiming(`${actionKey}-action`);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (callback) {
        callback();
      }
      
      toast({
        title: "Success",
        description: `${actionName} completed successfully!`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${actionName.toLowerCase()}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setButtonStates(prev => ({ ...prev, [actionKey]: false }));
      performanceMonitor.endTiming(`${actionKey}-action`);
    }
  };

  const handleAddClient = async (clientData: any) => {
    console.log('Adding client:', clientData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      activeClients: prev.activeClients + 1
    }));
    
    setAddClientOpen(false);
    toast({
      title: "Client Added",
      description: `${clientData.firstName} ${clientData.lastName} has been added successfully.`,
    });
  };

  const generateRequestLetter = () => {
    console.log('Generating request letter...');
    // This would typically generate a document
    toast({
      title: "Letter Generated",
      description: "Request letter has been generated and is ready for download.",
    });
  };

  const quickActions = [
    {
      key: "add-client",
      label: "Add New Client",
      icon: <UserPlus className="h-4 w-4" />,
      onClick: () => handleQuickAction("add-client", "Add New Client", () => setAddClientOpen(true)),
      variant: "default" as const
    },
    {
      key: "generate-letter",
      label: "Generate Request Letter",
      icon: <FileText className="h-4 w-4" />,
      onClick: () => handleQuickAction("generate-letter", "Generate Request Letter", generateRequestLetter),
      variant: "secondary" as const
    },
    {
      key: "upload-docs",
      label: "Upload Documents",
      icon: <UploadCloud className="h-4 w-4" />,
      onClick: () => handleQuickAction("upload-docs", "Upload Documents", () => navigate("/documents")),
      variant: "outline" as const
    },
    {
      key: "view-reports",
      label: "View Analytics",
      icon: <BarChart2 className="h-4 w-4" />,
      onClick: () => handleQuickAction("view-reports", "View Analytics", () => navigate("/reports")),
      variant: "secondary" as const
    },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'urgent': return 'destructive';
      case 'pending': return 'secondary';
      case 'completed': return 'default';
      case 'active': return 'outline';
      default: return 'secondary';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'request': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'document': return <UploadCloud className="h-4 w-4 text-green-600" />;
      case 'client': return <Users className="h-4 w-4 text-purple-600" />;
      case 'alert': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleViewAllActivity = () => {
    console.log('Viewing all activity...');
    toast({
      title: "Activity Log",
      description: "Opening detailed activity log...",
    });
  };

  const exportDashboardData = () => {
    console.log('Exporting dashboard data...');
    const data = {
      metrics: metricsData,
      recentActivity,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Dashboard data has been exported successfully.",
    });
  };

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs 
          items={[
            { label: "Dashboard", isCurrentPage: true }
          ]}
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportDashboardData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
            <p className="text-gray-600 mb-3">
              Managing medical records for <span className="font-semibold">{firmName}</span>
            </p>
            <Badge variant="outline" className="bg-white/50">
              <span className="capitalize">{role}</span> Access
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-xs text-gray-400">
              Last login: Today at 9:15 AM
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <LoadingSkeleton variant="metrics" count={4} />
        ) : (
          metricsData.map((metric, index) => (
            <Card key={metric.label} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gray-50 group-hover:bg-primary/10 transition-colors ${metric.color}`}>
                      <metric.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                Quick Actions
              </div>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <LoadingButton
                key={action.key}
                className="w-full justify-start h-12 hover:scale-105 transition-transform"
                variant={action.variant}
                onClick={action.onClick}
                loading={buttonStates[action.key]}
                loadingText="Processing..."
              >
                {!buttonStates[action.key] && action.icon}
                <span className="ml-2">{action.label}</span>
              </LoadingButton>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Recent Activity
              </div>
              <Button variant="ghost" size="sm" onClick={handleViewAllActivity}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingSkeleton variant="table" />
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-600">Client: {activity.client}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center space-x-2">
                      <Badge variant={getStatusBadgeVariant(activity.status)} className="text-xs">
                        {activity.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Separator className="my-4" />
                <div className="text-center">
                  <Button variant="outline" size="sm" onClick={handleViewAllActivity}>
                    View All Activity
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        open={addClientOpen}
        onOpenChange={setAddClientOpen}
        onAddClient={handleAddClient}
        isSubmitting={buttonStates["add-client"]}
      />
    </PageTransition>
  );
};

export default Dashboard;
