
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
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  AlertCircle,
  Trash,
  Eye,
  Edit,
  FileTextIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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
import { AddClientModal } from "@/components/clients/AddClientModal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  status: 'active' | 'inactive' | 'pending';
  caseNumber: string;
  lastActivity: string;
  totalRequests: number;
  pendingRequests: number;
  createdAt: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-03-15",
    status: "active",
    caseNumber: "CASE-2024-001",
    lastActivity: "2 hours ago",
    totalRequests: 5,
    pendingRequests: 2,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@email.com",
    phone: "(555) 234-5678",
    dateOfBirth: "1978-11-22",
    status: "active",
    caseNumber: "CASE-2024-002",
    lastActivity: "1 day ago",
    totalRequests: 8,
    pendingRequests: 0,
    createdAt: "2024-01-20"
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@email.com",
    phone: "(555) 345-6789",
    dateOfBirth: "1992-07-08",
    status: "pending",
    caseNumber: "CASE-2024-003",
    lastActivity: "3 days ago",
    totalRequests: 1,
    pendingRequests: 1,
    createdAt: "2024-02-01"
  },
  {
    id: "4",
    firstName: "Robert",
    lastName: "Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1975-12-03",
    status: "inactive",
    caseNumber: "CASE-2024-004",
    lastActivity: "2 weeks ago",
    totalRequests: 12,
    pendingRequests: 0,
    createdAt: "2023-12-10"
  },
  {
    id: "5",
    firstName: "Jennifer",
    lastName: "Martinez",
    email: "jennifer.martinez@email.com",
    phone: "(555) 567-8901",
    dateOfBirth: "1990-09-14",
    status: "active",
    caseNumber: "CASE-2024-005",
    lastActivity: "5 hours ago",
    totalRequests: 3,
    pendingRequests: 1,
    createdAt: "2024-02-10"
  }
];

function downloadCSV(clients: Client[]) {
  const headers = [
    "ID", "First Name", "Last Name", "Email", "Phone", "Date of Birth",
    "Status", "Case Number", "Last Activity", "Total Requests", "Pending Requests", "Created At"
  ];
  
  const csvContent = [
    headers.join(","),
    ...clients.map(client => [
      client.id,
      `"${client.firstName}"`,
      `"${client.lastName}"`,
      `"${client.email}"`,
      `"${client.phone}"`,
      client.dateOfBirth,
      client.status,
      client.caseNumber,
      `"${client.lastActivity}"`,
      client.totalRequests,
      client.pendingRequests,
      client.createdAt
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `clients_export_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Modal state
  const [addOpen, setAddOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  // Confirm dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClients(mockClients);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredClients = clients.filter(client => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchLower) ||
      client.lastName.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.caseNumber.toLowerCase().includes(searchLower) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  function handleAddClientOpen() {
    setAddOpen(true);
  }

  async function handleAddClient(form: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  }) {
    setAdding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const id = Math.random().toString(36).substr(2, 9);
    const newClient: Client = {
      ...form,
      id,
      caseNumber: `CASE-2024-${String(clients.length + 1).padStart(3, '0')}`,
      status: "pending",
      lastActivity: "just now",
      totalRequests: 0,
      pendingRequests: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setClients(prev => [newClient, ...prev]);
    setAddOpen(false);
    setAdding(false);
    
    toast({ 
      title: "Client Added Successfully", 
      description: `${form.firstName} ${form.lastName} has been added to your client list.` 
    });
  }

  function handleDeleteClient(client: Client) {
    setDeleteTarget(client);
    setDeleteOpen(true);
  }

  async function confirmDeleteClient() {
    if (!deleteTarget) return;
    
    setDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setClients(prev => prev.filter(c => c.id !== deleteTarget.id));
    
    toast({
      title: "Client Deleted",
      description: `${deleteTarget.firstName} ${deleteTarget.lastName} has been permanently removed.`,
      variant: "destructive"
    });
    
    setDeleting(false);
    setDeleteOpen(false);
    setDeleteTarget(null);
  }

  function handleExportClients() {
    if (filteredClients.length === 0) {
      toast({ 
        title: "No Clients to Export", 
        description: "Adjust your filters to include clients for export.",
        variant: "destructive"
      });
      return;
    }
    
    downloadCSV(filteredClients);
    toast({
      title: "Export Successful",
      description: `${filteredClients.length} clients exported to CSV file.`,
    });
  }

  function handleViewClient(client: Client) {
    toast({ 
      title: "View Client", 
      description: `Opening details for ${client.firstName} ${client.lastName}` 
    });
  }

  function handleEditClient(client: Client) {
    toast({ 
      title: "Edit Client", 
      description: `Opening edit form for ${client.firstName} ${client.lastName}` 
    });
  }

  function handleNewRequest(client: Client) {
    toast({ 
      title: "New Request", 
      description: `Creating new medical record request for ${client.firstName} ${client.lastName}` 
    });
  }

  function handleViewRecords(client: Client) {
    toast({ 
      title: "View Records", 
      description: `Opening medical records for ${client.firstName} ${client.lastName}` 
    });
  }

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    pending: clients.filter(c => c.status === 'pending').length,
    inactive: clients.filter(c => c.status === 'inactive').length
  };

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Clients", isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage client information and medical record requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportClients} disabled={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            Export ({filteredClients.length})
          </Button>
          <Button onClick={handleAddClientOpen} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="h-6 w-6 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="h-6 w-6 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
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
                placeholder="Search by name, email, phone, or case number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={isLoading}>
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Inactive Only
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Clients ({filteredClients.length})
            </div>
            {filteredClients.length !== clients.length && (
              <Badge variant="outline" className="ml-2">
                Filtered from {clients.length} total
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Get started by adding your first client"
                }
              </p>
              {(!searchTerm && statusFilter === "all") && (
                <Button onClick={handleAddClientOpen}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Client
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Case Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm">
                            {client.firstName[0]}{client.lastName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {client.firstName} {client.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              DOB: {new Date(client.dateOfBirth).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors">
                              {client.email}
                            </a>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors">
                              {client.phone}
                            </a>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {client.caseNumber}
                        </code>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(client.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm font-medium">{client.totalRequests}</span>
                          </div>
                          {client.pendingRequests > 0 && (
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                              <span className="text-sm text-orange-600 font-medium">
                                {client.pendingRequests} pending
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {client.lastActivity}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleViewClient(client)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditClient(client)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleNewRequest(client)}>
                              <FileTextIcon className="h-4 w-4 mr-2" />
                              New Request
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewRecords(client)}>
                              <FileText className="h-4 w-4 mr-2" />
                              View Records
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClient(client)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Client Modal */}
      <AddClientModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onAddClient={handleAddClient}
        isSubmitting={adding}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={confirmDeleteClient}
        title="Delete Client"
        description={
          deleteTarget
            ? `Are you sure you want to permanently delete ${deleteTarget.firstName} ${deleteTarget.lastName}? This action cannot be undone and will remove all associated data.`
            : ""
        }
        confirmText="Delete Client"
        loading={deleting}
      />
    </PageTransition>
  );
};

export default Clients;
