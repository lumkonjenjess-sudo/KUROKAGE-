"use client";

import Link from "next/link";

export default function Navbar() {

  return (
    <nav>

      <h2>
        KuroKage
      </h2>

      <div>

        <Link href="/">
          Home
        </Link>

        <Link href="/shop">
          Shop
        </Link>

        <Link href="/cart">
          Cart
        </Link>

        <Link href="/affiliate">
          Affiliate
        </Link>

        <Link href="/community">
          Community
        </Link>

        <Link href="/admin">
          Admin
        </Link>

      </div>

    </nav>
  );
    }
