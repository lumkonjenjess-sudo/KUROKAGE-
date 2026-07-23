"use client";

import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export default function Cart() {

  const { cart, removeFromCart } = useCart();

  return (
    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Cart
        </h1>

        {cart.length === 0 ? (
          <p>
            Your cart is empty.
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.id}>

              <h3>
                {item.name}
              </h3>

              <p>
                {item.price}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

            </div>
          ))
        )}

      </section>

    </main>
  );
}
