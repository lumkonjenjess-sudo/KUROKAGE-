"use client";

import Navbar from "../../components/Navbar";

export default function AdminDashboard() {

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Admin Dashboard
        </h1>

        <div>

          <h2>Store Management</h2>

          <ul>
            <li>📦 Products</li>
            <li>🛒 Orders</li>
            <li>👥 Customers</li>
            <li>🤝 Affiliates</li>
            <li>🌑 Shadow Society</li>
            <li>📊 Analytics</li>
            <li>🤖 AI Admin</li>
          </ul>

        </div>

      </section>

    </main>

  );

}
