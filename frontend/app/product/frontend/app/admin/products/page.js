"use client";

import { useState } from "react";
import { createNewProduct } from "../../../../backend/admin/products";

export default function ProductsAdmin() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function addProduct() {
    createNewProduct({
      name,
      price,
      category: "Streetwear",
      description: "KuroKage product",
      image: ""
    });
  }

  return (
    <main>

      <section>
        <h1>Add KuroKage Product</h1>

        <input
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addProduct}>
          Add Product
        </button>

      </section>

    </main>
  );
    }
