import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInstagramCaption(topic) {
  console.log(`Generating Instagram caption for topic: "${topic}"`);

  const systemPrompt = `
You are a practical, calm social media strategist who specializes in writing high-performing Instagram captions for busy small business owners, product sellers, educators, and service providers.

You understand Instagram behavior:
- People scroll fast
- Short, emotionally resonant lines stop thumbs
- Relatability beats cleverness
- Relief beats hype
- Familiar situations outperform bold claims

Your writing style is:
- Simple
- Reassuring
- Grounded
- Non-technical
- Never salesy

You never use marketing buzzwords, growth language, or AI references.
You do not sound like a coach or influencer.
You write captions that make people feel understood and less overwhelmed.

Your goal is to help people recognize a familiar friction:
the stress, guilt, or quiet impact of inconsistent posting —
and gently reframe the problem as a systems issue, not a personal failure.

The tone must be:
- Calm
- Relatable
- Encouraging
- Non-judgmental`;

  const userPrompt = `
The audience is busy, capable, and already juggling a lot.
They scroll quickly and do not want to read marketing copy.

TOPIC: ${topic}

Formatting + performance requirements:
- MUST start with a single short, scroll-stopping hook (1 line)
- Use whitespace generously (1–2 short sentences per paragraph)
- Use emojis sparingly for warmth or pacing (never excessive)
- Use plain, everyday language
- Avoid jargon, buzzwords, and technical explanations
- Do NOT use bullet points

Content requirements:
- Start with a relatable everyday moment (busy week, forgetting to post, meaning to come back later)
- Reflect the internal feeling (stress, guilt, feeling behind, starting over again)
- Normalize the experience (this happens to a lot of capable people)
- Gently shift toward clarity (the issue isn’t effort — it’s consistency without a system)
- Suggest relief without instructions or steps
- Do NOT give advice
- Do NOT pitch
- Do NOT reference AI, tools, or automation directly

Ending:
- End with ONE reflective question that invites comments
- The question should encourage shared experience, not solutions

Output:
- A complete Instagram caption, publish-ready
- Natural spacing and light emoji use
- Include 8–12 relevant hashtags at the end
- Do NOT explain the task
- Output only the final caption

GENERATE NOW.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 1.0, 
    });

    const caption = completion.choices[0].message.content;

    // --- LOGGING THE RESPONSE ---
    console.log("\n=== INSTAGRAM RESPONSE START ===");
    console.log(caption);
    console.log("=== INSTAGRAM RESPONSE END ===\n");
    // ----------------------------
    
    return caption;

  } catch (error) {
    console.error("Error generating Instagram caption:", error);
    throw new Error("Failed to generate Instagram caption.");
  }
}
