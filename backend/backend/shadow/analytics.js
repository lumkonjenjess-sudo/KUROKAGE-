import {
  getPurchaseHistory
} from "./history";

export async function getMemberAnalytics(
  email
) {

  const orders =
    await getPurchaseHistory(email);

  const totalOrders =
    orders.length;

  const totalSpent =
    orders.reduce(
      (sum, order) =>
        sum + (Number(order.total) || 0),
      0
    );

  const totalPoints =
    Math.floor(totalSpent);

  return {

    totalOrders,

    totalSpent,

    totalPoints

  };

}
