"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getOrders,
  updateOrderStatus
} from "../../../../backend/database/orders";


export default function AdminOrders() {

  const [orders, setOrders] = useState([]);


  async function loadOrders() {

    const data =
      await getOrders();

    setOrders(data);

  }


  async function changeStatus(
    id,
    status
  ) {

    await updateOrderStatus(
      id,
      status
    );

    loadOrders();

  }


  useEffect(() => {

    loadOrders();

  }, []);


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Order Management
        </h1>

        {orders.length === 0 ? (

          <p>No orders found.</p>

        ) : (

          orders.map((order)=>(

            <div key={order.id}>

              <h3>
                Order: {order.id}
              </h3>

              <p>
                Customer: {order.email}
              </p>

              <p>
                Payment: {order.paymentStatus}
              </p>

              <p>
                Status: {order.orderStatus}
              </p>

              <p>
                Total: £{order.total}
              </p>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "processing"
                  )
                }
              >
                Processing
              </button>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "shipped"
                  )
                }
              >
                Shipped
              </button>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "completed"
                  )
                }
              >
                Completed
              </button>

              <button
                onClick={() =>
                  changeStatus(
                    order.id,
                    "cancelled"
                  )
                }
              >
                Cancelled
              </button>

            </div>

          ))

        )}

      </section>

    </main>

  );

          }
