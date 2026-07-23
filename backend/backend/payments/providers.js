export function processPayment(paymentMethod, order) {

  switch (paymentMethod) {

    case "PayPal":
      return {
        provider: "PayPal",
        status: "redirect_required",
        order
      };


    case "Capitec":
      return {
        provider: "Capitec",
        status: "gateway_required",
        order
      };


    case "Card":
      return {
        provider: "Card Payment",
        status: "gateway_required",
        order
      };


    default:
      return {
        provider: "Unknown",
        status: "failed"
      };
  }

}
