import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc
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

      paymentStatus:
        "pending",

      orderStatus:
        "pending",

      createdAt:
        new Date()

    }
  );

}



export async function updateOrderPaymentStatus(
  orderId,
  paymentStatus
) {

  const orderRef =
    doc(
      db,
      "orders",
      orderId
    );


  await updateDoc(
    orderRef,
    {

      paymentStatus,

      updatedAt:
        new Date()

    }
  );

}



export async function updateOrderStatus(
  orderId,
  orderStatus
) {

  const orderRef =
    doc(
      db,
      "orders",
      orderId
    );


  await updateDoc(
    orderRef,
    {

      orderStatus,

      updatedAt:
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
    await getDocs(
      ordersQuery
    );


  return snapshot.docs.map((doc)=>({

    id:
      doc.id,

    ...doc.data()

  }));

}
