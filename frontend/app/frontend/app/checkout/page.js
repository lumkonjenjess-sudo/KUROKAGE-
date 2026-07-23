"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

import { createOrder } from "../../../backend/database/orders";
import { processPayment } from "../../../backend/payments/providers";


export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");


  async function placeOrder() {

    const order = await createOrder({

      email,

      items: cart,

      paymentMethod,

      status: "pending"

    });


    const payment =
      await processPayment(
        paymentMethod,
        order
      );


    console.log(payment);


    alert(
      "Order created. Payment process started."
    );

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

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

        />


        <h3>
          Select Payment Method
        </h3>


        <select

          value={paymentMethod}

          onChange={(e)=>
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


        {cart.map((item)=>(

          <p key={item.id}>

            {item.name}
            {" "}x{" "}
            {item.quantity}

          </p>

        ))}



        <button
          onClick={placeOrder}
        >

          Continue Payment

        </button>


      </section>


    </main>

  );

}
