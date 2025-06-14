
import React, { useRef, useState, useEffect } from "react";
import { Upload, File, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { performanceMonitor, browserCompatibility, fileTestingHelper } from "@/utils/testingHelpers";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
];
const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".tiff", ".tif"];
const MAX_FILE_SIZE_MB = 50;

type UploadFile = {
  file: File;
  progress: number;
  error?: string;
  done: boolean;
  id: string;
};

function getExtension(fileName: string) {
  return (
    "." +
    fileName
      .split(".")
      .pop()
      ?.toLowerCase()
  );
}

function validateFile(file: File): string | null {
  // Enhanced validation with better error messages
  if (!file) {
    return "No file provided.";
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return `File type "${file.type}" is not supported. Only PDF, JPG, PNG, or TIFF files are allowed.`;
  }
  
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the ${MAX_FILE_SIZE_MB}MB limit.`;
  }
  
  if (!ALLOWED_EXTENSIONS.includes(getExtension(file.name))) {
    return `File extension "${getExtension(file.name)}" is not allowed.`;
  }

  // Check for empty files
  if (file.size === 0) {
    return "File appears to be empty.";
  }

  return null;
}

export default function DocumentUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [browserSupport, setBrowserSupport] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check browser compatibility on mount
    const support = browserCompatibility.checkSupport();
    setBrowserSupport(support);
    
    if (!support.fileAPI) {
      setGeneralError("Your browser doesn't support file uploads. Please use a modern browser.");
    } else if (!support.dragAndDrop) {
      console.warn("Drag and drop not supported, falling back to click-to-upload only");
    }

    performanceMonitor.startTiming('DocumentUpload-component-mount');
    return () => {
      performanceMonitor.endTiming('DocumentUpload-component-mount');
    };
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    performanceMonitor.startTiming('file-processing');
    setGeneralError(null);

    const newUploads: UploadFile[] = [];
    const maxFiles = 10; // Prevent too many simultaneous uploads

    if (files.length > maxFiles) {
      setGeneralError(`Too many files selected. Maximum ${maxFiles} files allowed at once.`);
      return;
    }

    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      const uploadId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      if (error) {
        newUploads.push({ 
          file, 
          progress: 0, 
          error, 
          done: false, 
          id: uploadId 
        });
        toast({
          title: "Upload Error",
          description: `${file.name}: ${error}`,
          variant: "destructive",
        });
      } else {
        newUploads.push({ 
          file, 
          progress: 0, 
          done: false, 
          id: uploadId 
        });
      }
    });

    // Simulate upload progress for demo/mock
    newUploads.forEach((upload, idx) => {
      if (!upload.error) {
        simulateUploadProgress(uploads.length + idx, upload.file, upload.id);
      }
    });

    setUploads((prev) => [...prev, ...newUploads]);
    performanceMonitor.endTiming('file-processing');
  };

  const simulateUploadProgress = (uploadIdx: number, file: File, uploadId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.max(5, Math.floor(Math.random() * 15)); // 5-20% increments
      
      setUploads((prev) =>
        prev.map((u) =>
          u.id === uploadId
            ? {
                ...u,
                progress: Math.min(progress, 100),
                done: progress >= 100,
              }
            : u
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        toast({
          title: "Upload Complete",
          description: `${file.name} uploaded successfully`,
        });
        
        // Test file integrity (mock)
        const integrity = fileTestingHelper.validateFileIntegrity(file, file);
        if (!integrity) {
          console.warn('File integrity check failed for:', file.name);
        }
      }
    }, 200 + Math.random() * 300); // Variable speed for realism
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(u => u.id !== uploadId));
    toast({
      title: "Upload Removed",
      description: "File removed from upload queue",
    });
  };

  // Enhanced drag-and-drop handlers with better error handling
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (!browserSupport?.dragAndDrop) {
      setGeneralError("Drag and drop not supported in your browser.");
      return;
    }

    const files = e.dataTransfer.files;
    if (files.length === 0) {
      setGeneralError("No files were dropped.");
      return;
    }

    handleFiles(files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (browserSupport?.dragAndDrop) {
      setDragging(true);
    }
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Only set dragging to false if we're leaving the drop zone completely
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragging(false);
    }
  };

  const handleSelectFiles = () => {
    if (!browserSupport?.fileAPI) {
      setGeneralError("File selection not supported in your browser.");
      return;
    }
    inputRef.current?.click();
  };

  return (
    <div>
      <div
        className={clsx(
          "rounded-xl border-2 border-dashed transition-all duration-200 p-8 text-center cursor-pointer bg-white/60 mb-6",
          dragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-gray-300 hover:border-primary hover:bg-gray-50",
          !browserSupport?.fileAPI && "opacity-50 cursor-not-allowed"
        )}
        tabIndex={0}
        role="button"
        aria-label="File upload area"
        onClick={handleSelectFiles}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={() => setDragging(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectFiles();
          }
        }}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          multiple
          accept={ALLOWED_EXTENSIONS.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={!browserSupport?.fileAPI}
        />
        <div className="flex flex-col items-center gap-2 pointer-events-none">
          <Upload className={clsx(
            "w-10 h-10 mb-2 transition-colors",
            dragging ? "text-primary" : "text-primary/70"
          )} />
          <p className="font-medium text-lg">
            {browserSupport?.dragAndDrop 
              ? <>Drag and drop files here, or <span className="underline text-primary">browse</span></>
              : <><span className="underline text-primary">Browse</span> to select files</>
            }
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Accepted: PDF, JPG, PNG, TIFF. Max: {MAX_FILE_SIZE_MB}MB each.
          </p>
          {!browserSupport?.fileAPI && (
            <p className="text-xs text-destructive mt-2">
              ⚠️ File uploads not supported in this browser
            </p>
          )}
        </div>
      </div>

      {generalError && (
        <div className="bg-destructive/10 rounded-lg text-destructive px-4 py-3 text-sm mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{generalError}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setGeneralError(null)}
            className="ml-auto h-auto p-1"
          >
            ✕
          </Button>
        </div>
      )}

      {uploads.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-muted-foreground">
            Upload Progress ({uploads.filter(u => u.done).length}/{uploads.length} completed)
          </h3>
          {uploads.map((u) => (
            <div
              key={u.id}
              className={clsx(
                "flex items-center border rounded-lg px-4 py-3 bg-background gap-4 transition-all",
                u.error ? "border-destructive/40 bg-destructive/5" : "border-primary/20",
                u.done && !u.error && "border-green-500/40 bg-green-50"
              )}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {u.done && !u.error ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : u.error ? (
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                ) : (
                  <File className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-sm">{u.file.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {(u.file.size / 1024 / 1024).toFixed(2)} MB
                    {u.file.type && ` • ${u.file.type}`}
                  </div>
                  {u.error && (
                    <div className="text-xs text-destructive mt-1 leading-tight">
                      {u.error}
                    </div>
                  )}
                </div>
              </div>

              {!u.error && (
                <div className="flex flex-col items-end min-w-[120px]">
                  <div className="w-full mb-1">
                    <Progress
                      value={u.progress}
                      className="h-2 bg-muted rounded-full"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {u.done ? "✅ Complete" : `${u.progress}%`}
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeUpload(u.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${u.file.name}`}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
