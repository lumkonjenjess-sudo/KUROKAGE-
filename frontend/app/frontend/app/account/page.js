"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Account() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return unsubscribe;

  }, []);

  async function register() {

    try {

      setLoading(true);

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage("Account created successfully.");

    } catch (error) {

      setMessage(error.message);

    }

    setLoading(false);

  }

  async function login() {

    try {

      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setMessage("Login successful.");

    } catch (error) {

      setMessage(error.message);

    }

    setLoading(false);

  }

  async function googleLogin() {

    try {

      setLoading(true);

      await signInWithPopup(
        auth,
        provider
      );

      setMessage("Google login successful.");

    } catch (error) {

      setMessage(error.message);

    }

    setLoading(false);

  }

  async function logout() {

    try {

      await signOut(auth);

      setMessage("Logged out successfully.");

    } catch (error) {

      setMessage(error.message);

    }

  }

  async function forgotPassword() {

    if (!email) {

      setMessage(
        "Please enter your email first."
      );

      return;

    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      setMessage(
        "Password reset email sent."
      );

    } catch (error) {

      setMessage(error.message);

    }

  }

  return (

    <main>

      <Navbar />

      <section>

        <h1>
          KuroKage Account
        </h1>

        {user ? (

          <div>

            <h3>
              Welcome
            </h3>

            <p>
              {user.email}
            </p>

          </div>

        ) : (

          <p>
            Not logged in.
          </p>

        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={register}
          disabled={loading}
        >
          Create Account
        </button>

        <button
          onClick={login}
          disabled={loading}
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <button
          onClick={forgotPassword}
        >
          Forgot Password
        </button>

        <button
          onClick={logout}
        >
          Logout
        </button>

        {loading && (

          <p>
            Loading...
          </p>

        )}

        {message && (

          <p>
            {message}
          </p>

        )}

      </section>

    </main>

  );

}
