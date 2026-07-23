"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function Admin() {

  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Admin Dashboard
        </h1>


        <p>
          Manage products, orders, users, and store settings.
        </p>


        <Link href="/admin/products">
          <button>
            Manage Products
          </button>
        </Link>


        <Link href="/admin/orders">
          <button>
            View Orders
          </button>
        </Link>


        <Link href="/admin/users">
          <button>
            Manage Users
          </button>
        </Link>


      </section>

    </main>

  );

}
