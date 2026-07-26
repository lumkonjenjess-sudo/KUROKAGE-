import {
  getProducts
} from "../database/products";

import {
  getOrders
} from "../database/orders";

import {
  generateAIResponse
} from "./openai";



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



  const storeData = {

    revenue,

    totalOrders:
      orders.length,

    totalProducts:
      products.length,

    lowStockProducts:
      lowStock.map(
        product => product.name
      )

  };



  const aiResponse =
    await generateAIResponse(

      `You are KuroKage Admin AI.

      Analyse this business request:
      ${task}

      Provide practical ecommerce advice.`,

      storeData

    );



  return {

    response:
      aiResponse.response,


    analytics:
      storeData

  };


}
