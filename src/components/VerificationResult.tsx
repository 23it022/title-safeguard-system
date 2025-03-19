
import React from 'react';
import { VerificationResult as VerificationResultType } from '@/types';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface VerificationResultProps {
  result: VerificationResultType | null;
  onReset: () => void;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ result, onReset }) => {
  if (!result) return null;

  const { 
    isVerified, 
    similarityPercentage, 
    verificationScore, 
    feedback, 
    matchedTitles, 
    processingTime 
  } = result;

  // Determine result status for styling
  const getStatusColor = () => {
    if (isVerified) {
      if (verificationScore >= 90) return 'text-green-500';
      if (verificationScore >= 70) return 'text-amber-500';
      return 'text-blue-500';
    }
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (isVerified) {
      if (verificationScore >= 90) return <CheckCircle className="w-12 h-12 text-green-500" />;
      if (verificationScore >= 70) return <AlertTriangle className="w-12 h-12 text-amber-500" />;
      return <Info className="w-12 h-12 text-blue-500" />;
    }
    return <XCircle className="w-12 h-12 text-red-500" />;
  };

  const processingTimeFormatted = processingTime.toFixed(2);

  return (
    <div className="w-full max-w-2xl animate-scale-in">
      <div className="glass-panel rounded-lg p-6 space-y-6">
        {/* Header with status and similarity percentage */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start space-y-1">
            {getStatusIcon()}
            <h2 className={`text-xl font-semibold ${getStatusColor()}`}>
              {isVerified ? 'Title Verification Passed' : 'Title Verification Failed'}
            </h2>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-foreground/70 mb-1">Similarity to Existing Titles</p>
            <div className="flex items-center justify-center md:justify-end gap-2">
              <span className={`text-3xl font-bold ${
                similarityPercentage > 70 ? 'text-red-500' : 
                similarityPercentage > 50 ? 'text-amber-500' : 
                'text-green-500'
              }`}>{similarityPercentage}%</span>
              <span className="bg-foreground/10 px-2 py-1 rounded text-xs">
                {similarityPercentage > 70 ? 'High' : similarityPercentage > 50 ? 'Moderate' : 'Low'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/70">
              Similarity Percentage
            </label>
            <div className="bg-background/40 rounded-md p-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium">{similarityPercentage}%</span>
                <span className={`text-sm ${similarityPercentage > 70 ? 'text-red-500' : similarityPercentage > 50 ? 'text-amber-500' : 'text-green-500'}`}>
                  {similarityPercentage > 70 ? 'High' : similarityPercentage > 50 ? 'Moderate' : 'Low'}
                </span>
              </div>
              <div className="mt-2 bg-foreground/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    similarityPercentage > 70 ? 'bg-red-500' : 
                    similarityPercentage > 50 ? 'bg-amber-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${similarityPercentage}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/70">
              Verification Score
            </label>
            <div className="bg-background/40 rounded-md p-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-medium">{verificationScore}/100</span>
                <span className={`text-sm ${verificationScore < 50 ? 'text-red-500' : verificationScore < 70 ? 'text-amber-500' : 'text-green-500'}`}>
                  {verificationScore < 50 ? 'Low' : verificationScore < 70 ? 'Moderate' : 'High'}
                </span>
              </div>
              <div className="mt-2 bg-foreground/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    verificationScore < 50 ? 'bg-red-500' : 
                    verificationScore < 70 ? 'bg-amber-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${verificationScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/70">
            Feedback
          </label>
          <div className="bg-background/40 rounded-md p-3">
            <p className="text-foreground/90">{feedback}</p>
          </div>
        </div>
        
        {matchedTitles.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/70">
              Similar Existing Titles
            </label>
            <div className="bg-background/40 rounded-md p-3 max-h-48 overflow-y-auto">
              <ul className="space-y-3">
                {matchedTitles.map((match, index) => (
                  <li key={index} className="border-b border-border/40 last:border-0 pb-2 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium">{match.title.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${
                          match.similarityScore > 70 ? 'text-red-500' : 
                          match.similarityScore > 50 ? 'text-amber-500' : 
                          'text-green-500'
                        }`}>{match.similarityScore.toFixed(1)}%</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-foreground/10">similar</span>
                      </div>
                    </div>
                    <div className="text-sm text-foreground/70 mt-1">
                      <span>{match.title.category} • {match.title.language}</span>
                    </div>
                    <div className="text-xs text-foreground/60 mt-1">
                      <span>{match.matchReason}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="flex justify-between text-xs text-foreground/60">
          <span>Processing time: {processingTimeFormatted}ms</span>
        </div>
        
        <div className="pt-2">
          <button
            onClick={onReset}
            className="w-full rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2.5 px-6 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 focus:ring-offset-background"
          >
            Verify Another Title
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationResult;
