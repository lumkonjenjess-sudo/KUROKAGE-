"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getPurchaseHistory
} from "../../../../backend/shadow/history";

export default function PurchaseHistory() {

  const [email, setEmail] = useState("");

  const [orders, setOrders] = useState([]);


  async function loadHistory() {

    const data =
      await getPurchaseHistory(
        email
      );

    setOrders(data);

  }


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Purchase History
        </h1>

        <input

          placeholder="Enter your email"

          value={email}

          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }

        />

        <button
          onClick={loadHistory}
        >
          View Orders
        </button>

        {orders.map((order)=>(

          <div key={order.id}>

            <h3>
              Order #{order.id}
            </h3>

            <p>
              Status: {order.status}
            </p>

            <p>
              Payment Method: {order.paymentMethod}
            </p>

            <p>
              Total: £{order.total}
            </p>

          </div>

        ))}

      </section>

    </main>

  );

}
