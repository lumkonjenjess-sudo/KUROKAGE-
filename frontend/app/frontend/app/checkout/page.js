"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../../backend/database/orders";

export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");

  async function placeOrder() {

    await createOrder({
      email,
      items: cart,
      status: "pending"
    });

    alert("Order placed successfully");
  }


  return (
    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Checkout
        </h1>


        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <h3>
          Items:
        </h3>


        {cart.map((item) => (

          <p key={item.id}>
            {item.name} x {item.quantity}
          </p>

        ))}


        <button onClick={placeOrder}>
          Place Order
        </button>


      </section>

    </main>
  );
}
