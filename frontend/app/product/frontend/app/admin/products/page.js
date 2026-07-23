"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

import app from "../../../../backend/firebase/firebase";


const db = getFirestore(app);


export default function ProductsAdmin() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Streetwear");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);


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


  async function saveProduct() {

    const product = {
      name,
      price,
      category,
      description,
      image
    };


    if (editingId) {

      await updateDoc(
        doc(db, "products", editingId),
        product
      );

    } else {

      await addDoc(
        collection(db, "products"),
        product
      );

    }


    clearForm();
    loadProducts();

  }


  function editProduct(product) {

    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setDescription(product.description);
    setImage(product.image);
    setEditingId(product.id);

  }


  async function deleteProduct(id) {

    await deleteDoc(
      doc(db, "products", id)
    );

    loadProducts();

  }


  function clearForm() {

    setName("");
    setPrice("");
    setCategory("Streetwear");
    setDescription("");
    setImage("");
    setEditingId(null);

  }


  useEffect(() => {

    loadProducts();

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Product Manager
        </h1>


        <input
          placeholder="Product name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />


        <input
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />


        <input
          placeholder="Category"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />


        <input
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />


        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />


        <button onClick={saveProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>


        <hr />


        {products.map((product)=>(

          <div key={product.id}>

            <h3>
              {product.name}
            </h3>

            <p>
              {product.price}
            </p>


            <button
              onClick={() => editProduct(product)}
            >
              Edit
            </button>


            <button
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>


          </div>

        ))}


      </section>

    </main>

  );

          }
