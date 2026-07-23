import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

export async function createOrder(order) {

  return await addDoc(
    collection(db, "orders"),
    {
      ...order,
      createdAt: new Date()
    }
  );

}
