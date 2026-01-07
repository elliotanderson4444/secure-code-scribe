import { Upload, FileCode, FileJson, File, X } from "lucide-react";
import { useCallback, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

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

// Security: Max file size 10MB, max files 20
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 20;

export function FileDropzone({ onFilesSelected, acceptedTypes = [".py", ".js", ".ts", ".tsx", ".json", ".csv"] }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { t, dir } = useTranslation();

  const validateFiles = useCallback((files: File[]): File[] => {
    setError(null);
    
    // Filter by accepted types
    const validTypeFiles = files.filter(file => 
      acceptedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );
    
    if (validTypeFiles.length !== files.length) {
      setError(dir === "rtl" ? "بعض الملفات غير مدعومة" : "Some files have unsupported types");
    }
    
    // Filter by size
    const validSizeFiles = validTypeFiles.filter(file => file.size <= MAX_FILE_SIZE);
    if (validSizeFiles.length !== validTypeFiles.length) {
      setError(dir === "rtl" ? "بعض الملفات كبيرة جداً (الحد الأقصى 10MB)" : "Some files are too large (max 10MB)");
    }
    
    // Limit number of files
    if (validSizeFiles.length > MAX_FILES) {
      setError(dir === "rtl" ? `الحد الأقصى ${MAX_FILES} ملف` : `Maximum ${MAX_FILES} files allowed`);
      return validSizeFiles.slice(0, MAX_FILES);
    }
    
    return validSizeFiles;
  }, [acceptedTypes, dir]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = validateFiles(Array.from(e.dataTransfer.files));
    
    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  }, [validateFiles, onFilesSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = validateFiles(Array.from(e.target.files || []));
    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(files);
    }
    // Reset input value to allow re-selecting same files
    e.target.value = "";
  }, [validateFiles, onFilesSelected]);

  const removeFile = useCallback((index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  }, [selectedFiles, onFilesSelected]);

  const getFileIcon = useMemo(() => (filename: string) => {
    const ext = acceptedTypes.find(type => filename.toLowerCase().endsWith(type));
    return ext ? fileTypeIcons[ext] || File : File;
  }, [acceptedTypes]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
          aria-label={t.scan.dragDrop}
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
            {isDragging 
              ? (dir === "rtl" ? "أفلت الملفات هنا" : "Drop files here") 
              : t.scan.dragDrop
            }
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t.scan.orClick}
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

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="glass-panel p-4 space-y-2 animate-fade-in">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            {t.scan.selectedFiles} ({selectedFiles.length})
          </p>
          {selectedFiles.map((file, index) => {
            const FileIcon = getFileIcon(file.name);
            return (
              <div
                key={`${file.name}-${index}`}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg bg-muted/30 animate-slide-in group",
                  dir === "rtl" && "flex-row-reverse"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FileIcon className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm truncate flex-1" title={file.name}>{file.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatFileSize(file.size)}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
