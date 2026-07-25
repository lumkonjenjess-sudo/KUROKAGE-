"use client";

import { useState } from "react";
import Navbar from "../../../../components/Navbar";

import {
  addProduct
} from "../../../../../backend/database/products";


export default function AddProduct() {

  const [product, setProduct] = useState({

    name: "",

    category: "",

    price: "",

    description: "",

    image: "",

    stock: 0,

    available: true

  });



  function updateField(
    field,
    value
  ) {

    setProduct({

      ...product,

      [field]:
        value

    });

  }



  async function saveProduct() {

    await addProduct({

      ...product,

      price:
        Number(product.price),

      stock:
        Number(product.stock),

      createdAt:
        new Date()

    });


    alert(
      "Product added successfully"
    );


    setProduct({

      name: "",

      category: "",

      price: "",

      description: "",

      image: "",

      stock: 0,

      available: true

    });

  }



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          Add KuroKage Product
        </h1>


        <input

          placeholder="Product Name"

          value={product.name}

          onChange={(e)=>
            updateField(
              "name",
              e.target.value
            )
          }

        />


        <input

          placeholder="Category"

          value={product.category}

          onChange={(e)=>
            updateField(
              "category",
              e.target.value
            )
          }

        />


        <input

          placeholder="Price"

          type="number"

          value={product.price}

          onChange={(e)=>
            updateField(
              "price",
              e.target.value
            )
          }

        />


        <input

          placeholder="Image URL"

          value={product.image}

          onChange={(e)=>
            updateField(
              "image",
              e.target.value
            )
          }

        />


        <textarea

          placeholder="Description"

          value={product.description}

          onChange={(e)=>
            updateField(
              "description",
              e.target.value
            )
          }

        />


        <input

          placeholder="Stock Quantity"

          type="number"

          value={product.stock}

          onChange={(e)=>
            updateField(
              "stock",
              Number(e.target.value)
            )
          }

        />


        <label>

          <input

            type="checkbox"

            checked={product.available}

            onChange={(e)=>
              updateField(
                "available",
                e.target.checked
              )
            }

          />

          Product Available

        </label>



        <button

          onClick={saveProduct}

        >

          Save Product

        </button>


      </section>


    </main>

  );

              }
