import {
  getProducts
} from "../database/products";

import {
  getOrders
} from "../database/orders";


export async function askAdminAI(
  task
) {


  const products =
    await getProducts();


  const orders =
    await getOrders();



  const revenue =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );



  const lowStock =
    products.filter(
      product =>
        (product.stock ?? 0) <= 5
    );



  const query =
    task.toLowerCase();



  let response =
    "KuroKage AI Admin analysed your store. ";



  if (
    query.includes("sales") ||
    query.includes("revenue")
  ) {

    response +=

      `Your current revenue is £${revenue.toFixed(2)} from ${orders.length} orders.`;

  }


  else if (
    query.includes("inventory") ||
    query.includes("stock")
  ) {

    response +=

      `${lowStock.length} products have low stock and may require restocking.`;

  }


  else if (
    query.includes("product")
  ) {

    response +=

      `Your store currently has ${products.length} products.`;

  }


  else if (
    query.includes("order")
  ) {

    response +=

      `Your store currently has ${orders.length} orders.`;

  }


  else {

    response +=

      "I can help analyse sales, inventory, products, and orders.";

  }



  return {

    task,

    response,

    analytics: {

      revenue,

      totalOrders:
        orders.length,

      totalProducts:
        products.length,

      lowStock:
        lowStock.length

    }

  };

}
