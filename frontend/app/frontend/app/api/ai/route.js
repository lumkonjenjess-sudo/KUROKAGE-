import { NextResponse } from "next/server";

import {
  generateAIResponse
} from "../../../../backend/ai/openai";

import {
  trackOrder
} from "../../../../backend/ai/ordersAI";


export async function POST(request) {

  const body =
    await request.json();


  const message =
    body.message;


  const lowerMessage =
    message.toLowerCase();


  if (
    lowerMessage.includes("order") ||
    lowerMessage.includes("delivery") ||
    lowerMessage.includes("tracking")
  ) {

    const result =
      await trackOrder(
        body.email
      );


    return NextResponse.json({

      reply:
        result.message ||
        "Here is your order information.",

      orders:
        result.orders || []

    });

  }


  const response =
    await generateAIResponse(
      message
    );


  return NextResponse.json(
    response
  );

}
