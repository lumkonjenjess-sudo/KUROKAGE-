import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

export default function Shop() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Shop</h1>
        <p>Explore the Shadow Collection</p>

        <ProductCard
          name="Shadow Raven Hoodie"
          price="$49.99"
        />

        <ProductCard
          name="KuroKage Street Tee"
          price="$29.99"
        />
      </section>
    </main>
  );
}
