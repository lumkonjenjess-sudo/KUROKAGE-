export async function processPayment(
  paymentMethod,
  order
) {

  const paymentData = {

    orderId:
      order.id,

    amount:
      order.amount || 0,

    currency:
      "USD",

    method:
      paymentMethod,

    status:
      "pending"

  };


  if (paymentMethod === "PayPal") {

    paymentData.provider =
      "PayPal";

    paymentData.message =
      "PayPal payment session created";

  }


  if (paymentMethod === "Capitec") {

    paymentData.provider =
      "Capitec";

    paymentData.message =
      "Capitec payment instructions created";

  }


  if (paymentMethod === "Card") {

    paymentData.provider =
      "Card Gateway";

    paymentData.message =
      "Card payment session created";

  }


  return paymentData;

}



export function createPayment(order) {

  return {

    orderId:
      order.id,

    amount:
      order.amount || 0,

    currency:
      "USD",

    status:
      "pending"

  };

}
