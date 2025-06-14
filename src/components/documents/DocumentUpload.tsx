
import React, { useRef, useState } from "react";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import clsx from "clsx";

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
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PDF, JPG, PNG, or TIFF files are allowed.";
  }
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return "File exceeds the 50MB size limit.";
  }
  if (!ALLOWED_EXTENSIONS.includes(getExtension(file.name))) {
    return "File extension is not allowed.";
  }
  return null;
}

export default function DocumentUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setGeneralError(null);

    const newUploads: UploadFile[] = [];
    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newUploads.push({ file, progress: 0, error, done: false });
      } else {
        newUploads.push({ file, progress: 0, done: false });
      }
    });

    // Simulate upload progress for demo/mock
    newUploads.forEach((upload, idx) => {
      if (!upload.error) {
        simulateUploadProgress(idx, upload.file);
      }
    });

    setUploads((prev) => [...prev, ...newUploads]);
  };

  const simulateUploadProgress = (uploadIdx: number, file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.max(10, Math.floor(Math.random() * 21)); // 10-30%
      setUploads((prev) =>
        prev.map((u, idx) =>
          idx === uploads.length + uploadIdx
            ? {
                ...u,
                progress: Math.min(progress, 100),
                done: progress >= 100,
              }
            : u
        )
      );
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  // Drag-and-drop handlers
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
  };

  const handleSelectFiles = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <div
        className={clsx(
          "rounded-xl border-2 border-dashed transition-colors p-8 text-center cursor-pointer bg-white/60 mb-6",
          dragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary"
        )}
        tabIndex={0}
        aria-label="File upload"
        onClick={handleSelectFiles}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnd={onDragLeave}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          multiple
          accept={ALLOWED_EXTENSIONS.join(",")}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2 pointer-events-none">
          <Upload className="w-10 h-10 text-primary mb-2" />
          <p className="font-medium text-lg">
            Drag and drop files here, or <span className="underline">browse</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Accepted: PDF, JPG, PNG, TIFF. Max: 50MB each.
          </p>
        </div>
      </div>
      {generalError && (
        <div className="bg-destructive/10 rounded text-destructive px-4 py-2 text-sm mb-3">
          {generalError}
        </div>
      )}
      {uploads.length > 0 && (
        <div className="space-y-3">
          {uploads.map((u, i) => (
            <div
              key={u.file.name + i}
              className={clsx(
                "flex items-center border rounded px-3 py-2 bg-background gap-4",
                u.error ? "border-destructive/40" : "border-primary/20"
              )}
            >
              <File className="text-muted-foreground mr-2" />
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium">{u.file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(u.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                {u.error && (
                  <div className="text-xs text-destructive mt-1">
                    {u.error}
                  </div>
                )}
              </div>
              {!u.error && (
                <div className="flex flex-col items-end min-w-[120px]">
                  <div className="w-full">
                    <div className="w-24">
                      <Progress
                        value={u.progress}
                        className="h-2 bg-muted mb-1 rounded"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {u.done ? "Uploaded" : `${u.progress}%`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
