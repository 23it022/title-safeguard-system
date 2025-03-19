
import React, { useState } from 'react';
import { verifyTitle } from '@/utils/verificationAlgorithms';
import { Language, VerificationRequest, VerificationResult } from '@/types';

interface TitleFormProps {
  onVerificationComplete: (result: VerificationResult) => void;
}

const TitleForm: React.FC<TitleFormProps> = ({ onVerificationComplete }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsVerifying(true);
    
    // Add a small delay to simulate processing and show animation
    setTimeout(() => {
      const result = verifyTitle({
        title: title.trim(),
        category: 'Newspaper', // Default category since we removed the selection
        language
      });
      
      onVerificationComplete(result);
      setIsVerifying(false);
    }, 800);
  };
  
  const languages: Language[] = [
    'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'
  ];
  
  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground/80 mb-1">
              Publication Title
            </label>
            <div className="title-input-container">
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-background/50 border border-input rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200"
                placeholder="Enter title to verify"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-foreground/80 mb-1">
              Primary Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full bg-background/50 border border-input rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-all duration-200"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full rounded-md bg-primary text-primary-foreground py-3 px-6 font-medium transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            <span>Verify Title</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TitleForm;
