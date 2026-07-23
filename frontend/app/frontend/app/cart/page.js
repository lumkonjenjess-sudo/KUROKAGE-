"use client";

import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export default function Cart() {

  const {
    cart,
    removeFromCart,
    updateQuantity
  } = useCart();


  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price.replace("$", "")) * item.quantity,
    0
  );


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

          <>

            {cart.map((item) => (

              <div key={item.id}>

                <h3>
                  {item.name}
                </h3>

                <p>
                  {item.price}
                </p>


                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>


                <span>
                  {item.quantity}
                </span>


                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>


                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>


              </div>

            ))}


            <h2>
              Total: ${total.toFixed(2)}
            </h2>

          </>

        )}

      </section>

    </main>
  );
}
