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

    image: ""

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

      createdAt:
        new Date()

    });


    alert(
      "Product added successfully"
    );

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
          onChange={(e)=>
            updateField(
              "name",
              e.target.value
            )
          }
        />


        <input
          placeholder="Category"
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
          onChange={(e)=>
            updateField(
              "price",
              e.target.value
            )
          }
        />


        <input
          placeholder="Image URL"
          onChange={(e)=>
            updateField(
              "image",
              e.target.value
            )
          }
        />


        <textarea

          placeholder="Description"

          onChange={(e)=>
            updateField(
              "description",
              e.target.value
            )
          }

        />


        <button
          onClick={saveProduct}
        >

          Save Product

        </button>


      </section>


    </main>

  );

}
