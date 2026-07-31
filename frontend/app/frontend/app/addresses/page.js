"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "../../../backend/database/addresses";

const auth = getAuth(app);

export default function Addresses() {

  const [user, setUser] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [suburb, setSuburb] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("South Africa");

  async function loadAddresses(uid) {

    const data = await getAddresses(uid);

    setAddresses(data);

  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(

      auth,

      async(currentUser) => {

        if(currentUser){

          setUser(currentUser);

          await loadAddresses(currentUser.uid);

        }

      }

    );

    return unsubscribe;

  }, []);

  async function saveAddress() {

    if(!user) return;

    await addAddress(

      user.uid,

      {

        fullName,

        phone,

        street,

        suburb,

        city,

        province,

        postalCode,

        country,

        default:false

      }

    );

    await loadAddresses(user.uid);

    setFullName("");
    setPhone("");
    setStreet("");
    setSuburb("");
    setCity("");
    setProvince("");
    setPostalCode("");

  }

  async function makeDefault(id){

    await setDefaultAddress(

      user.uid,

      id

    );

    await loadAddresses(user.uid);

  }

  async function remove(id){

    await deleteAddress(

      user.uid,

      id

    );

    await loadAddresses(user.uid);

  }

  return(

    <main>

      <Navbar />

      <section>

        <h1>

          Delivery Addresses

        </h1>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <input
          placeholder="Street Address"
          value={street}
          onChange={(e)=>setStreet(e.target.value)}
        />

        <input
          placeholder="Suburb"
          value={suburb}
          onChange={(e)=>setSuburb(e.target.value)}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />

        <input
          placeholder="Province"
          value={province}
          onChange={(e)=>setProvince(e.target.value)}
        />

        <input
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e)=>setPostalCode(e.target.value)}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
        />

        <button onClick={saveAddress}>

          Save Address

        </button>

        <hr />

        <h2>

          Saved Addresses

        </h2>

        {addresses.length===0 ? (

          <p>

            No saved addresses.

          </p>

        ) : (

          addresses.map((address)=>(

            <div key={address.id}>

              <h3>

                {address.fullName}

              </h3>

              <p>

                {address.street}

              </p>

              <p>

                {address.suburb}, {address.city}

              </p>

              <p>

                {address.province}, {address.postalCode}

              </p>

              <p>

                {address.country}

              </p>

              <p>

                {address.phone}

              </p>

              {address.default && (

                <strong>

                  Default Address

                </strong>

              )}

              <br />

              <button
                onClick={()=>makeDefault(address.id)}
              >

                Set Default

              </button>

              <button
                onClick={()=>remove(address.id)}
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
