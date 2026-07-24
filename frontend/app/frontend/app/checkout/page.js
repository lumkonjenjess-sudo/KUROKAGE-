"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

import { createOrder } from "../../../backend/database/orders";
import { processPayment } from "../../../backend/payments/providers";

import {
  getMemberDiscount,
  applyDiscount
} from "../../../backend/shadow/discounts";


export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [memberTier, setMemberTier] = useState("Shadow");


  const total =
    cart.reduce(
      (sum, item) =>
        sum + (item.price * item.quantity),
      0
    );


  const discount =
    getMemberDiscount(
      memberTier
    );


  const finalTotal =
    applyDiscount(
      total,
      discount
    );



  async function placeOrder() {

    const order =
      await createOrder({

        email,

        items: cart,

        paymentMethod,

        originalTotal:
          total,

        discount:
          discount,

        total:
          finalTotal,

        status:
          "pending"

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
          Shadow Society Tier
        </h3>


        <select

          value={memberTier}

          onChange={(e)=>
            setMemberTier(e.target.value)
          }

        >

          <option value="Shadow">
            Shadow
          </option>

          <option value="Bronze">
            Bronze
          </option>

          <option value="Silver">
            Silver
          </option>

          <option value="Gold">
            Gold
          </option>

          <option value="Shadow Elite">
            Shadow Elite
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


        <h3>
          Original Total: £{total.toFixed(2)}
        </h3>


        <h3>
          Discount: {discount}%
        </h3>


        <h2>
          Final Total: £{finalTotal.toFixed(2)}
        </h2>



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



        <button
          onClick={placeOrder}
        >

          Continue Payment

        </button>


      </section>


    </main>

  );

}
