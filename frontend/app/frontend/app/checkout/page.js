"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

import {
  createOrder
} from "../../../backend/database/orders";

import {
  processPayment
} from "../../../backend/payments/providers";

import {
  getMemberDiscount,
  applyDiscount
} from "../../../backend/shadow/discounts";

import {
  getMembership
} from "../../../backend/database/memberships";


export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [memberTier, setMemberTier] = useState("Shadow");



  async function loadMemberTier() {

    const data =
      await getMembership(
        "currentUser"
      );


    if (data.length > 0) {

      setMemberTier(
        data[0].tier
      );

    }

  }



  useEffect(() => {

    loadMemberTier();

  }, []);



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

        membershipTier:
          memberTier,

        originalTotal:
          total,

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
            setEmail(
              e.target.value
            )
          }

        />


        <h3>
          Shadow Society Tier:
          {" "}
          {memberTier}
        </h3>


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
          Original Total:
          {" "}
          £{total.toFixed(2)}
        </h3>


        <h3>
          Member Discount:
          {" "}
          {discount}%
        </h3>


        <h2>
          Final Total:
          {" "}
          £{finalTotal.toFixed(2)}
        </h2>



        <h3>
          Select Payment Method
        </h3>


        <select

          value={paymentMethod}

          onChange={(e)=>
            setPaymentMethod(
              e.target.value
            )
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
