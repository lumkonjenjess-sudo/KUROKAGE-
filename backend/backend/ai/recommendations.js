export async function recommendProducts(message) {

  const recommendations = [];

  const query = message.toLowerCase();

  if (
    query.includes("hoodie") ||
    query.includes("warm")
  ) {

    recommendations.push({
      name: "Shadow Raven Hoodie",
      category: "Hoodies",
      price: 49.99
    });

  }


  if (
    query.includes("shirt") ||
    query.includes("t-shirt") ||
    query.includes("tee")
  ) {

    recommendations.push({
      name: "KuroKage Shadow Tee",
      category: "T-Shirts",
      price: 29.99
    });

  }


  if (
    query.includes("jacket")
  ) {

    recommendations.push({
      name: "Nightfall Tech Jacket",
      category: "Jackets",
      price: 79.99
    });

  }


  if (recommendations.length === 0) {

    recommendations.push({
      name: "KuroKage Featured Collection",
      category: "Featured",
      price: "Browse Store"
    });

  }


  return recommendations;

}
