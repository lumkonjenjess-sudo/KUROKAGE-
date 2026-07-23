"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";


export default function AIChat() {

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);



  async function sendMessage() {

    setLoading(true);


    const response =
      await fetch("/api/ai", {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          message

        })

      });


    const data =
      await response.json();


    setReply(
      data.reply
    );


    setLoading(false);

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

          value={message}

          onChange={(e)=>
            setMessage(
              e.target.value
            )
          }

        />


        <button
          onClick={sendMessage}
        >

          {loading
            ? "Thinking..."
            : "Send"}

        </button>


        <p>
          {reply}
        </p>


      </section>


    </main>

  );

}
