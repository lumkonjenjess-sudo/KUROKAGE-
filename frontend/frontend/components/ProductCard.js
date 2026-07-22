export default function ProductCard({ name, price }) {
  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>{price}</p>
      <button>
        View Product
      </button>
    </div>
  );
}
