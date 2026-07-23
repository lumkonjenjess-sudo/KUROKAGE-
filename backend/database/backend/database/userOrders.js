import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import app from "../firebase/firebase";


const db = getFirestore(app);


export async function getUserOrders(email) {

  const ordersQuery = query(
    collection(db, "orders"),
    where(
      "email",
      "==",
      email
    )
  );


  const snapshot = await getDocs(
    ordersQuery
  );


  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...doc.data()
    })
  );

}
