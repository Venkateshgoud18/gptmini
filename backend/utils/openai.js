import "dotenv/config";

const getOpenAIAPIResponce = async (messages) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a programming assistant.
ALWAYS format code using markdown code blocks.
Use triple backticks with language name.
Example:

\`\`\`java
code here
\`\`\`
          `,
        },
        {
          role: "user",
          content: messages,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Error:", error);
    throw new Error("OpenAI request failed");
  }
};

export default getOpenAIAPIResponce;
