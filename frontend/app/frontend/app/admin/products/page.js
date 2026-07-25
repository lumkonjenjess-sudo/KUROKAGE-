"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getProducts
} from "../../../../backend/database/products";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  async function loadProducts() {

    const data =
      await getProducts();

    setProducts(data);

  }

  useEffect(() => {

    loadProducts();

  }, []);

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          Product Management
        </h1>

        <button>
          Add Product
        </button>

        <h2>
          Store Products
        </h2>

        {products.length === 0 ? (

          <p>
            No products found.
          </p>

        ) : (

          products.map((product) => (

            <div key={product.id}>

              <h3>
                {product.name}
              </h3>

              <p>
                Category: {product.category}
              </p>

              <p>
                Price: £{product.price}
              </p>

              <button>
                Edit
              </button>

              <button>
                Delete
              </button>

            </div>

          ))

        )}

      </section>

    </main>

  );

}
