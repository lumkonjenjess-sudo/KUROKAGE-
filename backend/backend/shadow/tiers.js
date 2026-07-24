export function calculateTier(
  points
) {

  if (points >= 5000) {

    return "Shadow Elite";

  }


  if (points >= 2500) {

    return "Gold";

  }


  if (points >= 1000) {

    return "Silver";

  }


  if (points >= 500) {

    return "Bronze";

  }


  return "Shadow";

}
