import { NextResponse } from "next/server";


export async function POST(request) {

  const body =
    await request.json();


  const message =
    body.message;


  const reply =
    "KuroKage AI received your message: " 
    + message;


  return NextResponse.json({

    reply

  });

}
