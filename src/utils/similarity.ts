
// Levenshtein distance calculation
export function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return track[str2.length][str1.length];
}

// Jaccard similarity calculation (based on word sets)
export function calculateJaccardSimilarity(str1: string, str2: string): number {
  const words1 = new Set(str1.toLowerCase().split(/\s+/).filter(Boolean));
  const words2 = new Set(str2.toLowerCase().split(/\s+/).filter(Boolean));
  
  if (words1.size === 0 && words2.size === 0) return 1;
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}

// Soundex algorithm implementation
export function generateSoundex(str: string): string {
  // Clean up the string - remove non-alphanumeric and convert to uppercase
  const word = str.toUpperCase().replace(/[^A-Z]/g, '');
  if (!word) return '';
  
  // Get the first letter
  const firstLetter = word[0];
  
  // Convert the rest of the word to Soundex codes
  const codes = word
    .slice(1)
    .split('')
    .map(char => {
      // Soundex coding rules
      if (/[BFPV]/.test(char)) return '1';
      if (/[CGJKQSXZ]/.test(char)) return '2';
      if (/[DT]/.test(char)) return '3';
      if (char === 'L') return '4';
      if (/[MN]/.test(char)) return '5';
      if (char === 'R') return '6';
      return '';
    })
    .join('');
  
  // Remove consecutive duplicate codes
  let deduped = '';
  for (let i = 0; i < codes.length; i++) {
    if (i === 0 || codes[i] !== codes[i - 1]) {
      deduped += codes[i];
    }
  }
  
  // Remove zeros and pad/truncate to 3 characters
  const processed = deduped.replace(/0/g, '').padEnd(3, '0').slice(0, 3);
  
  return firstLetter + processed;
}

// Simple Metaphone algorithm implementation
export function generateMetaphone(word: string): string {
  if (!word) return '';
  
  // Convert to lowercase and remove non-alphabetic characters
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return '';
  
  // Simple substitution rules
  let result = word
    .replace(/ph/g, 'f')
    .replace(/[aeiou]/g, '') // Remove vowels
    .replace(/b/g, 'p')
    .replace(/c/g, 'k')
    .replace(/d/g, 't')
    .replace(/g/g, 'k')
    .replace(/j/g, 'k')
    .replace(/s/g, 'z')
    .replace(/t/g, 't')
    .replace(/v/g, 'f')
    .replace(/w/g, 'v')
    .replace(/x/g, 'z')
    .replace(/y/g, '')
    .replace(/z/g, 'z');
  
  // Remove consecutive duplicates
  let deduped = '';
  for (let i = 0; i < result.length; i++) {
    if (i === 0 || result[i] !== result[i - 1]) {
      deduped += result[i];
    }
  }
  
  return deduped;
}

// Function to parse CSV data for batch processing
export function parseCSV(csvData: string): Array<{title: string, category: string, language: string}> {
  const lines = csvData.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  
  // If there's a header row, skip it
  const startIndex = lines[0].toLowerCase().includes('title') ? 1 : 0;
  
  const results = [];
  for (let i = startIndex; i < lines.length; i++) {
    const columns = lines[i].split(',').map(col => col.trim());
    if (columns.length >= 3) {
      results.push({
        title: columns[0],
        category: columns[1],
        language: columns[2]
      });
    }
  }
  
  return results;
}
