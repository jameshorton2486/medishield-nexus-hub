import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { DocumentViewer } from '@/components/documents/DocumentViewer';
import { PageTransition } from '@/components/ui/page-transition';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  MoreHorizontal,
  Grid3X3,
  List,
  Calendar,
  FileText,
  Image,
  FileArchive,
  File,
  Trash2,
  Share2
} from 'lucide-react';

interface Document {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'image' | 'document' | 'archive';
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  clientName: string;
  providerName: string;
  category: string;
  status: string;
  tags: string[];
}

// Mock data for documents
const mockDocuments: Document[] = [
  {
    id: '1',
    fileName: 'Medical Report 2023',
    fileType: 'pdf',
    fileSize: '2.5 MB',
    uploadDate: '2023-03-15',
    uploadedBy: 'Dr. Smith',
    clientName: 'John Doe',
    providerName: 'General Hospital',
    category: 'medical_records',
    status: 'received',
    tags: ['report', 'medical', '2023']
  },
  {
    id: '2',
    fileName: 'Authorization Form',
    fileType: 'document',
    fileSize: '1.2 MB',
    uploadDate: '2023-04-01',
    uploadedBy: 'Jane Doe',
    clientName: 'Alice Smith',
    providerName: 'Law Firm Inc.',
    category: 'authorization',
    status: 'pending',
    tags: ['form', 'legal', 'authorization']
  },
  {
    id: '3',
    fileName: 'X-Ray Image',
    fileType: 'image',
    fileSize: '800 KB',
    uploadDate: '2023-04-05',
    uploadedBy: 'Imaging Center',
    clientName: 'Bob Johnson',
    providerName: 'Radiology Clinic',
    category: 'imaging',
    status: 'processing',
    tags: ['x-ray', 'image', 'radiology']
  },
  {
    id: '4',
    fileName: 'Billing Statement March',
    fileType: 'pdf',
    fileSize: '900 KB',
    uploadDate: '2023-04-10',
    uploadedBy: 'Accountant',
    clientName: 'John Doe',
    providerName: 'General Hospital',
    category: 'billing',
    status: 'received',
    tags: ['billing', 'statement', 'march']
  },
  {
    id: '5',
    fileName: 'Lab Results Blood Test',
    fileType: 'pdf',
    fileSize: '1.5 MB',
    uploadDate: '2023-04-12',
    uploadedBy: 'Lab Technician',
    clientName: 'Alice Smith',
    providerName: 'LabCorp',
    category: 'lab_results',
    status: 'received',
    tags: ['lab', 'results', 'blood test']
  },
  {
    id: '6',
    fileName: 'Archive of Old Records',
    fileType: 'archive',
    fileSize: '15 MB',
    uploadDate: '2023-04-15',
    uploadedBy: 'Archivist',
    clientName: 'Bob Johnson',
    providerName: 'Records Archive',
    category: 'medical_records',
    status: 'received',
    tags: ['archive', 'old', 'records']
  },
  {
    id: '7',
    fileName: 'Another Medical Report 2022',
    fileType: 'pdf',
    fileSize: '2.7 MB',
    uploadDate: '2023-04-20',
    uploadedBy: 'Dr. Smith',
    clientName: 'Jane Doe',
    providerName: 'General Hospital',
    category: 'medical_records',
    status: 'pending',
    tags: ['report', 'medical', '2022']
  },
  {
    id: '8',
    fileName: 'Updated Authorization Form',
    fileType: 'document',
    fileSize: '1.3 MB',
    uploadDate: '2023-04-25',
    uploadedBy: 'Jane Doe',
    clientName: 'Charlie Brown',
    providerName: 'Law Firm Inc.',
    category: 'authorization',
    status: 'processing',
    tags: ['form', 'legal', 'authorization']
  },
  {
    id: '9',
    fileName: 'MRI Scan Results',
    fileType: 'image',
    fileSize: '1.1 MB',
    uploadDate: '2023-04-30',
    uploadedBy: 'Imaging Center',
    clientName: 'David Lee',
    providerName: 'Radiology Clinic',
    category: 'imaging',
    status: 'received',
    tags: ['mri', 'scan', 'image']
  },
  {
    id: '10',
    fileName: 'Final Billing Statement April',
    fileType: 'pdf',
    fileSize: '1.0 MB',
    uploadDate: '2023-05-05',
    uploadedBy: 'Accountant',
    clientName: 'Jane Doe',
    providerName: 'General Hospital',
    category: 'billing',
    status: 'received',
    tags: ['billing', 'statement', 'april']
  }
];

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const { toast } = useToast();

  // Filter documents based on search and filters
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.providerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  const handleBulkDownload = () => {
    if (selectedDocuments.length === 0) {
      toast({
        title: "No Documents Selected",
        description: "Please select documents to download.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download Started",
      description: `Downloading ${selectedDocuments.length} documents...`,
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleSelectItem = (documentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(id => id !== documentId));
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
      case 'document':
        return <FileText className="h-6 w-6 text-red-600" />;
      case 'image':
        return <Image className="h-6 w-6 text-blue-600" />;
      case 'archive':
        return <FileArchive className="h-6 w-6 text-purple-600" />;
      default:
        return <File className="h-6 w-6 text-gray-600" />;
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
      <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      received: "bg-green-100 text-green-800",
      pending: "bg-orange-100 text-orange-800",
      processing: "bg-blue-100 text-blue-800"
    };
    
    return (
      <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <PageTransition className="max-w-7xl mx-auto mt-6 px-2 sm:px-4">
      <Breadcrumbs 
        items={[
          { label: 'Documents', isCurrentPage: true }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Documents</h1>
          <p className="text-gray-600">Manage and organize your medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          {selectedDocuments.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleBulkDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download ({selectedDocuments.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="medical_records">Medical Records</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="imaging">Imaging</SelectItem>
                <SelectItem value="lab_results">Lab Results</SelectItem>
                <SelectItem value="authorization">Authorization</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List/Grid */}
      {viewMode === 'table' ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Documents ({filteredDocuments.length})</span>
              <div className="flex items-center gap-2">
                {selectedDocuments.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Selected
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">
                      <Checkbox
                        checked={selectedDocuments.length === filteredDocuments.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-2">Document</th>
                    <th className="text-left p-2">Client</th>
                    <th className="text-left p-2">Provider</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((document) => (
                    <tr key={document.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedDocuments.includes(document.id)}
                          onCheckedChange={(checked) => handleSelectItem(document.id, !!checked)}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          {getFileIcon(document.fileType)}
                          <div>
                            <p className="font-medium text-sm">{document.fileName}</p>
                            <p className="text-xs text-gray-500">{document.fileSize}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-sm">{document.clientName}</td>
                      <td className="p-2 text-sm">{document.providerName}</td>
                      <td className="p-2">
                        {getCategoryBadge(document.category)}
                      </td>
                      <td className="p-2">
                        {getStatusBadge(document.status)}
                      </td>
                      <td className="p-2 text-sm">{new Date(document.uploadDate).toLocaleDateString()}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDocument(document)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getFileIcon(document.fileType)}
                    <Checkbox
                      checked={selectedDocuments.includes(document.id)}
                      onCheckedChange={(checked) => handleSelectItem(document.id, !!checked)}
                    />
                  </div>
                  {getStatusBadge(document.status)}
                </div>
                
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{document.fileName}</h3>
                
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <p><span className="font-medium">Client:</span> {document.clientName}</p>
                  <p><span className="font-medium">Provider:</span> {document.providerName}</p>
                  <p><span className="font-medium">Size:</span> {document.fileSize}</p>
                  <p><span className="font-medium">Date:</span> {new Date(document.uploadDate).toLocaleDateString()}</p>
                </div>
                
                <div className="mb-3">
                  {getCategoryBadge(document.category)}
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewDocument(document)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Document Viewer */}
      <DocumentViewer
        document={selectedDocument}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </PageTransition>
  );
};

export default Documents;
