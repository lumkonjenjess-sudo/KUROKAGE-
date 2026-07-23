"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  askAdminAI
} from "../../../../backend/ai/adminAI";


export default function AdminAI() {

  const [task, setTask] = useState("");

  const [response, setResponse] = useState("");



  async function sendTask() {

    const result =
      await askAdminAI(
        task
      );


    setResponse(
      result.response
    );

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage AI Admin
        </h1>


        <input

          placeholder="Ask AI to help manage your store..."

          onChange={(e)=>
            setTask(
              e.target.value
            )
          }

        />


        <button
          onClick={sendTask}
        >

          Ask AI

        </button>


        <p>
          {response}
        </p>


      </section>


    </main>

  );

}
