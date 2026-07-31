"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

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

const auth = getAuth(app);

export default function Checkout() {

  const { cart } = useCart();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  const [memberTier, setMemberTier] = useState("Shadow");

  const [membershipId, setMembershipId] = useState("");

  const [pointsEarned, setPointsEarned] = useState(0);

  async function loadMemberTier() {

    const data =
      await getMembership("currentUser");

    if (data.length > 0) {

      setMemberTier(data[0].tier);

      setMembershipId(data[0].id);

    }

  }

  useEffect(() => {

    loadMemberTier();

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          if (currentUser) {

            setUser(currentUser);

            setEmail(currentUser.email || "");

          }

        }

      );

    return unsubscribe;

  }, []);

  const total =
    cart.reduce(
      (sum, item) =>
        sum + (item.price * item.quantity),
      0
    );

  const discount =
    getMemberDiscount(memberTier);

  const finalTotal =
    applyDiscount(
      total,
      discount
    );

  async function placeOrder() {

    if (!user) {

      alert(
        "Please log in before placing an order."
      );

      return;

    }

    const order =
      await createOrder({

        userId: user.uid,

        email,

        items: cart,

        paymentMethod,

        membershipTier: memberTier,

        originalTotal: total,

        discount,

        total: finalTotal,

        status: "pending"

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
      "Order created successfully. Shadow Society points have been added to your account."
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
          Shadow Society Tier: {memberTier}
        </h3>

        {pointsEarned > 0 && (

          <p>
            You earned {pointsEarned} Shadow Society points!
          </p>

        )}

        <h3>
          Items
        </h3>

        {cart.map((item)=>(

          <p key={item.id}>
            {item.name} x {item.quantity}
          </p>

        ))}

        <h3>
          Original Total: £{total.toFixed(2)}
        </h3>

        <h3>
          Member Discount: {discount}%
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
