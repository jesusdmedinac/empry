export type GeminiContent = {
  system_instruction?: ContentItem;
  contents: ContentItem[];
}

export type ContentItem = {
  role: string ,
  parts: ContentPart[];
}

export type ContentPart = {
  text: string;
}

export type GenerateContentResponse = {
  candidates: Candidate[];
  usageMetadata: UsageMetadata;
  error: GeminiError;
};

export type Candidate = {
  content: Content;
  finishReason: string;
  index: number;
  safetyRatings: SafetyRating[];
}

export type Content = {
  parts: Part[];
  role: string;
}

export type Part = {
  text: string;
}

export type SafetyRating = {    
  category: string;
  probability: string;
}

export type UsageMetadata = {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}

export type GeminiError = {
  code: number;
  message: string;
  status: string;
}

export interface GeminiAPI {
  generateContent(geminiContent: GeminiContent): Promise<GenerateContentResponse>;
}

export class GeminiAPIImpl implements GeminiAPI {
  async generateContent(geminiContent: GeminiContent): Promise<GenerateContentResponse> {
    const workerUrl = import.meta.env.DEV 
    ? 'http://localhost:8787/'
    : 'https://empry.jesus-daniel-medina-cruz.workers.dev/'
    let response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...geminiContent,
      }),
    })
    return (await response.json()) as GenerateContentResponse;
  }
}