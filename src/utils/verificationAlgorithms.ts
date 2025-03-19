
import { existingTitles, disallowedWords, titlesByCategory, titlesByLanguage } from '@/data/existingTitles';
import { TitleData, VerificationResult, VerificationRequest } from '@/types';
import { levenshteinDistance, calculateJaccardSimilarity, generateSoundex, generateMetaphone } from './similarity';

// Function to check if a title contains disallowed words
export function containsDisallowedWords(title: string): boolean {
  const lowerTitle = title.toLowerCase();
  return disallowedWords.some(word => lowerTitle.includes(word.toLowerCase()));
}

// Function to check prefix/suffix matches
export function checkPrefixSuffix(newTitle: string, existingTitle: string): boolean {
  const newWords = newTitle.toLowerCase().split(/\s+/);
  const existingWords = existingTitle.toLowerCase().split(/\s+/);
  
  // Check for common prefixes (first word)
  if (newWords[0] === existingWords[0] && newWords.length > 1 && existingWords.length > 1) {
    return true;
  }
  
  // Check for common suffixes (last word)
  if (newWords[newWords.length - 1] === existingWords[existingWords.length - 1] && 
      newWords.length > 1 && existingWords.length > 1) {
    return true;
  }
  
  return false;
}

// Function to check for phonetic similarity
export function checkPhoneticSimilarity(newTitle: string, existingTitle: string): boolean {
  const newTitleSoundex = generateSoundex(newTitle);
  const existingTitleSoundex = generateSoundex(existingTitle);
  
  const newTitleMetaphone = generateMetaphone(newTitle);
  const existingTitleMetaphone = generateMetaphone(existingTitle);
  
  // Check if either Soundex or Metaphone match
  return (
    newTitleSoundex === existingTitleSoundex ||
    newTitleMetaphone === existingTitleMetaphone
  );
}

// Main verification function
export function verifyTitle(request: VerificationRequest): VerificationResult {
  const startTime = performance.now();
  const { title, category, language } = request;
  
  // Filter titles by category and language for more efficient search
  const relevantTitles = titlesByCategory[category]?.filter(t => 
    t.language === language || t.language === 'English'
  ) || [];
  
  // Initialize result object
  const result: VerificationResult = {
    isVerified: true,
    similarityPercentage: 0,
    verificationScore: 100,
    phoneticallyMatched: false,
    prefixSuffixMatched: false,
    containsDisallowedWords: false,
    similarMeaningDetected: false,
    feedback: '',
    matchedTitles: [],
    processingTime: 0
  };
  
  // Check for disallowed words
  if (containsDisallowedWords(title)) {
    result.isVerified = false;
    result.containsDisallowedWords = true;
    result.verificationScore -= 50;
    result.feedback = 'Title contains disallowed words or phrases.';
  }
  
  // Check for similarity with existing titles
  const similarities: Array<{title: TitleData, similarityScore: number, matchReason: string}> = [];
  
  for (const existingTitle of relevantTitles) {
    // Calculate Levenshtein distance (normalized by the length of the longer string)
    const levenDistance = levenshteinDistance(title.toLowerCase(), existingTitle.name.toLowerCase());
    const maxLength = Math.max(title.length, existingTitle.name.length);
    const levenSimilarity = (1 - levenDistance / maxLength) * 100;
    
    // Calculate Jaccard similarity (word-based)
    const jaccardSimilarity = calculateJaccardSimilarity(title, existingTitle.name) * 100;
    
    // Check for phonetic similarity
    const isPhoneticMatch = checkPhoneticSimilarity(title, existingTitle.name);
    
    // Check for common prefix/suffix
    const hasPrefixSuffix = checkPrefixSuffix(title, existingTitle.name);
    
    // Calculate combined similarity score (weighted average)
    const combinedSimilarity = (
      levenSimilarity * 0.4 + 
      jaccardSimilarity * 0.3 + 
      (isPhoneticMatch ? 20 : 0) + 
      (hasPrefixSuffix ? 10 : 0)
    );
    
    // If above threshold, add to matched titles
    if (combinedSimilarity > 30) {
      let matchReason = '';
      
      if (isPhoneticMatch) {
        matchReason += 'Phonetically similar. ';
        result.phoneticallyMatched = true;
      }
      
      if (hasPrefixSuffix) {
        matchReason += 'Similar prefix/suffix. ';
        result.prefixSuffixMatched = true;
      }
      
      if (levenSimilarity > 70) {
        matchReason += 'Textually similar. ';
      }
      
      if (jaccardSimilarity > 50) {
        matchReason += 'Contains similar words. ';
      }
      
      similarities.push({
        title: existingTitle,
        similarityScore: combinedSimilarity,
        matchReason: matchReason.trim()
      });
    }
  }
  
  // Sort matched titles by similarity score
  similarities.sort((a, b) => b.similarityScore - a.similarityScore);
  
  // Take top matches for feedback
  result.matchedTitles = similarities.slice(0, 5);
  
  // Calculate highest similarity percentage
  const highestSimilarity = similarities.length > 0 ? similarities[0].similarityScore : 0;
  result.similarityPercentage = Math.round(highestSimilarity);
  
  // Decide verification based on highest similarity
  if (highestSimilarity > 70) {
    result.isVerified = false;
    result.verificationScore = Math.max(0, 100 - highestSimilarity);
    result.feedback = 'Title is too similar to existing registered titles.';
  } else if (highestSimilarity > 50) {
    result.verificationScore = Math.max(30, 100 - highestSimilarity);
    result.feedback = 'Title has moderate similarity to existing titles but might be acceptable with modifications.';
  } else {
    result.feedback = 'Title passes verification checks.';
  }
  
  // Calculate total processing time
  const endTime = performance.now();
  result.processingTime = endTime - startTime;
  
  return result;
}

// Function for batch verification from file
export function batchVerifyTitles(titles: Array<{title: string, category: string, language: string}>): any {
  const startTime = performance.now();
  
  const results = titles.map(item => {
    const result = verifyTitle({
      title: item.title,
      category: item.category,
      language: item.language
    });
    
    return {
      title: item.title,
      result
    };
  });
  
  const verifiedCount = results.filter(r => r.result.isVerified).length;
  
  const endTime = performance.now();
  
  return {
    totalProcessed: titles.length,
    verified: verifiedCount,
    rejected: titles.length - verifiedCount,
    results,
    processingTime: endTime - startTime
  };
}
