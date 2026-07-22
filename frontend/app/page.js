import Navbar from "../../components/Navbar";
import Cart from "../../components/Cart";

export default function Product() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>Shadow Raven Hoodie</h1>

        <p>
          Premium anime-inspired streetwear hoodie.
        </p>

        <h2>$49.99</h2>

        <button>
          Add To Cart
        </button>
      </section>

      <Cart />
    </main>
  );
}
