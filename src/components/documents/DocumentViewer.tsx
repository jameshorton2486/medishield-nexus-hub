
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCw,
  FileText,
  Image,
  FileArchive,
  File,
  X
} from "lucide-react";
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
  category: string;
  status: string;
  tags: string[];
}

interface DocumentViewerProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  isOpen,
  onClose
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const { toast } = useToast();

  if (!document) return null;

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `Downloading ${document.fileName}...`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Document",
      description: "Share functionality would open here",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Document",
      description: "Print dialog would open here",
    });
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const rotate = () => setRotation(prev => (prev + 90) % 360);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(document.fileType)}
              <div>
                <DialogTitle className="text-lg">{document.fileName}</DialogTitle>
                <div className="flex items-center space-x-2 mt-1">
                  {getCategoryBadge(document.category)}
                  <span className="text-sm text-gray-500">{document.fileSize}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b pb-4 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoom <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoom >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={rotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="flex-1 overflow-auto bg-gray-100 rounded-lg">
          <div className="p-8 flex justify-center">
            <div 
              className="bg-white shadow-lg border max-w-full"
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'top center'
              }}
            >
              {document.fileType === 'pdf' || document.fileType === 'document' ? (
                <div className="w-[612px] h-[792px] p-8 text-sm leading-relaxed">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold">Medical Records Request</h2>
                    <p className="text-gray-600 mt-2">Patient: {document.clientName}</p>
                    <p className="text-gray-600">Provider: {document.providerName}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Request Details:</h3>
                      <p>This document contains medical records for {document.clientName} as requested on {new Date(document.uploadDate).toLocaleDateString()}.</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Document Information:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>File Name: {document.fileName}</li>
                        <li>File Size: {document.fileSize}</li>
                        <li>Upload Date: {new Date(document.uploadDate).toLocaleDateString()}</li>
                        <li>Uploaded By: {document.uploadedBy}</li>
                        <li>Category: {document.category.replace('_', ' ')}</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {document.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t">
                      <p className="text-xs text-gray-500 text-center">
                        This is a preview of the document. Download the file to view the complete content.
                      </p>
                    </div>
                  </div>
                </div>
              ) : document.fileType === 'image' ? (
                <div className="w-[600px] h-[400px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Image Preview</p>
                    <p className="text-sm text-gray-500">{document.fileName}</p>
                  </div>
                </div>
              ) : (
                <div className="w-[600px] h-[400px] bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <FileArchive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Archive File</p>
                    <p className="text-sm text-gray-500">{document.fileName}</p>
                    <p className="text-xs text-gray-400 mt-2">Download to extract contents</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Document Metadata */}
        <div className="border-t pt-4 flex-shrink-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Client:</span>
              <p>{document.clientName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Provider:</span>
              <p>{document.providerName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Uploaded:</span>
              <p>{new Date(document.uploadDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <p className="capitalize">{document.status}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
