import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

import app from "../firebase/firebase";

import {
  getReferralCode
} from "../affiliate/referralTracker";


const db = getFirestore(app);


export async function createOrder(order) {

  const referralCode =
    getReferralCode();


  return await addDoc(
    collection(db, "orders"),
    {
      ...order,

      referralCode:
        referralCode || null,

      status:
        "pending",

      createdAt:
        new Date()
    }
  );

}


export async function getOrders() {

  const ordersQuery =
    query(
      collection(db, "orders"),
      orderBy(
        "createdAt",
        "desc"
      )
    );


  const snapshot =
    await getDocs(ordersQuery);


  return snapshot.docs.map((doc)=>({
    id: doc.id,
    ...doc.data()
  }));

}
