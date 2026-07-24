"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getMembership
} from "../../../../backend/database/memberships";

import {
  getAvailableRewards
} from "../../../../backend/shadow/rewards";


export default function Rewards() {

  const [rewards, setRewards] = useState([]);

  const [points, setPoints] = useState(0);


  async function loadRewards() {

    const data =
      await getMembership(
        "currentUser"
      );


    if (data.length > 0) {

      const member =
        data[0];


      setPoints(
        member.points
      );


      setRewards(
        getAvailableRewards(
          member.points
        )
      );

    }

  }


  useEffect(() => {

    loadRewards();

  }, []);


  return (

    <main>

      <Navbar />


      <section>

        <h1>
          Shadow Society Rewards
        </h1>


        <p>
          Your Points: {points}
        </p>


        <h2>
          Available Rewards
        </h2>


        {rewards.map((reward) => (

          <div key={reward.id}>

            <h3>
              {reward.name}
            </h3>


            <p>
              Required Points:
              {" "}
              {reward.points}
            </p>


            <button>
              Redeem Reward
            </button>


          </div>

        ))}


      </section>


    </main>

  );

}
