
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  FileText,
  UploadCloud,
  BarChart2
} from "lucide-react";
import RoleTestingPanel from "@/components/testing/RoleTestingPanel";
import PerformanceTestingPanel from "@/components/testing/PerformanceTestingPanel";
import BugTestingChecklist from "@/components/testing/BugTestingChecklist";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { LoadingButton } from "@/components/ui/loading-button";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageTransition } from "@/components/ui/page-transition";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { performanceMonitor } from "@/utils/testingHelpers";

const userName = "John Doe";
const firmName = "Acme Health Firm";
const role = "admin";

const metrics = [
  {
    label: "Active Clients",
    value: 0,
  },
  {
    label: "Outstanding Requests",
    value: 0,
  },
  {
    label: "Records Received This Month",
    value: 0,
  },
  {
    label: "Average Response Time",
    value: "0 days",
  }
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [buttonStates, setButtonStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    performanceMonitor.startTiming('Dashboard-page-load');
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      performanceMonitor.endTiming('Dashboard-page-load');
    }, 1500);

    console.log('🔐 Current user role:', role);
    console.log('👤 Current user:', userName);
    
    return () => {
      clearTimeout(timer);
      performanceMonitor.endTiming('Dashboard-page-load');
    };
  }, []);

  const handleQuickAction = async (actionKey: string, actionName: string, url?: string) => {
    setButtonStates(prev => ({ ...prev, [actionKey]: true }));
    performanceMonitor.startTiming(`${actionKey}-action`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: `${actionName} completed successfully!`,
      });
      
      if (url) {
        window.location.href = url;
      }
      
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

  const quickActions = [
    {
      key: "add-client",
      label: "Add New Client",
      icon: <UserPlus className="mr-2" />,
      onClick: () => handleQuickAction("add-client", "Add New Client"),
    },
    {
      key: "generate-letter",
      label: "Generate Request Letter",
      icon: <FileText className="mr-2" />,
      onClick: () => handleQuickAction("generate-letter", "Generate Request Letter"),
    },
    {
      key: "upload-docs",
      label: "Upload Documents",
      icon: <UploadCloud className="mr-2" />,
      onClick: () => handleQuickAction("upload-docs", "Upload Documents", "/documents"),
    },
    {
      key: "view-reports",
      label: "View Reports",
      icon: <BarChart2 className="mr-2" />,
      onClick: () => handleQuickAction("view-reports", "View Reports", "/reports"),
    },
  ];

  return (
    <PageTransition className="max-w-6xl mx-auto w-full mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: "Dashboard", isCurrentPage: true }
        ]}
      />

      {/* Welcome Block */}
      <Card className="mb-6 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">
            Welcome, <span className="text-primary">{userName}</span> – <span>{firmName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">Your Medical Records dashboard with overview, stats, and quick actions.</p>
          <div className="mt-2 text-xs text-muted-foreground">
            Role: <span className="capitalize font-medium bg-primary/10 px-2 py-1 rounded">{role}</span>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <LoadingSkeleton variant="metrics" count={4} />
        ) : (
          metrics.map((m, index) => (
            <Card key={m.label} className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm sm:text-lg font-medium">{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-primary animate-fade-in">
                  {m.value}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8 hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <LoadingButton
                key={action.key}
                className="h-auto py-4 px-4 hover:scale-105 transition-all duration-200"
                variant="secondary"
                onClick={action.onClick}
                loading={buttonStates[action.key]}
                loadingText="Processing..."
              >
                <div className="flex items-center justify-center w-full">
                  {!buttonStates[action.key] && action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                </div>
              </LoadingButton>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <>
              <div className="text-sm text-gray-500 mb-3">No recent activity yet</div>
              <ul className="space-y-3">
                <li className="text-muted-foreground text-xs italic">
                  Activity will appear here once available.
                </li>
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      {/* Testing Panels - Only show in development or when explicitly enabled */}
      {(process.env.NODE_ENV === 'development' || window.location.search.includes('testing=true')) && (
        <>
          <RoleTestingPanel />
          <PerformanceTestingPanel />
          <BugTestingChecklist />
        </>
      )}
    </PageTransition>
  );
};

export default Dashboard;
