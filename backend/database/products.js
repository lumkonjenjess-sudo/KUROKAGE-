import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from "../firebase/firebase";

const db = getFirestore(app);

export async function addProduct(product) {
  return await addDoc(
    collection(db, "products"),
    product
  );
}

export async function getProducts() {
  const snapshot = await getDocs(
    collection(db, "products")
  );

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
    }
