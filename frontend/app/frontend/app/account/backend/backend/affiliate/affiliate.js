export const affiliates = [];

export function createAffiliate(user) {
  const affiliate = {
    id: affiliates.length + 1,
    user,
    referralCode: "KURO" + (affiliates.length + 1),
    clicks: 0,
    sales: 0,
    commissions: 0
  };

  affiliates.push(affiliate);

  return affiliate;
}

export function getAffiliates() {
  return affiliates;
}
