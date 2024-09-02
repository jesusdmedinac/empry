type GeminiContent = {
  system_instruction?: ContentItem;
  contents: ContentItem[];
}

type ContentItem = {
  role: string ,
  parts: ContentPart[];
}

type ContentPart = {
  text: string;
}

type GenerateContentResponse = {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  error: GeminiError;
};

type Candidate = {
  content: Content;
  finishReason: string;
  index: number;
  safetyRatings: SafetyRating[];
}

type Content = {
  parts: Part[];
  role: string;
}

type Part = {
  text: string;
}

type SafetyRating = {    
  category: string;
  probability: string;
}

type UsageMetadata = {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

type GeminiError = {
  code: number;
  message: string;
  status: string;
}

interface GeminiAPI {
  generateContent(systemInstructions: string, auth: string, geminiContent: GeminiContent, geminiKey: string): Promise<GenerateContentResponse>;
}

class GeminiAPIImpl implements GeminiAPI {
  async generateContent(systemInstructions: string, auth: string, geminiContent: GeminiContent, geminiKey: string): Promise<GenerateContentResponse> {
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          role: 'system',
          parts: [
            {
              text: systemInstructions,
            }
          ]
        },
        ...geminiContent,
      }),
    })
    return (await response.json()) as GenerateContentResponse;
  }
}

const GeminiAPI = new GeminiAPIImpl();

export default GeminiAPI;