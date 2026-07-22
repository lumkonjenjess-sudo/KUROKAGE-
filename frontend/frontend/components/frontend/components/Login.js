"use client";

import { useState } from "react";
import { loginUser, registerUser } from "../../backend/auth/firebaseAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">

      <h2>KuroKage Account</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => loginUser(email, password)}
      >
        Login
      </button>

      <button
        onClick={() => registerUser(email, password)}
      >
        Create Account
      </button>

    </div>
  );
}
