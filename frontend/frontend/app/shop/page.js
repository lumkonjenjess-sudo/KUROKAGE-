"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../../backend/database/products";

export default function Shop() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Shop</h1>

        <p>
          Explore the Shadow Collection
        </p>

        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
          />
        ))}

      </section>
    </main>
  );
}
