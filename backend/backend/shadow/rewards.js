export const rewards = [

  {
    id: "discount10",
    name: "10% Store Discount",
    points: 500
  },

  {
    id: "discount25",
    name: "25% Store Discount",
    points: 1500
  },

  {
    id: "early-access",
    name: "Early Access Product Drops",
    points: 3000
  },

  {
    id: "vip-drop",
    name: "Shadow Elite Exclusive Drop",
    points: 5000
  }

];


export function getAvailableRewards(
  points
) {

  return rewards.filter(
    reward =>
      points >= reward.points
  );

}
