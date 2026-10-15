import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  runTransaction
} from "firebase/firestore";

import app from "../firebase/firebase";

import {
  createNotification
} from "./notifications";

const db = getFirestore(app);

// Get a customer's current reward points.
export async function getRewardPoints(userId) {
  if (!userId) {
    throw new Error("A customer user ID is required.");
  }

  const pointsRef = doc(db, "rewardPoints", userId);
  const snapshot = await getDoc(pointsRef);

  if (!snapshot.exists()) {
    return 0;
  }

  return snapshot.data().points || 0;
}

// Add reward points to a customer.
export async function addRewardPoints(userId, points, reason = "Reward earned") {
  if (!userId) {
    throw new Error("A customer user ID is required.");
  }

  if (!Number.isInteger(points) || points <= 0) {
    throw new Error("Points must be a positive whole number.");
  }

  const pointsRef = doc(db, "rewardPoints", userId);

  const newBalance = await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(pointsRef);

    const currentPoints = snapshot.exists()
      ? snapshot.data().points || 0
      : 0;

    const updatedPoints = currentPoints + points;

    transaction.set(
      pointsRef,
      {
        userId,
        points: updatedPoints,
        updatedAt: new Date()
      },
      { merge: true }
    );

    return updatedPoints;
  });

  try {
    await createNotification(userId, {
      title: "KuroKage Reward Points Earned!",
      message: `You earned ${points} points. Your new balance is ${newBalance} points. Reason: ${reason}.`,
      type: "reward_points"
    });
  } catch (error) {
    console.error(
      "Points were saved, but the notification could not be created:",
      error
    );
  }

  return newBalance;
}

// Redeem points by deducting them from the customer's balance.
export async function redeemRewardPoints(userId, points) {
  if (!userId) {
    throw new Error("A customer user ID is required.");
  }

  if (!Number.isInteger(points) || points <= 0) {
    throw new Error("Points must be a positive whole number.");
  }

  const pointsRef = doc(db, "rewardPoints", userId);

  const newBalance = await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(pointsRef);

    if (!snapshot.exists()) {
      throw new Error("You do not have enough reward points.");
    }

    const currentPoints = snapshot.data().points || 0;

    if (currentPoints < points) {
      throw new Error("You do not have enough reward points.");
    }

    const updatedPoints = currentPoints - points;

    transaction.update(pointsRef, {
      points: updatedPoints,
      updatedAt: new Date()
    });

    return updatedPoints;
  });

  try {
    await createNotification(userId, {
      title: "Reward Points Redeemed",
      message: `You redeemed ${points} points. Your remaining balance is ${newBalance} points.`,
      type: "reward_redeemed"
    });
  } catch (error) {
    console.error(
      "Points were redeemed, but the notification could not be created:",
      error
    );
  }

  return newBalance;
}
