import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateFacebookCaption(topic) {
  console.log(`Generating Facebook caption for topic: "${topic}"`);

  // 1. Define the Persona
  const systemPrompt = `
You are a calm, practical social media strategist and behavioral messaging expert who specializes in writing Facebook posts for busy small business owners, product sellers, educators, and service providers.

You understand Facebook’s audience behavior:
- Longer-form posts
- Relatable, everyday scenarios
- Emotional relief over hype
- Community-oriented reflection
- Content that makes people feel understood, not sold to

Your writing style is clear, reassuring, and grounded.
You never use technical jargon, marketing buzzwords, or hype language.
You write in a way that reduces pressure and cognitive load.

Your goal is to help people recognize a familiar problem:
the stress, guilt, or quiet consequences of inconsistent social media —
and gently introduce the idea that a simple system can remove that burden.

The tone must be:
- Reassuring
- Non-judgmental
- Practical
- Calm
- Slightly reflective

Never preach.
Never shame.
Never imply the reader is failing.`;

  // 2. Define the Task (User Prompt) - This was missing in your code
  const userPrompt = `
Write a Facebook post based on this TOPIC: ${topic}

Formatting + performance requirements for Facebook:
- MUST begin with a short, scroll-stopping hook on its own line
- Use whitespace intentionally (1–3 sentences per paragraph)
- Use emojis sparingly for warmth and emphasis (never excessive)
- Write in plain, everyday language
- Avoid technical terms, marketing language, or AI references
- Do NOT use bullet points

Content requirements:
- Start with a relatable, everyday situation (busy week, forgetting to post, life getting in the way)
- Reflect the emotional impact (stress, guilt, feeling behind, starting over)
- Normalize the experience (this happens to a lot of capable people)
- Shift toward relief and clarity (the problem isn’t effort — it’s the lack of a system)
- Gently suggest that consistency doesn’t have to require constant attention
- Do NOT give step-by-step advice
- Do NOT pitch aggressively
- Do NOT mention “trauma,” “abuse,” or psychological harm

Ending:
- End with a soft, reflective question that invites comments
- The question should encourage shared experience, not solutions

Output:
- A complete Facebook post with natural spacing and light emoji use
- Include 6–10 relevant hashtags on a new line at the bottom
- Do NOT explain the task
- Output only the final post
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }, // Now valid because userPrompt is defined
      ],
      temperature: 0.7, 
    });

    const caption = completion.choices[0].message.content;
    
    // --- LOGGING THE RESPONSE ---
    console.log("\n=== FACEBOOK RESPONSE START ===");
    console.log(caption);
    console.log("=== FACEBOOK RESPONSE END ===\n");
    // ----------------------------    
    return caption;

  } catch (error) {
    console.error("Error generating Facebook caption:", error);
    throw new Error("Failed to generate Facebook caption.");
  }
}
