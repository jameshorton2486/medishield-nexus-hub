
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
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
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

interface Provider {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'specialist' | 'pharmacy' | 'lab';
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: 'active' | 'inactive' | 'pending';
  avgResponseTime: string;
  totalRequests: number;
  successRate: number;
  lastContact: string;
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "St. Mary's General Hospital",
    type: "hospital",
    email: "records@stmarys.com",
    phone: "(555) 123-4567",
    address: "123 Medical Center Dr",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    status: "active",
    avgResponseTime: "2.1 days",
    totalRequests: 145,
    successRate: 98,
    lastContact: "2 days ago"
  },
  {
    id: "2",
    name: "Downtown Family Clinic",
    type: "clinic",
    email: "admin@downtownfamily.com",
    phone: "(555) 234-5678",
    address: "456 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    status: "active",
    avgResponseTime: "1.5 days",
    totalRequests: 87,
    successRate: 95,
    lastContact: "1 week ago"
  },
  {
    id: "3",
    name: "Advanced Cardiology Associates",
    type: "specialist",
    email: "records@advancedcardio.com",
    phone: "(555) 345-6789",
    address: "789 Heart Way",
    city: "Springfield",
    state: "IL",
    zipCode: "62703",
    status: "pending",
    avgResponseTime: "3.2 days",
    totalRequests: 23,
    successRate: 87,
    lastContact: "3 weeks ago"
  },
  {
    id: "4",
    name: "Regional Medical Laboratory",
    type: "lab",
    email: "results@regionlab.com",
    phone: "(555) 456-7890",
    address: "321 Science Blvd",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    status: "inactive",
    avgResponseTime: "5.1 days",
    totalRequests: 67,
    successRate: 78,
    lastContact: "2 months ago"
  }
];

const Providers = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProviders(mockProviders);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || provider.status === statusFilter;
    const matchesType = typeFilter === "all" || provider.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
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

  const getTypeBadge = (type: string) => {
    const colors = {
      hospital: "bg-blue-100 text-blue-800",
      clinic: "bg-purple-100 text-purple-800",
      specialist: "bg-orange-100 text-orange-800",
      pharmacy: "bg-green-100 text-green-800",
      lab: "bg-pink-100 text-pink-800"
    };
    
    return (
      <Badge className={`${colors[type as keyof typeof colors]} hover:${colors[type as keyof typeof colors]}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getSuccessRateIcon = (rate: number) => {
    if (rate >= 95) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (rate >= 85) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <XCircle className="h-4 w-4 text-red-600" />;
  };

  const handleAddProvider = () => {
    toast({
      title: "Add New Provider",
      description: "Provider registration form would open here",
    });
  };

  const handleProviderAction = (action: string, providerName: string) => {
    toast({
      title: `${action} Provider`,
      description: `${action} action for ${providerName}`,
    });
  };

  const stats = {
    total: providers.length,
    active: providers.filter(p => p.status === 'active').length,
    pending: providers.filter(p => p.status === 'pending').length,
    avgResponseTime: "2.3 days"
  };

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Providers", isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Network</h1>
          <p className="text-gray-600">Manage medical providers and track request performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddProvider}>
            <Plus className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Providers</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
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
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold">{stats.avgResponseTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
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
                placeholder="Search providers by name, email, or address..."
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
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Type: {typeFilter === "all" ? "All" : typeFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTypeFilter("all")}>All Types</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("hospital")}>Hospital</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("clinic")}>Clinic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("specialist")}>Specialist</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("pharmacy")}>Pharmacy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("lab")}>Laboratory</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Providers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Providers ({filteredProviders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{provider.name}</div>
                        <div className="flex items-center space-x-2">
                          {getTypeBadge(provider.type)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {provider.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {provider.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start text-sm">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div>{provider.address}</div>
                          <div className="text-gray-500">{provider.city}, {provider.state} {provider.zipCode}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(provider.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          {getSuccessRateIcon(provider.successRate)}
                          <span className="ml-1">{provider.successRate}% success</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {provider.avgResponseTime} avg
                        </div>
                        <div className="text-xs text-gray-500">
                          {provider.totalRequests} total requests
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {provider.lastContact}
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
                          <DropdownMenuItem onClick={() => handleProviderAction("View", provider.name)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleProviderAction("Edit", provider.name)}>
                            Edit Provider
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleProviderAction("Contact", provider.name)}>
                            Send Request
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleProviderAction("View History", provider.name)}>
                            Request History
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
    </PageTransition>
  );
};

export default Providers;
