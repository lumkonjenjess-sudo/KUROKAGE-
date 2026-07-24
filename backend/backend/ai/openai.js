import {
  recommendProducts
} from "./recommendations";


export async function generateAIResponse(
  message
) {

  const apiKey =
    process.env.OPENAI_API_KEY;


  const recommendations =
    await recommendProducts(
      message
    );


  if (!apiKey) {

    return {

      reply:
        "KuroKage AI is currently running in demo mode. Here are some products you might like.",

      recommendations

    };

  }


  // OpenAI integration will be added here

  return {

    reply:
      "KuroKage AI received: " + message,

    recommendations

  };

}
