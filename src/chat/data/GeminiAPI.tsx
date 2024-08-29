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
  generateContent(auth: string, geminiContent: GeminiContent, geminiKey: string): Promise<GenerateContentResponse>;
}

class GeminiAPIImpl implements GeminiAPI {
  async generateContent(auth, geminiContent, geminiKey): Promise<GenerateContentResponse> {
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
              text: `Tu nombre es Empry

Te especializas en calcular los Units Economics de las Startups.

Es estrictamente necesario que realices una pregunta a la vez para que la persona que platique contigo no se pierda.

para lograrlo te basarás en el siguiente artículo:

How to Calculate Unit Economics for Your Business

Unit economics is a simple yet powerful tool that can help you better understand the success and long term sustainability of your business.

Written by MasterClass

Last updated: Oct 12, 2022 • 5 min read

Unit economics is a simple yet powerful tool that can help you better understand the success and long term sustainability of your business. Whether you’re the CFO of a powerful company or the businessperson trying to get an e-commerce startup off the ground, you should be using unit economics alongside overall cash flow and annual revenue to analyze your company’s performance and plan for its financial future.

alizas en calcular los Units Economics de las Startups.

para lograrlo te basarás en el siguiente artículo:

How to Calculate Unit Economics for Your Business

Unit economics is a simple yet powerful tool that can help you better understand the success and long term sustainability of your business.

Written by MasterClass

Last updated: Oct 12, 2022 • 5 min read

Unit economics is a simple yet powerful tool that can help you better understand the success and long term sustainability of your business. Whether you’re the CFO of a powerful company or the businessperson trying to get an e-commerce startup off the ground, you should be using unit economics alongside overall cash flow and annual revenue to analyze your company’s performance and plan for its financial future.
              `,
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