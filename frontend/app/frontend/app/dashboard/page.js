"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../backend/firebase/firebase";

const auth = getAuth(app);

export default function Dashboard() {

  const [user, setUser] = useState(null);


  useEffect(() => {

    onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
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

          <div>

            <p>
              Email: {user.email}
            </p>

            <p>
              Account active
            </p>

          </div>

        ) : (

          <p>
            Please login first.
          </p>

        )}


      </section>

    </main>

  );
}
