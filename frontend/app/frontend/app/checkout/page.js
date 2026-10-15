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

const auth = getAuth(app);

export default function Checkout() {
  const { cart } = useCart();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [memberTier, setMemberTier] = useState("Shadow");
  const [membershipId, setMembershipId] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);
        setMessage("");

        if (!currentUser) {
          setEmail("");
          setMemberTier("Shadow");
          setMembershipId("");
          setLoading(false);
          return;
        }

        setEmail(currentUser.email || "");
        setLoading(true);

        try {
          const memberships = await getMembership(
            currentUser.uid
          );

          if (memberships.length > 0) {
            setMemberTier(
              memberships[0].tier || "Shadow"
            );
            setMembershipId(memberships[0].id);
          } else {
            setMemberTier("Shadow");
            setMembershipId("");
          }
        } catch (error) {
          console.error(
            "Membership loading failed:",
            error
          );

          setMemberTier("Shadow");
          setMembershipId("");
          setMessage(
            "We couldn't load your membership. Please try again."
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * Number(item.quantity),
    0
  );

  const discount = getMemberDiscount(memberTier);

  const finalTotal = applyDiscount(
    total,
    discount
  );

  async function placeOrder() {
    if (submitting) return;

    setMessage("");

    if (!user) {
      setMessage("Please log in before placing an order.");
      return;
    }

    if (loading) {
      setMessage("Please wait while your account loads.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    const invalidItem = cart.some(
      (item) =>
        !item.id ||
        !Number.isFinite(Number(item.price)) ||
        Number(item.price) < 0 ||
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) <= 0
    );

    if (invalidItem) {
      setMessage(
        "Your cart contains an invalid item. Please review your cart."
      );
      return;
    }

    if (!paymentMethod) {
      setMessage("Please select a payment method.");
      return;
    }

    if (
      !Number.isFinite(finalTotal) ||
      finalTotal < 0
    ) {
      setMessage("The order total is invalid.");
      return;
    }

    setSubmitting(true);

    try {
      const order = await createOrder({
        userId: user.uid,
        email: email.trim(),
        items: cart,
        paymentMethod,
        membershipTier: memberTier,
        membershipId: membershipId || null,
        originalTotal: total,
        discount,
        total: finalTotal,
        currency: "GBP",
        status: "pending"
      });

      const payment = await processPayment(
        paymentMethod,
        order
      );

      if (payment.status === "failed") {
        setMessage(
          "Payment could not be started. Your order was saved but is not paid. Please check your orders before trying again."
        );
        return;
      }

      if (payment.status === "redirect_required") {
        setMessage(
          "Your order was saved, but PayPal is not connected yet. Payment is not confirmed, and no reward points have been awarded."
        );
        return;
      }

      if (payment.status === "gateway_required") {
        setMessage(
          `${payment.provider} is not connected to a real payment gateway yet. Payment is not confirmed, and no reward points have been awarded.`
        );
        return;
      }

      setMessage(
        "The payment provider returned an unrecognised status. Your order is not confirmed as paid."
      );
    } catch (error) {
      console.error("Checkout error:", error);

      setMessage(
        "Something went wrong. Check your orders before retrying to avoid creating a duplicate order."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Checkout</h1>

        {!user && !loading && (
          <p>Please log in before checking out.</p>
        )}

        <label htmlFor="checkout-email">
          Email address
        </label>

        <input
          id="checkout-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          disabled={submitting}
        />

        <h3>
          Shadow Society Tier: {memberTier}
        </h3>

        {loading && <p>Loading account details...</p>}

        <h3>Items</h3>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <p key={item.id}>
              {item.name} x {item.quantity}
            </p>
          ))
        )}

        <h3>
          Original Total: £{total.toFixed(2)}
        </h3>

        <h3>
          Member Discount: {discount}%
        </h3>

        <h2>
          Final Total: £{finalTotal.toFixed(2)}
        </h2>

        <h3>Select Payment Method</h3>

        <label htmlFor="payment-method">
          Payment method
        </label>

        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(event) =>
            setPaymentMethod(event.target.value)
          }
          disabled={submitting}
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
          disabled={
            submitting ||
            loading ||
            !user ||
            cart.length === 0
          }
        >
          {submitting
            ? "Processing..."
            : "Continue Payment"}
        </button>

        {message && (
          <p role="status">{message}</p>
        )}

        <p>
          Reward points will only be awarded after
          payment is successfully verified.
        </p>
      </section>
    </main>
  );
}
