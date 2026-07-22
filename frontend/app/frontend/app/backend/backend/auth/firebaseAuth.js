import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase";

const auth = getAuth(app);

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export function loginUser(email, password) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export default auth;
