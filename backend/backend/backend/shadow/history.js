import {
  getOrders
} from "../database/orders";

export async function getPurchaseHistory(
  email
) {

  const orders =
    await getOrders();

  return orders.filter(
    order => order.email === email
  );

}
