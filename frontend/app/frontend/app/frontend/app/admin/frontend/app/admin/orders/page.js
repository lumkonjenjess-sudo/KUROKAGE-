"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import app from "../../../../backend/firebase/firebase";


const db = getFirestore(app);


export default function AdminOrders() {

  const [orders, setOrders] = useState([]);


  async function loadOrders() {

    const snapshot = await getDocs(
      collection(db, "orders")
    );


    setOrders(
      snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))
    );

  }


  async function updateStatus(id) {

    await updateDoc(
      doc(db, "orders", id),
      {
        status: "completed"
      }
    );


    loadOrders();

  }


  useEffect(() => {

    loadOrders();

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Orders
        </h1>


        {orders.map((order) => (

          <div key={order.id}>

            <p>
              Customer: {order.email}
            </p>

            <p>
              Status: {order.status}
            </p>


            <button
              onClick={() =>
                updateStatus(order.id)
              }
            >
              Mark Completed
            </button>


          </div>

        ))}


      </section>

    </main>

  );

    }
