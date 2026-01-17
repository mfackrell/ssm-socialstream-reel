import OpenAI from 'openai';
import { cleanAndParseJson } from '../helpers/cleanJson.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReelScript(topic) {
  console.log(`Generating Reel Script & Overlay for topic: "${topic}"`);

  const systemPrompt = `
You are generating short Instagram REEL scripts for busy people who sell something useful
(products, services, resources) and struggle to stay visible on social media.

The viewer is:
- A small business owner, seller, educator, or service provider
- Capable, responsible, and already doing real work
- Not a marketer and not trying to be one
- Aware that posting matters, but often forgets or postpones it
- More distracted than distressed

The core problem is not failure or guilt.
It is friction, mental load, and competing priorities.

They respond to:
- Ordinary, familiar business-life moments
- Simple cause-and-effect
- Recognition of drift, not judgment
- Calm, factual statements

CRITICAL DIRECTIVE  
Write a THREE-LINE script specifically about: "${topic}"

STRICT RULES
1. The script must show a specific, ordinary moment related to "${topic}".
2. Follow CAUSE → EFFECT → CONSEQUENCE.
3. BREVITY IS MANDATORY.
4. NO ADVERBS.
5. Describe actions or behavior, not analysis.
6. Do NOT reference tools, platforms, AI, or solutions.

LINE STRUCTURE
- Line 1: A normal, low-stakes business moment.
- Line 2: The immediate reaction (delay, distraction, postponement).
- Line 3: The quiet result (drift, loss of momentum, fading visibility).

OVERLAY TEXT
- 2–5 words
- Calm, neutral, non-salesy
- No punctuation
OUTPUT FORMAT (JSON ONLY):
{
  "Line 1": "[Trigger]",
  "Line 2": "[Response]",
  "Line 3": "[Submission]",
  "overlay_text": "short headline"
}

`;

const userPrompt = `
THE SPECIFIC FOCUS FOR THIS SCRIPT IS: ${topic}

Write a three-line Instagram Reel script using the rules above.

Ensure:
- Line 1 is a realistic, everyday business moment
- Line 2 shows postponement or distraction
- Line 3 shows quiet loss of momentum or visibility

Do not teach.
Do not diagnose.
Do not resolve the tension.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" }, 
      temperature: 0.8,
      top_p: 0.92,
      presence_penalty: 0.6,
      frequency_penalty: 0.7
    });

    const rawContent = completion.choices[0].message.content;
    const result = cleanAndParseJson(rawContent);

    // --- LOGGING ---
    console.log("\n=== REEL SCRIPT & OVERLAY RESPONSE START ===");
    console.log(JSON.stringify(result, null, 2));
    console.log("=== REEL SCRIPT & OVERLAY RESPONSE END ===\n");
    // --------------
    
    return result;

  } catch (error) {
    console.error("Error generating Reel Script:", error);
    throw new Error("Failed to generate Reel Script.");
  }
}
