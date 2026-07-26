"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getOrders
} from "../../../../backend/database/orders";

import {
  getProducts
} from "../../../../backend/database/products";


export default function AnalyticsDashboard() {

  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);


  async function loadData() {

    const orderData =
      await getOrders();

    const productData =
      await getProducts();

    setOrders(orderData);

    setProducts(productData);

  }


  useEffect(() => {

    loadData();

  }, []);


  const revenue =
    orders.reduce(
      (sum, order) =>
        sum + (order.total || 0),
      0
    );


  const customers =
    new Set(
      orders.map(
        order => order.email
      )
    ).size;


  const totalProducts =
    products.length;


  const completedOrders =
    orders.filter(
      order =>
        order.orderStatus === "completed"
    ).length;


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Business Analytics
        </h1>

        <div>

          <h2>
            £{revenue.toFixed(2)}
          </h2>

          <p>
            Total Revenue
          </p>

        </div>

        <div>

          <h2>
            {orders.length}
          </h2>

          <p>
            Total Orders
          </p>

        </div>

        <div>

          <h2>
            {customers}
          </h2>

          <p>
            Total Customers
          </p>

        </div>

        <div>

          <h2>
            {totalProducts}
          </h2>

          <p>
            Products
          </p>

        </div>

        <div>

          <h2>
            {completedOrders}
          </h2>

          <p>
            Completed Orders
          </p>

        </div>

      </section>

    </main>

  );

}
