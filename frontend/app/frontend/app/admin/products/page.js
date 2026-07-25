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


        <h2>
          Store Products
        </h2>


        {products.length === 0 ? (

          <p>
            No products found.
          </p>

        ) : (

          products.map((product)=>(

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

          ))

        )}


      </section>


    </main>

  );

                  }
