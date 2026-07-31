"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

import {
  getWishlist,
  removeFromWishlist
} from "../../../backend/database/wishlist";

import {
  addToCart
} from "../../../backend/database/cart";

const auth = getAuth(app);

export default function Wishlist() {

  const [user, setUser] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  async function loadWishlist(uid) {

    const data = await getWishlist(uid);

    setWishlist(data);

  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      async(currentUser)=>{

        if(currentUser){

          setUser(currentUser);

          await loadWishlist(currentUser.uid);

        }

      }

    );

    return unsubscribe;

  }, []);

  async function moveToCart(product){

    if(!user) return;

    await addToCart(

      user.uid,

      product

    );

    await removeFromWishlist(

      user.uid,

      product.id

    );

    await loadWishlist(user.uid);

  }

  async function remove(productId){

    if(!user) return;

    await removeFromWishlist(

      user.uid,

      productId

    );

    await loadWishlist(user.uid);

  }

  return(

    <main>

      <Navbar />

      <section>

        <h1>

          My Wishlist

        </h1>

        {wishlist.length===0 ? (

          <p>

            Your wishlist is empty.

          </p>

        ) : (

          wishlist.map((product)=>(

            <div key={product.id}>

              <h2>

                {product.name}

              </h2>

              <p>

                £{product.price}

              </p>

              <button
                onClick={()=>
                  moveToCart(product)
                }
              >

                Move to Cart

              </button>

              <button
                onClick={()=>
                  remove(product.id)
                }
              >

                Remove

              </button>

            </div>

          ))

        )}

      </section>

    </main>

  );

}
