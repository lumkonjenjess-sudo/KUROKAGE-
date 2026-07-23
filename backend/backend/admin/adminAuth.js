import { getAuth } from "firebase/auth";

import app from "../firebase/firebase";


const auth = getAuth(app);


export function checkAdmin() {

  const user = auth.currentUser;


  if (!user) {
    return false;
  }


  return user.email === "YOUR_ADMIN_EMAIL";

}
