import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import app from "../firebase/firebase";

const auth = getAuth(app);

export async function register(email, password) {
  const user = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return user.user;
}

export async function login(email, password) {
  const user = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return user.user;
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(
    auth,
    email
  );
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(
    auth,
    provider
  );

  return result.user;
}

export { auth };
