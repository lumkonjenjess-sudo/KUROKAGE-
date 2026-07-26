"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/Navbar";

import {
  getOrders
} from "../../../../../backend/database/orders";

import {
  getMembership
} from "../../../../../backend/database/memberships";

export default function CustomerProfile() {

  const { email } = useParams();

  const [orders, setOrders] = useState([]);

  const [membership, setMembership] = useState(null);

  async function loadProfile() {

    const allOrders = await getOrders();

    const customerOrders =
      allOrders.filter(
        order => order.email === decodeURIComponent(email)
      );

    setOrders(customerOrders);

    const member =
      await getMembership(decodeURIComponent(email));

    if (member.length > 0) {
      setMembership(member[0]);
    }

  }

  useEffect(() => {

    loadProfile();

  }, []);

  const totalSpent =
    orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Customer Profile
        </h1>

        <h2>
          {decodeURIComponent(email)}
        </h2>

        <p>
          Orders: {orders.length}
        </p>

        <p>
          Total Spent: £{totalSpent.toFixed(2)}
        </p>

        <p>
          Membership Tier:
          {" "}
          {membership ? membership.tier : "None"}
        </p>

        <p>
          Loyalty Points:
          {" "}
          {membership ? membership.points : 0}
        </p>

      </section>

    </main>

  );

    }
