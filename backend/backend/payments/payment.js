export function createPayment(order) {

  const paymentData = {
    orderId: order.id,
    amount: order.amount,
    currency: "USD",
    status: "pending"
  };

  return paymentData;
}
