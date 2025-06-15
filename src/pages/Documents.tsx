
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Upload, 
  Filter, 
  Download,
  MoreHorizontal,
  FileText,
  Image,
  FileArchive,
  File,
  Calendar,
  User,
  Building2,
  Eye,
  Share2,
  Trash2
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

interface Document {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'document' | 'archive';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  clientName: string;
  providerName: string;
  category: 'medical_records' | 'billing' | 'imaging' | 'lab_results' | 'authorization';
  status: 'processing' | 'ready' | 'archived';
  requestNumber?: string;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: "1",
    fileName: "Medical_Records_Sarah_Johnson.pdf",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-16",
    uploadedBy: "Jennifer Smith",
    clientName: "Sarah Johnson",
    providerName: "St. Mary's General Hospital",
    category: "medical_records",
    status: "ready",
    requestNumber: "REQ-2024-001",
    tags: ["emergency", "cardiology"]
  },
  {
    id: "2",
    fileName: "Lab_Results_Michael_Brown.pdf",
    fileType: "pdf",
    fileSize: "1.2 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "John Davis",
    clientName: "Michael Brown",
    providerName: "Downtown Family Clinic",
    category: "lab_results",
    status: "ready",
    requestNumber: "REQ-2024-002",
    tags: ["blood work", "routine"]
  },
  {
    id: "3",
    fileName: "MRI_Scan_Emily_Davis.zip",
    fileType: "archive",
    fileSize: "45.8 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "Sarah Wilson",
    clientName: "Emily Davis",
    providerName: "Advanced Cardiology Associates",
    category: "imaging",
    status: "processing",
    requestNumber: "REQ-2024-003",
    tags: ["mri", "cardiac"]
  },
  {
    id: "4",
    fileName: "Authorization_Form_Robert_Wilson.pdf",
    fileType: "pdf",
    fileSize: "0.8 MB",
    uploadDate: "2024-01-13",
    uploadedBy: "Michael Johnson",
    clientName: "Robert Wilson",
    providerName: "Regional Medical Laboratory",
    category: "authorization",
    status: "archived",
    tags: ["signed", "hipaa"]
  }
];

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'document':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'image':
        return <Image className="h-5 w-5 text-blue-600" />;
      case 'archive':
        return <FileArchive className="h-5 w-5 text-purple-600" />;
      default:
        return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>;
      case 'ready':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      medical_records: "bg-blue-100 text-blue-800",
      billing: "bg-green-100 text-green-800",
      imaging: "bg-purple-100 text-purple-800",
      lab_results: "bg-orange-100 text-orange-800",
      authorization: "bg-gray-100 text-gray-800"
    };
    
    return (
      <Badge className={`${colors[category as keyof typeof colors]} hover:${colors[category as keyof typeof colors]}`}>
        {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const handleUpload = () => {
    toast({
      title: "Upload Documents",
      description: "Document upload interface would open here",
    });
  };

  const handleDocumentAction = (action: string, fileName: string) => {
    toast({
      title: `${action} Document`,
      description: `${action} action for ${fileName}`,
    });
  };

  const stats = {
    total: documents.length,
    ready: documents.filter(d => d.status === 'ready').length,
    processing: documents.filter(d => d.status === 'processing').length,
    totalSize: documents.reduce((acc, doc) => {
      const size = parseFloat(doc.fileSize.split(' ')[0]);
      return acc + size;
    }, 0).toFixed(1)
  };

  return (
    <PageTransition className="max-w-7xl mx-auto w-full space-y-6">
      <Breadcrumbs 
        items={[
          { label: "Documents", isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Manage all medical records and related documents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Bulk Download
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
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
                <p className="text-sm font-medium text-gray-600">Ready</p>
                <p className="text-2xl font-bold">{stats.ready}</p>
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
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-2xl font-bold">{stats.processing}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileArchive className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Size</p>
                <p className="text-2xl font-bold">{stats.totalSize} GB</p>
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
                placeholder="Search documents by name, client, provider, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Category: {categoryFilter === "all" ? "All" : categoryFilter.replace('_', ' ')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("medical_records")}>Medical Records</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("billing")}>Billing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("imaging")}>Imaging</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("lab_results")}>Lab Results</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("authorization")}>Authorization</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("ready")}>Ready</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("processing")}>Processing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("archived")}>Archived</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Documents ({filteredDocuments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoadingSkeleton variant="table" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Client & Provider</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Upload Info</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.fileType)}
                        <div>
                          <div className="font-medium text-sm">{doc.fileName}</div>
                          <div className="text-xs text-gray-500">{doc.fileSize}</div>
                          {doc.requestNumber && (
                            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                              {doc.requestNumber}
                            </code>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <User className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="font-medium">{doc.clientName}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Building2 className="h-3 w-3 mr-1 text-gray-400" />
                          {doc.providerName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategoryBadge(doc.category)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(doc.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-gray-500">By:</span> {doc.uploadedBy}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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
                          <DropdownMenuItem onClick={() => handleDocumentAction("View", doc.fileName)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Document
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("Download", doc.fileName)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("Share", doc.fileName)}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDocumentAction("Delete", doc.fileName)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
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

export default Documents;
