import firebaseConfig from "../firebase/config";

export function loginUser(email, password) {
  return {
    email,
    password,
    message: "Login system ready for Firebase connection"
  };
}

export function createUser(email, password) {
  return {
    email,
    password,
    message: "Account creation system ready for Firebase connection"
  };
}
