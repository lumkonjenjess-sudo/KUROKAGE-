"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";
import { getUserOrders } from "../../../backend/database/userOrders";


const auth = getAuth(app);


export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);


  useEffect(() => {

    onAuthStateChanged(
      auth,
      async (currentUser) => {

        setUser(currentUser);


        if (currentUser) {

          const userOrders =
            await getUserOrders(
              currentUser.email
            );


          setOrders(
            userOrders
          );

        }

      }
    );

  }, []);



  return (

    <main>

      <Navbar />


      <section>

        <h1>
          KuroKage Dashboard
        </h1>


        {user ? (

          <>

            <p>
              Email: {user.email}
            </p>


            <h2>
              Order History
            </h2>


            {orders.length === 0 ? (

              <p>
                No orders yet.
              </p>

            ) : (

              orders.map((order) => (

                <div key={order.id}>

                  <p>
                    Order ID: {order.id}
                  </p>

                  <p>
                    Status: {order.status}
                  </p>


                </div>

              ))

            )}

          </>

        ) : (

          <p>
            Please login first.
          </p>

        )}

      </section>

    </main>

  );

}
