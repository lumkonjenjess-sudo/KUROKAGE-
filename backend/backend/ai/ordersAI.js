import {
  getOrders
} from "../database/orders";


export async function trackOrder(
  email
) {

  const orders =
    await getOrders();


  const customerOrders =
    orders.filter(
      (order) =>
        order.email === email
    );


  if (customerOrders.length === 0) {

    return {

      found:
        false,

      message:
        "No orders found for this email."

    };

  }


  return {

    found:
      true,

    orders:
      customerOrders.map(
        (order) => ({

          id:
            order.id,

          status:
            order.orderStatus,

          payment:
            order.paymentStatus

        })
      )

  };

      }
