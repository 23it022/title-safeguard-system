
import React, { useState } from 'react';
import TitleForm from '@/components/TitleForm';
import VerificationResult from '@/components/VerificationResult';
import FileUpload from '@/components/FileUpload';
import { VerificationResult as VerificationResultType, BatchVerificationResult } from '@/types';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [verificationResult, setVerificationResult] = useState<VerificationResultType | null>(null);
  const [batchResult, setBatchResult] = useState<BatchVerificationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');

  const handleVerificationComplete = (result: VerificationResultType) => {
    setVerificationResult(result);

    // Show toast notification
    if (result.isVerified) {
      if (result.verificationScore >= 90) {
        toast({
          title: "Verification Successful",
          description: "Title passed all verification checks.",
          variant: "default",
        });
      } else {
        toast({
          title: "Verification Passed with Notes",
          description: result.feedback,
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Verification Failed",
        description: result.feedback,
        variant: "destructive",
      });
    }
  };

  const handleBatchComplete = (result: BatchVerificationResult) => {
    setBatchResult(result);

    // Show toast notification
    toast({
      title: "Batch Processing Complete",
      description: `Processed ${result.totalProcessed} titles: ${result.verified} verified, ${result.rejected} rejected.`,
      variant: "default",
    });
  };

  const resetVerification = () => {
    setVerificationResult(null);
  };

  const resetBatch = () => {
    setBatchResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/70">
      <div className="container px-4 py-12 mx-auto max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-primary/10 text-primary/90">
            Press Registrar General of India
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Title Verification System
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Verify new publication titles against existing registrations using advanced linguistic algorithms
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex space-x-1 rounded-lg bg-secondary p-1 mb-8">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'single' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'bg-transparent text-foreground/70 hover:text-foreground/90'
              }`}
            >
              Single Title Verification
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`flex-1 text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 ${
                activeTab === 'batch' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'bg-transparent text-foreground/70 hover:text-foreground/90'
              }`}
            >
              Batch Verification
            </button>
          </div>

          <div className="flex justify-center">
            {activeTab === 'single' && (
              <div className="w-full animate-fade-in">
                {verificationResult ? (
                  <VerificationResult 
                    result={verificationResult} 
                    onReset={resetVerification} 
                  />
                ) : (
                  <TitleForm onVerificationComplete={handleVerificationComplete} />
                )}
              </div>
            )}
            
            {activeTab === 'batch' && (
              <div className="w-full animate-fade-in">
                {batchResult ? (
                  <div className="glass-panel rounded-lg p-6 space-y-6 w-full max-w-2xl animate-scale-in">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-background">
                        <Info className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-xl font-semibold">Batch Verification Results</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background/40 rounded-md p-4 text-center">
                        <p className="text-sm text-foreground/70">Total Processed</p>
                        <p className="text-2xl font-medium">{batchResult.totalProcessed}</p>
                      </div>
                      <div className="bg-background/40 rounded-md p-4 text-center">
                        <p className="text-sm text-foreground/70">Verified</p>
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                          <p className="text-2xl font-medium">{batchResult.verified}</p>
                        </div>
                      </div>
                      <div className="bg-background/40 rounded-md p-4 text-center">
                        <p className="text-sm text-foreground/70">Rejected</p>
                        <div className="flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-red-500 mr-1" />
                          <p className="text-2xl font-medium">{batchResult.rejected}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground/70">
                        Results Summary
                      </label>
                      <div className="bg-background/40 rounded-md p-3 max-h-48 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/40">
                              <th className="text-left py-2 px-2">Title</th>
                              <th className="text-center py-2 px-2">Status</th>
                              <th className="text-right py-2 px-2">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {batchResult.results.map((item, index) => (
                              <tr key={index} className="border-b border-border/20 last:border-0">
                                <td className="py-2 px-2 truncate max-w-[200px]">{item.title}</td>
                                <td className="py-2 px-2 text-center">
                                  {item.result.isVerified ? (
                                    <CheckCircle className="w-4 h-4 text-green-500 inline" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500 inline" />
                                  )}
                                </td>
                                <td className="py-2 px-2 text-right">
                                  <span className={
                                    item.result.verificationScore >= 70 
                                      ? 'text-green-500' 
                                      : item.result.verificationScore >= 50 
                                        ? 'text-amber-500' 
                                        : 'text-red-500'
                                  }>
                                    {item.result.verificationScore}/100
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-foreground/60">
                      <span>Processing time: {(batchResult.processingTime / 1000).toFixed(2)}s</span>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        onClick={resetBatch}
                        className="w-full rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2.5 px-6 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 focus:ring-offset-background"
                      >
                        Process Another Batch
                      </button>
                    </div>
                  </div>
                ) : (
                  <FileUpload onBatchComplete={handleBatchComplete} />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-lg p-5 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-4 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">Phonetic Similarity</h3>
              <p className="text-sm text-foreground/70">
                Detects titles that sound similar when spoken, using Soundex and Metaphone algorithms for linguistic analysis.
              </p>
            </div>
            
            <div className="glass-panel rounded-lg p-5 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-4 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">Prefix/Suffix Matching</h3>
              <p className="text-sm text-foreground/70">
                Identifies titles with identical prefix or suffix patterns that could cause confusion among readers.
              </p>
            </div>
            
            <div className="glass-panel rounded-lg p-5 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="p-2 w-10 h-10 rounded-full bg-primary/10 text-primary mb-4 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium mb-2">Content Guidelines</h3>
              <p className="text-sm text-foreground/70">
                Ensures titles comply with the Press Registration Act by screening for disallowed words and prohibited combinations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
