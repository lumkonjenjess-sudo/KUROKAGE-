"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

import {
  askKuroKageAI
} from "../../../backend/ai/kurokageAI";


export default function AIChat() {

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");



  async function sendMessage() {

    const response =
      await askKuroKageAI(
        message
      );


    setReply(
      response.reply
    );

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage AI Assistant
        </h1>


        <input

          placeholder="Ask KuroKage AI..."

          onChange={(e)=>
            setMessage(
              e.target.value
            )
          }

        />


        <button
          onClick={sendMessage}
        >
          Send
        </button>


        <p>
          {reply}
        </p>


      </section>


    </main>

  );

            }
