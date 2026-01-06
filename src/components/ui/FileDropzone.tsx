import { Upload, FileCode, FileJson, File } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  acceptedTypes?: string[];
}

const fileTypeIcons: Record<string, typeof FileCode> = {
  ".py": FileCode,
  ".js": FileCode,
  ".ts": FileCode,
  ".tsx": FileCode,
  ".json": FileJson,
  ".csv": File,
};

export function FileDropzone({ onFilesSelected, acceptedTypes = [".py", ".js", ".ts", ".tsx", ".json", ".csv"] }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      acceptedTypes.some(type => file.name.endsWith(type))
    );
    
    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  }, [acceptedTypes, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const getFileIcon = (filename: string) => {
    const ext = acceptedTypes.find(type => filename.endsWith(type));
    return ext ? fileTypeIcons[ext] || File : File;
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer group",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-primary/5"
        )}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="p-8 lg:p-12 flex flex-col items-center text-center">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300",
            isDragging ? "bg-primary/20 scale-110" : "bg-muted group-hover:bg-primary/10"
          )}>
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            )} />
          </div>
          
          <h3 className="text-lg font-semibold mb-2">
            {isDragging ? "Drop files here" : "Drag & Drop Files"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse your files
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            {acceptedTypes.map(type => (
              <span
                key={type}
                className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Animated border */}
        {isDragging && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 shimmer" />
          </div>
        )}
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="glass-panel p-4 space-y-2 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Selected Files ({selectedFiles.length})
          </p>
          {selectedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.name);
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FileIcon className="h-4 w-4 text-primary" />
                <span className="text-sm truncate flex-1">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
