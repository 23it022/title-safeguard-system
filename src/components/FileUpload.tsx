
import React, { useState, useRef } from 'react';
import { batchVerifyTitles } from '@/utils/verificationAlgorithms';
import { parseCSV } from '@/utils/similarity';
import { BatchVerificationResult } from '@/types';
import { Upload, File, CheckCircle, XCircle, Download, Trash2 } from 'lucide-react';

interface FileUploadProps {
  onBatchComplete: (result: BatchVerificationResult) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onBatchComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    
    // Check if file is CSV
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setError('Please upload a CSV or TXT file');
      return;
    }

    setSelectedFile(file);
  };

  const handleVerify = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setError(null);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvData = e.target?.result as string;
        const titles = parseCSV(csvData);
        
        if (titles.length === 0) {
          setError('No valid title data found in the file');
          setIsProcessing(false);
          return;
        }
        
        // Process a maximum of 100 titles at once for performance
        const titlesToProcess = titles.slice(0, 100);
        
        setTimeout(() => {
          const result = batchVerifyTitles(titlesToProcess);
          onBatchComplete(result);
          setIsProcessing(false);
          setSelectedFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 1000);
      } catch (err) {
        setError('Failed to process file. Please check format.');
        setIsProcessing(false);
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
      setIsProcessing(false);
    };
    
    reader.readAsText(selectedFile);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const template = 'Title,Category,Language\nExample News,Newspaper,English\nSample Magazine,Magazine,Hindi';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'title_verification_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="glass-panel rounded-lg p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">Batch Title Verification</h3>
          <p className="text-sm text-foreground/70 mt-1">Upload a CSV file with titles for batch processing</p>
        </div>
        
        {!selectedFile && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              isDragging ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-10 h-10 text-foreground/40" />
              <div>
                <p className="text-sm font-medium">
                  Drag and drop your CSV file here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary hover:underline focus:outline-none"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-foreground/60 mt-1">
                  Supports CSV files with title, category, and language columns
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        )}
        
        {selectedFile && (
          <div className="bg-background/40 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <File className="w-8 h-8 text-foreground/70" />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-foreground/60">{Math.round(selectedFile.size / 1024)} KB</p>
              </div>
              <button
                onClick={handleCancel}
                disabled={isProcessing}
                className="p-1.5 rounded-full text-foreground/60 hover:text-foreground/90 hover:bg-foreground/10 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          {selectedFile && (
            <button
              onClick={handleVerify}
              disabled={isProcessing}
              className="flex-1 rounded-md bg-primary text-primary-foreground py-2.5 px-4 font-medium transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Verify Batch</span>
              )}
            </button>
          )}
          
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center justify-center rounded-md bg-secondary text-secondary-foreground py-2.5 px-4 font-medium transition-all duration-200 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 focus:ring-offset-background"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>Download Template</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
