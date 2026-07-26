"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  askAdminAI
} from "../../../../backend/ai/adminAI";


export default function AdminAI() {

  const [task, setTask] = useState("");

  const [response, setResponse] = useState("");

  const [analytics, setAnalytics] = useState(null);

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


    setAnalytics(
      result.analytics
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


        <input

          placeholder="Ask AI about your store..."

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
          AI Business Advice
        </h2>


        <p>
          {response}
        </p>



        {analytics && (

          <section>

            <h2>
              Store Analytics
            </h2>


            <p>
              Revenue: £{analytics.revenue}
            </p>


            <p>
              Orders:
              {" "}
              {analytics.totalOrders}
            </p>


            <p>
              Products:
              {" "}
              {analytics.totalProducts}
            </p>


            <p>
              Low Stock Items:
              {" "}
              {analytics.lowStockProducts.length}
            </p>


          </section>

        )}


      </section>


    </main>

  );

}
