import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or your preferred model
      messages: [{ role: "user", content: "You are a helpful legal assistant. Answer clearly but don’t provide legal advice. Give brief matter. Give the reply based on indian jurisdiction and answer only legal queries .Dont reply to before matter. "+message }],
    });

    const reply = completion.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), { status: 200 });
  } catch (error) {
    console.error("OpenAI error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
