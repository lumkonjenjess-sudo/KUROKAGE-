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
      })
      .catch((error) => {
        console.log("Error loading products:", error);
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

        {products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))
        )}

      </section>
    </main>
  );
}
