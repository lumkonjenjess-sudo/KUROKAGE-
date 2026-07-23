import { NextResponse } from "next/server";

import {
  generateAIResponse
} from "../../../../backend/ai/openai";


export async function POST(request) {

  const body =
    await request.json();


  const response =
    await generateAIResponse(
      body.message
    );


  return NextResponse.json(
    response
  );

}
