import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage</h1>
        <h2>Wear the Shadow</h2>
        <p>Anime × Streetwear × Fashion</p>

        <button>
          Enter Shop
        </button>
      </section>

      <section>
        <h2>Featured Collection</h2>

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
