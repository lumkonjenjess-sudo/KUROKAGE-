export function calculateCommission(
  saleAmount,
  commissionRate = 10
) {

  const commission =
    (saleAmount * commissionRate) / 100;


  return commission;

}


export function updateCommission(
  currentCommission,
  newSaleAmount,
  commissionRate = 10
) {

  return (
    currentCommission +
    calculateCommission(
      newSaleAmount,
      commissionRate
    )
  );

}
