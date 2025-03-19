
export interface TitleData {
  id: string;
  name: string;
  category: string;
  language: string;
  registrationDate: string;
}

export interface VerificationResult {
  isVerified: boolean;
  similarityPercentage: number;
  verificationScore: number;
  phoneticallyMatched: boolean;
  prefixSuffixMatched: boolean;
  containsDisallowedWords: boolean;
  similarMeaningDetected: boolean;
  feedback: string;
  matchedTitles: Array<{
    title: TitleData;
    similarityScore: number;
    matchReason: string;
  }>;
  processingTime: number;
}

export interface VerificationRequest {
  title: string;
  language: string;
  category: string;
}

export type Language = 'English' | 'Hindi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Marathi' | 'Gujarati' | 'Kannada' | 'Malayalam' | 'Punjabi' | 'Urdu';

export type Category = 'Newspaper' | 'Magazine' | 'Journal' | 'Periodical' | 'Digital Media';

export interface BatchVerificationResult {
  totalProcessed: number;
  verified: number;
  rejected: number;
  results: Array<{
    title: string;
    result: VerificationResult;
  }>;
  processingTime: number;
}
