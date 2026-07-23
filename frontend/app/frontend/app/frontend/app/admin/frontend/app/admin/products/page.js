"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import app from "../../../../backend/firebase/firebase";


const db = getFirestore(app);


export default function ProductsAdmin() {

  const [products, setProducts] = useState([]);


  async function loadProducts() {

    const snapshot = await getDocs(
      collection(db, "products")
    );


    setProducts(
      snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))
    );

  }


  async function deleteProduct(id) {

    await deleteDoc(
      doc(db, "products", id)
    );


    loadProducts();

  }


  useEffect(() => {

    loadProducts();

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Products
        </h1>


        {products.map((product) => (

          <div key={product.id}>

            <h3>
              {product.name}
            </h3>

            <p>
              {product.price}
            </p>


            <button
              onClick={() =>
                deleteProduct(product.id)
              }
            >
              Delete Product
            </button>


          </div>

        ))}


      </section>

    </main>

  );

        }
