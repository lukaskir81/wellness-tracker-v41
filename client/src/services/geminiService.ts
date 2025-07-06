
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

export interface WellnessData {
  sleepHours: number;
  sleepQuality: number;
  energyLevel: number;
  mood: number;
  stress: number;
  lowerBodySoreness: number;
  upperBodySoreness: number;
  notes: string;
}

export interface RecoveryData {
  totalPoints: number;
  selectedItems: Record<string, boolean>;
  assessmentItems: any[];
}

const truncateToMaxLength = (text: string, maxLength: number = 1000): string => {
  if (text.length <= maxLength) return text;
  
  // Find the last complete sentence within the limit
  const truncated = text.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);
  
  if (lastSentenceEnd > maxLength * 0.8) {
    return text.substring(0, lastSentenceEnd + 1);
  }
  
  // If no good sentence break found, just truncate and add ellipsis
  return truncated.trim() + '...';
};

export const analyzeWellnessData = async (data: WellnessData): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  const prompt = `
    As a comprehensive wellness coach, provide a detailed analysis of the following wellness data with specific, actionable recommendations:
    
    Sleep Hours: ${data.sleepHours} hours
    Sleep Quality: ${data.sleepQuality}/10
    Energy Level: ${data.energyLevel}/10
    Mood: ${data.mood}/10
    Stress Level: ${data.stress}/10
    Lower Body Soreness: ${data.lowerBodySoreness}/10
    Upper Body Soreness: ${data.upperBodySoreness}/10
    Notes: "${data.notes}"
    
    Please provide:
    1. A detailed assessment of current wellness state
    2. Specific recommendations for each area that needs improvement
    3. Practical strategies and techniques to implement
    4. Connections between different wellness metrics
    5. Encouraging motivation and next steps
    
    Keep the tone supportive, professional, and encouraging. Provide comprehensive guidance up to 1000 characters.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    const rawText = result.candidates[0].content.parts[0].text;
    return truncateToMaxLength(rawText, 1000);
  } catch (error) {
    console.error('Error analyzing wellness data:', error);
    throw new Error('Failed to analyze wellness data. Please try again.');
  }
};

export const analyzeJournalEntries = async (currentEntry: string, historicalEntries: any[]): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  const historicalText = historicalEntries
    .map(entry => `${entry.date.toLocaleDateString()}: ${entry.content}`)
    .join('\n\n');

  const prompt = `
    As a wellness and recovery coach, analyze these journal entries to provide comprehensive, personalized insights:
    
    CURRENT ENTRY:
    "${currentEntry}"
    
    RECENT JOURNAL HISTORY:
    ${historicalText}
    
    Please provide:
    1. Analysis of current mental and physical state from today's entry
    2. Patterns and trends from historical entries
    3. Connections between current state and past experiences
    4. Specific, actionable recommendations for improvement
    5. Motivational insights and next steps
    
    Focus on holistic wellness including physical recovery, mental health, training optimization, and lifestyle factors. Keep tone supportive and encouraging. Limit to 1000 characters.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    const rawText = result.candidates[0].content.parts[0].text;
    return truncateToMaxLength(rawText, 1000);
  } catch (error) {
    console.error('Error analyzing journal entries:', error);
    throw new Error('Failed to analyze journal entries. Please try again.');
  }
};

export const analyzeRecoveryData = async (data: RecoveryData): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your environment variables.');
  }

  const selectedActivities = Object.keys(data.selectedItems)
    .filter(key => data.selectedItems[key])
    .map(key => {
      const [category, itemIndex] = key.split('-');
      const categoryData = data.assessmentItems.find(item => item.category === category);
      if (categoryData && categoryData.items[parseInt(itemIndex)]) {
        return `${category}: ${categoryData.items[parseInt(itemIndex)].text}`;
      }
      return key;
    });

  const prompt = `
    As a recovery specialist, analyze this recovery data and provide personalized recommendations in under 1000 characters:
    
    Total Recovery Score: ${data.totalPoints} points (Target: 105+ points)
    
    Selected Recovery Activities:
    ${selectedActivities.join('\n')}
    
    Provide concise:
    1. Overall assessment of recovery score
    2. Key recommendations for improvement  
    3. Most important recovery activities to focus on
    
    Keep encouraging and actionable. Limit response to 1000 characters maximum.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result = await response.json();
    const rawText = result.candidates[0].content.parts[0].text;
    return truncateToMaxLength(rawText, 1000);
  } catch (error) {
    console.error('Error analyzing recovery data:', error);
    throw new Error('Failed to analyze recovery data. Please try again.');
  }
};
