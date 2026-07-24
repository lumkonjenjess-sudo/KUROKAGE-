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

import {
  rewardPurchase
} from "../../../backend/shadow/orderRewards";


export default function Checkout() {

  const { cart } = useCart();

  const [email, setEmail] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [memberTier, setMemberTier] = useState("Shadow");

  const [membershipId, setMembershipId] = useState("");

  const [pointsEarned, setPointsEarned] = useState(0);



  async function loadMemberTier() {

    const data =
      await getMembership(
        "currentUser"
      );


    if (data.length > 0) {

      setMemberTier(
        data[0].tier
      );


      setMembershipId(
        data[0].id
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



    if (membershipId) {

      const reward =
        await rewardPurchase(
          membershipId,
          finalTotal
        );


      setPointsEarned(
        reward.pointsEarned
      );

    }



    console.log(payment);


    alert(
      "Order created. Points added to your Shadow Society account."
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


        {pointsEarned > 0 && (

          <p>
            You earned {pointsEarned} Shadow Society points!
          </p>

        )}


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

         
