"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

const auth = getAuth(app);

export default function Account() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function register() {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created");

  }


  async function login() {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Logged in");

  }


  return (
    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Account
        </h1>


        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button onClick={register}>
          Create Account
        </button>


        <button onClick={login}>
          Login
        </button>


      </section>

    </main>
  );
}
