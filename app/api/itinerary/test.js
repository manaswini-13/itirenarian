// app/api/itinerary/test.js
const systemPrompt = `Create a short sample 1-day travel itinerary JSON object for Rome. Follow this schema exactly: { "days": [{ "day": 1, "title": "The Ancient Archways" }] }`;

async function testGroq() {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    console.log(
      "Detected Key Prefix:",
      apiKey ? apiKey.substring(0, 7) + "..." : "NONE"
    );

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You strictly output raw data matching JSON schemas without markdown decorators.",
          },
          { role: "user", content: systemPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.1,
      }),
    });

    const data = await res.json();
    console.log("=== RAW GROQ RESPONSE OUTLINE ===");
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Groq verification trace failed:", e.message);
  }
}

testGroq();
