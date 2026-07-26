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


  const completedOrders =
    orders.filter(
      order =>
        order.orderStatus === "completed"
    ).length;


  const pendingOrders =
    orders.filter(
      order =>
        order.orderStatus === "pending"
    ).length;


  const processingOrders =
    orders.filter(
      order =>
        order.orderStatus === "processing"
    ).length;


  const shippedOrders =
    orders.filter(
      order =>
        order.orderStatus === "shipped"
    ).length;


  const cancelledOrders =
    orders.filter(
      order =>
        order.orderStatus === "cancelled"
    ).length;


  const lowStockProducts =
    products.filter(
      product =>
        (product.stock ?? 0) <= 5
    );


  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Business Analytics
        </h1>

        <h2>
          Sales Overview
        </h2>

        <p>
          Revenue: £{revenue.toFixed(2)}
        </p>

        <p>
          Total Orders: {orders.length}
        </p>

        <p>
          Customers: {customers}
        </p>

        <p>
          Products: {products.length}
        </p>

        <h2>
          Order Status
        </h2>

        <p>
          Pending: {pendingOrders}
        </p>

        <p>
          Processing: {processingOrders}
        </p>

        <p>
          Shipped: {shippedOrders}
        </p>

        <p>
          Completed: {completedOrders}
        </p>

        <p>
          Cancelled: {cancelledOrders}
        </p>

        <h2>
          Low Stock Alerts
        </h2>

        {lowStockProducts.length === 0 ? (

          <p>
            No low stock products.
          </p>

        ) : (

          lowStockProducts.map((product)=>(

            <div key={product.id}>

              <p>
                {product.name} - {product.stock} remaining
              </p>

            </div>

          ))

        )}

        <h2>
          AI Business Summary
        </h2>

        <p>
          Revenue is currently £{revenue.toFixed(2)}.
          There are {orders.length} total orders and{" "}
          {lowStockProducts.length} products that need restocking.
        </p>

      </section>

    </main>

  );

}
