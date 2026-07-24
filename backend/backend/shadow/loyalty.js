import {
  getFirestore,
  doc,
  updateDoc,
  increment
} from "firebase/firestore";

import app from "../firebase/firebase";

const db = getFirestore(app);

export async function awardPoints(
  membershipId,
  points
) {

  await updateDoc(

    doc(
      db,
      "memberships",
      membershipId
    ),

    {

      points: increment(points)

    }

  );

}

export function calculatePoints(
  orderTotal
) {

  return Math.floor(
    orderTotal
  );

        }
