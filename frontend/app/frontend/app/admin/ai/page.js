"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  askAdminAI
} from "../../../../backend/ai/adminAI";


export default function AdminAI() {

  const [task, setTask] = useState("");

  const [response, setResponse] = useState("");

  const [loading, setLoading] = useState(false);



  async function sendTask() {

    setLoading(true);


    const result =
      await askAdminAI(
        task
      );


    setResponse(
      result.response
    );


    setLoading(false);

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage AI Admin Control Center
        </h1>


        <p>
          Ask KuroKage AI to analyse and manage your store.
        </p>


        <input

          placeholder="Ask AI about sales, products, customers..."

          value={task}

          onChange={(e)=>
            setTask(
              e.target.value
            )
          }

        />


        <button

          onClick={sendTask}

        >

          {loading
            ? "Analysing..."
            : "Ask AI"}

        </button>



        <h2>
          AI Response
        </h2>


        <p>
          {response}
        </p>


      </section>


    </main>

  );

}
