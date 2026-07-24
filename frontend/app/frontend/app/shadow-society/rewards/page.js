"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getMembership
} from "../../../../backend/database/memberships";

import {
  getAvailableRewards
} from "../../../../backend/shadow/rewards";

import {
  redeemReward
} from "../../../../backend/shadow/redeem";


export default function Rewards() {

  const [rewards, setRewards] = useState([]);

  const [points, setPoints] = useState(0);

  const [membershipId, setMembershipId] = useState("");

  const [message, setMessage] = useState("");



  async function loadRewards() {

    const data =
      await getMembership(
        "currentUser"
      );


    if (data.length > 0) {

      const member =
        data[0];


      setMembershipId(
        member.id
      );


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



  async function handleRedeem(
    rewardId
  ) {

    const result =
      await redeemReward(
        membershipId,
        rewardId
      );


    if (result.success) {

      setMessage(
        result.reward + " redeemed successfully!"
      );


      loadRewards();

    } else {

      setMessage(
        result.message
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


        <p>
          {message}
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


            <button
              onClick={() =>
                handleRedeem(
                  reward.id
                )
              }
            >

              Redeem Reward

            </button>


          </div>

        ))}


      </section>


    </main>

  );

}
