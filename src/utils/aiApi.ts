const AZURE_OPENAI_API_KEY = import.meta.env.VITE_AZURE_OPENAI_API_KEY || "";
const AZURE_OPENAI_ENDPOINT = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || "";
const AZURE_OPENAI_DEPLOYMENT = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || "";
const AZURE_OPENAI_API_VERSION = import.meta.env.VITE_AZURE_OPENAI_API_VERSION || "";

/**
 * Fetches a response from Azure OpenAI.
 * This was previously fetchGeminiAnswer but has been migrated to Azure OpenAI.
 */
export async function fetchAIResponse(prompt: string): Promise<string> {
  if (!AZURE_OPENAI_API_KEY || !AZURE_OPENAI_ENDPOINT || !AZURE_OPENAI_DEPLOYMENT) {
    throw new Error("Azure OpenAI configuration is missing. Please check your .env file.");
  }

  // Construct the Azure OpenAI chat completion URL
  const url = `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": AZURE_OPENAI_API_KEY,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Azure OpenAI error: ${response.status} ${response.statusText}. ${errorData?.error?.message || ""}`
    );
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content;

  if (!answer) {
    throw new Error("No response received from Azure OpenAI.");
  }

  return answer;
}
