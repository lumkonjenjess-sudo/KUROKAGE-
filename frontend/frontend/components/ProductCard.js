"use client";

import { useCart } from "../context/CartContext";

export default function ProductCard({ name, price, image, id }) {

  const { addToCart } = useCart();

  const product = {
    id,
    name,
    price,
    image
  };

  return (
    <div className="product-card">

      {image && (
        <img
          src={image}
          alt={name}
          width="200"
        />
      )}

      <h3>{name}</h3>

      <p>{price}</p>

      <button>
        View Product
      </button>

      <button
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>

    </div>
  );
}
