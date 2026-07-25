"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getMemberAnalytics
} from "../../../../backend/shadow/analytics";

export default function Analytics() {

  const [email, setEmail] = useState("");

  const [stats, setStats] = useState(null);


  async function loadAnalytics() {

    const data =
      await getMemberAnalytics(
        email
      );

    setStats(data);

  }


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Shadow Society Analytics
        </h1>

        <input

          placeholder="Enter your email"

          value={email}

          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }

        />

        <button
          onClick={loadAnalytics}
        >
          View Analytics
        </button>

        {stats && (

          <div>

            <h2>
              Your Statistics
            </h2>

            <p>
              Total Orders: {stats.totalOrders}
            </p>

            <p>
              Total Spent: £{stats.totalSpent}
            </p>

            <p>
              Loyalty Points: {stats.totalPoints}
            </p>

          </div>

        )}

      </section>

    </main>

  );

}
