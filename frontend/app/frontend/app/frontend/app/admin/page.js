import Navbar from "../../components/Navbar";

export default function Admin() {
  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Admin Dashboard</h1>

        <p>
          Manage products, orders, users, and store settings.
        </p>

        <button>
          Add Product
        </button>

        <button>
          View Orders
        </button>
      </section>
    </main>
  );
}
