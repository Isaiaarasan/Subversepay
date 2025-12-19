"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  onFileSelect: (file: File | null) => void;
  accept?: string;
}

export function FileUploader({ 
  id, label, required, error, onFileSelect, accept = "image/*,application/pdf" 
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      // Basic size check (5MB)
      if (selected.size > 5 * 1024 * 1024) {
        alert("File too large. Max 5MB.");
        return;
      }
      setFile(selected);
      onFileSelect(selected);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(error && "text-destructive")}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>

      {!file ? (
        <div 
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-muted/50",
            error ? "border-destructive/50 bg-destructive/5" : "border-muted-foreground/20"
          )}
        >
          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground">Click to upload (Max 5MB)</p>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 border rounded-lg bg-background">
          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={removeFile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <input 
        ref={inputRef}
        id={id}
        type="file" 
        accept={accept} 
        className="hidden" 
        onChange={handleFile} 
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}