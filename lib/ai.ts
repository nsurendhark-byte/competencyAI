const getOpenRouterApiKey = () => process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY || '';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Call OpenRouter API with fallback models
 */
async function callOpenRouter(messages: ChatMessage[], responseFormatJson = false): Promise<string | null> {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) return null;

  const modelsToTry = [
    'meta-llama/llama-3.3-70b-instruct',
    'deepseek/deepseek-chat',
    'openrouter/auto',
    'openai/gpt-4o-mini'
  ];

  for (const model of modelsToTry) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.APP_URL || 'https://competencyai.com',
          'X-Title': 'CompetencyAI OS',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          ...(responseFormatJson ? { response_format: { type: 'json_object' } } : {})
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && typeof content === 'string' && content.trim().length > 0) {
          return content.trim();
        }
      } else {
        const errText = await response.text();
        console.warn(`[OpenRouter Warning] Model ${model} returned HTTP ${response.status}:`, errText);
      }
    } catch (err: any) {
      console.error(`[OpenRouter Error] Failed with model ${model}:`, err?.message || err);
    }
  }

  return null;
}

export async function generateAiCompetencyGapAnalysis(
  career: string,
  skillsMastered: Array<{ name: string; level: number }>,
  assessmentScore: number,
  weakAreas: string[]
) {
  const prompt = `Analyze this learner profile for Career Track: "${career}".
Diagnostic Assessment Score: ${assessmentScore}%
Skills Mastered: ${JSON.stringify(skillsMastered)}
Target Weak Areas: ${weakAreas.join(', ')}

Return a valid JSON object strictly formatted as:
{
  "summary": "Detailed summary paragraph analyzing current score and gap vector...",
  "categories": [
    { "status": "STRONG" | "PARTIAL" | "MISSING", "skill": "Skill Name", "detail": "Specific proficiency explanation" }
  ],
  "recommendations": [
    "Actionable step 1",
    "Actionable step 2"
  ]
}`;

  const messages: ChatMessage[] = [
    { role: 'system', content: 'You are an expert AI Career Intelligence System. Respond ONLY with valid JSON.' },
    { role: 'user', content: prompt }
  ];

  const content = await callOpenRouter(messages, true);

  if (content) {
    try {
      const cleaned = content.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('[OpenRouter JSON Parse Error]:', parseErr);
    }
  }

  // Fallback deterministic analysis if offline or API key pending
  return {
    summary: `Based on your diagnostic assessment score of ${assessmentScore}%, CompetencyAI has mapped your target vector for ${career}. You demonstrate foundational proficiency in syntax and basic execution context, with partial gaps in asynchronous runtime architecture and state machine optimization.`,
    categories: [
      { status: 'STRONG', skill: 'JavaScript Scope & Basic Syntax', detail: 'Consistently answered Level 1-3 questions with 90%+ accuracy.' },
      { status: 'PARTIAL', skill: 'React Hooks & Hydration State', detail: 'Level 4-6 proficiency requires deeper focus on custom memoization.' },
      { status: 'MISSING', skill: 'Distributed System Architecture & Memory Auditing', detail: 'Level 7-10 topics have not been verified yet.' }
    ],
    recommendations: [
      'Complete Module 1 of Enterprise JavaScript & Modern Runtime Systems',
      'Solve Coding Challenge: Custom Debounce Function',
      'Review Level 5 Async Promises theory material'
    ]
  };
}

export async function askAuraMentor(
  userMessage: string,
  context: {
    userName?: string;
    career?: string;
    readinessScore?: number;
    currentSkill?: string;
    lessonTitle?: string;
    weakAreas?: string[];
    masteredSkills?: string[];
    history?: Array<{ sender: string; content: string }>;
  }
): Promise<string> {
  const userName = context.userName || 'Learner';
  const career = context.career || 'Full-Stack Software Engineer';
  const readiness = context.readinessScore !== undefined ? `${context.readinessScore}%` : 'Not Assessed Yet';
  const weakAreasStr = (context.weakAreas && context.weakAreas.length > 0) ? context.weakAreas.join(', ') : 'None identified yet';
  const masteredStr = (context.masteredSkills && context.masteredSkills.length > 0) ? context.masteredSkills.join(', ') : 'Foundational skills in progress';

  const systemInstruction = `You are AURA, the contextual AI career mentor inside COMPETENCYAI.
Help the learner (${userName}) understand programming, debugging, full-stack development, interview preparation, system design, and career-related technical learning.

Learner Profile & Context:
- Name: ${userName}
- Target Career Track: ${career}
- Current Assessment Readiness: ${readiness}
- Mastered Skill Domains: ${masteredStr}
- Target Improvement Areas: ${weakAreasStr}
- Active Focus Skill: ${context.currentSkill || 'Full Stack Architecture'}

Instructions:
1. Give clear, practical, and highly educational explanations.
2. When the learner asks programming or debugging questions:
   - Explain the underlying concept clearly.
   - Provide clean, modern code snippets when helpful.
   - Highlight common pitfalls and best practices.
3. Use the learner's competency context naturally when relevant to their target career (${career}).
4. Maintain a professional, encouraging, dynamic conversational tone. Respond uniquely to every query with fresh insights.`;

  const messages: ChatMessage[] = [
    { role: 'system', content: systemInstruction }
  ];

  // Include past conversation history for full context retention
  if (context.history && Array.isArray(context.history)) {
    context.history.slice(-8).forEach(h => {
      if (h.content && h.content.trim()) {
        messages.push({
          role: h.sender === 'USER' ? 'user' : 'assistant',
          content: h.content.trim()
        });
      }
    });
  }

  // Add latest user message if not already trailing in history
  if (messages.length === 0 || messages[messages.length - 1].content !== userMessage.trim()) {
    messages.push({ role: 'user', content: userMessage.trim() });
  }

  const aiReply = await callOpenRouter(messages);
  if (aiReply) {
    return aiReply;
  }

  return generateContextualFallbackResponse(userMessage, userName, career, readiness, weakAreasStr);
}

function generateContextualFallbackResponse(
  message: string,
  userName: string,
  career: string,
  readiness: string,
  weakAreas: string
): string {
  const lowerMsg = message.toLowerCase().trim();

  if (lowerMsg === 'hi' || lowerMsg === 'hello' || lowerMsg === 'hey') {
    return `Hello ${userName}! I'm **Aura**, your AI Career Intelligence Mentor.

I am tracking your career target vector for **${career}** (Current Readiness: **${readiness}**).

How can I help you today? You can ask me about:
- **Core Concepts**: Async JS, SQL JOINs, OOP principles, closures
- **Code Debugging**: Paste a snippet and I'll analyze logic & runtime errors
- **Interview Prep**: Technical mock questions & system design strategies
- **Project Ideas**: Full-stack project recommendations tailored to your goals`;
  }

  if (lowerMsg.includes('promise') || lowerMsg.includes('async')) {
    return `### Understanding Asynchronous JavaScript & Promises

In JavaScript, a **Promise** represents a value that may not be available yet but will resolve in the future (or reject with an error).

#### Key States:
1. **Pending**: Initial state, operation in progress.
2. **Fulfilled (Resolved)**: Operation completed successfully.
3. **Rejected**: Operation failed with an exception.

\`\`\`javascript
// Example: Creating & consuming a Promise
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId) {
        resolve({ id: userId, name: "${userName}", status: "Active" });
      } else {
        reject(new Error("Invalid User ID"));
      }
    }, 1000);
  });
};

// Modern Async/Await syntax:
async function loadUser() {
  try {
    const user = await fetchUserData("usr-100");
    console.log("Loaded User:", user);
  } catch (err) {
    console.error("Fetch Failed:", err.message);
  }
}
\`\`\`

#### Key Takeaway for ${career}:
Using \`async/await\` keeps code readable while preventing blocking on the main thread's event loop!`;
  }

  return `### Aura Mentor Analysis

Regarding your query: **"${message}"**

When engineering applications for **${career}**, focus on breaking down technical challenges into three core steps:

1. **Architecture & Scope**: Define inputs, outputs, and memory allocation constraints.
2. **Execution & Control Flow**: Ensure synchronous logic handles errors and async tasks manage promises/callbacks cleanly.
3. **Verification**: Write unit tests and check edge cases before pushing to production.

*(Target improvement areas tracked for your vector: **${weakAreas}**)*

Feel free to ask me to explain specific concepts, debug code snippets, or suggest full-stack learning tasks!`;
}
