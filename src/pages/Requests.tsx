
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  MoreHorizontal,
  Link2,
  Clock,
  User,
  Building2,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageTransition } from "@/components/ui/page-transition";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: string;
  requestNumber: string;
  clientName: string;
  providerName: string;
  requestType: 'medical_records' | 'billing' | 'imaging' | 'lab_results';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dateRequested: string;
  dueDate: string;
  lastUpdate: string;
  assignedTo: string;
  documents: number;
  notes?: string;
}

const mockRequests: Request[] = [
  {
    id: "1",
    requestNumber: "REQ-2024-001",
    clientName: "Sarah Johnson",
    providerName: "St. Mary's General Hospital",
    requestType: "medical_records",
    status: "pending",
    priority: "high",
    dateRequested: "2024-01-15",
    dueDate: "2024-01-22",
    lastUpdate: "2024-01-16",
    assignedTo: "Jennifer Smith",
    documents: 0
  },
  {
    id: "2",
    requestNumber: "REQ-2024-002",
    clientName: "Michael Brown",
    providerName: "Downtown Family Clinic",
    requestType: "lab_results",
    status: "in_progress",
    priority: "medium",
    dateRequested: "2024-01-14",
    dueDate: "2024-01-21",
    lastUpdate: "2024-01-15",
    assignedTo: "John Davis",
    documents: 3
  },
  {
    id: "3",
    requestNumber: "REQ-2024-003",
    clientName: "Emily Davis",
    providerName: "Advanced Cardiology Associates",
    requestType: "imaging",
    status: "completed",
    priority: "low",
    dateRequested: "2024-01-10",
    dueDate: "2024-01-17",
    lastUpdate: "2024-01-16",
    assignedTo: "Sarah Wilson",
    documents: 8
  },
  {
    id: "4",
    requestNumber: "REQ-2024-004",
    clientName: "Robert Wilson",
    providerName: "Regional Medical Laboratory",
    requestType: "billing",
    status: "urgent",
    priority: "urgent",
    dateRequested: "2024-01-16",
    dueDate: "2024-01-18",
    lastUpdate: "2024-01-16",
    assignedTo: "Michael Johnson",
    documents: 1,
    notes: "Client needs records for court date"
  }
];

const Requests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(mockRequests);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'medical_records': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'billing': return <AlertCircle className="h-4 w-4 text-green-600" />;
      case 'imaging': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'lab_results': return <FileText className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'urgent': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const handleNewRequest = () => {
    toast({
      title: "New Request",
      description: "Request creation form would open here",
    });
  };

  const handleRequestAction = (action: string, requestNumber: string) => {
    toast({
      title: `${action} Request`,
      description: `${action} action for ${requestNumber}`,
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    urgent: requests.filter(r => r.status === 'urgent' || r.priority === 'urgent').length
  };

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Requests", isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Record Requests</h1>
          <p className="text-gray-600">Track and manage all medical record requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleNewRequest}>
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Link2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold">{stats.urgent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by request number, client, or provider..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in_progress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("completed")}>Completed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("urgent")}>Urgent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Priority: {priorityFilter === "all" ? "All" : priorityFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPriorityFilter("all")}>All Priorities</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("urgent")}>Urgent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>Medium</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link2 className="h-5 w-5 mr-2" />
            Requests ({filteredRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request</TableHead>
                  <TableHead>Client & Provider</TableHead>
                  <TableHead>Type & Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timeline</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => {
                  const daysUntilDue = getDaysUntilDue(request.dueDate);
                  return (
                    <TableRow key={request.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(request.status)}
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                              {request.requestNumber}
                            </code>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FileText className="h-3 w-3 mr-1" />
                            {request.documents} documents
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <User className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="font-medium">{request.clientName}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Building2 className="h-3 w-3 mr-1 text-gray-400" />
                            {request.providerName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            {getRequestTypeIcon(request.requestType)}
                            <span className="ml-1 text-sm capitalize">
                              {request.requestType.replace('_', ' ')}
                            </span>
                          </div>
                          {getPriorityBadge(request.priority)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(request.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            <span className="text-gray-500">Requested:</span> {new Date(request.dateRequested).toLocaleDateString()}
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">Due:</span> {new Date(request.dueDate).toLocaleDateString()}
                            {daysUntilDue < 0 && (
                              <Badge variant="destructive" className="ml-2 text-xs">
                                {Math.abs(daysUntilDue)} days overdue
                              </Badge>
                            )}
                            {daysUntilDue >= 0 && daysUntilDue <= 2 && (
                              <Badge className="ml-2 text-xs bg-yellow-100 text-yellow-800">
                                {daysUntilDue} days left
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{request.assignedTo}</div>
                          <div className="text-gray-500">Updated {new Date(request.lastUpdate).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleRequestAction("View", request.requestNumber)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRequestAction("Edit", request.requestNumber)}>
                              Edit Request
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRequestAction("Update Status", request.requestNumber)}>
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRequestAction("Send Reminder", request.requestNumber)}>
                              Send Reminder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </PageTransition>
  );
};

export default Requests;
