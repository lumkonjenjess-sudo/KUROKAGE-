export const orders = [];

export function createOrder(order) {
  orders.push(order);

  return {
    success: true,
    order
  };
}

export function getOrders() {
  return orders;
}
