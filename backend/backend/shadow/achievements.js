export function getAchievements(stats) {

  const achievements = [];

  if (stats.totalOrders >= 1) {
    achievements.push({
      id: "first-order",
      name: "First Shadow",
      description: "Completed your first KuroKage order."
    });
  }

  if (stats.totalOrders >= 10) {
    achievements.push({
      id: "regular",
      name: "Shadow Regular",
      description: "Placed 10 or more orders."
    });
  }

  if (stats.totalSpent >= 500) {
    achievements.push({
      id: "vip-shopper",
      name: "VIP Shopper",
      description: "Spent £500 or more."
    });
  }

  if (stats.totalPoints >= 1000) {
    achievements.push({
      id: "shadow-legend",
      name: "Shadow Legend",
      description: "Earned 1,000 loyalty points."
    });
  }

  return achievements;

}
