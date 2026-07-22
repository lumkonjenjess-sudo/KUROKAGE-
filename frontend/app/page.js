import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export default function Shop() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Shop</h1>
        <p>Explore the Shadow Collection</p>

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
