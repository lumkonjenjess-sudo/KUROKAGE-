"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

import {
  getOrdersByUser
} from "../../../backend/database/orders";

import {
  addToCart
} from "../../../backend/database/cart";

const auth = getAuth(app);

export default function Orders() {

  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);

  async function loadOrders(uid) {

    const data =
      await getOrdersByUser(uid);

    setOrders(data);

  }

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async(currentUser)=>{

          if(currentUser){

            setUser(currentUser);

            await loadOrders(
              currentUser.uid
            );

          }

        }

      );

    return unsubscribe;

  }, []);

  async function reorder(items){

    if(!user) return;

    for(const item of items){

      await addToCart(
        user.uid,
        item
      );

    }

    alert(
      "Items added to cart."
    );

  }

  return(

    <main>

      <Navbar />

      <section>

        <h1>

          My Orders

        </h1>

        {orders.length===0 ?(

          <p>

            You have not placed any orders yet.

          </p>

        ):(
          
          orders.map((order)=>(

            <div key={order.id}>

              <h2>

                Order #{order.id}

              </h2>

              <p>

                Date: {order.createdAt}

              </p>

              <p>

                Payment Status: {order.paymentStatus}

              </p>

              <p>

                Order Status: {order.orderStatus}

              </p>

              <p>

                Total: £{order.total}

              </p>

              <h3>

                Items

              </h3>

              {order.items.map((item)=>(

                <p key={item.id}>

                  {item.name}
                  {" x "}
                  {item.quantity}

                </p>

              ))}

              <button
                onClick={()=>
                  reorder(order.items)
                }
              >

                Buy Again

              </button>

            </div>

          ))

        )}

      </section>

    </main>

  );

}
