
import { TitleData } from '@/types';

// Mock database of 100 existing titles
export const existingTitles: TitleData[] = [
  {
    id: '1',
    name: 'The Times of India',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1950-01-15'
  },
  {
    id: '2',
    name: 'Hindustan Times',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1953-04-20'
  },
  {
    id: '3',
    name: 'The Hindu',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1949-09-12'
  },
  {
    id: '4',
    name: 'Dainik Bhaskar',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1958-06-05'
  },
  {
    id: '5',
    name: 'Dainik Jagran',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1960-11-30'
  },
  {
    id: '6',
    name: 'India Today',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1975-03-15'
  },
  {
    id: '7',
    name: 'Outlook',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1995-10-22'
  },
  {
    id: '8',
    name: 'Frontline',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1984-12-09'
  },
  {
    id: '9',
    name: 'Economic Times',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1961-03-05'
  },
  {
    id: '10',
    name: 'Business Standard',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1975-01-11'
  },
  {
    id: '11',
    name: 'Anandabazar Patrika',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '1952-07-18'
  },
  {
    id: '12',
    name: 'Malayala Manorama',
    category: 'Newspaper',
    language: 'Malayalam',
    registrationDate: '1954-09-02'
  },
  {
    id: '13',
    name: 'Mathrubhumi',
    category: 'Newspaper',
    language: 'Malayalam',
    registrationDate: '1953-04-14'
  },
  {
    id: '14',
    name: 'The Telegraph',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1982-07-07'
  },
  {
    id: '15',
    name: 'Deccan Herald',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1965-06-17'
  },
  {
    id: '16',
    name: 'National Geographic India',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1997-11-03'
  },
  {
    id: '17',
    name: 'Femina',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1969-02-21'
  },
  {
    id: '18',
    name: 'Filmfare',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1963-05-12'
  },
  {
    id: '19',
    name: 'Sarita',
    category: 'Magazine',
    language: 'Hindi',
    registrationDate: '1972-08-30'
  },
  {
    id: '20',
    name: 'Grihshobha',
    category: 'Magazine',
    language: 'Hindi',
    registrationDate: '1979-01-25'
  },
  {
    id: '21',
    name: 'Sportstar',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1987-03-19'
  },
  {
    id: '22',
    name: 'Cricket Today',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1993-09-14'
  },
  {
    id: '23',
    name: 'Navbharat Times',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1957-07-09'
  },
  {
    id: '24',
    name: 'Amar Ujala',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1959-11-23'
  },
  {
    id: '25',
    name: 'Dinakaran',
    category: 'Newspaper',
    language: 'Tamil',
    registrationDate: '1977-08-08'
  },
  // Continue with more titles to reach 100
  {
    id: '26',
    name: 'Eenadu',
    category: 'Newspaper',
    language: 'Telugu',
    registrationDate: '1974-08-10'
  },
  {
    id: '27',
    name: 'Sakshi',
    category: 'Newspaper',
    language: 'Telugu',
    registrationDate: '2008-03-23'
  },
  {
    id: '28',
    name: 'Gujarat Samachar',
    category: 'Newspaper',
    language: 'Gujarati',
    registrationDate: '1956-10-05'
  },
  {
    id: '29',
    name: 'Sandesh',
    category: 'Newspaper',
    language: 'Gujarati',
    registrationDate: '1958-04-19'
  },
  {
    id: '30',
    name: 'Punjab Kesari',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1965-03-17'
  },
  // Adding similar titles to test similarity algorithms
  {
    id: '31',
    name: 'The Times',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1969-05-23'
  },
  {
    id: '32',
    name: 'India 2Day',
    category: 'Magazine',
    language: 'English',
    registrationDate: '1998-08-14'
  },
  {
    id: '33',
    name: 'Hindustan Taimes',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '2002-11-30'
  },
  {
    id: '34',
    name: 'Danik Bhasker',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '2005-02-19'
  },
  {
    id: '35',
    name: 'Indian Express',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1952-06-01'
  },
  {
    id: '36',
    name: 'Express India',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2010-09-12'
  },
  {
    id: '37',
    name: 'Financial Express',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1983-04-27'
  },
  {
    id: '38',
    name: 'Business Line',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1991-02-15'
  },
  {
    id: '39',
    name: 'Mint',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '2007-02-01'
  },
  {
    id: '40',
    name: 'Daily News & Analysis',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '2005-07-30'
  },
  {
    id: '41',
    name: 'DNA News',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2012-04-18'
  },
  {
    id: '42',
    name: 'Mumbai Mirror',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '2005-05-25'
  },
  {
    id: '43',
    name: 'Pune Mirror',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '2008-09-03'
  },
  {
    id: '44',
    name: 'Vijay Karnataka',
    category: 'Newspaper',
    language: 'Kannada',
    registrationDate: '1999-06-14'
  },
  {
    id: '45',
    name: 'Prajavani',
    category: 'Newspaper',
    language: 'Kannada',
    registrationDate: '1976-11-19'
  },
  {
    id: '46',
    name: 'Maharashtra Times',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '1984-05-03'
  },
  {
    id: '47',
    name: 'Lokmat',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '1971-08-27'
  },
  {
    id: '48',
    name: 'The Pioneer',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1948-01-19'
  },
  {
    id: '49',
    name: 'The Tribune',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1950-03-02'
  },
  {
    id: '50',
    name: 'Afternoon Dispatch & Courier',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1979-10-23'
  },
  // Additional titles with potential phonetic similarities
  {
    id: '51',
    name: 'Daily Thanthi',
    category: 'Newspaper',
    language: 'Tamil',
    registrationDate: '1963-09-14'
  },
  {
    id: '52',
    name: 'Daily Thanthy',
    category: 'Newspaper',
    language: 'Tamil',
    registrationDate: '2011-03-21'
  },
  {
    id: '53',
    name: 'Hindu Business Line',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1994-01-07'
  },
  {
    id: '54',
    name: 'The Statesman',
    category: 'Newspaper',
    language: 'English',
    registrationDate: '1947-11-30'
  },
  {
    id: '55',
    name: 'Tehelka',
    category: 'Magazine',
    language: 'English',
    registrationDate: '2001-06-12'
  },
  {
    id: '56',
    name: 'Open Magazine',
    category: 'Magazine',
    language: 'English',
    registrationDate: '2009-04-02'
  },
  {
    id: '57',
    name: 'Caravan',
    category: 'Magazine',
    language: 'English',
    registrationDate: '2010-01-15'
  },
  {
    id: '58',
    name: 'Tarun Bharat',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '1965-08-24'
  },
  {
    id: '59',
    name: 'Saamana',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '1989-01-23'
  },
  {
    id: '60',
    name: 'Dinamalar',
    category: 'Newspaper',
    language: 'Tamil',
    registrationDate: '1968-09-06'
  },
  {
    id: '61',
    name: 'Dinamani',
    category: 'Newspaper',
    language: 'Tamil',
    registrationDate: '1957-02-11'
  },
  {
    id: '62',
    name: 'Inquilab',
    category: 'Newspaper',
    language: 'Urdu',
    registrationDate: '1954-07-19'
  },
  {
    id: '63',
    name: 'Roznama Rashtriya Sahara',
    category: 'Newspaper',
    language: 'Urdu',
    registrationDate: '1993-11-07'
  },
  {
    id: '64',
    name: 'Siasat',
    category: 'Newspaper',
    language: 'Urdu',
    registrationDate: '1961-12-06'
  },
  {
    id: '65',
    name: 'Munsif',
    category: 'Newspaper',
    language: 'Urdu',
    registrationDate: '1981-05-23'
  },
  {
    id: '66',
    name: 'Ajkal',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '1973-03-09'
  },
  {
    id: '67',
    name: 'Ganashakti',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '1984-10-11'
  },
  {
    id: '68',
    name: 'Bartaman',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '1990-08-15'
  },
  {
    id: '69',
    name: 'Pratidin',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '2002-01-27'
  },
  {
    id: '70',
    name: 'Sangbad Pratidin',
    category: 'Newspaper',
    language: 'Bengali',
    registrationDate: '1995-12-03'
  },
  {
    id: '71',
    name: 'Nai Duniya',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1968-01-29'
  },
  {
    id: '72',
    name: 'Rajasthan Patrika',
    category: 'Newspaper',
    language: 'Hindi',
    registrationDate: '1956-03-07'
  },
  {
    id: '73',
    name: 'Divya Bhaskar',
    category: 'Newspaper',
    language: 'Gujarati',
    registrationDate: '2003-06-05'
  },
  {
    id: '74',
    name: 'Sakal',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '1957-05-19'
  },
  {
    id: '75',
    name: 'Divya Marathi',
    category: 'Newspaper',
    language: 'Marathi',
    registrationDate: '2011-07-29'
  },
  // Digital media entries
  {
    id: '76',
    name: 'The Wire',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2015-05-11'
  },
  {
    id: '77',
    name: 'Scroll.in',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2014-01-24'
  },
  {
    id: '78',
    name: 'The Print',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2017-08-09'
  },
  {
    id: '79',
    name: 'News18',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2007-12-15'
  },
  {
    id: '80',
    name: 'The Quint',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2015-03-16'
  },
  {
    id: '81',
    name: 'Firstpost',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2011-05-09'
  },
  {
    id: '82',
    name: 'The News Minute',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2014-06-03'
  },
  {
    id: '83',
    name: 'OpIndia',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2014-12-25'
  },
  {
    id: '84',
    name: 'NewsLaundry',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2012-09-18'
  },
  {
    id: '85',
    name: 'The Better India',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2013-04-11'
  },
  {
    id: '86',
    name: 'Youth Ki Awaaz',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2011-03-14'
  },
  {
    id: '87',
    name: 'ScoopWhoop',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2013-11-02'
  },
  {
    id: '88',
    name: 'The Logical Indian',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2014-06-18'
  },
  {
    id: '89',
    name: 'LiveLaw',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2011-10-26'
  },
  {
    id: '90',
    name: 'Bar and Bench',
    category: 'Digital Media',
    language: 'English',
    registrationDate: '2010-08-21'
  },
  // Journals
  {
    id: '91',
    name: 'Economic and Political Weekly',
    category: 'Journal',
    language: 'English',
    registrationDate: '1966-01-15'
  },
  {
    id: '92',
    name: 'Indian Journal of Medical Research',
    category: 'Journal',
    language: 'English',
    registrationDate: '1952-07-07'
  },
  {
    id: '93',
    name: 'Journal of Indian Law Institute',
    category: 'Journal',
    language: 'English',
    registrationDate: '1959-04-30'
  },
  {
    id: '94',
    name: 'Indian Historical Review',
    category: 'Journal',
    language: 'English',
    registrationDate: '1974-09-12'
  },
  {
    id: '95',
    name: 'South Asian Survey',
    category: 'Journal',
    language: 'English',
    registrationDate: '1985-03-26'
  },
  {
    id: '96',
    name: 'Seminar',
    category: 'Journal',
    language: 'English',
    registrationDate: '1959-10-11'
  },
  {
    id: '97',
    name: 'Indian Journal of Gender Studies',
    category: 'Journal',
    language: 'English',
    registrationDate: '1994-02-28'
  },
  {
    id: '98',
    name: 'Social Scientist',
    category: 'Journal',
    language: 'English',
    registrationDate: '1972-08-05'
  },
  {
    id: '99',
    name: 'Contemporary Education Dialogue',
    category: 'Journal',
    language: 'English',
    registrationDate: '2003-11-17'
  },
  {
    id: '100',
    name: 'Studies in History',
    category: 'Journal',
    language: 'English',
    registrationDate: '1985-07-22'
  }
];

// Create indexed versions for efficient search
export const titlesByName = existingTitles.reduce<Record<string, TitleData[]>>((acc, title) => {
  const firstLetter = title.name.charAt(0).toLowerCase();
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(title);
  return acc;
}, {});

export const titlesByCategory = existingTitles.reduce<Record<string, TitleData[]>>((acc, title) => {
  if (!acc[title.category]) {
    acc[title.category] = [];
  }
  acc[title.category].push(title);
  return acc;
}, {});

export const titlesByLanguage = existingTitles.reduce<Record<string, TitleData[]>>((acc, title) => {
  if (!acc[title.language]) {
    acc[title.language] = [];
  }
  acc[title.language].push(title);
  return acc;
}, {});

// List of disallowed words or phrases
export const disallowedWords = [
  'obscene',
  'vulgar',
  'offensive',
  'seditious',
  'defamatory',
  'pornographic',
  'sexually explicit',
  'hate speech',
  'promotes violence',
  'anti-national',
  'illegal',
  'terrorist',
  'extremist',
  'jihad',
  'racial slur',
  'discrimination'
];
