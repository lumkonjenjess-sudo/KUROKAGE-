"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getMemberAnalytics
} from "../../../../backend/shadow/analytics";

import {
  getAchievements
} from "../../../../backend/shadow/achievements";

export default function Analytics() {

  const [email, setEmail] = useState("");

  const [stats, setStats] = useState(null);

  const [achievements, setAchievements] = useState([]);


  async function loadAnalytics() {

    const data =
      await getMemberAnalytics(
        email
      );

    setStats(data);

    setAchievements(
      getAchievements(data)
    );

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
            setEmail(e.target.value)
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

            <h2>
              Achievements
            </h2>

            {achievements.length === 0 ? (

              <p>
                No achievements unlocked yet.
              </p>

            ) : (

              achievements.map((achievement) => (

                <div key={achievement.id}>

                  <h3>
                    {achievement.name}
                  </h3>

                  <p>
                    {achievement.description}
                  </p>

                </div>

              ))

            )}

          </div>

        )}

      </section>

    </main>

  );

        }
