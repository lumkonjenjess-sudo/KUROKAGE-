import {
  getBenefits
} from "./benefits";


export function getMemberDiscount(
  tier
) {

  const memberBenefits =
    getBenefits(tier);


  if (
    memberBenefits.includes(
      "25% member discount"
    )
  ) {

    return 25;

  }


  if (
    memberBenefits.includes(
      "15% member discount"
    )
  ) {

    return 15;

  }


  if (
    memberBenefits.includes(
      "10% member discount"
    )
  ) {

    return 10;

  }


  if (
    memberBenefits.includes(
      "5% member discount"
    )
  ) {

    return 5;

  }


  return 0;

}


export function applyDiscount(
  total,
  discount
) {

  return total -
    (total * discount / 100);

}
