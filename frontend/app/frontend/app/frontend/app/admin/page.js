"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { checkAdmin } from "../../../backend/admin/adminAuth";


export default function Admin() {

  const [allowed, setAllowed] = useState(false);


  useEffect(() => {

    setAllowed(checkAdmin());

  }, []);


  if (!allowed) {

    return (

      <main>

        <Navbar />

        <section>

          <h1>
            Access Denied
          </h1>

          <p>
            You are not authorized to view this page.
          </p>

        </section>

      </main>

    );

  }


  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Admin Dashboard
        </h1>


        <Link href="/admin/products">
          <button>
            Manage Products
          </button>
        </Link>


        <Link href="/admin/orders">
          <button>
            Manage Orders
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
