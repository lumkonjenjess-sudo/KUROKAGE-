"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

import {
  sendMessage
} from "../../../backend/database/messages";


export default function Messages() {

  const [receiver, setReceiver] = useState("");
  const [text, setText] = useState("");


  async function send() {

    await sendMessage({

      participants: [
        "currentUser",
        receiver
      ],

      sender:
        "currentUser",

      text

    });


    alert("Message sent");

    setText("");

  }


  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Messages
        </h1>


        <input
          placeholder="Receiver ID"
          onChange={(e)=>
            setReceiver(e.target.value)
          }
        />


        <textarea

          placeholder="Write message"

          value={text}

          onChange={(e)=>
            setText(e.target.value)
          }

        />


        <button onClick={send}>
          Send Message
        </button>


      </section>

    </main>

  );

}
