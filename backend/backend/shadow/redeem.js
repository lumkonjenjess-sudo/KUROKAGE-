import {
  getFirestore,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

import app from "../firebase/firebase";

import {
  rewards
} from "./rewards";


const db = getFirestore(app);


export async function redeemReward(
  membershipId,
  rewardId
) {

  const reward =
    rewards.find(
      item =>
        item.id === rewardId
    );


  if (!reward) {

    return {

      success: false,

      message:
        "Reward not found."

    };

  }


  await updateDoc(

    doc(
      db,
      "memberships",
      membershipId
    ),

    {

      points:
        increment(
          -reward.points
        )

    }

  );


  return {

    success: true,

    reward:
      reward.name

  };

      }
