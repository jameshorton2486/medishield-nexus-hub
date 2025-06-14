
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  UserPlus,
  FileText,
  UploadCloud,
  BarChart2
} from "lucide-react";

const userName = "John Doe"; // Placeholder for authenticated user's name
const firmName = "Acme Health Firm"; // Placeholder for firm name
const role = "admin"; // Placeholder for user role (for role-specific logic, if needed)

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

const quickActions = [
  {
    label: "Add New Client",
    icon: <UserPlus className="mr-2" />,
    onClick: () => {},
  },
  {
    label: "Generate Request Letter",
    icon: <FileText className="mr-2" />,
    onClick: () => {},
  },
  {
    label: "Upload Documents",
    icon: <UploadCloud className="mr-2" />,
    onClick: () => {},
  },
  {
    label: "View Reports",
    icon: <BarChart2 className="mr-2" />,
    onClick: () => {},
  },
];

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto w-full mt-6 px-2 sm:px-4">
      {/* Welcome Block */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            Welcome, <span className="text-primary">{userName}</span> – <span>{firmName}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 text-sm">Your Medical Records dashboard with overview, stats, and quick actions.</p>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{m.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{m.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                className="flex-1 min-w-[180px] max-w-xs"
                variant="secondary"
                onClick={action.onClick}
                type="button"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="text-sm text-gray-500 mb-3">No recent activity yet</div>
          {/* Placeholder for future activity list */}
          <ul className="space-y-3">
            {[].length === 0 ? (
              <li className="text-muted-foreground text-xs italic">Activity will appear here once available.</li>
            ) : (
              // Future: Render activity items here
              null
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

