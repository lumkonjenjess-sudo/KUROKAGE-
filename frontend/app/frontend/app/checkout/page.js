"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../../backend/database/orders";

export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");


  async function placeOrder() {

    await createOrder({
      email,
      items: cart,
      paymentMethod,
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
          Select Payment Method
        </h3>


        <select
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >

          <option value="">
            Choose payment
          </option>

          <option value="PayPal">
            PayPal
          </option>

          <option value="Capitec">
            Capitec
          </option>

          <option value="Card">
            Bank Card
          </option>

        </select>


        <h3>
          Items:
        </h3>


        {cart.map((item) => (

          <p key={item.id}>
            {item.name} x {item.quantity}
          </p>

        ))}


        <button onClick={placeOrder}>
          Continue Payment
        </button>


      </section>

    </main>
  );
}
