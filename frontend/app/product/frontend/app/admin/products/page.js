"use client";

import { useState } from "react";
import { createNewProduct } from "../../../../backend/admin/products";
import { uploadProductImage } from "../../../../backend/storage/uploadImage";

export default function ProductsAdmin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  async function addProduct() {
    let imageUrl = "";

    if (image) {
      await uploadProductImage(image);
      imageUrl = image.name;
    }

    createNewProduct({
      name,
      price,
      category: "Streetwear",
      description: "KuroKage product",
      image: imageUrl
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

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={addProduct}>
          Add Product
        </button>
      </section>
    </main>
  );
}
