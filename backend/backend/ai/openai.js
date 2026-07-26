import {
  recommendProducts
} from "./recommendations";


import OpenAI from "openai";



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



  const client =
    new OpenAI({

      apiKey

    });



  const completion =
    await client.chat.completions.create({

      model:
        "gpt-4.1-mini",


      messages: [

        {

          role:
            "system",

          content:
            `
You are KuroKage AI Assistant.

You help customers with:
- Anime streetwear recommendations
- Product questions
- Shopping assistance
- Brand information

Keep responses helpful and aligned with the KuroKage brand.
`

        },


        {

          role:
            "user",

          content:
            message

        }

      ]

    });



  return {

    reply:
      completion
        .choices[0]
        .message
        .content,


    recommendations

  };


}
