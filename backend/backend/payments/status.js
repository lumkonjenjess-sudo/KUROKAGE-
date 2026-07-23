export function updatePaymentStatus(
  payment,
  status
) {

  return {

    ...payment,

    status,

    updatedAt:
      new Date()

  };

}



export function paymentSuccess(
  payment
) {

  return updatePaymentStatus(
    payment,
    "paid"
  );

}



export function paymentFailed(
  payment
) {

  return updatePaymentStatus(
    payment,
    "failed"
  );

}



export function paymentComplete(
  payment
) {

  return updatePaymentStatus(
    payment,
    "completed"
  );

}
