"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getOrders
} from "../../../../backend/database/orders";

export default function AdminCustomers() {

  const [customers, setCustomers] = useState([]);


  async function loadCustomers() {

    const orders =
      await getOrders();

    const uniqueCustomers = [];

    const emails = new Set();

    orders.forEach((order) => {

      if (
        order.email &&
        !emails.has(order.email)
      ) {

        emails.add(order.email);

        uniqueCustomers.push({

          email: order.email,

          orders: 1

        });

      }

    });

    setCustomers(uniqueCustomers);

  }


  useEffect(() => {

    loadCustomers();

  }, []);


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Customer Management
        </h1>

        {customers.length === 0 ? (

          <p>
            No customers found.
          </p>

        ) : (

          customers.map((customer) => (

            <div key={customer.email}>

              <h3>
                {customer.email}
              </h3>

              <p>
                Customer account detected.
              </p>

            </div>

          ))

        )}

      </section>

    </main>

  );

    }
