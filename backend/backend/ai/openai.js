export async function generateAIResponse(
  message
) {

  const apiKey =
    process.env.OPENAI_API_KEY;


  if (!apiKey) {

    return {

      reply:
        "KuroKage AI is currently in setup mode."

    };

  }


  // OpenAI API connection will be added here

  return {

    reply:
      "KuroKage AI received: " + message

  };

}
