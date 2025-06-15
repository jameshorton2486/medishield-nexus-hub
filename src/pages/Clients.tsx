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
  Trash
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
    pendingRequests: 2
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
    pendingRequests: 0
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
    pendingRequests: 1
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
    pendingRequests: 0
  }
];

function downloadCSV(clients: Client[]) {
  const replacer = (key: string, value: any) => (value === null ? "" : value);
  const header = [
    "id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "dateOfBirth",
    "status",
    "caseNumber",
    "lastActivity",
    "totalRequests",
    "pendingRequests"
  ];
  const csv = [
    header.join(","),
    ...clients.map(row =>
      header
        .map(fieldName =>
          JSON.stringify((row as any)[fieldName], replacer)
        )
        .join(",")
    ),
  ].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "clients.csv";
  a.click();
  window.URL.revokeObjectURL(url);
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
    // Simulate API call
    const timer = setTimeout(() => {
      setClients(mockClients);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
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
    // Simulate async call
    setTimeout(() => {
      // Generate a fake id and some details
      const id = (Math.random() * 10_000_000).toFixed(0);
      const newClient: Client = {
        ...form,
        id,
        caseNumber: `CASE-2024-${id}`,
        status: "active",
        lastActivity: "just now",
        totalRequests: 0,
        pendingRequests: 0,
      };
      setClients(prev => [newClient, ...prev]);
      setAddOpen(false);
      setAdding(false);
      toast({ title: "Client Added", description: `${form.firstName} ${form.lastName} was added successfully.` });
    }, 600);
  }

  function handleDeleteClient(client: Client) {
    setDeleteTarget(client);
    setDeleteOpen(true);
  }

  function confirmDeleteClient() {
    if (!deleteTarget) return;
    setDeleting(true);
    // Simulate async call
    setTimeout(() => {
      setClients(prev => prev.filter(c => c.id !== deleteTarget.id));
      toast({
        title: "Client Deleted",
        description: `${deleteTarget.firstName} ${deleteTarget.lastName} was deleted.`,
      });
      setDeleting(false);
      setDeleteOpen(false);
      setDeleteTarget(null);
    }, 500);
  }

  function handleExportClients() {
    if (filteredClients.length === 0) {
      toast({ title: "No clients to export", description: "Change your filters to select clients to export." });
      return;
    }
    downloadCSV(filteredClients);
    toast({
      title: "Exported",
      description: `Exported ${filteredClients.length} clients to CSV`,
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
          <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600">Manage all your clients and their medical record requests</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExportClients}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddClientOpen}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-yellow-600 rounded-full"></div>
              </div>
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
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-gray-600 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold">{stats.inactive}</p>
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
                placeholder="Search clients by name, email, or case number..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Clients ({filteredClients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Case Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold">
                          {client.firstName[0]}{client.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium">{client.firstName} {client.lastName}</div>
                          <div className="text-sm text-gray-500">DOB: {new Date(client.dateOfBirth).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {client.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {client.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">
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
                          <span className="text-sm">{client.totalRequests}</span>
                        </div>
                        {client.pendingRequests > 0 && (
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-orange-500 mr-1" />
                            <span className="text-sm text-orange-600">{client.pendingRequests} pending</span>
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
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {}}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            Edit Client
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            New Request
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            View Records
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteClient(client)}>
                            <Trash className="h-4 w-4 mr-2 text-destructive" />
                            <span className="text-destructive">Delete Client</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            ? `Are you sure you want to permanently delete ${deleteTarget.firstName} ${deleteTarget.lastName}?`
            : ""
        }
        confirmText="Delete"
        loading={deleting}
      />

    </PageTransition>
  );
};

export default Clients;

// Note: This file is getting too long. Consider refactoring into smaller files for better maintainability.
