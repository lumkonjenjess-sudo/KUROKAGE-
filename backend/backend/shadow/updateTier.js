import {
  getFirestore,
  doc,
  updateDoc
} from "firebase/firestore";

import app from "../firebase/firebase";

import {
  calculateTier
} from "./tiers";


const db = getFirestore(app);


export async function updateMembershipTier(
  membershipId,
  points
) {

  const tier =
    calculateTier(points);


  await updateDoc(

    doc(
      db,
      "memberships",
      membershipId
    ),

    {

      points,

      tier

    }

  );


  return tier;

}
