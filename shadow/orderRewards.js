import {
  getFirestore,
  doc,
  runTransaction
} from "firebase/firestore";

import app from "../firebase/firebase";

const db = getFirestore(app);

// Award Shadow Society points after payment has been
// verified by a trusted payment backend.
//
// Default: payment is NOT confirmed.
// An order ID is required to prevent duplicate rewards.
export async function rewardPurchase(
  membershipId,
  purchaseAmount,
  paymentConfirmed = false,
  orderId = ""
) {
  if (!membershipId) {
    throw new Error("A membership ID is required.");
  }

  if (
    typeof purchaseAmount !== "number" ||
    !Number.isFinite(purchaseAmount) ||
    purchaseAmount <= 0
  ) {
    throw new Error("A valid purchase amount is required.");
  }

  // Never award points without verified payment details.
  if (!paymentConfirmed || !orderId) {
    return {
      pointsEarned: 0,
      pointsAdded: false,
      message:
        "Points will be awarded after payment is verified."
    };
  }

  // Current policy: 1 point per whole currency unit spent.
  const pointsToEarn = Math.floor(purchaseAmount);

  if (pointsToEarn <= 0) {
    return {
      pointsEarned: 0,
      pointsAdded: false,
      message: "This purchase earned no reward points."
    };
  }

  const membershipRef = doc(
    db,
    "memberships",
    membershipId
  );

  const result = await runTransaction(
    db,
    async (transaction) => {
      const snapshot = await transaction.get(
        membershipRef
      );

      if (!snapshot.exists()) {
        throw new Error("Membership not found.");
      }

      const membership = snapshot.data();
      const rewardedOrderIds =
        membership.rewardedOrderIds || [];

      // Prevent this order from awarding points twice.
      if (rewardedOrderIds.includes(orderId)) {
        return {
          pointsEarned: 0,
          pointsAdded: false,
          message:
            "This order has already received reward points."
        };
      }

      const currentPoints =
        membership.points || 0;

      transaction.update(membershipRef, {
        points: currentPoints + pointsToEarn,
        rewardedOrderIds: [
          ...rewardedOrderIds,
          orderId
        ],
        updatedAt: new Date()
      });

      return {
        pointsEarned: pointsToEarn,
        pointsAdded: true,
        message: "Reward points added successfully."
      };
    }
  );

  return result;
}
