export function saveReferralCode(code) {

  if (typeof window !== "undefined") {

    localStorage.setItem(
      "kurokageReferral",
      code
    );

  }

}


export function getReferralCode() {

  if (typeof window !== "undefined") {

    return localStorage.getItem(
      "kurokageReferral"
    );

  }


  return null;

}
