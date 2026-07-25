"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

import {
  getProducts,
  deleteProduct
} from "../../../../backend/database/products";


export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");



  async function loadProducts() {

    const data =
      await getProducts();

    setProducts(data);

  }



  useEffect(() => {

    loadProducts();

  }, []);



  async function removeProduct(id) {

    await deleteProduct(id);

    alert(
      "Product deleted"
    );

    loadProducts();

  }



  const filteredProducts =
    products.filter((product) =>

      product.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      product.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          Product Management
        </h1>


        <Link href="/admin/products/add">

          <button>
            Add Product
          </button>

        </Link>



        <input

          placeholder="Search products..."

          value={search}

          onChange={(e)=>
            setSearch(
              e.target.value
            )
          }

        />



        <h2>
          Store Inventory
        </h2>



        {filteredProducts.map((product)=>(

          <div key={product.id}>


            <h3>
              {product.name}
            </h3>


            <p>
              Category:
              {" "}
              {product.category}
            </p>


            <p>
              Price:
              {" "}
              £{product.price}
            </p>


            <p>
              Stock:
              {" "}
              {product.stock ?? 0}
            </p>


            <p>

              Status:
              {" "}

              {product.available
                ? "Available"
                : "Out of Stock"}

            </p>


            {(product.stock ?? 0) <= 5 && (

              <p>
                ⚠️ Low Stock Alert
              </p>

            )}



            <Link
              href={`/admin/products/edit/${product.id}`}
            >

              <button>
                Edit
              </button>

            </Link>



            <button

              onClick={() =>
                removeProduct(
                  product.id
                )
              }

            >

              Delete

            </button>


          </div>

        ))}


      </section>


    </main>

  );

}
