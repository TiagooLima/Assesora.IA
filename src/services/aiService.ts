interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

export interface insightData {
  feasibility: {
    status: "viable" | "needs_adjustment" | "unfeasible",
    content: string
  },
  diagnosis: {
    content: string
  },
  suggestions: {
    items: string[]
  },
  extraIncome: {
    items: string[]
  },
  investment: {
    items: string[]
  },
  motivation: {
    content: string
  },
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`

const callGemini = async(prompt: string) => {
  const response = await fetch(geminiUrl, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({
      contents: [{parts: [{ text: prompt }]}]
    })
  })

  if (!response.ok){
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGemini(prompt)
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as insightData
}

export const getChatResponse = async (prompt: string) => {
  const response = await callGemini(prompt)
  return response.candidates[0].content.parts[0].text.trim()
}
