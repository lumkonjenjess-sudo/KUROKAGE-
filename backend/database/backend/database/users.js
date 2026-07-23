import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);


export async function saveUser(user) {

  return await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      name: user.name || "",
      createdAt: new Date()
    }
  );

}


export async function getUser(uid) {

  const user = await getDoc(
    doc(db, "users", uid)
  );

  return user.data();

}
